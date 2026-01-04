import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Github, Linkedin, Briefcase, MapPin, GraduationCap, Quote, Layers, Trophy, Share2, ShieldCheck, ChevronLeft, Calendar, Building2 } from 'lucide-react';
import { AlumniService } from '../services/alumniService';
import { Alumni } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';

export const AlumniProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Alumni | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlumni = async () => {
      setLoading(true);
      if (id) {
        const data = await AlumniService.getAlumniById(id);
        setProfile(data || null);
      }
      setLoading(false);
    };
    loadAlumni();
  }, [id]);

  if (loading) return <div className="text-white text-center pt-20">Loading...</div>;
  if (!profile) return <div className="text-white text-center pt-20">Profile not found.</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-fadeIn pt-10">
      <button 
        onClick={() => navigate('/alumni')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Network
      </button>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-panel border border-white/10 rounded-[24px] p-8 text-center shadow-elev-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/20 to-transparent"></div>
            
            <div className="relative inline-block mb-4">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-[140px] h-[140px] rounded-[32px] object-cover bg-bg1 shadow-2xl border-[6px] border-panel relative z-10" 
              />
              <div className="absolute -bottom-2 -right-2 z-20 bg-indigo-600 text-white p-2 rounded-xl shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mb-1 relative z-10">
              <h1 className="font-heading font-bold text-2xl text-white">{profile.name}</h1>
              <VerificationBadge level="faculty" showLabel={true} />
            </div>
            
            <p className="text-primary font-medium mb-1">{profile.role}</p>
            <p className="text-textSecondary text-sm mb-6 flex items-center justify-center gap-2">
               <Building2 className="w-4 h-4" /> {profile.company}
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2">
                 <Mail className="w-4 h-4" /> Message Senior
              </button>
              <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2">
                 <Linkedin className="w-4 h-4" /> LinkedIn Profile
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-6 text-left">
              <div>
                <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Experience</div>
                <div className="font-mono font-bold text-xl text-white">{profile.experience}+ Years</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-textSecondary tracking-wider">Batch</div>
                <div className="font-mono font-bold text-xl text-white">Class of '{profile.batch}</div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-panel border border-white/10 rounded-[24px] p-6 shadow-elev-1 space-y-4">
             <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><MapPin className="w-5 h-5 text-indigo-400" /></div>
                <div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Location</p>
                   <p className="text-sm font-medium">{profile.location}</p>
                </div>
             </div>
             <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><GraduationCap className="w-5 h-5 text-indigo-400" /></div>
                <div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Department</p>
                   <p className="text-sm font-medium">{profile.branch}</p>
                </div>
             </div>
             <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Calendar className="w-5 h-5 text-indigo-400" /></div>
                <div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Passout Year</p>
                   <p className="text-sm font-medium">{profile.batch}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Professional Bio */}
           <section>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                 <Briefcase className="w-5 h-5 text-primary" /> Professional Bio
              </h2>
              <div className="bg-panel/50 border border-white/5 rounded-[20px] p-6 leading-relaxed text-textPrimary text-lg font-ui whitespace-pre-wrap">
                 {profile.bio}
              </div>
           </section>

           {/* College Thoughts */}
           <section>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                 <Quote className="w-5 h-5 text-secondary" /> MMMUT Journey
              </h2>
              <div className="bg-indigo-900/10 border border-indigo-500/20 rounded-[20px] p-6 relative overflow-hidden">
                 <p className="text-indigo-200 text-lg italic leading-relaxed relative z-10">"{profile.collegeThoughts}"</p>
              </div>
           </section>

           {/* Career Milestones */}
           <section>
              <h2 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                 <Layers className="w-5 h-5 text-emerald-500" /> Career Milestones
              </h2>
              <div className="space-y-4">
                 {profile.projects.map((p, idx) => (
                    <div key={idx} className="bg-panel/40 border border-white/5 rounded-[20px] p-6 hover:border-indigo-500/30 transition-colors">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white text-lg">{p.title}</h3>
                          <span className="text-[10px] font-mono font-bold bg-white/5 px-2 py-1 rounded text-textSecondary uppercase">{p.year}</span>
                       </div>
                       <p className="text-slate-400 text-sm mb-4 leading-relaxed">{p.description}</p>
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold border border-indigo-500/20">
                          Role: {p.role}
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           {/* Mentorship Card */}
           <div className="bg-gradient-to-r from-indigo-900/40 to-blue-900/40 rounded-[24px] p-8 border border-white/10 text-center relative overflow-hidden group">
              <div className="relative z-10">
                 <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                 <h2 className="text-2xl font-heading font-bold text-white mb-2">Ready to Guide Malaviyans</h2>
                 <p className="text-slate-300 mb-6 font-ui max-w-md mx-auto">
                    I'm open for referrals and career advice. Feel free to reach out with specific queries.
                 </p>
                 <button className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl">
                    Request Mentorship
                 </button>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
           </div>
        </div>
      </div>
    </div>
  );
};
