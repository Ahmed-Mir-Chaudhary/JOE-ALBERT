
import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';

export const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Journal</h2>
          <p className="text-gray-400 font-light">Insights, stories, and the evolution of digital artistry.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden rounded-xl mb-6 shadow-md">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">{post.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-gray-400 text-xs">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-[#D4AF37] transition-colors">{post.title}</h3>
                <p className="text-gray-500 font-light line-clamp-2 leading-relaxed">{post.snippet}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
