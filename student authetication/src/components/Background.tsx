import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-slate-950">
      {/* Deep Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0f1021] to-[#1a1025]" />

      {/* Animated Gradient Orbs - Left */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px]"
      />

      {/* Animated Gradient Orbs - Right */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-purple-900/10 rounded-full blur-[130px]"
      />

      {/* Architectural Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      />

      {/* Abstract Vector Lines - Starburst effect */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05] mix-blend-overlay">
        <circle cx="50%" cy="50%" r="30%" stroke="white" strokeWidth="1" fill="none" />
        <circle cx="50%" cy="50%" r="45%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="10 20" />
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="0.5" />
      </svg>

      {/* Ambient Dust Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 0.4, 0],
            scale: [0, Math.random() * 2 + 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
          }}
        />
      ))}
    </div>
  );
};

export default Background;