# NEWTUBE AWS Infrastructure

This directory contains the complete AWS infrastructure setup for the NEWTUBE streaming aggregator platform, implemented using Infrastructure as Code (Terraform) principles.

## 🏗️ Architecture Overview

The NEWTUBE infrastructure is designed for high availability, scalability, and security with the following components:

### Core Infrastructure
- **VPC**: Multi-AZ Virtual Private Cloud with public and private subnets
- **ECS Fargate**: Containerized application hosting with auto-scaling
- **Application Load Balancer**: Traffic distribution with SSL termination
- **RDS PostgreSQL**: Database with pgvector extension for AI/ML features
- **ElastiCache Redis**: Caching layer for improved performance

### Security
- **WAF**: Web Application Firewall with rate limiting and attack protection
- **Security Groups**: Fine-grained network access control
- **Secrets Manager**: Secure storage of API keys and credentials
- **VPC Flow Logs**: Network traffic monitoring

### Monitoring & Observability
- **CloudWatch**: Metrics, logs, and alerting
- **Grafana Cloud**: Advanced monitoring dashboards
- **Performance Insights**: Database performance monitoring
- **X-Ray**: Distributed tracing (optional)

## 📁 Directory Structure

```
devops-aws-infrastructure/
├── terraform/                 # Terraform configurations
│   ├── main.tf                # Main infrastructure definition
│   ├── variables.tf           # Input variables
│   ├── outputs.tf            # Output values
│   └── modules/              # Reusable Terraform modules
│       ├── vpc/              # VPC and networking
│       ├── security/         # Security groups and WAF
│       ├── rds/              # Database configuration
│       ├── ecs/              # Container orchestration
│       └── monitoring/       # CloudWatch and alerts
├── scripts/                  # Deployment and utility scripts
│   └── deploy-infrastructure.sh  # Main deployment script
├── monitoring/               # Monitoring configurations
│   └── grafana-config.yml    # Grafana Cloud setup
├── .env.production.example   # Environment variables template
└── INFRASTRUCTURE.md         # This file
```

## 🚀 Quick Start

### Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Terraform** v1.0+ installed
3. **jq** for JSON processing
4. Valid AWS account with necessary permissions

### Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.production.example .env
   ```

2. Fill in the required values in `.env`:
   - AWS region and account details
   - Database configuration
   - API keys (OpenAI, YouTube, Clerk)
   - Monitoring credentials
   - Domain configuration

3. Configure AWS credentials:
   ```bash
   aws configure
   # OR
   export AWS_ACCESS_KEY_ID=your-key
   export AWS_SECRET_ACCESS_KEY=your-secret
   ```

### Deployment

Deploy the complete infrastructure:

```bash
# Plan the deployment (recommended first)
./scripts/deploy-infrastructure.sh plan

# Deploy everything
./scripts/deploy-infrastructure.sh deploy

# Or apply a previously created plan
./scripts/deploy-infrastructure.sh apply
```

### Destruction

To destroy all infrastructure:

```bash
./scripts/deploy-infrastructure.sh destroy
```

## 🔧 Configuration

### Environment Variables

Key environment variables that need to be configured:

#### Required
- `AWS_REGION`: AWS region for deployment
- `ENVIRONMENT`: Environment name (dev/staging/prod)
- `JWT_SECRET`: Secret for JWT token signing
- `CLERK_SECRET_KEY`: Clerk authentication service key
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `YOUTUBE_API_KEY`: YouTube Data API v3 key
- `NOTIFICATION_EMAIL`: Email for alerts

#### Optional
- `SLACK_WEBHOOK_URL`: Slack notifications
- `GRAFANA_API_KEY`: Grafana Cloud monitoring
- `VIMEO_CLIENT_ID`: Vimeo API integration

### Resource Sizing

Configure resources based on your expected load:

#### Development
```bash
DB_INSTANCE_CLASS=db.t3.micro
FRONTEND_MIN_CAPACITY=1
BACKEND_MIN_CAPACITY=1
```

#### Production
```bash
DB_INSTANCE_CLASS=db.r6g.large
FRONTEND_MIN_CAPACITY=2
BACKEND_MIN_CAPACITY=2
FRONTEND_MAX_CAPACITY=20
BACKEND_MAX_CAPACITY=20
```

## 🗄️ Database Configuration

The RDS PostgreSQL instance is configured with:

- **pgvector extension**: Enabled for AI/ML vector operations
- **Encryption**: At rest and in transit
- **Backups**: Automated with configurable retention
- **Performance Insights**: Enabled for monitoring
- **Read Replicas**: Available in production

### pgvector Setup

The database is automatically initialized with:
- pgvector extension installation
- HNSW indexes for similarity search
- Test table for vector functionality verification

## 📊 Monitoring

### CloudWatch Metrics

Monitored metrics include:
- ECS service CPU and memory utilization
- Application Load Balancer response times and error rates
- RDS database performance and connections
- Custom application metrics

### Alerts

Configured alerts for:
- High CPU/memory usage (>80%)
- Database connection limits
- Application error rates (>5%)
- Response time degradation (>2s)
- API quota usage (YouTube, OpenAI)

### Grafana Cloud

Optional integration with Grafana Cloud provides:
- Advanced dashboards
- Custom alerting rules
- Log aggregation with Loki
- Distributed tracing with Tempo

## 🔒 Security Best Practices

### Network Security
- Private subnets for application and database tiers
- Security groups with least privilege access
- WAF protection against common attacks
- VPC Flow Logs for network monitoring

### Data Protection
- Encryption at rest for all storage
- Encryption in transit with TLS
- Secrets stored in AWS Secrets Manager
- Regular security scanning in CI/CD

### Access Control
- IAM roles with minimal required permissions
- No hard-coded credentials in code
- MFA enforcement for privileged operations
- Regular access reviews

## 🎯 Performance Optimization

### Auto Scaling
- ECS services scale based on CPU/memory metrics
- Database read replicas in production
- CloudFront CDN for static assets
- Redis caching for frequently accessed data

### Database Optimization
- Connection pooling
- Query performance insights
- Automated maintenance windows
- Regular backup and recovery testing

## 🚨 Troubleshooting

### Common Issues

1. **Terraform State Lock**
   ```bash
   # If deployment fails due to state lock
   terraform force-unlock LOCK_ID
   ```

2. **Database Connection Issues**
   ```bash
   # Check security groups and VPC configuration
   aws ec2 describe-security-groups --group-ids sg-xxxxx
   ```

3. **ECS Service Won't Start**
   ```bash
   # Check ECS service events
   aws ecs describe-services --cluster newtube-prod --services newtube-prod-backend
   ```

### Useful Commands

```bash
# Check infrastructure status
terraform show

# View outputs
terraform output

# Validate configuration
terraform validate

# Format code
terraform fmt -recursive
```

## 📋 Maintenance

### Regular Tasks

1. **Weekly**
   - Review CloudWatch alarms and metrics
   - Check database performance insights
   - Verify backup completion

2. **Monthly**
   - Update Terraform modules to latest versions
   - Review and rotate API keys
   - Performance testing and optimization

3. **Quarterly**
   - Security audit and penetration testing
   - Disaster recovery testing
   - Capacity planning review

### Updates

To update the infrastructure:

1. Update Terraform configurations
2. Test in development environment
3. Plan and review changes
4. Apply during maintenance window
5. Monitor for issues post-deployment

## 🤝 Contributing

When making changes to the infrastructure:

1. Create a new feature branch
2. Update relevant documentation
3. Test changes in development
4. Submit pull request with detailed description
5. Ensure all CI/CD checks pass

## 📞 Support

For infrastructure issues or questions:

- Check CloudWatch logs and metrics
- Review Grafana dashboards
- Consult runbook for common procedures
- Contact DevOps team for critical issues

## 🔄 Disaster Recovery

The infrastructure includes:

- Multi-AZ deployment for high availability
- Automated backups with point-in-time recovery
- Infrastructure as Code for rapid rebuild
- Documented recovery procedures
- Regular DR testing schedule

Recovery Time Objective (RTO): 4 hours
Recovery Point Objective (RPO): 1 hour