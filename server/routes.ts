import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { newsService } from "./services/news-service";
import { aiService } from "./services/ai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Topics
  app.get("/api/topics", async (req, res) => {
    try {
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  app.get("/api/topics/:slug", async (req, res) => {
    try {
      const topic = await storage.getTopicBySlug(req.params.slug);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topic" });
    }
  });

  // News Articles
  app.get("/api/news", async (req, res) => {
    try {
      const { topic, page = "1", limit = "10", sort = "recent" } = req.query;
      const articles = await storage.getNewsArticles({
        topicSlug: topic as string | undefined,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        sort: sort as string
      });
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news articles" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const article = await storage.getNewsArticleById(parseInt(req.params.id));
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Conflict Analysis
  app.get("/api/analysis/:articleId", async (req, res) => {
    try {
      const analysis = await storage.getNewsAnalysisByArticleId(parseInt(req.params.articleId));
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analysis" });
    }
  });

  // Timeline Events
  app.get("/api/timeline/:topicId", async (req, res) => {
    try {
      const events = await storage.getTimelineEventsByTopicId(parseInt(req.params.topicId));
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timeline events" });
    }
  });

  // Fetch and process news
  app.post("/api/admin/fetch-news", async (req, res) => {
    try {
      const result = await newsService.fetchAndProcessNews();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Analyze article content
  app.post("/api/admin/analyze-article/:id", async (req, res) => {
    try {
      const articleId = parseInt(req.params.id);
      const article = await storage.getNewsArticleById(articleId);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      const analysis = await aiService.analyzeArticle(article);
      const savedAnalysis = await storage.createNewsAnalysis(analysis);
      
      res.json(savedAnalysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to analyze article" });
    }
  });

  // Newsletter subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // Simple validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (user) {
        return res.status(200).json({ message: "Email already subscribed" });
      }
      
      const newUser = await storage.createUser({
        email,
        username: email.split('@')[0],
        password: Math.random().toString(36).slice(2) // Generate random password
      });
      
      res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
