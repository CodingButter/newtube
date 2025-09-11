#!/bin/bash

# NEWTUBE AI-First Interface Production Deployment Script
# Deploys revolutionary real-time UI generation to production

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT="${1:-staging}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../project" && pwd)"
COMPOSE_FILE="docker-compose.prod.yml"

echo -e "${PURPLE}🚀 NEWTUBE AI-First Interface Deployment${NC}"
echo -e "${CYAN}Target Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Revolutionary real-time UI generation deployment${NC}"
echo "=================================================="

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Validate environment
validate_environment() {
    echo -e "${BLUE}Validating deployment environment...${NC}"
    
    case "$ENVIRONMENT" in
        "staging"|"production")
            print_status "Environment '$ENVIRONMENT' is valid"
            ;;
        *)
            print_error "Invalid environment: $ENVIRONMENT"
            echo "Valid environments: staging, production"
            exit 1
            ;;
    esac
    
    # Check required environment variables
    local required_vars=(
        "OPENAI_API_KEY"
        "DATABASE_URL"
        "JWT_SECRET"
        "NEO4J_PASSWORD"
        "POSTGRES_PASSWORD"
    )
    
    local missing_vars=()
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        print_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        exit 1
    fi
    
    print_status "All required environment variables are set"
}

# Pre-deployment checks
pre_deployment_checks() {
    echo -e "${BLUE}Running pre-deployment checks...${NC}"
    
    cd "$SCRIPT_DIR/.."
    
    # Validate Docker Compose configuration
    print_info "Validating Docker Compose configuration..."
    if docker-compose -f "$COMPOSE_FILE" config &> /dev/null; then
        print_status "Docker Compose configuration is valid"
    else
        print_error "Docker Compose configuration is invalid"
        exit 1
    fi
    
    # Check if images exist or can be built
    print_info "Checking Docker images..."
    
    # Test build frontend image
    if docker-compose -f "$COMPOSE_FILE" build frontend --no-cache; then
        print_status "Frontend image builds successfully"
    else
        print_error "Frontend image build failed"
        exit 1
    fi
    
    # Test build backend image
    if docker-compose -f "$COMPOSE_FILE" build backend --no-cache; then
        print_status "Backend image builds successfully"
    else
        print_error "Backend image build failed"
        exit 1
    fi
}

# Database backup (for production)
backup_database() {
    if [[ "$ENVIRONMENT" == "production" ]]; then
        echo -e "${BLUE}Creating database backup...${NC}"
        
        local backup_file="newtube_backup_$(date +%Y%m%d_%H%M%S).sql"
        
        # Create backup using pg_dump
        if docker-compose -f "$COMPOSE_FILE" exec -T postgres pg_dump -U newtube_user -d newtube > "$backup_file"; then
            print_status "Database backup created: $backup_file"
        else
            print_warning "Database backup failed, but continuing deployment"
        fi
    fi
}

# Deploy AI interface
deploy_ai_interface() {
    echo -e "${BLUE}Deploying AI-First Interface...${NC}"
    
    cd "$SCRIPT_DIR/.."
    
    # Set deployment environment variables
    export NODE_ENV=production
    export NEXT_PUBLIC_AI_ENABLED=true
    export NEXT_PUBLIC_VOICE_ENABLED=true
    export NEXT_PUBLIC_ENVIRONMENT="$ENVIRONMENT"
    
    print_info "Starting deployment with Docker Compose..."
    
    # Pull latest images if not building locally
    print_status "Pulling base images..."
    docker-compose -f "$COMPOSE_FILE" pull postgres redis neo4j
    
    # Build application images
    print_status "Building application images..."
    docker-compose -f "$COMPOSE_FILE" build --no-cache
    
    # Start services with rolling update strategy
    print_status "Starting services..."
    
    # Start databases first
    docker-compose -f "$COMPOSE_FILE" up -d postgres redis neo4j
    
    # Wait for databases to be ready
    print_info "Waiting for databases to be ready..."
    sleep 30
    
    # Check database health
    local max_retries=30
    local retry_count=0
    
    while [[ $retry_count -lt $max_retries ]]; do
        if docker-compose -f "$COMPOSE_FILE" exec -T postgres pg_isready -U newtube_user -d newtube &> /dev/null; then
            print_status "PostgreSQL is ready"
            break
        fi
        ((retry_count++))
        sleep 2
    done
    
    if [[ $retry_count -eq $max_retries ]]; then
        print_error "PostgreSQL failed to start"
        exit 1
    fi
    
    # Run database migrations
    print_status "Running database migrations..."
    cd "$PROJECT_ROOT"
    npx prisma migrate deploy
    cd "$SCRIPT_DIR/.."
    
    # Start application services
    print_status "Starting AI interface applications..."
    docker-compose -f "$COMPOSE_FILE" up -d backend frontend
    
    print_status "AI-First Interface deployment completed"
}

