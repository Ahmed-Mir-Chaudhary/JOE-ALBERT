
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Shop', href: '#products' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white transition-transform group-hover:rotate-[360deg] duration-700`}>
            <Camera size={20} />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-[#1A1A1A]">JOE ALBERT</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-600 hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-bold rounded-full hover:bg-[#D4AF37] transition-colors shadow-lg">
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#1A1A1A]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-800"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold">
                Book a Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
