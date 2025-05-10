import StaticPage from "@/components/layout/StaticPage";

export default function TermsOfService() {
  return (
    <StaticPage 
      title="Terms of Service" 
      description="Read the terms and conditions governing your use of FactFocus news platform services."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Terms of Service</h1>
        
        <div className="text-sm text-gray-500 mb-8">
          <p>Last Updated: May 10, 2023</p>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          These Terms of Service ("Terms") govern your access to and use of the FactFocus website, 
          mobile applications, and services ("Services"). Please read these Terms carefully before 
          using our Services.
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. 
              If you do not agree to these Terms, you may not access or use the Services.
            </p>
            <p className="mt-3">
              We may modify these Terms at any time. Your continued use of the Services after any such changes 
              constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p>
              You must be at least 16 years old to use our Services. By using the Services, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>You are at least 16 years old</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You will use the Services in accordance with these Terms</li>
              <li>If you are using the Services on behalf of an organization, you have authority to bind that organization to these Terms</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p>
              Some features of our Services require you to create an account. When you register, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
            <p className="mt-3">
              We reserve the right to disable any user account if we believe you have violated these Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Service Description</h2>
            <p>
              FactFocus provides a platform for accessing news content that has been analyzed for factual 
              accuracy and political bias. Our Services include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>News articles and summaries from various sources</li>
              <li>Bias analysis and neutralization of news content</li>
              <li>Multi-perspective views on controversial topics</li>
              <li>Contextual timelines for ongoing stories</li>
              <li>Personalized news feeds based on user preferences</li>
            </ul>
            <p className="mt-3">
              We strive to provide accurate and balanced information, but we do not guarantee the accuracy, 
              completeness, or usefulness of any content.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Subscription and Payments</h2>
            <p>
              We offer both free and paid subscription options for our Services:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <h3 className="text-xl font-medium mb-3">Free Plan</h3>
              <p className="mb-2">
                The free plan provides limited access to our Services, including basic news content and features.
              </p>
              <h3 className="text-xl font-medium mt-5 mb-3">Premium Subscription</h3>
              <p>
                Premium subscriptions provide full access to all features, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Ad-free experience</li>
                <li>Advanced bias analysis tools</li>
                <li>Unlimited article access</li>
                <li>Historical news archives</li>
                <li>Exclusive research reports</li>
              </ul>
            </div>
            
            <p className="mt-4">
              For paid subscriptions:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Subscription fees will be charged to your designated payment method</li>
              <li>Subscriptions automatically renew unless canceled before the renewal date</li>
              <li>You can cancel your subscription at any time through your account settings</li>
              <li>No refunds will be provided for partial subscription periods</li>
            </ul>
            <p className="mt-3">
              We reserve the right to change our subscription fees upon reasonable notice. Any changes will apply to billing periods after the notice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Acceptable Use</h2>
            <p>
              You agree not to use the Services to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Attempt to gain unauthorized access to the Services</li>
              <li>Collect user information without consent</li>
              <li>Transmit viruses or other harmful code</li>
              <li>Automate access to the Services without our permission</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p>
              The Services and all content, features, and functionality thereof, including but not limited to 
              text, graphics, logos, and software, are owned by FactFocus or its licensors and are protected 
              by United States and international intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly 
              perform, republish, download, store, or transmit any of the material on our Services, except as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Your computer may temporarily store copies in RAM incidental to your accessing and viewing content</li>
              <li>You may store files that are automatically cached by your browser for display enhancement</li>
              <li>You may print or download one copy of a reasonable number of pages for personal, non-commercial use</li>
              <li>If we provide social media features, you may take actions these features provide</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. User Content</h2>
            <p>
              Our Services may allow you to post, submit, or share content ("User Content"). By providing User Content, you grant us a 
              worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your 
              User Content in any existing or future media.
            </p>
            <p className="mt-3">
              You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>You own or have the necessary rights to your User Content</li>
              <li>Your User Content does not violate the privacy, publicity, copyright, or other rights of any person</li>
              <li>Your User Content does not contain any defamatory, obscene, offensive, or illegal material</li>
            </ul>
            <p className="mt-3">
              We have the right to remove any User Content that violates these Terms or that we find objectionable.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links and Content</h2>
            <p>
              Our Services may contain links to third-party websites, resources, or services that are not owned or controlled by FactFocus. 
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party 
              websites or services.
            </p>
            <p className="mt-3">
              You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any such 
              third-party websites, resources, or services.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-800">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="mt-3 text-gray-800">
                WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT 
                THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-800">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FACTFOCUS, ITS AFFILIATES, DIRECTORS, 
                EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR 
                OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICES.
              </p>
              <p className="mt-3 text-gray-800">
                IN NO EVENT WILL OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES EXCEED THE GREATER OF 
                $100 USD OR THE AMOUNT YOU PAID US FOR THE SERVICES IN THE 12 MONTHS IMMEDIATELY PRECEDING THE EVENT 
                GIVING RISE TO THE LIABILITY.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless FactFocus, its affiliates, licensors, and service providers, 
              and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, 
              and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees 
              (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of 
              the Services.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, 
              for any reason, including without limitation if you breach these Terms.
            </p>
            <p className="mt-3">
              Upon termination, your right to use the Services will immediately cease. All provisions of these Terms that by their 
              nature should survive termination shall survive, including without limitation ownership provisions, warranty disclaimers, 
              indemnity, and limitations of liability.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without 
              regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the 
              courts located in San Francisco County, California.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:legal@factfocus.com" className="text-blue-600">legal@factfocus.com</a></p>
              <p className="mt-2"><strong>Address:</strong> FactFocus, Inc., 123 Media Avenue, Suite 400, San Francisco, CA 94103</p>
            </div>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}