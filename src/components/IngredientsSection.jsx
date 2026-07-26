import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ingredientOud from '../assets/ingredient_oud.png';
import ingredientIris from '../assets/ingredient_iris.png';
import ingredientAmber from '../assets/ingredient_amber.png';
import ingredientVetiver from '../assets/ingredient_vetiver.png';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    id: 'oud',
    title: 'Rare Cambodian Oud',
    subtitle: 'THE FOUNDATION',
    description: 'Sourced from the deep forests of Cambodia, our Oud is aged for over a decade. It provides a resonant, smoky depth that anchors the fragrance, revealing its complex woody character only to those who linger.',
    image: ingredientOud
  },
  {
    id: 'iris',
    title: 'Midnight Black Iris',
    subtitle: 'THE HEART',
    description: 'A delicate yet intensely dark floral note. Hand-harvested beneath the moonlight, the Black Iris offers a velvety, powdery elegance that contrasts beautifully with the raw power of the base notes.',
    image: ingredientIris
  },
  {
    id: 'amber',
    title: 'Liquid Gold Amber',
    subtitle: 'THE GLOW',
    description: 'Fossilized tree resin slowly warmed into a luxurious golden elixir. This radiant amber note wraps the wearer in a sensual, honeyed warmth that radiates intimately throughout the evening.',
    image: ingredientAmber
  },
  {
    id: 'vetiver',
    title: 'Haitian Vetiver',
    subtitle: 'THE EARTH',
    description: 'Crisp, emerald roots pulled directly from the volcanic soils of Haiti. Vetiver injects a sharp, earthy green freshness that cuts through the darkness, ensuring the scent profile remains perfectly balanced and alive.',
    image: ingredientVetiver
  }
];

export default function IngredientsSection() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  
  useEffect(() => {
    // Only run on desktop/tablet to avoid weird mobile pinning issues
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // Pin the left column image container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftColRef.current,
        pinSpacing: false, // Don't add extra padding
      });

      // Crossfade images based on which text block is active
      const sections = gsap.utils.toArray('.ingredient-text-block');
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to('.ingredient-img', { opacity: 0, duration: 0.6, ease: 'power2.inOut' });
            gsap.to(`.ingredient-img-${index}`, { opacity: 1, duration: 0.6, ease: 'power2.inOut' });
          },
          onEnterBack: () => {
            gsap.to('.ingredient-img', { opacity: 0, duration: 0.6, ease: 'power2.inOut' });
            gsap.to(`.ingredient-img-${index}`, { opacity: 1, duration: 0.6, ease: 'power2.inOut' });
          }
        });
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-background w-full">
      <div className="flex flex-col md:flex-row w-full h-full">
        
        {/* Left Column (Sticky Image) */}
        <div 
          ref={leftColRef} 
          className="w-full md:w-1/2 aspect-[4/5] md:aspect-square relative overflow-hidden flex-shrink-0 z-10 border-r border-primary/5"
        >
          {ingredients.map((ing, idx) => (
            <img 
              key={ing.id}
              src={ing.image}
              alt={ing.title}
              className={`ingredient-img ingredient-img-${idx} absolute inset-0 w-full h-full object-cover brightness-110 contrast-110`}
              style={{ opacity: idx === 0 ? 1 : 0 }}
            />
          ))}
          {/* Removed the dark gradient overlay to ensure images are bright and high quality */}
        </div>

        {/* Right Column (Scrolling Text) */}
        <div className="w-full md:w-1/2 flex flex-col z-20">
          {ingredients.map((ing) => (
            <div 
              key={ing.id} 
              className="ingredient-text-block w-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 md:py-32"
            >
              <div className="glass-panel p-card-padding rounded-sm gold-glow">
                <span className="font-sans text-[10px] text-primary uppercase tracking-widest block mb-4">
                  {ing.subtitle}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl mb-6 text-on-background leading-tight">
                  {ing.title}
                </h3>
                <p className="font-sans text-base md:text-lg text-on-surface-variant leading-relaxed font-light">
                  {ing.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
