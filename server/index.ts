import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { seedTopics, seedNewsArticles } from "./seed";
import { HttpError, ValidationError, normalizeError } from './errors';
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // If we're using a database, seed it with default data
  if (process.env.DATABASE_URL) {
    try {
      await seedTopics();
      await seedNewsArticles(); // Add mock news articles
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  }

  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // Normalize error to our custom error types
    const normalizedError = normalizeError(err);
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Log error details
    console.error(`[ERROR] ${req.method} ${req.path}`, {
      error: normalizedError.message,
      stack: normalizedError.stack,
      status: (normalizedError as HttpError).status || 500,
      name: normalizedError.name
    });
    
    // Standard error response format
    const errorResponse: {
      message: string;
      errors?: Record<string, string[]>;
      stack?: string;
      code?: string;
    } = {
      message: normalizedError.message || "Internal Server Error"
    };
    
    // Include validation errors if available
    if (normalizedError instanceof ValidationError) {
      errorResponse.errors = normalizedError.errors;
    }
    
    // Add error code if available
    if ('code' in normalizedError && typeof normalizedError.code === 'string') {
      errorResponse.code = normalizedError.code;
    }
    
    // Only include stack trace in development
    if (!isProduction) {
      errorResponse.stack = normalizedError.stack;
    }
    
    // Set status code
    const status = (normalizedError as HttpError).status || err.statusCode || 500;

    // Send response
    res.status(status).json(errorResponse);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
