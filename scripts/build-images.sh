#!/bin/bash

# NEWTUBE - Docker Image Builder
# Builds optimized Docker images for frontend and backend services
# Usage: ./scripts/build-images.sh [--push] [--tag TAG] [--platform PLATFORM]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PUSH_IMAGES=false
TAG="latest"
PLATFORM="linux/amd64"
REGISTRY="ghcr.io"
REPO_NAME="codingbutter/newtube"
BUILD_CACHE=true
PARALLEL_BUILD=true

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --push)
      PUSH_IMAGES=true
      shift
      ;;
    --tag)
      TAG="$2"
      shift 2
      ;;
    --platform)
      PLATFORM="$2"
      shift 2
      ;;
    --no-cache)
      BUILD_CACHE=false
      shift
      ;;
    --no-parallel)
      PARALLEL_BUILD=false
      shift
      ;;
    --registry)
      REGISTRY="$2"
      shift 2
      ;;
    --help)
      echo "NEWTUBE Docker Image Builder"
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --push              Push images to registry after building"
      echo "  --tag TAG           Set image tag (default: latest)"
      echo "  --platform PLATFORM Set target platform (default: linux/amd64)"
      echo "  --no-cache          Disable build cache"
      echo "  --no-parallel       Disable parallel building"
      echo "  --registry URL      Set container registry (default: ghcr.io)"
      echo "  --help              Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Utility functions
log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
  echo -e "${RED}❌ $1${NC}"
}

check_dependencies() {
  log_info "Checking dependencies..."
  
  # Check if Docker is installed
  if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed"
    exit 1
  fi
  
  # Check if Docker Buildx is available
  if ! docker buildx version &> /dev/null; then
    log_error "Docker Buildx is not available"
    exit 1
  fi
  
  # Check Docker daemon
  if ! docker info &> /dev/null; then
    log_error "Docker daemon is not running"
    exit 1
  fi
  
  log_success "All dependencies are available"
}

setup_buildx() {
  log_info "Setting up Docker Buildx..."
  
  # Create buildx builder if it doesn't exist
  if ! docker buildx ls | grep -q newtube-builder; then
    docker buildx create --name newtube-builder --driver docker-container --use
  else
    docker buildx use newtube-builder
  fi
  
  # Bootstrap the builder
  docker buildx inspect --bootstrap
  
  log_success "Docker Buildx configured"
}

build_frontend_dockerfile() {
  if [ ! -f "docker/Dockerfile.frontend" ]; then
    log_info "Creating frontend Dockerfile..."
    
    cat > docker/Dockerfile.frontend << 'EOF'
# Multi-stage build for Next.js frontend
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY frontend/package.json frontend/yarn.lock* frontend/package-lock.json* frontend/pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Development image with hot reload
FROM base AS development
WORKDIR /app

ENV NODE_ENV=development

# Install dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY frontend/ .

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port on which the frontend will run
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl --fail http://localhost:3000/api/health || exit 1

# Start the application in development mode
CMD \
  if [ -f yarn.lock ]; then yarn dev; \
  elif [ -f package-lock.json ]; then npm run dev; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm dev; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl --fail http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
EOF
    
    log_success "Frontend Dockerfile created"
  fi
}

