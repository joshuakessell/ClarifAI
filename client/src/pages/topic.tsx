import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopicsNavigation from "@/components/layout/TopicsNavigation";
import DailyDigestHeader from "@/components/news/DailyDigestHeader";
import NewsFeed from "@/components/news/NewsFeed";
import ConflictViewSection from "@/components/news/ConflictViewSection";
import TimelineSection from "@/components/news/TimelineSection";
import SubscribeSection from "@/components/news/SubscribeSection";
import { fetchTopicBySlug, fetchNewsArticles } from "@/lib/news-api";
import { Head } from "@/components/Head";

export default function Topic() {
  const [, params] = useRoute("/topic/:slug");
  const topicSlug = params?.slug;
  const [viewMode, setViewMode] = useState<'feed' | 'conflict' | 'timeline'>('feed');
  
  const { data: topic, isLoading: isTopicLoading } = useQuery({
    queryKey: [`/api/topics/${topicSlug}`],
    queryFn: () => fetchTopicBySlug(topicSlug || ""),
    enabled: !!topicSlug
  });
  
  // Fetch featured article for conflict view
  const { data: featuredData } = useQuery({
    queryKey: ['/api/news', topicSlug, 1, 1, 'recent'],
    queryFn: () => fetchNewsArticles({ 
      topic: topicSlug, 
      limit: 1 
    }),
    enabled: !!topicSlug
  });
  
  const featuredArticle = featuredData?.articles?.[0];
  
  const handleViewModeChange = (mode: 'feed' | 'conflict' | 'timeline') => {
    setViewMode(mode);
  };
  
  if (!topicSlug) {
    return <div>Topic not found</div>;
  }
  
  return (
    <>
      <Head 
        title={`${topic?.name || "Topic"} - FactFocus`} 
        description={`Get the latest unbiased news and analysis about ${topic?.name || "this topic"} from multiple verified sources.`} 
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <TopicsNavigation />
        
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <DailyDigestHeader 
              date={new Date()} 
              onViewModeChange={handleViewModeChange}
              currentMode={viewMode}
            />
            
            {viewMode === 'feed' && (
              <NewsFeed topicSlug={topicSlug} />
            )}
            
            {viewMode === 'conflict' && featuredArticle && (
              <ConflictViewSection article={featuredArticle} />
            )}
            
            {viewMode === 'timeline' && topic && (
              <TimelineSection 
                topicId={topic.id} 
                title={topic.name}
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
