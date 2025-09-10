# NEWTUBE Vector Database Setup

This module implements the vector database infrastructure for NEWTUBE's AI/ML features using PostgreSQL with the pgvector extension.

## 🎯 Overview

The vector database enables:
- **Semantic Video Search** - Find videos by meaning, not just keywords
- **Personalized Recommendations** - AI-driven content discovery based on user preferences
- **Comment Analysis** - Toxicity detection and relevance scoring
- **Smart Search** - Query expansion and intelligent filtering

## 🏗️ Architecture

### Database Schema

- **`video_embeddings`** - Video content embeddings (title, description, tags)
- **`user_embeddings`** - User preference vectors derived from interactions
- **`comment_embeddings`** - Comment embeddings for analysis
- **`search_embeddings`** - Search query patterns for personalization

### Technology Stack

- **PostgreSQL 15+** with pgvector extension
- **OpenAI text-embedding-3-small** (1536 dimensions)
- **HNSW indexes** for high-performance similarity search
- **Node.js** with optimized connection pooling

## 🚀 Quick Start

### Prerequisites

1. PostgreSQL 15+ with pgvector extension installed
2. OpenAI API key
3. Node.js 18+

### Installation

```bash
# Clone and navigate to the vector database module
cd /home/codingbutter/com/newtube/www/worktrees/ai-vector

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Configuration

Edit `.env` file:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=newtube
DB_USER=postgres
DB_PASSWORD=your_password

# OpenAI API
OPENAI_API_KEY=sk-proj-your-key-here

# Performance (optional)
DB_MAINTENANCE_WORK_MEM=1GB
```

### Database Setup

```bash
# Run migrations to set up pgvector and schema
npm run db:migrate

# Check migration status
node src/migrations/migrate.js status

# Test the complete pipeline
npm test
```

## 📊 Usage Examples

### Basic Embedding Generation

```javascript
const { generateVideoEmbeddings, storeVideoEmbeddings } = require('./src/lib/embeddings');

// Generate embeddings for a video
const videoData = {
  external_video_id: 'abc123',
  source: 'youtube',
  title: 'Learn JavaScript in 2024',
  description: 'Complete JavaScript tutorial for beginners',
  tags: ['javascript', 'programming', 'tutorial']
};

const embeddings = await generateVideoEmbeddings(videoData);
const videoId = await storeVideoEmbeddings(videoData, embeddings);
```

### Similarity Search

```javascript
const { searchSimilarVideos } = require('./src/lib/similarity-search');
const { generateEmbedding } = require('./src/lib/embeddings');

// Find videos similar to a query
const query = "JavaScript tutorial for beginners";
const queryEmbedding = await generateEmbedding(query);

const similarVideos = await searchSimilarVideos(queryEmbedding.embedding, {
  limit: 10,
  minSimilarity: 0.7,
  sources: ['youtube', 'vimeo']
});
```

### Personalized Recommendations

```javascript
const { getPersonalizedRecommendations } = require('./src/lib/similarity-search');

// Get recommendations based on user preferences
const recommendations = await getPersonalizedRecommendations(userEmbedding, {
  limit: 20,
  excludeWatchedVideos: ['video1', 'video2'],
  diversityFactor: 0.3,
  boostRecent: true
});
```

### Hybrid Search

```javascript
const { hybridSearch } = require('./src/lib/similarity-search');

// Combine semantic similarity with text matching
const results = await hybridSearch(queryEmbedding, "React hooks", {
  embeddingWeight: 0.7,
  textWeight: 0.3,
  limit: 15
});
```

## 🔧 API Reference

### Embeddings Module (`src/lib/embeddings.js`)

#### `generateEmbedding(text, options)`
Generate embedding for text using OpenAI API.

**Parameters:**
- `text` (string) - Text to embed
- `options` (object) - Configuration options
  - `model` (string) - OpenAI model (default: 'text-embedding-3-small')
  - `dimensions` (number) - Vector dimensions (default: 1536)
  - `maxRetries` (number) - Retry attempts (default: 3)

**Returns:** Object with embedding array and metadata

#### `generateVideoEmbeddings(videoData)`
Generate comprehensive embeddings for video content.

**Parameters:**
- `videoData` (object) - Video metadata object

**Returns:** Object with title, description, and combined embeddings

#### `storeVideoEmbeddings(videoData, embeddings)`
Store video and embeddings in database.

**Returns:** UUID of stored video record

### Similarity Search Module (`src/lib/similarity-search.js`)

#### `searchSimilarVideos(queryEmbedding, options)`
Find videos similar to a query embedding.

**Options:**
- `limit` (number) - Maximum results (default: 20)
- `minSimilarity` (number) - Minimum similarity threshold (default: 0.7)
- `sources` (array) - Filter by content sources
- `excludeVideoIds` (array) - Videos to exclude
- `minViewCount` (number) - Minimum view count filter
- `maxDaysOld` (number) - Recency filter

#### `getPersonalizedRecommendations(userEmbedding, options)`
Get personalized video recommendations.

