# NEWTUBE - The Streaming Platform of Your Imagination

> **"Whatever you can dream, you can create."**

NEWTUBE is a revolutionary AI-first streaming aggregator that lets users build their perfect video streaming experience through natural conversation. No templates, no fixed layouts—just describe what you want and watch it appear.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Redis (optional, for caching)
- API Keys:
  - OpenAI API key (required)
  - YouTube Data API v3 key (for YouTube integration)
  - Vimeo OAuth credentials (for Vimeo integration)
  - ElevenLabs API key (for natural voice synthesis)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CodingButter/newtube.git
cd newtube
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) and start creating!

## 🎯 Revolutionary Features

### AI-First Interface
- **Zero UI**: Start with just Voice or Keyboard buttons
- **Conversational Creation**: Build your entire interface through chat
- **Real-time Generation**: Components appear as you describe them
- **Infinite Customization**: No limits on what you can create

### Supported Platforms
- ✅ **YouTube**: Full API integration with subscriptions, playlists, and analytics
- ✅ **Vimeo**: Advanced API access with private video support
- 🚧 **Nebula**: Embed support (OAuth coming soon)
- 📋 More platforms planned

### Component Types You Can Create
- 🎬 Video players (single, grid, theater mode)
- 🔍 Search interfaces (basic, advanced, voice)
- 📊 Analytics dashboards
- 💬 Comment sections and chat
- 📺 Subscription managers
- 🎵 Playlist creators
- ⚙️ Settings panels
- And literally anything else you can imagine!

## 🏗 Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   AI Canvas     │────▶│  LLM Service    │────▶│   Component     │
│   (Frontend)    │     │   (GPT/Gemini)  │     │   Generator     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                        │
        ▼                       ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Voice Service  │     │   WebSocket     │     │    Platform     │
│  (ElevenLabs)   │     │     Server      │     │     APIs        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 🛠 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run typecheck    # TypeScript type checking

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

### Project Structure

```
newtube/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── page.tsx         # Landing page (Voice/Keyboard)
│   │   ├── ai-canvas/       # AI conversation interface
│   │   └── api/            # API routes
│   ├── components/          # Reusable React components
│   ├── services/           # Business logic services
│   │   ├── llm.service.ts # AI/LLM orchestration
│   │   ├── voice.service.ts # TTS/STT handling
│   │   └── component-builder.service.ts
│   ├── stores/             # Zustand state management
│   ├── lib/                # Utilities and helpers
│   └── types/              # TypeScript definitions
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                 # Static assets
└── tests/                  # Test files
```

## 🔐 Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/newtube"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# AI/LLM
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-..." # Optional
GOOGLE_AI_API_KEY="..." # Optional for Gemini

# Voice
ELEVENLABS_API_KEY="..."
ELEVENLABS_VOICE_ID="..." # Female voice ID

# Platform APIs
YOUTUBE_API_KEY="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
VIMEO_CLIENT_ID="..."
VIMEO_CLIENT_SECRET="..."

# App Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..." # Generate with: openssl rand -base64 32
```

## 📚 Documentation

- [Project Document](./PROJECT_DOCUMENT.md) - Complete project specification
- [Database Schema](./DATABASE.md) - Database structure and models
- [API Documentation](./docs/api.md) - API endpoints and usage
- [Component Catalog](./docs/components.md) - Available AI-generated components

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues

- Voice recognition works best in Chrome/Edge
- Some complex component combinations may need refinement
- Platform rate limits may affect heavy usage

## 🚀 Roadmap

### Currently Working On
- [x] Revolutionary AI-first interface
- [x] Voice and keyboard input
- [x] Basic component generation
- [ ] ElevenLabs TTS with emotions (#53)
- [ ] Advanced layout optimization

### Coming Soon
- [ ] GPT-4 Vision for visual input
- [ ] Component templates and macros
- [ ] Multi-user collaboration
- [ ] Export/import layouts
- [ ] Mobile app

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4
- ElevenLabs for amazing voice synthesis
- YouTube, Vimeo for their APIs
- The open-source community

## 💬 Support

- [GitHub Issues](https://github.com/CodingButter/newtube/issues)
- [Discord Community](https://discord.gg/newtube) (Coming soon)
- [Documentation](https://docs.newtube.app) (Coming soon)

---

**Built with ❤️ by the NEWTUBE Team**

*"Whatever you can dream, you can create."*