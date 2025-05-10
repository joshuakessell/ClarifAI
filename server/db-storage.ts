import { db } from './db';
import connectPg from "connect-pg-simple";
import session from "express-session";
import { eq, and, desc, sql, like, asc, count } from 'drizzle-orm';
import {
  users, User, InsertUser,
  topics, Topic, InsertTopic,
  userTopics, UserTopic, InsertUserTopic,
  newsArticles, NewsArticle, InsertNewsArticle,
  newsAnalysis, NewsAnalysis, InsertNewsAnalysis,
  timelineEvents, TimelineEvent, InsertTimelineEvent,
  alertSettings, AlertSetting, InsertAlertSetting,
  researchRequests, ResearchRequest, InsertResearchRequest,
  researchFollowupQuestions, ResearchFollowupQuestion, InsertResearchFollowupQuestion,
  researchResults, ResearchResult, InsertResearchResult
} from "@shared/schema";

import { IStorage } from './storage';
import { Pool } from '@neondatabase/serverless';

const PostgresSessionStore = connectPg(session);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    // Initialize session store with PostgreSQL
    this.sessionStore = new PostgresSessionStore({
      pool, 
      tableName: 'sessions',
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [createdUser] = await db.insert(users).values(user).returning();
    return createdUser;
  }

  // Topic methods
  async getAllTopics(): Promise<Topic[]> {
    return db.select().from(topics);
  }

  async getTopicById(id: number): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    return topic;
  }

  async getTopicBySlug(slug: string): Promise<Topic | undefined> {
    const [topic] = await db.select().from(topics).where(eq(topics.slug, slug));
    return topic;
  }

  async createTopic(topic: InsertTopic): Promise<Topic> {
    const [createdTopic] = await db.insert(topics).values(topic).returning();
    return createdTopic;
  }

  // User-Topic methods
  async getUserTopics(userId: number): Promise<Topic[]> {
    const result = await db
      .select({
        id: topics.id,
        name: topics.name,
        slug: topics.slug,
        description: topics.description
      })
      .from(userTopics)
      .innerJoin(topics, eq(userTopics.topicId, topics.id))
      .where(eq(userTopics.userId, userId));
    
    return result;
  }

  async addUserTopic(userTopic: InsertUserTopic): Promise<UserTopic> {
    const [createdUserTopic] = await db.insert(userTopics).values(userTopic).returning();
    return createdUserTopic;
  }

  async removeUserTopic(userId: number, topicId: number): Promise<void> {
    await db
      .delete(userTopics)
      .where(
        and(
          eq(userTopics.userId, userId),
          eq(userTopics.topicId, topicId)
        )
      );
  }

  // News Article methods
  async getNewsArticles(options: { 
    topicSlug?: string; 
    page: number; 
    limit: number; 
    sort: string;
  }): Promise<{ articles: NewsArticle[]; total: number }> {
    const { topicSlug, page, limit, sort } = options;
    const offset = (page - 1) * limit;
    
    let query = db.select().from(newsArticles);
    
    // Filter by topic if provided
    if (topicSlug) {
      const topic = await this.getTopicBySlug(topicSlug);
      if (topic) {
        query = query.where(eq(newsArticles.topicId, topic.id));
      }
    }
    
    // Apply sorting
    if (sort === 'recent') {
      query = query.orderBy(desc(newsArticles.publishedAt));
    } else {
      // Default to recent if relevance sorting is not applicable or available
      query = query.orderBy(desc(newsArticles.publishedAt));
    }
    
    // Apply pagination
    query = query.limit(limit).offset(offset);
    
    // Get articles
    const articles = await query;
    
    // Count total matching articles for pagination
    const [{ value: total }] = await db
      .select({ value: count() })
      .from(newsArticles)
      .where(topicSlug ? eq(newsArticles.topicId, (await this.getTopicBySlug(topicSlug))?.id || 0) : undefined);
    
    return { articles, total: Number(total) };
  }

  async getNewsArticleById(id: number): Promise<NewsArticle | undefined> {
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return article;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [createdArticle] = await db.insert(newsArticles).values(article).returning();
    return createdArticle;
  }

  async updateNewsArticle(id: number, articleUpdate: Partial<InsertNewsArticle>): Promise<NewsArticle | undefined> {
    const [updatedArticle] = await db
      .update(newsArticles)
      .set(articleUpdate)
      .where(eq(newsArticles.id, id))
      .returning();
    
    return updatedArticle;
  }

  // News Analysis methods
  async getNewsAnalysisByArticleId(articleId: number): Promise<NewsAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(newsAnalysis)
      .where(eq(newsAnalysis.articleId, articleId));
    
    return analysis;
  }

  async createNewsAnalysis(analysis: InsertNewsAnalysis): Promise<NewsAnalysis> {
    const [createdAnalysis] = await db.insert(newsAnalysis).values(analysis).returning();
    return createdAnalysis;
  }

  // Timeline Event methods
  async getTimelineEventsByTopicId(topicId: number): Promise<TimelineEvent[]> {
    return db
      .select()
      .from(timelineEvents)
      .where(eq(timelineEvents.topicId, topicId))
      .orderBy(asc(timelineEvents.date));
  }

  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [createdEvent] = await db.insert(timelineEvents).values(event).returning();
    return createdEvent;
  }

  // Alert Settings methods
  async getAlertSettings(userId: number): Promise<AlertSetting[]> {
    return db
      .select()
      .from(alertSettings)
      .where(eq(alertSettings.userId, userId));
  }

  async updateAlertSettings(id: number, settingsUpdate: Partial<InsertAlertSetting>): Promise<AlertSetting | undefined> {
    const [updatedSettings] = await db
      .update(alertSettings)
      .set(settingsUpdate)
      .where(eq(alertSettings.id, id))
      .returning();
    
    return updatedSettings;
  }

  // Deep Research methods
  async createResearchRequest(request: InsertResearchRequest): Promise<ResearchRequest> {
    const [createdRequest] = await db.insert(researchRequests).values(request).returning();
    return createdRequest;
  }

  async getResearchRequests(userId: number): Promise<ResearchRequest[]> {
    return db
      .select()
      .from(researchRequests)
      .where(eq(researchRequests.userId, userId))
      .orderBy(desc(researchRequests.createdAt));
  }

  async getResearchRequestById(id: number): Promise<ResearchRequest | undefined> {
    const [request] = await db
      .select()
      .from(researchRequests)
      .where(eq(researchRequests.id, id));
    
    return request;
  }

  async updateResearchRequest(id: number, requestUpdate: Partial<ResearchRequest>): Promise<ResearchRequest | undefined> {
    const [updatedRequest] = await db
      .update(researchRequests)
      .set(requestUpdate)
      .where(eq(researchRequests.id, id))
      .returning();
    
    return updatedRequest;
  }

  // Research Followup Question methods
  async getResearchFollowupQuestions(requestId: number): Promise<ResearchFollowupQuestion[]> {
    return db
      .select()
      .from(researchFollowupQuestions)
      .where(eq(researchFollowupQuestions.requestId, requestId))
      .orderBy(asc(researchFollowupQuestions.id));
  }

  async updateResearchFollowupQuestion(id: number, answer: string): Promise<ResearchFollowupQuestion | undefined> {
    const [updatedQuestion] = await db
      .update(researchFollowupQuestions)
      .set({ answer })
      .where(eq(researchFollowupQuestions.id, id))
      .returning();
    
    return updatedQuestion;
  }

  // Research Results methods
  async getResearchResultByRequestId(requestId: number): Promise<ResearchResult | undefined> {
    const [result] = await db
      .select()
      .from(researchResults)
      .where(eq(researchResults.requestId, requestId));
    
    return result;
  }

  async createResearchResult(result: InsertResearchResult): Promise<ResearchResult> {
    const [createdResult] = await db.insert(researchResults).values(result).returning();
    return createdResult;
  }
}