**Options:**
- `limit` (number) - Maximum results (default: 50)
- `diversityFactor` (number) - Randomization factor (0.0-1.0)
- `boostRecent` (boolean) - Boost recently published videos
- `excludeWatchedVideos` (array) - Previously watched videos

#### `hybridSearch(queryEmbedding, textQuery, options)`
Combine semantic and text-based search.

**Options:**
- `embeddingWeight` (number) - Weight for semantic similarity (default: 0.7)
- `textWeight` (number) - Weight for text matching (default: 0.3)
- `sortBy` (string) - Sort method: 'hybrid_score', 'similarity', 'relevance', 'popularity'

## 🗄️ Database Schema Details

### Video Embeddings Table

```sql
CREATE TABLE video_embeddings (
    id UUID PRIMARY KEY,
    external_video_id VARCHAR(255) NOT NULL,
    source content_source NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    
    -- Embeddings (1536 dimensions)
    title_embedding vector(1536),
    description_embedding vector(1536),
    combined_embedding vector(1536),
    
    -- Metadata
    embedding_model VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(external_video_id, source)
);
```

### Indexes

High-performance HNSW indexes for similarity search:

```sql
-- HNSW index for cosine similarity
CREATE INDEX ON video_embeddings 
USING hnsw (combined_embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);
```

## ⚡ Performance Optimization

### Database Configuration

Recommended PostgreSQL settings for vector operations:

```sql
-- Increase memory for index building
SET maintenance_work_mem = '1GB';

-- Optimize for vector operations
SET shared_preload_libraries = 'pg_stat_statements,auto_explain';
SET auto_explain.log_min_duration = 1000;
```

### Connection Pooling

The database module uses optimized connection pooling:

```javascript
{
  max: 20,                    // Maximum connections
  idleTimeoutMillis: 30000,   // Close idle connections
  statement_timeout: 60000,   // Vector operation timeout
}
```

### Embedding Batch Processing

For bulk operations, use batch processing with rate limiting:

```javascript
const { generateEmbeddingsBatch } = require('./src/lib/embeddings');

const results = await generateEmbeddingsBatch(textArray, {
  batchSize: 5,
  delayBetweenBatches: 1000,
  concurrency: 3
});
```

## 🧪 Testing

### Run Test Suite

```bash
# Run comprehensive test
npm test

# Test specific components
node src/scripts/test-embeddings.js test

# Clean up test data
node src/scripts/test-embeddings.js cleanup
```

### Migration Status

```bash
# Check migration status
node src/migrations/migrate.js status

# Re-run migrations
npm run db:migrate
```

## 📈 Monitoring and Analytics

### Database Statistics

```javascript
const { getSimilarityStats } = require('./src/lib/similarity-search');

const stats = await getSimilarityStats('video');
console.log(`Embeddings: ${stats.total_embeddings}`);
console.log(`Completion: ${stats.completion_percentage}%`);
```

### Health Checks

```javascript
const { getHealthStatus } = require('./src/lib/database');

const health = await getHealthStatus();
console.log('Connected:', health.connected);
console.log('pgvector:', health.pgvectorEnabled);
```

## 🚨 Troubleshooting

### Common Issues

1. **pgvector extension not found**
   ```bash
   # Install pgvector extension
   CREATE EXTENSION vector;
   ```

2. **OpenAI API rate limits**
   - Implement exponential backoff (built-in)
   - Use batch processing for bulk operations
   - Monitor API usage in OpenAI dashboard

3. **Slow similarity searches**
   - Ensure HNSW indexes are created
   - Increase `maintenance_work_mem`
   - Consider index tuning parameters

4. **Memory issues**
   - Adjust connection pool size
   - Optimize vector dimensions if needed
   - Monitor PostgreSQL memory usage

### Performance Monitoring

```sql
-- Check index usage
SELECT indexname, idx_scan, idx_tup_read, idx_tup_fetch 
FROM pg_stat_user_indexes 
WHERE schemaname = 'public';

-- Monitor vector operations
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
WHERE query LIKE '%<=>%' 
ORDER BY total_time DESC;
```

## 🔗 Integration Points

This vector database module integrates with:

- **NEWTUBE Backend API** - GraphQL resolvers for search and recommendations
- **YouTube/Vimeo/Nebula Connectors** - Metadata ingestion pipeline
- **User Preference Engine** - Personalization algorithm
- **Comment Analysis System** - Toxicity and relevance scoring

## 📋 Roadmap

- [ ] Implement user preference learning algorithm
- [ ] Add comment toxicity detection models
- [ ] Optimize for multi-modal embeddings (text + thumbnail)
- [ ] Add real-time embedding updates
- [ ] Implement federated search across platforms
- [ ] Add A/B testing framework for recommendation algorithms

## 🛡️ Security Considerations

- OpenAI API keys stored in environment variables
- Database connections use SSL in production
- Vector data is anonymized and encrypted at rest
- Rate limiting prevents API abuse
- Input validation prevents injection attacks

---

**Built for NEWTUBE** - Next-generation streaming aggregator with AI-powered discovery