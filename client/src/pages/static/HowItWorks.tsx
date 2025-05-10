import StaticPage from "@/components/layout/StaticPage";

export default function HowItWorks() {
  return (
    <StaticPage 
      title="How It Works" 
      description="Learn how FactFocus verifies news stories and ensures balanced reporting across the political spectrum."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">How FactFocus Works</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          At FactFocus, we've developed a sophisticated system to deliver verified, bias-neutral news. Here's how our platform works:
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">News Collection</h2>
            <p>
              Our system continuously monitors thousands of news sources across the political spectrum. 
              We collect articles from mainstream publications, independent journalism outlets, and verified sources 
              to ensure comprehensive coverage of current events.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">AI Analysis</h2>
            <p>
              Each article is processed through our advanced AI system that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Extracts key facts and claims</li>
              <li>Identifies potential biased language</li>
              <li>Cross-references information with verified data sources</li>
              <li>Measures sentiment and perspective</li>
              <li>Evaluates sources for credibility</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Bias Neutralization</h2>
            <p>
              Our proprietary bias detection algorithms identify slanted language, one-sided reporting, 
              and emotionally charged content. The system then works to neutralize bias while preserving 
              the core facts and context of the story.
            </p>
            <p className="mt-3">
              We don't simply average opposing viewpoints — we carefully extract factual information 
              and present it in a balanced way that respects the complexity of the issue.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Fact Verification</h2>
            <p>
              All articles undergo rigorous fact-checking against:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Primary sources and official records</li>
              <li>Expert consensus in relevant fields</li>
              <li>Multiple independent reports</li>
              <li>Statistical data and peer-reviewed research</li>
            </ul>
            <p className="mt-3">
              When facts are disputed or uncertain, we clearly label this information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Multi-Perspective Presentation</h2>
            <p>
              For complex and divisive issues, we offer our unique Conflict View feature, 
              which shows how the same story is covered across the political spectrum, 
              helping readers understand different perspectives on controversial topics.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contextual Timelines</h2>
            <p>
              To provide deeper understanding, we create chronological timelines for ongoing stories, 
              showing how events have unfolded over time and providing crucial background information 
              that may be missing from current coverage.
            </p>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}