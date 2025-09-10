# NEWTUBE Docker Development Environment

Complete Docker containerization setup for NEWTUBE streaming aggregator development environment.

## 🚀 Quick Start

### Prerequisites
- Docker 20.10+ installed
- Docker Compose 2.0+ installed
- Git (for cloning the repository)

### Start Development Environment

```bash
# Clone and navigate to project
git clone <repository-url>
cd newtube/docker

# Start all services
./scripts/dev-start.sh

# Or start with frontend and backend applications
./scripts/dev-start.sh --with-apps
```

### Stop Environment

```bash
# Stop all services
./scripts/dev-stop.sh

# Stop and remove all data (⚠️ destructive)
./scripts/dev-stop.sh --clean
```

## 📋 Services Overview

| Service | Purpose | Port | Health Check |
|---------|---------|------|--------------|
| **Frontend** | Next.js React App | 3000 | http://localhost:3000/api/health |
| **Backend** | Node.js GraphQL API | 4000 | http://localhost:4000/health |
| **PostgreSQL** | Main Database + pgvector | 5432 | pg_isready |
| **Redis** | Cache & Sessions | 6379 | redis-cli ping |
| **Neo4j** | Knowledge Graph (Memento) | 7474/7687 | cypher-shell |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         NEWTUBE Docker Stack                    │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Next.js)     │  Backend (Node.js)                   │
│  ├─ React Components    │  ├─ GraphQL API                      │
│  ├─ PWA Features        │  ├─ YouTube/Vimeo Connectors        │
│  ├─ Layout Engine       │  ├─ Authentication (Clerk)          │
│  └─ Hot Reload          │  └─ AI/ML Integration                │
├─────────────────────────┼─────────────────────────────────────┤
│         Data Layer      │         Knowledge Layer             │
│  PostgreSQL + pgvector  │  Neo4j + Memento MCP               │
│  ├─ User Data          │  ├─ Agent Memory                    │
│  ├─ Layouts            │  ├─ Project Knowledge               │
│  ├─ Vector Embeddings  │  └─ Cross-Agent Communication       │
│  └─ Performance Indexes│                                     │
├─────────────────────────┼─────────────────────────────────────┤
│      Cache Layer       │                                     │
│      Redis              │                                     │
│      ├─ API Responses   │                                     │
│      ├─ Session Data    │                                     │
│      └─ Rate Limiting   │                                     │
└─────────────────────────┴─────────────────────────────────────┘
```

## 🔧 Configuration Files

### Docker Compose Files
- `docker-compose.yml` - Base configuration for all environments
- `docker-compose.override.yml` - Development-specific overrides
- `docker-compose.prod.yml` - Production configuration

### Dockerfiles
- `Dockerfile.frontend` - Multi-stage Next.js build
- `Dockerfile.backend` - Multi-stage Node.js build

### Configuration
- `configs/postgresql.conf` - PostgreSQL development settings
- `configs/postgresql.prod.conf` - PostgreSQL production settings
- `configs/redis.conf` - Redis development settings
- `configs/redis.prod.conf` - Redis production settings

### Scripts
- `scripts/dev-start.sh` - Start development environment
- `scripts/dev-stop.sh` - Stop development environment
- `scripts/init-db.sh` - PostgreSQL initialization

## 🌍 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
# Edit .env with your API keys and settings
```

### Required Variables
```env
# Database
DATABASE_URL=postgresql://newtube_user:newtube_password@postgres:5432/newtube
POSTGRES_PASSWORD=newtube_password

# Neo4j (Memento MCP)
NEO4J_PASSWORD=memento_password

# Authentication
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=sk_test_your_clerk_key

# API Keys
YOUTUBE_API_KEY=your_youtube_api_key
OPENAI_API_KEY=sk-your_openai_key
```

## 🚀 Development Workflow

### 1. Start Services
```bash
./scripts/dev-start.sh --with-apps
```

### 2. Access Services
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Neo4j Browser**: http://localhost:7474
- **PostgreSQL**: localhost:5432

### 3. Development Features
- ✅ Hot reload for frontend and backend
- ✅ Volume mounts for live code editing
- ✅ Comprehensive logging
- ✅ Health checks for all services
- ✅ Database seeding with test data

