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
    description: 'Sourced from the deep, untouched forests of Cambodia, our Oud is meticulously aged in subterranean vaults for over a decade to reach its peak olfactory resonance. This painstaking maturation process yields an incredibly rich, smoky depth that anchors the entire fragrance profile. It reveals its complex, woody character slowly, unfolding across the skin in waves of dark resin, damp earth, and subtle leather. This is a foundational note reserved only for the most discerning connoisseurs who appreciate a scent that lingers long after they have left the room.',
    image: ingredientOud
  },
  {
    id: 'iris',
    title: 'Midnight Black Iris',
    subtitle: 'THE HEART',
    description: 'A delicate yet intensely dark floral note, the Midnight Black Iris is a masterpiece of botanical rarity. Hand-harvested exclusively beneath the cool moonlight to preserve its fragile aromatic compounds, it undergoes a meticulous cold-extraction process. The result is a velvety, powdery elegance that carries a whisper of melancholic beauty, contrasting magnificently with the raw, untamed power of the base notes. It blooms at the heart of the perfume, offering a sophisticated, lingering trail of bruised petals and twilight shadows.',
    image: ingredientIris
  },
  {
    id: 'amber',
    title: 'Liquid Gold Amber',
    subtitle: 'THE GLOW',
    description: 'Ancient fossilized tree resin is gently coaxed and slowly warmed into a luxurious, golden elixir. This is not merely a scent, but a radiant, tactile experience that wraps the wearer in a profoundly sensual, honeyed warmth. As the fragrance develops, the amber note pulses intimately against the skin, radiating a soft, sunlit aura that endures throughout the evening and deep into the night. It bridges the gap between the earthly and the ethereal, leaving a signature glow that is utterly unforgettable.',
    image: ingredientAmber
  }
];

export default function IngredientsSection() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  
  useEffect(() => {
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
        
        {/* Left Column Wrapper (maintains flex layout) */}
        <div className="w-full h-[45vh] md:h-auto md:w-1/2 flex-shrink-0 z-30 bg-background border-b md:border-b-0 md:border-r border-primary/5">
          {/* Inner element that actually gets pinned */}
          <div 
            ref={leftColRef} 
            className="w-full h-[45vh] md:h-screen relative overflow-hidden flex items-center justify-center bg-background"
          >
            {ingredients.map((ing, idx) => (
              <img 
                key={ing.id}
                src={ing.image}
                alt={ing.title}
                className={`ingredient-img ingredient-img-${idx} absolute inset-0 w-full h-full object-contain p-8 md:p-16 brightness-110 contrast-110`}
                style={{ opacity: idx === 0 ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* Right Column (Scrolling Text) */}
        <div className="w-full md:w-1/2 flex flex-col z-20">
          {ingredients.map((ing) => (
            <div 
              key={ing.id} 
              className="ingredient-text-block w-full flex flex-col justify-center min-h-[55vh] md:min-h-[100dvh] px-6 md:px-16 lg:px-24 py-16 md:py-32"
            >
              <div className="glass-panel p-6 md:p-card-padding rounded-sm gold-glow">
                <span className="font-sans text-[10px] text-primary uppercase tracking-widest block mb-2 md:mb-4">
                  {ing.subtitle}
                </span>
                <h3 className="font-serif text-2xl md:text-5xl mb-3 md:mb-6 text-on-background leading-tight">
                  {ing.title}
                </h3>
                <p className="font-sans text-sm md:text-lg text-on-surface-variant leading-relaxed font-light">
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
