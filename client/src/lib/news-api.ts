import { NewsArticle } from "@shared/schema";
import { apiRequest } from "./queryClient";

interface NewsApiOptions {
  topic?: string;
  page?: number;
  limit?: number;
  sort?: 'recent' | 'relevant';
}

interface NewsApiResponse {
  articles: NewsArticle[];
  total: number;
}

export async function fetchNewsArticles(options: NewsApiOptions = {}): Promise<NewsApiResponse> {
  const { topic, page = 1, limit = 10, sort = 'recent' } = options;
  
  let url = `/api/news?page=${page}&limit=${limit}&sort=${sort}`;
  if (topic) {
    url += `&topic=${topic}`;
  }
  
  const response = await apiRequest('GET', url);
  const data = await response.json();
  return data;
}

export async function fetchNewsArticleById(id: number): Promise<NewsArticle> {
  const response = await apiRequest('GET', `/api/news/${id}`);
  const data = await response.json();
  return data;
}

export async function fetchNewsAnalysisByArticleId(articleId: number) {
  const response = await apiRequest('GET', `/api/analysis/${articleId}`);
  const data = await response.json();
  return data;
}

export async function fetchTimelineEventsByTopicId(topicId: number) {
  const response = await apiRequest('GET', `/api/timeline/${topicId}`);
  const data = await response.json();
  return data;
}

export async function fetchAllTopics() {
  const response = await apiRequest('GET', '/api/topics');
  const data = await response.json();
  return data;
}

export async function fetchTopicBySlug(slug: string) {
  const response = await apiRequest('GET', `/api/topics/${slug}`);
  const data = await response.json();
  return data;
}

export async function subscribeToNewsletter(email: string) {
  const response = await apiRequest('POST', '/api/subscribe', { email });
  const data = await response.json();
  return data;
}
