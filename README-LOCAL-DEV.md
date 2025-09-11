# NEWTUBE Local Development Setup

🎥 **NEWTUBE** - Consumer streaming aggregator that discovers and displays videos from external platforms (YouTube, Vimeo, Nebula).

## ⚡ Quick Start (20 seconds)

```bash
# From this directory (/worktrees/devops-local-setup)
./start-dev.sh
```

That's it! 🎉

- **Frontend**: http://localhost:3000 (Next.js App Router)
- **Backend**: http://localhost:4000 (GraphQL + REST API)
- **Health Check**: http://localhost:4000/health
- **GraphQL Playground**: http://localhost:4000/graphql

## 🏗️ What's Running

### Frontend (Port 3000)
- **Next.js 15.5.3** with Turbopack
- **React Server Components** and App Router
- **Tailwind CSS** + ShadCN components
- **Panel-based layout** system with drag-and-drop

### Backend (Port 4000)
- **Express.js** server with GraphQL
- **Apollo Server 4** for GraphQL endpoint
- **CORS enabled** for frontend communication
- **Health monitoring** endpoints

## 🔧 Manual Development

If you prefer to run services separately:

```bash
# Backend (from /worktrees/devops-local-setup)
npm run dev

# Frontend (from /worktrees/frontend-panels)
cd ../frontend-panels
npm run dev
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `./start-dev.sh` | Start both frontend and backend |
| `npm run dev` | Start backend only |
| `cd ../frontend-panels && npm run dev` | Start frontend only |
| `curl http://localhost:4000/health` | Check backend health |

## 🧪 Testing the Stack

### Backend GraphQL Test
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ hello version }"}'

# Expected: {"data":{"hello":"Hello from NEWTUBE Backend API! 🎥","version":"1.0.0"}}
```

### Frontend Test
```bash
curl -s http://localhost:3000 | grep "NEWTUBE"
# Should return HTML with NEWTUBE branding
```

## 📁 Project Structure

```
worktrees/
├── devops-local-setup/     # Backend (GraphQL API)
│   ├── src/index.ts        # Main server entry point
│   ├── package.json        # Backend dependencies
│   └── start-dev.sh        # Unified startup script
└── frontend-panels/        # Frontend (Next.js)
    ├── src/app/            # Next.js App Router
    ├── package.json        # Frontend dependencies
    └── tailwind.config.js  # Styling configuration
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 3000 and 4000
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### Missing Dependencies
```bash
# Reinstall backend dependencies
npm install

# Reinstall frontend dependencies
cd ../frontend-panels && npm install
```

### CORS Issues
CORS is pre-configured to allow:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

### Environment Variables
Copy and customize environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys (optional for basic functionality)
```

## 🎯 Development Workflow

1. **Start Development**: `./start-dev.sh`
2. **Make Changes**: Edit files in either worktree
3. **Hot Reload**: Both frontend and backend auto-reload
4. **Test Endpoints**: Use browser dev tools or curl
5. **Stop Services**: Press `Ctrl+C` in the startup script

## 🌐 API Endpoints

| Endpoint | Type | Description |
|----------|------|-------------|
| `GET /health` | REST | Backend health check |
| `POST /graphql` | GraphQL | Main API endpoint |
| `GET /graphql` | GraphQL | GraphQL Playground |

## 🔗 Key URLs

- **Main App**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health

## 📝 Next Steps

1. **Add API Keys**: Edit `.env` for external services (YouTube, Vimeo, etc.)
2. **Setup Database**: Configure PostgreSQL for user data
3. **Add Features**: Implement video connectors and AI features
4. **Testing**: Add unit and integration tests

---

**Need help?** Check the main project documentation or create an issue.

**Ready for production?** See deployment guides in the main repository.