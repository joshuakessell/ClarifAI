import { db } from './db';
import { InsertTopic, topics } from '@shared/schema';

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