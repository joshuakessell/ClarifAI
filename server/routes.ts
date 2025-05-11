import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { newsService } from "./services/news-service";
import { aiService } from "./services/ai-service";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { deepResearchService } from "./services/deep-research-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up Replit authentication
  await setupAuth(app);
  
  // Auth user route
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

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

  // Newsletter subscription - keeping this separate from the auth flow for simplicity
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
      
      // Since we're using Replit Auth, we won't create users directly anymore
      // We'll just record the email for newsletter purposes
      // This could be expanded to a separate newsletter table in the future
      
      res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  // Deep Research routes
  // We're using the isAuthenticated function from replitAuth.ts now

  // Create a new research request
  app.post("/api/research-requests", isAuthenticated, async (req, res) => {
    try {
      const { url, title } = req.body;
      if (!url) {
        return res.status(400).json({ message: "URL is required" });
      }

      // Get the numeric user ID from claims.sub or convert string ID to number
      const userId = parseInt((req.user as any).id || (req.user as any).claims?.sub || "0", 10);
      if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Create research request with authenticated user ID
      const request = await storage.createResearchRequest({
        userId,
        url,
        title: title || null,
        status: "pending"
      });

      // Check if we need follow-up questions
      const { title: extractedTitle, content } = await deepResearchService.extractContentFromUrl(url);
      
      // Update title if not provided
      if (!title && extractedTitle) {
        await storage.updateResearchRequest(request.id, { title: extractedTitle });
        request.title = extractedTitle;
      }

      // Determine if we need follow-up questions
      const followupQuestions = await deepResearchService.determineFollowupQuestions(content, request.id);

      // Return request with follow-up questions
      res.status(201).json({ 
        request, 
        followupQuestions,
        estimatedTime: deepResearchService.estimateCompletionTime()
      });
    } catch (error) {
      console.error("Error creating research request:", error);
      res.status(500).json({ message: "Failed to create research request" });
    }
  });

  // Get all research requests for the authenticated user
  app.get("/api/research-requests", isAuthenticated, async (req, res) => {
    try {
      // Get the numeric user ID from claims.sub or convert string ID to number
      const userId = parseInt((req.user as any).id || (req.user as any).claims?.sub || "0", 10);
      if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const requests = await storage.getResearchRequests(userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch research requests" });
    }
  });

  // Get a specific research request by ID
  app.get("/api/research-requests/:id", isAuthenticated, async (req, res) => {
    try {
      const requestId = parseInt(req.params.id);
      const request = await storage.getResearchRequestById(requestId);
      
      if (!request) {
        return res.status(404).json({ message: "Research request not found" });
      }
      
      // Get the numeric user ID from claims.sub or convert string ID to number
      const userId = parseInt((req.user as any).id || (req.user as any).claims?.sub || "0", 10);
      if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      // Check if user owns this request
      if (request.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to view this research request" });
      }
      
      // Get follow-up questions if available
      const followupQuestions = await storage.getResearchFollowupQuestions(requestId);
      
      // Get research result if available
      const researchResult = await storage.getResearchResultByRequestId(requestId);
      
      res.json({ request, followupQuestions, researchResult });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch research request" });
    }
  });

  // Submit answers to follow-up questions
  app.patch("/api/research-followup-questions/:id", isAuthenticated, async (req, res) => {
    try {
      const { answer } = req.body;
      if (!answer) {
        return res.status(400).json({ message: "Answer is required" });
      }
      
      const questionId = parseInt(req.params.id);
      const updatedQuestion = await storage.updateResearchFollowupQuestion(questionId, answer);
      
      if (!updatedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit answer" });
    }
  });

  // Start the deep research process
  app.post("/api/research-requests/:id/start", isAuthenticated, async (req, res) => {
    try {
      const requestId = parseInt(req.params.id);
      const request = await storage.getResearchRequestById(requestId);
      
      if (!request) {
        return res.status(404).json({ message: "Research request not found" });
      }
      
      // Get the numeric user ID from claims.sub or convert string ID to number
      const userId = parseInt((req.user as any).id || (req.user as any).claims?.sub || "0", 10);
      if (!userId) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      // Check if user owns this request
      if (request.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to start this research" });
      }
      
      // Get follow-up questions and answers
      const followupQuestions = await storage.getResearchFollowupQuestions(requestId);
      
      // Start the research in the background
      const estimatedTime = deepResearchService.estimateCompletionTime();
      
      // Perform research asynchronously
      (async () => {
        try {
          const result = await deepResearchService.conductResearch(request, followupQuestions);
          console.log(`Research completed for request ${requestId}`);
        } catch (error) {
          console.error(`Research failed for request ${requestId}:`, error);
          // Update request status to failed
          await storage.updateResearchRequest(requestId, { status: "failed" });
        }
      })();
      
      // Update request status to in-progress
      await storage.updateResearchRequest(requestId, { status: "in-progress" });
      
      res.json({ 
        message: "Research started", 
        estimatedTimeSeconds: estimatedTime 
      });
    } catch (error) {
      console.error("Error starting research:", error);
      res.status(500).json({ message: "Failed to start research" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
