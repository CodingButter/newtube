/**
 * NEWTUBE Embedding Generation Pipeline
 * Uses OpenAI API for generating embeddings with fallback strategies
 */

const OpenAI = require('openai');
const { query, vectorToSql } = require('./database');

/**
 * Initialize OpenAI client with error handling
 */
const createOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  
  return new OpenAI({
    apiKey: apiKey,
    maxRetries: 3,
    timeout: 30000 // 30 second timeout
  });
};

let openai = null;

const getOpenAIClient = () => {
  if (!openai) {
    openai = createOpenAIClient();
  }
  return openai;
};

/**
 * Generate embedding using OpenAI text-embedding-3-small model
 * This model produces 1536-dimensional vectors
 */
const generateEmbedding = async (text, options = {}) => {
  const {
    model = 'text-embedding-3-small',
    dimensions = 1536,
    maxRetries = 3,
    retryDelay = 1000
  } = options;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('Text must be a non-empty string');
  }

  // Clean and prepare text
  const cleanText = text.trim().replace(/\\s+/g, ' ').substring(0, 8191); // OpenAI limit

  const client = getOpenAIClient();
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await client.embeddings.create({
        model: model,
        input: cleanText,
        dimensions: dimensions
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('No embedding data returned from OpenAI');
      }

      const embedding = response.data[0].embedding;
      
      if (!embedding || embedding.length !== dimensions) {
        throw new Error(`Expected ${dimensions} dimensions, got ${embedding?.length}`);
      }

      return {
        embedding: embedding,
        model: model,
        dimensions: dimensions,
        input_text: cleanText,
        usage: response.usage
      };

    } catch (error) {
      console.error(`Embedding generation attempt ${attempt} failed:`, error.message);
      
      // Don't retry on client errors (4xx)
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Retry on server errors (5xx) or network issues
      if (attempt < maxRetries) {
        const delay = retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

/**
 * Generate embeddings for video content (title, description, tags)
 */
const generateVideoEmbeddings = async (videoData) => {
  const { title, description = '', tags = [] } = videoData;
  
  if (!title) {
    throw new Error('Video title is required for embedding generation');
  }

  try {
    // Generate individual embeddings
    const titleEmbedding = await generateEmbedding(title);
    
    let descriptionEmbedding = null;
    if (description && description.trim().length > 0) {
      descriptionEmbedding = await generateEmbedding(description);
    }
    
    // Create combined text for comprehensive embedding
    const tagsText = tags.length > 0 ? tags.join(' ') : '';
    const combinedText = [title, description, tagsText]
      .filter(text => text && text.trim().length > 0)
      .join(' ');
    
    const combinedEmbedding = await generateEmbedding(combinedText);

    return {
      title_embedding: titleEmbedding.embedding,
      description_embedding: descriptionEmbedding?.embedding || null,
      combined_embedding: combinedEmbedding.embedding,
      model: titleEmbedding.model,
      generated_at: new Date().toISOString(),
      usage_stats: {
        title_tokens: titleEmbedding.usage?.total_tokens || 0,
        description_tokens: descriptionEmbedding?.usage?.total_tokens || 0,
        combined_tokens: combinedEmbedding.usage?.total_tokens || 0
      }
    };
  } catch (error) {
    console.error('Video embedding generation failed:', error);
    throw new Error(`Failed to generate video embeddings: ${error.message}`);
  }
};

/**
 * Generate user preference embedding from interaction history
 */
const generateUserPreferenceEmbedding = async (interactionData) => {
  const { 
    viewedVideos = [], 
    likedVideos = [], 
    searchQueries = [],
    userId 
  } = interactionData;

  if (!userId) {
    throw new Error('User ID is required for preference embedding generation');
  }

  try {
    // Collect text data from user interactions
    const interactionTexts = [];
    
    // Add video titles and descriptions user has engaged with
    for (const video of [...viewedVideos, ...likedVideos]) {
      if (video.title) interactionTexts.push(video.title);
      if (video.description) interactionTexts.push(video.description);
      if (video.tags) interactionTexts.push(...video.tags);
    }
    
    // Add search queries
    interactionTexts.push(...searchQueries);
    
    if (interactionTexts.length === 0) {
      throw new Error('No interaction data available for preference embedding');
    }

    // Create user preference text by combining interactions
    const preferenceText = interactionTexts
      .filter(text => text && text.trim().length > 0)
      .join(' ');

    const embedding = await generateEmbedding(preferenceText);

    return {
      preference_embedding: embedding.embedding,
      based_on_interactions: interactionTexts.length,
      confidence_score: Math.min(interactionTexts.length / 50, 1.0), // Max confidence at 50+ interactions
      model: embedding.model,
      generated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('User preference embedding generation failed:', error);
    throw new Error(`Failed to generate user preference embedding: ${error.message}`);
  }
};

/**
 * Generate embedding for comment analysis (toxicity, relevance)
 */
const generateCommentEmbedding = async (commentText) => {
  if (!commentText || commentText.trim().length === 0) {
    throw new Error('Comment text is required for embedding generation');
  }

  try {
    const embedding = await generateEmbedding(commentText);
    
    return {
      comment_embedding: embedding.embedding,
      model: embedding.model,
      generated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Comment embedding generation failed:', error);
    throw new Error(`Failed to generate comment embedding: ${error.message}`);
  }
};

/**
 * Generate embedding for search query
 */
const generateSearchEmbedding = async (queryText) => {
  if (!queryText || queryText.trim().length === 0) {
    throw new Error('Search query text is required for embedding generation');
  }

  try {
    const embedding = await generateEmbedding(queryText);
    
    return {
      query_embedding: embedding.embedding,
      model: embedding.model,
      generated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Search embedding generation failed:', error);
    throw new Error(`Failed to generate search embedding: ${error.message}`);
  }
};

/**
 * Batch processing for multiple embeddings with rate limiting
 */
const generateEmbeddingsBatch = async (textArray, options = {}) => {
  const {
    batchSize = 5,
    delayBetweenBatches = 1000,
    concurrency = 3
  } = options;

  const results = [];
  const errors = [];

  for (let i = 0; i < textArray.length; i += batchSize) {
    const batch = textArray.slice(i, i + batchSize);
    
    try {
      // Process batch with limited concurrency
      const batchPromises = batch.map(async (text, index) => {
        try {
          const result = await generateEmbedding(text);
          return { index: i + index, result };
        } catch (error) {
          return { index: i + index, error: error.message };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      
      batchResults.forEach(({ index, result, error }) => {
        if (error) {
          errors.push({ index, error });
        } else {
          results.push({ index, ...result });
        }
      });

      // Rate limiting delay between batches
      if (i + batchSize < textArray.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }

    } catch (error) {
      console.error(`Batch processing error for items ${i}-${i + batchSize - 1}:`, error);
      errors.push({ batch: `${i}-${i + batchSize - 1}`, error: error.message });
    }
  }

  return { results, errors };
};

/**
 * Store video embeddings in database
 */
const storeVideoEmbeddings = async (videoData, embeddings) => {
  const {
    external_video_id,
    source,
    title,
    description,
    tags,
    duration_seconds,
    view_count,
    like_count,
    comment_count,
    published_at
  } = videoData;

  const {
    title_embedding,
    description_embedding,
    combined_embedding,
    model
  } = embeddings;

  try {
    const result = await query(`
      INSERT INTO video_embeddings (
        external_video_id, source, title, description, tags,
        duration_seconds, view_count, like_count, comment_count, published_at,
        title_embedding, description_embedding, combined_embedding,
        embedding_model
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14
      )
      ON CONFLICT (external_video_id, source) 
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        tags = EXCLUDED.tags,
        duration_seconds = EXCLUDED.duration_seconds,
        view_count = EXCLUDED.view_count,
        like_count = EXCLUDED.like_count,
        comment_count = EXCLUDED.comment_count,
        title_embedding = EXCLUDED.title_embedding,
        description_embedding = EXCLUDED.description_embedding,
        combined_embedding = EXCLUDED.combined_embedding,
        embedding_model = EXCLUDED.embedding_model,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id
    `, [
      external_video_id, source, title, description, tags,
      duration_seconds, view_count, like_count, comment_count, published_at,
      vectorToSql(title_embedding),
      description_embedding ? vectorToSql(description_embedding) : null,
      vectorToSql(combined_embedding),
      model
    ]);

    return result.rows[0].id;
  } catch (error) {
    console.error('Failed to store video embeddings:', error);
    throw error;
  }
};

module.exports = {
  generateEmbedding,
  generateVideoEmbeddings,
  generateUserPreferenceEmbedding,
  generateCommentEmbedding,
  generateSearchEmbedding,
  generateEmbeddingsBatch,
  storeVideoEmbeddings
};