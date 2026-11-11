import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight, Award, Settings, Headset, Globe } from 'lucide-react';
import { PRODUCTS_API_URL } from '../api';

const Footer = () => {
  const [products, setProducts] = useState([]);

  const quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about-us' },
    { label: 'Our Products', url: '/shop' },
    { label: 'Blogs', url: '/blog' },
    { label: 'FAQs', url: '/faqs' },
    { label: 'How To Use (Dyne Guide)', url: '/how-to-use' },
    { label: 'Download Catalog (PDF)', url: '/ImageTech_Dyne_Pen_Catalog.pdf', isDownload: true },
    { label: 'Contact Us', url: '/contact-us' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${PRODUCTS_API_URL}/products`);
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data) ? data : (data.products || []);
          if (items && items.length > 0) {
            // Strictly filter for Dyne Test Pens and Dyne Test Inks only (Limit to exactly 6 products)
            const dyneOnly = items.filter(p => {
              const slug = (p.slug || '').toLowerCase();
              const title = (p.title || p.name || '').toLowerCase();
              return slug.includes('dyne') || title.includes('dyne');
            });
            setProducts((dyneOnly.length > 0 ? dyneOnly : items).slice(0, 6));
          }
        }
      } catch (error) {
        console.error('Error fetching footer products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 relative font-sans text-black">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Logo & Text */}
          <div className="lg:pr-6">
            <Link to="/">
              <img src="/logo.jpg" alt="ImageTech Industries Logo" className="h-14 mb-2 object-contain" />
            </Link>
            <p className="text-blue-600 font-bold text-[13px] mb-3">Your Satisfaction is our Priority</p>
            <p className="text-gray-800 font-medium text-[14px] leading-relaxed mb-4">
              We are a leading manufacturer and supplier of precision industrial products for printing, packaging, coating, and testing applications. Our commitment to quality, innovation, and customer satisfaction drives everything we do.
            </p>
            
            {/* Social SVGs */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div>
            <h4 className="font-bold text-[15px] text-black mb-4 uppercase tracking-wider relative inline-block">
              Useful Links
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-blue-600"></span>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isDownload ? (
                    <a 
                      href={link.url}
                      download="ImageTech_Dyne_Pen_Catalog.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black font-bold text-[14px] hover:text-blue-600 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link to={link.url} className="text-black font-bold text-[14px] hover:text-blue-600 transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Products */}
          <div>
            <h4 className="font-bold text-[15px] text-black mb-4 uppercase tracking-wider relative inline-block">
              Our Products
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-blue-600"></span>
            </h4>
            <ul className="space-y-2.5">
              {products.length > 0 ? (
                products.map((product) => (
                  <li key={product._id || product.id}>
                    <Link to={`/product/${product.slug || product._id}`} className="text-black font-bold text-[14px] hover:text-blue-600 transition-colors flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate whitespace-nowrap block" title={product.title || product.name}>
                        {product.title || product.name}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm font-medium text-gray-500 italic">Loading products...</li>
              )}
            </ul>
          </div>

          {/* Col 4: Quick Contacts */}
          <div>
            <h4 className="font-bold text-[15px] text-black mb-4 uppercase tracking-wider relative inline-block">
              Quick Contacts
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-blue-600"></span>
            </h4>
            
            <div className="flex flex-col">
              {/* Phones */}
              <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="pt-1">
                  <a href="tel:+918448336036" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors cursor-pointer block mb-1">+91 8448336036</a>
                  <a href="tel:+918851016580" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors cursor-pointer block mb-1">+91 8851016580</a>
                  <a href="tel:+918448441345" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors cursor-pointer block">+91 8448441345</a>
                </div>
              </div>
              
              {/* Emails */}
              <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="pt-1">
                  <a href="mailto:imagetechindustries@gmail.com" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors block break-words mb-1">
                    imagetechindustries@gmail.com
                  </a>
                  <a href="mailto:sales.imagetechindustries@gmail.com" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors block break-words">
                    sales.imagetechindustries@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 py-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="pt-1">
                  <p className="text-black font-bold text-[13px] leading-relaxed pr-2 uppercase">
                    RZ-I-13, 2ND FLOOR, NANDA BLOCK, MAHAVIR ENCLAVE, NEW DELHI-110045, INDIA.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Features Banner */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 lg:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-[14px] text-black">Premium Quality</h5>
                <p className="text-gray-600 text-[12px] font-medium leading-snug mt-1">Products manufactured to the highest standards</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-[14px] text-black">Precision Engineering</h5>
                <p className="text-gray-600 text-[12px] font-medium leading-snug mt-1">Advanced technology for consistent accuracy</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Headset className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-[14px] text-black">Technical Support</h5>
                <p className="text-gray-600 text-[12px] font-medium leading-snug mt-1">Expert guidance for your application needs</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-[14px] text-black">Global Reach</h5>
                <p className="text-gray-600 text-[12px] font-medium leading-snug mt-1">Serving customers across the world</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black font-bold text-[13px]">
            &copy; 2026 ImageTech Industries. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors">Terms &amp; Conditions</Link>
            <Link to="/shipping-policy" className="text-black font-bold text-[13px] hover:text-blue-600 transition-colors">Shipping Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
