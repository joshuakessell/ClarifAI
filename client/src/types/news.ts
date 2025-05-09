// This file extends the basic types defined in shared/schema.ts
// with additional client-side specific types

import { NewsArticle, NewsAnalysis, Topic, TimelineEvent } from "@shared/schema";

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  reliability: 'high' | 'medium' | 'low';
  bias: 'left' | 'center' | 'right' | 'unknown';
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ViewMode {
  type: 'feed' | 'conflict' | 'timeline';
  label: string;
  icon: string;
}

export interface BreakingNewsItem {
  id: number;
  headline: string;
  content: string;
  timestamp: Date;
  url: string;
  read: boolean;
}

export interface NewsFilter {
  topics?: number[];
  sources?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy: 'recent' | 'relevant';
}

export interface EnrichedNewsArticle extends NewsArticle {
  relatedArticles?: NewsArticle[];
  sourceDetails?: NewsSource;
  readingTime?: number;
}

export interface UserPreferences {
  topics: Topic[];
  sources: NewsSource[];
  digestFrequency: 'daily' | 'weekly' | 'realtime';
  emailNotifications: boolean;
  pushNotifications: boolean;
}
