import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AuthenticationError, ValidationError } from './errors';

/**
 * Authentication middleware - ensures user is logged in
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return next(new AuthenticationError("Authentication required"));
  }
  next();
}

/**
 * Validation middleware - validates request body against zod schema
 */
export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof Error && 'format' in error && typeof error.format === 'function') {
        // It's a Zod error
        const formattedError = error.format();
        
        // Convert Zod formatted errors to our format
        const errors: Record<string, string[]> = {};
        
        Object.entries(formattedError)
          .filter(([key]) => key !== '_errors')
          .forEach(([key, value]) => {
            if (value._errors && value._errors.length) {
              errors[key] = value._errors;
            }
          });
        
        // Add root errors if there are any
        if (formattedError._errors && formattedError._errors.length) {
          errors['_root'] = formattedError._errors;
        }
        
        next(new ValidationError("Validation failed", errors));
      } else {
        // Pass through other errors
        next(error);
      }
    }
  };
}

/**
 * Error logging middleware - logs all errors
 */
export function errorLogger(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(`[ERROR] ${req.method} ${req.path}`, {
    error: err.message,
    stack: err.stack?.split('\n').slice(0, 3),
    status: err.status || 500,
    name: err.name
  });
  next(err);
}