
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Products />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
