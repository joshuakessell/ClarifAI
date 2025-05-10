import StaticPage from "@/components/layout/StaticPage";

export default function GDPRCompliance() {
  return (
    <StaticPage 
      title="GDPR Compliance" 
      description="Learn about FactFocus's compliance with the General Data Protection Regulation (GDPR) and your rights as an EU user."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">GDPR Compliance</h1>
        
        <div className="text-sm text-gray-500 mb-8">
          <p>Last Updated: May 10, 2023</p>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          This page outlines how FactFocus complies with the General Data Protection Regulation (GDPR) 
          for users in the European Union (EU) and European Economic Area (EEA). Our approach to data 
          protection reflects our commitment to safeguarding your personal information while providing 
          our services.
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Role Under the GDPR</h2>
            <p>
              Under the GDPR, FactFocus acts as a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Data Controller</strong> when we determine the purposes and means of processing personal 
                data related to your use of our platform.
              </li>
              <li>
                <strong>Data Processor</strong> in certain limited circumstances when we process data on behalf of 
                business partners or other third parties.
              </li>
            </ul>
            <p className="mt-3">
              When acting as a Data Controller, we are responsible for implementing appropriate technical and 
              organizational measures to ensure and demonstrate that our processing activities comply with the 
              requirements of the GDPR.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Lawful Basis for Processing</h2>
            <p>
              Under the GDPR, we must have a valid lawful basis for processing personal data. Depending on the 
              specific processing activity, we rely on one or more of the following lawful bases:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Consent</h3>
                <p>
                  When you have given clear, specific, informed, and unambiguous consent for us to process your 
                  personal data for a specific purpose.
                </p>
                <p className="mt-2 text-sm text-blue-800">
                  <strong>Example:</strong> When you opt in to receive our newsletter or marketing communications.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Contract</h3>
                <p>
                  When processing is necessary for the performance of a contract to which you are a party, or to 
                  take steps at your request before entering into a contract.
                </p>
                <p className="mt-2 text-sm text-blue-800">
                  <strong>Example:</strong> Processing your payment information when you purchase a subscription.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Legal Obligation</h3>
                <p>
                  When processing is necessary for compliance with a legal obligation to which we are subject.
                </p>
                <p className="mt-2 text-sm text-blue-800">
                  <strong>Example:</strong> Retaining certain records for tax purposes or responding to a court order.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Legitimate Interests</h3>
                <p>
                  When processing is necessary for our legitimate interests or the legitimate interests of a third party, 
                  except where such interests are overridden by your interests, rights, or freedoms.
                </p>
                <p className="mt-2 text-sm text-blue-800">
                  <strong>Example:</strong> Analyzing user behavior to improve our services or preventing fraud.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights Under the GDPR</h2>
            <p>
              If you are an EU/EEA resident, the GDPR provides you with certain rights regarding your personal data:
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium mb-2">Right to Access</h3>
                <p className="text-gray-700">
                  You have the right to request a copy of the personal data we hold about you and information about 
                  how we use it. We will provide this information in a structured, commonly used, and machine-readable format.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium mb-2">Right to Rectification</h3>
                <p className="text-gray-700">
                  You have the right to request that we correct any inaccurate personal data we hold about you, or 
                  complete any incomplete personal data.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium mb-2">Right to Erasure ('Right to be Forgotten')</h3>
                <p className="text-gray-700">
                  You have the right to request that we delete your personal data in certain circumstances, such as when 
                  the data is no longer necessary for the purposes for which it was collected.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium mb-2">Right to Restriction of Processing</h3>
                <p className="text-gray-700">
                  You have the right to request that we temporarily or permanently stop processing your personal data in 
                  certain circumstances, such as when you contest the accuracy of the data.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium mb-2">Right to Data Portability</h3>
                <p className="text-gray-700">
                  You have the right to request that we transfer your personal data to another service provider in a 
                  structured, commonly used, and machine-readable format.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium mb-2">Right to Object</h3>
                <p className="text-gray-700">
                  You have the right to object to our processing of your personal data in certain circumstances, including 
                  when we process your data for direct marketing purposes or when we process your data based on our 
                  legitimate interests.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium mb-2">Rights Related to Automated Decision Making</h3>
                <p className="text-gray-700">
                  You have the right not to be subject to a decision based solely on automated processing, including 
                  profiling, which produces legal effects concerning you or similarly significantly affects you.
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">How to Exercise Your Rights</h3>
              <p>
                To exercise any of these rights, please contact our Data Protection Officer at <a href="mailto:dpo@factfocus.com" className="text-blue-600">dpo@factfocus.com</a> or 
                submit a request through our <a href="#" className="text-blue-600">Data Subject Rights Portal</a>.
              </p>
              <p className="mt-3">
                We will respond to your request within one month. This period may be extended by up to two additional 
                months where necessary, taking into account the complexity and number of requests.
              </p>
              <p className="mt-3">
                We may ask for additional information to verify your identity before fulfilling your request to protect 
                your privacy and security.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Protection Measures</h2>
            <p>
              We have implemented appropriate technical and organizational measures to ensure a level of security 
              appropriate to the risk, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Encryption of personal data during transmission and at rest</li>
              <li>Regular testing and evaluation of the effectiveness of security measures</li>
              <li>Ability to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems</li>
              <li>Process for regularly testing, assessing, and evaluating the effectiveness of security measures</li>
              <li>Measures to restore access to personal data in a timely manner in the event of an incident</li>
              <li>Staff training and awareness programs on data protection</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Protection Impact Assessments</h2>
            <p>
              We conduct Data Protection Impact Assessments (DPIAs) for processing operations that are likely to 
              result in a high risk to the rights and freedoms of individuals. These assessments help us identify 
              and minimize data protection risks.
            </p>
            <p className="mt-3">
              Our DPIA process includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>A systematic description of the processing operations</li>
              <li>Assessment of the necessity and proportionality of the processing</li>
              <li>Assessment of risks to the rights and freedoms of data subjects</li>
              <li>Measures to address the risks and demonstrate compliance</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
            <p>
              FactFocus is based in the United States, but we serve users globally, including in the EU/EEA. When we 
              transfer personal data outside the EU/EEA, we ensure that appropriate safeguards are in place to protect 
              your data, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Binding Corporate Rules for transfers within our corporate group</li>
              <li>Transfers to countries with an adequacy decision from the European Commission</li>
              <li>Transfers with your explicit consent (where appropriate)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Breach Notification</h2>
            <p>
              In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, 
              we will notify the relevant supervisory authority without undue delay and, when possible, within 72 hours 
              of becoming aware of the breach.
            </p>
            <p className="mt-3">
              If the breach is likely to result in a high risk to your rights and freedoms, we will also notify you 
              directly when possible. Our notification will include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>A description of the nature of the breach</li>
              <li>The name and contact details of our Data Protection Officer</li>
              <li>A description of the likely consequences of the breach</li>
              <li>A description of the measures taken or proposed to address the breach</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Data Protection Officer</h2>
            <p>
              We have appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection 
              strategy and ensuring compliance with data protection laws. You can contact our DPO with any questions 
              or concerns about our data protection practices:
            </p>
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:dpo@factfocus.com" className="text-blue-600">dpo@factfocus.com</a></p>
              <p className="mt-2"><strong>Mail:</strong> Data Protection Officer, FactFocus, Inc., 123 Media Avenue, Suite 400, San Francisco, CA 94103</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
            <p>
              If you believe that our processing of your personal data infringes data protection laws, you have the 
              right to lodge a complaint with a supervisory authority. The supervisory authority will be in the EU 
              member state of your habitual residence, place of work, or the place of the alleged infringement.
            </p>
            <p className="mt-3">
              We would, however, appreciate the opportunity to address your concerns before you approach a supervisory 
              authority, so please contact us in the first instance.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This GDPR Compliance Statement</h2>
            <p>
              We may update this GDPR Compliance Statement from time to time to reflect changes in our practices or 
              legal requirements. We will notify you of any significant changes by posting a prominent notice on our 
              website or by sending you an email notification.
            </p>
            <p className="mt-3">
              We encourage you to periodically review this statement to stay informed about our data protection practices.
            </p>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}