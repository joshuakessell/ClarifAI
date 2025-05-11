import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { User } from "@shared/schema";
import crypto from 'crypto';

// Extend session type definitions
declare module 'express-session' {
  interface SessionData {
    state?: string;
    user?: {
      id: string;
      email: string | null;
      name?: string;
      profileImage?: string | null;
      isLoggedIn: boolean;
    };
  }
}

// Current domain we're running on
const DOMAIN = process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:3000';

// Session configuration with PostgreSQL
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  return session({
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: 'auto',
      maxAge: sessionTtl,
    },
  });
}

// Auth setup
export async function setupAuth(app: Express) {
  console.log("Setting up Replit Auth with the latest approach");
  
  // Configure express and session
  app.set("trust proxy", 1);
  app.use(getSession());
  
  // Login route
  app.get("/api/login", (req, res) => {
    // Generate random state for CSRF protection
    const state = crypto.randomBytes(16).toString('hex');
    
    // Store in session
    req.session.state = state;
    
    // Create auth URL
    const authUrl = new URL('https://replit.com/auth_with_repl_site');
    authUrl.searchParams.set('domain', DOMAIN);
    authUrl.searchParams.set('state', state);
    
    console.log(`Login redirecting to: ${authUrl.toString()}`);
    res.redirect(authUrl.toString());
  });
  
  // Callback route
  app.get("/api/callback", async (req, res) => {
    try {
      // Validate state
      if (!req.session.state || req.session.state !== req.query.state) {
        console.error('Invalid state parameter');
        return res.redirect('/auth?error=invalid_state');
      }
      
      // Check for error
      if (req.query.error) {
        console.error(`Auth error: ${req.query.error}`);
        return res.redirect('/auth?error=auth_failed');
      }
      
      // Get user data from identity token
      if (!req.query.repl_identity) {
        console.error('Missing identity token');
        return res.redirect('/auth?error=missing_identity');
      }
      
      // Decode and parse identity token
      const identityBuffer = Buffer.from(req.query.repl_identity as string, 'base64');
      const identity = JSON.parse(identityBuffer.toString());
      
      console.log('Identity data:', JSON.stringify({
        id: identity.id,
        username: identity.username,
        roles: identity.roles
      }, null, 2));
      
      // Store user in database
      const user = await storage.upsertUser({
        id: identity.id.toString(), 
        email: identity.email || null,
        firstName: identity.name?.split(' ')[0] || null,
        lastName: identity.name?.split(' ').slice(1).join(' ') || null,
        profileImageUrl: identity.profileImage || null,
      });
      
      // Store user in session
      req.session.user = {
        id: user.id,
        email: user.email,
        name: identity.name,
        profileImage: user.profileImageUrl,
        isLoggedIn: true
      };
      
      // Clean up state
      delete req.session.state;
      
      // Redirect to home
      res.redirect('/');
      
    } catch (error) {
      console.error('Callback error:', error);
      res.redirect('/auth?error=server_error');
    }
  });
  
  // Logout route
  app.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/auth');
    });
  });
  
  // User info endpoint
  app.get("/api/auth/user", (req: Request, res: Response) => {
    if (!req.session.user?.isLoggedIn) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    return res.json(req.session.user);
  });
  
  // Middleware to check auth for all routes
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Make user available in req object for convenience
    (req as any).user = req.session.user;
    next();
  });
}

// Authentication middleware
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!(req as any).user?.isLoggedIn) {
    console.log("Request not authenticated");
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  return next();
};