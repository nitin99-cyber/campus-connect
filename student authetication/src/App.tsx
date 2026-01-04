import React from 'react';
import { motion } from 'framer-motion';
import Background from './components/Background';
import RoleCard from './components/RoleCard';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Staggered text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const lineVariants = {
    hidden: { y: 100, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] // Custom quint ease for cinematic feel
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <Background />

      <main className="flex-1 relative z-10 flex flex-col lg:flex-row h-full">
        
        {/* LEFT SIDE: HERO (60%) */}
        <div className="flex-1 lg:flex-[1.4] flex flex-col justify-center px-8 sm:px-12 lg:px-24 pt-20 lg:pt-0 pb-12 lg:pb-24">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* MMMUT LOGO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 1 }}
              className="absolute -top-24 left-0 sm:-left-4 md:-left-6 p-4"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/e/e3/Madan_Mohan_Malaviya_University_of_Technology_logo.png" 
                alt="MMMUT Logo" 
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] opacity-90"
              />
            </motion.div>

            {/* Decoration Line */}
            <motion.div 
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
              className="w-24 h-1 bg-indigo-500 mb-8 mt-4 sm:mt-0" 
            />

            {/* Main Title - Static Color */}
            <div className="font-display font-semibold drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] cursor-default select-none">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-slate-200">
                
                <motion.div className="overflow-hidden" variants={lineVariants}>Madan Mohan</motion.div>
                <motion.div className="overflow-hidden" variants={lineVariants}>Malaviya</motion.div>
                
                <motion.div className="overflow-hidden" variants={lineVariants}>
                   <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl italic font-light tracking-normal opacity-80 block my-2 text-indigo-200">
                     University of
                   </span>
                </motion.div>
                
                <motion.div className="overflow-hidden" variants={lineVariants}>Technology</motion.div>
              </h1>
            </div>

            {/* Subtext */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mt-10 max-w-xl"
            >
              <h2 className="text-indigo-400 text-lg font-medium tracking-widest uppercase mb-2">Campus Connect</h2>
              <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed border-l-2 border-indigo-500/30 pl-6">
                The official verified digital ecosystem connecting students, alumni, and faculty through trusted academic identity.
              </p>
            </motion.div>

          </motion.div>
        </div>

        {/* RIGHT SIDE: ROLE CARD (40%) */}
        <div className="flex-1 lg:flex-1 flex items-center justify-center px-6 pb-24 lg:pb-0 lg:pr-24 relative">
          
          {/* Subtle glow behind the card area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <RoleCard />
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default App;