
import React, { useState } from 'react';
import { MOCK_POSTS } from '../services/mockData';
import { Plus, Clock, Users, Tag, ArrowRight, X, Loader2, DollarSign, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { CollaborationPost } from '../types';
import { StudentService } from '../services/studentService';

export const Collaborate: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [posts, setPosts] = useState<CollaborationPost[]>(MOCK_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPosts = filter === 'All' ? posts : posts.filter(p => p.type === filter);
  const types = ['All', 'Hackathon', 'Project', 'Competition', 'Research'];

  const handleNewPost = (post: CollaborationPost) => {
    setPosts([post, ...posts]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/60 backdrop-blur-md p-8 rounded-[3rem] border border-slate-800 shadow-xl">
        <div className="px-2">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Collaboration Board</h1>
          <p className="text-slate-400 text-lg">Find your next team, project, or hackathon squad.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-400 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:scale-105 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Post Opportunity
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-center md:justify-start gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
              filter === t 
                ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-cyan-500 hover:text-cyan-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map(post => {
            const isHackathon = post.type === 'Hackathon';
            const accentColor = isHackathon ? 'border-purple-500/30' : 'border-blue-500/30';
            const glowColor = isHackathon ? 'hover:shadow-purple-500/20' : 'hover:shadow-blue-500/20';
            const badgeColor = isHackathon ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white';

            return (
            <div key={post.id} className={`bg-slate-900/80 backdrop-blur-md p-8 rounded-[3rem] border-2 ${accentColor} ${glowColor} transition-all duration-300 group hover:-translate-y-1 shadow-xl flex flex-col`}>
                <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-3">
                         <img src={post.authorAvatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-slate-700" />
                         <div>
                             <div className="text-white font-bold text-sm">{post.authorName}</div>
                             <div className="text-slate-500 text-xs">{post.postedAt}</div>
                         </div>
                     </div>
                     <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${badgeColor}`}>
                        {post.type}
                     </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">{post.title}</h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow whitespace-pre-wrap">
                  {post.description}
                </p>

                {/* Event Details Preview */}
                {(post.prizePool || post.guidelines) && (
                   <div className="bg-slate-950/50 rounded-2xl p-4 mb-6 border border-slate-800 space-y-2">
                      {post.prizePool && (
                        <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
                           <DollarSign className="w-4 h-4" /> Prize Pool: {post.prizePool}
                        </div>
                      )}
                      {post.guidelines && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                           <FileText className="w-4 h-4" /> View Guidelines
                        </div>
                      )}
                   </div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {post.requiredSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950 border border-slate-800 text-slate-300 group-hover:border-white/20 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                    <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                      <Users className="w-4 h-4" />
                      {post.openRoles} roles
                    </div>
                    <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                      <Clock className="w-4 h-4" />
                      New
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all transform group-hover:rotate-45">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
            </div>
          )})}
      </div>

      {isModalOpen && <PostOpportunityModal onClose={() => setIsModalOpen(false)} onSubmit={handleNewPost} />}
    </div>
  );
};

const PostOpportunityModal: React.FC<{ onClose: () => void; onSubmit: (post: CollaborationPost) => void }> = ({ onClose, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Project',
        description: '',
        teamSize: '2',
        skills: '',
        prizePool: '',
        guidelines: '',
        instructions: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            const currentUserId = StudentService.getCurrentUserId();
            // Mock fetching current user details or use generic fallback
            const newPost: CollaborationPost = {
                id: `post-${Date.now()}`,
                authorId: currentUserId || 'guest',
                authorName: 'You', // In real app, fetch from profile
                authorAvatar: `https://ui-avatars.com/api/?name=You&background=random`,
                title: formData.title,
                description: formData.description,
                type: formData.type as any,
                requiredSkills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
                postedAt: 'Just now',
                openRoles: parseInt(formData.teamSize),
                prizePool: formData.prizePool,
                guidelines: formData.guidelines,
                instructions: formData.instructions
            };
            
            onSubmit(newPost);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-panel w-full max-w-2xl max-h-[90vh] rounded-[24px] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
                    <div>
                        <h2 className="text-xl font-bold text-white font-heading">Post Opportunity</h2>
                        <p className="text-xs text-slate-400">Share your event or project with the campus.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                                <Tag className="w-3 h-3" /> Basic Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400">Title <span className="text-red-500">*</span></label>
                                    <input 
                                        name="title" 
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. HackMalviya Team" 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-primary outline-none text-sm" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400">Type <span className="text-red-500">*</span></label>
                                    <select 
                                        name="type" 
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-primary outline-none text-sm appearance-none"
                                    >
                                        <option value="Project">Project Collaboration</option>
                                        <option value="Hackathon">Hackathon Team</option>
                                        <option value="Competition">Competition</option>
                                        <option value="Research">Research Paper</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-400">Short Description <span className="text-red-500">*</span></label>
                                <textarea 
                                    name="description" 
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Briefly describe what you are looking for..." 
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-primary outline-none text-sm" 
                                />
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                                <Users className="w-3 h-3" /> Requirements
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400">Team Size Needed <span className="text-red-500">*</span></label>
                                    <input 
                                        name="teamSize" 
                                        type="number"
                                        min="1"
                                        required
                                        value={formData.teamSize}
                                        onChange={handleChange}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-secondary outline-none text-sm" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400">Required Skills (Comma separated)</label>
                                    <input 
                                        name="skills" 
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="React, Figma, Python..." 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-secondary outline-none text-sm" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Event Details (Conditional/Optional) */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-xs font-bold text-pink-500 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Event Details (Optional)
                            </h3>
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-400">Prize Pool / Benefits</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                    <input 
                                        name="prizePool" 
                                        value={formData.prizePool}
                                        onChange={handleChange}
                                        placeholder="e.g. $10,000 or 'Certificate & Swag'" 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-9 text-white focus:border-pink-500 outline-none text-sm" 
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400">Guidelines / Rules</label>
                                    <textarea 
                                        name="guidelines" 
                                        rows={3}
                                        value={formData.guidelines}
                                        onChange={handleChange}
                                        placeholder="Specific rules or eligibility criteria..." 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-pink-500 outline-none text-sm" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-slate-400">Instructions to Apply</label>
                                    <textarea 
                                        name="instructions" 
                                        rows={3}
                                        value={formData.instructions}
                                        onChange={handleChange}
                                        placeholder="e.g. Send your resume to email@..." 
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-pink-500 outline-none text-sm" 
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/5 bg-slate-900/50 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        type="button"
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        form="post-form"
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:shadow-lg hover:shadow-blue-500/20 text-white px-8 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish Opportunity'}
                    </button>
                </div>
            </div>
        </div>
    );
};
