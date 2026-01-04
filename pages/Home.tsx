
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
 * AnimatedCounter component to smoothly animate numbers from 0 to target.
 */
const AnimatedCounter: React.FC<{ target: number; duration?: number }> = ({ target, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalSteps = duration / 16; // Approx 60fps
    const increment = end / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
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
        console.error("Failed to load student stats", error);
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

      {/* Stats Strip - Updated to 4 columns */}
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
                    <div className="text-2xl md:text-5xl font-heading font-bold text-white mb-1 md:mb-2 group-hover:text-emerald-500 transition-colors">
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
                     <div className="h-full bg-panel/50 backdrop-blur-sm border border-white/5 rounded-[20px] md:rounded-[24px] p-6 md:p-8 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-primary mb-0 md:mb-6 shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                           <Search className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        
                        <div>
                           <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3 font-heading">Smart Search</h3>
                           <p className="text-textSecondary text-xs md:text-base leading-relaxed mb-0 md:mb-6 font-ui">
                             Find teammates by specific skills, branch, or year using AI.
                           </p>
                        </div>
                        
                        <span className="hidden md:flex text-primary text-sm font-bold items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                          Find Talent <ChevronRight className="w-4 h-4" />
                        </span>
                     </div>
                  </Link>
               </RevealOnScroll>

               <RevealOnScroll threshold={0.2}>
                  <Link to="/collaborate" className="block h-full group">
                     <div className="h-full bg-panel/50 backdrop-blur-sm border border-white/5 rounded-[20px] md:rounded-[24px] p-6 md:p-8 hover:border-secondary/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-secondary mb-0 md:mb-6 shrink-0 group-hover:bg-secondary group-hover:text-white transition-all shadow-lg">
                           <Users className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        
                        <div>
                           <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3 font-heading">Collab Hub</h3>
                           <p className="text-textSecondary text-xs md:text-base leading-relaxed mb-0 md:mb-6 font-ui">
                             Post opportunities and join research projects effortlessly.
                           </p>
                        </div>
                        
                        <span className="hidden md:flex text-secondary text-sm font-bold items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                          Start Collaborating <ChevronRight className="w-4 h-4" />
                        </span>
                     </div>
                  </Link>
               </RevealOnScroll>

               <RevealOnScroll threshold={0.3}>
                  <Link to="/leaderboard" className="block h-full group">
                     <div className="h-full bg-panel/50 backdrop-blur-sm border border-white/5 rounded-[20px] md:rounded-[24px] p-6 md:p-8 hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-pink-500 mb-0 md:mb-6 shrink-0 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-lg">
                           <Award className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        
                        <div>
                           <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3 font-heading">Leaderboard</h3>
                           <p className="text-textSecondary text-xs md:text-base leading-relaxed mb-0 md:mb-6 font-ui">
                             Earn badges, take quizzes, and climb the ranks.
                           </p>
                        </div>
                        
                        <span className="hidden md:flex text-pink-500 text-sm font-bold items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                          View Ranks <ChevronRight className="w-4 h-4" />
                        </span>
                     </div>
                  </Link>
               </RevealOnScroll>

               <RevealOnScroll threshold={0.4}>
                  <Link to="/alumni" className="block h-full group">
                     <div className="h-full bg-panel/50 backdrop-blur-sm border border-white/5 rounded-[20px] md:rounded-[24px] p-6 md:p-8 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 relative overflow-hidden group-hover:-translate-y-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-500 mb-0 md:mb-6 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
                           <GraduationCap className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        
                        <div>
                           <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-3 font-heading">Alumni Network</h3>
                           <p className="text-textSecondary text-xs md:text-base leading-relaxed mb-0 md:mb-6 font-ui">
                             Connect with seniors for mentorship and referrals.
                           </p>
                        </div>
                        
                        <span className="hidden md:flex text-emerald-500 text-sm font-bold items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                          Connect Now <ChevronRight className="w-4 h-4" />
                        </span>
                     </div>
                  </Link>
               </RevealOnScroll>
            </div>
         </div>
      </section>

      {/* Value Props - Simplified on Mobile */}
      <section className="py-12 md:py-20 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <RevealOnScroll className="space-y-6 md:space-y-8">
                    <h2 className="text-2xl md:text-4xl font-heading font-bold text-white">
                        More than just a <span className="text-cyan-400">Directory</span>.
                    </h2>
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 shrink-0">
                                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg mb-1">Skill Analytics</h4>
                                <p className="text-textSecondary text-xs md:text-sm leading-relaxed">Visualize the campus skill distribution and find gaps.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                             <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                                <Code className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg mb-1">Portfolio Showcase</h4>
                                <p className="text-textSecondary text-xs md:text-sm leading-relaxed">Display your best projects to potential teammates.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                             <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg mb-1">Internship Ready</h4>
                                <p className="text-textSecondary text-xs md:text-sm leading-relaxed">Build a profile that stands out to recruiters.</p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
                
                {/* Hidden on Mobile to save space */}
                <RevealOnScroll className="relative hidden md:block" threshold={0.2}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                    <div className="relative bg-panel border border-white/10 rounded-3xl p-8 shadow-2xl">
                         <div className="flex items-center gap-4 mb-6">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500"></div>
                             <div>
                                 <div className="h-3 w-32 bg-white/20 rounded-full mb-2"></div>
                                 <div className="h-2 w-20 bg-white/10 rounded-full"></div>
                             </div>
                         </div>
                         <div className="space-y-3 mb-6">
                             <div className="h-2 w-full bg-white/10 rounded-full"></div>
                             <div className="h-2 w-5/6 bg-white/10 rounded-full"></div>
                             <div className="h-2 w-4/6 bg-white/10 rounded-full"></div>
                         </div>
                         <div className="flex gap-2">
                             <div className="h-8 w-20 bg-primary/20 rounded-lg border border-primary/20"></div>
                             <div className="h-8 w-20 bg-white/5 rounded-lg border border-white/10"></div>
                         </div>
                         
                         <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                             <div className="bg-green-500/20 text-green-400 p-2 rounded-lg">
                                 <Zap className="w-5 h-5" />
                             </div>
                             <div>
                                 <div className="text-white font-bold">Top 1%</div>
                                 <div className="text-xs text-textSecondary">Developer</div>
                             </div>
                         </div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
      </section>

      {/* Motive & Vector Art Section - Visible on all devices now */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[80px] md:blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Visual */}
                <RevealOnScroll className="relative flex justify-center order-2 lg:order-1">
                     <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                         {/* Orbits */}
                         <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]"></div>
                         <div className="absolute inset-12 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]"></div>
                         <div className="absolute inset-24 rounded-full border border-white/10 animate-[spin_20s_linear_infinite]"></div>
                         
                         {/* Floating Nodes */}
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-10 h-10 md:w-12 md:h-12 bg-slate-900 border border-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-bounce">
                            <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                         </div>
                         <div className="absolute bottom-10 right-0 w-10 h-10 md:w-12 md:h-12 bg-slate-900 border border-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse">
                            <Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                         </div>
                         <div className="absolute bottom-10 left-0 w-10 h-10 md:w-12 md:h-12 bg-slate-900 border border-green-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 animate-float">
                            <Layout className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                         </div>

                         {/* Central Core */}
                         <div className="absolute inset-0 m-auto w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full blur-2xl opacity-50"></div>
                         <div className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 bg-slate-900 border border-white/20 rounded-full flex items-center justify-center z-10 shadow-2xl">
                             <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] animate-ping"></div>
                         </div>
                         
                         {/* Abstract Lines */}
                         <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <svg className="w-full h-full animate-spin-slow">
                                <circle cx="50%" cy="50%" r="48%" stroke="url(#grad-circle)" strokeWidth="1" strokeDasharray="10 10" fill="none" />
                                <defs>
                                    <linearGradient id="grad-circle" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#22d3ee" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                         </div>
                     </div>
                </RevealOnScroll>
                
                {/* Text */}
                <RevealOnScroll className="order-1 lg:order-2 space-y-4 md:space-y-6">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
                        Fueling the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Innovation Engine</span>
                    </h2>
                    <p className="text-sm md:text-lg text-slate-300 leading-relaxed font-ui">
                        Our mission is simple: <strong>No student left isolated.</strong> <br/>
                        We are breaking down silos between departments to create a unified force of creators. Ideas shouldn't just stay in notebooks—they should turn into hackathon wins, research papers, and startups.
                    </p>
                    <div className="grid grid-cols-1 gap-4 mt-6">
                         <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                             <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 mt-1 shrink-0"><Users className="w-5 h-5" /></div>
                             <div>
                                 <h4 className="font-bold text-white text-lg">Community First</h4>
                                 <p className="text-xs md:text-sm text-textSecondary leading-relaxed">A support system that cheers for your code commits and celebrates your deployments. Together, we go further.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                             <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 mt-1 shrink-0"><Rocket className="w-5 h-5" /></div>
                             <div>
                                 <h4 className="font-bold text-white text-lg">Launchpad for Careers</h4>
                                 <p className="text-xs md:text-sm text-textSecondary leading-relaxed">Gain visibility among alumni and recruiters by actively contributing to the ecosystem. Your profile is your proof.</p>
                             </div>
                         </div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="py-12 md:py-20">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-900/40 to-violet-900/40 border border-white/10 rounded-[24px] md:rounded-[32px] p-8 md:p-16 text-center relative overflow-hidden group hover:border-white/20 transition-all">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               
               {/* Animated Background blob */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-secondary/20 transition-colors duration-700"></div>

               <div className="relative z-10">
                  <h2 className="text-2xl md:text-5xl font-heading font-bold text-white mb-4 md:mb-6">Ready to make your mark?</h2>
                  <p className="text-sm md:text-lg text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto font-ui">
                      Join hundreds of other students who are building, learning, and growing together.
                  </p>
                  <Link 
                    to="/register" 
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
                  >
                     Get Started Now <Zap className="w-5 h-5 fill-slate-900" />
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};
