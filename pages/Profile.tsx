import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { User, Mail, Github, Linkedin, Share2, Check, Code, Database, Globe, Layers, Terminal, Trophy, Medal, Star, Zap, UserPlus, UserCheck, ShieldCheck, Loader2, Palette, Dumbbell, X } from 'lucide-react';
import { StudentService } from '../services/studentService';
import { MOCK_STUDENTS } from '../services/mockData';
import { Student, VerificationLevel } from '../types';
import { GlassCard } from '../components/UI';
import { VerificationBadge } from '../components/VerificationBadge';

const getSkillStyle = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('react') || s.includes('vue') || s.includes('js')) return { icon: Globe, color: 'text-primary' };
  if (s.includes('python') || s.includes('java')) return { icon: Terminal, color: 'text-success' };
  if (s.includes('data')) return { icon: Database, color: 'text-secondary' };
  return { icon: Code, color: 'text-textSecondary' };
};

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const allStudents = await StudentService.getAllStudents();
      const currentUserId = StudentService.getCurrentUserId();
      let found = id ? allStudents.find(s => s.id === id) : allStudents.find(s => s.id === currentUserId);
      setProfile(found || MOCK_STUDENTS[0]);
      setLoading(false);
    };
    loadProfile();
  }, [id]);

  if (loading || !profile) return <div className="text-white text-center pt-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-fadeIn">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Fixed Profile Card */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-panel border border-white/10 rounded-[24px] p-8 text-center shadow-elev-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent opacity-50"></div>
              
              <div className="relative inline-block mb-4">
                 <img src={profile.avatar} alt={profile.name} className="w-[140px] h-[140px] rounded-[32px] object-cover bg-bg1 shadow-2xl border-[6px] border-panel relative z-10" />
                 {profile.isMock && <div className="absolute top-2 right-2 z-20 bg-panel text-textSecondary text-xs font-bold px-2 py-1 rounded-md border border-white/10">Mock</div>}
              </div>

              <div className="flex flex-col items-center gap-2 mb-1 relative z-10">
                 <h1 className="font-heading font-bold text-2xl text-white">{profile.name}</h1>
                 <VerificationBadge level={profile.verificationLevel} showLabel={true} />
              </div>
              
              <p className="text-textSecondary text-sm mb-6">{profile.branch} • Year {profile.year}</p>

              <div className="flex flex-col gap-3 mb-8">
                 <div className="flex gap-3">
                    <button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`flex-1 py-2.5 rounded-[14px] text-sm font-bold transition-all ${isFollowing ? 'bg-white/5 text-success border border-white/10' : 'bg-gradient-to-r from-green-400 to-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-[1.02]'}`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-[14px] hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <button 
                    onClick={() => setShowVerificationModal(true)}
                    className="w-full py-2.5 rounded-[14px] text-sm font-bold bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                 >
                    <ShieldCheck className="w-4 h-4" /> Request Verification
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-6 text-left">
                 <div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Quiz Score</div>
                    <div className="font-mono font-bold text-xl text-white">{profile.quizScore}</div>
                 </div>
                 <div>
                    <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Badges</div>
                    <div className="font-mono font-bold text-xl text-white">{profile.badges.length}</div>
                 </div>
              </div>
           </div>

           {/* Socials Card */}
           <div className="bg-panel border border-white/10 rounded-[24px] p-6 shadow-elev-1">
              <h3 className="text-xs font-bold text-textSecondary uppercase mb-4">Connect</h3>
              <div className="space-y-3">
                 <a href={`mailto:${profile.email}`} className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textSecondary group-hover:text-white"><Mail className="w-4 h-4" /></div>
                    <span className="text-sm text-textSecondary group-hover:text-white truncate">{profile.email}</span>
                 </a>
                 {profile.socials.github && (
                    <a href={profile.socials.github} target="_blank" className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-white/5 transition-colors group">
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textSecondary group-hover:text-white"><Github className="w-4 h-4" /></div>
                       <span className="text-sm text-textSecondary group-hover:text-white truncate">GitHub</span>
                    </a>
                 )}
                 {profile.socials.linkedin && (
                    <a href={profile.socials.linkedin} target="_blank" className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-white/5 transition-colors group">
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textSecondary group-hover:text-white"><Linkedin className="w-4 h-4" /></div>
                       <span className="text-sm text-textSecondary group-hover:text-white truncate">LinkedIn</span>
                    </a>
                 )}
              </div>
           </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* About Section */}
           <section>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                 <User className="w-5 h-5 text-primary" /> About
              </h2>
              <div className="bg-panel/50 border border-white/5 rounded-[20px] p-6 leading-relaxed text-textPrimary text-lg font-ui whitespace-pre-wrap mb-6">
                 {profile.bio}
              </div>

              {/* Hobbies and Sports Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-panel/40 border border-white/5 rounded-[20px] p-5 hover:border-secondary/20 transition-colors">
                    <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Palette className="w-4 h-4 text-secondary" /> Hobbies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {profile.hobbies && profile.hobbies.length > 0 ? (
                          profile.hobbies.map(hobby => (
                             <span key={hobby} className="px-3 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-xs font-medium text-secondary">
                                {hobby}
                             </span>
                          ))
                       ) : (
                          <span className="text-sm text-textSecondary italic">Exploring new interests...</span>
                       )}
                    </div>
                 </div>

                 <div className="bg-panel/40 border border-white/5 rounded-[20px] p-5 hover:border-emerald-500/20 transition-colors">
                    <h3 className="text-xs font-bold text-textSecondary uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Dumbbell className="w-4 h-4 text-emerald-500" /> Sports
                    </h3>
                    <div className="flex flex-wrap gap-2">
                       {profile.sports && profile.sports.length > 0 ? (
                          profile.sports.map(sport => (
                             <span key={sport} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-300">
                                {sport}
                             </span>
                          ))
                       ) : (
                          <span className="text-sm text-textSecondary italic">Active lifestyle enthusiast...</span>
                       )}
                    </div>
                 </div>
              </div>
           </section>

           {/* Skills */}
           <section>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                 <Code className="w-5 h-5 text-secondary" /> Tech Stack & Verification
              </h2>
              <div className="flex flex-wrap gap-3">
                 {profile.skills.map((skill, idx) => {
                    const style = getSkillStyle(skill);
                    const Icon = style.icon;
                    const isVerified = (idx % 2 === 0); 
                    
                    return (
                       <div key={skill} className={`flex items-center gap-2 px-4 py-3 bg-panel border rounded-[14px] shadow-sm transition-all group ${isVerified ? 'border-blue-500/20 bg-blue-500/5' : 'border-white/5 hover:border-primary/30'}`}>
                          <Icon className={`w-4 h-4 ${style.color}`} />
                          <span className="text-sm font-medium text-white">{skill}</span>
                          {isVerified && (
                             <div title="Peer Verified Skill" className="flex items-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 ml-1" />
                             </div>
                          )}
                       </div>
                    )
                 })}
              </div>
           </section>

           {/* Projects */}
           <section>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                 <Layers className="w-5 h-5 text-neon" /> Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                 {profile.projects.map(project => (
                    <GlassCard key={project.id} className="flex flex-col h-full group">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white text-lg">{project.title}</h3>
                       </div>
                       <p className="text-sm text-textSecondary mb-4 flex-1">{project.description}</p>
                       <div className="flex flex-wrap gap-2 mt-auto">
                          {project.techStack.map(t => <span key={t} className="text-[10px] font-mono bg-bg1 px-2 py-1 rounded text-textSecondary">{t}</span>)}
                       </div>
                    </GlassCard>
                 ))}
                 {profile.projects.length === 0 && <div className="text-textSecondary italic">No projects added yet.</div>}
              </div>
           </section>

           {/* Badges */}
           <section>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                 <Trophy className="w-5 h-5 text-yellow-500" /> Badges
              </h2>
              <div className="flex flex-wrap gap-4">
                 {profile.badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 bg-panel border border-white/5 rounded-[16px]">
                       <div className="w-10 h-10 rounded-full bg-bg1 flex items-center justify-center border border-white/5">
                          <Medal className="w-5 h-5 text-yellow-500" />
                       </div>
                       <span className="font-bold text-sm text-white">{b}</span>
                    </div>
                 ))}
                 {Array.from({length: Math.floor(profile.quizScore/15)}).map((_, i) => (
                    <div key={`q-${i}`} className="flex items-center gap-3 px-4 py-3 bg-panel border border-white/5 rounded-[16px]">
                       <div className="w-10 h-10 rounded-full bg-bg1 flex items-center justify-center border border-white/5">
                          <Star className="w-5 h-5 text-primary" />
                       </div>
                       <span className="font-bold text-sm text-white">Quiz Master {i+1}</span>
                    </div>
                 ))}
              </div>
           </section>

        </div>
      </div>

      {showVerificationModal && (
         <VerificationRequestModal onClose={() => setShowVerificationModal(false)} />
      )}
    </div>
  );
};

const VerificationRequestModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const [step, setStep] = useState<'form' | 'success'>('form');
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
         setIsSubmitting(false);
         setStep('success');
      }, 1500);
   };

   return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
         <div className="bg-panel w-full max-w-md rounded-[24px] border border-white/10 shadow-2xl relative overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-textSecondary hover:text-white transition-colors">
               <X className="w-5 h-5" />
            </button>
            {step === 'form' ? (
               <div className="p-8">
                  <div className="text-center mb-6">
                     <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500">
                        <ShieldCheck className="w-8 h-8" />
                     </div>
                     <h2 className="text-2xl font-bold text-white mb-2">Request Verification</h2>
                     <p className="text-sm text-textSecondary">Boost your profile credibility by getting your skills verified.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-textSecondary uppercase">Select Item</label>
                        <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none appearance-none">
                           <option>Skill: React</option>
                           <option>Project: CampusConnect</option>
                        </select>
                     </div>
                     <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-2 flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Request'}
                     </button>
                  </form>
               </div>
            ) : (
               <div className="p-8 text-center py-12">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-bounce">
                     <Check className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Request Sent!</h2>
                  <button onClick={onClose} className="text-primary font-bold hover:underline">Return to Profile</button>
               </div>
            )}
         </div>
      </div>
   );
};
