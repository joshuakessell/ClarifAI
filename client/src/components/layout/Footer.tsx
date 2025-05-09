import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <i className="fas fa-newspaper text-primary text-2xl mr-2"></i>
              <span className="text-xl font-bold text-neutral-dark">FactFocus</span>
            </div>
            <p className="text-gray-500 mt-2">Delivering factually verified, bias-neutral news updates on topics that matter to you.</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">How it works</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Our methodology</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Source verification</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Bias detection</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">About us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Team</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Press</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">GDPR Compliance</Link></li>
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
          <p className="text-gray-500 text-sm mt-4 md:mt-0">© {new Date().getFullYear()} FactFocus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
