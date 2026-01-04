import { studentGoogleLogin } from "../auth/student/studentAuth";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Network, Shield, ChevronRight, CheckCircle2, Building2, Linkedin, LogIn } from 'lucide-react';

interface RoleOptionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: React.ReactNode;
  delay: number;
  isSelected: boolean;
  onClick: () => void;
}

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const RoleOption: React.FC<RoleOptionProps> = ({ id, title, icon, description, details, delay, isSelected, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onClick={onClick}
      className={`
        group relative w-full p-6 cursor-pointer rounded-2xl border transition-all duration-500
        ${isSelected 
          ? 'bg-white/10 border-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,0.15)]' 
          : 'bg-white/5 border-white/5 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-lg'
        }
      `}
    >
      <div className="flex items-start gap-5">
        <div className={`
          p-3 rounded-xl transition-colors duration-500
          ${isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-white/10'}
        `}>
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold tracking-wide transition-colors ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
              {title}
            </h3>
            <motion.div
              animate={{ x: isSelected ? 5 : 0, opacity: isSelected ? 1 : 0.5 }}
              className="text-zinc-500 group-hover:text-zinc-300"
            >
              <ChevronRight size={18} />
            </motion.div>
          </div>
          
          <p className="mt-1 text-sm text-zinc-500 font-light leading-relaxed">
            {description}
          </p>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/10 text-xs text-zinc-400 cursor-default">
                   {details}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Active Indicator Glow */}
      {isSelected && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 rounded-2xl ring-1 ring-indigo-500/30 pointer-events-none"
          initial={false}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

const RoleCard: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

 const handleAuth = async (role: string) => {
  try {
    if (role === "student") {
      const user = await studentGoogleLogin();
      console.log("Verified MMMUT student:", user.email);
      window.location.href = "/student/onboarding";
    }
  } catch (error: any) {
    console.error("Authentication error:", error);

    if (error.message.includes("MMUT")) {
      alert("Please sign in using your official MMMUT Google account (@mmmut.ac.in).");
    } else {
      alert("Google sign-in failed. Please try again.");
    }
  }
};



  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden backdrop-blur-2xl bg-slate-950/40 border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-black/50"
      >
        {/* Card Header */}
        <div className="mb-8 pl-1">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs font-medium tracking-[0.2em] text-indigo-400 uppercase mb-2"
          >
            Access Gateway
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-2xl font-light text-white"
          >
            Continue as
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '40px' }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-transparent mt-4 rounded-full"
          />
        </div>

        {/* Roles */}
        <div className="space-y-4">
          <RoleOption
            id="student"
            title="Student"
            description="Currently enrolled at MMMUT"
            icon={<GraduationCap size={24} />}
            delay={1.4}
            isSelected={selectedRole === 'student'}
            onClick={() => setSelectedRole(selectedRole === 'student' ? null : 'student')}
            details={
              <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                 <p className="flex items-center gap-2 text-indigo-200">
                    <Building2 size={12} /> 
                    <span>Authorized via Google Workspace</span>
                 </p>
                 <p className="text-zinc-500 italic">@mmmut.ac.in address required</p>
                 <button 
                  onClick={(e) => { e.stopPropagation(); handleAuth('student'); }}
                  className="mt-3 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                 >
                   <GoogleIcon />
                   Sign in with Google <ChevronRight size={14} />
                 </button>
              </div>
            }
          />

          <RoleOption
            id="alumni"
            title="Alumni"
            description="Former students & graduates"
            icon={<Network size={24} />}
            delay={1.5}
            isSelected={selectedRole === 'alumni'}
            onClick={() => setSelectedRole(selectedRole === 'alumni' ? null : 'alumni')}
            details={
              <div className="space-y-3 pt-2" onClick={(e) => e.stopPropagation()}>
                 <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Roll Number / Username" 
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-black/40 transition-all"
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-black/40 transition-all"
                    />
                 </div>
                 
                 <button 
                  onClick={(e) => { handleAuth('alumni-login'); }}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 group/btn"
                 >
                   <LogIn size={14} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                   Login
                 </button>

                 <div className="flex items-center gap-3 my-1">
                    <div className="h-px bg-white/5 flex-1" />
                    <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">Or</span>
                    <div className="h-px bg-white/5 flex-1" />
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    <button 
                       onClick={() => handleAuth('alumni-google')}
                       className="flex items-center justify-center gap-2 py-2 bg-white text-zinc-900 hover:bg-zinc-200 rounded-lg text-xs font-semibold transition-colors"
                    >
                       <GoogleIcon />
                       Google
                    </button>
                    <button 
                       onClick={() => handleAuth('alumni-linkedin')}
                       className="flex items-center justify-center gap-2 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                       <Linkedin size={14} fill="currentColor" />
                       LinkedIn
                    </button>
                 </div>
              </div>
            }
          />

          <RoleOption
            id="faculty"
            title="Faculty"
            description="Teaching & administrative staff"
            icon={<Shield size={24} />}
            delay={1.6}
            isSelected={selectedRole === 'faculty'}
            onClick={() => setSelectedRole(selectedRole === 'faculty' ? null : 'faculty')}
            details={
               <div className="space-y-3 pt-2" onClick={(e) => e.stopPropagation()}>
                 <p className="flex items-center gap-2 text-amber-200/60 text-xs pl-1">
                    <CheckCircle2 size={12} /> 
                    <span>Authorized Faculty Personnel Only</span>
                 </p>
                 <button 
                  onClick={(e) => { handleAuth('faculty-google'); }}
                  className="w-full py-3 bg-white text-zinc-900 hover:bg-zinc-200 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:scale-[1.01]"
                 >
                   <GoogleIcon />
                   Sign in with Google
                 </button>
                 <p className="text-[10px] text-zinc-600 text-center">
                    Redirects to MMMUT Admin Workspace
                 </p>
              </div>
            }
          />
        </div>

        {/* Card Footer Decoration */}
        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M0 0H60V60" stroke="url(#card-gradient)" strokeWidth="1"/>
                <defs>
                    <linearGradient id="card-gradient" x1="60" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/>
                        <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleCard;