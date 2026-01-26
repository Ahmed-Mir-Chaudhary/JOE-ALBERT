
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { FloatingFrame } from './FloatingFrame';
import { MapPin, Heart, Award, Eye, Globe, Sparkles } from 'lucide-react';

const AnimatedCounter = ({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2500;
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        setDisplayValue(Math.floor(easeOutExpo * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref} 
      className="text-center md:text-left"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-baseline justify-center md:justify-start gap-1">
        <span className="text-4xl md:text-5xl font-display font-bold text-[#1A1A1A]">
          {displayValue}{suffix}
        </span>
      </div>
      <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-2 leading-tight">
        {label}
      </p>
    </motion.div>
  );
};

const PI_DATA = [
  {
    title: "The Vision",
    content: "Joe Albert Studios was founded on the belief that everyone has a story worth telling with cinematic excellence.",
    icon: Eye
  },
  {
    title: "Excellence",
    content: "Voted #1 studio in the region for corporate headshots and executive branding photography.",
    icon: Award
  },
  {
    title: "Compassion",
    content: "Dedicated to local community projects, capturing the human spirit through humanitarian lens work.",
    icon: Heart
  },
  {
    title: "Global Reach",
    content: "From Ohio to international assignments, we bring world-class quality to every shutter click.",
    icon: Globe
  }
];

const BackgroundScene = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <FloatingFrame url="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=400" position={[-8, 4, -5]} rotation={[0, 0.4, 0]} scale={[0.8, 0.8, 1]} />
          </Float>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
            <FloatingFrame url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" position={[9, -3, -4]} rotation={[0, -0.3, 0]} scale={[0.7, 0.7, 1]} />
          </Float>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export const About: React.FC = () => {
  const containerRef = useRef(null);
  
  // Explicitly typing variants to fix transition.ease number[] inference issue
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <section id="about" ref={containerRef} className="relative py-32 bg-white overflow-hidden">
      <BackgroundScene />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Image, Stats, and Location */}
          <div className="lg:col-span-5 space-y-10">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=1000" 
                  alt="Joe Albert" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Artistic Director</p>
                  <h3 className="text-white text-3xl font-display font-bold">Joe Albert</h3>
                </div>
              </motion.div>

              {/* Decorative Box at bottom right of image to bridge space */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Established 2009</p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <AnimatedCounter value={15} suffix="+" label="Years of Excellence" />
              <AnimatedCounter value={2} suffix="k+" label="Portraits Delivered" />
            </div>

            {/* NEW LOCATION - MOVED HERE */}
            <div className="space-y-6 pt-8 border-t border-gray-100">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-8"
              >
                <div className="space-y-2">
                   <h3 className="text-xl font-display font-bold text-[#1A1A1A]">
                    New <span className="text-[#D4AF37]">Location</span>
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#D4AF37] shadow-sm">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Main Studio</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">2307 Cleveland Ave NW. 44709</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#D4AF37", color: "white" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full md:w-auto px-10 py-5 bg-[#1A1A1A] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl"
                >
                  Connect With Us
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Bio and Pillars */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.5em] block"
              >
                About Me
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-display font-bold text-[#1A1A1A] leading-tight"
              >
                Behind the <span className="text-[#D4AF37]">Images</span>
              </motion.h2>
              <motion.p 
                custom={1}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-lg text-gray-700 font-light leading-relaxed max-w-2xl"
              >
                I'm Joe, a dedicated and compassionate photographer with love for dogs. I enjoy using my skills and creativity to make a difference in the lives of others. I have a heart for service, especially for those facing challenges such as cancer, Down syndrome, military personnel and first responders.
              </motion.p>
            </div>

            <div className="space-y-6">
               <motion.h3 
                custom={2}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-2xl font-display font-bold text-[#1A1A1A]"
              >
                Why Choose <span className="text-[#D4AF37]">Joe Albert?</span>
              </motion.h3>
              <motion.p 
                custom={3}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-base text-gray-500 font-light leading-relaxed max-w-2xl"
              >
                Experience the Art of Timeless Photography with Joe Albert Signature. With decades of expertise and a passion for storytelling, we go beyond capturing images—we create lasting impressions. From personalized service to stunning results, trust Joe to bring your vision to life with artistry and precision. Book your session today!
              </motion.p>
            </div>

            {/* Pillar Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {PI_DATA.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  custom={idx + 4}
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -5, borderColor: '#D4AF37' }}
                  className="p-8 rounded-[2rem] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                    <pillar.icon size={22} />
                  </div>
                  <h4 className="text-lg font-display font-bold mb-3 text-[#1A1A1A]">{pillar.title}</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{pillar.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
