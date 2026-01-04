
import React, { useEffect, useState } from 'react';
// Fixed: use named imports from react-router-dom
import { Link } from 'react-router-dom';
import { Search, Users, Award, Zap, ChevronRight, TrendingUp, Code, Briefcase, Clock, ArrowRight, Layout, Rocket, Globe, X, Monitor, GraduationCap } from 'lucide-react';
import { Hero } from '../components/Hero';
import { StudentService } from '../services/studentService';
import { AlumniService } from '../services/alumniService';
import { MOCK_POSTS } from '../services/mockData';
import { RevealOnScroll } from '../components/UI';

/**
 * Reusable component for animating numbers from 0 to target.
 */
const AnimatedCounter: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <>{count}</>;
};

export const Home: React.FC = () => {
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [alumniCount, setAlumniCount] = useState<number | null>(null);
  const [showMobileAlert, setShowMobileAlert] = useState(true);

  // Calculate active counts from data
  const activeHackathons = MOCK_POSTS.filter(p => p.type === 'Hackathon').length;
  const activeProjects = MOCK_POSTS.filter(p => p.type === 'Project' || p.type === 'Competition' || p.type === 'Research').length;
  
  // Get lists for display
  const allHackathons = MOCK_POSTS.filter(p => p.type === 'Hackathon');
  // Limit projects to 2 as requested
  const displayProjects = MOCK_POSTS.filter(p => p.type !== 'Hackathon').slice(0, 2);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const students = await StudentService.getAllStudents();
        setStudentCount(students.length);
        
        const alumni = await AlumniService.getAllAlumni();
        setAlumniCount(alumni.length);
      } catch (error) {
        console.error("Failed to load campus stats", error);
        setStudentCount(0);
        setAlumniCount(0);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen pb-20 relative">
      <Hero />

      {/* Mobile Experience Alert */}
      {showMobileAlert && (
        <div className="lg:hidden fixed z-50 bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-primary/20 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-4 animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Monitor className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <h4 className="text-white font-bold text-sm">Desktop View Recommended</h4>
                <p className="text-xs text-textSecondary mt-0.5">For the best immersive experience, please use a desktop.</p>
            </div>
            <button onClick={() => setShowMobileAlert(false)} className="p-2 text-textSecondary hover:text-white bg-white/5 rounded-full"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Stats Strip - Expanded to 4 columns with Alumni */}
      <div className="bg-slate-900/50 border-y border-white/5 py-6 md:py-10 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x divide-white/5">
                <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-2xl md:text-5xl font-heading font-bold text-white mb-1 md:mb-2 group-hover:text-primary transition-colors">
                        {studentCount !== null ? <AnimatedCounter target={studentCount} /> : '...'}
                    </div>
                    <div className="text-[10px] md:text-xs text-textSecondary uppercase tracking-widest font-bold">Students</div>
                </div>
                <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-2xl md:text-5xl font-heading font-bold text-white mb-1 md:mb-2 group-hover:text-emerald-400 transition-colors">
                        {alumniCount !== null ? <AnimatedCounter target={alumniCount} /> : '...'}
                    </div>
                    <div className="text-[10px] md:text-xs text-textSecondary uppercase tracking-widest font-bold">Alumni</div>
                </div>
                <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-2xl md:text-5xl font-heading font-bold text-white mb-1 md:mb-2 group-hover:text-secondary transition-colors">
                        <AnimatedCounter target={activeHackathons} />
                    </div>
                    <div className="text-[10px] md:text-xs text-textSecondary uppercase tracking-widest font-bold">Hackathons</div>
                </div>
                 <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-2xl md:text-5xl font-heading font-bold text-white mb-1 md:mb-2 group-hover:text-pink-500 transition-colors">
                        <AnimatedCounter target={activeProjects} />
                    </div>
                    <div className="text-[10px] md:text-xs text-textSecondary uppercase tracking-widest font-bold">Projects</div>
                </div>
            </div>
        </div>
      </div>

      {/* Live Opportunities Section */}
      <section className="py-12 md:py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
                <div>
                   <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2 md:mb-3">Live Opportunities</h2>
                   <p className="text-textSecondary text-sm md:text-lg max-w-2xl">
                     Connect with peers for upcoming hackathons and active projects.
                   </p>
                </div>
                <Link to="/collaborate" className="flex items-center gap-2 text-primary hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-wider bg-white/5 px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 hover:bg-white/10 w-fit">
                   View All <ArrowRight className="w-4 h-4" />
                </Link>
             </div>

             {/* Active Hackathons Row */}
             <div className="mb-12">
                 <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-4 md:mb-6">
                    <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Featured Hackathons
                 </h3>
                 <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {allHackathons.map(post => (
                       <RevealOnScroll key={post.id} className="h-full" threshold={0.1}>
                           <div className="h-full bg-gradient-to-br from-slate-900 to-slate-900/50 border border-yellow-500/20 p-6 md:p-8 rounded-[24px] hover:border-yellow-500/50 transition-all group hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                  <Zap className="w-24 h-24 text-yellow-500" />
                              </div>
                              
                              <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
                                 <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-yellow-400/20">
                                    {post.type}
                                 </span>
                                 <span className="text-xs text-textSecondary flex items-center gap-1 font-mono">
                                    <Clock className="w-3 h-3" /> {post.postedAt}
                                 </span>
                              </div>
                              
                              <h4 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-yellow-400 transition-colors relative z-10">{post.title}</h4>
                              <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10 line-clamp-2 md:line-clamp-none">{post.description}</p>
                              
                              <div className="flex items-center justify-between mt-auto relative z-10 border-t border-white/5 pt-4 md:pt-6">
                                 <div className="flex -space-x-3">
                                    <img src={post.authorAvatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-900" alt=""/>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] md:text-xs text-white font-bold">
                                       +{post.openRoles}
                                    </div>
                                 </div>
                                 <button className="text-xs md:text-sm font-bold text-white bg-yellow-500/10 px-3 py-2 md:px-4 md:py-2 rounded-lg border border-yellow-500/20 hover:bg-yellow-500 hover:text-slate-900 transition-all">
                                    Join Squad
                                 </button>
                              </div>
                           </div>
                       </RevealOnScroll>
                    ))}
                 </div>
             </div>

             {/* Active Projects Grid (Limited to 2) */}
             <div>
                 <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-4 md:mb-6">
                    <Code className="w-5 h-5 text-cyan-400" /> Active Projects & Teams
                 </h3>
                 <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {displayProjects.map(post => (
                       <RevealOnScroll key={post.id} className="h-full" threshold={0.05}>
                           <div className="h-full bg-panel border border-white/5 p-5 md:p-6 rounded-[20px] hover:border-cyan-400/30 transition-all group hover:-translate-y-1 hover:shadow-lg flex flex-col">
                              <div className="flex justify-between items-start mb-4">
                                 <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                                     post.type === 'Competition' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                     post.type === 'Research' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                                     'bg-cyan-400/10 text-cyan-400 border-cyan-400/20'
                                 }`}>
                                    {post.type}
                                 </span>
                              </div>
                              
                              <h4 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">{post.title}</h4>
                              <p className="text-textSecondary text-xs mb-4 line-clamp-2 min-h-[2.5em]">{post.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                 {post.requiredSkills.slice(0,3).map(s => (
                                    <span key={s} className="text-[10px] px-2 py-1 bg-slate-950 rounded text-slate-400 border border-slate-800">{s}</span>
                                 ))}
                              </div>
                              
                              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                 <div className="flex items-center gap-2 text-xs text-textSecondary">
                                    <img src={post.authorAvatar} className="w-6 h-6 rounded-full" alt=""/>
                                    <span className="truncate max-w-[100px]">{post.authorName}</span>
                                 </div>
                                 <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                                    Details <ChevronRight className="w-3 h-3" />
                                 </span>
                              </div>
                           </div>
                       </RevealOnScroll>
                    ))}
                 </div>
             </div>
         </div>
      </section>

      {/* Features Section - Compact on Mobile */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-slate-950/50">
         {/* Decorative elements */}
         <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 md:mb-16 animate-fadeIn">
               <h2 className="text-2xl md:text-5xl font-heading font-bold text-white mb-4 md:mb-6">
                 Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">excel</span>
               </h2>
               <p className="text-textSecondary max-w-2xl mx-auto text-sm md:text-lg font-ui leading-relaxed hidden md:block">
                 We've built a platform that puts your skills front and center. Connect, collaborate, and compete with the best minds on campus.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
               <RevealOnScroll threshold={0.1}>
                  <Link to="/search" className="block h-full group">
                     <div className="h-full bg-panel/50 backdrop-blur-sm border border-white/5 rounded-[20px] md:rounded-[24px] p-6 md:p-8 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2 flex flex-row md:flex-col items-center md