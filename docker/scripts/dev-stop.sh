#!/bin/bash
# NEWTUBE Development Environment Stop Script
# This script stops all development services gracefully

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

echo -e "${BLUE}🛑 Stopping NEWTUBE Development Environment${NC}"
echo ""

# Change to docker directory
cd "$DOCKER_DIR"

# Parse command line arguments
REMOVE_VOLUMES=false
REMOVE_IMAGES=false
CLEAN_ALL=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --volumes|-v)
            REMOVE_VOLUMES=true
            shift
            ;;
        --images|-i)
            REMOVE_IMAGES=true
            shift
            ;;
        --clean|-c)
            CLEAN_ALL=true
            REMOVE_VOLUMES=true
            REMOVE_IMAGES=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --volumes, -v    Remove data volumes (will delete all data)"
            echo "  --images, -i     Remove built images"
            echo "  --clean, -c      Complete cleanup (volumes + images)"
            echo "  --help, -h       Show this help message"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Stop containers gracefully
echo -e "${YELLOW}🛑 Stopping containers gracefully...${NC}"
docker-compose down --timeout 30

if [ "$REMOVE_VOLUMES" = true ]; then
    echo -e "${YELLOW}🗑️  Removing data volumes...${NC}"
    echo -e "${RED}⚠️  This will delete ALL database data!${NC}"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v
        echo -e "${GREEN}✅ Volumes removed${NC}"
    else
        echo -e "${BLUE}ℹ️  Volume removal cancelled${NC}"
    fi
fi

if [ "$REMOVE_IMAGES" = true ]; then
    echo -e "${YELLOW}🗑️  Removing built images...${NC}"
    
    # Remove NEWTUBE specific images
    docker images | grep newtube | awk '{print $3}' | xargs -r docker rmi -f
    
    # Clean up dangling images
    docker image prune -f
    
    echo -e "${GREEN}✅ Images removed${NC}"
fi

if [ "$CLEAN_ALL" = true ]; then
    echo -e "${YELLOW}🧹 Performing complete cleanup...${NC}"
    
    # Remove any orphaned containers
    docker-compose down --remove-orphans
    
    # Clean up build cache
    docker builder prune -f
    
    # Clean up networks
    docker network prune -f
    
    echo -e "${GREEN}✅ Complete cleanup finished${NC}"
fi

# Show remaining containers (if any)
RUNNING_CONTAINERS=$(docker ps -q --filter "name=newtube")
if [ -n "$RUNNING_CONTAINERS" ]; then
    echo -e "${YELLOW}⚠️  Some NEWTUBE containers are still running:${NC}"
    docker ps --filter "name=newtube"
else
    echo -e "${GREEN}✅ All NEWTUBE containers stopped${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Environment stopped successfully!${NC}"
echo ""
echo -e "${BLUE}🛠️  To restart the environment:${NC}"
echo -e "  Full restart:     ${YELLOW}./scripts/dev-start.sh${NC}"
echo -e "  With apps:        ${YELLOW}./scripts/dev-start.sh --with-apps${NC}"
echo ""