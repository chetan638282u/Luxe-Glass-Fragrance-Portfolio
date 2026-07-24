import React from 'react';
import { motion } from 'framer-motion';

export default function About({ isSection = false }) {
  return (
    <div 
      id="about"
      className={`${isSection ? "py-section-gap" : "pt-32 pb-section-gap"} overflow-hidden border-t border-primary/5`}
    >
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center mb-24">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-30" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGMX1xnd7IdNUgyAdsYtU4r9xfFaDbkbfooJj2lGKqqxFd3jqyY-1fQdEVBqfND14-wvpEiPf9nQ2RyF6_BeSgrRARGmktf7L9iiK8oF18MWsOOK7N9LywAZZ4c7CPhXlxtlMxwRBmPr8E1kllUQgPLMu7tMAlqfGxHk8JkseMJjB87BF-TEROJn2FgAoO-f8aPJ_lujCf1TGyE3StN9JkmK7OIgSkfvN7SvuJT1KDYQdINHYIcJ1DK8c3km1TmJ3tN4JX93KUUNk')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-on-background mb-6 leading-tight">
            The Architecture<br/>of Scent.
          </h1>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto font-light tracking-wide leading-relaxed">
            Aetheris was founded on a singular premise: to capture the intangible weight of memory through the medium of pure, unadulterated olfactory art.
          </p>
        </div>
      </section>

      {/* Philosophy Columns */}
      <section className="px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="font-sans text-[10px] text-primary uppercase tracking-[0.2em] block">ATELIER VALUES</span>
          <h2 className="font-serif text-3xl md:text-4xl text-on-background">Sensory Opulence Without Compromise</h2>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-light">
            We reject the industrialization of perfume. Our fragrances are crafted in limited quantities, allowing for maturation processes that require months of quiet rest. We source directly from artisanal farms in Grasse, Haiti, and Cambodia, protecting harvesting methods that have survived for centuries.
          </p>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-light">
            Every bottle is hand-poured, hand-labeled, and inspected to guarantee perfect clarity. Our glass vessels are custom-blown in Venice, celebrating the ancient relationship between liquid and light.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-card-padding rounded-sm border-primary/10 shadow-2xl relative"
        >
          <span className="font-serif text-4xl text-primary absolute -top-4 -left-2">“</span>
          <p className="font-serif text-xl italic text-on-surface/90 leading-relaxed mb-6">
            A perfume is a liquid sculpture, molded not from stone but from air. It is the most intimate garment we can wear, expressing our silent desires to those who step close.
          </p>
          <span className="font-sans text-[10px] text-primary uppercase tracking-[0.15em]">- MARCUS VANE, CHIEF NOSE</span>
        </motion.div>
      </section>

      {/* Atmosphere Callout */}
      <section className="relative w-full h-[400px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-15 filter grayscale"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWELM-CR4qoFfMg0gXxaAhubiKs02s6krPm6uqHJ9rT3a3dWCzB_Cic0qj6xyJo5Q936v3dZJwUa_EGJFeCUKOc9wrxPu061SSKu0CMGPBBgEIJGJjJ2fR47FdIYNmrVoHVrrf7KxhXYIGC3YKJhcchqtB3RsszDw7JtTI8tIxaJdn5VwJwZMFTSl8yHf3KnwjdgdU3cMdk_umDiAEmn_5lV3LMwyhhWWejJLk_s5m_El8dgCULX2YtlV12-HsKhu0cuso-Co1oYo')` }}
        />
        <div className="relative z-10 text-center max-w-xl px-6">
          <h3 className="font-serif text-3xl text-primary mb-4 font-normal">Olfactory Artistry</h3>
          <p className="font-sans text-xs text-on-surface/50 uppercase tracking-[0.15em]">Grasse • London • Venice</p>
        </div>
      </section>
    </div>
  );
}
