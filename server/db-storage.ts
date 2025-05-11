import { IStorage } from './storage';
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
  researchResults, ResearchResult, InsertResearchResult
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, sql, count, SQL } from "drizzle-orm";
import * as session from 'express-session';
import connectPg from "connect-pg-simple";
import { pool } from "./db";

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    const PostgresStore = connectPg(session);
    this.sessionStore = new PostgresStore({ 
      pool,
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // For PostgreSQL, use on conflict for upsert
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        updatedAt: new Date()
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date()
        }
      })
      .returning();
    
    return user;
  }

  // Topic methods
  async getAllTopics(): Promise<Topic[]> {
    return await db.select().from(topics);
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
    const [newTopic] = await db.insert(topics).values(topic).returning();
    return newTopic;
  }

  // User-Topic methods
  async getUserTopics(userId: number): Promise<Topic[]> {
    const userTopicsWithTopics = await db
      .select({
        topic: topics
      })
      .from(userTopics)
      .innerJoin(topics, eq(userTopics.topicId, topics.id))
      .where(eq(userTopics.userId, userId));

    return userTopicsWithTopics.map(row => row.topic);
  }

  async addUserTopic(userTopic: InsertUserTopic): Promise<UserTopic> {
    const [newUserTopic] = await db.insert(userTopics).values(userTopic).returning();
    return newUserTopic;
  }

  async removeUserTopic(userId: number, topicId: number): Promise<void> {
    await db
      .delete(userTopics)
      .where(and(eq(userTopics.userId, userId), eq(userTopics.topicId, topicId)));
  }

  // News Article methods
  async getNewsArticles(options: { 
    topicSlug?: string; 
    page: number; 
    limit: number; 
    sort: string;
  }): Promise<{ articles: NewsArticle[]; total: number }> {
    const { topicSlug, page = 1, limit = 10, sort = "recent" } = options;
    const offset = (page - 1) * limit;

    // Base query conditions
    let conditions: SQL<unknown> | undefined;
    
    if (topicSlug) {
      const topic = await this.getTopicBySlug(topicSlug);
      if (topic) {
        conditions = eq(newsArticles.topicId, topic.id);
      }
    }

    // Sort direction
    let orderBy;
    if (sort === "recent") {
      orderBy = desc(newsArticles.publishedAt);
    } else if (sort === "oldest") {
      orderBy = asc(newsArticles.publishedAt);
    } else {
      orderBy = desc(newsArticles.publishedAt); // Default sort
    }

    // Get total count
    const [totalResult] = await db
      .select({ count: count() })
      .from(newsArticles)
      .where(conditions);
    
    // Get paginated articles
    const articles = await db
      .select()
      .from(newsArticles)
      .where(conditions)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return {
      articles,
      total: Number(totalResult.count)
    };
  }

  async getNewsArticleById(id: number): Promise<NewsArticle | undefined> {
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return article;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [newArticle] = await db.insert(newsArticles).values(article).returning();
    return newArticle;
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
    const [newAnalysis] = await db.insert(newsAnalysis).values(analysis).returning();
    return newAnalysis;
  }

  // Timeline Event methods
  async getTimelineEventsByTopicId(topicId: number): Promise<TimelineEvent[]> {
    return await db
      .select()
      .from(timelineEvents)
      .where(eq(timelineEvents.topicId, topicId))
      .orderBy(asc(timelineEvents.date));
  }

  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [newEvent] = await db.insert(timelineEvents).values(event).returning();
    return newEvent;
  }

  // Alert Settings methods
  async getAlertSettings(userId: number): Promise<AlertSetting[]> {
    return await db
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
    const [newRequest] = await db.insert(researchRequests).values({
      ...request,
      createdAt: new Date()
    }).returning();
    
    return newRequest;
  }

  async getResearchRequests(userId: number): Promise<ResearchRequest[]> {
    return await db
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
    return await db
      .select()
      .from(researchFollowupQuestions)
      .where(eq(researchFollowupQuestions.requestId, requestId));
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
    const [newResult] = await db.insert(researchResults).values({
      ...result,
      createdAt: new Date()
    }).returning();
    
    return newResult;
  }
}