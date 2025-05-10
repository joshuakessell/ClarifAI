import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Head } from "@/components/Head";

interface StaticPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function StaticPage({ title, description, children }: StaticPageProps) {
  return (
    <>
      <Head title={`${title} - FactFocus`} description={description} />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default StaticPage;