/**
 * Custom error classes for standardized error handling across the application
 */

export class HttpError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends HttpError {
  errors: Record<string, string[]>;
  
  constructor(message: string, errors: Record<string, string[]> = {}) {
    super(message, 400);
    this.errors = errors;
  }
}

export class AuthenticationError extends HttpError {
  constructor(message: string = "Authentication required") {
    super(message, 401);
  }
}

export class AuthorizationError extends HttpError {
  constructor(message: string = "You do not have permission to access this resource") {
    super(message, 403);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = "Resource already exists") {
    super(message, 409);
  }
}

export class DatabaseError extends HttpError {
  code: string;
  
  constructor(message: string = "Database error", code: string = "DB_ERROR") {
    super(message, 500);
    this.code = code;
  }
}

export class ServiceError extends HttpError {
  service: string;
  
  constructor(message: string, service: string, status: number = 500) {
    super(message, status);
    this.service = service;
  }
}

/**
 * Utility function to check if an error is a specific PostgreSQL error type
 */
export function isPgError(error: any, code?: string): boolean {
  return (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    error.code.startsWith('PG') &&
    (!code || error.code === code)
  );
}

/**
 * Function to convert various errors to our custom error types
 */
export function normalizeError(error: any): Error {
  // Already one of our custom errors
  if (error instanceof HttpError) {
    return error;
  }
  
  // PostgreSQL unique violation
  if (isPgError(error, '23505')) {
    return new ConflictError('A record with this information already exists');
  }
  
  // PostgreSQL foreign key violation
  if (isPgError(error, '23503')) {
    return new ValidationError('Referenced record does not exist');
  }
  
  // PostgreSQL connection errors
  if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
    return new DatabaseError('Database connection error. Please try again later.', error.code);
  }
  
  // Default to the original error
  return error;
}