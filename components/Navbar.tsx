
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

  const textColorClass = scrolled ? 'text-[#1A1A1A]' : 'text-white';
  const logoBgClass = scrolled ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]';
  const buttonClass = scrolled
    ? 'bg-[#1A1A1A] text-white hover:bg-[#D4AF37]'
    : 'bg-white text-[#1A1A1A] hover:bg-[#D4AF37] hover:text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="/assets/logo.png"
            alt="Joe Albert Signature"
            className={`h-12 w-auto transition-all duration-500 ${scrolled ? '' : 'brightness-0 invert'}`}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors uppercase tracking-widest hover:text-[#D4AF37] ${textColorClass}`}
            >
              {link.name}
            </a>
          ))}
          <button className={`px-6 py-2.5 text-sm font-bold rounded-full transition-colors shadow-lg ${buttonClass}`}>
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden ${textColorClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 overflow-hidden absolute top-full left-0 right-0 shadow-xl"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-[#D4AF37]"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-[#D4AF37]">
                Book a Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
