# NEWTUBE Database Schema Documentation

## Overview

This document describes the PostgreSQL database schema for NEWTUBE, a consumer-only streaming aggregator that discovers and displays videos from external platforms through official APIs.

## Schema Design Principles

1. **Platform Agnostic**: Support multiple video platforms (YouTube, Vimeo, Nebula)
2. **User-Centric**: All data organized around user preferences and customization
3. **Security First**: Field-level encryption for sensitive OAuth tokens
4. **Scalable**: Designed for horizontal scaling and performance
5. **Flexible**: JSON fields for extensible configurations
6. **Compliant**: Respects platform ToS and privacy regulations

## Database Models

### Core User Management

#### Users (`users`)
Central user accounts with authentication and basic profile information.

```sql
CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  clerk_id    TEXT UNIQUE,
  username    TEXT UNIQUE,
  display_name TEXT,
  avatar      TEXT,
  settings_json JSONB DEFAULT '{}',
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  is_active   BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false
);
```

**Key Features:**
- Clerk.dev integration for authentication
- Flexible JSON settings for UI preferences
- Soft delete support with `is_active` flag

#### Connections (`connections`)
OAuth connections to external platforms with encrypted token storage.

```sql
CREATE TABLE connections (
  id                  TEXT PRIMARY KEY,
  user_id            TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider           TEXT NOT NULL, -- 'youtube', 'vimeo', 'nebula'
  access_token_enc   TEXT NOT NULL, -- Encrypted access token
  refresh_token_enc  TEXT,          -- Encrypted refresh token
  expires_at         TIMESTAMP,
  scopes             TEXT[],
  status             connection_status DEFAULT 'ACTIVE',
  last_sync_at       TIMESTAMP,
  provider_user_id   TEXT,
  provider_username  TEXT,
  created_at         TIMESTAMP DEFAULT NOW(),
  updated_at         TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, provider)
);
```

**Security Features:**
- AES-256-GCM encryption for OAuth tokens
- Token expiration tracking
- Connection status monitoring

### Layout System

#### Layouts (`layouts`)
User-defined dashboard layouts with drag-and-drop panel configurations.

```sql
CREATE TABLE layouts (
  id             TEXT PRIMARY KEY,
  user_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  theme          TEXT DEFAULT 'default',
  grid_spec_json JSONB NOT NULL, -- Grid configuration
  is_default     BOOLEAN DEFAULT false,
  is_public      BOOLEAN DEFAULT false,
  description    TEXT,
  tags           TEXT[],
  version        INTEGER DEFAULT 1,
  created_at     TIMESTAMP DEFAULT NOW(),
  updated_at     TIMESTAMP DEFAULT NOW()
);
```

#### Panels (`panels`)
Reusable panel definitions and configurations.

```sql
CREATE TABLE panels (
  id          TEXT PRIMARY KEY,
  type        panel_type NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  props_json  JSONB DEFAULT '{}',
  category    TEXT,
  tags        TEXT[],
  is_built_in BOOLEAN DEFAULT false,
  version     INTEGER DEFAULT 1,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);
```

**Panel Types:**
- `VIDEO_FEED`: Video listing/grid panels
- `VIDEO_PLAYER`: Embedded video players
- `SEARCH`: Search interface panels
- `PLAYLISTS`: Playlist management
- `TRENDING`: Trending content display
- `RECOMMENDATIONS`: AI-powered recommendations

#### Layout Panels (`layout_panels`)
Junction table connecting layouts to panel instances with positioning.

```sql
CREATE TABLE layout_panels (
  id         TEXT PRIMARY KEY,
  layout_id  TEXT NOT NULL REFERENCES layouts(id) ON DELETE CASCADE,
  panel_id   TEXT NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  props_json JSONB DEFAULT '{}',
  grid_x     INTEGER NOT NULL,
  grid_y     INTEGER NOT NULL,
  grid_width INTEGER NOT NULL,
  grid_height INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  z_index    INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(layout_id, panel_id)
);
```

### Content Organization

#### Lists (`lists`)
User-created lists for organizing content (playlists, favorites, watch later).

```sql
CREATE TABLE lists (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  type        list_type NOT NULL,
  description TEXT,
  is_public   BOOLEAN DEFAULT false,
  rules_json  JSONB DEFAULT '{}', -- Smart list rules
  tags        TEXT[],
  thumbnail   TEXT,
  item_count  INTEGER DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW(),
  last_sync_at TIMESTAMP
);
```

**List Types:**
- `PLAYLIST`: Manual playlists
- `SMART`: Automated smart lists with rules
- `FAVORITES`: User favorites
- `WATCHLIST`: Watch later queue
- `HISTORY`: Watch history

#### List Items (`list_items`)
Individual items within user lists with engagement tracking.

```sql
CREATE TABLE list_items (
  id           TEXT PRIMARY KEY,
  list_id      TEXT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  platform_id  TEXT NOT NULL, -- External platform video ID
  platform     TEXT NOT NULL, -- 'youtube', 'vimeo', 'nebula'
  content_type TEXT DEFAULT 'video',
  title        TEXT,
  description  TEXT,
  thumbnail_url TEXT,
  duration     INTEGER, -- Seconds
  published_at TIMESTAMP,
  position     INTEGER DEFAULT 0,
  added_at     TIMESTAMP DEFAULT NOW(),
  notes        TEXT,
  watch_progress REAL DEFAULT 0, -- 0.0 to 1.0
  rating       INTEGER, -- 1-5 stars
  is_favorite  BOOLEAN DEFAULT false,
  UNIQUE(list_id, platform_id, platform)
);
```

