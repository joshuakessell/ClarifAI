import {
  users, User, UpsertUser,
  topics, Topic, InsertTopic,
  userTopics, UserTopic, InsertUserTopic,
  newsArticles, NewsArticle, InsertNewsArticle,
  newsAnalysis, NewsAnalysis, InsertNewsAnalysis,
  timelineEvents, TimelineEvent, InsertTimelineEvent,
  alertSettings, AlertSetting, InsertAlertSetting,
  researchRequests, ResearchRequest, InsertResearchRequest,
  researchFollowupQuestions, ResearchFollowupQuestion, InsertResearchFollowupQuestion,
  researchResults, ResearchResult, InsertResearchResult,
  sessions
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(userData: UpsertUser): Promise<User>;
  
  // Topic methods
  getAllTopics(): Promise<Topic[]>;
  getTopicById(id: number): Promise<Topic | undefined>;
  getTopicBySlug(slug: string): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  
  // User-Topic methods
  getUserTopics(userId: number): Promise<Topic[]>;
  addUserTopic(userTopic: InsertUserTopic): Promise<UserTopic>;
  removeUserTopic(userId: number, topicId: number): Promise<void>;
  
  // News Article methods
  getNewsArticles(options: { 
    topicSlug?: string; 
    page: number; 
    limit: number; 
    sort: string;
  }): Promise<{ articles: NewsArticle[]; total: number }>;
  getNewsArticleById(id: number): Promise<NewsArticle | undefined>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  updateNewsArticle(id: number, article: Partial<InsertNewsArticle>): Promise<NewsArticle | undefined>;
  
  // News Analysis methods
  getNewsAnalysisByArticleId(articleId: number): Promise<NewsAnalysis | undefined>;
  createNewsAnalysis(analysis: InsertNewsAnalysis): Promise<NewsAnalysis>;
  
  // Timeline Event methods
  getTimelineEventsByTopicId(topicId: number): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
  
  // Alert Settings methods
  getAlertSettings(userId: number): Promise<AlertSetting[]>;
  updateAlertSettings(id: number, settings: Partial<InsertAlertSetting>): Promise<AlertSetting | undefined>;
  
  // Deep Research methods
  createResearchRequest(request: InsertResearchRequest): Promise<ResearchRequest>;
  getResearchRequests(userId: number): Promise<ResearchRequest[]>;
  getResearchRequestById(id: number): Promise<ResearchRequest | undefined>;
  updateResearchRequest(id: number, request: Partial<ResearchRequest>): Promise<ResearchRequest | undefined>;
  
  // Research Followup Question methods
  getResearchFollowupQuestions(requestId: number): Promise<ResearchFollowupQuestion[]>;
  updateResearchFollowupQuestion(id: number, answer: string): Promise<ResearchFollowupQuestion | undefined>;
  
  // Research Results methods
  getResearchResultByRequestId(requestId: number): Promise<ResearchResult | undefined>;
  createResearchResult(result: InsertResearchResult): Promise<ResearchResult>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private topics: Map<number, Topic>;
  private userTopics: Map<number, UserTopic>;
  private newsArticles: Map<number, NewsArticle>;
  private newsAnalysis: Map<number, NewsAnalysis>;
  private timelineEvents: Map<number, TimelineEvent>;
  private alertSettings: Map<number, AlertSetting>;
  sessionStore: any;
  
  private currentIds: {
    topics: number;
    userTopics: number;
    newsArticles: number;
    newsAnalysis: number;
    timelineEvents: number;
    alertSettings: number;
    researchRequests: number;
    researchFollowupQuestions: number;
    researchResults: number;
  };

  private researchRequests: Map<number, ResearchRequest>;
  private researchFollowupQuestions: Map<number, ResearchFollowupQuestion>;
  private researchResults: Map<number, ResearchResult>;

  constructor() {
    this.users = new Map();
    this.topics = new Map();
    this.userTopics = new Map();
    this.newsArticles = new Map();
    this.newsAnalysis = new Map();
    this.timelineEvents = new Map();
    this.alertSettings = new Map();
    this.researchRequests = new Map();
    this.researchFollowupQuestions = new Map();
    this.researchResults = new Map();
    
    // Set up session store for Replit Auth
    const MemoryStore = require('memorystore')(require('express-session'));
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    this.currentIds = {
      topics: 1,
      userTopics: 1,
      newsArticles: 1,
      newsAnalysis: 1,
      timelineEvents: 1,
      alertSettings: 1,
      researchRequests: 1,
      researchFollowupQuestions: 1,
      researchResults: 1
    };
    
    // Initialize with some default topics
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add default topics
    const defaultTopics: InsertTopic[] = [
      { name: "Politics", slug: "politics", description: "Political news and policy updates" },
      { name: "Technology", slug: "technology", description: "Technology news and innovations" },
      { name: "Business", slug: "business", description: "Business and economic news" },
      { name: "Health", slug: "health", description: "Health and medical news" },
      { name: "Science", slug: "science", description: "Scientific discoveries and research" },
      { name: "Climate", slug: "climate", description: "Climate change and environmental news" },
      { name: "Entertainment", slug: "entertainment", description: "Entertainment and cultural news" }
    ];
    
    defaultTopics.forEach(topic => this.createTopic(topic));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const { id } = userData;
    
    // Check if user already exists
    const existingUser = await this.getUser(id);
    
    if (existingUser) {
      // Update existing user
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        updatedAt: new Date()
      };
      this.users.set(id, updatedUser);
      return updatedUser;
    } else {
      // Create new user
      const newUser: User = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(id, newUser);
      return newUser;
    }
  }
  
  // Topic methods
  async getAllTopics(): Promise<Topic[]> {
    return Array.from(this.topics.values());
  }
  
  async getTopicById(id: number): Promise<Topic | undefined> {
    return this.topics.get(id);
  }
  
  async getTopicBySlug(slug: string): Promise<Topic | undefined> {
    return Array.from(this.topics.values()).find(
      (topic) => topic.slug === slug
    );
  }
  
  async createTopic(insertTopic: InsertTopic): Promise<Topic> {
    const id = this.currentIds.topics++;
    const topic: Topic = { ...insertTopic, id };
    this.topics.set(id, topic);
    return topic;
  }
  
  // User-Topic methods
  async getUserTopics(userId: number): Promise<Topic[]> {
    const userTopicEntries = Array.from(this.userTopics.values()).filter(
      (userTopic) => userTopic.userId === userId
    );
    
    return userTopicEntries.map(userTopic => 
      this.topics.get(userTopic.topicId)
    ).filter((topic): topic is Topic => topic !== undefined);
  }
  
  async addUserTopic(insertUserTopic: InsertUserTopic): Promise<UserTopic> {
    const id = this.currentIds.userTopics++;
    const userTopic: UserTopic = { ...insertUserTopic, id };
    this.userTopics.set(id, userTopic);
    return userTopic;
  }
  
  async removeUserTopic(userId: number, topicId: number): Promise<void> {
    const userTopicEntry = Array.from(this.userTopics.entries()).find(
      ([_, userTopic]) => userTopic.userId === userId && userTopic.topicId === topicId
    );
    
    if (userTopicEntry) {
      this.userTopics.delete(userTopicEntry[0]);
    }
  }
  
  // News Article methods
  async getNewsArticles(options: { 
    topicSlug?: string; 
    page: number; 
    limit: number; 
    sort: string;
  }): Promise<{ articles: NewsArticle[]; total: number }> {
    let articles = Array.from(this.newsArticles.values());
    
    // Filter by topic if provided
    if (options.topicSlug) {
      const topic = await this.getTopicBySlug(options.topicSlug);
      if (topic) {
        articles = articles.filter(article => article.topicId === topic.id);
      }
    }
    
    // Sort articles
    switch (options.sort) {
      case 'recent':
        articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'relevant':
        // For simplicity, we're just using a random sort for "relevance"
        articles.sort(() => Math.random() - 0.5);
        break;
      default:
        articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    
    const total = articles.length;
    const start = (options.page - 1) * options.limit;
    const end = start + options.limit;
    
    articles = articles.slice(start, end);
    
    return { articles, total };
  }
  
  async getNewsArticleById(id: number): Promise<NewsArticle | undefined> {
    return this.newsArticles.get(id);
  }
  
  async createNewsArticle(insertArticle: InsertNewsArticle): Promise<NewsArticle> {
    const id = this.currentIds.newsArticles++;
    const article: NewsArticle = { ...insertArticle, id };
    this.newsArticles.set(id, article);
    return article;
  }
  
  async updateNewsArticle(id: number, articleUpdate: Partial<InsertNewsArticle>): Promise<NewsArticle | undefined> {
    const article = this.newsArticles.get(id);
    
    if (!article) {
      return undefined;
    }
    
    const updatedArticle = { ...article, ...articleUpdate };
    this.newsArticles.set(id, updatedArticle);
    
    return updatedArticle;
  }
  
  // News Analysis methods
  async getNewsAnalysisByArticleId(articleId: number): Promise<NewsAnalysis | undefined> {
    return Array.from(this.newsAnalysis.values()).find(
      (analysis) => analysis.articleId === articleId
    );
  }
  
  async createNewsAnalysis(insertAnalysis: InsertNewsAnalysis): Promise<NewsAnalysis> {
    const id = this.currentIds.newsAnalysis++;
    const analysis: NewsAnalysis = { ...insertAnalysis, id };
    this.newsAnalysis.set(id, analysis);
    return analysis;
  }
  
  // Timeline Event methods
  async getTimelineEventsByTopicId(topicId: number): Promise<TimelineEvent[]> {
    return Array.from(this.timelineEvents.values())
      .filter(event => event.topicId === topicId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  
  async createTimelineEvent(insertEvent: InsertTimelineEvent): Promise<TimelineEvent> {
    const id = this.currentIds.timelineEvents++;
    const event: TimelineEvent = { ...insertEvent, id };
    this.timelineEvents.set(id, event);
    return event;
  }
  
  // Alert Settings methods
  async getAlertSettings(userId: number): Promise<AlertSetting[]> {
    return Array.from(this.alertSettings.values()).filter(
      (setting) => setting.userId === userId
    );
  }
  
  async updateAlertSettings(id: number, settingsUpdate: Partial<InsertAlertSetting>): Promise<AlertSetting | undefined> {
    const settings = this.alertSettings.get(id);
    
    if (!settings) {
      return undefined;
    }
    
    const updatedSettings = { ...settings, ...settingsUpdate };
    this.alertSettings.set(id, updatedSettings);
    
    return updatedSettings;
  }

  // Deep Research methods
  async createResearchRequest(request: InsertResearchRequest): Promise<ResearchRequest> {
    const id = this.currentIds.researchRequests++;
    const researchRequest: ResearchRequest = { ...request, id, createdAt: new Date(), completedAt: null };
    this.researchRequests.set(id, researchRequest);
    return researchRequest;
  }

  async getResearchRequests(userId: number): Promise<ResearchRequest[]> {
    return Array.from(this.researchRequests.values())
      .filter(request => request.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getResearchRequestById(id: number): Promise<ResearchRequest | undefined> {
    return this.researchRequests.get(id);
  }

  async updateResearchRequest(id: number, requestUpdate: Partial<ResearchRequest>): Promise<ResearchRequest | undefined> {
    const request = this.researchRequests.get(id);
    
    if (!request) {
      return undefined;
    }
    
    const updatedRequest = { ...request, ...requestUpdate };
    this.researchRequests.set(id, updatedRequest);
    
    return updatedRequest;
  }

  // Research Followup Question methods
  async getResearchFollowupQuestions(requestId: number): Promise<ResearchFollowupQuestion[]> {
    return Array.from(this.researchFollowupQuestions.values())
      .filter(question => question.requestId === requestId)
      .sort((a, b) => a.id - b.id);
  }

  async updateResearchFollowupQuestion(id: number, answer: string): Promise<ResearchFollowupQuestion | undefined> {
    const question = this.researchFollowupQuestions.get(id);
    
    if (!question) {
      return undefined;
    }
    
    const updatedQuestion = { ...question, answer };
    this.researchFollowupQuestions.set(id, updatedQuestion);
    
    return updatedQuestion;
  }

  // Research Results methods
  async getResearchResultByRequestId(requestId: number): Promise<ResearchResult | undefined> {
    return Array.from(this.researchResults.values()).find(
      result => result.requestId === requestId
    );
  }

  async createResearchResult(result: InsertResearchResult): Promise<ResearchResult> {
    const id = this.currentIds.researchResults++;
    const researchResult: ResearchResult = { ...result, id, createdAt: new Date() };
    this.researchResults.set(id, researchResult);
    return researchResult;
  }
}

import { DatabaseStorage } from './db-storage';

// Choose which storage implementation to use
// For production or when DATABASE_URL is available, use DatabaseStorage
// Otherwise, fall back to MemStorage for development
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();
