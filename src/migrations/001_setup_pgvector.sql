-- NEWTUBE Vector Database Setup
-- Migration 001: Setup pgvector extension and base embedding schema

-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create enum for embedding types
CREATE TYPE embedding_type AS ENUM (
    'video_content',    -- Video title, description, tags
    'user_preference',  -- User interest vectors
    'comment',          -- Comment text for toxicity/relevance analysis
    'search_query'      -- User search patterns
);

-- Create enum for content sources
CREATE TYPE content_source AS ENUM (
    'youtube',
    'vimeo', 
    'nebula'
);

-- Video embeddings table for content analysis and personalization
CREATE TABLE IF NOT EXISTS video_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_video_id VARCHAR(255) NOT NULL, -- YouTube/Vimeo/Nebula video ID
    source content_source NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    duration_seconds INTEGER,
    view_count BIGINT,
    like_count BIGINT,
    comment_count INTEGER,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- OpenAI text-embedding-3-small (1536 dimensions)
    title_embedding vector(1536),
    description_embedding vector(1536),
    combined_embedding vector(1536), -- title + description + tags combined
    
    -- Metadata for embedding generation
    embedding_model VARCHAR(100) DEFAULT 'text-embedding-3-small',
    embedding_generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexing and performance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure unique videos per source
    UNIQUE(external_video_id, source)
);

-- User preference embeddings for personalization
CREATE TABLE IF NOT EXISTS user_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- References users table (to be created by backend)
    embedding_type embedding_type NOT NULL DEFAULT 'user_preference',
    
    -- User interest vector derived from viewing history, likes, searches
    preference_embedding vector(1536),
    
    -- Metadata for the embedding
    based_on_interactions INTEGER DEFAULT 0, -- Number of interactions used
    confidence_score FLOAT DEFAULT 0.0, -- 0.0 to 1.0 confidence in this embedding
    last_interaction_at TIMESTAMP WITH TIME ZONE,
    
    -- Versioning for embedding updates
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- One active preference embedding per user
    UNIQUE(user_id, version)
);

-- Comment embeddings for toxicity and relevance analysis
CREATE TABLE IF NOT EXISTS comment_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_comment_id VARCHAR(255) NOT NULL,
    external_video_id VARCHAR(255) NOT NULL,
    source content_source NOT NULL,
    comment_text TEXT NOT NULL,
    author_name VARCHAR(255),
    
    -- Comment embedding for similarity analysis
    comment_embedding vector(1536),
    
    -- AI analysis results
    toxicity_score FLOAT, -- 0.0 (safe) to 1.0 (toxic)
    relevance_score FLOAT, -- 0.0 (irrelevant) to 1.0 (highly relevant)
    sentiment_score FLOAT, -- -1.0 (negative) to 1.0 (positive)
    
    -- Engagement metrics
    like_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    posted_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(external_comment_id, source)
);

-- Search query embeddings for query expansion and personalization
CREATE TABLE IF NOT EXISTS search_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- NULL for anonymous searches
    query_text TEXT NOT NULL,
    query_embedding vector(1536),
    
    -- Search context
    search_filters JSONB, -- Store applied filters
    results_count INTEGER,
    clicked_video_ids TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for vector similarity search
-- HNSW indexes are recommended for better performance in 2025

-- Video embedding indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_title_embedding_hnsw 
ON video_embeddings USING hnsw (title_embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_description_embedding_hnsw 
ON video_embeddings USING hnsw (description_embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_video_combined_embedding_hnsw 
ON video_embeddings USING hnsw (combined_embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- User preference embedding index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_preference_embedding_hnsw 
ON user_embeddings USING hnsw (preference_embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Comment embedding index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_comment_embedding_hnsw 
ON comment_embeddings USING hnsw (comment_embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Search query embedding index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_search_embedding_hnsw 
ON search_embeddings USING hnsw (query_embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Traditional indexes for filtering and performance
CREATE INDEX IF NOT EXISTS idx_video_embeddings_source ON video_embeddings(source);
CREATE INDEX IF NOT EXISTS idx_video_embeddings_external_id ON video_embeddings(external_video_id);
CREATE INDEX IF NOT EXISTS idx_video_embeddings_published_at ON video_embeddings(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_embeddings_view_count ON video_embeddings(view_count DESC);

CREATE INDEX IF NOT EXISTS idx_user_embeddings_user_id ON user_embeddings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_embeddings_version ON user_embeddings(user_id, version DESC);

CREATE INDEX IF NOT EXISTS idx_comment_embeddings_video_id ON comment_embeddings(external_video_id);
CREATE INDEX IF NOT EXISTS idx_comment_embeddings_toxicity ON comment_embeddings(toxicity_score);
CREATE INDEX IF NOT EXISTS idx_comment_embeddings_relevance ON comment_embeddings(relevance_score);

CREATE INDEX IF NOT EXISTS idx_search_embeddings_user_id ON search_embeddings(user_id);
CREATE INDEX IF NOT EXISTS idx_search_embeddings_created_at ON search_embeddings(created_at DESC);

-- Create trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at columns
CREATE TRIGGER update_video_embeddings_updated_at 
    BEFORE UPDATE ON video_embeddings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_embeddings_updated_at 
    BEFORE UPDATE ON user_embeddings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE video_embeddings IS 'Stores embeddings for video content (title, description, tags) for semantic search and personalization';
COMMENT ON TABLE user_embeddings IS 'Stores user preference embeddings derived from viewing history and interactions';
COMMENT ON TABLE comment_embeddings IS 'Stores comment embeddings for toxicity detection and relevance scoring';
COMMENT ON TABLE search_embeddings IS 'Stores search query embeddings for query expansion and search personalization';

COMMENT ON COLUMN video_embeddings.combined_embedding IS 'Combined embedding of title, description, and tags for comprehensive content similarity';
COMMENT ON COLUMN user_embeddings.confidence_score IS 'Confidence in the user preference embedding based on interaction quality and quantity';
COMMENT ON COLUMN comment_embeddings.toxicity_score IS 'AI-generated toxicity score from 0.0 (safe) to 1.0 (toxic)';
COMMENT ON COLUMN comment_embeddings.relevance_score IS 'AI-generated relevance score from 0.0 (off-topic) to 1.0 (highly relevant)';