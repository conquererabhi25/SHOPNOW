// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-8 px-4 lg:px-20 w-full">
      <div className="grid grid-cols-2 md:grid-cols-5  gap-4">
        {/* About */}
        <div className="min-w-[180px] mb-6 lg:mb-0">
          <h4 className="text-neutral-400 font-semibold mb-3 tracking-wide text-base">ABOUT</h4>
          <ul>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Contact Us</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">About Us</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Careers</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Flipkart Stories</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Press</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Corporate Information</li>
          </ul>
        </div>
        {/* Group Companies */}
        <div className="min-w-[180px] mb-6 lg:mb-0">
          <h4 className="text-neutral-400 font-semibold mb-3 tracking-wide text-base">GROUP COMPANIES</h4>
          <ul>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Myntra</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Cleartrip</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Shopsy</li>
          </ul>
        </div>
        {/* Help */}
        <div className="min-w-[180px] mb-6 lg:mb-0">
          <h4 className="text-neutral-400 font-semibold mb-3 tracking-wide text-base">HELP</h4>
          <ul>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Payments</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Shipping</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Cancellation & Returns</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">FAQ</li>
          </ul>
        </div>
        {/* Consumer Policy */}
        <div className="min-w-[180px] mb-6 lg:mb-0">
          <h4 className="text-neutral-400 font-semibold mb-3 tracking-wide text-base">CONSUMER POLICY</h4>
          <ul>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Cancellation & Returns</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Terms Of Use</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Security</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Privacy</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Sitemap</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">Grievance Redressal</li>
            <li className="mb-2 hover:text-yellow-300 cursor-pointer">EPR Compliance</li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex-1 min-w-[270px] mb-6 lg:mb-0 text-sm">
          <div className="mb-4">
            <span className="font-semibold">Mail Us:</span><br />
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </div>
          <div className="mb-4">
            <span className="font-semibold">Registered Office Address:</span><br />
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: <a href="tel:044-45614700" className="text-blue-300 underline">044-45614700</a> / <a href="tel:044-67415800" className="text-blue-300 underline">044-67415800</a>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            {/* Use Heroicons or any icon library */}
            <a href="#"><span className="sr-only">Facebook</span><i className="fab fa-facebook text-2xl"></i></a>
            <a href="#"><span className="sr-only">Twitter</span><i className="fab fa-x-twitter text-2xl"></i></a>
            <a href="#"><span className="sr-only">YouTube</span><i className="fab fa-youtube text-2xl"></i></a>
            <a href="#"><span className="sr-only">Instagram</span><i className="fab fa-instagram text-2xl"></i></a>
          </div>
        </div>
        
      </div>
      <p className='text-center mt-10 italic'>Made By Abhijeet Koli © October 2025 | Quality Store | Web App Project | React .</p>
    </footer>
  );
};

export default Footer;
