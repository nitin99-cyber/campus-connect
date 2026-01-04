import React, { useState, useEffect } from 'react';
import { StudentService } from '../services/studentService';
import { Student } from '../types';
import { Trophy, Medal, Star, ChevronLeft, ChevronRight, Brain, Rocket } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<'quiz' | 'builder'>('quiz');
  const itemsPerPage = 20;

  useEffect(() => {
    const loadData = async () => {
      const allStudents = await StudentService.getAllStudents();
      setStudents(allStudents);
    };
    loadData();
  }, []);
  
  const sortedStudents = [...students].sort((a, b) => {
    if (sortType === 'quiz') {
      return b.quizScore - a.quizScore;
    } else {
      const scoreA = (a.projects.length * 500) + (a.badges.length * 100);
      const scoreB = (b.projects.length * 500) + (b.badges.length * 100);
      return scoreB - scoreA;
    }
  });

  const totalPages = Math.ceil(Math.min(sortedStudents.length, 100) / itemsPerPage);
  const currentStudents = sortedStudents.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getRankStyle = (index: number) => {
    const rank = (page - 1) * itemsPerPage + index + 1;
    if (rank === 1) return { icon: <Trophy className="w-6 h-6 text-yellow-400" />, border: 'border-yellow-500/50', shadow: 'shadow-[0_0_20px_rgba(234,179,8,0.2)]', scale: 'scale-105 my-2 z-10' };
    if (rank === 2) return { icon: <Medal className="w-6 h-6 text-slate-300" />, border: 'border-slate-400/50', shadow: 'shadow-[0_0_15px_rgba(148,163,184,0.1)]', scale: 'scale-100' };
    if (rank === 3) return { icon: <Medal className="w-6 h-6 text-amber-700" />, border: 'border-amber-700/50', shadow: 'shadow-[0_0_15px_rgba(180,83,9,0.1)]', scale: 'scale-100' };
    return { icon: <span className="font-mono font-bold text-textSecondary">{rank}</span>, border: 'border-white/5', shadow: '', scale: 'scale-100' };
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="font-heading font-bold text-4xl text-white tracking-tight mb-2">Campus Leaderboard</h1>
        <p className="font-ui text-textSecondary">Celebrating the top minds and makers.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-panel border border-white/10 p-1 rounded-full flex relative">
          <button
            onClick={() => { setSortType('quiz'); setPage(1); }}
            className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
              sortType === 'quiz' ? 'text-white' : 'text-textSecondary hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" /> Quiz Champions
          </button>
          <button
            onClick={() => { setSortType('builder'); setPage(1); }}
            className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${
              sortType === 'builder' ? 'text-white' : 'text-textSecondary hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4" /> Top Builders
          </button>
          
          {/* Animated Background Pill */}
          <div className={`absolute top-1 bottom-1 w-[50%] bg-gradient-to-r from-green-400 to-pink-500 rounded-full transition-transform duration-300 ${sortType === 'builder' ? 'translate-x-[100%]' : 'translate-x-0'}`}></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-textSecondary uppercase tracking-wider">
           <div className="col-span-2 text-center">Rank</div>
           <div className="col-span-5 md:col-span-4">Student</div>
           <div className="col-span-3 hidden md:block">Branch</div>
           <div className="col-span-3 md:col-span-3 text-right">Score</div>
        </div>

        {currentStudents.map((student, index) => {
           const style = getRankStyle(index);
           const isTop3 = (page - 1) * itemsPerPage + index < 3;
           
           return (
            <div 
              key={student.id} 
              className={`grid grid-cols-12 gap-4 items-center bg-panel border ${style.border} rounded-[16px] p-4 transition-all hover:bg-white/5 ${style.shadow} ${style.scale} ${isTop3 ? 'bg-bg1/80 backdrop-blur-md' : ''}`}
            >
                <div className="col-span-2 flex justify-center">
                   <div className={`w-10 h-10 flex items-center justify-center rounded-full ${isTop3 ? 'bg-white/5 ring-1 ring-white/10' : ''}`}>
                      {style.icon}
                   </div>
                </div>
                <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                   <img src={student.avatar} className="w-10 h-10 rounded-full bg-bg1 object-cover" alt="" />
                   <div className="min-w-0">
                      <div className="font-ui font-bold text-white truncate">{student.name}</div>
                      <div className="md:hidden text-xs text-textSecondary truncate">{student.branch}</div>
                   </div>
                </div>
                <div className="col-span-3 hidden md:block text-sm text-textSecondary truncate">
                   {student.branch}
                </div>
                <div className="col-span-3 md:col-span-3 text-right font-mono font-bold text-lg text-white">
                   {sortType === 'quiz' ? student.quizScore : (student.projects.length * 500) + (student.badges.length * 100)}
                   <span className="text-xs text-textSecondary font-ui ml-1 font-normal">pts</span>
                </div>
            </div>
           )
        })}
      </div>
        
      {/* Pagination */}
      <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-8">
         <button 
           onClick={() => setPage(p => Math.max(1, p - 1))}
           disabled={page === 1}
           className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-textSecondary hover:text-white disabled:opacity-50 transition-colors"
         >
           <ChevronLeft className="w-4 h-4" /> Previous
         </button>
         <span className="text-sm font-mono text-textSecondary">
           Page {page} / {totalPages}
         </span>
         <button 
           onClick={() => setPage(p => Math.min(totalPages, p + 1))}
           disabled={page === totalPages}
           className="px-4 py-2 flex items-center gap-2 text-sm font-bold text-textSecondary hover:text-white disabled:opacity-50 transition-colors"
         >
           Next <ChevronRight className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
};