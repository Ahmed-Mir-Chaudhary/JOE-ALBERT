
import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';

export const Products: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Art for Your Space</h2>
            <p className="text-gray-400 font-light max-w-lg">Museum-quality prints and signature pieces curated to transform any environment into a gallery.</p>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-[#D4AF37] font-bold text-[10px] uppercase tracking-[0.3em] group"
          >
            Visit Full Shop <ShoppingBag size={18} />
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      {/* Product Image Container */}
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white mb-6 border border-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Minimalist Overlay for "Add to Cart" */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="opacity-0 group-hover:opacity-100 bg-white text-[#1A1A1A] px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl transition-all"
          >
            Quick Shop
          </motion.button>
        </div>
      </div>

      {/* Product Details - The requested Minimalist UI */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Print</span>
          <div className="flex items-center gap-2">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-light">${product.originalPrice}</span>
            )}
            <span className="text-sm font-semibold text-[#1A1A1A]">${product.price}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-display font-bold text-[#1A1A1A] mb-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} fill="#D4AF37" color="#D4AF37" />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">(48)</span>
        </div>

        {/* Dynamic Badge for Sales */}
        {product.originalPrice && (
          <div className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[8px] font-bold uppercase tracking-widest">
            Special Offer
          </div>
        )}
      </div>
    </motion.div>
  );
};
