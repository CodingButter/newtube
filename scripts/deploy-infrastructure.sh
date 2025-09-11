#!/bin/bash

# NEWTUBE AWS Infrastructure Deployment Script
# Deploys the complete AWS infrastructure using Terraform

set -euo pipefail

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$(dirname "$SCRIPT_DIR")/terraform"
ENV_FILE="$(dirname "$SCRIPT_DIR")/.env"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1" >&2
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" >&2
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" >&2
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if required tools are installed
    local tools=("terraform" "aws" "jq")
    for tool in "${tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            log_error "$tool is not installed or not in PATH"
            exit 1
        fi
    done
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured properly"
        exit 1
    fi
    
    # Check if environment file exists
    if [[ ! -f "$ENV_FILE" ]]; then
        log_error "Environment file not found: $ENV_FILE"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Load environment variables
load_environment() {
    log_info "Loading environment variables..."
    
    # Source the environment file
    source "$ENV_FILE"
    
    # Validate required environment variables
    local required_vars=(
        "AWS_REGION"
        "ENVIRONMENT"
        "JWT_SECRET"
        "CLERK_SECRET_KEY"
        "OPENAI_API_KEY"
        "YOUTUBE_API_KEY"
        "NOTIFICATION_EMAIL"
    )
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            log_error "Required environment variable $var is not set"
            exit 1
        fi
    done
    
    log_success "Environment variables loaded and validated"
}

# Initialize Terraform
init_terraform() {
    log_info "Initializing Terraform..."
    
    cd "$TERRAFORM_DIR"
    
    # Initialize Terraform with backend configuration
    terraform init \
        -backend-config="bucket=newtube-terraform-state-${ENVIRONMENT}" \
        -backend-config="key=newtube/${ENVIRONMENT}/terraform.tfstate" \
        -backend-config="region=${AWS_REGION}" \
        -backend-config="encrypt=true" \
        -backend-config="dynamodb_table=newtube-terraform-locks-${ENVIRONMENT}"
    
    log_success "Terraform initialized"
}

# Plan Terraform deployment
plan_terraform() {
    log_info "Planning Terraform deployment..."
    
    cd "$TERRAFORM_DIR"
    
    # Create terraform variables file
    cat > terraform.tfvars <<EOF
aws_region = "${AWS_REGION}"
environment = "${ENVIRONMENT}"
name_prefix = "newtube"

# Database configuration
db_instance_class = "${DB_INSTANCE_CLASS:-db.t3.micro}"
db_allocated_storage = ${DB_ALLOCATED_STORAGE:-20}
db_max_allocated_storage = ${DB_MAX_ALLOCATED_STORAGE:-100}

# Application configuration
frontend_image = "${FRONTEND_IMAGE:-newtube/frontend:latest}"
backend_image = "${BACKEND_IMAGE:-newtube/backend:latest}"

# Secrets
jwt_secret = "${JWT_SECRET}"
clerk_secret_key = "${CLERK_SECRET_KEY}"
openai_api_key = "${OPENAI_API_KEY}"
youtube_api_key = "${YOUTUBE_API_KEY}"
vimeo_client_id = "${VIMEO_CLIENT_ID:-}"

# Monitoring
notification_email = "${NOTIFICATION_EMAIL}"
slack_webhook_url = "${SLACK_WEBHOOK_URL:-}"
EOF
    
    # Run Terraform plan
    terraform plan -out=tfplan -var-file=terraform.tfvars
    
    log_success "Terraform plan completed"
}

# Apply Terraform deployment
apply_terraform() {
    log_info "Applying Terraform deployment..."
    
    cd "$TERRAFORM_DIR"
    
    # Apply the plan
    terraform apply tfplan
    
    log_success "Terraform deployment completed"
}

# Get deployment outputs
get_outputs() {
    log_info "Getting deployment outputs..."
    
    cd "$TERRAFORM_DIR"
    
    # Get important outputs
    local alb_dns=$(terraform output -raw alb_dns_name)
    local db_endpoint=$(terraform output -raw db_endpoint)
    local cluster_name=$(terraform output -raw ecs_cluster_name)
    
    log_success "Deployment completed successfully!"
    echo ""
    echo "=== DEPLOYMENT OUTPUTS ==="
    echo "Application URL: https://${alb_dns}"
    echo "Database Endpoint: ${db_endpoint}"
    echo "ECS Cluster: ${cluster_name}"
    echo "Environment: ${ENVIRONMENT}"
    echo "=========================="
}

