import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HeroSection({
  images = [],
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Preload first image for fast initial render
  useEffect(() => {
    if (images.length > 0) {
      const img = new Image();
      img.src = images[0];
    }
  }, [images]);

  // Slideshow interval
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="home">
      <div className="relative aspect-[9/16] md:aspect-video w-full flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 z-10 pointer-events-none" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={images[activeSlide]}
                alt={`Perfume ${activeSlide + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* UI chrome */}
        <AnimatePresence>
          <>
            {/* Floating glass card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.0, delay: 0.3, ease: 'easeOut' }}
              className="absolute bottom-16 md:bottom-20 left-6 md:left-12 z-30 max-w-sm md:max-w-md glass-panel p-6 md:p-8 rounded-sm gold-glow flex flex-col text-left border border-primary/10"
            >
              <span className="font-sans text-[10px] text-primary uppercase tracking-[0.2em] mb-2 font-medium">CHAPTER I</span>
              <h2 className="font-serif text-2xl md:text-3xl text-on-background mb-4 leading-tight">
                The Nocturne<br />Collection
              </h2>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant font-light leading-relaxed mb-6">
                Sensory opulence in liquid form. An enigmatic journey into the heart of the night, featuring Cambodian Oud, Black Iris, and Liquid Gold.
              </p>
              <button
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="group self-start flex items-center gap-3 border border-primary text-primary px-6 py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer"
              >
                EXPLORE COLLECTION
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.8 }}
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute bottom-6 right-6 md:right-12 z-30 flex items-center gap-3 text-on-surface/50 hover:text-primary transition-all duration-300 cursor-pointer hover:opacity-100"
            >
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase">SCROLL</span>
              <ArrowDown size={13} className="animate-bounce" />
            </motion.button>

            {/* Slideshow progress dots */}
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className="group relative py-2 flex items-center justify-end cursor-pointer"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <motion.span
                    animate={{
                      width: activeSlide === idx ? 24 : 8,
                      backgroundColor: activeSlide === idx ? '#ebc166' : 'rgba(234, 225, 215, 0.3)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-[1.5px] rounded-full transition-colors group-hover:bg-primary"
                  />
                </button>
              ))}
            </div>
          </>
        </AnimatePresence>
      </div>
    </div>
  );
}
