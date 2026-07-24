import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout, onItemCheckout }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="w-screen max-w-md"
        >
          <div className="h-full flex flex-col glass-panel-heavy shadow-2xl">
            {/* Header */}
            <div className="px-6 py-6 border-b border-primary/10 flex justify-between items-center">
              <h2 className="font-serif text-2xl text-primary font-medium tracking-wide">Olfactory Bag</h2>
              <button 
                onClick={onClose} 
                className="text-primary hover:text-primary-container p-1 transition-colors"
                aria-label="Close Cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar divide-y divide-primary/5">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <p className="font-serif text-lg text-on-surface-variant font-light">Your bag is empty.</p>
                  <p className="font-sans text-xs text-on-surface/40 uppercase tracking-widest">Aether awaits your selection</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="py-6 flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-20 object-cover rounded-sm bg-surface-container-low border border-primary/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg text-on-background truncate">{item.name}</h3>
                      <p className="font-sans text-xs text-on-surface-variant mb-3">{item.tagline}</p>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-primary hover:text-primary-container p-1 border border-primary/10 hover:border-primary/30 transition-colors"
                          aria-label="Decrease Quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-sans text-xs text-on-background w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-primary hover:text-primary-container p-1 border border-primary/10 hover:border-primary/30 transition-colors"
                          aria-label="Increase Quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                      <div className="text-right">
                      <p className="font-serif text-base text-primary">${item.price * item.quantity}</p>
                      <div className="flex items-center justify-end gap-2 mt-3">
                        <button
                          onClick={() => onItemCheckout(item)}
                          className="font-sans text-[9px] tracking-[0.15em] uppercase border border-primary text-primary px-3 py-1.5 hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer"
                          aria-label={`Checkout ${item.name}`}
                        >
                          CHECKOUT
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-on-surface/30 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove Item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer and Checkout */}
            {cartItems.length > 0 && (
              <div className="px-6 py-6 border-t border-primary/10 space-y-6 bg-background/50">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs uppercase tracking-widest text-on-surface/60">Estimated Total</span>
                  <span className="font-serif text-2xl text-primary">${subtotal}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-primary text-background font-sans font-medium text-xs tracking-[0.2em] py-4 uppercase hover:bg-primary-container transition-all active:scale-95 duration-300"
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
