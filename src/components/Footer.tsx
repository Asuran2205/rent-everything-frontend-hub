
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">RentEverything.Shop</h3>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/6a454940-7057-498c-a2dd-1dfa4ad8cf17.png" 
                alt="RentEverything.Shop" 
                className="h-10 mr-2"
              />
            </div>
            <p className="text-gray-600 text-sm">
              The one-stop destination for all your rental needs. Rent anything, anywhere, anytime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/about" className="hover:text-brand-orange">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-brand-orange">How It Works</Link></li>
              <li><Link to="/categories" className="hover:text-brand-orange">Categories</Link></li>
              <li><Link to="/popular-items" className="hover:text-brand-orange">Popular Items</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/faq" className="hover:text-brand-orange">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-brand-orange">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-orange">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Join Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/for-vendor" className="hover:text-brand-orange">Become a Vendor</Link></li>
              <li><Link to="/for-delivery" className="hover:text-brand-orange">Become a Delivery Partner</Link></li>
              <li><Link to="/careers" className="hover:text-brand-orange">Careers</Link></li>
              <li><Link to="/newsletter" className="hover:text-brand-orange">Newsletter</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} RentEverything.Shop. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-brand-purple">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-orange">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.176.585 1.709 1.118.533.533.868 1.041 1.118 1.709.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.118 1.709c-.533.533-1.041.868-1.709 1.118-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.709-1.118 4.902 4.902 0 01-1.118-1.709c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.585-1.176 1.118-1.709.533-.533 1.041-.868 1.709-1.118.636-.247 1.363-.416 2.427-.465C9.576 2.013 9.93 2 12.315 2zm0 1.8h-.63c-2.306 0-2.647.011-3.649.057-.879.04-1.354.187-1.67.31a3.103 3.103 0 00-1.082.703c-.333.333-.538.645-.704 1.082-.123.317-.27.792-.31 1.67-.047 1.006-.058 1.34-.058 3.649v.63c0 2.306.011 2.647.057 3.649.04.879.187 1.354.31 1.67.163.421.369.749.702 1.082.333.333.645.538 1.082.704.317.123.792.27 1.67.31 1.006.047 1.34.058 3.649.058h.63c2.306 0 2.647-.011 3.649-.057.879-.04 1.354-.187 1.67-.31a3.103 3.103 0 001.082-.703c.333-.333.538-.645.704-1.082.123-.317.27-.792.31-1.67.047-1.006.058-1.34.058-3.649v-.63c0-2.306-.011-2.647-.057-3.649-.04-.879-.187-1.354-.31-1.67a3.103 3.103 0 00-.703-1.082 3.103 3.103 0 00-1.082-.704c-.317-.123-.792-.27-1.67-.31-1.006-.047-1.34-.058-3.649-.058zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-7.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-purple">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
