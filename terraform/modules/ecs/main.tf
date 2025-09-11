# NEWTUBE ECS Module - Enhanced for Conversational AI Workloads
# Optimized for real-time conversations, WebSocket support, and AI processing

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.name_prefix}-cluster"

  configuration {
    execute_command_configuration {
      logging = "OVERRIDE"
      
      log_configuration {
        cloud_watch_encryption_enabled = true
        cloud_watch_log_group_name     = aws_cloudwatch_log_group.ecs_exec.name
      }
    }
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-ecs-cluster"
  })
}

# CloudWatch log group for ECS exec
resource "aws_cloudwatch_log_group" "ecs_exec" {
  name              = "/aws/ecs/${var.name_prefix}/exec"
  retention_in_days = 7
  
  tags = var.tags
}

# Application Load Balancer for both HTTP and WebSocket traffic
resource "aws_lb" "main" {
  name               = "${var.name_prefix}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.alb_security_group_id]
  subnets           = var.public_subnet_ids

  enable_deletion_protection = false

  tags = merge(var.tags, {
    Name    = "${var.name_prefix}-alb"
    Purpose = "ConversationalInterface"
  })
}

# Target Group for Frontend (HTTP)
resource "aws_lb_target_group" "frontend" {
  name     = "${var.name_prefix}-frontend-tg"
  port     = var.frontend_port
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-frontend-tg"
  })
}

# Target Group for Backend API (HTTP)
resource "aws_lb_target_group" "backend" {
  name     = "${var.name_prefix}-backend-tg"
  port     = var.backend_port
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-backend-tg"
  })
}

# Target Group for WebSocket Conversations (with sticky sessions)
resource "aws_lb_target_group" "websocket" {
  name     = "${var.name_prefix}-websocket-tg"
  port     = var.websocket_port
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/ws/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  # Sticky sessions for conversation continuity
  stickiness {
    type            = "lb_cookie"
    cookie_duration = 3600  # 1 hour for conversation continuity
    enabled         = true
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-websocket-tg"
    Purpose = "ConversationWebSocket"
  })
}

# ALB Listener for HTTPS (Frontend)
resource "aws_lb_listener" "frontend" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = var.ssl_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }

  tags = var.tags
}

# ALB Listener for HTTP (redirects to HTTPS)
resource "aws_lb_listener" "frontend_http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  tags = var.tags
}

# ALB Listener Rule for API traffic
resource "aws_lb_listener_rule" "api" {
  listener_arn = aws_lb_listener.frontend.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }

  condition {
    path_pattern {
      values = ["/api/*", "/graphql", "/health"]
    }
  }

  tags = var.tags
}

# ALB Listener Rule for WebSocket traffic
resource "aws_lb_listener_rule" "websocket" {
  listener_arn = aws_lb_listener.frontend.arn
  priority     = 50

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.websocket.arn
  }

  condition {
    path_pattern {
      values = ["/ws/*"]
    }
  }

  condition {
    http_header {
      http_header_name = "Upgrade"
      values           = ["websocket"]
    }
  }

  tags = var.tags
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/${var.name_prefix}/frontend"
  retention_in_days = 14

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-frontend-logs"
  })
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${var.name_prefix}/backend"
  retention_in_days = 14

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-backend-logs"
  })
}

resource "aws_cloudwatch_log_group" "conversation" {
  name              = "/ecs/${var.name_prefix}/conversation"
  retention_in_days = 14

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-conversation-logs"
    Purpose = "ConversationAnalytics"
  })
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_execution_role" {
  name = "${var.name_prefix}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

# IAM Role for ECS Tasks
resource "aws_iam_role" "ecs_task_role" {
  name = "${var.name_prefix}-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

# Attach basic ECS execution policy
resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Enhanced policy for conversation services
resource "aws_iam_role_policy" "conversation_policy" {
  name = "${var.name_prefix}-conversation-policy"
  role = aws_iam_role.ecs_task_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ]
        Resource = [
          "arn:aws:secretsmanager:*:*:secret:${var.name_prefix}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "cloudwatch:PutMetricData",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "elasticache:DescribeCacheClusters",
          "elasticache:DescribeReplicationGroups"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = [
          "arn:aws:s3:::${var.name_prefix}-voice-cache/*"
        ]
      }
    ]
  })
}

# Frontend Task Definition
resource "aws_ecs_task_definition" "frontend" {
  family                   = "${var.name_prefix}-frontend"
  network_mode            = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                     = var.frontend_cpu
  memory                  = var.frontend_memory
  execution_role_arn      = aws_iam_role.ecs_execution_role.arn
  task_role_arn          = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "frontend"
      image     = var.frontend_image
      essential = true

      portMappings = [
        {
          containerPort = var.frontend_port
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "NEXT_PUBLIC_API_URL"
          value = "https://${aws_lb.main.dns_name}/api"
        },
        {
          name  = "NEXT_PUBLIC_WS_URL"
          value = "wss://${aws_lb.main.dns_name}/ws"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.frontend.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }

      healthCheck = {
        command = ["CMD-SHELL", "curl -f http://localhost:${var.frontend_port}/health || exit 1"]
        interval = 30
        timeout = 5
        retries = 3
        startPeriod = 60
      }
    }
  ])

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-frontend-task"
  })
}

