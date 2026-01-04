
import React, { useEffect, useState } from 'react';
import { Shield, Code, Target, Rocket, FileText, CheckCircle, Mail, Globe, Cpu, Linkedin, Chrome, BookOpen, GraduationCap, Briefcase, MessageSquare, Bot, MessagesSquare, Send, X, ShieldCheck, Brain, Lock, Heart, Zap, Coffee, Smile, ChevronRight, AlertCircle } from 'lucide-react';
import { AdminService, SiteContent } from '../services/adminService';

const PageHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12 animate-fade-in">
    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight drop-shadow-lg">{title}</h1>
    <p className="text-slate-400 max-w-2xl mx-auto text-lg font-ui">{subtitle}</p>
    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mt-6 rounded-full shadow-neon"></div>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// Helper hook to sync content
const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(AdminService.getContent());
  useEffect(() => {
    const handleUpdate = () => setContent(AdminService.getContent());
    window.addEventListener('content-updated', handleUpdate);
    return () => window.removeEventListener('content-updated', handleUpdate);
  }, []);
  return content;
};

export const OurStory: React.FC = () => {
  const content = useSiteContent();
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <PageHeader title="Our Story" subtitle="Bridging the gap between talent and opportunity." />
      <Card>
        <div className="space-y-6 text-slate-300 leading-relaxed whitespace-pre-wrap font-roboto text-lg">
          <p>{content.ourStory}</p>
          <h3 className="text-2xl font-bold text-white mt-8 flex items-center gap-2 font-raleway">
            <Target className="text-cyan-400" /> Our Mission
          </h3>
          <p>{content.vision}</p>
        </div>
      </Card>
    </div>
  );
};

