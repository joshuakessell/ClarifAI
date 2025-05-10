import StaticPage from "@/components/layout/StaticPage";

export default function SourceVerification() {
  return (
    <StaticPage 
      title="Source Verification" 
      description="Learn how FactFocus evaluates and verifies news sources to ensure reliable, trustworthy information."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Source Verification</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          At FactFocus, we believe that trustworthy news begins with reliable sources. Our source verification system 
          helps ensure that the information we present comes from credible origins.
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Source Evaluation Process</h2>
            <p>
              Every news source in our system undergoes a comprehensive evaluation process before we include their content. 
              We assess sources based on:
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-3">Accuracy Track Record</h3>
                <p className="text-gray-700">We review historical reporting for factual accuracy and correction practices.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-3">Transparency</h3>
                <p className="text-gray-700">We assess if the source clearly identifies ownership, funding, and potential conflicts of interest.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-3">Journalistic Standards</h3>
                <p className="text-gray-700">We evaluate adherence to established journalistic practices like fact-checking and source attribution.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-3">Expertise</h3>
                <p className="text-gray-700">We consider the qualifications of journalists and subject matter experts involved.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-3">Original Reporting</h3>
                <p className="text-gray-700">We prioritize sources that conduct original journalism rather than simply aggregating others' work.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-xl font-medium mb-3">Editorial Independence</h3>
                <p className="text-gray-700">We assess freedom from undue influence by political, corporate, or special interests.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Source Rating System</h2>
            <p>
              Based on our evaluation, we assign each source a reliability rating:
            </p>
            
            <div className="mt-6 space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h3 className="text-lg font-medium text-green-800">Highly Reliable</h3>
                <p className="text-green-700">Sources with strong fact-checking, consistent accuracy, transparency, and independence.</p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="text-lg font-medium text-blue-800">Generally Reliable</h3>
                <p className="text-blue-700">Sources with good overall accuracy but may occasionally have minor issues.</p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="text-lg font-medium text-yellow-800">Mixed Reliability</h3>
                <p className="text-yellow-700">Sources that may be reliable on some topics but show bias or accuracy issues in others.</p>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <h3 className="text-lg font-medium text-orange-800">Low Reliability</h3>
                <p className="text-orange-700">Sources with frequent factual errors, minimal fact-checking, or strong bias that affects accuracy.</p>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="text-lg font-medium text-red-800">Not Verified</h3>
                <p className="text-red-700">Sources we haven't fully evaluated or that don't meet our minimum standards.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Primary Source Prioritization</h2>
            <p>
              Whenever possible, we prioritize primary sources of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Official government documents and statements</li>
              <li>Court records and legal filings</li>
              <li>Academic and scientific research papers</li>
              <li>Direct interviews and firsthand accounts</li>
              <li>Original data and statistics from reputable organizations</li>
              <li>Direct video or audio recordings of events</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cross-Verification Requirements</h2>
            <p>
              For significant claims, particularly on controversial topics, we require verification from multiple independent sources.
              This helps prevent the spread of misinformation based on a single, potentially flawed report.
            </p>
            <p className="mt-3">
              Our system tracks claim origins and ensures that apparent "multiple sources" aren't just repeating the same original report.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Transparency in Our Reporting</h2>
            <p>
              For each article on FactFocus, you can view:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>The original source(s) of the information</li>
              <li>Our reliability rating for each source</li>
              <li>Links to primary documents when available</li>
              <li>Notes on verification methods used</li>
              <li>Confidence levels for key facts</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Continuous Monitoring</h2>
            <p>
              Our source evaluation isn't a one-time process. We continuously monitor sources for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Changes in accuracy over time</li>
              <li>Shifts in editorial standards</li>
              <li>Ownership or funding changes that might affect independence</li>
              <li>Topic-specific variations in reliability</li>
            </ul>
            <p className="mt-3">
              This ensures our source ratings remain current and accurate.
            </p>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}