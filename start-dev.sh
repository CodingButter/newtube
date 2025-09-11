#!/bin/bash

# NEWTUBE Local Development Startup Script
echo "🎥 Starting NEWTUBE Local Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to handle cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down NEWTUBE services...${NC}"
    
    # Kill background processes
    if [ ! -z "$BACKEND_PID" ]; then
        echo "🛑 Stopping backend server..."
        kill $BACKEND_PID 2>/dev/null
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo "🛑 Stopping frontend server..."
        kill $FRONTEND_PID 2>/dev/null
    fi
    
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

# Set trap to handle Ctrl+C
trap cleanup SIGINT SIGTERM

# Check if we're in the correct directory structure
if [ ! -d "../frontend-panels" ] || [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Run this script from /home/codingbutter/com/newtube/www/worktrees/devops-local-setup${NC}"
    echo -e "${YELLOW}Current directory: $(pwd)${NC}"
    exit 1
fi

# Check if node_modules exist for both projects
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    npm install
fi

if [ ! -d "../frontend-panels/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    cd ../frontend-panels && npm install && cd ../devops-local-setup
fi

echo -e "${BLUE}🚀 Starting Backend Server (Port 4000)...${NC}"
npm run dev > /tmp/newtube-backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend is running
if ! curl -s http://localhost:4000/health > /dev/null; then
    echo -e "${RED}❌ Backend failed to start. Check logs:${NC}"
    cat /tmp/newtube-backend.log
    exit 1
fi

echo -e "${GREEN}✅ Backend started on http://localhost:4000${NC}"
echo -e "${BLUE}📊 Health check: http://localhost:4000/health${NC}"
echo -e "${BLUE}🎯 GraphQL endpoint: http://localhost:4000/graphql${NC}"

echo -e "\n${BLUE}🚀 Starting Frontend Server (Port 3000)...${NC}"
cd ../frontend-panels
npm run dev > /tmp/newtube-frontend.log 2>&1 &
FRONTEND_PID=$!
cd ../devops-local-setup

# Wait for frontend to start
sleep 5

# Check if frontend is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${RED}❌ Frontend failed to start. Check logs:${NC}"
    cat /tmp/newtube-frontend.log
    cleanup
    exit 1
fi

echo -e "${GREEN}✅ Frontend started on http://localhost:3000${NC}"

echo -e "\n${GREEN}🎉 NEWTUBE Development Environment Ready!${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${GREEN}🌐 Frontend:${NC} http://localhost:3000"
echo -e "${GREEN}🔧 Backend:${NC}  http://localhost:4000"
echo -e "${GREEN}📊 Health:${NC}   http://localhost:4000/health"
echo -e "${GREEN}🎯 GraphQL:${NC}  http://localhost:4000/graphql"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${BLUE}💡 Press Ctrl+C to stop all services${NC}"

# Keep script running and show logs
echo -e "\n${BLUE}📋 Monitoring services... (Ctrl+C to stop)${NC}"

# Monitor both services
while true; do
    # Check if backend is still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "${RED}❌ Backend process died!${NC}"
        break
    fi
    
    # Check if frontend is still running
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "${RED}❌ Frontend process died!${NC}"
        break
    fi
    
    sleep 5
done

cleanup