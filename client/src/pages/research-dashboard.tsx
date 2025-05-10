import { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  
  const { data: requests, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/research-requests"],
    queryFn: fetchResearchRequests,
  });

  // Group requests by status
  const pendingRequests = requests?.filter(req => ["pending", "in-progress"].includes(req.status)) || [];
  const completedRequests = requests?.filter(req => req.status === "completed") || [];
  const failedRequests = requests?.filter(req => req.status === "failed") || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "in-progress":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileSearch className="h-5 w-5" />;
    }
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  };

  const handleViewRequest = (id: number) => {
    navigate(`/research/${id}`);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Deep Research</h1>
        <p className="text-muted-foreground mt-2">
          Submit articles or posts for in-depth, multi-perspective analysis
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requests">My Research</TabsTrigger>
          <TabsTrigger value="new">New Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="mt-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">Error loading research requests</p>
              <Button onClick={() => refetch()} variant="outline" className="mt-4">
                Try Again
              </Button>
            </div>
          ) : requests?.length === 0 ? (
            <div className="text-center py-12">
              <FileSearch className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No research requests yet</h3>
              <p className="text-muted-foreground mt-1">
                Submit an article or social media post to analyze it from multiple perspectives.
              </p>
              <Button onClick={() => setActiveTab("new")} className="mt-4">
                Start New Research
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {pendingRequests.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">In Progress</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pendingRequests.map((request) => (
                      <Card key={request.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <CardTitle className="truncate">{request.title || "Untitled Research"}</CardTitle>
                          </div>
                          <CardDescription className="truncate">
                            {request.url}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            <span className="font-medium">Status:</span>{" "}
                            {request.status === "pending" ? "Awaiting Followups" : "Researching..."}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Submitted:</span>{" "}
                            {formatDate(request.createdAt)}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleViewRequest(request.id)}
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {completedRequests.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Completed</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {completedRequests.map((request) => (
                      <Card key={request.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <CardTitle className="truncate">{request.title || "Untitled Research"}</CardTitle>
                          </div>
                          <CardDescription className="truncate">
                            {request.url}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            <span className="font-medium">Status:</span> Completed
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Submitted:</span>{" "}
                            {formatDate(request.createdAt)}
                          </p>
                          {request.completedAt && (
                            <p className="text-sm">
                              <span className="font-medium">Completed:</span>{" "}
                              {formatDate(request.completedAt)}
                            </p>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full"
                            onClick={() => handleViewRequest(request.id)}
                          >
                            View Results
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {failedRequests.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Failed</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {failedRequests.map((request) => (
                      <Card key={request.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <CardTitle className="truncate">{request.title || "Untitled Research"}</CardTitle>
                          </div>
                          <CardDescription className="truncate">
                            {request.url}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            <span className="font-medium">Status:</span> Failed
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Submitted:</span>{" "}
                            {formatDate(request.createdAt)}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleViewRequest(request.id)}
                          >
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="new" className="mt-6">
          <ResearchForm onSubmitSuccess={() => setActiveTab("requests")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}