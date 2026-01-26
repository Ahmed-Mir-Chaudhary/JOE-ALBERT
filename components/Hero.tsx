
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FloatingFrame } from './FloatingFrame';

export const Hero: React.FC = () => {
  // Motion values for background parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transforms for background elements
  const bgTranslateX = useTransform(springX, [-1, 1], [-30, 30]);
  const bgTranslateY = useTransform(springY, [-1, 1], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize coordinates to -1 to 1
    mouseX.set((clientX - innerWidth / 2) / (innerWidth / 2));
    mouseY.set((clientY - innerHeight / 2) / (innerHeight / 2));
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#FAFAFA] overflow-hidden"
    >
      {/* Parallax Background Gradients */}
      <motion.div 
        style={{ x: bgTranslateX, y: bgTranslateY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-50/20 rounded-full blur-[100px]" />
      </motion.div>

      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <FloatingFrame url="https://picsum.photos/seed/hero1/600/900" position={[-3.5, 1.2, 0]} rotation={[0, 0.2, 0]} />
            </Float>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
              <FloatingFrame url="https://picsum.photos/seed/hero2/600/900" position={[0, -0.5, 2]} />
            </Float>
            <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
              <FloatingFrame url="https://picsum.photos/seed/hero3/600/900" position={[4.2, 1.8, -1]} rotation={[0, -0.3, 0]} />
            </Float>
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.3} 
          />
        </Canvas>
      </div>

      {/* Hero Text Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-[#1A1A1A]">
            Don’t just step into the spotlight — <span className="text-[#D4AF37]">own it.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            With Joe Albert Signature, your professional edge is just a click away. Experience photography redefined through light, depth, and character.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#D4AF37" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full shadow-lg transition-all duration-300"
            >
              Contact Me
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#D4AF37", color: "#D4AF37" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#1A1A1A] border border-gray-200 font-medium rounded-full shadow-sm transition-all duration-300"
            >
              Photo Gallery
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Light Rays Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-white/60 z-[15]" />
    </section>
  );
};
