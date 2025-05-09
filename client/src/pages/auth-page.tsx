import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Head } from "@/components/Head";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopics } from "@/lib/news-api";
import { Topic } from "@shared/schema";

// Login schema
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Registration schema
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  topics: z.array(z.number()).min(1, "Please select at least one topic"),
  emailNotifications: z.boolean().default(true),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  const [step, setStep] = useState(1);
  
  // Fetch topics for user selection
  const { data: topics = [] } = useQuery<Topic[]>({
    queryKey: ["/api/topics"],
  });

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  // Registration form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      topics: [],
      emailNotifications: true,
    },
  });

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      registerForm.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    // Create user object and submit
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    registerMutation.mutate(userData, {
      onSuccess: async (user) => {
        // After successful registration, add selected topics
        if (user && data.topics.length > 0) {
          try {
            // Add user topics (in a real app, this would be done server-side)
            for (const topicId of data.topics) {
              await fetch('/api/user-topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, topicId }),
              });
            }
          } catch (error) {
            console.error('Error adding user topics:', error);
          }
        }
        navigate("/");
      },
    });
  };

  const nextStep = () => {
    registerForm.trigger(['username', 'email', 'password', 'confirmPassword']);
    
    const hasErrors = !!registerForm.formState.errors.username || 
                      !!registerForm.formState.errors.email || 
                      !!registerForm.formState.errors.password ||
                      !!registerForm.formState.errors.confirmPassword;
    
    if (!hasErrors) {
      setStep(2);
    }
  };

  const previousStep = () => {
    setStep(1);
  };

  return (
    <>
      <Head 
        title="Sign In or Register - FactFocus" 
        description="Sign in to your FactFocus account or create a new one to get personalized, bias-free news updates."
      />
      
      <div className="flex min-h-screen">
        {/* Left side: Forms */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">FactFocus</h1>
              <p className="text-gray-600">Get unbiased news on topics that matter to you</p>
            </div>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Create Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>Enter your username and password to access your personalized news feed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? "Signing in..." : "Sign In"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <div className="text-sm text-gray-500">
                      Don't have an account?{" "}
                      <button 
                        type="button" 
                        className="underline text-primary p-0 h-auto"
                        onClick={() => document.querySelector('[value="register"]')?.dispatchEvent(new MouseEvent('click'))}
                      >
                        Create one
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create a new account</CardTitle>
                    <CardDescription>Fill out the form to get started with FactFocus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        {step === 1 && (
                          <>
                            <FormField
                              control={registerForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Choose a username" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registerForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="your@email.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registerForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registerForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <Button 
                              type="button" 
                              className="w-full"
                              onClick={nextStep}
                            >
                              Continue
                            </Button>
                          </>
                        )}
                        
                        {step === 2 && (
                          <>
                            <div>
                              <h3 className="text-lg font-medium mb-2">Select your interests</h3>
                              <p className="text-sm text-gray-500 mb-4">Choose topics you'd like to follow in your news feed</p>
                              
                              <div className="space-y-4">
                                <FormField
                                  control={registerForm.control}
                                  name="topics"
                                  render={() => (
                                    <FormItem>
                                      <div className="grid grid-cols-2 gap-4">
                                        {topics && topics.map((topic: Topic) => (
                                          <FormField
                                            key={topic.id}
                                            control={registerForm.control}
                                            name="topics"
                                            render={({ field }) => {
                                              return (
                                                <FormItem 
                                                  key={topic.id}
                                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                                >
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={field.value?.includes(topic.id)}
                                                      onCheckedChange={(checked) => {
                                                        return checked
                                                          ? field.onChange([...field.value, topic.id])
                                                          : field.onChange(
                                                              field.value?.filter(
                                                                (value) => value !== topic.id
                                                              )
                                                            )
                                                      }}
                                                    />
                                                  </FormControl>
                                                  <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm font-medium">
                                                      {topic.name}
                                                    </FormLabel>
                                                    <p className="text-xs text-muted-foreground">
                                                      {topic.description}
                                                    </p>
                                                  </div>
                                                </FormItem>
                                              );
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            
                            <FormField
                              control={registerForm.control}
                              name="emailNotifications"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      Email Notifications
                                    </FormLabel>
                                    <p className="text-sm text-muted-foreground">
                                      Receive daily news digests and breaking news alerts by email
                                    </p>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex space-x-2 pt-4">
                              <Button 
                                type="button" 
                                variant="outline"
                                onClick={previousStep}
                                className="flex-1"
                              >
                                Back
                              </Button>
                              <Button 
                                type="submit" 
                                disabled={registerMutation.isPending}
                                className="flex-1"
                              >
                                {registerMutation.isPending ? "Creating account..." : "Create Account"}
                              </Button>
                            </div>
                          </>
                        )}
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Right side: Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-12 flex-col justify-center">
          <div className="max-w-lg mx-auto">
            <h2 className="text-4xl font-bold mb-6">Get factual, unbiased news updates</h2>
            <p className="text-xl mb-8">FactFocus delivers verified news content that presents multiple perspectives on important topics.</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                  <i className="fas fa-check text-white"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">AI-Powered Bias Detection</h3>
                  <p>Our technology identifies and neutralizes bias from news sources across the political spectrum.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                  <i className="fas fa-balance-scale text-white"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Multiple Perspectives</h3>
                  <p>See how different sources report on the same events with our unique conflict view.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                  <i className="fas fa-stream text-white"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Contextual Timelines</h3>
                  <p>Understand how stories develop over time with chronological events and background.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}