
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ZoomIn, Camera, Aperture, Layers, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { PHOTOS } from '../constants';
import { Photo } from '../types';

const categories = ['All', 'Headshots', 'Corporate', 'Studio', 'Location', 'Real Estate'] as const;

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredPhotos = activeCategory === 'All' 
    ? PHOTOS 
    : PHOTOS.filter(p => p.category === activeCategory);

  const selectedPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
    }
  }, [selectedIndex, filteredPhotos.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  }, [selectedIndex, filteredPhotos.length]);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Curated Gallery</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <p className="text-gray-400 font-light tracking-[0.4em] uppercase text-[10px]">Excellence in every frame</p>
              <div className="h-px w-8 bg-[#D4AF37]" />
            </div>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-500 border ${
                activeCategory === cat 
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xl scale-105' 
                  : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                onViewDetails={() => setSelectedIndex(index)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />

            {/* Navigation Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 pointer-events-none z-50">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md pointer-events-auto hover:bg-[#D4AF37] transition-all"
              >
                <ChevronLeft size={32} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md pointer-events-auto hover:bg-[#D4AF37] transition-all"
              >
                <ChevronRight size={32} />
              </motion.button>
            </div>
            
            <motion.div
              key={selectedPhoto.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative max-w-7xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-full max-h-[85vh] z-40"
            >
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-8 right-8 z-50 w-12 h-12 bg-gray-50 hover:bg-[#D4AF37] hover:text-white rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 shadow-sm"
              >
                <X size={24} />
              </button>

              <div className="md:w-3/5 bg-gray-50 relative group overflow-hidden h-[45vh] md:h-full flex items-center justify-center">
                <motion.img 
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain p-4 md:p-8"
                />
                
                {/* Background "Bloom" Glow */}
                <div className="absolute inset-0 -z-10 opacity-30 blur-[100px] pointer-events-none scale-150" 
                     style={{ backgroundImage: `radial-gradient(circle, #D4AF37 0%, transparent 70%)` }} />
              </div>

              <div className="md:w-2/5 p-8 md:p-16 flex flex-col bg-white overflow-y-auto scrollbar-hide">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col h-full"
                >
                  <div className="mb-10">
                    <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">
                      {selectedPhoto.category}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-[#1A1A1A] mb-8 leading-[1.1]">
                      {selectedPhoto.title}
                    </h3>
                    <div className="w-12 h-1 bg-[#D4AF37] mb-10 rounded-full" />
                    <p className="text-gray-500 font-light leading-relaxed text-lg mb-12">
                      {selectedPhoto.description || "A masterclass in visual storytelling, this piece captures the delicate balance between composition and raw emotion."}
                    </p>
                  </div>

                  {/* Enhanced EXIF Grid */}
                  <div className="grid grid-cols-1 gap-5 mb-12 border-t border-b border-gray-50 py-10">
                    {selectedPhoto.metadata && (
                      <>
                        <div className="flex items-center gap-5">
                          <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-[#D4AF37] border border-gray-100">
                            <Camera size={18} />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-0.5">Camera Body</p>
                            <p className="text-sm font-semibold text-[#1A1A1A]">{selectedPhoto.metadata.camera}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-[#D4AF37] border border-gray-100">
                            <Layers size={18} />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-0.5">Optics</p>
                            <p className="text-sm font-semibold text-[#1A1A1A]">{selectedPhoto.metadata.lens}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-[#D4AF37] border border-gray-100">
                            <Aperture size={18} />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-0.5">EXIF Data</p>
                            <p className="text-sm font-semibold text-[#1A1A1A]">{selectedPhoto.metadata.settings}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedIndex(null);
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-grow px-8 py-5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-2xl hover:bg-[#D4AF37] transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      Book a Session
                      <ZoomIn size={16} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02, backgroundColor: "#F9F9F9" }}
                      whileTap={{ scale: 0.98 }}
                      className="p-5 border border-gray-100 rounded-2xl text-gray-400 hover:text-[#1A1A1A] transition-all"
                    >
                      <Share2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface PhotoCardProps {
  photo: Photo;
  onViewDetails: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onViewDetails }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer perspective-1000 h-full"
      onClick={onViewDetails}
    >
      <motion.div
        whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02, z: 20 }}
        className="relative overflow-hidden rounded-[1.5rem] shadow-lg aspect-[3/4] transition-all duration-700 bg-gray-100 ring-1 ring-black/5"
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
            <div className="w-10 h-10 border-[3px] border-[#D4AF37]/10 border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        )}

        <img 
          src={photo.url} 
          alt={photo.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } group-hover:scale-105 filter group-hover:brightness-90`}
        />

        {/* Enhanced Interactive Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 ${isLoaded ? 'flex' : 'hidden'}`}>
          <div className="transform translate-y-10 group-hover:translate-y-0 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)">
            <motion.span 
              className="text-[#D4AF37] text-[8px] font-bold uppercase tracking-[0.5em] mb-3 block"
            >
              {photo.category}
            </motion.span>
            <h3 className="text-white text-xl font-display font-medium mb-8 leading-tight">{photo.title}</h3>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#D4AF37", borderColor: "#D4AF37", color: "white" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white border border-white/20 px-6 py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all w-full justify-center"
            >
              <ZoomIn size={14} className="group-hover:rotate-12 transition-transform" />
              View Details
            </motion.button>
          </div>
        </div>

        {/* Quick Actions (Top Right) */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#D4AF37" }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white shadow-xl"
          >
            <Eye size={18} />
          </motion.button>
        </div>

        {/* Frame Highlight */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </motion.div>
    </motion.div>
  );
};
