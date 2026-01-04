import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-0 left-0 w-full z-20 border-t border-white/5 bg-slate-950/80 backdrop-blur-md py-4 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
        
        {/* Left: About */}
        <div className="flex items-center gap-4 text-zinc-500">
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <p className="max-w-md text-center md:text-left">
              Campus Connect is a secure, identity-verified platform for Madan Mohan Malaviya University of Technology.
            </p>
        </div>

        {/* Right: Security */}
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-zinc-400">
                <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-20"></span>
                    <ShieldCheck size={14} className="text-emerald-500/80" />
                </div>
                <span className="tracking-wide uppercase text-[10px] font-semibold">Verified System</span>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-600 border-l border-white/5 pl-6">
                <Lock size={12} />
                <span>256-bit SSL Encrypted</span>
            </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;