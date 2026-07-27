import React from 'react';
import Collection from './Collection';
import Story from './Story';
import About from './About';
import Contact from './Contact';
import HeroSection from '../components/HeroSection';
import IngredientsSection from '../components/IngredientsSection';
import SmokeSequence from '../components/SmokeSequence';

import heroBg1 from '../assets/hero_bg_1.jpeg';
import heroBg2 from '../assets/hero_bg_2.jpeg';
import heroBg3 from '../assets/hero_bg_3.jpeg';
import heroBg4 from '../assets/hero_bg_4.jpeg';
import heroBg5 from '../assets/hero_bg_5.jpeg';

// Single shared image array — used for both the letter-slot cycle and full-bleed slideshow
const heroImages = [
  heroBg1,
  heroBg2,
  heroBg3,
  heroBg4,
  heroBg5,
];

export default function Home({ 
  introPlayed,
  setIntroPlayed,
  setShowNavbar,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onProductSelect
}) {

  return (
    <div className="overflow-x-hidden">
      {/* Typography-Driven Hero Section */}
      <HeroSection 
        images={heroImages}
        onIntroComplete={() => setShowNavbar(true)}
        introPlayed={introPlayed}
        setIntroPlayed={setIntroPlayed}
      />

      {/* Intro / The Philosophy */}
      <section id="explore" className="py-section-gap px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:col-start-2">
            <div className="glass-panel p-card-padding rounded-sm gold-glow relative z-10">
              <span className="font-sans text-[10px] text-primary uppercase tracking-widest block mb-4">THE PHILOSOPHY</span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 text-on-background">A Symphony in Silence</h2>
              <p className="font-sans text-base text-on-surface-variant leading-relaxed font-light">
                True luxury does not shout; it lingers. AETHERIS crafts olfactory art from the world's most rarefied ingredients. Each drop is a suspended memory, a whisper of prestige designed to interact intimately with your unique chemistry.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8 relative h-[450px] md:h-[550px]">
            <div 
              className="w-full h-full rounded-sm filter grayscale hover:grayscale-0 transition-all duration-1000 object-cover border border-primary/10 bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWELM-CR4qoFfMg0gXxaAhubiKs02s6krPm6uqHJ9rT3a3dWCzB_Cic0qj6xyJo5Q936v3dZJwUa_EGJFeCUKOc9wrxPu061SSKu0CMGPBBgEIJGJjJ2fR47FdIYNmrVoHVrrf7KxhXYIGC3YKJhcchqtB3RsszDw7JtTI8tIxaJdn5VwJwZMFTSl8yHf3KnwjdgdU3cMdk_umDiAEmn_5lV3LMwyhhWWejJLk_s5m_El8dgCULX2YtlV12-HsKhu0cuso-Co1oYo')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Sticky Scroll Ingredients Section */}
      <IngredientsSection />

      {/* 2. Collection Section */}
      <div className="relative z-40 bg-background w-full">
        <Collection 
          isSection={true} 
          onProductSelect={onProductSelect}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
        />
      </div>

      {/* Cinematic Smoke Scrubbing Sequence */}
      <SmokeSequence />

      {/* 3. Fragrance Story Timeline Section */}
      <Story isSection={true} />

      {/* 4. Our Story / About Section */}
      <About isSection={true} />

      {/* 5. Contact Section */}
      <Contact isSection={true} />
    </div>
  );
}
