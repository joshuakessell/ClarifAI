import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchResearchRequests } from "@/lib/research-api";
import { ResearchRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, FileSearch, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { ResearchForm } from "@/components/research/ResearchForm";

export default function ResearchDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  const [, navigate] = useLocation();
  
  const { data: requests, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/research-requests"],
    queryFn: fetchResearchRequests,
  });
  
  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </div>
        );
      case "in-progress":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>In Progress</span>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
            <CheckCircle2 className="h-3 w-3" />
            <span>Completed</span>
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
            <AlertCircle className="h-3 w-3" />
            <span>Failed</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  const getEmptyState = () => {
    return (
      <div className="text-center py-12">
        <FileSearch className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No research requests yet</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
          Submit an article or social media post to analyze from multiple perspectives.
        </p>
        <Button 
          className="mt-6" 
          onClick={() => setActiveTab("submit")}
        >
          Submit Your First Article
        </Button>
      </div>
    );
  };
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deep Research</h1>
          <p className="text-muted-foreground mt-1">
            Analyze external articles from multiple perspectives
          </p>
        </div>
      </div>
      
      <Tabs 
        defaultValue="requests" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">My Research</TabsTrigger>
          <TabsTrigger value="submit">Submit New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
              <h3 className="mt-4 text-lg font-semibold">Failed to load research</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                There was an error loading your research requests.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : requests && requests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {requests.map((request: ResearchRequest) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="line-clamp-1">
                          {request.title || "Untitled Research"}
                        </CardTitle>
                        <CardDescription className="line-clamp-1">
                          {request.url}
                        </CardDescription>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm pb-3">
                    <div className="flex justify-between text-muted-foreground">
                      <div>
                        Submitted: {formatDate(request.createdAt)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 pt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/research/${request.id}`)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            getEmptyState()
          )}
        </TabsContent>
        
        <TabsContent value="submit">
          <ResearchForm onSubmitSuccess={() => setActiveTab("requests")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}