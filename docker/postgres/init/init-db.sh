#!/bin/bash
# PostgreSQL Database Initialization Script for NEWTUBE
# This script sets up the database with pgvector extension and initial schema

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🐘 Initializing NEWTUBE PostgreSQL Database...${NC}"

# Function to execute SQL commands
execute_sql() {
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        $1
EOSQL
}

# Create pgvector extension
echo -e "${YELLOW}📦 Installing pgvector extension...${NC}"
execute_sql "
    CREATE EXTENSION IF NOT EXISTS vector;
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE EXTENSION IF NOT EXISTS btree_gin;
    CREATE EXTENSION IF NOT EXISTS uuid-ossp;
"

# Create development schema
echo -e "${YELLOW}🏗️  Creating development schema...${NC}"
execute_sql "
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        settings_json JSONB DEFAULT '{}',
        preferences_json JSONB DEFAULT '{}'
    );

    -- Platform connections table
    CREATE TABLE IF NOT EXISTS connections (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        provider VARCHAR(50) NOT NULL,
        access_token_enc TEXT,
        refresh_token_enc TEXT,
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, provider)
    );

    -- Layout configurations
    CREATE TABLE IF NOT EXISTS layouts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        grid_spec_json JSONB NOT NULL,
        version INTEGER DEFAULT 1,
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Panel configurations
    CREATE TABLE IF NOT EXISTS panels (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        layout_id UUID NOT NULL REFERENCES layouts(id) ON DELETE CASCADE,
        type VARCHAR(100) NOT NULL,
        props_json JSONB DEFAULT '{}',
        position_json JSONB NOT NULL,
        version INTEGER DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- User lists (favorites, watch later, etc.)
    CREATE TABLE IF NOT EXISTS lists (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        rules_json JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- User preferences and settings
    CREATE TABLE IF NOT EXISTS preferences (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        key VARCHAR(255) NOT NULL,
        value_json JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, key)
    );

    -- Video embeddings for AI/ML features
    CREATE TABLE IF NOT EXISTS video_embeddings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        video_id VARCHAR(255) NOT NULL,
        provider VARCHAR(50) NOT NULL,
        title TEXT,
        description TEXT,
        embedding VECTOR(1536),
        metadata_json JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(video_id, provider)
    );

    -- User interest embeddings for personalization
    CREATE TABLE IF NOT EXISTS user_interest_embeddings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        interest_type VARCHAR(100) NOT NULL,
        embedding VECTOR(1536),
        weight DECIMAL(3,2) DEFAULT 1.0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, interest_type)
    );

    -- Comment embeddings for lens features
    CREATE TABLE IF NOT EXISTS comment_embeddings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        comment_id VARCHAR(255) NOT NULL,
        video_id VARCHAR(255) NOT NULL,
        provider VARCHAR(50) NOT NULL,
        content TEXT,
        embedding VECTOR(1536),
        toxicity_score DECIMAL(3,2),
        relevance_score DECIMAL(3,2),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(comment_id, provider)
    );
"

# Create indexes for performance
echo -e "${YELLOW}🚀 Creating performance indexes...${NC}"
execute_sql "
    -- User indexes
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

    -- Connection indexes
    CREATE INDEX IF NOT EXISTS idx_connections_user_id ON connections(user_id);
    CREATE INDEX IF NOT EXISTS idx_connections_provider ON connections(provider);

    -- Layout indexes
    CREATE INDEX IF NOT EXISTS idx_layouts_user_id ON layouts(user_id);
    CREATE INDEX IF NOT EXISTS idx_layouts_is_default ON layouts(is_default);

    -- Panel indexes
    CREATE INDEX IF NOT EXISTS idx_panels_layout_id ON panels(layout_id);
    CREATE INDEX IF NOT EXISTS idx_panels_type ON panels(type);

    -- List indexes
    CREATE INDEX IF NOT EXISTS idx_lists_user_id ON lists(user_id);
    CREATE INDEX IF NOT EXISTS idx_lists_type ON lists(type);

    -- Preference indexes
    CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON preferences(user_id);
    CREATE INDEX IF NOT EXISTS idx_preferences_key ON preferences(key);

    -- Vector similarity indexes (HNSW)
    CREATE INDEX IF NOT EXISTS idx_video_embeddings_vector 
        ON video_embeddings USING hnsw (embedding vector_cosine_ops);
    CREATE INDEX IF NOT EXISTS idx_user_interest_embeddings_vector 
        ON user_interest_embeddings USING hnsw (embedding vector_cosine_ops);
    CREATE INDEX IF NOT EXISTS idx_comment_embeddings_vector 
        ON comment_embeddings USING hnsw (embedding vector_cosine_ops);

    -- Full-text search indexes
    CREATE INDEX IF NOT EXISTS idx_video_embeddings_title_gin 
        ON video_embeddings USING gin(to_tsvector('english', title));
    CREATE INDEX IF NOT EXISTS idx_video_embeddings_description_gin 
        ON video_embeddings USING gin(to_tsvector('english', description));
