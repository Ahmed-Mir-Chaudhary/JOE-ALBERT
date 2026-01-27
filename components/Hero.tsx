
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useTransform as useScrollTransform } from 'framer-motion';
import { FloatingFrame } from './FloatingFrame';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useScrollTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useScrollTransform(scrollY, [0, 300], [1, 0]);

  // Motion values for subtle mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 25 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const bgTranslateX = useTransform(springX, [-1, 1], [-15, 15]);
  const bgTranslateY = useTransform(springY, [-1, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / (innerWidth / 2));
    mouseY.set((clientY - innerHeight / 2) / (innerHeight / 2));
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center"
    >
      {/* Dynamic Background Image layer */}
      <motion.div 
        style={{ x: bgTranslateX, y: bgTranslateY, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}
        <img 
          src="/assets/hero-bg.png" 
          alt="Luxury Abstract Background" 
          className="w-full h-full object-cover opacity-90"
        />
      </motion.div>

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 12], fov: 30 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          {/* Warm directional light matching the gold theme */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffe5b4" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#b4aaff" />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Sparkles count={50} scale={12} size={4} speed={0.4} opacity={0.5} color="#D4AF37" />
            
            <group rotation={[0, 0, 0]}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <FloatingFrame url="https://picsum.photos/seed/fashion1/600/900" position={[-4.5, 1, -2]} rotation={[0, 0.3, 0]} scale={[0.9, 0.9, 0.9]} />
              </Float>
              <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
                <FloatingFrame url="https://picsum.photos/seed/fashion2/600/900" position={[4.5, -1, -1]} rotation={[0, -0.3, 0]} scale={[0.9, 0.9, 0.9]} />
              </Float>
              {/* Center frame slightly further back to let text pop */}
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                <FloatingFrame url="https://picsum.photos/seed/fashion3/600/900" position={[0, 2.5, -5]} rotation={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} />
              </Float>
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <div className="overflow-hidden mb-4">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
              className="inline-block text-[#D4AF37] tracking-[0.3em] text-sm md:text-base font-semibold uppercase border-b border-[#D4AF37]/30 pb-2"
            >
              Premium Photography Service
            </motion.span>
          </div>

          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            CAPTURE <span className="italic font-serif text-[#f0f0f0]">The</span> MOMENT
          </h1>

          <p className="font-light text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans mix-blend-screen">
            Elevate your personal brand with cinematic lighting and timeless composition. 
            <br className="hidden md:block"/>
            Where every shot tells a story of elegance and power.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-[#D4AF37] text-white overflow-hidden rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative font-medium tracking-wider uppercase text-sm">Book Session</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-white/30 text-white backdrop-blur-md rounded-sm hover:border-white/60 transition-colors"
            >
              <span className="font-medium tracking-wider uppercase text-sm">View Portfolio</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
    </section>
  );
};
