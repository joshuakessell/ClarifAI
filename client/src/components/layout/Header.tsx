import { useState } from "react";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTopics } from "@/lib/news-api";

export function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isHomePage] = useRoute("/");

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <i className="fas fa-newspaper text-primary text-2xl mr-2"></i>
              <span className="text-xl font-bold text-neutral-dark">FactFocus</span>
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
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <i className="fas fa-user-circle mr-2"></i>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
