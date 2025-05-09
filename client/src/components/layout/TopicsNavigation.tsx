import { useState } from "react";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopics } from "@/lib/news-api";
import { Topic } from "@shared/schema";

export function TopicsNavigation() {
  const [, params] = useRoute("/topic/:slug");
  const currentTopicSlug = params?.slug;
  
  const { data: topics, isLoading, error } = useQuery({
    queryKey: ['/api/topics'],
  });

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
            <Link href="/">
              <button className={`inline-flex items-center px-3 py-1 border ${!currentTopicSlug ? 'border-transparent text-white bg-primary hover:bg-blue-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}>
                <i className="fas fa-fire mr-1"></i>
                Top Stories
              </button>
            </Link>
            
            {isLoading ? (
              <div className="text-sm text-gray-500">Loading topics...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error loading topics</div>
            ) : (
              topics?.map((topic: Topic) => (
                <Link key={topic.id} href={`/topic/${topic.slug}`}>
                  <button 
                    className={`inline-flex items-center px-3 py-1 border ${currentTopicSlug === topic.slug ? 'border-transparent text-white bg-primary hover:bg-blue-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                  >
                    {topic.name}
                  </button>
                </Link>
              ))
            )}
          </div>
          
          <div>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <i className="fas fa-plus mr-1"></i>
              Add Topic
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopicsNavigation;
