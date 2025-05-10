import StaticPage from "@/components/layout/StaticPage";

export default function Team() {
  const leadership = [
    {
      name: "Alex Rivera",
      title: "CEO & Co-Founder",
      bio: "Former technology journalist with 15 years of experience covering the intersection of media and tech. Alex led digital transformation initiatives at major news organizations before co-founding FactFocus.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    },
    {
      name: "Dr. Sarah Johnson",
      title: "Chief Technology Officer",
      bio: "Machine learning expert with a Ph.D. in Computational Linguistics. Sarah previously developed natural language processing systems for misinformation detection at a leading research university.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    },
    {
      name: "Robert Chen",
      title: "Editor-in-Chief",
      bio: "Award-winning journalist with over 20 years of experience at publications across the political spectrum. Robert is committed to fact-based reporting and has covered major global events on five continents.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    },
    {
      name: "Sophia Garcia",
      title: "Chief Product Officer",
      bio: "Digital product strategist who previously led user experience for major media platforms. Sophia brings expertise in creating intuitive interfaces that help users navigate complex information.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    }
  ];

  const editorial = [
    {
      name: "Michael Wong",
      title: "Senior Editor, Politics",
      bio: "Political reporter with experience covering campaigns and governance at national and local levels. Michael focuses on translating complex policy issues into accessible reporting."
    },
    {
      name: "Emma Taylor",
      title: "Senior Editor, Technology",
      bio: "Tech analyst with a background in both industry and journalism. Emma specializes in coverage of AI ethics, digital privacy, and the societal impact of emerging technologies."
    },
    {
      name: "James Wilson",
      title: "Senior Editor, Business & Economy",
      bio: "Business journalist with expertise in market analysis and economic policy. James previously served as an economics correspondent for international news agencies."
    },
    {
      name: "Aisha Patel",
      title: "Senior Editor, Climate & Science",
      bio: "Science journalist with a Master's in Environmental Science. Aisha has covered climate policy, research advances, and the intersection of science and public policy."
    }
  ];

  const technology = [
    {
      name: "David Kim",
      title: "Lead ML Engineer",
      bio: "Natural language processing specialist who designed our core bias detection algorithms. David combines technical expertise with a deep understanding of linguistic nuance."
    },
    {
      name: "Maria Rodriguez",
      title: "Head of Data Science",
      bio: "Data scientist with expertise in content analysis and statistics. Maria leads our fact-checking automation and source verification systems."
    },
    {
      name: "Thomas Lee",
      title: "VP of Engineering",
      bio: "Software architect with experience scaling media platforms. Thomas oversees our technical infrastructure and ensures reliable delivery of news content."
    }
  ];

  return (
    <StaticPage 
      title="Our Team" 
      description="Meet the journalists, technologists, and media experts behind FactFocus, working to deliver unbiased, factual news."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Our Team</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          FactFocus brings together experts from journalism, technology, and media research. Our diverse team 
          shares a commitment to factual reporting, political neutrality, and innovative approaches to news delivery.
        </p>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((person) => (
              <div key={person.name} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{person.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{person.title}</p>
                  <p className="text-gray-600">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Editorial Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {editorial.map((person) => (
              <div key={person.name} className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-1">{person.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{person.title}</p>
                <p className="text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
          
          <p className="mt-6 text-gray-700">
            Our editorial team also includes specialized reporters, fact-checkers, and content reviewers 
            who help ensure the accuracy and balance of our coverage across all topic areas.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Technology Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technology.map((person) => (
              <div key={person.name} className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold mb-1">{person.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{person.title}</p>
                <p className="text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
          
          <p className="mt-6 text-gray-700">
            Our technology team also includes full-stack developers, UX designers, QA engineers, and DevOps specialists 
            who build and maintain our platform's infrastructure.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Advisory Board</h2>
          
          <p className="text-gray-700 mb-4">
            FactFocus is guided by an advisory board of experts in journalism, media ethics, technology policy, 
            and political science. These advisors help ensure our platform maintains the highest standards of 
            integrity and meets the complex challenges of today's information ecosystem.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Diversity Commitment</h3>
            <p className="text-gray-700">
              FactFocus is committed to building a team that reflects diverse backgrounds, experiences, and 
              viewpoints. We believe that political neutrality in our coverage is only possible when our team 
              includes people from across the political spectrum and from varied cultural, geographic, and 
              socioeconomic backgrounds.
            </p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Join Our Team</h2>
          
          <p className="text-gray-700 mb-4">
            We're always looking for talented individuals who share our commitment to accurate, balanced reporting. 
            If you're passionate about transforming the news media landscape and have expertise in journalism, 
            technology, or media research, we'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              View Open Positions
            </a>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Contact Our Team
            </a>
          </div>
        </section>
      </div>
    </StaticPage>
  );
}