### User Preferences

#### Preferences (`preferences`)
Granular user preferences and settings with hierarchical keys.

```sql
CREATE TABLE preferences (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key         TEXT NOT NULL, -- Hierarchical like "ui.theme"
  value_json  JSONB NOT NULL,
  category    TEXT,
  description TEXT,
  is_user_set BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, key)
);
```

**Example Preference Keys:**
- `ui.theme`: Interface theme preference
- `video.autoplay`: Video autoplay setting
- `ai.recommendations.enabled`: AI recommendations toggle
- `privacy.analyticsOptIn`: Analytics consent

### System Tables

#### Migrations (`migrations`)
Database migration tracking for version control.

#### System Config (`system_config`)
System-wide configuration and feature flags.

## Encryption Strategy

### Field-Level Encryption
Sensitive data like OAuth tokens are encrypted using AES-256-GCM:

```typescript
// Encryption process
const encrypted = encrypt(accessToken);
// Database storage: access_token_enc

// Decryption process  
const accessToken = decrypt(encryptedData);
```

**Encrypted Fields:**
- `connections.access_token_enc`
- `connections.refresh_token_enc`

### Security Features
- 32-character encryption keys
- Authenticated encryption (GCM mode)
- Per-field encryption with unique IVs
- Secure key management via environment variables

## Performance Optimizations

### Indexes
Automatic indexes on:
- Primary keys (`@id`)
- Unique constraints (`@unique`)
- Foreign key relationships
- Compound indexes for query optimization

### JSON Field Usage
Strategic use of JSONB for:
- User settings (flexible schema)
- Panel configurations (dynamic props)
- Grid specifications (layout data)
- Smart list rules (query criteria)

### Query Patterns
Optimized for common access patterns:
- User dashboard loading
- Layout panel fetching
- List item pagination
- Preference lookups

## Development Setup

### Prerequisites
- PostgreSQL 13+
- Node.js 18+
- NPM or Yarn

### Environment Variables
```env
DATABASE_URL="postgresql://user:password@localhost:5432/newtube_dev"
ENCRYPTION_KEY="your_32_character_encryption_key_here"
NODE_ENV="development"
```

### Initial Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run initial migration
npm run db:migrate:init

# Seed with sample data
npm run db:seed
```

### Available Scripts
```bash
# Database operations
npm run db:migrate         # Apply pending migrations
npm run db:migrate:init    # Initial migration (first time)
npm run db:migrate:status  # Check migration status
npm run db:seed           # Add sample data
npm run db:reset          # Reset database (dev only)
npm run db:reset:seed     # Reset and seed
npm run db:setup          # Full setup (migrate + seed)

# Development
npm run dev               # Start development server
npm run build             # Build for production
npm run typecheck         # TypeScript checking
npm run lint              # ESLint checking
```

## Sample Data

The seed script creates:
- 3 sample users with different configurations
- Mock OAuth connections (encrypted)
- Built-in panel definitions
- Sample layouts with positioned panels
- User preferences across categories
- Sample lists with video items

## Migration Strategy

### Development
- Schema changes via Prisma migrations
- Automatic client generation
- Seed data for testing

### Production
- Zero-downtime migrations
- Backup before schema changes
- Gradual rollout for breaking changes

## Monitoring & Maintenance

### Health Checks
```typescript
// Database health check
const isHealthy = await checkDatabaseHealth();

// Connection info
const info = await getDatabaseInfo();
```

### Logging
Structured logging for:
- Query performance
- Connection health
- Migration status
- Error tracking

## Security Considerations

### Data Protection
- Field-level encryption for tokens
- Soft delete for user data
- Audit trails for sensitive operations
- GDPR compliance features

### Access Control
- User-scoped data access
- Connection-based authorization
- Rate limiting support
- Input validation schemas

## Platform Compliance

### YouTube Data API
- Official API usage only
- Respect rate limits (10,000 units/day)
- Cache responses appropriately
- Follow branding guidelines

### Vimeo API
- oEmbed and Player API usage
- Proper attribution requirements
- Rate limit compliance
- Terms of service adherence

### Nebula
- Embed-only integration
- No direct API access (pending)
- Content policy compliance

## Future Enhancements

### Planned Features
- Vector embeddings for AI recommendations
- Real-time sync with external platforms
- Advanced analytics and insights
- Multi-tenant architecture support

### Scalability Improvements
- Read replicas for query performance
- Horizontal sharding strategies
- Connection pooling optimization
- Cache layer enhancements

---

## Questions & Support

For questions about the database schema or setup:
1. Check the logs in `logs/` directory
2. Verify environment variables
3. Confirm PostgreSQL connection
4. Review migration status

This schema provides a solid foundation for NEWTUBE's streaming aggregation features while maintaining security, performance, and compliance requirements.