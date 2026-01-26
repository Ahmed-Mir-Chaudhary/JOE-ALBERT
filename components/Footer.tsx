
import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, Camera } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <Camera className="text-[#D4AF37]" size={32} />
              <span className="text-2xl font-display font-bold text-[#1A1A1A]">JOE ALBERT</span>
            </a>
            <p className="text-gray-500 font-light max-w-sm leading-relaxed">
              Excellence in every frame. Capturing the moments that define your legacy through high-end studio and location photography.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#1A1A1A] mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 font-light">
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Portfolio</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">Biography</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Price List</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Online Store</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1A1A] mb-6 uppercase tracking-widest text-sm">Follow the Journey</h4>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} Joe Albert Signature Studios. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-gray-400 uppercase tracking-widest">
             <a href="#" className="hover:text-[#D4AF37]">Privacy Policy</a>
             <a href="#" className="hover:text-[#D4AF37]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
