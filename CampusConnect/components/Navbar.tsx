
import React, { useEffect, useState } from 'react';
// Fixed: use named imports from react-router-dom
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit, UserCircle, LogIn, UserPlus, GraduationCap } from 'lucide-react';
import { StudentService } from '../services/studentService';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const students = await StudentService.getAllStudents();
        setStudentCount(students.length);
      } catch (error) {
        console.error("Failed to load nav count", error);
      }
    };
    loadCount();
  }, []);

  // Hide nav on full-screen auth pages
  if (location.pathname === '/login') return null;

  const isActive = (path: string) => location.pathname === path;

  // Main Text Links
  const mainNavItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search' },
    { path: '/students', label: 'Directory' },
    { path: '/alumni', label: 'Alumni', icon: <GraduationCap className="w-3 h-3 mr-1" /> },
    { path: '/collaborate', label: 'Collab' },
    { path: '/leaderboard', label: 'Ranks' },
    { path: '/analytics', label: 'Stats' },
    { path: '/quiz', label: 'Skill', icon: <BrainCircuit className="w-3 h-3 mr-1" /> },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 border-b border-white/5 ${scrolled ? 'h-[72px] bg-bg1/90 backdrop-blur-xl shadow-lg' : 'h-[80px] bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-display text-xl pt-1 shadow-lg">
               V
            </div>
            <div className="flex flex-col">
               <span className="font-heading font-bold text-xl text-white tracking-wide leading-none uppercase">VISION<span className="text-primary">X</span></span>
            </div>
          </Link>

          {/* Desktop Main Nav (Center) */}
          <div className="hidden lg:flex items-center gap-1 mx-4">
            {mainNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    active ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions (Right) */}
          <div className="hidden lg:flex items-center gap-3">
             <Link 
                to="/login"
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
             >
                Login
             </Link>
             <Link 
                to="/register"
                className="px-5 py-2.5 rounded-full bg-white text-slate-900 text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-lg"
             >
                Join
             </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <Link to="/login" className="text-white bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold uppercase">
               Login
            </Link>
            <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)}>
               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-slate-950/95 backdrop-blur-3xl border-t border-white/10 p-6 z-40 animate-fadeIn flex flex-col overflow-y-auto">
           <div className="grid gap-2 mb-8">
             {/* Main Items */}
             {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-4 rounded-xl border font-heading font-bold text-lg uppercase ${
                      isActive(item.path) 
                        ? 'bg-white/10 text-white border-transparent' 
                        : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
             ))}
             
             {/* Mobile Actions */}
             <div className="mt-4 grid grid-cols-2 gap-4">
                 <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase"
                 >
                    <LogIn className="w-4 h-4" /> Login
                 </Link>
                 <Link 
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold uppercase shadow-lg"
                 >
                    <UserPlus className="w-4 h-4" /> Join
                 </Link>
             </div>
           </div>
        </div>
      )}
    </nav>
  );
};
