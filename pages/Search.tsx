
import React, { useState, useCallback, useEffect } from 'react';
import { Search as SearchIcon, Filter, Sparkles, Loader2, User, X, Briefcase } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { StudentService } from '../services/studentService';
import { Student } from '../types';
import { StudentProfileModal, RevealOnScroll } from '../components/UI';
import { VerificationBadge } from '../components/VerificationBadge';

const POPULAR_SKILLS = ['C', 'Java', 'Python', 'React', 'Node.js', 'Embedded Systems', 'Arduino', 'Raspberry Pi', 'Data Analysis'];
const BRANCHES = [
  'Chemical Engineering',
  'Civil Engineering',
  'Computer Science and Engineering',
  'Electrical Engineering',
  'Electronics and Communication Engineering',
  'Electronics and Communication Engineering (IOT)',
  'Mechanical Engineering',
  'Information Technology'
];

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Student[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // AI Filter State
  const [aiFilters, setAiFilters] = useState<{ skills?: string[], year?: number, branch?: string } | null>(null);

  // Manual Filter States
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const students = await StudentService.getAllStudents();
      setAllStudents(students);
      setResults(students);
      setDataLoaded(true);
    };
    loadData();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = allStudents;

    // 1. Apply AI Filters if they exist (triggered by Search Button)
    if (aiFilters) {
      if (aiFilters.year) filtered = filtered.filter(s => s.year === aiFilters.year);
      if (aiFilters.branch) filtered = filtered.filter(s => s.branch.toLowerCase().includes(aiFilters.branch!.toLowerCase()));
      if (aiFilters.skills && aiFilters.skills.length > 0) {
        filtered = filtered.filter(s => 
          aiFilters.skills!.some(req => s.skills.map(sk => sk.toLowerCase()).some(sk => sk.includes(req.toLowerCase())))
        );
      }
    } 
    // 2. Otherwise, apply Direct Text Search (triggered by Typing)
    else if (query.trim()) {
      const lowerQ = query.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(lowerQ) || 
        s.skills.some(sk => sk.toLowerCase().includes(lowerQ)) ||
        s.branch.toLowerCase().includes(lowerQ)
      );
    }

    // 3. Apply Manual UI Filters (Dropdowns)
    if (selectedBranch) filtered = filtered.filter(s => s.branch === selectedBranch);
    if (selectedYear) filtered = filtered.filter(s => s.year === parseInt(selectedYear));
    if (selectedSkills.length > 0) filtered = filtered.filter(s => selectedSkills.every(req => s.skills.includes(req)));
    if (minRating > 0) filtered = filtered.filter(s => s.quizScore >= minRating);

    setResults(filtered);
  }, [allStudents, aiFilters, query, selectedBranch, selectedYear, selectedSkills, minRating]);

  // Handle Smart Search (AI)
  const handleSmartSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) { 
        setAiFilters(null);
        return; 
    }
    
    setLoading(true);
    // Use Gemini to parse structure from query
    const filters = await GeminiService.parseSearchQuery(query);
    setAiFilters(filters);
    setLoading(false);
  };

  // Handle Real-time Text Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    // Reset AI filters when typing manually to fallback to direct name search
    if (aiFilters) setAiFilters(null); 
  };

  // Re-run filters whenever any dependency changes
  useEffect(() => {
    if (dataLoaded) applyFilters();
  }, [applyFilters, dataLoaded]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleReset = () => {
    setSelectedBranch('');
    setSelectedYear('');
    setSelectedSkills([]);
    setMinRating(0);
    setQuery('');
    setAiFilters(null);
    setResults(allStudents);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-fadeIn">
      <div className="text-center space-y-4 mb-8">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white">Find Your Perfect Teammate</h1>
        <p className="font-ui text-textSecondary text-lg">Search by name, skills, or ask AI for recommendations.</p>
      </div>

      {/* Search Panel */}
      <div className="bg-panel/60 backdrop-blur-xl rounded-[24px] border border-white/5 p-8 shadow-elev-2 relative overflow-hidden">
        
        {/* Smart Search Input */}
        <div className="relative group mb-8">
           <div className="absolute inset-0 bg-gradient-to-r from-neon via-primary to-secondary opacity-5 blur-xl rounded-[16px] group-focus-within:opacity-15 transition-opacity"></div>
           <div className="relative bg-bg1 border border-white/10 rounded-[16px] flex items-center p-2 focus-within:border-primary/50 transition-colors shadow-inner">
              <div className="pl-4 text-neon">
                 {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
              </div>
              <form onSubmit={handleSmartSearch} className="flex-1">
                <input
                  type="text"
                  className="w-full bg-transparent border-none py-4 px-4 text-white placeholder-textSecondary/50 font-ui text-lg focus:ring-0"
                  placeholder="Type a name, skill, or 'Find 3rd year CS students'..."
                  value={query}
                  onChange={handleInputChange}
                />
              </form>
              <button
                onClick={(e) => handleSmartSearch(e)}
                className="bg-gradient-to-r from-green-400 to-pink-500 hover:shadow-pink-500/20 text-white px-8 py-3 rounded-[12px] font-ui font-semibold transition-all shadow-lg"
              >
                {loading ? 'Thinking...' : 'AI Search'}
              </button>
           </div>
           {aiFilters && (
               <div className="absolute -bottom-6 left-2 text-xs text-neon flex items-center gap-1 animate-fadeIn">
                   <Sparkles className="w-3 h-3" /> AI Filters Applied: {Object.keys(aiFilters).filter(k => aiFilters[k as keyof typeof aiFilters]).join(', ')}
               </div>
           )}
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-1">Branch</label>
            <select 
              className="w-full bg-bg1 border border-white/10 rounded-[12px] p-3 text-sm text-textPrimary outline-none focus:border-primary"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-1">Year</label>
            <select 
              className="w-full bg-bg1 border border-white/10 rounded-[12px] p-3 text-sm text-textPrimary outline-none focus:border-primary"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Any Year</option>
              {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
            </select>
          </div>

           <div className="space-y-2">
            <label className="text-xs font-bold text-textSecondary uppercase tracking-wider ml-1">Min Score: {minRating}</label>
            <input 
              type="range" 
              min="0" max="1000" step="50"
              value={minRating}
              onChange={(e) => setMinRating(parseInt(e.target.value))}
              className="w-full h-2 bg-bg1 rounded-lg appearance-none cursor-pointer accent-primary mt-4"
            />
          </div>

          <div className="flex items-end">
            <button 
              onClick={handleReset}
              className="w-full py-3 border border-white/10 text-textSecondary rounded-[12px] hover:bg-white/5 hover:text-white transition-all font-medium text-sm flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" /> Reset Filters
            </button>
          </div>
        </div>
        
        {/* Popular Skills Chips */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <label className="text-xs font-bold text-textSecondary uppercase tracking-wider block mb-3">Popular Skills</label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  selectedSkills.includes(skill)
                    ? 'bg-primary/20 text-primary border-primary shadow-sm'
                    : 'bg-white/5 text-textSecondary border-transparent hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {dataLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.length > 0 ? results.map((student) => (
             <RevealOnScroll key={student.id} threshold={0.05}>
               <div 
                    onClick={() => setSelectedStudent(student)}
                    className="bg-panel border border-white/5 rounded-[20px] p-6 hover:shadow-elev-2 hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
                  >
                      <div className="flex items-center gap-4 mb-4">
                          <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full bg-bg1 object-cover ring-2 ring-white/5 group-hover:ring-primary/50 transition-all" />
                          <div className="min-w-0">
                              <h3 className="font-ui font-bold text-white truncate group-hover:text-primary transition-colors flex items-center gap-1">
                                {student.name}
                                <VerificationBadge level={student.verificationLevel} className="scale-75 origin-left" />
                              </h3>
                              {student.isMock && <span className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-textSecondary">Mock</span>}
                              <p className="text-xs text-textSecondary truncate">{student.branch}</p>
                          </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4 content-start min-h-[40px]">
                          {student.skills.slice(0, 3).map(skill => (
                              <span key={skill} className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-textSecondary">{skill}</span>
                          ))}
                          {student.skills.length > 3 && (
                             <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-textSecondary">+{student.skills.length - 3}</span>
                          )}
                      </div>
                      <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-textSecondary font-mono">
                          <span>Y{student.year}</span>
                          <span className="text-neon">{student.quizScore} PTS</span>
                      </div>
                  </div>
             </RevealOnScroll>
          )) : (
             <div className="col-span-full text-center py-10 text-textSecondary bg-panel/30 rounded-[20px] border border-white/5">
                <SearchIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No results found for "{query}".</p>
                <button onClick={handleReset} className="text-primary hover:underline text-sm mt-2">Clear all filters</button>
             </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      )}

      {selectedStudent && (
        <StudentProfileModal 
            student={selectedStudent} 
            onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
};
