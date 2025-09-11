# Redis Module Outputs

output "conversation_state_endpoint" {
  description = "Endpoint for conversation state Redis cluster"
  value       = aws_elasticache_replication_group.conversation_state.primary_endpoint_address
}

output "conversation_state_port" {
  description = "Port for conversation state Redis cluster"
  value       = aws_elasticache_replication_group.conversation_state.port
}

output "conversation_state_redis_url" {
  description = "Complete Redis URL for conversation state"
  value       = "rediss://:${var.redis_auth_token}@${aws_elasticache_replication_group.conversation_state.primary_endpoint_address}:${aws_elasticache_replication_group.conversation_state.port}"
  sensitive   = true
}

output "rate_limiting_endpoint" {
  description = "Endpoint for rate limiting Redis cluster"
  value       = aws_elasticache_replication_group.rate_limiting.primary_endpoint_address
}

output "rate_limiting_port" {
  description = "Port for rate limiting Redis cluster"
  value       = aws_elasticache_replication_group.rate_limiting.port
}

output "rate_limiting_redis_url" {
  description = "Complete Redis URL for rate limiting"
  value       = "rediss://:${var.redis_auth_token}@${aws_elasticache_replication_group.rate_limiting.primary_endpoint_address}:${aws_elasticache_replication_group.rate_limiting.port}"
  sensitive   = true
}

output "conversation_state_cluster_id" {
  description = "ID of the conversation state Redis cluster"
  value       = aws_elasticache_replication_group.conversation_state.id
}

output "rate_limiting_cluster_id" {
  description = "ID of the rate limiting Redis cluster"
  value       = aws_elasticache_replication_group.rate_limiting.id
}

output "subnet_group_name" {
  description = "Name of the ElastiCache subnet group"
  value       = aws_elasticache_subnet_group.conversation_state.name
}

output "parameter_group_name" {
  description = "Name of the Redis parameter group"
  value       = aws_elasticache_parameter_group.conversation_redis.name
}

output "user_group_id" {
  description = "ID of the Redis user group"
  value       = aws_elasticache_user_group.conversation_app.id
}

output "dashboard_url" {
  description = "URL to the CloudWatch dashboard for conversation state monitoring"
  value       = "https://${var.aws_region}.console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${aws_cloudwatch_dashboard.conversation_state.dashboard_name}"
}