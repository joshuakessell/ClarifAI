import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopicsNavigation from "@/components/layout/TopicsNavigation";
import BreakingNewsAlert from "@/components/news/BreakingNewsAlert";
import DailyDigestHeader from "@/components/news/DailyDigestHeader";
import NewsFeed from "@/components/news/NewsFeed";
import ConflictViewSection from "@/components/news/ConflictViewSection";
import TimelineSection from "@/components/news/TimelineSection";
import SubscribeSection from "@/components/news/SubscribeSection";
import { fetchNewsArticles } from "@/lib/news-api";
import { Head } from "@/components/Head";

export default function Home() {
  const [viewMode, setViewMode] = useState<'feed' | 'conflict' | 'timeline'>('feed');
  const [showBreakingNews, setShowBreakingNews] = useState(true);
  
  // Fetch featured article for conflict view
  const { data: featuredData } = useQuery({
    queryKey: ['/api/news', undefined, 1, 1, 'recent'],
    queryFn: () => fetchNewsArticles({ limit: 1 })
  });
  
  const featuredArticle = featuredData?.articles?.[0];
  
  // For timeline, we'll assume a default topic ID (e.g., climate)
  const defaultTopicId = 6; // Climate topic ID
  
  const handleViewModeChange = (mode: 'feed' | 'conflict' | 'timeline') => {
    setViewMode(mode);
  };
  
  return (
    <>
      <Head title="Clarif-AI - AI-Powered Unbiased News Analysis" description="Get factually verified, bias-neutral news updates with AI-powered analysis from multiple perspectives, all in one place." />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <TopicsNavigation />
        
        <main className="flex-grow">
          {showBreakingNews && (
            <BreakingNewsAlert 
              headline="Breaking News" 
              content="New climate agreement reached at international summit - multiple world leaders commit to reduced emissions targets."
              onDismiss={() => setShowBreakingNews(false)}
              onReadMore={() => {
                // Navigate to the full article in a real app
                console.log("Navigate to breaking news article");
              }}
            />
          )}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <DailyDigestHeader 
              date={new Date()} 
              onViewModeChange={handleViewModeChange}
              currentMode={viewMode}
            />
            
            {viewMode === 'feed' && (
              <NewsFeed />
            )}
            
            {viewMode === 'conflict' && featuredArticle && (
              <ConflictViewSection article={featuredArticle} />
            )}
            
            {viewMode === 'timeline' && (
              <TimelineSection 
                topicId={defaultTopicId} 
                title="Climate Policy"
              />
            )}
            
            <SubscribeSection />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
