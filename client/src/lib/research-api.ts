import { apiRequest } from "./queryClient";
import { ResearchRequest, ResearchFollowupQuestion, ResearchResult } from "@shared/schema";

export interface ResearchRequestWithDetails {
  request: ResearchRequest;
  followupQuestions: ResearchFollowupQuestion[];
  researchResult?: ResearchResult;
}

export interface InitialResearchResponse {
  request: ResearchRequest;
  followupQuestions: ResearchFollowupQuestion[];
  estimatedTime: number;
}

export async function createResearchRequest(url: string, title?: string): Promise<InitialResearchResponse> {
  const res = await apiRequest("POST", "/api/research-requests", { url, title });
  return await res.json();
}

export async function fetchResearchRequests(): Promise<ResearchRequest[]> {
  const res = await apiRequest("GET", "/api/research-requests");
  return await res.json();
}

export async function fetchResearchRequestById(id: number): Promise<ResearchRequestWithDetails> {
  const res = await apiRequest("GET", `/api/research-requests/${id}`);
  return await res.json();
}

export async function answerFollowupQuestion(id: number, answer: string): Promise<ResearchFollowupQuestion> {
  const res = await apiRequest("POST", `/api/research-followups/${id}/answer`, { answer });
  return await res.json();
}

export async function startResearch(id: number): Promise<{ message: string; estimatedTimeSeconds: number }> {
  const res = await apiRequest("POST", `/api/research-requests/${id}/start`);
  return await res.json();
}