# Initialize database
initialize_database() {
    log_info "Initializing database with pgvector..."
    
    cd "$TERRAFORM_DIR"
    
    # Get Lambda function name
    local lambda_name=$(terraform output -raw db_init_lambda_name 2>/dev/null || echo "")
    
    if [[ -n "$lambda_name" ]]; then
        log_info "Invoking database initialization Lambda function..."
        aws lambda invoke \
            --function-name "$lambda_name" \
            --region "$AWS_REGION" \
            --cli-binary-format raw-in-base64-out \
            --payload '{}' \
            /tmp/lambda-response.json
        
        # Check response
        if jq -e '.statusCode == 200' /tmp/lambda-response.json > /dev/null; then
            log_success "Database initialization completed"
        else
            log_warning "Database initialization may have failed. Check Lambda logs."
        fi
        
        rm -f /tmp/lambda-response.json
    else
        log_warning "Database initialization Lambda not found. Skipping..."
    fi
}

# Setup monitoring
setup_monitoring() {
    log_info "Setting up monitoring and alerting..."
    
    # Configure Grafana Cloud if credentials are available
    if [[ -n "${GRAFANA_API_KEY:-}" && -n "${GRAFANA_STACK_ID:-}" ]]; then
        log_info "Configuring Grafana Cloud monitoring..."
        
        # Apply Grafana configuration
        local grafana_config="$(dirname "$SCRIPT_DIR")/monitoring/grafana-config.yml"
        if [[ -f "$grafana_config" ]]; then
            # This would require Grafana Terraform provider or API calls
            log_info "Grafana configuration found, manual setup required"
        fi
    else
        log_warning "Grafana Cloud credentials not provided. Monitoring setup skipped."
    fi
    
    log_success "Monitoring setup completed"
}

# Cleanup function
cleanup() {
    cd "$TERRAFORM_DIR"
    rm -f terraform.tfvars tfplan
}

# Main deployment function
main() {
    local command="${1:-deploy}"
    
    case "$command" in
        "plan")
            log_info "Starting Terraform planning..."
            check_prerequisites
            load_environment
            init_terraform
            plan_terraform
            ;;
        "apply")
            log_info "Starting Terraform deployment..."
            check_prerequisites
            load_environment
            init_terraform
            apply_terraform
            get_outputs
            initialize_database
            setup_monitoring
            ;;
        "deploy")
            log_info "Starting full deployment..."
            check_prerequisites
            load_environment
            init_terraform
            plan_terraform
            
            # Ask for confirmation
            echo ""
            read -p "Do you want to apply this deployment? (y/N): " -n 1 -r
            echo ""
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                apply_terraform
                get_outputs
                initialize_database
                setup_monitoring
            else
                log_info "Deployment cancelled by user"
                exit 0
            fi
            ;;
        "destroy")
            log_info "Starting infrastructure destruction..."
            check_prerequisites
            load_environment
            init_terraform
            
            echo ""
            log_warning "This will DESTROY all infrastructure!"
            read -p "Are you sure? Type 'yes' to confirm: " confirmation
            if [[ "$confirmation" == "yes" ]]; then
                terraform destroy -var-file=terraform.tfvars -auto-approve
                log_success "Infrastructure destroyed"
            else
                log_info "Destruction cancelled"
            fi
            ;;
        *)
            echo "Usage: $0 {plan|apply|deploy|destroy}"
            echo ""
            echo "Commands:"
            echo "  plan    - Plan the Terraform deployment"
            echo "  apply   - Apply a previously created plan"
            echo "  deploy  - Full deployment (plan + apply + setup)"
            echo "  destroy - Destroy all infrastructure"
            exit 1
            ;;
    esac
    
    cleanup
}

# Trap to cleanup on exit
trap cleanup EXIT

# Run main function
main "$@"