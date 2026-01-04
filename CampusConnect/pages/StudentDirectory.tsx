
import React, { useState, useMemo, useEffect } from 'react';
import { StudentService } from '../services/studentService';
import { Search, Filter, X, ChevronRight, Code, Palette, Dumbbell, Zap, ShieldCheck } from 'lucide-react';
import { Student } from '../types';
import { StudentProfileModal, RevealOnScroll } from '../components/UI';
import { VerificationBadge } from '../components/VerificationBadge';

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

export const StudentDirectory: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      const allStudents = await StudentService.getAllStudents();
      if (isMounted) {
        setStudents(allStudents);
        setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = student.name.toLowerCase().includes(query) || 
                            student.skills.some(skill => skill.toLowerCase().includes(query));
      const matchesBranch = selectedBranch ? student.branch === selectedBranch : true;
      const matchesYear = selectedYear ? student.year === parseInt(selectedYear) : true;
      const matchesVerified = verifiedOnly ? (student.verificationLevel === 'peer' || student.verificationLevel === 'faculty') : true;
      
      return matchesSearch && matchesBranch && matchesYear && matchesVerified;
    });
  }, [searchQuery, selectedBranch, selectedYear, verifiedOnly, students]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBranch('');
    setSelectedYear('');
    setVerifiedOnly(false);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header & Search */}
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center space-y-3">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight flex items-center justify-center gap-4">
            Student Directory 
            {!loading && (
              <span className="text-xl md:text-2xl bg-gradient-to-r from-primary/20 to-secondary/20 text-primary px-4 py-1.5 rounded-full border border-primary/30 font-mono font-bold">
                 {students.length}
              </span>
            )}
          </h1>
          <p className="font-ui text-textSecondary text-lg max-w-2xl mx-auto">Discover the incredible talent on campus. Build your network.</p>
        </div>

        <div className="max-w-4xl mx-auto sticky top-[80px] z-30 px-4 md:px-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-[16px] opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="bg-panel/90 backdrop-blur-xl border border-white/10 rounded-[16px] p-2 flex gap-2 shadow-elev-2">
               <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                 <input 
                   type="text" 
                   className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-white placeholder-textSecondary/50 focus:ring-0 font-ui"
                   placeholder="Search by name, skill, or keywords..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <button 
                 onClick={() => setShowFilters(!showFilters)}
                 className={`px-6 py-2 rounded-[12px] font-ui font-medium transition-all flex items-center gap-2 ${showFilters ? 'bg-white/10 text-white' : 'bg-transparent text-textSecondary hover:bg-white/5 hover:text-white'}`}
               >
                 <Filter className="w-4 h-4" /> 
                 <span className="hidden sm:inline">Filters</span>
               </button>
            </div>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 bg-panel/95 backdrop-blur-xl border border-white/10 rounded-[20px] p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-elev-2 animate-fadeIn">
                <div className="space-y-2">
                   <label className="text-xs text-textSecondary uppercase font-bold tracking-wider ml-1">Branch</label>
                   <select 
                     className="w-full bg-bg1 border border-white/10 rounded-[12px] p-3 text-textPrimary outline-none focus:border-primary transition-colors appearance-none"
                     value={selectedBranch}
                     onChange={(e) => setSelectedBranch(e.target.value)}
                   >
                     <option value="">All Branches</option>
                     {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-xs text-textSecondary uppercase font-bold tracking-wider ml-1">Year</label>
                   <select 
                     className="w-full bg-bg1 border border-white/10 rounded-[12px] p-3 text-textPrimary outline-none focus:border-primary transition-colors appearance-none"
                     value={selectedYear}
                     onChange={(e) => setSelectedYear(e.target.value)}
                   >
                     <option value="">All Years</option>
                     {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                   </select>
                </div>
                
                <div className="md:col-span-2 flex items-center justify-between pt-2 border-t border-white/5">
                  <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${verifiedOnly ? 'bg-green-500 border-green-500' : 'bg-transparent border-slate-600 group-hover:border-white'}`}>
                          {verifiedOnly && <ShieldCheck className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={verifiedOnly} onChange={() => setVerifiedOnly(!verifiedOnly)} />
                      <span className={`text-sm font-medium ${verifiedOnly ? 'text-green-400' : 'text-textSecondary group-hover:text-white'}`}>Verified Profiles Only</span>
                  </label>

                  <button onClick={clearFilters} className="text-xs font-bold text-danger hover:underline flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear Filters
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, idx) => (
              <RevealOnScroll key={student.id} threshold={0.05}>
                <DesktopStudentCard 
                  student={student} 
                  onSelect={() => setSelectedStudent(student)} 
                />
              </RevealOnScroll>
            ))
          ) : (
             <div className="col-span-full text-center py-20">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-textSecondary">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">No students found</h3>
                <p className="text-textSecondary">Try adjusting your filters.</p>
             </div>
          )}
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

interface DesktopStudentCardProps {
  student: Student;
  onSelect: () => void;
}

const DesktopStudentCard: React.FC<DesktopStudentCardProps> = ({ student, onSelect }) => (
  <article 
    onClick={onSelect}
    className="group relative bg-panel rounded-[20px] p-6 shadow-elev-1 border border-white/5 cursor-pointer overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-elev-2 hover:border-primary/20"
  >
    {/* Noise Overlay */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    
    <div className="relative z-10">
      <div className="flex items-start gap-5">
        <div className="relative shrink-0">
          <img 
            src={student.avatar} 
            alt={student.name} 
            className="w-[72px] h-[72px] rounded-full object-cover ring-2 ring-white/10 group-hover:ring-primary/50 transition-all bg-bg1"
          />
          {student.isMock && (
             <div className="absolute -top-1 -left-1 bg-panel text-[10px] font-bold text-textSecondary w-5 h-5 flex items-center justify-center rounded-full border border-white/20 shadow-sm" title="Mock Profile">M</div>
          )}
        </div>
        
        <div className="min-w-0 flex-1 pt-1">
           <div className="flex justify-between items-start">
              <h3 className="font-ui font-semibold text-lg text-textPrimary truncate pr-2 group-hover:text-primary transition-colors flex items-center gap-1.5">
                {student.name}
                <VerificationBadge level={student.verificationLevel} className="scale-75 origin-left" />
              </h3>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/10 shrink-0">
                 <Zap className="w-3 h-3 text-primary fill-primary" />
                 <span className="font-mono text-xs font-bold text-primary">{student.quizScore}</span>
              </div>
           </div>
           <p className="text-sm text-textSecondary truncate">{student.branch}</p>
           <p className="text-xs text-textSecondary/70 mt-0.5">Year {student.year}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {/* Skills */}
        {student.skills.slice(0, 3).map(skill => (
          <span key={skill} className="text-[12px] px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-textSecondary group-hover:bg-white/10 transition-colors">
            {skill}
          </span>
        ))}
        {/* Hobby Highlight */}
        {student.hobbies && student.hobbies[0] && (
           <span className="text-[12px] px-2.5 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary/80">
            {student.hobbies[0]}
          </span>
        )}
        {/* Sport Highlight */}
        {student.sports && student.sports[0] && (
           <span className="text-[12px] px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500/80">
            {student.sports[0]}
          </span>
        )}
        
        {/* Count of remaining items if any */}
        {(student.skills.length > 3) && (
           <span className="text-[10px] px-2 py-1 text-textSecondary/50 font-medium">+{student.skills.length - 3} more</span>
        )}
      </div>
    </div>
  </article>
);