export const Team: React.FC = () => {
  const content = useSiteContent();
  const { developer } = content;
  return (
    <div className="max-w-5xl mx-auto pb-10">
      <PageHeader title="Meet the Builder" subtitle="The minds behind the code." />
      <div className="grid md:grid-cols-2 gap-8 justify-center">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 group">
          <div className="h-32 bg-gradient-to-r from-blue-900 to-violet-900 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          </div>
          <div className="px-8 pb-8">
            <div className="-mt-12 mb-6">
              <div className="w-24 h-24 rounded-2xl bg-slate-800 border-4 border-slate-950 flex items-center justify-center text-3xl shadow-lg">
                👨‍💻
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors font-raleway">{developer.name}</h2>
            <p className="text-violet-400 font-medium mb-4 font-ui">{developer.role}</p>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed font-roboto">
              {developer.quote}
            </p>
            <div className="flex gap-4 border-t border-slate-800 pt-6">
               <a href={`mailto:${developer.email}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> Email
               </a>
               <a href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" /> Portfolio
               </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center space-y-6">
           <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white font-raleway">Tech Stack</h3>
                <p className="text-sm text-slate-400 font-roboto">Built with React, Tailwind, Gemini AI</p>
              </div>
           </Card>
           <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white font-raleway">VisionX</h3>
                <p className="text-sm text-slate-400 font-roboto">A student-led initiative for digital transformation.</p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

const JOB_OPENINGS = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    type: "Student Intern",
    dept: "Engineering",
    description: "Work on the core UI of CampusConnect. Experience with React and Tailwind CSS required."
  },
  {
    id: 2,
    title: "AI/ML Researcher",
    type: "Research Fellow",
    dept: "Data Science",
    description: "Help improve our matching algorithms using Gemini API and vector databases."
  },
  {
    id: 3,
    title: "Community Manager",
    type: "Volunteer",
    dept: "Growth",
    description: "Organize campus events, hackathons, and manage the student Discord server."
  },
  {
    id: 4,
    title: "UI/UX Designer",
    type: "Contributor",
    dept: "Design",
    description: "Design intuitive interfaces for mobile and web. Knowledge of Figma is essential."
  }
];

const BENEFITS = [
  { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: "Real Impact", desc: "Build software used by thousands of peers." },
  { icon: <GraduationCap className="w-5 h-5 text-blue-400" />, title: "Mentorship", desc: "Learn from senior developers and alumni." },
  { icon: <Coffee className="w-5 h-5 text-amber-600" />, title: "Flexible Hours", desc: "Work at your own pace, remote or on-campus." },
  { icon: <Heart className="w-5 h-5 text-pink-500" />, title: "Inclusive Culture", desc: "A safe space for everyone to learn and grow." },
];

export const Careers: React.FC = () => {
  const content = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    rollNo: '',
    branch: '',
    email: '',
    bio: '',
    interest: '',
    contribution: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.rollNo.trim()) newErrors.rollNo = "Roll Number is required";
    if (!formData.branch) newErrors.branch = "Branch selection is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.interest.trim()) newErrors.interest = "Area of Interest is required";
    if (!formData.contribution.trim()) newErrors.contribution = "Please explain how you can help";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setShowForm(false);
    }, 1000);
  };

  const openApplication = (roleTitle: string = '') => {
    setSelectedRole(roleTitle);
    setFormData(prev => ({ ...prev, interest: roleTitle || prev.interest }));
    setShowForm(true);
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <PageHeader title="Join the Revolution" subtitle="Help us build the future of campus collaboration." />
      
      {!showForm && !submitted && (
        <div className="space-y-12 animate-fadeIn">
          {/* Intro Section */}
          <Card className="text-center py-12">
            <Rocket className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4 font-raleway">Why VisionX?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 whitespace-pre-wrap font-roboto text-lg leading-relaxed">
              {content.careersText}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
              {BENEFITS.map((b, i) => (
                <div key={i} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                  <div className="mb-3 bg-slate-900 w-fit p-2 rounded-lg">{b.icon}</div>
                  <h4 className="text-white font-bold mb-1">{b.title}</h4>
                  <p className="text-xs text-slate-400">{b.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Openings Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-primary">Open Positions</h3>
            <div className="grid gap-4">
              {JOB_OPENINGS.map(job => (
                <div key={job.id} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-all group">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{job.title}</h4>
                    <div className="flex gap-3 text-sm text-slate-400 mt-1 mb-2">
                      <span className="bg-white/5 px-2 py-0.5 rounded text-xs border border-white/10">{job.type}</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded text-xs border border-white/10">{job.dept}</span>
                    </div>
                    <p className="text-slate-400 text-sm max-w-2xl">{job.description}</p>
                  </div>
                  <button 
                    onClick={() => openApplication(job.title)}
                    className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white/5 text-white font-medium hover:bg-primary hover:text-white transition-all border border-white/10 hover:border-primary flex items-center gap-2"
                  >
                    Apply Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-slate-400 mb-4">Don't see a role that fits?</p>
              <button 
                onClick={() => openApplication()}
                className="text-primary font-bold hover:underline"
              >
                Send a General Application
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && !submitted && (
        <Card className="animate-fadeIn max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white font-raleway">Application Form</h2>
                  {selectedRole && <p className="text-primary text-sm mt-1">Applying for: {selectedRole}</p>}
                </div>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase">Full Name <span className="text-red-500">*</span></label>
                        <input 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full bg-slate-950 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none`}
                            placeholder="Nitin Deep"
                        />
                        {errors.fullName && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                    </div>
                    <div className="space-y-1.5">
                         <label className="text-xs font-bold text-slate-400 uppercase">University Roll No <span className="text-red-500">*</span></label>
                        <input 
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className={`w-full bg-slate-950 border ${errors.rollNo ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none`}
                            placeholder="2021000..."
                        />
                        {errors.rollNo && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.rollNo}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Email Address <span className="text-red-500">*</span></label>
                      <input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none`}
                          placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                  </div>
                  <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase">Branch <span className="text-red-500">*</span></label>
                      <select 
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className={`w-full bg-slate-950 border ${errors.branch ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none appearance-none`}
                      >
                          <option value="">Select Branch</option>
                          <option value="CSE">Computer Science & Engineering</option>
                          <option value="IT">Information Technology</option>
                          <option value="ECE">Electronics & Communication</option>
                          <option value="EE">Electrical Engineering</option>
                          <option value="ME">Mechanical Engineering</option>
                          <option value="CE">Civil Engineering</option>
                          <option value="Other">Other</option>
                      </select>
                      {errors.branch && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.branch}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                     <label className="text-xs font-bold text-slate-400 uppercase">Role / Area of Interest <span className="text-red-500">*</span></label>
                     <input 
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className={`w-full bg-slate-950 border ${errors.interest ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none`}
                        placeholder="e.g. Frontend, AI/ML, Event Management"
                     />
                     {errors.interest && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.interest}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">Short Bio</label>
                    <textarea 
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none"
                        placeholder="Tell us a bit about yourself..."
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase">Why should we hire you? <span className="text-red-500">*</span></label>
                    <textarea 
                        name="contribution"
                        value={formData.contribution}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full bg-slate-950 border ${errors.contribution ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:ring-1 focus:ring-violet-500 outline-none`}
                        placeholder="Share your skills, relevant projects, or ideas for VisionX..."
                    />
                    {errors.contribution && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.contribution}</p>}
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-4 transform active:scale-95"
                >
                    Submit Application <Send className="w-4 h-4" />
                </button>
            </form>
        </Card>
      )}

      {submitted && (
        <Card className="text-center py-16 animate-fadeIn">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-bounce">
                <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 font-raleway">Application Received!</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8 font-roboto text-lg">
                Thanks for throwing your hat in the ring. We'll review your profile and get back to you at <strong>{formData.email}</strong> soon.
            </p>
            <button 
                onClick={() => { setSubmitted(false); setFormData({fullName:'', rollNo:'', branch:'', email: '', bio:'', interest:'', contribution:''}); setSelectedRole(''); }}
                className="text-violet-400 font-bold hover:text-violet-300 transition-colors bg-white/5 px-6 py-2 rounded-full border border-white/10"
            >
                Submit another response
            </button>
        </Card>
      )}
    </div>
  );
};

