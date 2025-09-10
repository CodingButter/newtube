-- NEWTUBE Vector Database Setup
-- Enable pgvector extension and create optimized indexes for similarity search

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create HNSW indexes for all embedding columns (after tables are created by Prisma)
-- These will be created after running prisma db push/migrate

-- Video embeddings indexes
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_title_embedding_idx 
--   ON video_embeddings USING hnsw (title_embedding vector_cosine_ops) 
--   WITH (m = 16, ef_construction = 64);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_description_embedding_idx 
--   ON video_embeddings USING hnsw (description_embedding vector_cosine_ops) 
--   WITH (m = 16, ef_construction = 64);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_combined_embedding_idx 
--   ON video_embeddings USING hnsw (combined_embedding vector_cosine_ops) 
--   WITH (m = 16, ef_construction = 64);

-- User preference embeddings index
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS user_embeddings_preference_embedding_idx 
--   ON user_embeddings USING hnsw (preference_embedding vector_cosine_ops) 
--   WITH (m = 16, ef_construction = 64);

-- Comment embeddings index
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS comment_embeddings_content_embedding_idx 
--   ON comment_embeddings USING hnsw (content_embedding vector_cosine_ops) 
--   WITH (m = 16, ef_construction = 64);

-- Search query embeddings index
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS search_embeddings_query_embedding_idx 
--   ON search_embeddings USING hnsw (query_embedding vector_cosine_ops) 
--   WITH (m = 16, ef_construction = 64);

-- Additional performance indexes
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_platform_status_idx 
--   ON video_embeddings (platform, processing_status);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_published_at_idx 
--   ON video_embeddings (published_at DESC);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS video_embeddings_tags_idx 
--   ON video_embeddings USING GIN (tags);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS embedding_jobs_status_priority_idx 
--   ON embedding_jobs (status, priority DESC, created_at);

-- Optimize PostgreSQL for vector operations
-- These settings should be added to postgresql.conf:
-- shared_preload_libraries = 'vector'
-- max_connections = 100
-- shared_buffers = 256MB
-- effective_cache_size = 1GB
-- maintenance_work_mem = 1GB
-- random_page_cost = 1.1
-- effective_io_concurrency = 200