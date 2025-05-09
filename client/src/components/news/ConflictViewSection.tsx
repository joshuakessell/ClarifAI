import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchNewsAnalysisByArticleId } from "@/lib/news-api";
import { NewsArticle } from "@shared/schema";
import { generateMockBiasAnalysis } from "@/lib/openai";

interface ConflictViewSectionProps {
  article: NewsArticle;
  useRealAnalysis?: boolean;
}

export function ConflictViewSection({ article, useRealAnalysis = false }: ConflictViewSectionProps) {
  // In a real implementation, we'd use the real analysis from the API
  // For demo purposes, we can optionally use mock data
  const { data: analysis, isLoading, isError } = useQuery({
    queryKey: [`/api/analysis/${article.id}`],
    queryFn: async () => {
      if (useRealAnalysis) {
        return await fetchNewsAnalysisByArticleId(article.id);
      }
      return generateMockBiasAnalysis(article);
    }
  });

  if (isLoading) {
    return <div className="text-center py-6">Loading analysis...</div>;
  }

  if (isError || !analysis) {
    return <div className="text-center py-6 text-red-500">Failed to load perspective analysis</div>;
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-dark">
          <i className="fas fa-balance-scale text-accent mr-2"></i>
          Conflict View: {article.title.length > 30 ? article.title.substring(0, 30) + '...' : article.title}
        </h2>
        <Link href={`/conflict-view/${article.id}`}>
          <button className="text-sm text-primary hover:text-blue-700 flex items-center">
            View full analysis
            <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left perspective */}
        <div className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <span className="source-label source-left absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Left-leaning</span>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Left Perspective</h3>
          <p className="text-gray-600 mb-4">{analysis.leftPerspective}</p>
          <div className="text-sm text-gray-500 flex items-center mb-2">
            <i className="fas fa-check-circle text-green-500 mr-1"></i>
            <span>Factual reporting on key points</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <i className="fas fa-exclamation-circle text-yellow-500 mr-1"></i>
            <span>Emphasizes benefits while minimizing concerns</span>
          </div>
        </div>
        
        {/* Center perspective */}
        <div className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <span className="source-label source-center absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Neutral analysis</span>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Center Perspective</h3>
          <p className="text-gray-600 mb-4">{analysis.centerPerspective}</p>
          <div className="text-sm text-gray-500 flex items-center mb-2">
            <i className="fas fa-check-circle text-green-500 mr-1"></i>
            <span>Comprehensive summary with context</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <i className="fas fa-check-circle text-green-500 mr-1"></i>
            <span>Includes perspectives from various stakeholders</span>
          </div>
        </div>
        
        {/* Right perspective */}
        <div className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <span className="source-label source-right absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">Right-leaning</span>
          <h3 className="text-lg font-medium text-neutral-dark mb-2">Right Perspective</h3>
          <p className="text-gray-600 mb-4">{analysis.rightPerspective}</p>
          <div className="text-sm text-gray-500 flex items-center mb-2">
            <i className="fas fa-check-circle text-green-500 mr-1"></i>
            <span>Factual on core implementation details</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <i className="fas fa-exclamation-circle text-yellow-500 mr-1"></i>
            <span>Focuses on costs without addressing benefits</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-neutral-dark mb-3">AI-Generated Factual Summary</h3>
        <p className="text-gray-600">{analysis.factualSummary}</p>
        <div className="mt-4 flex items-center">
          <div className="group relative">
            <div className="flex items-center text-sm text-primary cursor-help">
              <i className="fas fa-info-circle mr-1"></i>
              How we verify facts
            </div>
            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded w-48 mb-2">
              We cross-reference information across multiple reliable sources and use AI to detect inconsistencies.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConflictViewSection;