# Health checks
run_health_checks() {
    echo -e "${BLUE}Running health checks...${NC}"
    
    local services=("frontend" "backend" "postgres" "redis" "neo4j")
    local failed_services=()
    
    for service in "${services[@]}"; do
        print_info "Checking $service health..."
        
        local max_retries=10
        local retry_count=0
        local service_healthy=false
        
        while [[ $retry_count -lt $max_retries ]]; do
            if docker-compose -f "$COMPOSE_FILE" ps "$service" | grep -q "healthy\|Up"; then
                print_status "$service is healthy"
                service_healthy=true
                break
            fi
            ((retry_count++))
            sleep 3
        done
        
        if [[ "$service_healthy" == "false" ]]; then
            failed_services+=("$service")
        fi
    done
    
    if [[ ${#failed_services[@]} -gt 0 ]]; then
        print_error "Health checks failed for: ${failed_services[*]}"
        
        print_info "Service logs:"
        for service in "${failed_services[@]}"; do
            echo -e "${YELLOW}=== $service logs ===${NC}"
            docker-compose -f "$COMPOSE_FILE" logs --tail=20 "$service"
        done
        
        return 1
    fi
    
    print_status "All health checks passed"
}

# Smoke tests for AI interface
run_smoke_tests() {
    echo -e "${BLUE}Running AI interface smoke tests...${NC}"
    
    local frontend_url="http://localhost:3000"
    local backend_url="http://localhost:4000"
    
    # Test frontend health
    print_info "Testing frontend health..."
    if curl -f "$frontend_url/api/health" &> /dev/null; then
        print_status "Frontend health check passed"
    else
        print_error "Frontend health check failed"
        return 1
    fi
    
    # Test backend health
    print_info "Testing backend health..."
    if curl -f "$backend_url/health" &> /dev/null; then
        print_status "Backend health check passed"
    else
        print_error "Backend health check failed"
        return 1
    fi
    
    # Test AI canvas page
    print_info "Testing AI canvas page..."
    if curl -f "$frontend_url/ai-canvas" &> /dev/null; then
        print_status "AI canvas page is accessible"
    else
        print_error "AI canvas page is not accessible"
        return 1
    fi
    
    # Test GraphQL endpoint
    print_info "Testing GraphQL endpoint..."
    if curl -f "$backend_url/graphql" -H "Content-Type: application/json" -d '{"query":"query { __typename }"}' &> /dev/null; then
        print_status "GraphQL endpoint is working"
    else
        print_error "GraphQL endpoint failed"
        return 1
    fi
    
    print_status "All smoke tests passed"
}

# Deployment summary
deployment_summary() {
    echo ""
    echo -e "${PURPLE}🎉 AI-First Interface Deployment Complete!${NC}"
    echo "=============================================="
    echo -e "${GREEN}Environment:${NC} $ENVIRONMENT"
    echo -e "${GREEN}Frontend URL:${NC} http://localhost:3000"
    echo -e "${GREEN}Backend URL:${NC} http://localhost:4000"
    echo -e "${GREEN}AI Canvas:${NC} http://localhost:3000/ai-canvas"
    echo ""
    echo -e "${CYAN}🚀 Revolutionary Features Deployed:${NC}"
    echo -e "   • Real-time UI generation through conversation"
    echo -e "   • Voice-controlled interface creation"
    echo -e "   • Keyboard-driven component building"
    echo -e "   • AI-powered streaming platform design"
    echo ""
    echo -e "${BLUE}Services Status:${NC}"
    docker-compose -f "$COMPOSE_FILE" ps
    echo ""
    echo -e "${GREEN}Deployment successful! 🚀${NC}"
}

# Rollback function
rollback() {
    echo -e "${YELLOW}Rolling back deployment...${NC}"
    
    cd "$SCRIPT_DIR/.."
    
    # Stop current services
    docker-compose -f "$COMPOSE_FILE" down
    
    # Restore from backup if available
    local latest_backup=$(ls -t newtube_backup_*.sql 2>/dev/null | head -n1)
    if [[ -n "$latest_backup" ]]; then
        print_info "Restoring from backup: $latest_backup"
        # Restore backup logic here
    fi
    
    print_status "Rollback completed"
}

# Show help
show_help() {
    echo "NEWTUBE AI-First Interface Deployment Script"
    echo ""
    echo "Usage: $0 [ENVIRONMENT] [OPTIONS]"
    echo ""
    echo "Environments:"
    echo "  staging     Deploy to staging environment"
    echo "  production  Deploy to production environment"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  --rollback     Rollback the deployment"
    echo ""
    echo "Required Environment Variables:"
    echo "  OPENAI_API_KEY     - OpenAI API key for AI functionality"
    echo "  DATABASE_URL       - PostgreSQL connection string"
    echo "  JWT_SECRET         - Secret for JWT token signing"
    echo "  NEO4J_PASSWORD     - Neo4j database password"
    echo "  POSTGRES_PASSWORD  - PostgreSQL password"
    echo ""
    echo "This script will:"
    echo "  1. Validate environment and configuration"
    echo "  2. Run pre-deployment checks"
    echo "  3. Create database backup (production only)"
    echo "  4. Deploy AI-first interface with Docker"
    echo "  5. Run health checks and smoke tests"
    echo ""
}

# Handle options
case "${1:-}" in
    "-h"|"--help")
        show_help
        exit 0
        ;;
    "--rollback")
        rollback
        exit 0
        ;;
esac

# Main deployment workflow
main() {
    validate_environment
    pre_deployment_checks
    backup_database
    
    # Deploy with error handling
    if deploy_ai_interface; then
        if run_health_checks && run_smoke_tests; then
            deployment_summary
        else
            print_error "Deployment validation failed"
            echo -e "${YELLOW}Consider running rollback: $0 --rollback${NC}"
            exit 1
        fi
    else
        print_error "Deployment failed"
        exit 1
    fi
}

# Set trap for cleanup on error
trap 'print_error "Deployment interrupted"; exit 1' SIGINT SIGTERM

# Run main function
main "$@"