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
  // Extract first two words safely, with fallbacks
  const titleWords = article.title.split(' ');
  const firstWord = titleWords[0] || "This policy";
  const secondWord = titleWords[1] || "initiative";
  const titlePhrase = `${firstWord} ${secondWord}`;
  
  return {
    leftPerspective: `${titlePhrase} is essential for progress and equality, with widespread public support showing its value for improving lives and addressing systemic issues. The data clearly demonstrates positive outcomes for vulnerable communities and provides a framework for sustainable change that benefits society as a whole.`,
    
    centerPerspective: `${titlePhrase} contains a mix of provisions with varied levels of support from different stakeholders. Experts note potential benefits but also implementation challenges. Analysis of comparable policies shows mixed results depending on local conditions and how the initiative is executed. Both supporters and critics make valid points about its implications.`,
    
    rightPerspective: `${titlePhrase} represents government overreach and threatens local autonomy, imposing excessive regulatory burdens and costs for questionable benefit. Economic analysis suggests negative impacts on small businesses and job creators while failing to address the root causes of the issues it claims to solve.`,
    
    factualSummary: `${article.title} was announced on ${new Date(article.publishedAt).toLocaleDateString()}. It contains multiple provisions with implications for various stakeholders. Independent analysis suggests both benefits and challenges in implementation. The policy has drawn mixed reactions across the political spectrum, with debate focusing on implementation costs, timelines, and measurement of outcomes.`,
    
    confidenceScore: 85,
    sources: ['National Policy Institute', 'Public Integrity Project', 'GlobalNews', 'FactCheck.org', 'Reuters']
  };
}
