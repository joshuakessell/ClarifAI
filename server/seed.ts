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
  const articleCount = await db.select().from(newsArticles).execute();
  
  if (articleCount.length === 0) {
    console.log("No news articles found. Seeding mock articles...");
    
    try {
      const allTopics = await db.select().from(topics).execute();
      const topicMap = new Map(allTopics.map(topic => [topic.name.toLowerCase(), topic.id]));
      
      // Mock articles for Politics
      const politicsMock = [
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
      ];
      
      // Mock articles for Technology
      const techMock = [
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
      ];
      
      // Business mock articles
      const businessMock = [
        {
          title: "Global Markets Reach Record Highs Amid Economic Recovery",
          summary: "Stock markets worldwide are showing strong performance as economic indicators improve.",
          content: "Global stock markets reached all-time highs today as investors responded positively to improving economic data and corporate earnings reports. Analysts point to falling inflation, robust employment figures, and central bank policies as key factors driving the rally. However, some economic experts caution that challenges remain, including supply chain disruptions and geopolitical uncertainties.",
          url: "https://example.com/business/market-rally",
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
          source: "Financial Times",
          sourceUrl: "https://example.com/financial",
          publishedAt: new Date().toISOString(),
          bias: "center",
          metaData: { author: "Michael Wong" }
        },
        {
          title: "Renewable Energy Investment Surges to New Heights",
          summary: "Global investments in clean energy technologies have reached unprecedented levels.",
          content: "Investment in renewable energy projects has surged to record levels in the first quarter of the year, according to a new industry report. Solar, wind, and battery storage technologies attracted the majority of funding, with institutional investors increasingly shifting capital away from fossil fuels. Experts attribute the trend to falling technology costs, supportive government policies, and growing corporate sustainability commitments.",
          url: "https://example.com/business/renewable-investment",
          imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
          source: "Business Insider",
          sourceUrl: "https://example.com/business",
          publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          bias: "center",
          metaData: { author: "Sophia Garcia" }
        }
      ];
      
      const mockArticlesByTopic: Record<string, any[]> = {
        "politics": politicsMock,
        "technology": techMock,
        "business": businessMock
      };
      
      // Process all mock articles for each topic
      for (const topic of defaultTopics) {
        const topicKey = topic.name.toLowerCase();
        if (topicKey in mockArticlesByTopic) {
          const mockArticles = mockArticlesByTopic[topicKey];
          const topicId = topicMap.get(topicKey);
          
          if (topicId) {
            for (const article of mockArticles) {
              const insertArticle: InsertNewsArticle = {
                title: article.title,
                summary: article.summary,
                content: article.content,
                originalContent: article.content,
                url: article.url,
                imageUrl: article.imageUrl || null,
                source: article.source,
                sourceUrl: article.sourceUrl,
                publishedAt: new Date(article.publishedAt),
                topicId: topicId,
                bias: article.bias || null,
                verified: true,
                metaData: article.metaData || {}
              };
              
              await storage.createNewsArticle(insertArticle);
              console.log(`Added article: ${article.title}`);
            }
          }
        }
      }
      
      // Count the seeded articles
      const newCount = await db.select().from(newsArticles).execute();
      console.log(`Successfully seeded ${newCount.length} news articles`);
    } catch (error) {
      console.error("Error seeding news articles:", error);
    }
  } else {
    console.log(`Found ${articleCount.length} existing news articles. Skipping seed.`);
  }
}