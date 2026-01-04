
import React, { useEffect, useRef, useState } from 'react';
import { Student } from '../types';
import { X, UserPlus, UserCheck, Share2, Github, Linkedin, ExternalLink, Award, Zap, Code, Mail, Palette, Dumbbell } from 'lucide-react';

export const ParallaxElement: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 5, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable parallax if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      const offset = ref.current.offsetTop;
      if (scrolled + window.innerHeight > offset - 500 && scrolled < offset + 1000) {
          const val = (scrolled - offset) * (speed / 100);
          ref.current.style.transform = `translateY(${val}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
};

export const RevealOnScroll: React.FC<{
    children: React.ReactNode;
    className?: string;
    threshold?: number;
}> = ({ children, className = "", threshold = 0.1 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div 
            ref={ref} 
            className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
        >
            {children}
        </div>
    );
};

export const GlassCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}> = ({ children, className = "", hoverEffect = true }) => (
    <div className={`bg-panel border border-white/5 rounded-lg p-6 relative overflow-hidden ${hoverEffect ? 'hover:border-primary/30 hover:shadow-elev-2 hover:-translate-y-1 transition-all duration-300' : ''} ${className}`}>
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="relative z-10">{children}</div>
    </div>
);

export const StudentProfileModal: React.FC<{
    student: Student;
    onClose: () => void;
}> = ({ student, onClose }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const handleShare = () => {
        const url = `${window.location.origin}/#/student/${student.id}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg1/90 backdrop-blur-sm animate-fadeIn cursor-pointer"
            onClick={onClose}
        >
            <div 
                className="bg-panel w-full max-w-2xl max-h-[90vh] rounded-[24px] border border-white/10 shadow-elev-2 relative overflow-hidden flex flex-col cursor-default transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Gradient */}
                <div className="h-32 bg-gradient-to-r from-primary to-secondary relative shrink-0">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors border border-white/10 z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute inset-0 bg-white/5 opacity-30 mix-blend-overlay"></div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 -mt-12 custom-scrollbar relative z-10">
                    <div className="flex justify-between items-end mb-6">
                        <div className="relative">
                            <img 
                                src={student.avatar} 
                                alt={student.name} 
                                className="w-28 h-28 rounded-[24px] border-[6px] border-panel bg-panel object-cover shadow-xl"
                            />
                        </div>
                        <div className="flex gap-3 mb-2">
                             <button 
                                onClick={() => setIsFollowing(!isFollowing)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-sm font-ui font-semibold transition-all ${
                                    isFollowing 
                                    ? 'bg-white/5 text-success border border-success/20' 
                                    : 'bg-primary text-white hover:bg-blue-600 shadow-neon'
                                }`}
                            >
                                {isFollowing ? <><UserCheck className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Follow</>}
                            </button>
                            <button 
                                onClick={handleShare}
                                className="p-2.5 bg-white/5 border border-white/10 text-textSecondary hover:text-white rounded-[14px] transition-colors"
                            >
                                {copied ? <span className="text-success text-xs font-bold px-1">Copied</span> : <Share2 className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-heading font-bold text-white mb-1">{student.name}</h2>
                        <p className="font-ui text-textSecondary">{student.branch} • <span className="text-primary font-semibold">Year {student.year}</span></p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                         <div className="bg-bg1 border border-white/5 p-4 rounded-[16px] flex items-center gap-4">
                            <div className="p-3 bg-secondary/10 rounded-[12px] text-secondary"><Zap className="w-6 h-6" /></div>
                            <div>
                                <div className="text-[10px] text-textSecondary font-mono tracking-wider uppercase">Quiz Score</div>
                                <div className="text-2xl font-mono font-bold text-white">{student.quizScore}</div>
                            </div>
                         </div>
                         <div className="bg-bg1 border border-white/5 p-4 rounded-[16px] flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-[12px] text-primary"><Award className="w-6 h-6" /></div>
                            <div>
                                <div className="text-[10px] text-textSecondary font-mono tracking-wider uppercase">Badges</div>
                                <div className="text-2xl font-mono font-bold text-white">{student.badges.length + Math.floor(student.quizScore/15)}</div>
                            </div>
                         </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white/3 p-6 rounded-[20px] border border-white/5">
                            <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-3">About</h3>
                            <p className="text-textPrimary text-[15px] leading-relaxed whitespace-pre-wrap font-body">{student.bio}</p>
                        </div>

                        {/* Skills Sections */}
                        <div>
                            <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Code className="w-4 h-4 text-primary" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {student.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-primary/40 rounded-full text-xs font-medium text-textPrimary transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {student.hobbies && student.hobbies.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Palette className="w-4 h-4 text-secondary" /> Interests
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {student.hobbies.map(hobby => (
                                        <span key={hobby} className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-secondary/40 rounded-full text-xs font-medium text-textPrimary transition-colors">
                                            {hobby}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {student.sports && student.sports.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Dumbbell className="w-4 h-4 text-emerald-500" /> Sports & Activities
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {student.sports.map(sport => (
                                        <span key={sport} className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-emerald-500/40 rounded-full text-xs font-medium text-textPrimary transition-colors">
                                            {sport}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {student.projects.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-4">Featured Projects</h3>
                                <div className="space-y-4">
                                    {student.projects.map(p => (
                                        <div key={p.id} className="bg-bg1 border border-white/5 p-5 rounded-[16px] hover:border-white/20 transition-colors">
                                            <div className="font-heading font-bold text-white text-base mb-2">{p.title}</div>
                                            <p className="text-sm text-textSecondary mb-3 leading-relaxed">{p.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {p.techStack.map(ts => <span key={ts} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded-md text-textSecondary">{ts}</span>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div>
                             <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-4">Connect</h3>
                             <div className="flex flex-wrap gap-3">
                                 <a href={`mailto:${student.email}`} className="flex items-center gap-2 px-5 py-3 bg-bg1 border border-white/10 rounded-[14px] text-textSecondary hover:text-white hover:border-white/30 transition-all text-sm font-medium group">
                                     <Mail className="w-4 h-4 group-hover:text-primary transition-colors" /> Email
                                 </a>
                                 {student.socials.linkedin && (
                                     <a href={student.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/20 rounded-[14px] hover:bg-[#0077b5] hover:text-white transition-all text-sm font-medium">
                                         <Linkedin className="w-4 h-4" /> LinkedIn
                                     </a>
                                 )}
                                 {student.socials.github && (
                                     <a href={student.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-white/5 text-white border border-white/10 rounded-[14px] hover:bg-white/10 transition-all text-sm font-medium">
                                         <Github className="w-4 h-4" /> GitHub
                                     </a>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
