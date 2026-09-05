import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Check, ChevronDown } from 'lucide-react';
import { products } from '../products';

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer group" onClick={(e) => { e.preventDefault(); onChange(); }}>
    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${checked ? 'bg-primary border-primary' : 'border-on-surface/30 group-hover:border-primary/60'}`}>
      {checked && <Check size={12} className="text-background" />}
    </div>
    <span className={`font-sans text-xs tracking-wider uppercase transition-colors ${checked ? 'text-primary' : 'text-on-surface/70 group-hover:text-on-surface'}`}>
      {label}
    </span>
  </label>
);

const Accordion = ({ id, title, children, isOpen, selectedCount, onToggle }) => (
  <div className="border-b border-primary/5 pb-2">
    <button 
      onClick={() => onToggle(id)}
      className="flex justify-between items-center w-full py-2 cursor-pointer group"
    >
      <div className="flex items-center gap-2">
        <h4 className="font-sans text-xs text-on-surface/50 group-hover:text-primary tracking-[0.2em] uppercase transition-colors">{title}</h4>
        {selectedCount > 0 && <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px]">{selectedCount}</span>}
      </div>
      <ChevronDown 
        size={16} 
        className="text-on-surface/50 transition-transform duration-300" 
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} 
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="pt-2 pb-4 space-y-2">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Collection({ onClose, onProductSelect, wishlist = [], onToggleWishlist, onAddToCart }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
    occasion: [],
    size: [],
    maxPrice: 40
  });

  const productList = Object.values(products);
  
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleFilterToggle = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      
      return { ...prev, [type]: updated };
    });
  };

  const filteredProducts = productList.filter(p => {
    // Check gender
    if (filters.gender.length > 0 && !filters.gender.includes(p.gender)) {
      return false;
    }
    // Check category
    if (filters.category.length > 0 && !filters.category.includes(p.category)) {
      return false;
    }
    // Check occasion
    if (filters.occasion.length > 0 && !filters.occasion.includes(p.occasion)) {
      return false;
    }
    // Check size
    if (filters.size.length > 0) {
      const hasSize = filters.size.some(s => {
        if (s === '50 ML' && p.price['50ml']) return true;
        if (s === '100 ML' && p.price['100ml']) return true;
        return false;
      });
      if (!hasSize) return false;
    }
    
    // Determine which price to check against the slider
    const priceKey = (filters.size.includes('100 ML') && !filters.size.includes('50 ML')) ? '100ml' : '50ml';
    if (p.price[priceKey] > filters.maxPrice) {
      return false;
    }
    return true;
  });

  const clearFilters = () => {
    setFilters({ gender: [], category: [], occasion: [], size: [], maxPrice: 40 });
    setOpenAccordion(null);
  };

  const handleProductSelect = (id) => {
    if(onProductSelect) {
      onProductSelect(id);
    }
  };

  return (
    <div className="min-h-screen bg-background relative pt-20 pb-24 lg:pr-80">
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[100] w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-background transition-all cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      )}

      <div className="px-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-primary mb-4">
            THE COLLECTION
          </h1>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
            Explore our complete portfolio of olfactory art, tailored for every occasion. Each composition is a study in sensory opulence, crafted with rare botanicals and profound depth.
          </p>
        </div>

        <div className="w-full">
          {/* Product Grid Container (Left) */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-gutter">
              <AnimatePresence>
                {filteredProducts.map((prod, idx) => {
                  const displaySize = (filters.size.includes('100 ML') && !filters.size.includes('50 ML')) ? '100 ML' : '50 ML';
                  const priceKey = displaySize === '100 ML' ? '100ml' : '50ml';
                  const displayPrice = prod.price[priceKey];

                  return (
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
                          <p className="font-sans text-xs text-on-surface/50 tracking-wider mb-6">{displayPrice} USD | {displaySize}</p>

                          <button
                            onClick={(e) => { e.stopPropagation(); onAddToCart({ ...prod, price: displayPrice, size: displaySize }); }}
                            className="w-full border border-primary text-primary px-5 py-3 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer"
                          >
                            ADD TO BAG
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
                
                {filteredProducts.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="col-span-full py-24 text-center border border-primary/10 bg-white/5 rounded-sm"
                  >
                    <p className="font-sans text-sm text-on-surface/50 tracking-widest uppercase mb-4">No fragrances found</p>
                    <button 
                      onClick={clearFilters}
                      className="text-primary hover:text-primary-container border-b border-primary pb-1 font-sans text-xs tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Permanent Sidebar (Right) */}
          <aside className="fixed top-0 right-0 h-[100vh] w-full lg:w-80 bg-surface-container-low border-l border-primary/10 flex flex-col z-[60] shadow-2xl lg:shadow-none">
            <div className="p-6 pt-24 border-b border-primary/10 flex justify-between items-end flex-shrink-0">
              <h3 className="font-serif text-2xl text-primary tracking-wider">FILTER</h3>
              <span className="font-sans text-[10px] text-on-surface/50 tracking-widest uppercase mb-1">{filteredProducts.length} Results</span>
            </div>

            <div className="p-6 space-y-8 flex-1 overflow-y-auto overscroll-contain">
              {/* Price Range */}
              <div>
                <div className="flex justify-between items-end mb-4 pb-2 border-b border-primary/5">
                  <h4 className="font-sans text-xs text-on-surface/50 tracking-[0.2em] uppercase">Max Price</h4>
                  <span className="font-sans text-xs text-primary">${filters.maxPrice}</span>
                </div>
                <div className="pt-2 pb-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="300" 
                    step="5"
                    value={filters.maxPrice} 
                    onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                    className="w-full accent-primary h-1 rounded-full cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="font-sans text-[10px] text-on-surface/40">$0</span>
                    <span className="font-sans text-[10px] text-on-surface/40">$300</span>
                  </div>
                </div>
              </div>

              {/* Gender Accordion */}
              <Accordion id="gender" title="Gender" isOpen={openAccordion === 'gender'} selectedCount={filters.gender.length} onToggle={toggleAccordion}>
                <Checkbox label="Unisex" checked={filters.gender.includes('Unisex')} onChange={() => handleFilterToggle('gender', 'Unisex')} />
                <Checkbox label="Feminine" checked={filters.gender.includes('Feminine')} onChange={() => handleFilterToggle('gender', 'Feminine')} />
                <Checkbox label="Masculine" checked={filters.gender.includes('Masculine')} onChange={() => handleFilterToggle('gender', 'Masculine')} />
              </Accordion>

              {/* Fragrance Family Accordion */}
              <Accordion id="category" title="Fragrance Family" isOpen={openAccordion === 'category'} selectedCount={filters.category.length} onToggle={toggleAccordion}>
                <Checkbox label="Floral" checked={filters.category.includes('floral')} onChange={() => handleFilterToggle('category', 'floral')} />
                <Checkbox label="Woody" checked={filters.category.includes('woody')} onChange={() => handleFilterToggle('category', 'woody')} />
                <Checkbox label="Oriental" checked={filters.category.includes('oriental')} onChange={() => handleFilterToggle('category', 'oriental')} />
                <Checkbox label="Citrus" checked={filters.category.includes('citrus')} onChange={() => handleFilterToggle('category', 'citrus')} />
              </Accordion>

              {/* Occasion Accordion */}
              <Accordion id="occasion" title="Occasion" isOpen={openAccordion === 'occasion'} selectedCount={filters.occasion.length} onToggle={toggleAccordion}>
                <Checkbox label="Party" checked={filters.occasion.includes('party')} onChange={() => handleFilterToggle('occasion', 'party')} />
                <Checkbox label="Club" checked={filters.occasion.includes('club')} onChange={() => handleFilterToggle('occasion', 'club')} />
                <Checkbox label="Sports" checked={filters.occasion.includes('sports')} onChange={() => handleFilterToggle('occasion', 'sports')} />
                <Checkbox label="Casual" checked={filters.occasion.includes('casual')} onChange={() => handleFilterToggle('occasion', 'casual')} />
                <Checkbox label="Office" checked={filters.occasion.includes('office')} onChange={() => handleFilterToggle('occasion', 'office')} />
              </Accordion>

              {/* Size Accordion */}
              <Accordion id="size" title="Quantity" isOpen={openAccordion === 'size'} selectedCount={filters.size.length} onToggle={toggleAccordion}>
                <Checkbox label="50 ML" checked={filters.size.includes('50 ML')} onChange={() => handleFilterToggle('size', '50 ML')} />
                <Checkbox label="100 ML" checked={filters.size.includes('100 ML')} onChange={() => handleFilterToggle('size', '100 ML')} />
              </Accordion>
            </div>

            <div className="p-6 border-t border-primary/10 bg-background/50 flex-shrink-0">
              <button 
                onClick={clearFilters}
                className="w-full py-3 font-sans text-xs tracking-widest uppercase border border-primary/20 text-on-surface/70 hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
