import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchTimelineEventsByTopicId } from "@/lib/news-api";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TimelineSectionProps {
  topicId: number;
  title: string;
}

export function TimelineSection({ topicId, title }: TimelineSectionProps) {
  // In a real implementation, we would fetch timeline events from the API
  const { data: events, isLoading, isError } = useQuery({
    queryKey: [`/api/timeline/${topicId}`],
    queryFn: () => fetchTimelineEventsByTopicId(topicId),
    // We'll fallback to mock data for demo purposes
    initialData: [
      {
        id: 1,
        topicId: topicId,
        title: "International Summit Begins",
        description: "World leaders from 195 countries gather to discuss policy and emissions targets in the annual summit.",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        type: "International",
        sources: ["Global Climate Agency", "International Affairs Monitor", "Environmental News Network"]
      },
      {
        id: 2,
        topicId: topicId,
        title: "Major Nations Announce Targets",
        description: "Three of the world's largest carbon emitters announce new, more ambitious emissions reduction targets for 2030 and 2050.",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: "Policy",
        sources: ["Climate Policy Institute", "Environmental Ministry Announcements", "Global Affairs Daily"]
      },
      {
        id: 3,
        topicId: topicId,
        title: "Agreement Reached",
        description: "Summit concludes with new global agreement that includes binding targets, financial commitments for developing nations, and enforcement mechanisms.",
        date: new Date().toISOString(),
        type: "Agreement",
        sources: ["United Nations Environment Programme", "Climate Diplomacy Institute", "International Policy Review"]
      }
    ]
  });

  if (isLoading && !events) {
    return <div className="text-center py-6">Loading timeline...</div>;
  }

  if (isError) {
    return <div className="text-center py-6 text-red-500">Failed to load timeline</div>;
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'International':
        return <i className="fas fa-flag text-white text-sm"></i>;
      case 'Policy':
        return <i className="fas fa-file-signature text-white text-sm"></i>;
      case 'Agreement':
        return <i className="fas fa-handshake text-white text-sm"></i>;
      default:
        return <i className="fas fa-calendar text-white text-sm"></i>;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'International': return 'info';
      case 'Policy': return 'success';
      case 'Agreement': return 'purple';
      default: return 'default';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-dark">
          <i className="fas fa-stream text-accent mr-2"></i>
          {title} Timeline
        </h2>
        <Link href={`/timeline/${topicId}`}>
          <button className="text-sm text-primary hover:text-blue-700 flex items-center">
            View full timeline
            <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {events.map((event, index) => (
              <div key={event.id} className={`flex ${index < events.length - 1 ? 'mb-8' : ''}`}>
                <div className={`flex-shrink-0 ${event.type === 'Agreement' ? 'bg-green-500' : 'bg-primary'} rounded-full h-8 w-8 flex items-center justify-center z-10`}>
                  {getEventIcon(event.type)}
                </div>
                <div className="ml-6">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      {format(new Date(event.date), 'MMMM d, yyyy')}
                    </span>
                    <Badge variant={getBadgeVariant(event.type)} className="ml-2">
                      {event.type}
                    </Badge>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mt-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Sources: {Array.isArray(event.sources) 
                      ? event.sources.join(', ') 
                      : 'Multiple verified sources'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
