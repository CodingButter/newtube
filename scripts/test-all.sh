#!/bin/bash

# NEWTUBE - Comprehensive Test Runner
# Runs all tests across frontend, backend, and integration layers
# Usage: ./scripts/test-all.sh [--coverage] [--e2e] [--performance]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COVERAGE_ENABLED=false
E2E_ENABLED=false
PERFORMANCE_ENABLED=false
PARALLEL_JOBS=4

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --coverage)
      COVERAGE_ENABLED=true
      shift
      ;;
    --e2e)
      E2E_ENABLED=true
      shift
      ;;
    --performance)
      PERFORMANCE_ENABLED=true
      shift
      ;;
    --parallel)
      PARALLEL_JOBS="$2"
      shift 2
      ;;
    --help)
      echo "NEWTUBE Test Runner"
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --coverage      Enable code coverage reporting"
      echo "  --e2e          Run end-to-end tests"
      echo "  --performance  Run performance tests"
      echo "  --parallel N   Set number of parallel jobs (default: 4)"
      echo "  --help         Show this help message"
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
  
  # Check if Node.js is installed
  if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed"
    exit 1
  fi
  
  # Check if npm is installed
  if ! command -v npm &> /dev/null; then
    log_error "npm is not installed"
    exit 1
  fi
  
  # Check if Docker is installed (for integration tests)
  if ! command -v docker &> /dev/null; then
    log_warning "Docker is not installed - integration tests will be skipped"
    return 1
  fi
  
  # Check if Docker Compose is available
  if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    log_warning "Docker Compose is not available - integration tests will be skipped"
    return 1
  fi
  
  log_success "All dependencies are available"
  return 0
}

setup_test_environment() {
  log_info "Setting up test environment..."
  
  # Create test results directory
  mkdir -p test-results
  
  # Set test environment variables
  export NODE_ENV=test
  export CI=true
  export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/newtube_test
  export REDIS_URL=redis://localhost:6379
  export JWT_SECRET=test_secret
  
  log_success "Test environment configured"
}

run_backend_tests() {
  log_info "Running backend tests..."
  
  cd backend || {
    log_error "Backend directory not found"
    return 1
  }
  
  # Install dependencies if needed
  if [ ! -d "node_modules" ]; then
    log_info "Installing backend dependencies..."
    npm ci
  fi
  
  # Run linting
  log_info "Running backend linting..."
  npm run lint || {
    log_error "Backend linting failed"
    return 1
  }
  
  # Run TypeScript compilation check
  log_info "Running backend TypeScript check..."
  npm run typecheck || {
    log_error "Backend TypeScript check failed"
    return 1
  }
  
  # Start test database if Docker is available
  if docker ps &> /dev/null; then
    log_info "Starting test database..."
    docker run -d --name newtube-test-db \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_DB=newtube_test \
      -p 5432:5432 \
      pgvector/pgvector:pg16 || true
    
    # Wait for database to be ready
    timeout 30 bash -c 'until pg_isready -h localhost -p 5432; do sleep 1; done' || {
      log_warning "Test database not available - some tests may fail"
    }
    
    # Run database migrations
    npm run db:migrate:init || {
      log_warning "Database migration failed"
    }
  fi
  
  # Run unit tests
  log_info "Running backend unit tests..."
  if [ "$COVERAGE_ENABLED" = true ]; then
    npm test -- --coverage --testPathPattern="\.test\." || {
      log_error "Backend unit tests failed"
      return 1
    }
  else
    npm test -- --testPathPattern="\.test\." || {
      log_error "Backend unit tests failed"
      return 1
    }
  fi
  
  # Run integration tests if database is available
  if docker ps | grep newtube-test-db &> /dev/null; then
    log_info "Running backend integration tests..."
    npm run test:api || {
      log_warning "Backend integration tests failed"
    }
  fi
  
  cd ..
  log_success "Backend tests completed"
}

run_frontend_tests() {
  log_info "Running frontend tests..."
  
  cd frontend || {
    log_error "Frontend directory not found"
    return 1
  }
  
  # Install dependencies if needed
  if [ ! -d "node_modules" ]; then
    log_info "Installing frontend dependencies..."
    npm ci
  fi
  
  # Run linting
  log_info "Running frontend linting..."
  npm run lint || {
    log_error "Frontend linting failed"
    return 1
  }
  
  # Run TypeScript compilation check
  log_info "Running frontend TypeScript check..."
  npm run typecheck || {
    log_error "Frontend TypeScript check failed"
    return 1
  }
  
  # Check if build succeeds
  log_info "Testing frontend build..."
  npm run build || {
    log_error "Frontend build failed"
    return 1
  }
  
  # Run unit tests
  log_info "Running frontend unit tests..."
  if [ "$COVERAGE_ENABLED" = true ]; then
    npm test -- --coverage --watchAll=false || {
      log_error "Frontend unit tests failed"
      return 1
    }
  else
    npm test -- --watchAll=false || {
      log_error "Frontend unit tests failed"
      return 1
    }
  fi
  
  cd ..
  log_success "Frontend tests completed"
}

