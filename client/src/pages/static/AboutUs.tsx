import StaticPage from "@/components/layout/StaticPage";

export default function AboutUs() {
  return (
    <StaticPage 
      title="About Us" 
      description="Learn about FactFocus, our mission to provide unbiased news, and our commitment to factual, balanced reporting."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">About FactFocus</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          FactFocus was founded with a singular mission: to provide news consumers with factually accurate, 
          bias-neutral information in an increasingly polarized media landscape.
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p>
              FactFocus was born out of a growing concern about the state of modern news media. Our founders—a 
              diverse group of journalists, technologists, and media researchers—were troubled by increasing polarization 
              in news coverage and the challenge this posed for citizens seeking reliable information.
            </p>
            <p className="mt-3">
              Launched in 2023, we set out to create a new kind of news platform that would leverage the power of AI 
              and human expertise to detect and neutralize bias, verify factual claims, and present multiple perspectives 
              on complex issues.
            </p>
            <p className="mt-3">
              Today, FactFocus serves readers who want to stay informed without being pulled into partisan filter 
              bubbles or having to cross-reference multiple sources to get the complete picture.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
              <p className="text-xl italic font-medium text-blue-800">
                "To empower an informed citizenry by providing accurate, balanced, and contextual news coverage 
                free from political bias and sensationalism."
              </p>
            </div>
            <p>
              We believe that democracy functions best when citizens have access to reliable information. Our work 
              is guided by a commitment to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Factual accuracy above all else</li>
              <li>Political neutrality in our coverage</li>
              <li>Transparency in our methods and sources</li>
              <li>Contextual completeness in all reporting</li>
              <li>Accessibility for readers across the political spectrum</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p>
              FactFocus leverages proprietary AI technology to analyze news content, detect bias, verify facts, 
              and present information in a balanced way. Our system combines:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Advanced natural language processing for bias detection</li>
              <li>Automated fact-checking against verified databases</li>
              <li>Multi-perspective content analysis</li>
              <li>Historical context engines for timeline creation</li>
              <li>Source credibility assessment tools</li>
            </ul>
            <p className="mt-3">
              While technology is central to our approach, we maintain human oversight throughout our process. 
              Our team of journalists and editors reviews AI outputs, handles complex topics requiring nuanced 
              judgment, and ensures our coverage meets the highest standards of journalistic integrity.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium mb-3 text-blue-700">Truth</h3>
                <p>We are committed to factual accuracy and reporting reality as it is, not as we wish it to be.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium mb-3 text-blue-700">Balance</h3>
                <p>We present multiple perspectives on complex issues, respecting the legitimacy of different viewpoints.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium mb-3 text-blue-700">Transparency</h3>
                <p>We are open about our methods, funding sources, and the limitations of our knowledge.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium mb-3 text-blue-700">Independence</h3>
                <p>We maintain editorial independence from political, corporate, and special interests.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium mb-3 text-blue-700">Innovation</h3>
                <p>We continuously improve our technology and methods to better serve the needs of news consumers.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-medium mb-3 text-blue-700">Accessibility</h3>
                <p>We make reliable information available and understandable to people from all backgrounds.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Funding Model</h2>
            <p>
              FactFocus operates as a public benefit corporation, balancing the need for financial sustainability 
              with our mission to serve the public interest. Our funding comes from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Reader subscriptions that provide ad-free access to our content</li>
              <li>Limited, clearly labeled advertising that adheres to strict ethical guidelines</li>
              <li>Licensing of our bias detection and fact-checking technology</li>
              <li>Foundation grants for specific public interest journalism projects</li>
            </ul>
            <p className="mt-3">
              We maintain strict firewalls between our revenue operations and our editorial decisions to ensure 
              our coverage remains independent and focused on our core mission.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
            <p>
              Since our launch, FactFocus has:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provided balanced coverage of major political events to millions of readers</li>
              <li>Developed industry-leading standards for bias detection and neutralization</li>
              <li>Created comprehensive timelines for complex ongoing stories</li>
              <li>Built bridges between news consumers across the political spectrum</li>
              <li>Advanced public understanding of media literacy and bias awareness</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p>
              We invite you to be part of the FactFocus community:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Subscribe to receive our daily digest of verified, balanced news</li>
              <li>Provide feedback to help us improve our coverage and technology</li>
              <li>Share our content with others seeking reliable information</li>
              <li>Explore career opportunities with our growing team</li>
            </ul>
            <p className="mt-3">
              Together, we can build a more informed, less polarized news ecosystem.
            </p>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}