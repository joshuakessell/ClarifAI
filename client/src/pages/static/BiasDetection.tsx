import StaticPage from "@/components/layout/StaticPage";

export default function BiasDetection() {
  return (
    <StaticPage 
      title="Bias Detection" 
      description="Discover how FactFocus uses AI and human expertise to detect and neutralize bias in news reporting."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Bias Detection Technology</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          FactFocus employs cutting-edge AI technology combined with human expertise to identify and neutralize 
          bias in news reporting, ensuring you receive factual information without political slant.
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Understanding Media Bias</h2>
            <p>
              Media bias can manifest in many forms, often subtle and difficult to detect. Our system is designed 
              to identify multiple types of bias:
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-blue-800">Selection Bias</h3>
                <p>When outlets choose which stories to cover or ignore based on ideological preferences.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-blue-800">Omission Bias</h3>
                <p>When important details that don't support a particular narrative are left out of reporting.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-blue-800">Framing Bias</h3>
                <p>When information is presented within a context that suggests a particular interpretation.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-blue-800">Word Choice Bias</h3>
                <p>When subtle language choices create positive or negative impressions of people or positions.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-blue-800">Source Bias</h3>
                <p>When reporting relies predominantly on sources from one ideological perspective.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-blue-800">Placement Bias</h3>
                <p>When story positioning or headline emphasis reveals ideological preferences.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Bias Detection Technology</h2>
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-100 to-blue-100 p-8 mb-8">
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 text-indigo-900">AI-Powered Analysis</h3>
                <p className="text-indigo-900">
                  Our proprietary natural language processing system has been trained on millions of news articles 
                  with known political leanings. It can detect patterns of bias that might be imperceptible to casual readers.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4338CA" strokeWidth="2"/>
                  <path d="M12 17V17.01M12 13.9C12 13.9 14 13.2643 14 12C14 10.7357 13.1046 10 12 10C10.8954 10 10 10.7357 10 12M12 7V7.01" stroke="#4338CA" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            <p>
              Our system employs multiple techniques to detect bias:
            </p>
            
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li>
                <strong>Semantic Analysis:</strong> We examine the connotations and implications of specific words and phrases.
              </li>
              <li>
                <strong>Comparative Content Analysis:</strong> We compare how the same events are reported across different sources.
              </li>
              <li>
                <strong>Sentiment Detection:</strong> We measure emotional language and positive/negative framing.
              </li>
              <li>
                <strong>Source Diversity Analysis:</strong> We evaluate the range of perspectives included in reporting.
              </li>
              <li>
                <strong>Factual Density Measurement:</strong> We assess the ratio of verifiable facts to opinion.
              </li>
              <li>
                <strong>Context Analysis:</strong> We detect when important contextual information is missing.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">The Human Element</h2>
            <p>
              While AI is powerful, we believe human judgment remains essential. Our team of analysts:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Comes from diverse political backgrounds to ensure balanced perspectives</li>
              <li>Regularly reviews and calibrates our AI models</li>
              <li>Handles complex cases where context requires nuanced understanding</li>
              <li>Provides oversight to prevent algorithmic bias</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Bias Neutralization Process</h2>
            <p>
              When bias is detected, our system doesn't simply remove the content. Instead, we employ a sophisticated 
              neutralization process that:
            </p>
            <ol className="list-decimal pl-6 space-y-3 mt-4">
              <li>Identifies specific instances of biased language or framing</li>
              <li>Preserves the core factual information</li>
              <li>Replaces loaded terms with neutral alternatives</li>
              <li>Adds missing context or counterbalancing perspectives</li>
              <li>Restructures framing to present information more objectively</li>
              <li>Clearly labels opinion content versus factual reporting</li>
            </ol>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Transparency in Bias Assessment</h2>
            <p>
              We believe in complete transparency about our bias detection process:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>All articles include a bias assessment score</li>
              <li>Users can view the original content alongside our neutralized version</li>
              <li>We identify specific instances where we've modified content to reduce bias</li>
              <li>We regularly publish reports on our system's accuracy and performance</li>
              <li>We welcome feedback and independent validation of our methods</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Continuous Improvement</h2>
            <p>
              Media bias is constantly evolving, and so is our technology. We continuously improve our bias detection through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Regular retraining with new data</li>
              <li>Collaboration with academic researchers in media studies</li>
              <li>User feedback mechanisms</li>
              <li>Third-party audits of our methodology</li>
              <li>Adaptation to emerging forms of media bias</li>
            </ul>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}