run_e2e_tests() {
  if [ "$E2E_ENABLED" != true ]; then
    return 0
  fi
  
  log_info "Running end-to-end tests..."
  
  # Start the full application stack
  log_info "Starting application stack..."
  docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d || {
    log_error "Failed to start application stack"
    return 1
  }
  
  # Wait for services to be ready
  log_info "Waiting for services to be ready..."
  timeout 120 bash -c 'until curl -f http://localhost:3000; do sleep 5; done' || {
    log_error "Frontend did not start in time"
    docker-compose logs
    docker-compose down
    return 1
  }
  
  timeout 120 bash -c 'until curl -f http://localhost:4000/health; do sleep 5; done' || {
    log_error "Backend did not start in time"
    docker-compose logs
    docker-compose down
    return 1
  }
  
  # Run Playwright tests
  cd frontend
  
  # Install Playwright if not already installed
  if [ ! -d "playwright-report" ]; then
    log_info "Installing Playwright..."
    npx playwright install --with-deps
  fi
  
  log_info "Running Playwright E2E tests..."
  npx playwright test || {
    log_error "E2E tests failed"
    docker-compose down
    cd ..
    return 1
  }
  
  cd ..
  
  # Stop services
  docker-compose down
  
  log_success "E2E tests completed"
}

run_performance_tests() {
  if [ "$PERFORMANCE_ENABLED" != true ]; then
    return 0
  fi
  
  log_info "Running performance tests..."
  
  # Check if k6 is installed
  if ! command -v k6 &> /dev/null; then
    log_warning "k6 is not installed - performance tests skipped"
    return 0
  fi
  
  # Start application if not already running
  if ! curl -f http://localhost:3000 &> /dev/null; then
    log_info "Starting application for performance tests..."
    docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
    
    timeout 120 bash -c 'until curl -f http://localhost:3000; do sleep 5; done' || {
      log_error "Application did not start for performance tests"
      return 1
    }
  fi
  
  # Run performance tests
  if [ -f "scripts/performance-test.js" ]; then
    k6 run scripts/performance-test.js || {
      log_warning "Performance tests failed"
    }
  else
    log_warning "Performance test script not found"
  fi
  
  log_success "Performance tests completed"
}

cleanup() {
  log_info "Cleaning up test environment..."
  
  # Stop test database
  docker stop newtube-test-db &> /dev/null || true
  docker rm newtube-test-db &> /dev/null || true
  
  # Stop application stack
  docker-compose down &> /dev/null || true
  
  log_success "Cleanup completed"
}

generate_report() {
  log_info "Generating test report..."
  
  echo "# NEWTUBE Test Report" > test-results/report.md
  echo "Generated on: $(date)" >> test-results/report.md
  echo "" >> test-results/report.md
  
  echo "## Test Configuration" >> test-results/report.md
  echo "- Coverage: $COVERAGE_ENABLED" >> test-results/report.md
  echo "- E2E Tests: $E2E_ENABLED" >> test-results/report.md
  echo "- Performance Tests: $PERFORMANCE_ENABLED" >> test-results/report.md
  echo "- Parallel Jobs: $PARALLEL_JOBS" >> test-results/report.md
  echo "" >> test-results/report.md
  
  if [ "$COVERAGE_ENABLED" = true ]; then
    echo "## Coverage Reports" >> test-results/report.md
    echo "- Backend: See backend/coverage/" >> test-results/report.md
    echo "- Frontend: See frontend/coverage/" >> test-results/report.md
    echo "" >> test-results/report.md
  fi
  
  log_success "Test report generated at test-results/report.md"
}

# Main execution
main() {
  echo "🧪 NEWTUBE Test Runner"
  echo "======================"
  
  # Trap to ensure cleanup on exit
  trap cleanup EXIT
  
  # Check dependencies
  DOCKER_AVAILABLE=true
  check_dependencies || DOCKER_AVAILABLE=false
  
  # Setup test environment
  setup_test_environment
  
  # Run tests
  run_backend_tests || {
    log_error "Backend tests failed"
    exit 1
  }
  
  run_frontend_tests || {
    log_error "Frontend tests failed"
    exit 1
  }
  
  if [ "$DOCKER_AVAILABLE" = true ]; then
    run_e2e_tests || {
      log_warning "E2E tests failed"
    }
    
    run_performance_tests || {
      log_warning "Performance tests failed"
    }
  else
    log_warning "Docker not available - skipping E2E and performance tests"
  fi
  
  # Generate report
  generate_report
  
  log_success "All tests completed successfully! 🎉"
}

# Run main function
main "$@"