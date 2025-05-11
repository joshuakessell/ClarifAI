import axios from "axios";
import { storage } from "../storage";
import { InsertNewsArticle, NewsArticle } from "@shared/schema";
import { aiService } from "./ai-service";

// This is a simplified example of a news service that would
// fetch and process news from external APIs

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: any[];
}

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: any[];
}

export class NewsService {
  private newsApiKey: string;
  private mediaStackApiKey: string;
  private newsDataApiKey: string;

  constructor() {
    this.newsApiKey = process.env.NEWS_API_KEY || '';
    this.mediaStackApiKey = process.env.MEDIA_STACK_API_KEY || '';
    this.newsDataApiKey = process.env.NEWS_DATA_API_KEY || '';
    
    if (!this.newsApiKey && !this.mediaStackApiKey && !this.newsDataApiKey) {
      console.warn("No news API keys provided. Using mock data only.");
    } else if (this.newsDataApiKey) {
      console.log("Using NewsData.io API for news content");
    }
  }

  async fetchAndProcessNews(): Promise<{ processed: number; failed: number }> {
    try {
      const topics = await storage.getAllTopics();
      let processed = 0;
      let failed = 0;
      
      for (const topic of topics) {
        try {
          const articles = await this.fetchNewsForTopic(topic.name);
          
          for (const article of articles) {
            try {
              // Process and neutralize bias in the article
              const neutralizedContent = await aiService.neutralizeBias(article.content);
              
              // Store the article with both original and neutralized content
              const insertArticle: InsertNewsArticle = {
                title: article.title,
                summary: article.summary,
                content: neutralizedContent,
                originalContent: article.content,
                url: article.url,
                imageUrl: article.imageUrl,
                source: article.source,
                sourceUrl: article.sourceUrl,
                publishedAt: article.publishedAt,
                topicId: topic.id,
                bias: article.bias,
                verified: false,
                metaData: article.metaData
              };
              
              const savedArticle = await storage.createNewsArticle(insertArticle);
              
              // Mark it as verified after analysis
              await storage.updateNewsArticle(savedArticle.id, { verified: true });
              
              processed++;
            } catch (articleError) {
              console.error(`Failed to process article from ${article.source}:`, articleError);
              failed++;
            }
          }
        } catch (topicError) {
          console.error(`Failed to fetch news for topic ${topic.name}:`, topicError);
          failed++;
        }
      }
      
      return { processed, failed };
    } catch (error) {
      console.error("Error in fetchAndProcessNews:", error);
      throw new Error("Failed to fetch and process news");
    }
  }

