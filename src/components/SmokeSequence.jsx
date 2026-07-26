import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 192;
const currentFrame = (index) => `/smoke_frames/frame_${String(index).padStart(4, '0')}.jpg`;

export default function SmokeSequence() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(0);
  const headingRef = useRef(null);

  useEffect(() => {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set internal canvas resolution to match viewport (high DPI support can be added but 1x is usually fine for video frames)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images = [];
    const smokeAnim = { frame: 0 };
    let framesLoaded = 0;

    // Preload frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
      
      if (i === 1) {
        img.onload = () => {
          render();
          setLoaded(true);
        };
      }
    }

    function render() {
      if (!images[smokeAnim.frame]) return;
      const img = images[smokeAnim.frame];
      if (!img.complete) return; // ensure it's loaded
      
      frameRef.current = smokeAnim.frame;

      // Fade heading in/out based on frame — bottle clearly visible after ~100
      if (headingRef.current) {
        headingRef.current.style.opacity = smokeAnim.frame >= 100 ? '0' : '1';
      }

      // Calculate aspect ratio cover (object-cover equivalent for canvas)
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      // If user prefers reduced motion, we still render the first frame but don't pin/scrub
      if (prefersReducedMotion) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Scrub distance (3x viewport height for smooth 8s video)
        pin: true,
        scrub: 0.5, // 0.5s smoothing
        animation: gsap.to(smokeAnim, {
          frame: frameCount - 1,
          snap: 'frame',
          ease: 'none',
          onUpdate: render,
        }),
      });
    }, containerRef);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full aspect-[9/16] md:aspect-video bg-black overflow-hidden">
      {/* Loading state for the first frame */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-on-surface/50">
            Initializing Sequence...
          </span>
        </div>
      )}
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Vignette overlays to blend the video edges into the dark website theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-40 pointer-events-none" />
      
      {/* Optional luxury typography overlay */}
      <div
        ref={headingRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
        style={{ transition: 'opacity 0.6s ease' }}
      >
        <h2 className="font-serif text-4xl md:text-6xl text-white opacity-80 mix-blend-overlay tracking-wide drop-shadow-2xl text-center">
          Emerging from the Void
        </h2>
      </div>
    </section>
  );
}
