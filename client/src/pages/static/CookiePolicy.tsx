import StaticPage from "@/components/layout/StaticPage";

export default function CookiePolicy() {
  return (
    <StaticPage 
      title="Cookie Policy" 
      description="Learn about how FactFocus uses cookies and similar technologies to improve your experience on our platform."
    >
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-dark">Cookie Policy</h1>
        
        <div className="text-sm text-gray-500 mb-8">
          <p>Last Updated: May 10, 2023</p>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          This Cookie Policy explains how FactFocus ("we", "us", or "our") uses cookies and similar 
          technologies when you visit our website or use our services. It explains what these technologies 
          are and why we use them, as well as your rights to control our use of them.
        </p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit 
              a website. They are widely used to make websites work more efficiently and provide information 
              to the website owners. Cookies can be "persistent" or "session" cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Persistent cookies</strong> remain on your device after you close your browser until they expire 
                or you delete them. They enable the website to recognize you when you return.
              </li>
              <li>
                <strong>Session cookies</strong> are temporary and are deleted from your device once you close your browser. 
                They help websites track your movements from page to page so you don't have to provide the same information repeatedly.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Other Tracking Technologies</h2>
            <p>
              In addition to cookies, we may use other similar technologies to track your activity on our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Web beacons</strong> (also called clear gifs or pixel tags) are small graphics files that contain 
                a unique identifier that enable us to recognize when someone has visited our website or opened an email we sent.
              </li>
              <li>
                <strong>Local storage objects</strong> (sometimes called flash cookies) are used to collect and store information 
                about your preferences and navigation to, from, and on our website.
              </li>
              <li>
                <strong>Browser fingerprinting</strong> collects information about your browser type, version, language, screen 
                resolution, and similar technical information to help identify you as a unique user.
              </li>
            </ul>
            <p className="mt-3">
              For simplicity, we refer to all of these technologies as "cookies" in this policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            <p>
              We use different types of cookies for various purposes:
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Essential Cookies</h3>
                <p className="mb-2">
                  These cookies are necessary for the website to function properly. They enable core functionality 
                  such as security, network management, and account access. You can disable these by changing your 
                  browser settings, but this may affect how the website functions.
                </p>
                <div className="mt-3 border-t border-blue-100 pt-3">
                  <p className="text-sm font-medium text-blue-800">Examples:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-1 text-sm">
                    <li>Authentication cookies that identify you when you log into our platform</li>
                    <li>Security cookies that help prevent fraudulent use of accounts</li>
                    <li>Session cookies that remember your preferences as you navigate our site</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Performance & Analytics Cookies</h3>
                <p className="mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously. They help us improve our website's functionality and user experience.
                </p>
                <div className="mt-3 border-t border-blue-100 pt-3">
                  <p className="text-sm font-medium text-blue-800">Examples:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-1 text-sm">
                    <li>Google Analytics cookies that track page visits and user behavior</li>
                    <li>Cookies that measure load times and performance</li>
                    <li>Cookies that help us understand which content is most engaging</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Functional Cookies</h3>
                <p className="mb-2">
                  These cookies enable enhanced functionality and personalization. They may be set by us or by third-party 
                  providers whose services we have added to our pages.
                </p>
                <div className="mt-3 border-t border-blue-100 pt-3">
                  <p className="text-sm font-medium text-blue-800">Examples:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-1 text-sm">
                    <li>Cookies that remember your preferences (like language or region)</li>
                    <li>Cookies that remember your content preferences (news topics)</li>
                    <li>Cookies that enable social sharing functionality</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Targeting & Advertising Cookies</h3>
                <p className="mb-2">
                  These cookies may be set through our site by our advertising partners. They may be used by those companies 
                  to build a profile of your interests and show you relevant advertisements on other sites.
                </p>
                <div className="mt-3 border-t border-blue-100 pt-3">
                  <p className="text-sm font-medium text-blue-800">Examples:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-1 text-sm">
                    <li>Cookies used to show you relevant content based on your interests</li>
                    <li>Cookies that measure ad effectiveness</li>
                    <li>Cookies that enable tailored recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third parties on our website. These third parties may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Analytics providers (such as Google Analytics)</li>
              <li>Content delivery networks</li>
              <li>Social media platforms</li>
              <li>Payment processors</li>
              <li>Technology service providers</li>
            </ul>
            <p className="mt-3">
              These third parties may use cookies, web beacons, and similar technologies to collect information about 
              your use of our website and other websites. This information may be used by them to provide analytics 
              services or to target advertisements.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Manage Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. Here's how to manage 
              cookies in popular browsers:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">Google Chrome</h3>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Click the three dots in the top-right corner</li>
                  <li>Select "Settings"</li>
                  <li>Click "Privacy and security"</li>
                  <li>Click "Cookies and other site data"</li>
                  <li>Adjust your cookie settings as desired</li>
                </ol>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">Mozilla Firefox</h3>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Click the three lines in the top-right corner</li>
                  <li>Select "Options" (Windows) or "Preferences" (Mac)</li>
                  <li>Click "Privacy & Security"</li>
                  <li>Under "Enhanced Tracking Protection," choose your preferred level</li>
                  <li>For more control, use the "Cookies and Site Data" section</li>
                </ol>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">Safari</h3>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Click "Safari" in the menu bar</li>
                  <li>Select "Preferences"</li>
                  <li>Click the "Privacy" tab</li>
                  <li>Choose your desired cookie and website data settings</li>
                  <li>For more options, click "Manage Website Data"</li>
                </ol>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">Microsoft Edge</h3>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li>Click the three dots in the top-right corner</li>
                  <li>Select "Settings"</li>
                  <li>Click "Cookies and site permissions"</li>
                  <li>Click "Manage and delete cookies and site data"</li>
                  <li>Adjust your settings as needed</li>
                </ol>
              </div>
            </div>
            
            <p className="mt-6">
              Please note that if you choose to block or delete cookies, some features of our website may not function correctly.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Cookie Management Tool</h2>
            <p>
              We provide a cookie management tool that allows you to customize your cookie preferences. This tool is 
              accessible via the "Cookie Settings" link in the footer of our website.
            </p>
            <p className="mt-3">
              Through this tool, you can:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>See which cookies are currently active</li>
              <li>Choose which categories of cookies to accept</li>
              <li>Update your preferences at any time</li>
              <li>Learn more about each specific cookie's purpose</li>
            </ul>
            <div className="mt-6 flex">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Manage Cookie Settings
              </button>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Do Not Track Signals</h2>
            <p>
              Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want 
              to have your online activity tracked. Our website responds to "Do Not Track" signals by disabling tracking 
              cookies when this signal is detected.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business 
              practices. Any changes will become effective when we post the revised policy on our website, and we will indicate 
              the last updated date at the top of the policy.
            </p>
            <p className="mt-3">
              We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-6 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:privacy@factfocus.com" className="text-blue-600">privacy@factfocus.com</a></p>
              <p className="mt-2"><strong>Address:</strong> FactFocus, Inc., 123 Media Avenue, Suite 400, San Francisco, CA 94103</p>
            </div>
          </section>
        </div>
      </div>
    </StaticPage>
  );
}