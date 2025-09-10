/**
 * NEWTUBE Vector Similarity Search Functions
 * Implements various similarity search patterns for content discovery and personalization
 */

const { query, vectorToSql } = require('./database');

/**
 * Search for similar videos based on content embeddings
 * Uses combined embeddings (title + description + tags) for comprehensive similarity
 */
const searchSimilarVideos = async (queryEmbedding, options = {}) => {
  const {
    limit = 20,
    minSimilarity = 0.7,
    sources = null, // Filter by content sources ['youtube', 'vimeo', 'nebula']
    excludeVideoIds = [], // Exclude specific video IDs
    minViewCount = null,
    maxDaysOld = null
  } = options;

  let whereConditions = [];
  let queryParams = [vectorToSql(queryEmbedding), limit];
  let paramIndex = 3;

  // Filter by sources
  if (sources && sources.length > 0) {
    whereConditions.push(`source = ANY($${paramIndex})`);
    queryParams.push(sources);
    paramIndex++;
  }

  // Exclude specific video IDs
  if (excludeVideoIds.length > 0) {
    whereConditions.push(`external_video_id != ALL($${paramIndex})`);
    queryParams.push(excludeVideoIds);
    paramIndex++;
  }

  // Filter by minimum view count
  if (minViewCount !== null) {
    whereConditions.push(`view_count >= $${paramIndex}`);
    queryParams.push(minViewCount);
    paramIndex++;
  }

  // Filter by recency
  if (maxDaysOld !== null) {
    whereConditions.push(`published_at >= NOW() - INTERVAL '${maxDaysOld} days'`);
  }

  const whereClause = whereConditions.length > 0 
    ? `WHERE ${whereConditions.join(' AND ')}` 
    : '';

  try {
    const result = await query(`
      SELECT 
        id,
        external_video_id,
        source,
        title,
        description,
        tags,
        duration_seconds,
        view_count,
        like_count,
        comment_count,
        published_at,
        (1 - (combined_embedding <=> $1)) as similarity_score,
        embedding_generated_at
      FROM video_embeddings
      ${whereClause}
      AND combined_embedding IS NOT NULL
      AND (1 - (combined_embedding <=> $1)) >= ${minSimilarity}
      ORDER BY combined_embedding <=> $1
      LIMIT $2
    `, queryParams);

    return result.rows.map(row => ({
      ...row,
      similarity_score: parseFloat(row.similarity_score).toFixed(4)
    }));
  } catch (error) {
    console.error('Similar videos search failed:', error);
    throw new Error(`Failed to search similar videos: ${error.message}`);
  }
};

/**
 * Personalized video recommendations based on user preference embedding
 */
const getPersonalizedRecommendations = async (userEmbedding, options = {}) => {
  const {
    limit = 50,
    minSimilarity = 0.6,
    sources = null,
    excludeWatchedVideos = [],
    diversityFactor = 0.3, // 0.0 = pure similarity, 1.0 = maximum diversity
    boostRecent = true,
    minViewCount = 1000
  } = options;

  let whereConditions = ['combined_embedding IS NOT NULL'];
  let queryParams = [vectorToSql(userEmbedding), limit];
  let paramIndex = 3;

  // Filter conditions
  if (sources && sources.length > 0) {
    whereConditions.push(`source = ANY($${paramIndex})`);
    queryParams.push(sources);
    paramIndex++;
  }

  if (excludeWatchedVideos.length > 0) {
    whereConditions.push(`external_video_id != ALL($${paramIndex})`);
    queryParams.push(excludeWatchedVideos);
    paramIndex++;
  }

  if (minViewCount) {
    whereConditions.push(`view_count >= $${paramIndex}`);
    queryParams.push(minViewCount);
    paramIndex++;
  }

  const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

  // Build scoring query with optional recency boost
  const recencyBoost = boostRecent 
    ? `+ (EXTRACT(EPOCH FROM (NOW() - published_at)) / (30 * 24 * 3600))::float * 0.1` 
    : '';

  try {
    const result = await query(`
      WITH scored_videos AS (
        SELECT 
          *,
          (1 - (combined_embedding <=> $1)) as base_similarity,
          RANDOM() * ${diversityFactor} as diversity_score,
          (1 - (combined_embedding <=> $1)) 
            + (RANDOM() * ${diversityFactor})
            ${recencyBoost}
            as final_score
        FROM video_embeddings
        ${whereClause}
        AND (1 - (combined_embedding <=> $1)) >= ${minSimilarity}
      )
      SELECT 
        id,
        external_video_id,
        source,
        title,
        description,
        tags,
        duration_seconds,
        view_count,
        like_count,
        comment_count,
        published_at,
        base_similarity,
        final_score
      FROM scored_videos
      ORDER BY final_score DESC
      LIMIT $2
    `, queryParams);

    return result.rows.map(row => ({
      ...row,
      base_similarity: parseFloat(row.base_similarity).toFixed(4),
      final_score: parseFloat(row.final_score).toFixed(4)
    }));
  } catch (error) {
    console.error('Personalized recommendations failed:', error);
    throw new Error(`Failed to get personalized recommendations: ${error.message}`);
  }
};