build_performance_test_script() {
  if [ ! -f "scripts/performance-test.js" ]; then
    log_info "Creating performance test script..."
    
    cat > scripts/performance-test.js << 'EOF'
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests must complete below 1s
    http_req_failed: ['rate<0.05'],    // Error rate must be below 5%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const API_URL = __ENV.API_URL || 'http://localhost:4000';

export default function() {
  // Test frontend
  let frontendResponse = http.get(BASE_URL);
  check(frontendResponse, {
    'frontend status is 200': (r) => r.status === 200,
    'frontend response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  errorRate.add(frontendResponse.status !== 200);

  // Test API health
  let apiResponse = http.get(`${API_URL}/health`);
  check(apiResponse, {
    'api health status is 200': (r) => r.status === 200,
    'api health response time < 500ms': (r) => r.timings.duration < 500,
  });
  errorRate.add(apiResponse.status !== 200);

  // Test GraphQL endpoint
  let graphqlPayload = JSON.stringify({
    query: 'query { __schema { queryType { name } } }'
  });
  let graphqlResponse = http.post(`${API_URL}/graphql`, graphqlPayload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  check(graphqlResponse, {
    'graphql status is 200': (r) => r.status === 200,
    'graphql response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  errorRate.add(graphqlResponse.status !== 200);

  sleep(1);
}
EOF
    
    log_success "Performance test script created"
  fi
}

calculate_image_size() {
  local image_name=$1
  local size=$(docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | grep "$image_name" | awk '{print $2}' | head -1)
  echo "$size"
}

build_image() {
  local component=$1
  local dockerfile=$2
  local context=$3
  local target=$4
  
  log_info "Building $component image..."
  
  local image_name="$REGISTRY/$REPO_NAME-$component:$TAG"
  local build_args="--platform $PLATFORM"
  
  if [ "$BUILD_CACHE" = true ]; then
    build_args="$build_args --cache-from type=gha --cache-to type=gha,mode=max"
  else
    build_args="$build_args --no-cache"
  fi
  
  if [ ! -z "$target" ]; then
    build_args="$build_args --target $target"
  fi
  
  # Add build metadata
  build_args="$build_args --label org.opencontainers.image.source=https://github.com/$REPO_NAME"
  build_args="$build_args --label org.opencontainers.image.revision=$(git rev-parse HEAD 2>/dev/null || echo 'unknown')"
  build_args="$build_args --label org.opencontainers.image.created=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  
  if [ "$PUSH_IMAGES" = true ]; then
    build_args="$build_args --push"
  else
    build_args="$build_args --load"
  fi
  
  # Build the image
  docker buildx build \
    $build_args \
    -f "$dockerfile" \
    -t "$image_name" \
    "$context" || {
    log_error "Failed to build $component image"
    return 1
  }
  
  if [ "$PUSH_IMAGES" != true ]; then
    local image_size=$(calculate_image_size "$REGISTRY/$REPO_NAME-$component")
    log_success "$component image built successfully (Size: $image_size)"
  else
    log_success "$component image built and pushed successfully"
  fi
}

build_all_images() {
  log_info "Building all Docker images..."
  
  # Ensure frontend Dockerfile exists
  build_frontend_dockerfile
  
  # Build images
  if [ "$PARALLEL_BUILD" = true ]; then
    log_info "Building images in parallel..."
    
    # Build backend image in background
    (build_image "backend" "docker/Dockerfile.backend" "." "production") &
    backend_pid=$!
    
    # Build frontend image in background
    (build_image "frontend" "docker/Dockerfile.frontend" "." "production") &
    frontend_pid=$!
    
    # Wait for both builds to complete
    wait $backend_pid || {
      log_error "Backend image build failed"
      return 1
    }
    
    wait $frontend_pid || {
      log_error "Frontend image build failed"
      return 1
    }
    
  else
    log_info "Building images sequentially..."
    
    build_image "backend" "docker/Dockerfile.backend" "." "production" || return 1
    build_image "frontend" "docker/Dockerfile.frontend" "." "production" || return 1
  fi
  
  log_success "All images built successfully"
}

optimize_images() {
  if [ "$PUSH_IMAGES" = true ]; then
    return 0  # Skip optimization if pushing
  fi
  
  log_info "Optimizing Docker images..."
  
  # Remove dangling images
  docker image prune -f &> /dev/null || true
  
  # Show image sizes
  echo ""
  echo "Image Sizes:"
  echo "============"
  docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | grep "$REPO_NAME" || true
  
  log_success "Image optimization completed"
}

security_scan() {
  if [ "$PUSH_IMAGES" = true ]; then
    return 0  # Skip security scan if pushing
  fi
  
  log_info "Running security scan on images..."
  
  # Check if trivy is available
  if command -v trivy &> /dev/null; then
    for component in backend frontend; do
      log_info "Scanning $component image..."
      trivy image --severity HIGH,CRITICAL "$REGISTRY/$REPO_NAME-$component:$TAG" || {
        log_warning "Security scan failed for $component"
      }
    done
  else
    log_warning "Trivy not available - skipping security scan"
  fi
  
  log_success "Security scan completed"
}

generate_build_report() {
  log_info "Generating build report..."
  
  mkdir -p build-results
  
  echo "# NEWTUBE Docker Build Report" > build-results/build-report.md
  echo "Generated on: $(date)" >> build-results/build-report.md
  echo "" >> build-results/build-report.md
  
  echo "## Build Configuration" >> build-results/build-report.md
  echo "- Tag: $TAG" >> build-results/build-report.md
  echo "- Platform: $PLATFORM" >> build-results/build-report.md
  echo "- Registry: $REGISTRY" >> build-results/build-report.md
  echo "- Push Images: $PUSH_IMAGES" >> build-results/build-report.md
  echo "- Build Cache: $BUILD_CACHE" >> build-results/build-report.md
  echo "- Parallel Build: $PARALLEL_BUILD" >> build-results/build-report.md
  echo "" >> build-results/build-report.md
  
  if [ "$PUSH_IMAGES" != true ]; then
    echo "## Image Information" >> build-results/build-report.md
    echo "\`\`\`" >> build-results/build-report.md
    docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}" | grep "$REPO_NAME" >> build-results/build-report.md
    echo "\`\`\`" >> build-results/build-report.md
  fi
  
  log_success "Build report generated at build-results/build-report.md"
}

# Main execution
main() {
  echo "🐳 NEWTUBE Docker Image Builder"
  echo "==============================="
  
  # Check dependencies
  check_dependencies
  
  # Setup buildx
  setup_buildx
  
  # Create performance test script if needed
  build_performance_test_script
  
  # Build all images
  build_all_images || {
    log_error "Image build failed"
    exit 1
  }
  
  # Optimize images
  optimize_images
  
  # Run security scan
  security_scan
  
  # Generate report
  generate_build_report
  
  log_success "Docker image build completed successfully! 🎉"
  
  if [ "$PUSH_IMAGES" = true ]; then
    echo ""
    echo "Images pushed to registry:"
    echo "- $REGISTRY/$REPO_NAME-backend:$TAG"
    echo "- $REGISTRY/$REPO_NAME-frontend:$TAG"
  fi
}

# Run main function
main "$@"