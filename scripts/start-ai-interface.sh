#!/bin/bash

# NEWTUBE AI-First Interface Startup Script
# Optimized for revolutionary real-time UI generation

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../project" && pwd)"

echo -e "${PURPLE}🚀 NEWTUBE AI-First Interface Startup${NC}"
echo -e "${BLUE}Revolutionary real-time UI generation${NC}"
echo "=============================================="

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

# Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}Checking prerequisites...${NC}"
    
    # Check Docker
    if command -v docker &> /dev/null; then
        print_status "Docker is installed"
    else
        print_error "Docker is not installed"
        exit 1
    fi
    
    # Check Docker Compose
    if command -v docker-compose &> /dev/null; then
        print_status "Docker Compose is installed"
    else
        print_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
    else
        print_error "Node.js is not installed"
        exit 1
    fi
    
    # Check environment file
    if [[ -f "$PROJECT_ROOT/.env" ]]; then
        print_status "Environment file found"
    else
        print_warning "No .env file found, copying from .env.example"
        cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
    fi
}

# Start required services
start_services() {
    echo -e "${BLUE}Starting required services for AI interface...${NC}"
    
    cd "$SCRIPT_DIR/.."
    
    # Start databases and supporting services
    print_status "Starting PostgreSQL with pgvector for AI embeddings..."
    docker-compose up -d postgres
    
    print_status "Starting Redis for caching and sessions..."
    docker-compose up -d redis
    
    print_status "Starting Neo4j for Memento MCP knowledge graph..."
    docker-compose up -d neo4j
    
    # Wait for services to be ready
    echo -e "${BLUE}Waiting for services to be ready...${NC}"
    
    # Wait for PostgreSQL
    echo -n "Waiting for PostgreSQL..."
    timeout 60 bash -c 'until docker-compose exec -T postgres pg_isready -U newtube_user -d newtube; do echo -n "."; sleep 2; done'
    print_status "PostgreSQL is ready"
    
    # Wait for Redis
    echo -n "Waiting for Redis..."
    timeout 30 bash -c 'until docker-compose exec -T redis redis-cli ping | grep -q PONG; do echo -n "."; sleep 2; done'
    print_status "Redis is ready"
    
    # Wait for Neo4j
    echo -n "Waiting for Neo4j..."
    timeout 90 bash -c 'until docker-compose exec -T neo4j cypher-shell -u neo4j -p memento_password "MATCH () RETURN count(*) as count" &>/dev/null; do echo -n "."; sleep 3; done'
    print_status "Neo4j is ready"
}

# Setup database
setup_database() {
    echo -e "${BLUE}Setting up database for AI interface...${NC}"
    
    cd "$PROJECT_ROOT"
    
    # Install dependencies if needed
    if [[ ! -d "node_modules" ]]; then
        print_status "Installing dependencies..."
        npm ci
    fi
    
    # Run database migrations
    print_status "Running Prisma migrations..."
    npx prisma migrate deploy
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npx prisma generate
    
    # Seed database if needed
    if npx prisma db seed &> /dev/null; then
        print_status "Database seeded"
    else
        print_warning "No seed script found or already seeded"
    fi
}

# Check AI services
check_ai_services() {
    echo -e "${BLUE}Checking AI service configuration...${NC}"
    
    # Check for OpenAI API key
    if [[ -n "${OPENAI_API_KEY:-}" ]]; then
        print_status "OpenAI API key configured"
    else
        print_warning "OPENAI_API_KEY not set - AI features may be limited"
    fi
    
    # Check for other AI APIs
    if [[ -n "${GOOGLE_AI_API_KEY:-}" ]]; then
        print_status "Google AI API key configured"
    fi
    
    if [[ -n "${GROQ_API_KEY:-}" ]]; then
        print_status "Groq API key configured"
    fi
}

# Start AI interface
start_ai_interface() {
    echo -e "${BLUE}Starting NEWTUBE AI-First Interface...${NC}"
    
    cd "$PROJECT_ROOT"
    
    # Set AI interface environment variables
    export NEXT_PUBLIC_AI_ENABLED=true
    export NEXT_PUBLIC_VOICE_ENABLED=true
    export NEXT_PUBLIC_ENVIRONMENT=development
    
    print_status "Starting Next.js with Turbopack for hot reload..."
    print_status "AI Canvas will be available at: http://localhost:3000"
    print_status "Voice interface: http://localhost:3000/ai-canvas?interface=voice"
    print_status "Keyboard interface: http://localhost:3000/ai-canvas?interface=keyboard"
    
    echo ""
    echo -e "${PURPLE}🎨 AI Canvas Features Enabled:${NC}"
    echo -e "   • Real-time UI generation through conversation"
    echo -e "   • Voice-controlled interface creation"
    echo -e "   • Keyboard-driven component building"
    echo -e "   • Revolutionary streaming platform design"
    echo ""
    echo -e "${GREEN}Starting development server...${NC}"
    
    # Start the development server
    npm run dev
}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Shutting down AI interface...${NC}"
    cd "$SCRIPT_DIR/.."
    docker-compose down
    exit 0
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    check_prerequisites
    start_services
    setup_database
    check_ai_services
    start_ai_interface
}

# Show help
if [[ "${1:-}" == "--help" ]] || [[ "${1:-}" == "-h" ]]; then
    echo "NEWTUBE AI-First Interface Startup Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo ""
    echo "This script will:"
    echo "  1. Check prerequisites (Docker, Node.js)"
    echo "  2. Start required services (PostgreSQL, Redis, Neo4j)"
    echo "  3. Setup database and run migrations"
    echo "  4. Start the AI-first interface on http://localhost:3000"
    echo ""
    echo "Environment variables:"
    echo "  OPENAI_API_KEY     - Required for AI functionality"
    echo "  GOOGLE_AI_API_KEY  - Optional alternative AI provider"
    echo "  GROQ_API_KEY       - Optional alternative AI provider"
    echo ""
    exit 0
fi

# Run main function
main "$@"