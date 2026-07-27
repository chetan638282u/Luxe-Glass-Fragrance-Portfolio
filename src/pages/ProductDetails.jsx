import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { products } from '../products';

export default function ProductDetails({ selectedProductId, onAddToCart, onClose, onProductSelect }) {
  const activeProduct = products[selectedProductId] || products["midnight-oud"];
  const [selectedSize, setSelectedSize] = useState("50 ML");

  const productColors = {
    "midnight-oud": "#c9a24b",
    "vetiver-noir": "#5b4300",
    "midnight-iris": "#c89d95",
    "oud-obscure": "#795902",
    "neroli-blanc": "#ebc166",
    "vetiver-obscura": "#5f3f39",
    "aurum": "#ffdf9e",
    "silent-musk": "#cfc5b5"
  };

  const companions = Object.values(products).filter(p => p.id !== activeProduct.id).slice(0, 4);

  const handleCompanionSelect = (id) => {
    onProductSelect(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
      className="pt-32 pb-section-gap px-6 max-w-7xl mx-auto"
    >
      {/* Back to Collection breadcrumb */}
      <div className="mb-12">
        <button 
          onClick={() => onClose()}
          className="font-sans text-[10px] tracking-widest text-on-surface/50 hover:text-primary uppercase transition-colors"
        >
          COLLECTION
        </button>
        <span className="text-on-surface/20 mx-2">/</span>
        <span className="font-sans text-[10px] tracking-widest text-primary uppercase">{activeProduct.name}</span>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Product Bottle Image */}
        <div className="lg:col-span-6 aspect-[3/4] bg-surface-container-lowest/10 glass-panel rounded-sm relative overflow-hidden flex items-center justify-center p-8 border border-primary/10">
          <div className="absolute inset-0 z-0">
            {/* Ambient background glow corresponding to product color */}
            <div 
              className="w-full h-full opacity-10 blur-3xl scale-75 rounded-full"
              style={{ backgroundColor: productColors[activeProduct.id] }}
            />
          </div>
          <img 
            src={activeProduct.image} 
            alt={activeProduct.name} 
            className="w-full h-full object-contain relative z-10 drop-shadow-2xl max-h-[500px]"
          />
        </div>

        {/* Right Column: Descriptions & Controls */}
        <div className="lg:col-span-6 space-y-8 lg:pl-6">
          {/* Header */}
          <div className="border-b border-primary/10 pb-6">
            <h1 className="font-serif text-4xl md:text-5xl text-on-background mb-2">{activeProduct.name}</h1>
            <p className="font-sans text-xs text-primary uppercase tracking-[0.2em]">{activeProduct.tagline}</p>
            <p className="font-serif text-2xl text-on-background mt-4">${activeProduct.price[selectedSize === "50 ML" ? "50ml" : "100ml"]} USD</p>
          </div>

          {/* Description */}
          <p className="font-sans text-base text-on-surface-variant font-light leading-relaxed">
            {activeProduct.description}
          </p>

          {/* Note Pyramid (Olfactory profile) */}
          <div className="space-y-4 bg-[#16130d]/30 border border-primary/5 p-6 rounded-sm">
            <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest border-b border-primary/10 pb-2">Olfactory Profile</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary mr-3 text-sm mt-0.5">♦</span>
                <div>
                  <strong className="font-serif text-sm text-on-background block">Top Notes</strong>
                  <span className="font-sans text-xs text-on-surface-variant">{activeProduct.notes.top}</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-sm mt-0.5">♦</span>
                <div>
                  <strong className="font-serif text-sm text-on-background block">Heart Notes</strong>
                  <span className="font-sans text-xs text-on-surface-variant">{activeProduct.notes.heart}</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-sm mt-0.5">♦</span>
                <div>
                  <strong className="font-serif text-sm text-on-background block">Base Notes</strong>
                  <span className="font-sans text-xs text-on-surface-variant">{activeProduct.notes.base}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Size Configurator */}
          <div>
            <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest mb-3">Select Volumetrics</h3>
            <div className="flex space-x-4">
              {["50 ML", "100 ML"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-3 border font-sans text-xs tracking-wider transition-colors ${
                    selectedSize === size 
                      ? "border-primary text-primary bg-primary/5" 
                      : "border-on-surface/10 text-on-surface/40 hover:border-primary/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => onAddToCart({ ...activeProduct, price: activeProduct.price[selectedSize === "50 ML" ? "50ml" : "100ml"], size: selectedSize })}
              className="flex-1 bg-primary text-background font-sans font-medium text-xs tracking-[0.2em] py-4 uppercase hover:bg-primary-container transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} />
              ADD TO BAG
            </button>
            <button 
              onClick={() => onAddToCart({ ...activeProduct, price: activeProduct.price[selectedSize === "50 ML" ? "50ml" : "100ml"], size: selectedSize })}
              className="flex-1 border border-primary text-primary font-sans font-medium text-xs tracking-[0.2em] py-4 uppercase hover:bg-primary hover:text-background transition-all"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* Curated Companions (Related Products) */}
      <div className="mt-24 border-t border-primary/10 pt-16">
        <h2 className="font-serif text-3xl text-center mb-12 text-on-surface">Curated Companions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {companions.map((comp) => (
            <div 
              key={comp.id} 
              onClick={() => handleCompanionSelect(comp.id)}
              className="glass-panel p-4 flex flex-col group cursor-pointer hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 rounded-sm"
            >
              <div className="aspect-square bg-surface-container-low mb-4 overflow-hidden relative border border-primary/5">
                <img 
                  src={comp.image} 
                  alt={comp.name} 
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                />
              </div>
              <h4 className="font-serif text-lg text-on-surface truncate group-hover:text-primary transition-colors">{comp.name}</h4>
              <p className="font-sans text-[9px] text-primary tracking-widest uppercase mt-1">{comp.category}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
