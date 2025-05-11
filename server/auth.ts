import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import MemoryStore from "memorystore";
import { ValidationError, AuthenticationError, ConflictError } from './errors';
import { z } from 'zod';
import { requireAuth, validateRequest } from './middleware';

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

// Validation schemas for authentication
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const registerSchema = loginSchema.extend({
  email: z.string().email("Invalid email address"),
});

// Schema for user topics
const userTopicSchema = z.object({
  topicId: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
});

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const MemStore = MemoryStore(session);

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'developmentSessionSecret',
    resave: false,
    saveUninitialized: false,
    store: new MemStore({
      checkPeriod: 86400000 // Prune expired entries every 24h
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax'
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username or password" });
        }
        
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect username or password" });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/register", validateRequest(registerSchema), async (req, res, next) => {
    try {
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        throw new ConflictError("Username already exists");
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        throw new ConflictError("Email already in use");
      }

      // Create user with hashed password
      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      // Log the user in
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", validateRequest(loginSchema), (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: any) => {
      if (err) return next(err);
      if (!user) return next(new AuthenticationError(info?.message || "Invalid username or password"));
      
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return next(new AuthenticationError("You are not logged in"));
      }
      
      req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ message: "Logged out successfully" });
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/user", (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return next(new AuthenticationError("Not authenticated"));
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = req.user as Express.User;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });

  // API for adding user topics
  app.post("/api/user-topics", requireAuth, validateRequest(userTopicSchema), async (req, res, next) => {
    try {
      const { topicId } = req.body;
      const userId = req.user!.id;
      
      // Check if the topic exists
      const topic = await storage.getTopicById(Number(topicId));
      if (!topic) {
        throw new ValidationError("Invalid topic", { topicId: ["Topic does not exist"] });
      }

      const userTopic = await storage.addUserTopic({
        userId,
        topicId: Number(topicId)
      });

      res.status(201).json(userTopic);
    } catch (error) {
      next(error);
    }
  });

  // API for removing user topics
  app.delete("/api/user-topics/:topicId", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const topicId = parseInt(req.params.topicId, 10);
      
      if (isNaN(topicId)) {
        throw new ValidationError("Invalid topic ID", { topicId: ["Topic ID must be a number"] });
      }

      // Check if the topic exists
      const topic = await storage.getTopicById(topicId);
      if (!topic) {
        throw new ValidationError("Invalid topic", { topicId: ["Topic does not exist"] });
      }

      await storage.removeUserTopic(userId, topicId);
      res.status(200).json({ message: "Topic removed successfully" });
    } catch (error) {
      next(error);
    }
  });

  // Get user topics
  app.get("/api/user-topics", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const topics = await storage.getUserTopics(userId);
      
      res.json(topics);
    } catch (error) {
      next(error);
    }
  });
}