
import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Github, Linkedin, Twitter, Mail, Heart, Code } from 'lucide-react';
// Fixed: use named imports from react-router-dom
import { Link, useLocation } from 'react-router-dom';
import { AdminService, SiteContent } from '../services/adminService';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(AdminService.getContent());
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Listen for content updates from Admin Dashboard
  useEffect(() => {
    const handleUpdate = () => setContent(AdminService.getContent());
    window.addEventListener('content-updated', handleUpdate);
    return () => window.removeEventListener('content-updated', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Cyber Tech Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-950">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-cyber-grid opacity-60"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-900/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <Navbar />
      
      {/* Added pt-28 to push content below the fixed navbar */}
      <main className="flex-grow container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 relative z-10">
        {children}
      </main>

      <footer className="bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/60 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <span className="text-white font-bold text-lg">C</span>
                 </div>
                 <span className="font-bold text-2xl text-white tracking-tight">CampusConnect</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
                Empowering students with comprehensive opportunities, collaborative tools, and AI-driven growth. The LinkedIn for your campus life.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 hover:shadow-[0_0_10px_rgba(96,165,250,0.3)] transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:border-violet-400 hover:text-violet-400 hover:shadow-[0_0_10px_rgba(167,139,250,0.3)] transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-semibold text-white mb-6">About</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/our-story" className="hover:text-cyan-400 transition-colors">Our Story</Link></li>
                <li><Link to="/team" className="hover:text-cyan-400 transition-colors">Team</Link></li>
                <li><Link to="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link to="/vision" className="hover:text-cyan-400 transition-colors">Vision</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6">Resources</h3>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/search" className="hover:text-cyan-400 transition-colors">Find Talent</Link></li>
                <li><Link to="/collaborate" className="hover:text-cyan-400 transition-colors">Opportunities</Link></li>
                <li><Link to="/alumni" className="hover:text-cyan-400 transition-colors">Alumni Network</Link></li>
                <li><Link to="/quiz" className="hover:text-cyan-400 transition-colors">Skill Tests</Link></li>
                <li><Link to="/analytics" className="hover:text-cyan-400 transition-colors">Campus Stats</Link></li>
              </ul>
            </div>
            
             {/* Developer Info (Dynamic) */}
            <div>
              <h3 className="font-semibold text-white mb-6">Developer</h3>
              <Link to={content.developer.link} className="block bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-slate-800 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:text-violet-300 transition-colors">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-violet-200 transition-colors">{content.developer.name}</p>
                    <p className="text-xs text-violet-400">{content.developer.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate max-w-[150px]">{content.developer.email}</span>
                  </div>
                  <p className="text-xs italic pt-2 border-t border-slate-800 mt-2 group-hover:border-slate-700 transition-colors">
                    "{content.developer.quote}"
                  </p>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
             <p>© 2025 CampusConnect. All rights reserved.</p>
             <div className="flex gap-8">
               <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
               <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
             </div>
          </div>
          
          <div className="mt-16 text-center">
             <p className="text-slate-500 font-serif italic text-sm tracking-wide flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               With love from VisionX <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
