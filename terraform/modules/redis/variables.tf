# Redis Module Variables

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

variable "private_subnet_ids" {
  description = "List of private subnet IDs for Redis"
  type        = list(string)
}

variable "redis_security_group_id" {
  description = "Security group ID for Redis access"
  type        = string
}

# Redis Configuration
variable "redis_node_type" {
  description = "ElastiCache node type for conversation state"
  type        = string
  default     = "cache.r6g.large"
}

variable "redis_num_cache_nodes" {
  description = "Number of cache nodes in the Redis cluster"
  type        = number
  default     = 3
}

variable "rate_limit_redis_node_type" {
  description = "ElastiCache node type for rate limiting (smaller)"
  type        = string
  default     = "cache.r6g.medium"
}

# Backup Configuration
variable "redis_snapshot_retention_limit" {
  description = "Number of days to retain Redis snapshots"
  type        = number
  default     = 5
}

variable "redis_snapshot_window" {
  description = "Time window for Redis snapshots (UTC)"
  type        = string
  default     = "03:00-05:00"
}

variable "redis_maintenance_window" {
  description = "Time window for Redis maintenance (UTC)"
  type        = string
  default     = "sun:05:00-sun:07:00"
}

# Security
variable "redis_auth_token" {
  description = "Auth token for Redis authentication"
  type        = string
  sensitive   = true
}

# Monitoring
variable "sns_topic_arn" {
  description = "SNS topic ARN for Redis alerts"
  type        = string
}

# Tags
variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}