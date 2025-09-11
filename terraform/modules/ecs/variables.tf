# ECS Module Variables

variable "name_prefix" {
  description = "Prefix for all resource names"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "alb_security_group_id" {
  description = "Security group ID for the Application Load Balancer"
  type        = string
}

variable "ecs_security_group_id" {
  description = "Security group ID for ECS tasks"
  type        = string
}

# Application Configuration
variable "frontend_image" {
  description = "Docker image for frontend"
  type        = string
}

variable "backend_image" {
  description = "Docker image for backend"
  type        = string
}

variable "frontend_port" {
  description = "Port for frontend container"
  type        = number
  default     = 3000
}

variable "backend_port" {
  description = "Port for backend container"
  type        = number
  default     = 4000
}

variable "websocket_port" {
  description = "Port for WebSocket connections"
  type        = number
  default     = 8080
}

# Task Configuration
variable "frontend_cpu" {
  description = "CPU allocation for frontend task"
  type        = number
  default     = 256
}

variable "frontend_memory" {
  description = "Memory allocation for frontend task"
  type        = number
  default     = 512
}

variable "backend_cpu" {
  description = "CPU allocation for backend task"
  type        = number
  default     = 512
}

variable "backend_memory" {
  description = "Memory allocation for backend task"
  type        = number
  default     = 1024
}

# Auto Scaling Configuration
variable "frontend_min_capacity" {
  description = "Minimum number of frontend tasks"
  type        = number
  default     = 1
}

variable "frontend_max_capacity" {
  description = "Maximum number of frontend tasks"
  type        = number
  default     = 10
}

variable "backend_min_capacity" {
  description = "Minimum number of backend tasks"
  type        = number
  default     = 2
}

variable "backend_max_capacity" {
  description = "Maximum number of backend tasks"
  type        = number
  default     = 20
}

# Database Configuration
variable "db_host" {
  description = "Database host"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "redis_url" {
  description = "Redis connection URL"
  type        = string
}

# SSL Configuration
variable "ssl_certificate_arn" {
  description = "ARN of SSL certificate for HTTPS"
  type        = string
  default     = null
}

# Secrets Management
variable "jwt_secret_arn" {
  description = "ARN of JWT secret in Secrets Manager"
  type        = string
}

variable "clerk_secret_arn" {
  description = "ARN of Clerk secret in Secrets Manager"
  type        = string
}

variable "openai_api_key_arn" {
  description = "ARN of OpenAI API key in Secrets Manager"
  type        = string
}

variable "elevenlabs_api_key_arn" {
  description = "ARN of ElevenLabs API key in Secrets Manager"
  type        = string
}

variable "youtube_api_key_arn" {
  description = "ARN of YouTube API key in Secrets Manager"
  type        = string
}

variable "vimeo_client_id_arn" {
  description = "ARN of Vimeo client ID in Secrets Manager"
  type        = string
}

# Monitoring
variable "sns_topic_arn" {
  description = "SNS topic ARN for alerts"
  type        = string
}

# Tags
variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}