/**
 * Hybrid search combining text similarity and metadata filtering
 */
const hybridSearch = async (queryEmbedding, textQuery, options = {}) => {
  const {
    limit = 20,
    embeddingWeight = 0.7, // Weight for embedding similarity
    textWeight = 0.3,      // Weight for text matching
    minSimilarity = 0.5,
    sources = null,
    sortBy = 'hybrid_score' // 'hybrid_score', 'similarity', 'relevance', 'popularity'
  } = options;

  if (embeddingWeight + textWeight !== 1.0) {
    throw new Error('embeddingWeight + textWeight must equal 1.0');
  }

  let whereConditions = ['combined_embedding IS NOT NULL'];
  let queryParams = [vectorToSql(queryEmbedding), textQuery, limit];
  let paramIndex = 4;

  if (sources && sources.length > 0) {
    whereConditions.push(`source = ANY($${paramIndex})`);
    queryParams.push(sources);
    paramIndex++;
  }

  const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

  // Text similarity using PostgreSQL full-text search
  const textSimilarityQuery = `
    GREATEST(
      similarity(title, $2),
      similarity(description, $2),
      array_to_string(tags, ' ') % $2::text
    )
  `;

  let orderByClause;
  switch (sortBy) {
    case 'similarity':
      orderByClause = 'ORDER BY embedding_similarity DESC';
      break;
    case 'relevance':
      orderByClause = 'ORDER BY text_similarity DESC';
      break;
    case 'popularity':
      orderByClause = 'ORDER BY popularity_score DESC';
      break;
    default:
      orderByClause = 'ORDER BY hybrid_score DESC';
  }

  try {
    const result = await query(`
      SELECT 
        id,
        external_video_id,
        source,
        title,
        description,
        tags,
        duration_seconds,
        view_count,
        like_count,
        comment_count,
        published_at,
        (1 - (combined_embedding <=> $1)) as embedding_similarity,
        ${textSimilarityQuery} as text_similarity,
        (
          ((1 - (combined_embedding <=> $1)) * ${embeddingWeight}) +
          (${textSimilarityQuery} * ${textWeight})
        ) as hybrid_score,
        (
          log(GREATEST(view_count, 1)) * 0.3 +
          log(GREATEST(like_count, 1)) * 0.4 +
          log(GREATEST(comment_count, 1)) * 0.3
        ) as popularity_score
      FROM video_embeddings
      ${whereClause}
      AND (1 - (combined_embedding <=> $1)) >= ${minSimilarity}
      ${orderByClause}
      LIMIT $3
    `, queryParams);

    return result.rows.map(row => ({
      ...row,
      embedding_similarity: parseFloat(row.embedding_similarity).toFixed(4),
      text_similarity: parseFloat(row.text_similarity).toFixed(4),
      hybrid_score: parseFloat(row.hybrid_score).toFixed(4),
      popularity_score: parseFloat(row.popularity_score).toFixed(4)
    }));
  } catch (error) {
    console.error('Hybrid search failed:', error);
    throw new Error(`Failed to perform hybrid search: ${error.message}`);
  }
};

/**
 * Find similar comments for relevance and toxicity analysis
 */
