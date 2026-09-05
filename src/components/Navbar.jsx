import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, X as XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../products';

export default function Navbar({ activeOverlay, onCloseOverlay, cartCount, onCartClick, visible = true, wishlist = [], onToggleWishlist, onAddToCart, onProductSelect }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState("home");
  const wishlistRef = useRef(null);
  const searchRef = useRef(null);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Collection", id: "collection" },
    { name: "Story", id: "story" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" }
  ];

  // Active section observer when scrolling on homepage
  useEffect(() => {
    if (activeOverlay) {
      setActiveSection("");
      return;
    }

    const sections = ["home", "collection", "story", "about", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeOverlay]);

  // Close wishlist dropdown on click outside
  useEffect(() => {
    if (!wishlistOpen) return;
    const handler = (e) => {
      if (wishlistRef.current && !wishlistRef.current.contains(e.target)) {
        setWishlistOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [wishlistOpen]);

  // Close search on click outside
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  const wishlistItems = Object.values(products).filter((p) => wishlist.includes(p.id));
  const searchResults = searchQuery.trim().length > 0
    ? Object.values(products).filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);

    if (id === 'collection') {
      if (activeOverlay) {
        onCloseOverlay();
        setTimeout(() => window.location.hash = '#collection', 100);
      } else {
        window.location.hash = '#collection';
      }
      return;
    }

    if (activeOverlay) {
      onCloseOverlay();
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  const isLinkActive = (id) => {
    if (id === 'collection' && activeOverlay) return false;
    if (activeOverlay) return false;
    return activeSection === id;
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-40 border-b border-on-background/10 bg-[#16130d]/20 backdrop-blur-xl transition-all duration-700 hover:bg-[#16130d]/30 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}>
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick("home")} 
            className="font-serif text-3xl tracking-tighter text-primary font-semibold hover:opacity-85 transition-opacity cursor-pointer"
          >
            AETHERIS
          </button>

          {/* Links (Desktop) */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const active = isLinkActive(link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                    active ? "text-primary" : "text-on-surface/70 hover:text-primary"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex space-x-4 items-center">
            {/* Search */}
            <div className="relative flex items-center hidden md:flex" ref={searchRef}>
              {searchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center gap-2 bg-white/5 border border-primary/20 rounded-sm px-3"
                >
                  <Search size={16} className="text-primary/60 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search fragrances..."
                    className="bg-transparent border-none outline-none text-on-surface text-xs py-2 w-48 font-sans placeholder:text-on-surface/20"
                    autoFocus
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="text-on-surface/40 hover:text-primary transition-colors p-1 cursor-pointer flex-shrink-0"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-primary hover:text-primary-container transition-colors p-2 hidden md:block cursor-pointer"
                  aria-label="Open Search"
                >
                  <Search size={20} />
                </button>
              )}

              {/* Search results dropdown */}
              <AnimatePresence>
                {searchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-3 w-80 bg-[#16130d]/95 backdrop-blur-2xl border border-primary/10 rounded-sm shadow-2xl overflow-hidden"
                  >
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.slice(0, 6).map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors border-b border-primary/5 last:border-b-0 cursor-pointer"
                          onClick={() => {
                            if (onProductSelect) onProductSelect(item.id);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <div className="w-10 h-12 flex-shrink-0 overflow-hidden rounded-sm bg-surface-container-low">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-xs text-on-surface truncate">{item.name}</p>
                            <p className="font-sans text-[10px] text-on-surface/40 mt-0.5">{item.tagline}</p>
                          </div>
                          <span className="font-sans text-[10px] text-primary/60 flex-shrink-0">{item.price["50ml"]} USD</span>
                        </div>
                      ))}
                      {searchResults.length > 6 && (
                        <div className="px-5 py-3 text-center border-t border-primary/5">
                          <span className="font-sans text-[10px] text-on-surface/30">{searchResults.length} results — refine your search</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <div className="relative" ref={wishlistRef}>
              <button
                onClick={() => setWishlistOpen((prev) => !prev)}
                className="text-primary hover:text-primary-container transition-colors relative p-2 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-background font-sans font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-background"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </button>

              <AnimatePresence>
                {wishlistOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="fixed top-20 left-1/2 -translate-x-1/2 md:absolute md:top-auto md:left-auto md:translate-x-0 md:right-0 mt-3 w-[92vw] md:w-[420px] bg-[#16130d]/95 backdrop-blur-2xl border border-primary/10 rounded-sm shadow-2xl overflow-hidden z-50"
                    >
                    <div className="px-5 py-4 border-b border-primary/5">
                      <span className="font-sans text-[10px] tracking-widest uppercase text-on-surface/50">Wishlist ({wishlist.length})</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {wishlistItems.length === 0 ? (
                        <div className="px-5 py-8 text-center">
                          <Heart size={24} className="mx-auto text-on-surface/20 mb-3" />
                          <p className="font-sans text-xs text-on-surface/30">Your wishlist is empty</p>
                        </div>
                      ) : (
                        wishlistItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors border-b border-primary/5 last:border-b-0">
                            <div className="w-10 h-12 flex-shrink-0 overflow-hidden rounded-sm bg-surface-container-low">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-sans text-xs text-on-surface truncate">{item.name}</p>
                              <p className="font-sans text-[10px] text-on-surface/40 mt-0.5">{item.price["50ml"]} USD</p>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                              <button
                                onClick={() => {
                                  onAddToCart({ ...item, price: item.price["50ml"], size: "50 ML" });
                                  onToggleWishlist(item.id);
                                  setWishlistOpen(false);
                                }}
                                className="text-on-surface/50 hover:text-primary transition-colors p-2"
                                aria-label="Add to cart"
                              >
                                <ShoppingBag size={14} />
                              </button>
                              <button
                                onClick={() => onToggleWishlist(item.id)}
                                className="text-on-surface/30 hover:text-red-400 transition-colors p-2"
                                aria-label="Remove from wishlist"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={onCartClick}
              className="text-primary hover:text-primary-container transition-colors relative p-2 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-background font-sans font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-background"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-primary hover:text-primary-container transition-colors p-2 md:hidden cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-2xl md:hidden"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-on-background/10">
              <span className="font-serif text-2xl text-primary font-semibold">AETHERIS</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary p-2 cursor-pointer"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8 py-16">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleLinkClick(link.id)}
                  className={`font-serif text-3xl tracking-wide cursor-pointer ${
                    isLinkActive(link.id) ? "text-primary" : "text-on-surface/60"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
