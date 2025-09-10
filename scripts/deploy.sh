#!/bin/bash

# NEWTUBE - Deployment Script
# Handles deployment to staging and production environments
# Usage: ./scripts/deploy.sh [staging|production] [--tag TAG] [--rollback] [--force]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=""
IMAGE_TAG="latest"
ROLLBACK=false
FORCE_DEPLOY=false
REGISTRY="ghcr.io"
REPO_NAME="codingbutter/newtube"
DEPLOYMENT_TIMEOUT=600  # 10 minutes

# Parse command line arguments
if [ $# -eq 0 ]; then
  echo "Usage: $0 [staging|production] [OPTIONS]"
  echo "Use --help for more information"
  exit 1
fi

ENVIRONMENT=$1
shift

while [[ $# -gt 0 ]]; do
  case $1 in
    --tag)
      IMAGE_TAG="$2"
      shift 2
      ;;
    --rollback)
      ROLLBACK=true
      shift
      ;;
    --force)
      FORCE_DEPLOY=true
      shift
      ;;
    --timeout)
      DEPLOYMENT_TIMEOUT="$2"
      shift 2
      ;;
    --help)
      echo "NEWTUBE Deployment Script"
      echo "Usage: $0 [staging|production] [OPTIONS]"
      echo ""
      echo "Arguments:"
      echo "  staging     Deploy to staging environment"
      echo "  production  Deploy to production environment"
      echo ""
      echo "Options:"
      echo "  --tag TAG        Docker image tag to deploy (default: latest)"
      echo "  --rollback       Rollback to previous deployment"
      echo "  --force          Force deployment (skip safety checks)"
      echo "  --timeout SEC    Deployment timeout in seconds (default: 600)"
      echo "  --help           Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Validate environment
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
  echo "Error: Environment must be 'staging' or 'production'"
  exit 1
fi

# Utility functions
log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
  echo -e "${RED}❌ $1${NC}"
}

