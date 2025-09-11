# NEWTUBE AWS Infrastructure - Main Configuration
# This file sets up the core AWS infrastructure for NEWTUBE streaming aggregator

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }

  # Remote state management (update bucket name as needed)
  backend "s3" {
    bucket         = "newtube-terraform-state"
    key            = "newtube/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "newtube-terraform-locks"
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "NEWTUBE"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "DevOps"
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# Random password for RDS
resource "random_password" "db_password" {
  length  = 32
  special = true
}

# VPC Module
module "vpc" {
  source = "./modules/vpc"

  name_prefix         = var.name_prefix
  environment        = var.environment
  vpc_cidr          = var.vpc_cidr
  availability_zones = data.aws_availability_zones.available.names
  
  tags = var.common_tags
}

# Security Groups Module
module "security_groups" {
  source = "./modules/security"

  name_prefix = var.name_prefix
  environment = var.environment
  vpc_id      = module.vpc.vpc_id
  
  tags = var.common_tags
}

# RDS Module
module "rds" {
  source = "./modules/rds"

  name_prefix               = var.name_prefix
  environment              = var.environment
  vpc_id                   = module.vpc.vpc_id
  private_subnet_ids       = module.vpc.private_subnet_ids
  db_security_group_id     = module.security_groups.rds_security_group_id
  
  db_instance_class        = var.db_instance_class
  db_allocated_storage     = var.db_allocated_storage
  db_max_allocated_storage = var.db_max_allocated_storage
  db_name                  = var.db_name
  db_username              = var.db_username
  db_password              = random_password.db_password.result
  
  backup_retention_period  = var.backup_retention_period
  backup_window           = var.backup_window
  maintenance_window      = var.maintenance_window
  
  tags = var.common_tags
}

# ECS Module
module "ecs" {
  source = "./modules/ecs"

  name_prefix                = var.name_prefix
  environment               = var.environment
  vpc_id                    = module.vpc.vpc_id
  private_subnet_ids        = module.vpc.private_subnet_ids
  public_subnet_ids         = module.vpc.public_subnet_ids
  
  alb_security_group_id     = module.security_groups.alb_security_group_id
  ecs_security_group_id     = module.security_groups.ecs_security_group_id
  
  # Application configuration
  frontend_image            = var.frontend_image
  backend_image             = var.backend_image
  frontend_port             = var.frontend_port
  backend_port              = var.backend_port
  
  # Task configuration
  frontend_cpu              = var.frontend_cpu
  frontend_memory           = var.frontend_memory
  backend_cpu               = var.backend_cpu
  backend_memory            = var.backend_memory
  
  # Auto scaling
  frontend_min_capacity     = var.frontend_min_capacity
  frontend_max_capacity     = var.frontend_max_capacity
  backend_min_capacity      = var.backend_min_capacity
  backend_max_capacity      = var.backend_max_capacity
  
  # Database connection
  db_host                   = module.rds.db_endpoint
  db_name                   = var.db_name
  db_username               = var.db_username
  db_password               = random_password.db_password.result
  
  # Secrets
  jwt_secret                = var.jwt_secret
  clerk_secret_key          = var.clerk_secret_key
  openai_api_key           = var.openai_api_key
  youtube_api_key          = var.youtube_api_key
  vimeo_client_id          = var.vimeo_client_id
  
  tags = var.common_tags
}

# Monitoring Module
module "monitoring" {
  source = "./modules/monitoring"

  name_prefix         = var.name_prefix
  environment        = var.environment
  
  # ECS resources for monitoring
  ecs_cluster_name    = module.ecs.cluster_name
  frontend_service_name = module.ecs.frontend_service_name
  backend_service_name  = module.ecs.backend_service_name
  
  # ALB for monitoring
  alb_arn             = module.ecs.alb_arn
  alb_target_group_arns = module.ecs.target_group_arns
  
  # RDS for monitoring
  db_instance_id      = module.rds.db_instance_id
  
  # Notification settings
  notification_email  = var.notification_email
  slack_webhook_url   = var.slack_webhook_url
  
  tags = var.common_tags
}

# Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS name"
  value       = module.ecs.alb_dns_name
}

output "alb_zone_id" {
  description = "Application Load Balancer Zone ID"
  value       = module.ecs.alb_zone_id
}

output "db_endpoint" {
  description = "RDS instance endpoint"
  value       = module.rds.db_endpoint
  sensitive   = true
}

output "ecs_cluster_name" {
  description = "ECS Cluster name"
  value       = module.ecs.cluster_name
}

output "frontend_service_name" {
  description = "Frontend ECS service name"
  value       = module.ecs.frontend_service_name
}

output "backend_service_name" {
  description = "Backend ECS service name"
  value       = module.ecs.backend_service_name
}