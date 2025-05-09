import { NewsArticle } from "@shared/schema";

// This is a client-side wrapper for calling OpenAI via the server APIs
// The actual OpenAI integration happens on the server for security

interface BiasAnalysisResult {
  leftPerspective: string;
  centerPerspective: string;
  rightPerspective: string;
  factualSummary: string;
  confidenceScore: number;
  sources: string[];
}

export async function analyzeArticleBias(articleId: number): Promise<BiasAnalysisResult> {
  try {
    const response = await fetch(`/api/admin/analyze-article/${articleId}`, {
      method: 'POST',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Error analyzing article: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error analyzing article bias:", error);
    throw error;
  }
}

// For demo/development purposes - will call APIs directly in production
export function generateMockBiasAnalysis(article: NewsArticle): BiasAnalysisResult {
  const titleWords = article.title.split(' ');
  
  return {
    leftPerspective: `${titleWords[0]} ${titleWords[1]} is essential for progress and equality, with widespread public support showing its value for improving lives and addressing systemic issues.`,
    centerPerspective: `${titleWords[0]} ${titleWords[1]} contains a mix of provisions with varied levels of support from different stakeholders. Experts note potential benefits but also implementation challenges.`,
    rightPerspective: `${titleWords[0]} ${titleWords[1]} represents government overreach and threatens local autonomy, imposing excessive regulatory burdens and costs for questionable benefit.`,
    factualSummary: `${article.title} was announced on ${new Date(article.publishedAt).toLocaleDateString()}. It contains multiple provisions with implications for various stakeholders. Independent analysis suggests both benefits and challenges in implementation.`,
    confidenceScore: 85,
    sources: ['National Policy Institute', 'Public Integrity Project', 'GlobalNews', 'FactCheck.org', 'Reuters']
  };
}
