import { db } from './db';
import { InsertTopic, InsertNewsArticle, topics, newsArticles } from '@shared/schema';
import { storage } from './storage';
import { newsService } from './services/news-service';
import { eq } from 'drizzle-orm';

// Default topics to seed the database with
const defaultTopics: InsertTopic[] = [
  { name: "Politics", slug: "politics", description: "Political news and policy updates" },
  { name: "Technology", slug: "technology", description: "Technology news and innovations" },
  { name: "Business", slug: "business", description: "Business and economic news" },
  { name: "Health", slug: "health", description: "Health and medical news" },
  { name: "Science", slug: "science", description: "Scientific discoveries and research" },
  { name: "Climate", slug: "climate", description: "Climate change and environmental news" },
  { name: "Entertainment", slug: "entertainment", description: "Entertainment and cultural news" }
];

export async function seedTopics() {
  console.log("Checking for existing topics...");
  const existingTopics = await db.select().from(topics);
  
  if (existingTopics.length === 0) {
    console.log("No topics found. Seeding default topics...");
    
    try {
      // Insert all topics in a transaction
      await db.insert(topics).values(defaultTopics);
      console.log(`Successfully seeded ${defaultTopics.length} topics`);
    } catch (error) {
      console.error("Error seeding topics:", error);
    }
  } else {
    console.log(`Found ${existingTopics.length} existing topics. Skipping seed.`);
  }
}

export async function seedNewsArticles() {
  console.log("Checking for existing news articles...");
  const articleCount = await db.select({ count: db.fn.count() }).from(newsArticles);
  
  if (Number(articleCount[0].count) === 0) {
    console.log("No news articles found. Seeding mock articles...");
    
    try {
      const allTopics = await db.select().from(topics);
      const topicMap = new Map(allTopics.map(topic => [topic.name.toLowerCase(), topic.id]));
      
      // Get mock articles for each topic
      for (const topic of defaultTopics) {
        const mockArticles = newsService.getMockNewsForTopic(topic.name);
        
        for (const article of mockArticles) {
          const topicId = topicMap.get(topic.name.toLowerCase());
          
          if (topicId) {
            const insertArticle: InsertNewsArticle = {
              title: article.title,
              summary: article.summary,
              content: article.content,
              originalContent: article.content,
              url: article.url,
              imageUrl: article.imageUrl,
              source: article.source,
              sourceUrl: article.sourceUrl,
              publishedAt: new Date(article.publishedAt),
              topicId: topicId,
              bias: article.bias,
              verified: true,
              metaData: article.metaData
            };
            
            await storage.createNewsArticle(insertArticle);
          }
        }
      }
      
      // Count the seeded articles
      const newCount = await db.select({ count: db.fn.count() }).from(newsArticles);
      console.log(`Successfully seeded ${newCount[0].count} news articles`);
    } catch (error) {
      console.error("Error seeding news articles:", error);
    }
  } else {
    console.log(`Found ${articleCount[0].count} existing news articles. Skipping seed.`);
  }
}