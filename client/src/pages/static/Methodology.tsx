import StaticPage from "@/components/layout/StaticPage";

export default function Methodology() {
  return (
    <StaticPage 
      title="Our Methodology" 
      description="Learn about the rigorous methodology and principles that guide FactFocus in delivering bias-neutral, factually verified news."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Our Methodology</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          FactFocus is built on a foundation of journalistic integrity, technological innovation, and a commitment 
          to providing readers with factual, context-rich news. Here's how we approach our mission:
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Factual Accuracy</h3>
                <p>We prioritize verifiable facts over opinion or speculation. All information presented on FactFocus must meet rigorous verification standards.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Bias Neutrality</h3>
                <p>We work to identify and neutralize biased language and framing to present information that isn't skewed by political or ideological perspectives.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Contextual Completeness</h3>
                <p>We ensure stories include relevant background information and multiple perspectives to provide a complete picture of events.</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Transparency</h3>
                <p>We clearly indicate our sources, methodology, and confidence levels in fact assessments to build trust with our readers.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Bias Detection & Neutralization Process</h2>
            <p>
              Our proprietary bias detection model has been trained on a diverse dataset of news articles 
              from across the political spectrum, using both machine learning and expert human coding to identify:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Loaded language and emotional terms</li>
              <li>Selective presentation of facts</li>
              <li>Uneven attribution of quotes and sources</li>
              <li>Framing biases that subtly influence interpretation</li>
              <li>Headline-content disparities</li>
            </ul>
            <p className="mt-3">
              When bias is detected, our system rewrites content to maintain factual accuracy while removing slanted language.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Fact-Checking Methodology</h2>
            <p>
              Our fact verification process follows these steps:
            </p>
            
            <ol className="list-decimal pl-6 space-y-3 mt-4">
              <li>
                <strong>Claim Identification:</strong> We extract specific factual claims from news content.
              </li>
              <li>
                <strong>Source Verification:</strong> We trace claims back to primary sources whenever possible.
              </li>
              <li>
                <strong>Expert Consultation:</strong> For specialized topics, we reference expert consensus in the field.
              </li>
              <li>
                <strong>Cross-Reference Verification:</strong> We check if multiple independent sources confirm the same information.
              </li>
              <li>
                <strong>Context Analysis:</strong> We evaluate if the claim is presented in its proper context.
              </li>
              <li>
                <strong>Confidence Rating:</strong> Each verified fact is assigned a confidence rating based on the strength of supporting evidence.
              </li>
            </ol>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Human Review</h2>
            <p>
              While we leverage advanced AI technology, we maintain human oversight throughout our process. 
              Our team of journalists and experts regularly:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Review AI outputs for accuracy</li>
              <li>Refine our algorithms based on performance</li>
              <li>Provide editorial guidance on complex topics</li>
              <li>Ensure ethical considerations are addressed</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Continuous Improvement</h2>
            <p>
              We're constantly refining our methodology through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Reader feedback and independent audits</li>
              <li>Regular review of our algorithms' performance</li>
              <li>Collaboration with academic researchers</li>
              <li>Adaptation to evolving media landscapes</li>
            </ul>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}