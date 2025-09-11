# NEWTUBE Redis Module - Optimized for Real-Time Conversation State
# ElastiCache Redis cluster for conversation state, session management, and caching

# ElastiCache Subnet Group
resource "aws_elasticache_subnet_group" "conversation_state" {
  name       = "${var.name_prefix}-conversation-cache-subnet"
  subnet_ids = var.private_subnet_ids

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-conversation-cache-subnet"
  })
}

# ElastiCache Parameter Group - Optimized for conversation state
resource "aws_elasticache_parameter_group" "conversation_redis" {
  family = "redis7"
  name   = "${var.name_prefix}-conversation-params"

  # Optimized for real-time conversation state
  parameter {
    name  = "maxmemory-policy"
    value = "allkeys-lru"
  }
  
  parameter {
    name  = "timeout"
    value = "300"
  }

  parameter {
    name  = "tcp-keepalive"
    value = "300"
  }

  parameter {
    name  = "maxclients"
    value = "10000"
  }

  # Enable notifications for conversation events
  parameter {
    name  = "notify-keyspace-events"
    value = "Ex"
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-conversation-params"
  })
}

# ElastiCache Redis Replication Group - High Availability
resource "aws_elasticache_replication_group" "conversation_state" {
  description          = "Redis cluster for conversation state management"
  replication_group_id = "${var.name_prefix}-conversation-state"
  
  node_type                     = var.redis_node_type
  port                         = 6379
  parameter_group_name         = aws_elasticache_parameter_group.conversation_redis.name
  num_cache_clusters           = var.redis_num_cache_nodes
  
  # High availability for conversations
  automatic_failover_enabled = true
  multi_az_enabled          = true
  
  # Backup configuration
  snapshot_retention_limit = var.redis_snapshot_retention_limit
  snapshot_window         = var.redis_snapshot_window
  maintenance_window      = var.redis_maintenance_window
  
  # Security
  subnet_group_name  = aws_elasticache_subnet_group.conversation_state.name
  security_group_ids = [var.redis_security_group_id]
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  
  # Auth token for security
  auth_token = var.redis_auth_token

  # Notification topic for events
  notification_topic_arn = var.sns_topic_arn

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-conversation-state-cache"
    Purpose = "ConversationState"
  })
}

# CloudWatch Alarms for Redis Health
resource "aws_cloudwatch_metric_alarm" "redis_cpu_utilization" {
  alarm_name          = "${var.name_prefix}-redis-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ElastiCache"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "Redis CPU utilization is too high"
  alarm_actions       = [var.sns_topic_arn]

  dimensions = {
    CacheClusterId = "${var.name_prefix}-conversation-state"
  }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "redis_memory_utilization" {
  alarm_name          = "${var.name_prefix}-redis-memory-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "DatabaseMemoryUsagePercentage"
  namespace           = "AWS/ElastiCache"
  period              = "300"
  statistic           = "Average"
  threshold           = "85"
  alarm_description   = "Redis memory utilization is too high"
  alarm_actions       = [var.sns_topic_arn]

  dimensions = {
    CacheClusterId = "${var.name_prefix}-conversation-state"
  }

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "redis_connections" {
  alarm_name          = "${var.name_prefix}-redis-connections"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CurrConnections"
  namespace           = "AWS/ElastiCache"
  period              = "300"
  statistic           = "Average"
  threshold           = "8000"  # 80% of maxclients
  alarm_description   = "Redis connection count is too high"
  alarm_actions       = [var.sns_topic_arn]

  dimensions = {
    CacheClusterId = "${var.name_prefix}-conversation-state"
  }

  tags = var.tags
}

# CloudWatch Dashboard for Conversation State Monitoring
resource "aws_cloudwatch_dashboard" "conversation_state" {
  dashboard_name = "${var.name_prefix}-conversation-state"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["AWS/ElastiCache", "CPUUtilization", "CacheClusterId", "${var.name_prefix}-conversation-state"],
            [".", "DatabaseMemoryUsagePercentage", ".", "."],
            [".", "CurrConnections", ".", "."],
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "Redis Conversation State Metrics"
          period  = 300
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["NEWTUBE/Conversations", "ActiveConversations"],
            [".", "ConversationResponseTime"],
            [".", "WebSocketConnections"],
            [".", "ConversationCacheHitRate"],
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "Conversation Performance Metrics"
          period  = 300
        }
      }
    ]
  })

  tags = var.tags
}

# ElastiCache User for application access
resource "aws_elasticache_user" "conversation_app" {
  user_id       = "${var.name_prefix}-conversation-app"
  user_name     = "conversation-app"
  access_string = "on ~* &* +@all"
  engine        = "REDIS"
  passwords     = [var.redis_auth_token]

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-conversation-app-user"
  })
}

# ElastiCache User Group
resource "aws_elasticache_user_group" "conversation_app" {
  engine        = "REDIS"
  user_group_id = "${var.name_prefix}-conversation-app-group"
  user_ids      = [aws_elasticache_user.conversation_app.user_id]

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-conversation-app-group"
  })
}

# Additional Redis instance for rate limiting (smaller, cost-optimized)
resource "aws_elasticache_replication_group" "rate_limiting" {
  description          = "Redis cluster for API rate limiting"
  replication_group_id = "${var.name_prefix}-rate-limiting"
  
  node_type                     = var.rate_limit_redis_node_type
  port                         = 6379
  parameter_group_name         = aws_elasticache_parameter_group.conversation_redis.name
  num_cache_clusters           = 2  # Smaller cluster for rate limiting
  
  # Basic availability for rate limiting
  automatic_failover_enabled = true
  multi_az_enabled          = false  # Cost optimization
  
  # Minimal backup for rate limiting data
  snapshot_retention_limit = 1
  snapshot_window         = "03:00-05:00"
  maintenance_window      = "sun:05:00-sun:07:00"
  
  # Security
  subnet_group_name  = aws_elasticache_subnet_group.conversation_state.name
  security_group_ids = [var.redis_security_group_id]
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  
  # Auth token for security
  auth_token = var.redis_auth_token

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-rate-limiting-cache"
    Purpose = "RateLimiting"
  })
}