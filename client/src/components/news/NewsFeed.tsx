import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNewsArticles } from "@/lib/news-api";
import NewsCard from "./NewsCard";
import { NewsArticle } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewsFeedProps {
  topicSlug?: string;
}

export function NewsFeed({ topicSlug }: NewsFeedProps) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'recent' | 'relevant'>('recent');
  const ITEMS_PER_PAGE = 6;
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['/api/news', topicSlug, page, ITEMS_PER_PAGE, sort],
    queryFn: () => fetchNewsArticles({ 
      topic: topicSlug, 
      page, 
      limit: ITEMS_PER_PAGE,
      sort 
    })
  });

  const handleSortChange = (value: string) => {
    setSort(value as 'recent' | 'relevant');
  };
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (isLoading) {
    return (
      <div className="mb-8 text-center py-12">
        <p className="text-gray-500">Loading news stories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-8 text-center py-12 bg-red-50 rounded-lg">
        <p className="text-red-500">Error loading news: {(error as Error).message}</p>
      </div>
    );
  }

  const articles = data?.articles || [];
  const hasMoreArticles = articles.length < (data?.total || 0);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-dark">
          <i className="fas fa-newspaper text-primary mr-2"></i>
          Today's Top Stories
        </h2>
        <div>
          <Select defaultValue={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] text-sm border-gray-300 rounded-md">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="relevant">Most Relevant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article: NewsArticle) => (
            <NewsCard key={article.id} article={article} />
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">No news articles found.</p>
          </div>
        )}
      </div>
      
      {hasMoreArticles && (
        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={handleLoadMore}
          >
            Load More Stories
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsFeed;