  async fetchNewsForTopic(topic: string): Promise<any[]> {
    // Try NewsData.io API first
    if (this.newsDataApiKey) {
      try {
        const response = await axios.get<NewsDataResponse>(
          `https://newsdata.io/api/1/news?apikey=${this.newsDataApiKey}&q=${encodeURIComponent(topic)}&language=en&size=10`
        );
        
        if (response.data.status === 'success') {
          console.log(`Found ${response.data.results.length} articles for topic "${topic}" from NewsData.io`);
          
          return response.data.results.map(article => ({
            title: article.title,
            summary: article.description || article.title,
            content: article.content || article.description || article.title,
            url: article.link,
            imageUrl: article.image_url,
            source: article.source_id,
            sourceUrl: new URL(article.link).origin,
            publishedAt: new Date(article.pubDate).toISOString(),
            bias: null, // Will be analyzed later
            metaData: { 
              category: article.category,
              country: article.country,
              creator: article.creator
            }
          }));
        }
      } catch (error) {
        console.error("Error calling NewsData.io API:", error);
      }
    }
    
    // Try NewsAPI if available and NewsData.io failed
    if (this.newsApiKey) {
      try {
        const response = await axios.get<NewsApiResponse>(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${this.newsApiKey}&pageSize=10`
        );
        
        if (response.data.status === 'ok') {
          return response.data.articles.map(article => ({
            title: article.title,
            summary: article.description,
            content: article.content,
            url: article.url,
            imageUrl: article.urlToImage,
            source: article.source.name,
            sourceUrl: article.url.split('/').slice(0, 3).join('/'),
            publishedAt: new Date(article.publishedAt).toISOString(),
            bias: null,
            metaData: { author: article.author }
          }));
        }
      } catch (error) {
        console.error("Error calling NewsAPI:", error);
      }
    }
    
    // Fallback to mock data
    console.log(`Using mock data for topic "${topic}"`);
    return this.getMockNewsForTopic(topic);
  }

  getMockNewsForTopic(topic: string): any[] {
    const mockTopics = [
      {
        name: "Politics",
        articles: [
          {
            title: "New Reform Bill Passes First Legislative Hurdle",
            summary: "The comprehensive reform package has cleared its first major obstacle in the legislative process.",
            content: "The Reform Bill, which includes provisions for electoral reform, campaign finance changes, and ethics rules, passed its first committee vote yesterday. Supporters praised the bill's potential to strengthen democratic institutions, while critics expressed concerns about federal overreach. The bill now moves to the full chamber for debate.",
            url: "https://example.com/politics/reform-bill",
            imageUrl: "https://images.unsplash.com/photo-1585247226801-bc613c441316",
            source: "Capital News",
            sourceUrl: "https://example.com",
            publishedAt: new Date().toISOString(),
            bias: "center-left",
            metaData: { author: "Jane Smith" }
          },
          {
            title: "International Climate Summit Reaches Historic Agreement",
            summary: "After intense negotiations, world leaders have reached a consensus on emissions targets.",
            content: "The International Climate Summit concluded with an unexpected breakthrough as nations agreed to more ambitious carbon reduction goals. The agreement includes binding targets for industrialized nations and support mechanisms for developing countries. Environmental groups called the deal 'a step forward' while some industry representatives expressed concerns about implementation timelines.",
            url: "https://example.com/politics/climate-agreement",
            imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4",
            source: "Global Herald",
            sourceUrl: "https://example.com",
            publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            bias: "center",
            metaData: { author: "Robert Chen" }
          }
        ]
      },
      {
        name: "Technology",
        articles: [
          {
            title: "Tech Leaders Announce New AI Ethics Coalition",
            summary: "Major technology companies have formed a coalition to establish ethical guidelines for AI.",
            content: "Leading technology firms announced today the formation of the Responsible AI Alliance, an industry coalition focused on developing and implementing ethical standards for artificial intelligence development. The group plans to create guidelines addressing bias in AI systems, privacy concerns, and transparency in automated decision-making. Critics question whether self-regulation will be sufficient to address growing concerns.",
            url: "https://example.com/technology/ai-ethics-coalition",
            imageUrl: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9",
            source: "Tech Today",
            sourceUrl: "https://example.com",
            publishedAt: new Date().toISOString(),
            bias: "center",
            metaData: { author: "Alex Rivera" }
          },
          {
            title: "Breakthrough in Quantum Computing Achieved",
            summary: "Scientists report significant advancement in quantum processing technology.",
            content: "Researchers at the National Quantum Laboratory have demonstrated a new approach to quantum bit stability that could dramatically accelerate the development of practical quantum computers. The technique, which involves novel cooling mechanisms and error correction, maintained quantum coherence for a record duration. Industry experts suggest this could reduce the timeline for commercially viable quantum computing systems.",
            url: "https://example.com/technology/quantum-breakthrough",
            imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
            source: "Science Daily",
            sourceUrl: "https://example.com",
            publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            bias: "center",
            metaData: { author: "Dr. Sarah Johnson" }
          }
        ]
      }
    ];
    
    const matchedTopic = mockTopics.find(t => t.name.toLowerCase() === topic.toLowerCase());
    return matchedTopic ? matchedTopic.articles : [];
  }
}

export const newsService = new NewsService();