export const Vision: React.FC = () => {
  const content = useSiteContent();
  
  const futurePoints = [
    {
      title: "Trusted Digital Identities",
      desc: "Verified profiles focused on skills, projects, and achievements, verified by peers or faculty—not just another social profile.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />
    },
    {
      title: "AI Dynamic Matching",
      desc: "An intelligent algorithm that seamlessly connects students, professors, and alumni based on verified skills and academic progress.",
      icon: <Brain className="w-6 h-6 text-violet-400" />
    },
    {
      title: "Consent-Governed Engagement",
      desc: "Controlled, skill-filtered interactions for alumni and recruiters, preventing spam and ensuring meaningful professional connections.",
      icon: <Lock className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Multi-Institution Expansion",
      desc: "Scaling the platform to support multiple campuses using verified student identities to create a global talent pool.",
      icon: <Globe className="w-6 h-6 text-green-500" />
    },
    {
      title: "Seamless Authentication",
      desc: "One-click login with LinkedIn and Google College IDs.",
      icon: <Linkedin className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Student Community Forum",
      desc: "A dedicated space to share ideas, debug code together, and spark discussions.",
      icon: <MessagesSquare className="w-6 h-6 text-teal-400" />
    },
    {
      title: "Live Quiz Events",
      desc: "Real-time quiz conduction for hackathons and tech fests.",
      icon: <BookOpen className="w-6 h-6 text-amber-500" />
    },
    {
      title: "AI Resume Builder",
      desc: "Auto-generate professional resumes from your profile data.",
      icon: <FileText className="w-6 h-6 text-violet-500" />
    },
    {
      title: "Dynamic AI Algorithm Matching",
      desc: "Matches Student, Professors and Alumni according to the skill, academic progress and intersetd Domain..",
      icon: <FileText className="w-6 h-6 text-amber-500" />
    },
    {
      title: "Decentralisation Verification Method",
      desc: "No central authority to control and verify the data. Academic can be verified by Faculty, Certificates and Projects can be verified by our AI Alogorithm,  Peers can verify that this was done on ground reality.",
      icon: <FileText className="w-6 h-6 text-blue-500" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <PageHeader title="Future Scope" subtitle="The roadmap to a connected future." />
      
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-blue-900/20 to-violet-900/20 p-8 rounded-3xl border border-white/5 mb-12 text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500"></div>
         <p className="text-slate-200 text-lg leading-relaxed font-roboto italic">
           "{content.vision}"
         </p>
      </div>

      {/* Vertical Animated List */}
      <div className="space-y-6 relative">
         {/* Vertical Line */}
         <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-transparent opacity-30 md:left-1/2 md:-ml-px hidden md:block"></div>

         {futurePoints.map((item, i) => (
           <div key={i} className={`flex flex-col md:flex-row items-center gap-6 group ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
             
             {/* Content Card */}
             <div className="flex-1 w-full">
               <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:border-blue-500/30 group-hover:-translate-y-1 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <h3 className="text-xl font-bold text-white mb-2 font-raleway flex items-center gap-2 md:hidden">
                    {item.icon} {item.title}
                 </h3>
                 <h3 className="text-xl font-bold text-white mb-2 font-raleway hidden md:block">
                    {item.title}
                 </h3>
                 <p className="text-slate-400 font-roboto">{item.desc}</p>
               </div>
             </div>

             {/* Center Icon */}
             <div className="relative z-10 hidden md:flex w-14 h-14 rounded-full bg-slate-900 border-4 border-slate-800 items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
                {item.icon}
             </div>
             
             {/* Spacer for alternating layout */}
             <div className="flex-1 hidden md:block"></div>
           </div>
         ))}
      </div>

      {/* Quote Section */}
      <div className="mt-20 text-center relative py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-cyan-500/5 blur-3xl rounded-full"></div>
        <div className="relative z-10">
           <p className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 font-pacifico leading-relaxed drop-shadow-sm rotate-1">
             "Innovation distinguishes between a leader and a follower."
           </p>
           <p className="text-slate-500 mt-6 font-raleway font-bold tracking-widest uppercase text-sm">
             — Steve Jobs
           </p>
        </div>
      </div>

    </div>
  );
};

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto pb-10">
      <PageHeader title="Privacy Policy" subtitle="Your data security is our priority." />
      <Card>
        <div className="prose prose-invert max-w-none text-sm text-slate-300 font-roboto">
          <h3>1. Data Collection</h3>
          <p>We collect information you provide directly to us, such as your name, email, branch, skills, and project details. We also use AI to parse resume data you voluntarily upload.</p>
          
          <h3>2. Use of Information</h3>
          <p>The data is used solely to match you with peers, display your profile on the leaderboard, and generate analytics. We do not sell your data to third parties.</p>
          
          <h3>3. Google Authentication</h3>
          <p>We use Google Auth restricted to our college domain to ensure only verified students access the platform.</p>
        </div>
      </Card>
    </div>
  );
};

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto pb-10">
      <PageHeader title="Terms of Service" subtitle="Rules of the game." />
      <Card>
        <div className="prose prose-invert max-w-none text-sm text-slate-300 font-roboto">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing CampusConnect, you agree to be bound by these terms. If you disagree with any part, you may not use the service.</p>
          
          <h3>2. User Conduct</h3>
          <p>You agree to use the platform for professional and academic collaboration. Harassment, spam, or posting inappropriate content will result in an immediate ban.</p>
          
          <h3>3. Intellectual Property</h3>
          <p>Projects shared on the platform remain the intellectual property of their creators. However, by posting, you grant CampusConnect a license to display them.</p>
        </div>
      </Card>
    </div>
  );
};
