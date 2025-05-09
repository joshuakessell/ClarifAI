import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/lib/news-api";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

export function SubscribeSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: SubscribeFormValues) => {
    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(data.email);
      toast({
        title: "Subscription successful",
        description: "You'll now receive daily news digests and breaking news alerts.",
        variant: "success",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: (error as Error).message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-8 mb-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-white text-2xl font-bold mb-4">Stay informed with fact-based news</h2>
        <p className="text-blue-100 mb-6">Get daily digests and breaking news alerts on topics you care about, verified from multiple sources.</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 justify-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-grow max-w-md">
                  <FormControl>
                    <Input 
                      placeholder="Your email address" 
                      className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-200 text-xs mt-1" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>
        
        <p className="text-blue-100 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  );
}

export default SubscribeSection;