"

# Create development data (only in development)
if [ "\$NODE_ENV" = "development" ]; then
    echo -e "${YELLOW}🌱 Seeding development data...${NC}"
    execute_sql "
        -- Insert a test user
        INSERT INTO users (email, settings_json, preferences_json) 
        VALUES (
            'dev@newtube.local',
            '{\"theme\": \"dark\", \"autoplay\": true}',
            '{\"defaultLayout\": \"dashboard\", \"language\": \"en\"}'
        ) ON CONFLICT (email) DO NOTHING;

        -- Get the test user ID
        DO \$\$
        DECLARE
            test_user_id UUID;
        BEGIN
            SELECT id INTO test_user_id FROM users WHERE email = 'dev@newtube.local';
            
            -- Insert a default layout
            INSERT INTO layouts (user_id, name, grid_spec_json, is_default) 
            VALUES (
                test_user_id,
                'Default Dashboard',
                '{\"columns\": 12, \"rows\": 8, \"gap\": 16}',
                true
            ) ON CONFLICT DO NOTHING;
        END \$\$;
    "
fi

# Create database functions for common operations
echo -e "${YELLOW}⚙️  Creating utility functions...${NC}"
execute_sql "
    -- Function to update updated_at timestamps
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS \$\$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    \$\$ language 'plpgsql';

    -- Triggers for auto-updating timestamps
    DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

    DROP TRIGGER IF EXISTS update_connections_updated_at ON connections;
    CREATE TRIGGER update_connections_updated_at BEFORE UPDATE ON connections 
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

    DROP TRIGGER IF EXISTS update_layouts_updated_at ON layouts;
    CREATE TRIGGER update_layouts_updated_at BEFORE UPDATE ON layouts 
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

    DROP TRIGGER IF EXISTS update_panels_updated_at ON panels;
    CREATE TRIGGER update_panels_updated_at BEFORE UPDATE ON panels 
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

    DROP TRIGGER IF EXISTS update_lists_updated_at ON lists;
    CREATE TRIGGER update_lists_updated_at BEFORE UPDATE ON lists 
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

    DROP TRIGGER IF EXISTS update_preferences_updated_at ON preferences;
    CREATE TRIGGER update_preferences_updated_at BEFORE UPDATE ON preferences 
        FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

    -- Function for vector similarity search
    CREATE OR REPLACE FUNCTION find_similar_videos(
        query_embedding VECTOR(1536),
        similarity_threshold FLOAT DEFAULT 0.7,
        max_results INTEGER DEFAULT 10
    )
    RETURNS TABLE(
        video_id VARCHAR(255),
        provider VARCHAR(50),
        title TEXT,
        similarity FLOAT
    ) AS \$\$
    BEGIN
        RETURN QUERY
        SELECT 
            ve.video_id,
            ve.provider,
            ve.title,
            1 - (ve.embedding <=> query_embedding) AS similarity
        FROM video_embeddings ve
        WHERE 1 - (ve.embedding <=> query_embedding) > similarity_threshold
        ORDER BY ve.embedding <=> query_embedding
        LIMIT max_results;
    END;
    \$\$ LANGUAGE plpgsql;
"

echo -e "${GREEN}✅ Database initialization completed successfully!${NC}"
echo -e "${GREEN}📊 Extensions installed: pgvector, pg_trgm, btree_gin, uuid-ossp${NC}"
echo -e "${GREEN}🗄️  Schema created with all tables and indexes${NC}"
echo -e "${GREEN}🔧 Utility functions and triggers configured${NC}"

# Display database info
execute_sql "
    SELECT 
        'Database initialized' as status,
        current_database() as database_name,
        current_user as user_name,
        version() as postgresql_version;
    
    SELECT 
        extname as extension_name,
        extversion as version
    FROM pg_extension 
    WHERE extname IN ('vector', 'pg_trgm', 'btree_gin', 'uuid-ossp');
"