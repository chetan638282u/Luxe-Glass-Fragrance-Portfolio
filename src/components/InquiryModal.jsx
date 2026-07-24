import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addInquiry } from '../admin/adminStore';

export default function InquiryModal({ isOpen, onClose, productName = "" }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: productName ? `I am interested in acquiring ${productName}.` : "I am interested in exploring Aetheris bespoke collections."
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      email: formData.email,
      notes: formData.notes,
      productName: productName,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
      />

      {/* Modal Card */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div 
            key="inquiry-form"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg glass-panel p-8 shadow-2xl rounded-sm z-10 border-primary/20"
          >
            {/* Close */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-primary hover:text-primary-container transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-3xl text-primary font-normal mb-2 tracking-wide text-center">Inquire</h3>
            <p className="font-sans text-[11px] text-on-surface/40 uppercase tracking-[0.2em] mb-8 text-center">Bespoke Acquisition Request</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-sans text-[10px] text-primary uppercase tracking-widest block mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#1c1912]/40 border-b border-primary/20 focus:border-primary text-on-background py-2 text-sm focus:outline-none transition-colors"
                  placeholder="Evelyn Vane"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] text-primary uppercase tracking-widest block mb-1">Your Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#1c1912]/40 border-b border-primary/20 focus:border-primary text-on-background py-2 text-sm focus:outline-none transition-colors"
                  placeholder="evelyn@domain.com"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] text-primary uppercase tracking-widest block mb-1">Inquiry Details</label>
                <textarea 
                  rows="3"
                  required
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-[#1c1912]/40 border-b border-primary/20 focus:border-primary text-on-background py-2 text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-background font-sans font-medium text-xs tracking-[0.2em] py-3.5 uppercase hover:bg-primary-container transition-all active:scale-95 duration-300"
              >
                SEND REQUEST
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="success-screen"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md glass-panel p-10 text-center shadow-2xl rounded-sm z-10 border-primary/20 flex flex-col items-center"
          >
            {/* Checkmark animation */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full border border-primary flex items-center justify-center text-primary mb-6"
            >
              <Check size={28} />
            </motion.div>

            <h3 className="font-serif text-3xl text-primary font-normal mb-2 tracking-wide">Request Received</h3>
            <p className="font-sans text-xs text-on-surface/60 mb-6 leading-relaxed">
              Your inquiry has been cataloged. Our olfactory concierges will reach out within 24 hours to coordinate your acquisition.
            </p>

            <button 
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="border border-primary text-primary font-sans font-medium text-xs tracking-[0.15em] px-8 py-3.5 uppercase hover:bg-primary hover:text-background transition-all duration-300"
            >
              RETURN TO GALERIE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
