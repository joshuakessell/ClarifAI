import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User table definition with local authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  username: varchar("username", { length: 50 }).unique(),
  password: varchar("password", { length: 255 }),
  email: varchar("email", { length: 100 }).unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Topic table definition
export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const insertTopicSchema = createInsertSchema(topics).pick({
  name: true,
  slug: true,
  description: true,
});

// User Topics table definition (many-to-many relationship)
export const userTopics = pgTable("user_topics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  topicId: integer("topic_id").notNull().references(() => topics.id),
});

export const insertUserTopicSchema = createInsertSchema(userTopics).pick({
  userId: true,
  topicId: true,
});

// News Article table definition
export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  originalContent: text("original_content"),
  url: text("url").notNull(),
  imageUrl: text("image_url"),
  source: text("source").notNull(),
  sourceUrl: text("source_url").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  topicId: integer("topic_id").references(() => topics.id),
  bias: text("bias"),
  verified: boolean("verified").default(false),
  metaData: jsonb("meta_data"),
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
});

// News Analysis table definition
export const newsAnalysis = pgTable("news_analysis", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id").notNull().references(() => newsArticles.id),
  leftPerspective: text("left_perspective"),
  centerPerspective: text("center_perspective"),
  rightPerspective: text("right_perspective"),
  factualSummary: text("factual_summary"),
  confidenceScore: integer("confidence_score"),
  sources: jsonb("sources"),
});

export const insertNewsAnalysisSchema = createInsertSchema(newsAnalysis).omit({
  id: true,
});

// Timeline Event table definition
export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull().references(() => topics.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  sources: jsonb("sources"),
  type: text("type"),
});

export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({
  id: true,
});

// AlertSettings table definition
export const alertSettings = pgTable("alert_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  topicId: integer("topic_id").references(() => topics.id),
  enabled: boolean("enabled").default(true),
  breakingNewsOnly: boolean("breaking_news_only").default(false),
  emailNotifications: boolean("email_notifications").default(true),
  pushNotifications: boolean("push_notifications").default(true),
  frequency: text("frequency").default("daily"),
});

export const insertAlertSettingsSchema = createInsertSchema(alertSettings).omit({
  id: true,
});

// Type definitions
export type User = typeof users.$inferSelect;

export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;

export type UserTopic = typeof userTopics.$inferSelect;
export type InsertUserTopic = z.infer<typeof insertUserTopicSchema>;

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;

export type NewsAnalysis = typeof newsAnalysis.$inferSelect;
export type InsertNewsAnalysis = z.infer<typeof insertNewsAnalysisSchema>;

export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;

export type AlertSetting = typeof alertSettings.$inferSelect;
export type InsertAlertSetting = z.infer<typeof insertAlertSettingsSchema>;

// Deep Research schemas
export const researchRequests = pgTable("research_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  url: text("url").notNull(),
  title: text("title"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertResearchRequestSchema = createInsertSchema(researchRequests).omit({
  id: true,
  completedAt: true,
});

export const researchFollowupQuestions = pgTable("research_followup_questions", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull().references(() => researchRequests.id),
  question: text("question").notNull(),
  answer: text("answer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertResearchFollowupQuestionSchema = createInsertSchema(researchFollowupQuestions).omit({
  id: true,
});

export const researchResults = pgTable("research_results", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull().references(() => researchRequests.id),
  summary: text("summary").notNull(),
  leftPerspective: text("left_perspective").notNull(),
  centerPerspective: text("center_perspective").notNull(),
  rightPerspective: text("right_perspective").notNull(),
  factualAccuracy: integer("factual_accuracy").notNull(),
  sources: text("sources").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertResearchResultSchema = createInsertSchema(researchResults).omit({
  id: true,
});

export type ResearchRequest = typeof researchRequests.$inferSelect;
export type InsertResearchRequest = z.infer<typeof insertResearchRequestSchema>;

export type ResearchFollowupQuestion = typeof researchFollowupQuestions.$inferSelect;
export type InsertResearchFollowupQuestion = z.infer<typeof insertResearchFollowupQuestionSchema>;

export type ResearchResult = typeof researchResults.$inferSelect;
export type InsertResearchResult = z.infer<typeof insertResearchResultSchema>;
