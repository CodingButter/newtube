/**
 * Logging Configuration for NEWTUBE Backend
 * 
 * Winston-based logger with structured logging for development
 * and production environments.
 */

import winston from 'winston';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log level colors for console output
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(logColors);

// Determine log level from environment
const getLogLevel = (): string => {
  const env = process.env.NODE_ENV || 'development';
  const envLogLevel = process.env.LOG_LEVEL;
  
  if (envLogLevel && envLogLevel in logLevels) {
    return envLogLevel;
  }
  
  return env === 'production' ? 'info' : 'debug';
};

// Custom format for development
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Custom format for production (structured JSON)
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Console transport for development
const consoleTransport = new winston.transports.Console({
  format: process.env.NODE_ENV === 'production' ? productionFormat : developmentFormat,
});

// File transports for production
const fileTransports = [
  // Error log file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: productionFormat,
  }),
  // Combined log file
  new winston.transports.File({
    filename: 'logs/combined.log',
    format: productionFormat,
  }),
];

// Create logger instance
export const logger = winston.createLogger({
  level: getLogLevel(),
  levels: logLevels,
  format: productionFormat,
  defaultMeta: { 
    service: 'newtube-backend',
    version: '1.0.0',
  },
  transports: [
    consoleTransport,
    ...(process.env.NODE_ENV === 'production' ? fileTransports : []),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
});

// Create specific loggers for different components
export const dbLogger = logger.child({ component: 'database' });
export const authLogger = logger.child({ component: 'authentication' });
export const apiLogger = logger.child({ component: 'api' });
export const connectorLogger = logger.child({ component: 'connectors' });

// Utility functions for common logging patterns
export const loggers = {
  /**
   * Log API request/response
   */
  logApiCall: (method: string, path: string, statusCode: number, duration: number, userId?: string) => {
    apiLogger.info('API Call', {
      method,
      path,
      statusCode,
      duration,
      userId,
    });
  },

  /**
   * Log authentication events
   */
  logAuth: (event: string, userId?: string, email?: string, details?: any) => {
    authLogger.info('Auth Event', {
      event,
      userId,
      email,
      ...details,
    });
  },

  /**
   * Log database operations
   */
  logDb: (operation: string, model: string, duration?: number, recordId?: string) => {
    dbLogger.info('Database Operation', {
      operation,
      model,
      duration,
      recordId,
    });
  },

  /**
   * Log external connector calls
   */
  logConnector: (provider: string, endpoint: string, statusCode: number, rateLimitRemaining?: number) => {
    connectorLogger.info('External API Call', {
      provider,
      endpoint,
      statusCode,
      rateLimitRemaining,
    });
  },

  /**
   * Log application errors with context
   */
  logError: (error: Error, context?: any) => {
    logger.error('Application Error', {
      message: error.message,
      stack: error.stack,
      ...context,
    });
  },

  /**
   * Log performance metrics
   */
  logPerformance: (operation: string, duration: number, metadata?: any) => {
    logger.info('Performance Metric', {
      operation,
      duration,
      ...metadata,
    });
  },
};

export default logger;