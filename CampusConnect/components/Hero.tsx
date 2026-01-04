
import React, { useEffect, useState } from 'react';
// Fixed: use named imports from react-router-dom
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Network, Cpu, Share2, Hexagon, CircuitBoard, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  
  // Typewriter state
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "The Digital Backbone of Campus Life where talent becomes Credible";

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter Effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 60); // Slightly faster for the longer text

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDuration: '10s' }}></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        
        {/* Left: Typography & CTA */}
        <div className="space-y-8 text-center lg:text-left animate-fadeIn">
          
          {/* Mobile/Tablet Decorative Art (Filler) */}
          <div className="lg:hidden flex justify-center items-center mb-10 relative h-32">
             <div className="absolute w-40 h-40 bg-gradient-to-tr from-primary/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
             <div className="relative z-10 grid grid-cols-2 gap-4 animate-float">
                 <div className="w-12 h-12 bg-slate-900/80 border border-white/10 rounded-xl flex items-center justify-center shadow-lg text-cyan-400 rotate-12 transform hover:rotate-0 transition-all">
                    <CircuitBoard className="w-6 h-6" />
                 </div>
                 <div className="w-12 h-12 bg-slate-900/80 border border-white/10 rounded-xl flex items-center justify-center shadow-lg text-purple-400 -rotate-6 transform hover:rotate-0 transition-all mt-6">
                    <Network className="w-6 h-6" />
                 </div>
             </div>
             <Sparkles className="absolute top-0 right-1/4 w-6 h-6 text-yellow-300 animate-spin-slow opacity-70" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
             <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
             <span className="text-xs font-mono text-textSecondary tracking-wide uppercase">VisionX Network Live</span>
          </div>
          
          <h1 className="font-heading font-bold text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[56px] lg:leading-[64px] tracking-tight">
            {/* Typewriter Effect Headline */}
            <span className="block text-white min-h-[1.2em]">
              {displayText}
              <span className={`inline-block w-[4px] h-[1em] bg-white ml-1 align-middle ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-neon animate-gradient-x text-[28px] sm:text-[36px] mt-4 block">
              Build Your Next Big Project.
            </span>
          </h1>
          
          <p className="font-ui text-lg sm:text-xl text-textSecondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
             The exclusive digital ecosystem for our campus. Showcase projects, find hackathon teammates, and climb the leaderboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
             <Link 
               to="/students" 
               className="group relative px-8 py-4 rounded-[20px] bg-gradient-to-r from-green-400 to-pink-500 text-white font-ui font-semibold text-lg shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
             >
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md"></div>
               <span className="relative">View Directory</span>
               <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link 
               to="/search" 
               className="px-8 py-4 rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-md text-white font-ui font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
             >
               Explore Talent
             </Link>
          </div>
        </div>

        {/* Right: Abstract Art Vector Visualization */}
        <div className="relative hidden lg:flex items-center justify-center h-[600px] perspective-[2000px]">
           <div 
             className="relative w-[500px] h-[500px] flex items-center justify-center transition-transform duration-100 ease-out will-change-transform"
             style={{ 
               transform: `rotateY(-5deg) rotateX(5deg) translateY(${offset * -0.05}px)`,
               transformStyle: 'preserve-3d'
             }}
           >
              {/* Central Glowing Orb */}
              <div className="absolute w-40 h-40 bg-gradient-to-br from-primary to-secondary rounded-full blur-[60px] animate-pulse"></div>
              
              {/* Central Node */}
              <div className="relative z-10 w-32 h-32 bg-panel/80 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-neon animate-float">
                  <Globe className="w-16 h-16 text-white" />
              </div>

              {/* Orbiting Satellite Nodes */}
              <div className="absolute w-full h-full animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-panel/90 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg rotate-0">
                      <Network className="w-8 h-8 text-cyan-400" />
                  </div>
              </div>

               <div className="absolute w-[80%] h-[80%] animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute bottom-0 right-0 w-14 h-14 bg-panel/90 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                      <Cpu className="w-7 h-7 text-violet-400" />
                  </div>
              </div>

               <div className="absolute w-[60%] h-[60%] animate-[spin_25s_linear_infinite]">
                  <div className="absolute top-1/2 left-0 -translate-x-1/2 w-12 h-12 bg-panel/90 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                      <Share2 className="w-6 h-6 text-pink-400" />
                  </div>
              </div>

              {/* Connecting Lines (SVG Overlay) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 animate-pulse">
                 <circle cx="50%" cy="50%" r="30%" fill="none" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="10 5" />
                 <circle cx="50%" cy="50%" r="45%" fill="none" stroke="url(#grad2)" strokeWidth="1" strokeDasharray="20 10" />
                 <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                     <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                 </defs>
              </svg>

              {/* Decorative Floating Code Tags */}
               <div className="absolute top-10 right-10 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-blue-300 animate-float" style={{ animationDelay: '0.5s' }}>
                  &lt;Collaborate /&gt;
               </div>
               <div className="absolute bottom-20 left-10 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-purple-300 animate-float" style={{ animationDelay: '1.5s' }}>
                  import Talent
               </div>
           </div>
           
           {/* Reflection / Shadow */}
           <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[30px] bg-black/40 blur-2xl rounded-[100%]"></div>
        </div>

      </div>
    </section>
  );
};
