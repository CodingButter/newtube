#!/bin/bash
# NEWTUBE Development Environment Startup Script
# This script starts all services for local development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$(dirname "$DOCKER_DIR")")"

echo -e "${BLUE}🚀 Starting NEWTUBE Development Environment${NC}"
echo -e "${BLUE}📁 Project Root: $PROJECT_ROOT${NC}"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

if ! command_exists docker; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

if ! command_exists docker-compose; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites satisfied${NC}"
echo ""

# Change to docker directory
cd "$DOCKER_DIR"

# Create necessary directories
echo -e "${YELLOW}📁 Creating data directories...${NC}"
mkdir -p postgres/data postgres/init redis/data neo4j/data neo4j/logs neo4j/import neo4j/plugins

# Set permissions for PostgreSQL initialization script
if [ -f "scripts/init-db.sh" ]; then
    chmod +x scripts/init-db.sh
    cp scripts/init-db.sh postgres/init/
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}📋 Creating .env file from .env.example...${NC}"
        cp .env.example .env
        echo -e "${YELLOW}⚠️  Please edit .env file with your actual API keys${NC}"
    else
        echo -e "${YELLOW}📋 Creating basic .env file...${NC}"
        cat > .env << EOL
# NEWTUBE Development Environment Variables
NODE_ENV=development

# Database
POSTGRES_PASSWORD=newtube_password
DATABASE_URL=postgresql://newtube_user:newtube_password@postgres:5432/newtube

# Neo4j (for Memento MCP)
NEO4J_PASSWORD=memento_password

# Redis
REDIS_URL=redis://redis:6379

# JWT
JWT_SECRET=dev_jwt_secret_change_in_production

# API Keys (add your own)
YOUTUBE_API_KEY=your_youtube_api_key_here
VIMEO_CLIENT_ID=your_vimeo_client_id_here
VIMEO_CLIENT_SECRET=your_vimeo_client_secret_here
OPENAI_API_KEY=your_openai_api_key_here

# Clerk Authentication (add your own)
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
EOL
        echo -e "${YELLOW}⚠️  Please edit .env file with your actual API keys${NC}"
    fi
fi

# Stop any existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose down --remove-orphans 2>/dev/null || true

# Pull latest images
echo -e "${YELLOW}📥 Pulling latest Docker images...${NC}"
docker-compose pull

# Build custom images
echo -e "${YELLOW}🔨 Building application images...${NC}"
docker-compose build --no-cache

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"

# Function to wait for service health
wait_for_service() {
    local service_name=$1
    local max_attempts=30
    local attempt=1

    echo -n "  Waiting for $service_name..."
    
    while [ $attempt -le $max_attempts ]; do
        if docker-compose ps | grep "$service_name" | grep -q "healthy\|Up"; then
            echo -e " ${GREEN}✅${NC}"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e " ${RED}❌ (timeout)${NC}"
    return 1
}

# Wait for each service
wait_for_service "postgres"
wait_for_service "redis"
wait_for_service "neo4j"

# Check if application services should be started
if [ "$1" = "--with-apps" ] || [ "$1" = "-a" ]; then
    echo -e "${YELLOW}🚀 Starting application services...${NC}"
    wait_for_service "backend"
    wait_for_service "frontend"
fi

echo ""
echo -e "${GREEN}🎉 Development environment is ready!${NC}"
echo ""
echo -e "${BLUE}📊 Service URLs:${NC}"
echo -e "  🗄️  PostgreSQL:   ${YELLOW}localhost:5432${NC}"
echo -e "  🔴 Redis:         ${YELLOW}localhost:6379${NC}"
echo -e "  🔗 Neo4j Browser: ${YELLOW}http://localhost:7474${NC}"
echo -e "  🔗 Neo4j Bolt:    ${YELLOW}bolt://localhost:7687${NC}"

if [ "$1" = "--with-apps" ] || [ "$1" = "-a" ]; then
    echo -e "  🌐 Frontend:      ${YELLOW}http://localhost:3000${NC}"
    echo -e "  🔧 Backend API:   ${YELLOW}http://localhost:4000${NC}"
fi

echo ""
echo -e "${BLUE}🛠️  Useful commands:${NC}"
echo -e "  View logs:        ${YELLOW}docker-compose logs -f${NC}"
echo -e "  Stop services:    ${YELLOW}docker-compose down${NC}"
echo -e "  Restart service:  ${YELLOW}docker-compose restart <service>${NC}"
echo -e "  Enter container:  ${YELLOW}docker-compose exec <service> sh${NC}"
echo ""

# Show container status
echo -e "${BLUE}📋 Container Status:${NC}"
docker-compose ps

echo ""
echo -e "${GREEN}✨ Happy coding! ✨${NC}"