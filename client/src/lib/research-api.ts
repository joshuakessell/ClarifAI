import { apiRequest } from "./queryClient";
import { ResearchRequest, ResearchFollowupQuestion, ResearchResult } from "@shared/schema";

// Interfaces for the API responses
export interface ResearchRequestWithDetails {
  request: ResearchRequest;
  followupQuestions: ResearchFollowupQuestion[];
  researchResult: ResearchResult | null;
}

/**
 * Fetch all research requests for the current user
 */
export async function fetchResearchRequests(): Promise<ResearchRequest[]> {
  const response = await apiRequest("GET", "/api/research-requests");
  return await response.json();
}

/**
 * Fetch a specific research request by ID including followup questions and results
 */
export async function fetchResearchRequestById(id: number): Promise<ResearchRequestWithDetails> {
  const response = await apiRequest("GET", `/api/research-requests/${id}`);
  return await response.json();
}

/**
 * Create a new research request
 */
export async function createResearchRequest(
  url: string,
  title?: string
): Promise<ResearchRequest> {
  const response = await apiRequest("POST", "/api/research-requests", {
    url,
    title: title || null,
  });
  return await response.json();
}

/**
 * Answer a followup question
 */
export async function answerFollowupQuestion(
  id: number,
  answer: string
): Promise<ResearchFollowupQuestion> {
  const response = await apiRequest(
    "PATCH",
    `/api/research-followup-questions/${id}`,
    { answer }
  );
  return await response.json();
}

/**
 * Start the research process for a request
 */
export async function startResearch(
  requestId: number
): Promise<{ success: boolean; estimatedTimeSeconds: number }> {
  const response = await apiRequest(
    "POST",
    `/api/research-requests/${requestId}/start`,
    {}
  );
  return await response.json();
}