# Backend Task Definition - Enhanced for Conversational AI
resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.name_prefix}-backend"
  network_mode            = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                     = var.backend_cpu
  memory                  = var.backend_memory
  execution_role_arn      = aws_iam_role.ecs_execution_role.arn
  task_role_arn          = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = var.backend_image
      essential = true

      portMappings = [
        {
          containerPort = var.backend_port
          protocol      = "tcp"
        },
        {
          containerPort = var.websocket_port
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "PORT"
          value = tostring(var.backend_port)
        },
        {
          name  = "WS_PORT"
          value = tostring(var.websocket_port)
        },
        {
          name  = "DATABASE_URL"
          value = "postgresql://${var.db_username}:${var.db_password}@${var.db_host}:5432/${var.db_name}"
        },
        {
          name  = "REDIS_URL"
          value = var.redis_url
        },
        # AI and conversation settings
        {
          name  = "AI_RESPONSE_TIMEOUT"
          value = "5000"
        },
        {
          name  = "CONVERSATION_MEMORY_LIMIT"
          value = "100MB"
        },
        {
          name  = "WS_HEARTBEAT_INTERVAL"
          value = "30000"
        },
        {
          name  = "NODE_OPTIONS"
          value = "--max-http-header-size=16384"
        }
      ]

      secrets = [
        {
          name      = "JWT_SECRET"
          valueFrom = var.jwt_secret_arn
        },
        {
          name      = "CLERK_SECRET_KEY"
          valueFrom = var.clerk_secret_arn
        },
        {
          name      = "OPENAI_API_KEY"
          valueFrom = var.openai_api_key_arn
        },
        {
          name      = "ELEVENLABS_API_KEY"
          valueFrom = var.elevenlabs_api_key_arn
        },
        {
          name      = "YOUTUBE_API_KEY"
          valueFrom = var.youtube_api_key_arn
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.backend.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }

      healthCheck = {
        command = ["CMD-SHELL", "curl -f http://localhost:${var.backend_port}/health || exit 1"]
        interval = 30
        timeout = 5
        retries = 3
        startPeriod = 60
      }
    }
  ])

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-backend-task"
    Purpose = "ConversationalAPI"
  })
}

# Frontend ECS Service
resource "aws_ecs_service" "frontend" {
  name            = "${var.name_prefix}-frontend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = var.frontend_min_capacity
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [var.ecs_security_group_id]
    subnets         = var.private_subnet_ids
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend.arn
    container_name   = "frontend"
    container_port   = var.frontend_port
  }

  depends_on = [aws_lb_listener.frontend]

  lifecycle {
    ignore_changes = [desired_count]
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-frontend-service"
  })
}

# Backend ECS Service - Enhanced for Conversations
resource "aws_ecs_service" "backend" {
  name            = "${var.name_prefix}-backend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = var.backend_min_capacity
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [var.ecs_security_group_id]
    subnets         = var.private_subnet_ids
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "backend"
    container_port   = var.backend_port
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.websocket.arn
    container_name   = "backend"
    container_port   = var.websocket_port
  }

  depends_on = [aws_lb_listener.frontend]

  lifecycle {
    ignore_changes = [desired_count]
  }

  tags = merge(var.tags, {
    Name = "${var.name_prefix}-backend-service"
    Purpose = "ConversationalBackend"
  })
}

# Auto Scaling Target for Frontend
resource "aws_appautoscaling_target" "frontend" {
  max_capacity       = var.frontend_max_capacity
  min_capacity       = var.frontend_min_capacity
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.frontend.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"

  tags = var.tags
}

# Auto Scaling Target for Backend (Conversation-optimized)
resource "aws_appautoscaling_target" "backend" {
  max_capacity       = var.backend_max_capacity
  min_capacity       = var.backend_min_capacity
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.backend.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"

  tags = var.tags
}

# Auto Scaling Policy for Frontend (CPU-based)
resource "aws_appautoscaling_policy" "frontend_cpu" {
  name               = "${var.name_prefix}-frontend-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.frontend.resource_id
  scalable_dimension = aws_appautoscaling_target.frontend.scalable_dimension
  service_namespace  = aws_appautoscaling_target.frontend.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 70.0
    scale_in_cooldown = 300
    scale_out_cooldown = 60
  }

  tags = var.tags
}

# Auto Scaling Policy for Backend (Conversation-optimized)
resource "aws_appautoscaling_policy" "backend_cpu" {
  name               = "${var.name_prefix}-backend-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.backend.resource_id
  scalable_dimension = aws_appautoscaling_target.backend.scalable_dimension
  service_namespace  = aws_appautoscaling_target.backend.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 60.0  # Lower threshold for conversation responsiveness
    scale_in_cooldown = 300
    scale_out_cooldown = 30  # Faster scale-out for conversation spikes
  }

  tags = var.tags
}

# CloudWatch Alarms for Conversation Metrics
resource "aws_cloudwatch_metric_alarm" "conversation_response_time" {
  alarm_name          = "${var.name_prefix}-conversation-response-time"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConversationResponseTime"
  namespace           = "NEWTUBE/Conversations"
  period              = "60"
  statistic           = "Average"
  threshold           = "3000"  # 3 seconds
  alarm_description   = "Conversation response time too high"
  alarm_actions       = [var.sns_topic_arn]

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "active_conversations" {
  alarm_name          = "${var.name_prefix}-active-conversations-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ActiveConversations"
  namespace           = "NEWTUBE/Conversations"
  period              = "60"
  statistic           = "Average"
  threshold           = "800"
  alarm_description   = "High number of active conversations"
  alarm_actions       = [aws_appautoscaling_policy.backend_cpu.arn]

  tags = var.tags
}

resource "aws_cloudwatch_metric_alarm" "websocket_connections" {
  alarm_name          = "${var.name_prefix}-websocket-connections-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "WebSocketConnections"
  namespace           = "NEWTUBE/Conversations"
  period              = "60"
  statistic           = "Average"
  threshold           = "1000"
  alarm_description   = "High number of WebSocket connections"
  alarm_actions       = [aws_appautoscaling_policy.backend_cpu.arn]

  tags = var.tags
}