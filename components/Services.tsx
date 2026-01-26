
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Invest in Excellence</h2>
          <p className="text-gray-400 font-light">Tailored sessions for your professional and personal legacy.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-[#D4AF37]">{service.price}</span>
              </div>
              <p className="text-gray-500 font-light mb-8 flex-grow">{service.description}</p>
              <button className="w-full py-3 px-6 rounded-full bg-gray-50 text-gray-800 hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center justify-center gap-2 group">
                Select Plan
                <CheckCircle2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