const searchSimilarComments = async (commentEmbedding, options = {}) => {
  const {
    limit = 10,
    minSimilarity = 0.8,
    videoId = null,
    sources = null,
    excludeCommentIds = []
  } = options;

  let whereConditions = ['comment_embedding IS NOT NULL'];
  let queryParams = [vectorToSql(commentEmbedding), limit];
  let paramIndex = 3;

  if (videoId) {
    whereConditions.push(`external_video_id = $${paramIndex}`);
    queryParams.push(videoId);
    paramIndex++;
  }

  if (sources && sources.length > 0) {
    whereConditions.push(`source = ANY($${paramIndex})`);
    queryParams.push(sources);
    paramIndex++;
  }

  if (excludeCommentIds.length > 0) {
    whereConditions.push(`external_comment_id != ALL($${paramIndex})`);
    queryParams.push(excludeCommentIds);
    paramIndex++;
  }

  const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

  try {
    const result = await query(`
      SELECT 
        id,
        external_comment_id,
        external_video_id,
        source,
        comment_text,
        author_name,
        toxicity_score,
        relevance_score,
        sentiment_score,
        like_count,
        reply_count,
        posted_at,
        (1 - (comment_embedding <=> $1)) as similarity_score
      FROM comment_embeddings
      ${whereClause}
      AND (1 - (comment_embedding <=> $1)) >= ${minSimilarity}
      ORDER BY comment_embedding <=> $1
      LIMIT $2
    `, queryParams);

    return result.rows.map(row => ({
      ...row,
      similarity_score: parseFloat(row.similarity_score).toFixed(4)
    }));
  } catch (error) {
    console.error('Similar comments search failed:', error);
    throw new Error(`Failed to search similar comments: ${error.message}`);
  }
};

/**
 * Semantic search expansion using query embeddings
 */
const expandSearchQuery = async (queryEmbedding, options = {}) => {
  const {
    limit = 5,
    minSimilarity = 0.7,
    userId = null,
    excludeOriginalQuery = true
  } = options;

  let whereConditions = ['query_embedding IS NOT NULL'];
  let queryParams = [vectorToSql(queryEmbedding), limit];
  let paramIndex = 3;

  if (userId) {
    whereConditions.push(`user_id = $${paramIndex}`);
    queryParams.push(userId);
    paramIndex++;
  }

  const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

  try {
    const result = await query(`
      SELECT 
        query_text,
        search_filters,
        results_count,
        clicked_video_ids,
        (1 - (query_embedding <=> $1)) as similarity_score,
        created_at
      FROM search_embeddings
      ${whereClause}
      AND (1 - (query_embedding <=> $1)) >= ${minSimilarity}
      ORDER BY query_embedding <=> $1
      LIMIT $2
    `, queryParams);

    return result.rows.map(row => ({
      ...row,
      similarity_score: parseFloat(row.similarity_score).toFixed(4)
    }));
  } catch (error) {
    console.error('Search query expansion failed:', error);
    throw new Error(`Failed to expand search query: ${error.message}`);
  }
};

/**
 * Aggregate similarity stats for analytics
 */
const getSimilarityStats = async (embeddingType = 'video') => {
  const tableName = embeddingType === 'video' ? 'video_embeddings' : 
                   embeddingType === 'comment' ? 'comment_embeddings' :
                   embeddingType === 'user' ? 'user_embeddings' : 'search_embeddings';

  const embeddingColumn = embeddingType === 'video' ? 'combined_embedding' :
                         embeddingType === 'comment' ? 'comment_embedding' :
                         embeddingType === 'user' ? 'preference_embedding' : 'query_embedding';

  try {
    const result = await query(`
      SELECT 
        COUNT(*) as total_embeddings,
        COUNT(${embeddingColumn}) as embeddings_with_vectors,
        ROUND(
          (COUNT(${embeddingColumn})::float / COUNT(*)::float) * 100, 2
        ) as completion_percentage,
        MIN(created_at) as oldest_embedding,
        MAX(created_at) as newest_embedding
      FROM ${tableName}
    `);

    return result.rows[0];
  } catch (error) {
    console.error('Failed to get similarity stats:', error);
    throw new Error(`Failed to get similarity stats: ${error.message}`);
  }
};

module.exports = {
  searchSimilarVideos,
  getPersonalizedRecommendations,
  hybridSearch,
  searchSimilarComments,
  expandSearchQuery,
  getSimilarityStats
};