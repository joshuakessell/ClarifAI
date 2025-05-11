import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { User } from "@shared/schema";

// Will be initialized in setupAuth
let openidClient: any;

// Validate environment variables
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

if (!process.env.REPL_ID) {
  throw new Error("Environment variable REPL_ID not provided");
}

console.log("Replit environment variables:");
console.log(`- REPLIT_DOMAINS: ${process.env.REPLIT_DOMAINS}`);
console.log(`- REPL_ID: ${process.env.REPL_ID}`);

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
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

// User database operations
async function upsertUser(claims: any): Promise<User> {
  console.log("Upserting user with claims:", JSON.stringify(claims, null, 2));
  
  return await storage.upsertUser({
    id: claims.sub,
    email: claims.email || null,
    firstName: claims.given_name || claims.first_name || null,
    lastName: claims.family_name || claims.last_name || null,
    profileImageUrl: claims.picture || claims.profile_image_url || null,
  });
}

// Auth setup
export async function setupAuth(app: Express) {
  console.log("Setting up Replit Auth");
  
  // Configure express and session
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    // Import openid-client (ESM module)
    openidClient = await import('openid-client');
    
    // Discover OpenID Connect issuer
    const issuer = await openidClient.Issuer.discover("https://replit.com/oidc");
    console.log("Discovered issuer:", issuer.metadata.issuer);

    // Configure passport serialization
    passport.serializeUser((user: any, done) => {
      console.log("Serializing user:", user.id);
      done(null, user);
    });
    
    passport.deserializeUser((user: any, done) => {
      console.log("Deserializing user:", user.id);
      done(null, user);
    });

    // Setup strategies for each domain
    for (const domain of process.env.REPLIT_DOMAINS!.split(",")) {
      console.log(`Setting up OpenID Connect strategy for domain: ${domain}`);
      
      try {
        // Create client
        const client = new issuer.Client({
          client_id: process.env.REPL_ID!,
          redirect_uris: [`https://${domain}/api/callback`],
          response_types: ["code"],
        });
        
        // Create OIDC strategy
        const strategy = new openidClient.Strategy(
          {
            client,
            usePKCE: false,
            params: {
              scope: "openid email profile"
            },
          },
          async (tokenSet, done) => {
            try {
              console.log("Received token with claims");
              const claims = tokenSet.claims();
              
              // Create or update user in our database
              const user = await upsertUser(claims);
              
              // Create session user with tokens and claims
              const sessionUser = {
                id: user.id,
                claims,
                access_token: tokenSet.access_token,
                expires_at: tokenSet.expires_at,
              };
              
              return done(null, sessionUser);
            } catch (error) {
              console.error("Error in verify callback:", error);
              return done(error as Error);
            }
          }
        );
        
        // Register strategy with unique name per domain
        passport.use(`replitauth:${domain}`, strategy);
        console.log(`Successfully registered strategy for ${domain}`);
      } catch (error) {
        console.error(`Failed to set up strategy for domain ${domain}:`, error);
      }
    }

    // Authentication routes
    app.get("/api/login", (req, res, next) => {
      const strategyName = `replitauth:${req.hostname}`;
      console.log(`Login request from ${req.hostname}, using strategy ${strategyName}`);
      
      passport.authenticate(strategyName, {
        prompt: "login",
      })(req, res, next);
    });

    app.get("/api/callback", (req, res, next) => {
      const strategyName = `replitauth:${req.hostname}`;
      console.log(`Callback request from ${req.hostname}, using strategy ${strategyName}`);
      
      passport.authenticate(strategyName, {
        successRedirect: "/",
        failureRedirect: "/auth",
      })(req, res, next);
    });

    app.get("/api/logout", (req, res) => {
      const user = req.user as any;
      console.log(`Logout request from user:`, user?.id);
      
      req.logout((err) => {
        if (err) {
          console.error("Error during logout:", err);
          return res.status(500).json({ message: "Logout failed" });
        }
        
        res.redirect("/");
      });
    });

  } catch (error) {
    console.error("Fatal error setting up authentication:", error);
    throw error;
  }
}

// Authentication middleware
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("Request not authenticated");
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const user = req.user as any;
  console.log(`Authenticated request from user ${user.id}`);
  
  // Check token expiration if we have expiry info
  if (user.expires_at) {
    const now = Math.floor(Date.now() / 1000);
    if (now > user.expires_at) {
      console.log("Token expired, redirecting to login");
      return res.status(401).json({ message: "Session expired" });
    }
  }
  
  return next();
};