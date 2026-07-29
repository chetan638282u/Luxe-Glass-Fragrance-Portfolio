import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const WORDMARK_LETTERS = ['A', 'e', 't', 'h', 'e', 'r', 'i', 's'];
const SLOT_LETTER_INDEX = 4; // The second "e" (0-indexed: A=0, e=1, t=2, h=3, e=4)

export default function HeroSection({
  images = [],
  onIntroComplete = () => {},
  introPlayed = false,
  setIntroPlayed = () => {},
}) {
  const [introReady, setIntroReady] = useState(false);
  const [slideshowActive, setSlideshowActive] = useState(false);
  
  // Start the slideshow exactly where the intro sequence ends (3rd image, index 2)
  const [activeSlide, setActiveSlide] = useState(images.length > 2 ? 2 : (images.length > 0 ? images.length - 1 : 0));
  const prefersReducedMotion = false;
  const [slotRect, setSlotRect] = useState(null);

  const containerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const letterRefs = useRef([]);
  const slotLetterRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isFirstSlideshowRender = useRef(true);

  // Stabilize callback refs
  const onIntroCompleteRef = useRef(onIntroComplete);
  const setIntroPlayedRef = useRef(setIntroPlayed);
  useEffect(() => { onIntroCompleteRef.current = onIntroComplete; }, [onIntroComplete]);
  useEffect(() => { setIntroPlayedRef.current = setIntroPlayed; }, [setIntroPlayed]);

  // (prefers-reduced-motion check removed to ensure animation always plays)

  // Measure letter slot position
  const measureSlot = useCallback(() => {
    if (!slotLetterRef.current || !containerRef.current) return;
    const slotEl = slotLetterRef.current;
    const containerEl = containerRef.current;
    const slotBounds = slotEl.getBoundingClientRect();
    const containerBounds = containerEl.getBoundingClientRect();
    setSlotRect({
      top: slotBounds.top - containerBounds.top,
      left: slotBounds.left - containerBounds.left,
      width: slotBounds.width,
      height: slotBounds.height,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(measureSlot, 100);
    const observer = new ResizeObserver(measureSlot);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [measureSlot]);

  // Preload images in background but start intro immediately
  useEffect(() => {
    setIntroReady(true); // Fire instantly
    
    const toLoad = images.filter(Boolean);
    toLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // GSAP intro timeline
  useEffect(() => {
    if (!introReady || !slotRect) return;

    const imgContainer = imageContainerRef.current;
    const wordmark = wordmarkRef.current;
    if (!imgContainer || !wordmark) return;

    const otherLetters = letterRefs.current.filter((_, i) => i !== SLOT_LETTER_INDEX);
    const leftLetters = letterRefs.current.slice(0, SLOT_LETTER_INDEX);
    const rightLetters = letterRefs.current.slice(SLOT_LETTER_INDEX + 1);
    const slotLetter = slotLetterRef.current;

    // Set image container to slot position initially
    gsap.set(imgContainer, {
      position: 'absolute',
      top: slotRect.top,
      left: slotRect.left,
      width: slotRect.width,
      height: slotRect.height,
      opacity: 0,
      overflow: 'hidden',
      zIndex: 20,
      borderRadius: '2px',
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setSlideshowActive(true);
          setIntroPlayedRef.current(true);
          onIntroCompleteRef.current();
        },
      });

      // Step 1: Wordmark fade in
      tl.fromTo(wordmark, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });

      // Step 2: Zoom + letter removal
      tl.to(wordmark, {
        scale: 1.05,
        duration: 0.7,
        ease: 'power1.inOut',
      }, '+=0.1');

      tl.to(slotLetter, {
        opacity: 0,
        scale: 0.3,
        duration: 0.5,
        ease: 'power2.in',
      }, '<0.1');

      // Calculate extra space needed for a perfect square
      const extraWidth = slotRect.height - slotRect.width;
      const shiftAmount = extraWidth / 2;

      // Part the remaining letters to create a square gap
      tl.to(leftLetters, {
        x: -shiftAmount,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<');

      tl.to(rightLetters, {
        x: shiftAmount,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<');

      // Step 3: Fade in and expand image container to a perfect square simultaneously
      tl.to(imgContainer, {
        opacity: 1,
        width: slotRect.height,
        left: slotRect.left - shiftAmount,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<');

      tl.to(imgContainer, {
        boxShadow: '0 0 40px 5px rgba(235, 193, 102, 0.08)',
        duration: 0.3,
      }, '<0.2');

      // Limit the intro cycle to 3 images to speed up loading
      images.slice(0, 3).forEach((_, idx) => {
        const imgEl = imgContainer.querySelector(`[data-slide-index="${idx}"]`);
        if (!imgEl) return;

        if (idx === 0) {
          tl.set(imgEl, { opacity: 1 });
          tl.to({}, { duration: 1 });
        } else {
          const prevEl = imgContainer.querySelector(`[data-slide-index="${idx - 1}"]`);
          tl.to(prevEl, { opacity: 0, duration: 0.3, ease: 'power1.inOut' });
          tl.to(imgEl, { opacity: 1, duration: 0.3, ease: 'power1.inOut' }, '<');
          tl.to({}, { duration: 0.7 });
        }
      });

      // Step 4: Zoom last image to fill the hero section (not fixed — stays in flow)
      // Fade out all wordmark letters
      tl.to([...otherLetters, slotLetter], {
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      // Zoom image container to fully cover the background
      tl.to(imgContainer, {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '0px',
        boxShadow: 'none',
        duration: 1.2,
        ease: 'power3.inOut',
      }, '<');

      // Fade out the wordmark container
      tl.to(wordmark, {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      }, '<0.3');

    }, containerRef);

    return () => ctx.revert();
  }, [introReady, slotRect, introPlayed, prefersReducedMotion, images]);

  // Handle first slideshow render transition
  useEffect(() => {
    if (slideshowActive) {
      const timer = setTimeout(() => {
        isFirstSlideshowRender.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [slideshowActive]);

  // Step 5: Slideshow interval
  useEffect(() => {
    if (!slideshowActive || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [slideshowActive, images.length]);

  return (
    <div id="home">
      <div
        ref={containerRef}
        className="relative aspect-[9/16] md:aspect-video w-full flex items-center justify-center overflow-hidden bg-background"
      >
      {/* Hero gradient backdrop during intro */}
      {!slideshowActive && (
        <div className="absolute inset-0 z-0 hero-gradient pointer-events-none" />
      )}

      {/* Wordmark Layer */}
      {!slideshowActive && (
        <div
          ref={wordmarkRef}
          className="relative z-10 select-none flex items-center justify-center"
          style={{ transformOrigin: 'center center', opacity: 0 }}
        >
          <div className="flex items-baseline" style={{ fontSize: 'clamp(3rem, 14vw, 12rem)' }}>
            {WORDMARK_LETTERS.map((letter, idx) => {
              const isSlot = idx === SLOT_LETTER_INDEX;
              return (
                <span
                  key={idx}
                  ref={(el) => {
                    letterRefs.current[idx] = el;
                    if (isSlot) slotLetterRef.current = el;
                  }}
                  className="font-serif font-semibold text-on-background inline-block"
                  style={{
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    ...(idx === 0 ? { WebkitTextStroke: '1px #eae1d7' } : {}),
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Image container — positioned over the letter slot, zooms to fill hero */}
      {!slideshowActive && slotRect && (
        <div
          ref={imageContainerRef}
          style={{
            position: 'absolute',
            top: slotRect.top,
            left: slotRect.left,
            width: slotRect.width,
            height: slotRect.height,
            opacity: 0,
            overflow: 'hidden',
            zIndex: 20,
            borderRadius: '2px',
          }}
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              data-slide-index={idx}
              src={src}
              alt={`Perfume ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          ))}
        </div>
      )}

      {/* Slideshow layer — absolute inside hero, scrolls away with the page */}
      {slideshowActive && (
        <div className="absolute inset-0 z-0">
          {/* Subtle gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 z-10 pointer-events-none" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeSlide}
              initial={{ opacity: isFirstSlideshowRender.current ? 1 : 0 }}
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
      )}

      {/* UI chrome — absolute inside hero, scrolls away with the page */}
      <AnimatePresence>
        {slideshowActive && (
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
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
