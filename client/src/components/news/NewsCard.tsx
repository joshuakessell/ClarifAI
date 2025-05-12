import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { NewsArticle } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const getTopicBadgeVariant = (topic?: string) => {
    switch (topic) {
      case 'politics': return 'default';
      case 'technology': return 'info';
      case 'business': return 'success';
      case 'health': return 'error';
      case 'science': return 'secondary';
      case 'climate': return 'success';
      case 'entertainment': return 'purple';
      default: return 'default';
    }
  };
  
  // Determine topic name and slug based on topicId
  let topicName = 'General';
  let topicSlug = 'general';
  
  // Map of topic IDs to names and slugs
  const topicMap: Record<number, {name: string, slug: string}> = {
    1: { name: 'Politics', slug: 'politics' },
    2: { name: 'Technology', slug: 'technology' },
    3: { name: 'Business', slug: 'business' },
    4: { name: 'Health', slug: 'health' },
    5: { name: 'Science', slug: 'science' },
    6: { name: 'Climate', slug: 'climate' },
    7: { name: 'Entertainment', slug: 'entertainment' }
  };
  
  if (article.topicId && topicMap[article.topicId]) {
    topicName = topicMap[article.topicId].name;
    topicSlug = topicMap[article.topicId].slug;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <Link href={`/topic/${topicSlug}`}>
            <Badge 
              variant={getTopicBadgeVariant(topicSlug)}
              className="cursor-pointer"
            >
              {topicName}
            </Badge>
          </Link>
          <span className="text-xs text-gray-500 ml-auto flex items-center">
            <i className="fas fa-clock mr-1"></i>
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{article.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {article.verified ? (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                <i className="fas fa-shield-alt mr-1"></i>
                Verified
              </span>
            ) : (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
                <i className="fas fa-clock mr-1"></i>
                Verifying Sources
              </span>
            )}
          </div>
          <Link href={`/news/${article.id}`}>
            <button className="text-primary hover:text-blue-700 text-sm font-medium">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
