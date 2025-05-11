import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { User } from "@shared/schema";

// Validate environment variables
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

if (!process.env.REPL_ID) {
  throw new Error("Environment variable REPL_ID not provided");
}

// Session configuration
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
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
      sameSite: 'lax'
    },
  });
}

// Simple in-memory user sessions (replacing passport sessions)
const userSessions = new Map<string, any>();

// User database operations
async function upsertUser(userData: any): Promise<User> {
  console.log("Upserting user with data:", JSON.stringify({
    id: userData.id,
    email: userData.email,
  }, null, 2));
  
  return await storage.upsertUser({
    id: userData.id,
    email: userData.email || null,
    firstName: userData.firstName || null,
    lastName: userData.lastName || null,
    profileImageUrl: userData.profileImageUrl || null,
  });
}

// Auth setup
export async function setupAuth(app: Express) {
  console.log("Setting up simplified Replit Auth");
  
  // Configure express and session
  app.set("trust proxy", 1);
  app.use(getSession());
  
  // Session middleware to attach user data
  app.use((req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.session.id;
    if (sessionId && userSessions.has(sessionId)) {
      (req as any).user = userSessions.get(sessionId);
    }
    next();
  });

  // Authentication routes
  app.get("/api/login", (req, res) => {
    // Generate a random state for CSRF protection
    const state = Math.random().toString(36).substring(2);
    req.session.authState = state;
    
    // Build the authorization URL
    const authUrl = new URL("https://replit.com/auth_with_repl_site");
    authUrl.searchParams.append("domain", req.hostname);
    authUrl.searchParams.append("state", state);
    
    console.log(`Login request - redirecting to ${authUrl.toString()}`);
    res.redirect(authUrl.toString());
  });

  app.get("/api/callback", async (req, res) => {
    try {
      // Verify state parameter to prevent CSRF
      const { state, repl_identity, error } = req.query;
      
      if (error) {
        console.error("Auth callback error:", error);
        return res.redirect("/auth?error=auth_failed");
      }
      
      if (!state || state !== req.session.authState) {
        console.error("Invalid state parameter");
        return res.redirect("/auth?error=invalid_state");
      }
      
      if (!repl_identity) {
        console.error("Missing identity token");
        return res.redirect("/auth?error=missing_identity");
      }
      
      // Parse and validate the identity token
      try {
        // Identity is a JSON string that has been encoded into a URL-safe string
        const identityData = JSON.parse(
          Buffer.from(repl_identity as string, "base64").toString()
        );
        
        console.log("Received identity data:", JSON.stringify(identityData, null, 2));
        
        // Store user in database
        const user = await upsertUser({
          id: identityData.id.toString(),
          email: identityData.email,
          firstName: identityData.name?.split(" ")[0] || null,
          lastName: identityData.name?.split(" ").slice(1).join(" ") || null,
          profileImageUrl: identityData.profileImage
        });
        
        // Store user in session
        userSessions.set(req.session.id, {
          id: user.id,
          name: identityData.name,
          email: user.email,
          profileImage: user.profileImageUrl
        });
        
        // Clear auth state
        delete req.session.authState;
        
        return res.redirect("/");
        
      } catch (parseError) {
        console.error("Failed to parse identity token:", parseError);
        return res.redirect("/auth?error=invalid_identity");
      }
      
    } catch (error) {
      console.error("Error processing auth callback:", error);
      return res.redirect("/auth?error=server_error");
    }
  });

  app.get("/api/logout", (req, res) => {
    // Clear the user session
    if (req.session.id) {
      userSessions.delete(req.session.id);
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.redirect("/auth");
    });
  });

  // User info endpoint
  app.get("/api/auth/user", (req: Request, res: Response) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    return res.json(user);
  });
}

// Authentication middleware
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!(req as any).user) {
    console.log("Request not authenticated");
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  return next();
};