import StaticPage from "@/components/layout/StaticPage";

export default function Press() {
  const pressReleases = [
    {
      date: "May 1, 2023",
      title: "FactFocus Launches Public Beta of News Platform with Breakthrough Bias Detection Technology",
      excerpt: "New platform promises to deliver verified news with unprecedented balance across the political spectrum."
    },
    {
      date: "August 15, 2023",
      title: "FactFocus Introduces 'Conflict View' Feature for Multi-Perspective News Analysis",
      excerpt: "New feature allows readers to compare how the same stories are covered across different political viewpoints."
    },
    {
      date: "October 3, 2023",
      title: "Research Study Confirms Effectiveness of FactFocus Bias Detection Algorithm",
      excerpt: "Independent analysis finds platform reduces partisan language by 87% while maintaining factual accuracy."
    },
    {
      date: "January 10, 2024",
      title: "FactFocus Announces Mobile App and API for Third-Party Developers",
      excerpt: "Company expands access to bias-neutral reporting across devices and platforms."
    },
    {
      date: "March 22, 2024",
      title: "FactFocus Reaches 1 Million Regular Users Milestone",
      excerpt: "Growing user base demonstrates demand for verified, balanced news content."
    }
  ];

  const mediaAppearances = [
    {
      outlet: "TechCrunch",
      date: "April 2023",
      title: "FactFocus Aims to Solve Media Bias with AI-Powered News Platform",
      link: "#"
    },
    {
      outlet: "The New York Times",
      date: "June 2023",
      title: "Can Technology Fix the Media Bias Problem? This Startup Thinks So",
      link: "#"
    },
    {
      outlet: "Wired",
      date: "September 2023",
      title: "Inside FactFocus's Ambitious Plan to Neutralize News Bias",
      link: "#"
    },
    {
      outlet: "NPR",
      date: "November 2023",
      title: "Tech Startup Uses AI to Deliver Politically Neutral News",
      link: "#"
    },
    {
      outlet: "Columbia Journalism Review",
      date: "February 2024",
      title: "FactFocus: A New Model for Balanced Journalism in the Digital Age",
      link: "#"
    }
  ];

  const awards = [
    {
      name: "2023 Media Innovation Award",
      organization: "Digital Publishing Association",
      description: "Recognizing groundbreaking approaches to news delivery"
    },
    {
      name: "2023 Best News Technology",
      organization: "Tech for Democracy Foundation",
      description: "For technology that strengthens democratic discourse"
    },
    {
      name: "2024 Truth in Media Award",
      organization: "Journalism Ethics Institute",
      description: "For commitment to factual accuracy and transparency"
    }
  ];

  return (
    <StaticPage 
      title="Press" 
      description="Find press releases, media coverage, and awards for FactFocus, the leading platform for bias-neutral, factually verified news."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Press & Media</h1>
        
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl font-semibold">Press Releases</h2>
            <a href="#" className="mt-2 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-800">
              View all press releases
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div key={release.title} className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-500 mb-1">{release.date}</p>
                <h3 className="text-xl font-medium mb-2">{release.title}</h3>
                <p className="text-gray-700">{release.excerpt}</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-2">
                  Read full release
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Media Coverage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaAppearances.map((item) => (
              <a 
                key={item.title} 
                href={item.link} 
                className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full mb-2">
                  {item.outlet}
                </span>
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </a>
            ))}
          </div>
          
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Media Inquiries</h3>
            <p className="mb-4">
              For press inquiries, interview requests, or additional information about FactFocus, please contact our media relations team:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:press@factfocus.com" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Email Press Team
              </a>
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Download Press Kit
              </a>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Awards & Recognition</h2>
          
          <div className="space-y-6">
            {awards.map((award) => (
              <div key={award.name} className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">{award.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{award.organization}</p>
                  <p className="text-gray-600">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Brand Assets</h2>
          
          <p className="mb-4">
            Download official FactFocus logos, product screenshots, and executive headshots for media use.
            All assets are available in high-resolution formats suitable for both print and digital publication.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="h-24 flex items-center justify-center mb-3">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Logos</h3>
              <p className="text-sm text-gray-500 mb-3">PNG, SVG, EPS formats</p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Download</a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="h-24 flex items-center justify-center mb-3">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Fact Sheet</h3>
              <p className="text-sm text-gray-500 mb-3">PDF, DOCX formats</p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Download</a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="h-24 flex items-center justify-center mb-3">
                <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Product Media</h3>
              <p className="text-sm text-gray-500 mb-3">Screenshots, videos</p>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Download</a>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            By downloading these assets, you agree to use them in accordance with our brand guidelines and media usage policies.
          </p>
        </section>
      </div>
    </StaticPage>
  );
}