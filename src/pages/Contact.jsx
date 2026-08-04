import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { addInquiry } from '../admin/adminStore';

export default function Contact({ isSection = false }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Acquisition",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      email: formData.email,
      type: formData.type,
      notes: formData.message,
    });
    setSubmitted(true);
  };

  const inquiryTypes = [
    "Acquisition Request",
    "Bespoke Fragrance Consultation",
    "Atelier Visit Booking",
    "Press & Partnerships"
  ];

  return (
    <div 
      id="contact"
      className={`${isSection ? "py-section-gap" : "pt-32 pb-section-gap"} px-6 max-w-7xl mx-auto border-t border-primary/5`}
    >
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-primary mb-4">ATELIER CONTACT</h1>
        <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
          Request private consultations, arrange atelier visits, or inquire about custom bespoke olfactory sculptures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Left Column: Contact details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-8 rounded-sm border-primary/10 space-y-6">
            <h3 className="font-serif text-2xl text-primary font-normal">Galerie Aetheris</h3>
            
            <div className="flex items-center gap-4 text-on-surface/80">
              <MapPin size={18} className="text-primary shrink-0" />
              <span className="font-sans text-xs tracking-wider">Bond Street, London W1S 1SR, United Kingdom</span>
            </div>

            <div className="flex items-center gap-4 text-on-surface/80">
              <Phone size={18} className="text-primary shrink-0" />
              <span className="font-sans text-xs tracking-wider">+44 20 7946 0958</span>
            </div>

            <div className="flex items-center gap-4 text-on-surface/80">
              <Mail size={18} className="text-primary shrink-0" />
              <span className="font-sans text-xs tracking-wider">atelier@aetherisperfumes.com</span>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-sm border-primary/10">
            <h4 className="font-serif text-lg text-primary mb-2">Private Consultations</h4>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Bespoke formulation consultations are hosted by chief nose Marcus Vane. Scheduling must be booked at least two weeks in advance.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div 
                key="contact-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-panel p-8 rounded-sm border-primary/10 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-surface-container/50 border-b border-primary/20 focus:border-primary text-on-background py-2 text-sm focus:outline-none transition-colors"
                        placeholder="Marcus Aurelius"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Your Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-surface-container/50 border-b border-primary/20 focus:border-primary text-on-background py-2 text-sm focus:outline-none transition-colors"
                        placeholder="marcus@empire.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Inquiry Category</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-[#16130d] border-b border-primary/20 focus:border-primary text-on-background py-2 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#16130d] text-on-background">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Your Message</label>
                    <textarea 
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-surface-container/50 border-b border-primary/20 focus:border-primary text-on-background py-2 text-sm focus:outline-none transition-colors resize-none"
                      placeholder="Detail your request..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-primary text-background font-sans font-medium text-xs tracking-[0.2em] py-4 uppercase hover:bg-primary-container transition-all active:scale-95 duration-300 cursor-pointer"
                  >
                    SUBMIT TO ATELIER
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="contact-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-panel p-12 text-center rounded-sm border-primary/10 shadow-2xl flex flex-col items-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full border border-primary flex items-center justify-center text-primary mb-6"
                >
                  <Check size={28} />
                </motion.div>
                
                <h3 className="font-serif text-3xl text-primary font-normal mb-2 tracking-wide">Inquiry Cataloged</h3>
                <p className="font-sans text-xs text-on-surface/60 mb-8 max-w-sm leading-relaxed">
                  Thank you for contacting the Aetheris Atelier. A concierge representative will review your request and contact you directly.
                </p>

                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", type: "Acquisition", message: "" });
                  }}
                  className="border border-primary text-primary font-sans font-medium text-xs tracking-[0.15em] px-8 py-3.5 uppercase hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
