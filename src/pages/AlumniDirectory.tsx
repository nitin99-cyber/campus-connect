
import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AlumniService } from '../services/alumniService';
import { Alumni } from '../types';
import { Search, Filter, GraduationCap, Building2, Briefcase, Mail, MessageSquare, Linkedin, X, CheckCircle2, AlertTriangle, Loader2, Calendar, MapPin, Quote, Layers } from 'lucide-react';
import { RevealOnScroll } from '../components/UI';

const { Link } = ReactRouterDOM;

export const AlumniDirectory: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [minExp, setMinExp] = useState(0);

  useEffect(() => {
    const loadAlumni = async () => {
      const data = await AlumniService.getAllAlumni();
      setAlumni(data);
      setLoading(false);
    };
    loadAlumni();
  }, []);

  const filteredAlumni = useMemo(() => {
    return alumni.filter(a => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = a.name.toLowerCase().includes(query) || 
                            a.company.toLowerCase().includes(query) ||
                            a.role.toLowerCase().includes(query);
      const matchesBranch = selectedBranch ? a.branch === selectedBranch : true;
      const matchesDomain = selectedDomain ? a.domain === selectedDomain : true;
      const matchesExp = a.experience >= minExp;
      return matchesSearch && matchesBranch && matchesDomain && matchesExp;
    });
  }, [searchQuery, selectedBranch, selectedDomain, minExp, alumni]);

  const uniqueDomains = Array.from(new Set(alumni.map(a => a.domain)));
  const branches = ['CSE', 'IT', 'ECE', 'EE', 'ME', 'Civil', 'Chemical Engineering'];

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-4 animate-fadeIn">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-3 h-3" /> Beta Feature: Verification in Progress
         </div>
         <h1 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">Alumni Network</h1>
         <p className="font-ui text-textSecondary text-lg max-w-2xl mx-auto">
            Connect with seniors working at top companies. Get guidance, referrals, and mentorship.
         </p>
         <button 
           onClick={() => setShowJoinModal(true)}
           className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-lg hover:shadow-blue-500/30 text-white rounded-full font-bold transition-all transform hover:-translate-y-1"
         >
            Join Alumni Network
         </button>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="max-w-6xl mx-auto sticky top-[80px] z-30 px-4 md:px-0">
          <div className="bg-panel/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2 shadow-elev-2">
             <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                 <input 
                   type="text" 
                   className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-white placeholder-textSecondary/50 focus:ring-0 font-ui"
                   placeholder="Search by name, company, or role..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
             </div>
             <button 
               onClick={() => setShowFilters(!showFilters)}
               className={`px-6 py-2 rounded-xl font-ui font-medium transition-all flex items-center gap-2 ${showFilters ? 'bg-white/10 text-white' : 'bg-transparent text-textSecondary hover:bg-white/5 hover:text-white'}`}
             >
               <Filter className="w-4 h-4" /> 
               <span className="hidden sm:inline">Filters</span>
             </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 bg-panel/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-elev-2 animate-fadeIn">
               <div className="space-y-2">
                   <label className="text-xs text-textSecondary uppercase font-bold tracking-wider ml-1">Branch</label>
                   <select 
                     className="w-full bg-bg1 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary transition-colors appearance-none"
                     value={selectedBranch}
                     onChange={(e) => setSelectedBranch(e.target.value)}
                   >
                     <option value="">All Branches</option>
                     {branches.map(b => <option key={b} value={b}>{b}</option>)}
                   </select>
               </div>
               <div className="space-y-2">
                   <label className="text-xs text-textSecondary uppercase font-bold tracking-wider ml-1">Domain</label>
                   <select 
                     className="w-full bg-bg1 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary transition-colors appearance-none"
                     value={selectedDomain}
                     onChange={(e) => setSelectedDomain(e.target.value)}
                   >
                     <option value="">All Domains</option>
                     {uniqueDomains.map(d => <option key={d} value={d}>{d}</option>)}
                   </select>
               </div>
               <div className="space-y-2">
                   <label className="text-xs text-textSecondary uppercase font-bold tracking-wider ml-1">Min Experience: {minExp} Years</label>
                   <input 
                     type="range"
                     min="0" max="15"
                     value={minExp}
                     onChange={(e) => setMinExp(parseInt(e.target.value))}
                     className="w-full h-2 bg-bg1 rounded-lg appearance-none cursor-pointer accent-primary mt-3"
                   />
               </div>
            </div>
          )}
      </div>

      {/* Alumni Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-0">
           {filteredAlumni.map((alum) => (
             <RevealOnScroll key={alum.id} threshold={0.05}>
               <div 
                 onClick={() => setSelectedAlumni(alum)}
                 className="bg-panel border border-white/5 rounded-[24px] p-6 hover:border-white/10 transition-all hover:-translate-y-1 group relative overflow-hidden h-full flex flex-col cursor-pointer"
               >
                  {/* Banner Decoration */}
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50 z-0"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center mt-4">
                     <img 
                       src={alum.avatar} 
                       alt={alum.name} 
                       className="w-24 h-24 rounded-[24px] border-[4px] border-panel bg-panel object-cover shadow-xl mb-3"
                     />
                     <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{alum.name}</h3>
                     <p className="text-sm text-textSecondary flex items-center gap-1.5 mt-1">
                        <Briefcase className="w-3 h-3" /> {alum.role}
                     </p>
                     <p className="text-xs font-bold text-white mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-cyan-400" /> {alum.company}
                     </p>

                     <div className="flex flex-wrap justify-center gap-2 mt-4 w-full">
                        <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] text-textSecondary uppercase tracking-wider font-bold border border-white/5">
                           {alum.branch} '{alum.batch}
                        </span>
                        <span className="px-2 py-1 bg-blue-500/10 rounded-md text-[10px] text-blue-400 font-bold border border-blue-500/20">
                           {alum.domain}
                        </span>
                        <span className="px-2 py-1 bg-green-500/10 rounded-md text-[10px] text-green-400 font-bold border border-green-500/20">
                           {alum.experience}+ Yrs Exp
                        </span>
                     </div>
                  </div>

                  <div className="mt-auto pt-6 grid grid-cols-3 gap-2">
                      <button onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${alum.email}`}} className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors border border-white/5" title="Email">
                         <Mail className="w-4 h-4" />
                      </button>
                      <Link onClick={(e) => e.stopPropagation()} to={`/alumni/message/${alum.id}`} className="flex items-center justify-center p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20" title="Message">
                         <MessageSquare className="w-4 h-4" />
                      </Link>
                      <button onClick={(e) => { e.stopPropagation(); window.open(alum.socials.linkedin || '#', '_blank')}} className="flex items-center justify-center p-2 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] transition-colors border border-[#0077b5]/20" title="LinkedIn">
                         <Linkedin className="w-4 h-4" />
                      </button>
                  </div>
               </div>
             </RevealOnScroll>
           ))}
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && (
        <JoinAlumniModal onClose={() => setShowJoinModal(false)} />
      )}

      {/* Profile Modal */}
      {selectedAlumni && (
        <AlumniProfileModal alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} />
      )}

    </div>
  );
};

const AlumniProfileModal: React.FC<{ alumni: Alumni; onClose: () => void }> = ({ alumni, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

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
                <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-900 relative shrink-0">
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
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-8">
                        <div className="relative shrink-0">
                            <img 
                                src={alumni.avatar} 
                                alt={alumni.name} 
                                className="w-28 h-28 rounded-[24px] border-[6px] border-panel bg-panel object-cover shadow-xl"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-3xl font-heading font-bold text-white mb-1">{alumni.name}</h2>
                            <p className="font-ui text-lg text-primary">{alumni.role} <span className="text-textSecondary">at</span> {alumni.company}</p>
                            <p className="text-sm text-textSecondary flex items-center gap-2 mt-2">
                               <MapPin className="w-3 h-3" /> {alumni.location} • {alumni.experience} Yrs Exp.
                            </p>
                        </div>
                        <div className="flex gap-2">
                             <a href={`mailto:${alumni.email}`} className="p-2.5 bg-white/5 border border-white/10 text-textSecondary hover:text-white rounded-[12px] transition-colors"><Mail className="w-5 h-5" /></a>
                             <a href={alumni.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 border border-white/10 text-[#0077b5] hover:bg-[#0077b5]/10 rounded-[12px] transition-colors"><Linkedin className="w-5 h-5" /></a>
                             <Link to={`/alumni/message/${alumni.id}`} className="px-6 py-2.5 bg-primary text-white rounded-[12px] font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg">Message</Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                         <div className="bg-bg1 border border-white/5 p-3 rounded-[16px] text-center">
                            <div className="text-[10px] text-textSecondary font-bold uppercase tracking-wider mb-1">Batch</div>
                            <div className="text-white font-mono font-bold">{alumni.batch}</div>
                         </div>
                         <div className="bg-bg1 border border-white/5 p-3 rounded-[16px] text-center">
                            <div className="text-[10px] text-textSecondary font-bold uppercase tracking-wider mb-1">Branch</div>
                            <div className="text-white font-mono font-bold">{alumni.branch}</div>
                         </div>
                         <div className="bg-bg1 border border-white/5 p-3 rounded-[16px] text-center">
                            <div className="text-[10px] text-textSecondary font-bold uppercase tracking-wider mb-1">Domain</div>
                            <div className="text-white font-mono font-bold">{alumni.domain}</div>
                         </div>
                         <div className="bg-bg1 border border-white/5 p-3 rounded-[16px] text-center">
                            <div className="text-[10px] text-textSecondary font-bold uppercase tracking-wider mb-1">CGPA</div>
                            <div className="text-white font-mono font-bold">{alumni.cgpa}</div>
                         </div>
                    </div>

                    <div className="space-y-8">
                        {/* Bio */}
                        <div className="bg-white/3 p-6 rounded-[20px] border border-white/5">
                            <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-primary" /> Professional Bio
                            </h3>
                            <p className="text-textPrimary text-[15px] leading-relaxed font-body">{alumni.bio}</p>
                        </div>

                        {/* College Thoughts */}
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-6 rounded-[20px] border border-white/5 relative overflow-hidden">
                            <Quote className="absolute top-4 right-4 text-white/5 w-16 h-16 rotate-12" />
                            <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-3 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-secondary" /> My Time at College
                            </h3>
                            <p className="text-slate-300 text-[15px] leading-relaxed italic relative z-10">"{alumni.collegeThoughts}"</p>
                        </div>

                        {/* Projects */}
                        {alumni.projects && alumni.projects.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-emerald-500" /> Key Projects
                                </h3>
                                <div className="space-y-4">
                                    {alumni.projects.map((p, idx) => (
                                        <div key={idx} className="bg-bg1 border border-white/5 p-5 rounded-[16px] hover:border-white/20 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-heading font-bold text-white text-base">{p.title}</h4>
                                                <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-textSecondary">{p.year}</span>
                                            </div>
                                            <p className="text-sm text-textSecondary mb-3 leading-relaxed">{p.description}</p>
                                            <div className="text-xs font-medium text-primary">Role: {p.role}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const JoinAlumniModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const [step, setStep] = useState<'form' | 'success'>('form');
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      batch: '',
      branch: '',
      company: '',
      role: '',
      domain: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      
      // Validation
      if (!formData.email.endsWith('@mmmut.ac.in')) {
         setError('Please use your official institute email (@mmmut.ac.in)');
         return;
      }

      setIsSubmitting(true);
      await AlumniService.joinNetwork(formData);
      setIsSubmitting(false);
      setStep('success');
   };

   return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
         <div className="bg-panel border border-white/10 rounded-[24px] max-w-lg w-full p-8 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 text-textSecondary hover:text-white">
               <X className="w-5 h-5" />
            </button>

            {step === 'form' ? (
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                     <GraduationCap className="w-12 h-12 text-primary mx-auto mb-3" />
                     <h2 className="text-2xl font-bold text-white">Join Alumni Network</h2>
                     <p className="text-sm text-textSecondary">Verify your identity to guide juniors.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-textSecondary uppercase">Full Name</label>
                        <input 
                           required 
                           className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:border-primary outline-none"
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-textSecondary uppercase">Passout Year</label>
                        <input 
                           required 
                           type="number"
                           className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:border-primary outline-none"
                           value={formData.batch}
                           onChange={e => setFormData({...formData, batch: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-xs font-bold text-textSecondary uppercase">Official Email</label>
                     <input 
                        required 
                        type="email"
                        placeholder="your.name@mmmut.ac.in"
                        className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-slate-800'} rounded-lg p-2.5 text-white text-sm focus:border-primary outline-none`}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                     />
                     {error && <p className="text-xs text-red-500">{error}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-textSecondary uppercase">Current Company</label>
                        <input 
                           required 
                           className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:border-primary outline-none"
                           value={formData.company}
                           onChange={e => setFormData({...formData, company: e.target.value})}
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-textSecondary uppercase">Role / Job Title</label>
                        <input 
                           required 
                           className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white text-sm focus:border-primary outline-none"
                           value={formData.role}
                           onChange={e => setFormData({...formData, role: e.target.value})}
                        />
                     </div>
                  </div>

                  <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                  >
                     {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit for Verification'}
                  </button>
               </form>
            ) : (
               <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                     <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Request Received</h3>
                  <p className="text-textSecondary text-sm mb-6">
                     We have sent a verification link to <strong>{formData.email}</strong>. Once verified, your profile will be listed in the directory.
                  </p>
                  <button onClick={onClose} className="text-primary font-bold hover:underline">Close</button>
               </div>
            )}
         </div>
      </div>
   );
}