### 4. Monitor Services
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Check service status
docker-compose ps
```

## 🗄️ Database Setup

### PostgreSQL with pgvector
- **Extensions**: pgvector, pg_trgm, btree_gin, uuid-ossp
- **Schema**: Users, layouts, panels, embeddings
- **Indexes**: HNSW for vector similarity, GIN for full-text search
- **Auto-initialization**: Runs on first startup

### Vector Database Features
```sql
-- Find similar videos using embeddings
SELECT * FROM find_similar_videos(
  '[0.1,0.2,...]'::vector(1536),
  0.7,  -- similarity threshold
  10    -- max results
);
```

### Neo4j Knowledge Graph
- **Purpose**: Memento MCP agent memory
- **Browser**: http://localhost:7474
- **Credentials**: neo4j/memento_password

## 🔄 Hot Reload Setup

### Frontend (Next.js)
- Source code mounted at `/app/src`
- Next.js development server with Fast Refresh
- Automatic TypeScript compilation
- Tailwind CSS hot reload

### Backend (Node.js)
- Source code mounted at `/app`
- Nodemon for automatic restarts
- Environment variable injection
- GraphQL schema hot reload

## 🎯 Production Deployment

### Build Production Images
```bash
# Build optimized production images
docker-compose -f docker-compose.prod.yml build

# Start production stack
docker-compose -f docker-compose.prod.yml up -d
```

### Production Features
- ✅ Multi-stage builds for smaller images
- ✅ Non-root user execution
- ✅ Resource limits and reservations
- ✅ Production-optimized configurations
- ✅ Security hardening

## 🛠️ Troubleshooting

### Common Issues

#### Services Won't Start
```bash
# Check service logs
docker-compose logs <service-name>

# Restart specific service
docker-compose restart <service-name>

# Rebuild with no cache
docker-compose build --no-cache <service-name>
```

#### Database Connection Issues
```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Connect to database manually
docker-compose exec postgres psql -U newtube_user -d newtube

# Check database initialization
docker-compose exec postgres ls -la /docker-entrypoint-initdb.d/
```

#### Port Conflicts
```bash
# Check what's using the port
sudo lsof -i :3000

# Use alternative ports (edit .env)
FRONTEND_PORT=3001
BACKEND_PORT=4001
```

#### Volume Permission Issues
```bash
# Fix permissions (Linux/macOS)
sudo chown -R $USER:$USER ./data

# Reset volumes (⚠️ destroys data)
docker-compose down -v
```

### Reset Environment
```bash
# Complete reset (⚠️ destroys all data)
./scripts/dev-stop.sh --clean
./scripts/dev-start.sh --with-apps
```

## 📊 Monitoring and Health Checks

### Service Health Endpoints
- Frontend: `GET /api/health`
- Backend: `GET /health`
- PostgreSQL: `pg_isready -U newtube_user -d newtube`
- Redis: `redis-cli ping`
- Neo4j: `cypher-shell -u neo4j -p memento_password "MATCH () RETURN count(*)"`

### Performance Monitoring
```bash
# Container resource usage
docker stats

# Service-specific metrics
docker-compose exec backend npm run health-check
docker-compose exec postgres pg_stat_activity
```

## 🔒 Security Considerations

### Development Security
- Default passwords for development only
- No exposed services to external networks
- Local SSL/TLS not required for development

### Production Security
- Change all default passwords
- Use secrets management (AWS Secrets Manager, etc.)
- Enable SSL/TLS for all external connections
- Implement proper firewall rules
- Regular security updates for base images

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL + pgvector](https://github.com/pgvector/pgvector)
- [Neo4j Documentation](https://neo4j.com/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/best-practices/)

### Development Tools
- **Database GUI**: pgAdmin, DBeaver
- **Redis GUI**: RedisInsight
- **Neo4j Browser**: Built-in at http://localhost:7474
- **API Testing**: Postman, Insomnia, GraphQL Playground

## 🆘 Support

For Docker environment issues:
1. Check the troubleshooting section above
2. Review service logs: `docker-compose logs <service>`
3. Verify environment variables in `.env`
4. Ensure Docker and Docker Compose are up to date
5. Try a complete environment reset

---

**Happy Coding! 🚀**