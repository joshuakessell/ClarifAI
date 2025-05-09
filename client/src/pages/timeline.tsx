import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TopicsNavigation from "@/components/layout/TopicsNavigation";
import { fetchTimelineEventsByTopicId, fetchTopicBySlug } from "@/lib/news-api";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Head } from "@/components/Head";

export default function Timeline() {
  const [, params] = useRoute("/timeline/:id");
  const topicId = parseInt(params?.id || "0");
  
  // In a real app, we would fetch the topic by ID instead of using a hardcoded slug
  const { data: topic } = useQuery({
    queryKey: [`/api/topics/climate`],
    queryFn: () => fetchTopicBySlug("climate"),
    enabled: topicId === 6 // Only enable for our default climate topic ID
  });
  
  const { data: events, isLoading, error } = useQuery({
    queryKey: [`/api/timeline/${topicId}`],
    queryFn: () => fetchTimelineEventsByTopicId(topicId),
    // Fallback to mock data for demo purposes
    initialData: [
      {
        id: 1,
        topicId: topicId,
        title: "First major climate accord proposed",
        description: "Initial framework for international climate cooperation established",
        date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        type: "Policy",
        sources: ["United Nations", "Climate Policy Institute"]
      },
      {
        id: 2,
        topicId: topicId,
        title: "Scientific study confirms warming trend",
        description: "Major scientific consortium releases comprehensive data showing accelerating climate trends",
        date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        type: "Research",
        sources: ["Science Journal", "Climate Research Center", "University Consortium"]
      },
      {
        id: 3,
        topicId: topicId,
        title: "Regional implementation begins",
        description: "First set of countries begin implementing emissions reduction strategies",
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        type: "Implementation",
        sources: ["Environmental Ministry", "Policy Monitor"]
      },
      {
        id: 4,
        topicId: topicId,
        title: "Industry leaders pledge carbon neutrality",
        description: "Major industrial corporations announce timelines for carbon neutral operations",
        date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        type: "Industry",
        sources: ["Business Chronicle", "Sustainability Report"]
      },
      {
        id: 5,
        topicId: topicId,
        title: "International Summit Begins",
        description: "World leaders from 195 countries gather to discuss policy and emissions targets in the annual summit.",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        type: "International",
        sources: ["Global Climate Agency", "International Affairs Monitor", "Environmental News Network"]
      },
      {
        id: 6,
        topicId: topicId,
        title: "Major Nations Announce Targets",
        description: "Three of the world's largest carbon emitters announce new, more ambitious emissions reduction targets for 2030 and 2050.",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: "Policy",
        sources: ["Climate Policy Institute", "Environmental Ministry Announcements", "Global Affairs Daily"]
      },
      {
        id: 7,
        topicId: topicId,
        title: "Agreement Reached",
        description: "Summit concludes with new global agreement that includes binding targets, financial commitments for developing nations, and enforcement mechanisms.",
        date: new Date().toISOString(),
        type: "Agreement",
        sources: ["United Nations Environment Programme", "Climate Diplomacy Institute", "International Policy Review"]
      }
    ]
  });
  
  if (!topicId) {
    return <div>Invalid topic ID</div>;
  }
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'International':
        return <i className="fas fa-flag text-white text-sm"></i>;
      case 'Policy':
        return <i className="fas fa-file-signature text-white text-sm"></i>;
      case 'Agreement':
        return <i className="fas fa-handshake text-white text-sm"></i>;
      case 'Research':
        return <i className="fas fa-microscope text-white text-sm"></i>;
      case 'Implementation':
        return <i className="fas fa-cogs text-white text-sm"></i>;
      case 'Industry':
        return <i className="fas fa-industry text-white text-sm"></i>;
      default:
        return <i className="fas fa-calendar text-white text-sm"></i>;
    }
  };
  
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'International': return 'info';
      case 'Policy': return 'success';
      case 'Agreement': return 'purple';
      case 'Research': return 'secondary';
      case 'Implementation': return 'warning';
      case 'Industry': return 'default';
      default: return 'default';
    }
  };
  
  const getBgColor = (type: string) => {
    switch (type) {
      case 'Agreement': return 'bg-green-500';
      case 'Research': return 'bg-purple-500';
      case 'Implementation': return 'bg-yellow-500';
      case 'Industry': return 'bg-gray-700';
      default: return 'bg-primary';
    }
  };
  
  return (
    <>
      <Head 
        title={`${topic?.name || "Topic"} Timeline - FactFocus`} 
        description={`View the complete chronological timeline of ${topic?.name || "this topic"} with verified events and sources.`} 
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <TopicsNavigation />
        
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-neutral-dark mb-1">
              {topic?.name || "Topic"} Timeline
            </h1>
            <p className="text-gray-500 mb-6">
              A chronological view of significant events related to {topic?.name?.toLowerCase() || "this topic"}.
            </p>
            
            {isLoading && !events ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading timeline...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-red-50 rounded-lg">
                <p className="text-red-500">Error loading timeline</p>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 z-0"></div>
                  
                  {/* Timeline items */}
                  <div className="relative z-10">
                    {events.map((event, index) => (
                      <div key={event.id} className={`flex ${index < events.length - 1 ? 'mb-10' : ''}`}>
                        <div className={`flex-shrink-0 ${getBgColor(event.type)} rounded-full h-8 w-8 flex items-center justify-center z-10`}>
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
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
