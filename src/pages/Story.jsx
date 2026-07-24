import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Leaf, Heart, Shield, Sparkles, Droplet } from 'lucide-react';

export default function Story({ isSection = false }) {
  const noteLevels = [
    {
      id: "top",
      title: "Top Notes",
      subtitle: "The Flight (0 - 30 Minutes)",
      description: "The immediate sensation. Light, volatile, and luminous. Top notes represent the opening movement of the symphony—typically citrus, fresh herbs, and light spices that arrest the senses instantly before dissolving into the air.",
      accentClass: "hero-gradient",
      glowColor: "rgba(235, 193, 102, 0.12)",
      gradientStyle: "radial-gradient(circle at center, rgba(235, 193, 102, 0.12) 0%, rgba(13, 12, 11, 0) 70%)",
      ingredients: [
        { name: "Sicilian Bergamot", trait: "Crisp & Luminous", icon: Wind },
        { name: "Crushed Fig Leaf", trait: "Green & Verdant", icon: Leaf },
        { name: "Pink Pepper", trait: "Zesty & Vibrant", icon: Sparkles }
      ]
    },
    {
      id: "heart",
      title: "Heart Notes",
      subtitle: "The Core (30 Minutes - 4 Hours)",
      description: "The character and emotion of the fragrance. As the flight settles, the heart emerges, representing the warm, hypnotic florals, rich fruits, and narcotic spices that form the body of the scent and interact with skin chemistry.",
      accentClass: "burgundy-gradient",
      glowColor: "rgba(120, 40, 30, 0.1)",
      gradientStyle: "radial-gradient(circle at center, rgba(120, 40, 30, 0.1) 0%, rgba(13, 12, 11, 0) 70%)",
      ingredients: [
        { name: "Damask Rose Absolute", trait: "Velvet & Intoxicating", icon: Heart },
        { name: "Midnight Jasmine", trait: "Ethereal & Sweet", icon: Droplet },
        { name: "Black Cardamom", trait: "Smoky & Exquisite", icon: Sparkles }
      ]
    },
    {
      id: "base",
      title: "Base Notes",
      subtitle: "The Shadow (4 Hours - 24 Hours)",
      description: "The foundation that persists. Built from the most dense, heavy molecular structures—ancient agarwood, warm amber resin, smoked leather, and musk. The base holds the lighter elements together and creates the unforgettable trail.",
      accentClass: "amber-gradient",
      glowColor: "rgba(201, 162, 75, 0.08)",
      gradientStyle: "radial-gradient(circle at center, rgba(201, 162, 75, 0.08) 0%, rgba(13, 12, 11, 0) 70%)",
      ingredients: [
        { name: "Cambodian Oud Wood", trait: "Resinous & Sacred", icon: Shield },
        { name: "Warm Fossilized Amber", trait: "Grounded & Sweet", icon: Droplet },
        { name: "Smoked Birch Leather", trait: "Animalic & Rich", icon: Wind }
      ]
    }
  ];

  return (
    <div 
      id="story"
      className={`${isSection ? "py-section-gap" : "pt-32 pb-section-gap"} overflow-hidden border-t border-primary/5`}
    >
      {/* Title */}
      <section className="text-center px-6 max-w-7xl mx-auto mb-12">
        <span className="font-sans text-[10px] text-primary uppercase tracking-[0.25em] block mb-4">THE OLFACTORY ARCHITECTURE</span>
        <h1 className="font-serif text-4xl md:text-6xl text-on-background mb-4">The Fragrance Pyramid</h1>
        <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
          Aetheris compositions unfold in three movements over time. Explore the chemistry of invisible presence.
        </p>
      </section>

      {/* Timeline Sections */}
      <div className="space-y-16">
        {noteLevels.map((level, idx) => (
          <section 
            key={level.id} 
            className="relative py-12 px-6"
          >
            {/* Ambient background glow */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ background: level.gradientStyle }}
            />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Image / Graphic column */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`md:col-span-5 ${
                  idx % 2 === 0 ? "md:col-start-2 order-2 md:order-1" : "md:col-start-8 order-2"
                } mt-12 md:mt-0`}
              >
                <div className="glass-panel p-6 rounded-sm shadow-2xl border-primary/10">
                  <h4 className="font-serif text-lg text-primary mb-4 uppercase tracking-widest">Core Extraction</h4>
                  <div className="space-y-4">
                    {level.ingredients.map((ing, iIdx) => {
                      const IconComponent = ing.icon;
                      return (
                        <div key={ing.name} className="flex items-center gap-4 border-b border-primary/5 pb-4 last:border-b-0 last:pb-0">
                          <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary bg-[#16130d]/50">
                            <IconComponent size={16} />
                          </div>
                          <div>
                            <h5 className="font-serif text-base text-on-surface">{ing.name}</h5>
                            <p className="font-sans text-[10px] text-on-surface/40 uppercase tracking-wider">{ing.trait}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Text description column */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`md:col-span-5 ${
                  idx % 2 === 0 ? "md:col-start-8 order-1 md:order-2 text-left" : "md:col-start-2 order-1 text-left"
                }`}
              >
                <div className="glass-panel p-card-padding rounded-sm relative z-10 border-primary/10 gold-glow">
                  <span className="font-sans text-[10px] text-primary uppercase tracking-widest block mb-1">{level.subtitle}</span>
                  <h2 className="font-serif text-3xl mb-6 text-on-background"> {level.title}</h2>
                  <p className="font-sans text-base text-on-surface-variant leading-relaxed font-light">
                    {level.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
