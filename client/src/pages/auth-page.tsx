import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Redirect } from "wouter";

export default function AuthPage() {
  const { user, isLoading } = useAuth();

  // If already logged in, redirect to home
  if (user) {
    return <Redirect to="/" />;
  }

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center w-full max-w-md px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Neutral News</h1>
          <p className="text-muted-foreground">
            Get factually verified, bias-neutral news updates on the topics you care about.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleLogin} 
            className="w-full"
            size="lg"
          >
            Log in with Replit
          </Button>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:block w-full bg-muted">
        <div className="flex flex-col justify-center h-full p-12">
          <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Unbiased News Analysis</h2>
            <p className="text-muted-foreground mb-6">
              Our platform uses advanced AI to detect bias and provide factual,
              neutral perspectives on current events.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg shadow">
                <h3 className="font-semibold mb-2">Multi-Perspective Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  See news events from left, center, and right viewpoints to get a complete picture.
                </p>
              </div>
              
              <div className="p-4 bg-background rounded-lg shadow">
                <h3 className="font-semibold mb-2">Factual Verification</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered fact checking ensures information accuracy before delivery.
                </p>
              </div>
              
              <div className="p-4 bg-background rounded-lg shadow">
                <h3 className="font-semibold mb-2">Deep Research Feature</h3>
                <p className="text-sm text-muted-foreground">
                  Submit any article or post for in-depth analysis and get comprehensive insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}