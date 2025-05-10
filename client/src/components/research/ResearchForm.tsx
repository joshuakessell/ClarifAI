import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createResearchRequest } from "@/lib/research-api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Globe, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { queryClient } from "@/lib/queryClient";

// Validation schema for the research form
const formSchema = z.object({
  url: z.string()
    .url("Please enter a valid URL")
    .min(1, "URL is required"),
  title: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ResearchFormProps {
  onSubmitSuccess?: () => void;
}

export function ResearchForm({ onSubmitSuccess }: ResearchFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
    },
  });
  
  // Handle form submission
  const mutation = useMutation({
    mutationFn: (data: FormValues) => createResearchRequest(data.url, data.title || undefined),
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      setIsSubmitting(false);
      toast({
        title: "Research request submitted",
        description: "Your article has been submitted for deep research.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/research-requests"] });
      if (onSubmitSuccess) onSubmitSuccess();
    },
    onError: (error: Error) => {
      setIsSubmitting(false);
      toast({
        title: "Failed to submit research request",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(data: FormValues) {
    mutation.mutate(data);
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Submit Article for Deep Research
          </CardTitle>
          <CardDescription>
            Enter the URL of an article or social media post to analyze from multiple perspectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/article" 
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Custom title for this research" 
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : "Submit for Research"}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-medium mb-2">How it works:</h3>
            <ol className="text-sm space-y-2 text-muted-foreground list-decimal list-inside">
              <li>Submit the URL of an article or social media post</li>
              <li>Our AI will analyze the content and may ask follow-up questions</li>
              <li>A comprehensive report will be generated with multiple perspectives</li>
              <li>Review the analysis to understand different viewpoints on the topic</li>
            </ol>
            
            <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Important:</p>
                <p>Analysis takes approximately 1-2 minutes to complete. You'll be notified when your results are ready.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}