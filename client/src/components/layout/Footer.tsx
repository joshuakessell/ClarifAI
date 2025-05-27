import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-2">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clarif-AI
              </span>
            </div>
            <p className="text-gray-500 mt-2">AI-powered news analysis delivering factually verified, bias-neutral updates on topics that matter to you.</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it works</Link></li>
              <li><Link href="/methodology" className="text-gray-600 hover:text-gray-900">Our methodology</Link></li>
              <li><Link href="/source-verification" className="text-gray-600 hover:text-gray-900">Source verification</Link></li>
              <li><Link href="/bias-detection" className="text-gray-600 hover:text-gray-900">Bias detection</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="text-gray-600 hover:text-gray-900">About us</Link></li>
              <li><Link href="/team" className="text-gray-600 hover:text-gray-900">Team</Link></li>
              <li><Link href="/press" className="text-gray-600 hover:text-gray-900">Press</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
              <li><Link href="/gdpr-compliance" className="text-gray-600 hover:text-gray-900">GDPR Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">© {new Date().getFullYear()} Clarif-AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
