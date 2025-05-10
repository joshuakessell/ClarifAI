import { useState } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { fetchResearchRequestById, answerFollowupQuestion, startResearch } from "@/lib/research-api";
import { ResearchRequest, ResearchFollowupQuestion, ResearchResult } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ExternalLink, ArrowLeft, Clock, CheckCircle2, AlertCircle, Brain } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";

export default function ResearchDetails() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Extract the research request ID from the URL
  const requestId = parseInt(window.location.pathname.split("/").pop() || "0");
  
  // State for follow-up questions
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  
  // State for the progress dialog
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Fetch the research request details
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`/api/research-requests/${requestId}`],
    queryFn: () => fetchResearchRequestById(requestId),
    refetchInterval: (data) => {
      // Automatically refetch if the request is in progress
      if (data?.request?.status === "in-progress") {
        return 5000; // Refetch every 5 seconds
      }
      return false; // Don't auto-refetch for other statuses
    },
  });
  
  // Handle answering follow-up questions
  const answerMutation = useMutation({
    mutationFn: (params: { id: number; answer: string }) => 
      answerFollowupQuestion(params.id, params.answer),
    onSuccess: () => {
      refetch();
      toast({
        title: "Answer submitted",
        description: "Your answer has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to submit answer",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Handle starting the research process
  const startResearchMutation = useMutation({
    mutationFn: () => startResearch(requestId),
    onSuccess: (data) => {
      setEstimatedTime(data.estimatedTimeSeconds);
      setShowProgressDialog(true);
      
      // Start progress animation
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (100 / data.estimatedTimeSeconds) * 0.5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 500);
      
      // Refetch after estimated time is complete
      setTimeout(() => {
        refetch();
        setShowProgressDialog(false);
      }, data.estimatedTimeSeconds * 1000);
      
      toast({
        title: "Research started",
        description: "Your research is now in progress.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to start research",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };
  
  const handleAnswerSubmit = (questionId: number) => {
    const answer = answers[questionId];
    if (!answer) return;
    
    answerMutation.mutate({ id: questionId, answer });
  };
  
  const handleStartResearch = () => {
    startResearchMutation.mutate();
  };
  
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
  
  // Check if all follow-up questions have been answered
  const allQuestionsAnswered = data?.followupQuestions?.every(q => q.answer) || false;
  const hasUnansweredQuestions = data?.followupQuestions?.some(q => !q.answer) || false;
  
  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !data) {
    return (
      <div className="container py-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
        <h2 className="mt-4 text-xl font-semibold">Error loading research</h2>
        <p className="text-muted-foreground mt-2">
          We couldn't load the research details.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button onClick={() => navigate("/research")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Research
          </Button>
          <Button onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  const { request, followupQuestions, researchResult } = data;
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="outline"
          onClick={() => navigate("/research")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        {getStatusBadge(request.status)}
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {request.title || "Untitled Research"}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <a 
            href={request.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            {request.url}
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="font-medium">Submitted:</span>{" "}
            {formatDate(request.createdAt)}
          </div>
          {request.completedAt && (
            <div>
              <span className="font-medium">Completed:</span>{" "}
              {formatDate(request.completedAt)}
            </div>
          )}
        </div>
      </div>
      
      {/* Follow-up Questions */}
      {request.status === "pending" && hasUnansweredQuestions && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Follow-up Questions
            </CardTitle>
            <CardDescription>
              Please answer these questions to help our AI provide a more accurate analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {followupQuestions
              .filter(q => !q.answer)
              .map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label htmlFor={`question-${question.id}`}>{question.question}</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`question-${question.id}`}
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Your answer..."
                    />
                    <Button 
                      onClick={() => handleAnswerSubmit(question.id)}
                      disabled={!answers[question.id] || answerMutation.isPending}
                    >
                      {answerMutation.isPending && answerMutation.variables?.id === question.id ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Submit
                    </Button>
                  </div>
                </div>
              ))}
          </CardContent>
          {followupQuestions.filter(q => !q.answer).length > 0 && (
            <CardFooter className="border-t bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                All questions must be answered before research can begin.
              </p>
            </CardFooter>
          )}
        </Card>
      )}
      
      {/* Start Research Button */}
      {request.status === "pending" && allQuestionsAnswered && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ready to Begin Research</CardTitle>
            <CardDescription>
              All follow-up questions have been answered. You can now start the deep research process.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              onClick={handleStartResearch}
              disabled={startResearchMutation.isPending}
              className="w-full"
            >
              {startResearchMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Starting Research...
                </>
              ) : (
                <>
                  Start Deep Research
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Research Results */}
      {researchResult && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Research Summary
              </CardTitle>
              <CardDescription>
                Factual, unbiased summary of the content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="flex items-center mb-4">
                  <div className="text-sm font-medium mr-2">Factual Accuracy Score:</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`h-2 w-6 rounded-sm ${
                          i < researchResult.factualAccuracy ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">
                      {researchResult.factualAccuracy}/10
                    </span>
                  </div>
                </div>
                <p className="leading-relaxed whitespace-pre-line">
                  {researchResult.summary}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="center" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="left">Left Perspective</TabsTrigger>
              <TabsTrigger value="center">Center Perspective</TabsTrigger>
              <TabsTrigger value="right">Right Perspective</TabsTrigger>
            </TabsList>
            
            <TabsContent value="left" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Left-Leaning Perspective</CardTitle>
                  <CardDescription>
                    Analysis from a progressive/liberal viewpoint
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line">{researchResult.leftPerspective}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="center" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Center Perspective</CardTitle>
                  <CardDescription>
                    Balanced, evidence-based view
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line">{researchResult.centerPerspective}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="right" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Right-Leaning Perspective</CardTitle>
                  <CardDescription>
                    Analysis from a conservative/traditional viewpoint
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line">{researchResult.rightPerspective}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {researchResult.sources && researchResult.sources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Sources</CardTitle>
                <CardDescription>
                  References and sources for further reading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {researchResult.sources.map((source, index) => (
                    <li key={index} className="text-sm">
                      {source}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      
      {/* Progress Dialog */}
      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Research in Progress</DialogTitle>
            <DialogDescription>
              We're analyzing the content and generating a comprehensive, multi-perspective report.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-6 space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">
              Estimated time remaining: {Math.ceil((estimatedTime * (100 - progress)) / 100)} seconds
            </p>
          </div>
          
          <div className="text-sm space-y-2">
            <div className="flex gap-2 items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p>Extracting key information from the article</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p>Analyzing perspective and bias</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p>Generating multiple viewpoints</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p>Fact-checking against reliable sources</p>
            </div>
          </div>
          
          <DialogFooter>
            <p className="text-xs text-muted-foreground">
              You can close this dialog. Research will continue in the background.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}