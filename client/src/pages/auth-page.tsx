import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Redirect, Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define form schemas
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, isLoading, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");

  // Define forms
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // If already logged in, redirect to home
  if (user) {
    return <Redirect to="/" />;
  }

  // Handle form submissions
  const handleLogin = async (values: LoginFormValues) => {
    await login(values);
  };

  const handleRegister = async (values: RegisterFormValues) => {
    await register(values);
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
      <div className="flex flex-col justify-center w-full lg:w-1/2 max-w-md lg:max-w-none px-8 py-12 lg:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Neutral News</h1>
          <p className="text-muted-foreground">
            Get factually verified, bias-neutral news updates on the topics you care about.
          </p>
        </div>

        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
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
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Login
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
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
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={registerForm.formState.isSubmitting}
                >
                  {registerForm.formState.isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Create Account
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        {/* Guest Access Option */}
        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Continue as Guest
              </Button>
            </Link>
            <p className="mt-2 text-xs text-gray-500">
              Explore our platform without creating an account. You can register later to save your preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-100 items-center justify-center">
        <div className="p-12 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Unbiased News Analysis</h2>
          <p className="text-gray-600 mb-6">
            Our platform uses advanced AI to detect bias and provide factual,
            neutral perspectives on current events.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2 text-gray-900">Multi-Perspective Analysis</h3>
              <p className="text-sm text-gray-600">
                See news events from left, center, and right viewpoints to get a complete picture.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2 text-gray-900">Factual Verification</h3>
              <p className="text-sm text-gray-600">
                AI-powered fact checking ensures information accuracy before delivery.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2 text-gray-900">Deep Research Feature</h3>
              <p className="text-sm text-gray-600">
                Submit any article or post for in-depth analysis and get comprehensive insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}