check_dependencies() {
  log_info "Checking deployment dependencies..."
  
  # Check if required tools are installed
  local missing_tools=()
  
  if ! command -v docker &> /dev/null; then
    missing_tools+=("docker")
  fi
  
  if ! command -v curl &> /dev/null; then
    missing_tools+=("curl")
  fi
  
  if ! command -v jq &> /dev/null; then
    missing_tools+=("jq")
  fi
  
  if [ ${#missing_tools[@]} -gt 0 ]; then
    log_error "Missing required tools: ${missing_tools[*]}"
    exit 1
  fi
  
  log_success "All deployment dependencies are available"
}

verify_image_exists() {
  if [ "$ROLLBACK" = true ]; then
    return 0  # Skip image verification for rollback
  fi
  
  log_info "Verifying image exists: $IMAGE_TAG"
  
  # Check if backend image exists
  if ! docker manifest inspect "$REGISTRY/$REPO_NAME-backend:$IMAGE_TAG" &> /dev/null; then
    log_error "Backend image not found: $REGISTRY/$REPO_NAME-backend:$IMAGE_TAG"
    return 1
  fi
  
  # Check if frontend image exists
  if ! docker manifest inspect "$REGISTRY/$REPO_NAME-frontend:$IMAGE_TAG" &> /dev/null; then
    log_error "Frontend image not found: $REGISTRY/$REPO_NAME-frontend:$IMAGE_TAG"
    return 1
  fi
  
  log_success "All required images exist"
}

get_current_deployment() {
  local env=$1
  # In a real environment, this would query the deployment system
  # For now, we'll simulate with a timestamp
  echo "$(date +%Y%m%d-%H%M%S)"
}

backup_current_state() {
  local env=$1
  
  log_info "Creating backup of current $env state..."
  
  local backup_id="backup-$env-$(date +%Y%m%d-%H%M%S)"
  
  # In a real environment, you would:
  # 1. Create database backup
  # 2. Store current configuration
  # 3. Record current image tags
  # 4. Create deployment snapshot
  
  mkdir -p "deployments/$env/backups"
  
  # Store current deployment info
  cat > "deployments/$env/backups/$backup_id.json" << EOF
{
  "backup_id": "$backup_id",
  "environment": "$env",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "images": {
    "backend": "$(docker images --format '{{.Tag}}' $REGISTRY/$REPO_NAME-backend | head -1)",
    "frontend": "$(docker images --format '{{.Tag}}' $REGISTRY/$REPO_NAME-frontend | head -1)"
  },
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')"
}
EOF
  
  echo "$backup_id"
  log_success "Backup created: $backup_id"
}

run_pre_deployment_checks() {
  local env=$1
  
  log_info "Running pre-deployment checks for $env..."
  
  if [ "$FORCE_DEPLOY" = true ]; then
    log_warning "Force deployment enabled - skipping some checks"
    return 0
  fi
  
  local checks_passed=true
  
  # Check staging environment health (for production deployments)
  if [ "$env" = "production" ]; then
    log_info "Checking staging environment health..."
    
    local staging_api_status=$(curl -s -o /dev/null -w "%{http_code}" https://staging-api.newtube.app/health || echo "000")
    local staging_frontend_status=$(curl -s -o /dev/null -w "%{http_code}" https://staging.newtube.app || echo "000")
    
    if [ "$staging_api_status" != "200" ] || [ "$staging_frontend_status" != "200" ]; then
      log_warning "Staging environment is not healthy (API: $staging_api_status, Frontend: $staging_frontend_status)"
      checks_passed=false
    else
      log_success "Staging environment is healthy"
    fi
  fi
  
  # Check business hours (for production)
  if [ "$env" = "production" ]; then
    local current_hour=$(date +%H)
    local current_day=$(date +%u)  # 1-7, Monday is 1
    
    if [ $current_day -gt 5 ] || [ $current_hour -lt 9 ] || [ $current_hour -gt 17 ]; then
      log_warning "Deployment outside business hours ($(date '+%A %H:%M'))"
      if [ "$FORCE_DEPLOY" != true ]; then
        log_warning "Consider using --force if this is an emergency deployment"
      fi
    fi
  fi
  
  # Check recent deployments
  local recent_deployments=$(find deployments/$env/history -name "*.json" -mmin -60 2>/dev/null | wc -l || echo "0")
  if [ $recent_deployments -gt 0 ]; then
    log_warning "$recent_deployments deployment(s) in the last hour"
  fi
  
  if [ "$checks_passed" != true ] && [ "$FORCE_DEPLOY" != true ]; then
    log_error "Pre-deployment checks failed. Use --force to override."
    return 1
  fi
  
  log_success "Pre-deployment checks completed"
}

update_deployment_config() {
  local env=$1
  local tag=$2
  
  log_info "Updating deployment configuration for $env..."
  
  # Create deployment directory structure
  mkdir -p "deployments/$env/config"
  mkdir -p "deployments/$env/history"
  
  # Update docker-compose configuration for the environment
  local compose_file=""
  if [ "$env" = "staging" ]; then
    compose_file="docker-compose.staging.yml"
  else
    compose_file="docker-compose.prod.yml"
  fi
  
  # Create environment-specific compose file if it doesn't exist
  if [ ! -f "$compose_file" ]; then
    log_info "Creating $compose_file..."
    
    # Copy base production config and modify for environment
    cp docker-compose.prod.yml "$compose_file"
    
    # Update image tags in the compose file
    sed -i "s/:latest/:$tag/g" "$compose_file"
  fi
  
  log_success "Deployment configuration updated"
}

deploy_to_environment() {
  local env=$1
  local tag=$2
  
  log_info "Deploying to $env environment with tag: $tag"
  
  local deployment_id="deploy-$env-$(date +%Y%m%d-%H%M%S)"
  
  # Record deployment start
  cat > "deployments/$env/history/$deployment_id.json" << EOF
{
  "deployment_id": "$deployment_id",
  "environment": "$env",
  "image_tag": "$tag",
  "start_time": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "in_progress",
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "deployed_by": "$(whoami)",
  "rollback": $ROLLBACK
}
EOF
  
  if [ "$ROLLBACK" = true ]; then
    log_info "Performing rollback for $env..."
    perform_rollback "$env" "$deployment_id"
  else
    log_info "Performing deployment for $env..."
    perform_deployment "$env" "$tag" "$deployment_id"
  fi
  
  # Update deployment record
  local end_time=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  local temp_file=$(mktemp)
  jq --arg end_time "$end_time" --arg status "completed" \
     '.end_time = $end_time | .status = $status' \
     "deployments/$env/history/$deployment_id.json" > "$temp_file"
  mv "$temp_file" "deployments/$env/history/$deployment_id.json"
  
  log_success "Deployment completed: $deployment_id"
}

perform_deployment() {
  local env=$1
  local tag=$2
  local deployment_id=$3
  
  # Blue-Green deployment strategy
  log_info "Starting blue-green deployment..."
  
  # Step 1: Deploy to blue environment (inactive)
  log_info "Deploying to blue environment..."
  
  # In a real environment, you would:
  # 1. Update docker-compose file with new image tags
  # 2. Deploy to blue environment
  # 3. Run health checks
  # 4. Switch load balancer to blue
  # 5. Monitor for issues
  
  # Simulate deployment steps
  local steps=("Pulling images" "Starting services" "Running migrations" "Health checks" "Switching traffic")
  
  for step in "${steps[@]}"; do
    log_info "$step..."
    sleep 2  # Simulate deployment time
  done
  
  log_success "Blue-green deployment completed"
}

perform_rollback() {
  local env=$1
  local deployment_id=$2
  
  log_info "Finding previous deployment to rollback to..."
  
  # Find the most recent successful deployment
  local previous_deployment=$(find "deployments/$env/history" -name "*.json" -exec jq -r 'select(.status == "completed" and .rollback != true) | .deployment_id' {} \; 2>/dev/null | tail -1)
  
  if [ -z "$previous_deployment" ]; then
    log_error "No previous deployment found for rollback"
    return 1
  fi
  
  log_info "Rolling back to deployment: $previous_deployment"
  
  # Get previous deployment details
  local previous_tag=$(jq -r '.image_tag' "deployments/$env/history/$previous_deployment.json")
  
  log_info "Rolling back to image tag: $previous_tag"
  
  # Perform rollback (similar to deployment but with previous images)
  local steps=("Switching to green environment" "Verifying services" "Rolling back database" "Health checks")
  
  for step in "${steps[@]}"; do
    log_info "$step..."
    sleep 2
  done
  
  log_success "Rollback completed successfully"
}

run_post_deployment_tests() {
  local env=$1
  
  log_info "Running post-deployment tests for $env..."
  
  local base_url=""
  local api_url=""
  
  if [ "$env" = "staging" ]; then
    base_url="https://staging.newtube.app"
    api_url="https://staging-api.newtube.app"
  else
    base_url="https://newtube.app"
    api_url="https://api.newtube.app"
  fi
  
  # Wait for services to be ready
  local max_attempts=30
  local attempt=1
  
  while [ $attempt -le $max_attempts ]; do
    log_info "Health check attempt $attempt/$max_attempts..."
    
    local api_status=$(curl -s -o /dev/null -w "%{http_code}" "$api_url/health" || echo "000")
    local frontend_status=$(curl -s -o /dev/null -w "%{http_code}" "$base_url" || echo "000")
    
    if [ "$api_status" = "200" ] && [ "$frontend_status" = "200" ]; then
      log_success "Services are healthy"
      break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
      log_error "Services failed to become healthy (API: $api_status, Frontend: $frontend_status)"
      return 1
    fi
    
    sleep 10
    ((attempt++))
  done
  
  # Run smoke tests
  log_info "Running smoke tests..."
  
  # Test GraphQL endpoint
  local graphql_response=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "$api_url/graphql" \
    -H "Content-Type: application/json" \
    -d '{"query":"query { __schema { queryType { name } } }"}')
  
  if [ "$graphql_response" != "200" ]; then
    log_error "GraphQL endpoint test failed (status: $graphql_response)"
    return 1
  fi
  
  log_success "All post-deployment tests passed"
}

monitor_deployment() {
  local env=$1
  local duration=300  # 5 minutes
  
  log_info "Monitoring deployment for $duration seconds..."
  
  local base_url=""
  local api_url=""
  
  if [ "$env" = "staging" ]; then
    base_url="https://staging.newtube.app"
    api_url="https://staging-api.newtube.app"
  else
    base_url="https://newtube.app"
    api_url="https://api.newtube.app"
  fi
  
  local end_time=$(($(date +%s) + duration))
  local check_interval=30
  
  while [ $(date +%s) -lt $end_time ]; do
    local api_status=$(curl -s -o /dev/null -w "%{http_code}" "$api_url/health" || echo "000")
    local frontend_status=$(curl -s -o /dev/null -w "%{http_code}" "$base_url" || echo "000")
    
    if [ "$api_status" != "200" ] || [ "$frontend_status" != "200" ]; then
      log_error "Health check failed during monitoring (API: $api_status, Frontend: $frontend_status)"
      return 1
    fi
    
    local remaining=$((end_time - $(date +%s)))
    log_info "Monitoring... ${remaining}s remaining (API: $api_status, Frontend: $frontend_status)"
    
    sleep $check_interval
  done
  
  log_success "Deployment monitoring completed successfully"
}

generate_deployment_report() {
  local env=$1
  local deployment_id=$2
  
  log_info "Generating deployment report..."
  
  mkdir -p "deployments/$env/reports"
  
  local report_file="deployments/$env/reports/$deployment_id-report.md"
  
  echo "# NEWTUBE Deployment Report" > "$report_file"
  echo "Generated on: $(date)" >> "$report_file"
  echo "" >> "$report_file"
  
  echo "## Deployment Details" >> "$report_file"
  echo "- Environment: $env" >> "$report_file"
  echo "- Deployment ID: $deployment_id" >> "$report_file"
  echo "- Image Tag: $IMAGE_TAG" >> "$report_file"
  echo "- Rollback: $ROLLBACK" >> "$report_file"
  echo "- Force Deploy: $FORCE_DEPLOY" >> "$report_file"
  echo "" >> "$report_file"
  
  if [ -f "deployments/$env/history/$deployment_id.json" ]; then
    echo "## Deployment History" >> "$report_file"
    echo "\`\`\`json" >> "$report_file"
    cat "deployments/$env/history/$deployment_id.json" >> "$report_file"
    echo "\`\`\`" >> "$report_file"
  fi
  
  log_success "Deployment report generated: $report_file"
}

# Main execution
main() {
  echo "🚀 NEWTUBE Deployment Script"
  echo "Environment: $ENVIRONMENT"
  echo "Image Tag: $IMAGE_TAG"
  echo "Rollback: $ROLLBACK"
  echo "============================="
  
  # Check dependencies
  check_dependencies
  
  # Verify image exists (unless rollback)
  verify_image_exists || {
    log_error "Image verification failed"
    exit 1
  }
  
  # Create backup
  local backup_id=$(backup_current_state "$ENVIRONMENT")
  
  # Run pre-deployment checks
  run_pre_deployment_checks "$ENVIRONMENT" || {
    log_error "Pre-deployment checks failed"
    exit 1
  }
  
  # Update deployment configuration
  update_deployment_config "$ENVIRONMENT" "$IMAGE_TAG"
  
  # Perform deployment
  deploy_to_environment "$ENVIRONMENT" "$IMAGE_TAG" || {
    log_error "Deployment failed"
    exit 1
  }
  
  # Run post-deployment tests
  run_post_deployment_tests "$ENVIRONMENT" || {
    log_error "Post-deployment tests failed - consider rollback"
    exit 1
  }
  
  # Monitor deployment
  monitor_deployment "$ENVIRONMENT" || {
    log_error "Deployment monitoring failed - consider rollback"
    exit 1
  }
  
  # Generate report
  local latest_deployment=$(ls -t deployments/$ENVIRONMENT/history/*.json | head -1 | xargs basename -s .json)
  generate_deployment_report "$ENVIRONMENT" "$latest_deployment"
  
  log_success "Deployment to $ENVIRONMENT completed successfully! 🎉"
  
  if [ "$ENVIRONMENT" = "staging" ]; then
    echo ""
    echo "Staging URLs:"
    echo "- Frontend: https://staging.newtube.app"
    echo "- API: https://staging-api.newtube.app"
  else
    echo ""
    echo "Production URLs:"
    echo "- Frontend: https://newtube.app"
    echo "- API: https://api.newtube.app"
  fi
}

# Run main function
main "$@"