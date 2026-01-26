
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Navigation } from 'lucide-react';

export const Contact: React.FC = () => {
  // Enhanced animation variants for staggered form fields with a cinematic curve
  // Explicitly typing variants to fix transition.ease number[] inference issue
  const formFieldVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number], // Luxury ease-out expo
      },
    }),
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Something Timeless</h2>
            <p className="text-gray-500 font-light mb-12 max-w-lg">
              Ready to elevate your visual identity? Reach out today to schedule a consultation or inquire about our premium print services.
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, label: 'Call Us', value: '(555) 123-4567' },
                { icon: Mail, label: 'Email Us', value: 'hello@joealbert.com' },
                { icon: MapPin, label: 'Studio Address', value: '2307 Cleveland Ave NW, OH' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[#D4AF37]">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest text-[10px] font-bold">{item.label}</p>
                    <p className="font-medium text-[#1A1A1A]">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Elegantly Styled Interactive Google Map */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.4 }}
              className="mt-12 h-80 rounded-3xl overflow-hidden relative shadow-2xl border border-white group"
            >
              <iframe
                title="Joe Albert Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617540300585!2d-74.0064562!3d40.7451016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ba332b7211%3A0x633d2f95b71c7787!2sChelsea%20Market!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ 
                  border: 0, 
                  filter: 'grayscale(1) brightness(1.05) contrast(0.9) invert(0.05)' 
                }}
                className="transition-all duration-1000 ease-out group-hover:filter-none group-hover:brightness-100 group-hover:contrast-100"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              
              {/* Subtle Minimalist Overlay */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[6px] group-hover:opacity-0 group-hover:backdrop-blur-none transition-all duration-700 pointer-events-none flex flex-col items-center justify-center">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#D4AF37] mb-4"
                >
                  <Navigation size={20} />
                </motion.div>
                <div className="px-8 py-3 bg-white/95 shadow-xl border border-gray-100 rounded-full flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Explore Studio Location</span>
                </div>
              </div>

              {/* Inner Frame Glow */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-3xl shadow-[inset_0_0_80px_rgba(0,0,0,0.05)]"></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-t from-[#D4AF37]/10 via-white to-white p-10 md:p-12 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100"
          >
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  custom={0}
                  variants={formFieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 ml-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white transition-all hover:bg-white"
                    placeholder="Joe"
                  />
                </motion.div>
                <motion.div 
                  custom={1}
                  variants={formFieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white transition-all hover:bg-white"
                    placeholder="Albert"
                  />
                </motion.div>
              </div>
              
              <motion.div 
                custom={2}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white transition-all hover:bg-white"
                  placeholder="joe@example.com"
                />
              </motion.div>
              
              <motion.div 
                custom={3}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 ml-1">Subject</label>
                <div className="relative">
                  <select className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white transition-all appearance-none cursor-pointer hover:bg-white">
                     <option>Studio Session</option>
                     <option>Corporate Headshots</option>
                     <option>Product Inquiries</option>
                     <option>Collaboration</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                custom={4}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 ml-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white transition-all resize-none hover:bg-white"
                  placeholder="Tell us about your vision..."
                />
              </motion.div>
              
              <motion.div
                custom={5}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    backgroundColor: "#D4AF37",
                    boxShadow: "0 20px 40px -10px rgba(212, 175, 55, 0.4)" 
                  }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  className="w-full py-5 bg-[#1A1A1A] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all group overflow-hidden relative"
                >
                  <span className="relative z-10 text-xs uppercase tracking-[0.3em]">Send Message</span>
                  <div className="relative z-10">
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  />
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
