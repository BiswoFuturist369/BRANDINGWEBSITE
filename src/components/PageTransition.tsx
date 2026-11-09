import React from 'react';
import { motion } from 'framer-motion';
import { URBrandLogo } from './Logo';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {/* Black Curtain Wipe on Page Change */}
      <motion.div
        className="fixed inset-0 z-[9990] bg-[#0A0A0A] pointer-events-none flex items-center justify-center"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 0], scale: [0.95, 1, 0.95] }}
          transition={{ duration: 0.7, times: [0, 0.5, 1] }}
          className="text-white"
        >
          <URBrandLogo compact className="text-white" />
        </motion.div>
      </motion.div>

      {/* Main page content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  );
};

