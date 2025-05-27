import { useState } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopics } from "@/lib/news-api";
import { useAuth } from "@/lib/auth-context";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isHomePage] = useRoute("/");
  const [, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/auth");
      }
    });
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-2">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clarif-AI
              </span>
            </Link>
          </div>
          
          <div className="md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search news..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i className="fas fa-search text-gray-400"></i>
              </button>
            </div>
            
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <i className="fas fa-bell mr-2"></i>
              Alerts
            </button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal text-xs text-gray-500">
                    Signed in as {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/my-topics" className="w-full">My Topics</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/saved-articles" className="w-full">Saved Articles</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/research" className="w-full">Deep Research</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <span className="text-red-600">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <i className="fas fa-user-circle mr-2"></i>
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
