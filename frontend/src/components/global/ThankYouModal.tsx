'use client';

import React, { useEffect } from 'react';
import { CheckCircle, X, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouModal = ({ isOpen, onClose }: ThankYouModalProps) => {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="bg-obsidian border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative z-10 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-prestige-gold/5 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-power-red/5 blur-3xl pointer-events-none"></div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              <div className="p-4 bg-prestige-gold/10 rounded-full text-prestige-gold">
                <CheckCircle className="w-12 h-12" />
              </div>
            </motion.div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Thank You!</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Thank you for reaching out! One of our representatives will contact you shortly. In the meantime, you can call us or message us on WhatsApp.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+880 1700 000000"
                className="btn-primary w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>
            </div>

            {/* Secondary Close */}
            <button 
              onClick={onClose}
              className="mt-6 text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              Close Window
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThankYouModal;
