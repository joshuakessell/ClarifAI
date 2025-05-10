import StaticPage from "@/components/layout/StaticPage";

export default function PrivacyPolicy() {
  return (
    <StaticPage 
      title="Privacy Policy" 
      description="Learn how FactFocus collects, uses, and protects your personal information and data privacy rights."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Privacy Policy</h1>
        
        <div className="text-sm text-gray-500 mb-8">
          <p>Last Updated: May 10, 2023</p>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          At FactFocus, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
          disclose, and safeguard your information when you use our website and services.
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium mb-3">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide when using our service, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (preferences, interests)</li>
              <li>Communications with us (support inquiries, feedback)</li>
              <li>Payment information (when subscribing to premium services)</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Usage Information</h3>
            <p>
              We automatically collect certain information about your device and how you interact with our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and geolocation data</li>
              <li>Browser cookies and similar technologies</li>
              <li>Usage patterns (articles read, time spent, features used)</li>
              <li>Referring websites and search terms</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect for the following purposes:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Providing Our Services</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Delivering personalized news content</li>
                  <li>Managing your account and preferences</li>
                  <li>Processing payments and subscriptions</li>
                  <li>Providing customer support</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Improving Our Platform</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Analyzing usage patterns and trends</li>
                  <li>Debugging and fixing issues</li>
                  <li>Developing new features</li>
                  <li>Conducting research and analysis</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Communication</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Sending account-related notifications</li>
                  <li>Providing news alerts and updates</li>
                  <li>Responding to your inquiries</li>
                  <li>Marketing our services (with consent)</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Security & Compliance</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Protecting against unauthorized access</li>
                  <li>Preventing fraud and abuse</li>
                  <li>Complying with legal obligations</li>
                  <li>Enforcing our terms of service</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Share Your Information</h2>
            <p>
              We do not sell your personal information to third parties. We may share information in the following circumstances:
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="text-lg font-medium mb-2">Service Providers</h3>
                <p className="text-gray-700">
                  We may share information with trusted third-party vendors who help us operate our platform, 
                  such as cloud hosting providers, payment processors, and analytics services. These providers 
                  are contractually obligated to protect your information.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="text-lg font-medium mb-2">Legal Requirements</h3>
                <p className="text-gray-700">
                  We may disclose information when required by law, such as in response to a subpoena, court order, 
                  or other legal process, or to protect our rights, privacy, safety, or property.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="text-lg font-medium mb-2">Business Transfers</h3>
                <p className="text-gray-700">
                  If FactFocus is involved in a merger, acquisition, or sale of assets, your information may be 
                  transferred as part of that transaction. We will notify you of any change in ownership or use of your information.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h3 className="text-lg font-medium mb-2">With Your Consent</h3>
                <p className="text-gray-700">
                  We may share your information with third parties when you have given us explicit consent to do so.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li>
                <strong>Access:</strong> You can request a copy of the personal information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.
              </li>
              <li>
                <strong>Restriction:</strong> You can request that we limit how we use your personal information.
              </li>
              <li>
                <strong>Portability:</strong> You can request a copy of your information in a structured, commonly used, machine-readable format.
              </li>
              <li>
                <strong>Objection:</strong> You can object to our processing of your information in certain circumstances.
              </li>
            </ul>
            
            <p className="mt-4">
              To exercise these rights, please contact us at <a href="mailto:privacy@factfocus.com" className="text-blue-600">privacy@factfocus.com</a>.
              We will respond to your request within 30 days.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee training on data protection practices</li>
              <li>Secure data backup and recovery procedures</li>
            </ul>
            
            <p className="mt-4">
              While we strive to protect your information, no method of transmission over the Internet or electronic 
              storage is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Remember your login status and preferences</li>
              <li>Understand how you interact with our platform</li>
              <li>Analyze the performance of our website</li>
              <li>Personalize content based on your interests</li>
            </ul>
            
            <p className="mt-4">
              You can control cookies through your browser settings. Most browsers allow you to block or delete cookies, 
              but doing so may impact your ability to use certain features of our platform. For more information, 
              please see our <a href="#" className="text-blue-600">Cookie Policy</a>.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal 
              information from children. If you are a parent or guardian and believe that your child has provided us 
              with personal information, please contact us at <a href="mailto:privacy@factfocus.com" className="text-blue-600">privacy@factfocus.com</a> and 
              we will take steps to delete such information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
            <p>
              We may transfer, store, and process your information in countries other than your own. Our servers are primarily 
              located in the United States. If you are accessing our services from outside the United States, please be aware 
              that your information may be transferred to, stored, and processed by us and our service providers in countries 
              where data protection laws may differ from those in your country.
            </p>
            <p className="mt-3">
              If you are in the European Economic Area (EEA), we ensure that any such transfers comply with applicable data 
              protection laws, including through the use of standard contractual clauses or other appropriate safeguards.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes by posting the updated policy on our website and updating the 
              "Last Updated" date. Your continued use of our services after such modifications constitutes your acknowledgment 
              of the modified Privacy Policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <p className="mb-1"><strong>Email:</strong> <a href="mailto:privacy@factfocus.com" className="text-blue-600">privacy@factfocus.com</a></p>
              <p className="mb-1"><strong>Address:</strong> FactFocus, Inc., 123 Media Avenue, Suite 400, San Francisco, CA 94103</p>
              <p><strong>Data Protection Officer:</strong> <a href="mailto:dpo@factfocus.com" className="text-blue-600">dpo@factfocus.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}