import { Issuer, Client, TokenSet } from "openid-client";
import { Strategy as OpenIDStrategy, type VerifyCallback } from "passport-openid-connect";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoizee from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { User } from "@shared/schema";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

if (!process.env.REPL_ID) {
  throw new Error("Environment variable REPL_ID not provided");
}

console.log("Replit environment variables:");
console.log(`- REPLIT_DOMAINS: ${process.env.REPLIT_DOMAINS}`);
console.log(`- REPL_ID: ${process.env.REPL_ID}`);

const getOidcConfig = memoizee(
  async () => {
    const issuerUrl = "https://replit.com/oidc";
    console.log(`Discovering OIDC config from ${issuerUrl} with client ID ${process.env.REPL_ID}`);
    try {
      const issuer = await client.Issuer.discover(issuerUrl);
      console.log("Discovered issuer:", issuer.metadata.issuer);
      return issuer;
    } catch (error) {
      console.error("Error discovering OIDC config:", error);
      throw error;
    }
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
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

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
): Promise<User> {
  return await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"] || null,
    firstName: claims["first_name"] || null,
    lastName: claims["last_name"] || null,
    profileImageUrl: claims["profile_image_url"] || null,
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    try {
      const user: any = {};
      const claims = tokens.claims();
      updateUserSession(user, tokens);
      
      // Store the actual user in the database
      const dbUser = await upsertUser(claims);
      
      // Add db user ID to the session user
      user.id = dbUser.id;
      
      verified(null, user);
    } catch (error) {
      console.error("Error in verify function:", error);
      verified(error as Error);
    }
  };

  for (const domain of process.env.REPLIT_DOMAINS!.split(",")) {
    console.log(`Setting up OpenID Connect strategy for domain: ${domain}`);
    try {
      const issuer = await getOidcConfig();
      
      // Create a client
      const client_id = process.env.REPL_ID!;
      const redirect_uri = `https://${domain}/api/callback`;
      console.log(`Creating client with ID ${client_id} and redirect URI ${redirect_uri}`);
      
      const oidcClient = new issuer.Client({
        client_id: client_id,
        redirect_uris: [redirect_uri],
        response_types: ['code'],
      });
      
      // Create the strategy
      const strategy = new Strategy(
        {
          name: `replitauth:${domain}`,
          issuer: issuer.metadata.issuer,
          client_id: client_id,
          client: oidcClient,
          usePKCE: true,
          params: {
            scope: 'openid email profile offline_access',
          },
        },
        verify
      );
      
      passport.use(`replitauth:${domain}`, strategy);
      console.log(`Successfully registered OpenID Connect strategy for ${domain}`);
    } catch (error) {
      console.error(`Failed to create strategy for domain ${domain}:`, error);
    }
  }

  passport.serializeUser((user: Express.User, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user: any, cb) => {
    cb(null, user);
  });

  app.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login",
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
        }).href
      );
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = req.user as any;

  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    return res.redirect("/api/login");
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    return res.redirect("/api/login");
  }
};