import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopicsNavigation from "@/components/layout/TopicsNavigation";
import { fetchNewsArticleById, fetchNewsAnalysisByArticleId } from "@/lib/news-api";
import { generateMockBiasAnalysis } from "@/lib/openai";
import { Head } from "@/components/Head";

export default function ConflictView() {
  const [, params] = useRoute("/conflict-view/:id");
  const articleId = parseInt(params?.id || "0");
  
  const { data: article, isLoading: isArticleLoading, error: articleError } = useQuery({
    queryKey: [`/api/news/${articleId}`],
    queryFn: () => fetchNewsArticleById(articleId),
    enabled: !!articleId
  });
  
  const { data: analysis, isLoading: isAnalysisLoading, error: analysisError } = useQuery({
    queryKey: [`/api/analysis/${articleId}`],
    queryFn: async () => {
      try {
        // Try to fetch real analysis first
        return await fetchNewsAnalysisByArticleId(articleId);
      } catch (error) {
        // Fallback to mock data for demo purposes
        if (article) {
          return generateMockBiasAnalysis(article);
        }
        throw error;
      }
    },
    enabled: !!article
  });
  
  const isLoading = isArticleLoading || isAnalysisLoading;
  const error = articleError || analysisError;
  
  if (!articleId) {
    return <div>Invalid article ID</div>;
  }
  
  return (
    <>
      <Head 
        title={article ? `Conflict View: ${article.title} - FactFocus` : "Conflict View - FactFocus"} 
        description="Compare different perspectives and bias-free analysis of this news topic." 
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <TopicsNavigation />
        
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading article analysis...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-red-50 rounded-lg">
                <p className="text-red-500">Error loading article analysis</p>
              </div>
            ) : !article || !analysis ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Article or analysis not found</p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-neutral-dark mb-6">{article.title}</h1>
                
                {/* Article Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  {article.imageUrl && (
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                  )}
                  
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-gray-500">
                      Published: {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500 mx-2">•</span>
                    <span className="text-sm text-gray-500">
                      Source: {article.source}
                    </span>
                    {article.verified && (
                      <>
                        <span className="text-sm text-gray-500 mx-2">•</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                          <i className="fas fa-shield-alt mr-1"></i>
                          Verified
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">{article.content}</p>
                  
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-primary hover:text-blue-700 font-medium"
                  >
                    View original article
                  </a>
                </div>
                
                {/* Conflict View */}
                <h2 className="text-xl font-semibold text-neutral-dark mb-4">
                  <i className="fas fa-balance-scale text-accent mr-2"></i>
                  Perspective Analysis
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
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
                
                {/* Factual Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <h3 className="text-lg font-medium text-neutral-dark mb-3">AI-Generated Factual Summary</h3>
                  <p className="text-gray-600">{analysis.factualSummary}</p>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-neutral-dark mb-2">Confidence Score</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${analysis.confidenceScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Our AI-powered analysis is {analysis.confidenceScore}% confident in this factual assessment.
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-neutral-dark mb-2">Sources</h4>
                    <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                      {Array.isArray(analysis.sources) && analysis.sources.map((source, index) => (
                        <li key={index}>{source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
