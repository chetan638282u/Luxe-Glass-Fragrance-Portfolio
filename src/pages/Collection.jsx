import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../products';

export default function Collection({ isSection = false, onProductSelect, wishlist = [], onToggleWishlist, onAddToCart }) {
  const [filter, setFilter] = useState("all");

  const productList = Object.values(products);
  const filteredProducts = filter === "all" 
    ? productList 
    : productList.filter(p => p.category === filter);

  const filterTabs = [
    { name: "ALL SCENTS", id: "all" },
    { name: "FLORAL", id: "floral" },
    { name: "WOODY", id: "woody" },
    { name: "ORIENTAL", id: "oriental" },
    { name: "CITRUS", id: "citrus" }
  ];

  const handleProductSelect = (id) => {
    onProductSelect(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(timer);
  }, [filter]);

  return (
    <div 
      id="collection"
      className={`${isSection ? "py-section-gap" : "pt-32 pb-section-gap"} px-6 max-w-7xl mx-auto border-t border-primary/5`}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-primary mb-4">
          THE COLLECTION
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
          Explore our portfolio of olfactory art. Each composition is a study in sensory opulence, crafted with rare botanicals and profound depth.
        </p>
      </div>

      {/* Segmented Filter Pills */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#16130d]/30 backdrop-blur-md border border-primary/10 rounded-full p-1.5 flex flex-wrap justify-center gap-1 shadow-lg">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-full px-6 py-2.5 font-sans text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                filter === tab.id 
                  ? "bg-primary text-background font-medium shadow-md" 
                  : "text-on-surface hover:text-primary hover:bg-surface/40"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-gutter">
        <AnimatePresence>
          {filteredProducts.map((prod, idx) => (
            <motion.article 
              layout
              key={prod.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              onClick={() => handleProductSelect(prod.id)}
              className="group relative flex flex-col bg-[#16130d]/20 backdrop-blur-xl border border-primary/5 hover:border-primary/20 transition-all duration-500 overflow-hidden rounded-sm cursor-pointer"
            >
              {/* Product Card Image Container */}
              <div className="aspect-[3/4] bg-surface-container-lowest relative overflow-hidden border-b border-primary/5">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover transition-all duration-750 group-hover:scale-[1.02] opacity-95 group-hover:opacity-100"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(prod.id); }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all z-10 cursor-pointer"
                  aria-label={wishlist.includes(prod.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    size={16}
                    className={`transition-colors ${
                      wishlist.includes(prod.id) ? 'text-primary' : 'text-white/80'
                    }`}
                    style={wishlist.includes(prod.id) ? { fill: '#ebc166' } : { fill: 'none' }}
                  />
                </button>
              </div>

              {/* Info content */}
              <div className="p-8 flex flex-col flex-grow justify-between bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                <div>
                  <h2 className="font-serif text-2xl text-primary mb-1 uppercase tracking-wide">{prod.name}</h2>
                  <p className="font-sans text-xs text-on-surface-variant font-light truncate">{prod.tagline}</p>
                </div>
                <div className="mt-8">
                  <p className="font-sans text-xs text-on-surface/50 tracking-wider mb-6">{prod.price["50ml"]} USD | 50 ML</p>

                  <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart({ ...prod, price: prod.price["50ml"], size: "50 ML" }); }}
                    className="w-full border border-primary text-primary px-5 py-3 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
