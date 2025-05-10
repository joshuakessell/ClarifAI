import OpenAI from "openai";
import axios from "axios";
import { 
  ResearchRequest, 
  ResearchResult, 
  ResearchFollowupQuestion, 
  InsertResearchResult,
  InsertResearchFollowupQuestion 
} from "@shared/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { researchRequests, researchResults, researchFollowupQuestions } from "@shared/schema";

export class DeepResearchService {
  private openai: OpenAI;
  
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    if (!process.env.OPENAI_API_KEY) {
      console.warn("No OpenAI API key provided. Deep research functionality will be limited.");
    }
  }
  
  // Extract content from URL for research
  async extractContentFromUrl(url: string): Promise<{ title: string; content: string }> {
    try {
      // For websites, fetch the content
      const response = await axios.get(url);
      
      // Simple extraction of title from HTML
      const titleMatch = response.data.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : "Untitled Article";
      
      // Very basic content extraction - would need a proper HTML parser in production
      let content = response.data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ");
      content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ");
      content = content.replace(/<[^>]+>/g, " ");
      content = content.replace(/\s+/g, " ").trim();
      
      // Limit content size to avoid overwhelming the model
      content = content.substring(0, 8000);
      
      return { title, content };
    } catch (error) {
      console.error("Error extracting content from URL:", error);
      return { title: "Error Extracting Content", content: "Unable to extract content from the provided URL." };
    }
  }
  
  // Determine if follow-up questions are needed
  async determineFollowupQuestions(content: string, requestId: number): Promise<ResearchFollowupQuestion[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { 
            role: "system", 
            content: "You are an expert research assistant determining if additional information is needed to conduct a thorough analysis. If follow-up questions are needed, provide them in JSON format. Limit to 3 questions maximum." 
          },
          { 
            role: "user", 
            content: `Analyze this content and determine if you need additional information to provide a comprehensive multi-perspective analysis: ${content}\n\nOutput follow-up questions in this format if needed: [{"question": "Question text here"}]` 
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      if (result.questions && Array.isArray(result.questions) && result.questions.length > 0) {
        // Store questions in the database
        const questionsToInsert: InsertResearchFollowupQuestion[] = result.questions.map((q: { question: string }) => ({
          requestId,
          question: q.question,
          answer: null
        }));
        
        const insertedQuestions = [];
        
        for (const question of questionsToInsert) {
          const [insertedQuestion] = await db.insert(researchFollowupQuestions)
            .values(question)
            .returning();
          
          insertedQuestions.push(insertedQuestion);
        }
        
        return insertedQuestions;
      }
      
      return [];
    } catch (error) {
      console.error("Error determining follow-up questions:", error);
      return [];
    }
  }
  
  // Conduct the deep research analysis
  async conductResearch(request: ResearchRequest, answers: ResearchFollowupQuestion[] = []): Promise<ResearchResult | null> {
    try {
      // Update status to in-progress
      await db.update(researchRequests)
        .set({ status: "in-progress" })
        .where(eq(researchRequests.id, request.id));
      
      // Extract content if we have a URL
      const { title, content } = await this.extractContentFromUrl(request.url);
      
      // Update title if it was empty
      if (!request.title) {
        await db.update(researchRequests)
          .set({ title })
          .where(eq(researchRequests.id, request.id));
      }
      
      // Prepare context with any follow-up answers
      let researchContext = content;
      
      if (answers.length > 0) {
        researchContext += "\n\nAdditional context from user:\n";
        answers.forEach(answer => {
          if (answer.answer) {
            researchContext += `Q: ${answer.question}\nA: ${answer.answer}\n\n`;
          }
        });
      }
      
      // Conduct the multi-perspective analysis
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { 
            role: "system", 
            content: `You are an expert research system analyzing content from multiple perspectives.
            Conduct a thorough analysis of the provided content and generate:
            1. A factual, balanced summary of the main points
            2. Analysis from center perspective (balanced, evidence-based view)
            3. Analysis from left-leaning perspective (progressive/liberal viewpoint)
            4. Analysis from right-leaning perspective (conservative/traditional viewpoint)
            5. Sources that would be relevant for this analysis
            6. A factual accuracy score (1-10)
            
            Provide nuanced, thoughtful analysis for each perspective, avoiding stereotypes or extremes.
            Format your response as a JSON object.` 
          },
          { 
            role: "user", 
            content: `Analyze this content with multiple perspectives:\n\n${researchContext}` 
          }
        ],
        response_format: { type: "json_object" }
      });
      
      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      // Insert the research results
      const researchResult: InsertResearchResult = {
        requestId: request.id,
        summary: result.summary || "No summary provided",
        leftPerspective: result.leftPerspective || "No left perspective provided",
        centerPerspective: result.centerPerspective || "No center perspective provided",
        rightPerspective: result.rightPerspective || "No right perspective provided",
        factualAccuracy: result.factualAccuracy || 5,
        sources: result.sources || []
      };
      
      const [insertedResult] = await db.insert(researchResults)
        .values(researchResult)
        .returning();
      
      // Update research request status to completed
      await db.update(researchRequests)
        .set({ 
          status: "completed",
          completedAt: new Date() 
        })
        .where(eq(researchRequests.id, request.id));
      
      return insertedResult;
    } catch (error) {
      console.error("Error conducting research:", error);
      
      // Update status to failed
      await db.update(researchRequests)
        .set({ status: "failed" })
        .where(eq(researchRequests.id, request.id));
      
      return null;
    }
  }
  
  // Estimate completion time
  estimateCompletionTime(): number {
    // Return estimated seconds to complete
    // In a real application, this would be more sophisticated based on queue length
    return 60; // 60 seconds
  }
}

export const deepResearchService = new DeepResearchService();