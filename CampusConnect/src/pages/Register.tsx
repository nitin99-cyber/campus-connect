
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { User, Mail, Phone, Shield, BookOpen, Code, ArrowRight, CheckCircle2, AlertCircle, LogIn, UserPlus, Palette, Dumbbell, Trophy } from 'lucide-react';
import { AuthService } from '../services/authService';
import { StudentService } from '../services/studentService';

const { useNavigate, useLocation } = ReactRouterDOM;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState<'choice' | 'signup'>('choice');
  const [loading, setLoading] = useState(false);
  const [googleData, setGoogleData] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    recoveryEmail: '',
    phone: '',
    branch: '',
    year: '1',
    skills: '',
    bio: '',
    achievements: '',
    sports: '',
    hobbies: '',
    projects: ''
  });

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if redirected from Google Login
    if (location.state && location.state.googleUser) {
        const gUser = location.state.googleUser;
        setGoogleData(gUser);
        setView('signup'); // Skip choice screen
        setFormData(prev => ({
            ...prev,
            fullName: gUser.displayName || '',
            email: gUser.email || '',
            username: gUser.email ? gUser.email.split('@')[0] : ''
        }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (name === 'phone') {
        const isValid = AuthService.validatePhone(value);
        setErrors(prev => ({...prev, phone: isValid ? '' : 'Must be a 10-digit Indian number'}));
    }
    if (name === 'password' && !googleData) { // Skip pass val if google auth
        const isValid = AuthService.validatePassword(value);
        setErrors(prev => ({...prev, password: isValid ? '' : 'Weak password'}));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final Validation Check
    const isPhoneValid = AuthService.validatePhone(formData.phone);
    const isUserValid = formData.username.length > 5;

    if (!isPhoneValid || !isUserValid) {
        alert("Please fix validation errors before submitting.");
        return;
    }

    setLoading(true);

    const newStudent = {
      id: googleData ? googleData.uid : `u-${Date.now()}`,
      name: formData.fullName,
      email: formData.email,
      avatar: googleData?.photoURL || `https://ui-avatars.com/api/?name=${formData.fullName}&background=2563EB&color=fff`,
      branch: formData.branch,
      year: parseInt(formData.year),
      bio: formData.bio || `Hi, I'm ${formData.fullName}!`,
      gender: 'Other',
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      achievements: formData.achievements.split(',').map(s => s.trim()).filter(s => s),
      sports: formData.sports.split(',').map(s => s.trim()).filter(s => s),
      hobbies: formData.hobbies.split(',').map(s => s.trim()).filter(s => s),
      badges: ['New Member'],
      quizScore: 0,
      socials: {},
      projects: formData.projects ? [{
          id: `p-${Date.now()}`,
          title: "My First Project",
          description: formData.projects,
          techStack: []
      }] : []
    };

    // Save to Firestore
    try {
        await StudentService.addStudent(newStudent as any);
        setLoading(false);
        navigate('/profile');
    } catch (error) {
        console.error("Registration failed", error);
        setLoading(false);
        alert("Registration failed. Please try again.");
    }
  };

  // --- RENDER: CHOICE SCREEN ---
  if (view === 'choice') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#060812]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse"></div>

        <div className="relative z-10 max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Network</span>
          </h1>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-ui">
            Are you already a Malaviyan tech wizard, or just starting your journey?
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-3xl mx-auto">
            {/* Login Option */}
            <div 
              onClick={() => navigate('/login')}
              className="group cursor-pointer bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 mx-auto group-hover:scale-110 transition-transform">
                <LogIn className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Existing User</h3>
              <p className="text-slate-400 mb-6">Log in to access your profile, chats, and saved projects.</p>
              <span className="inline-flex items-center text-blue-400 font-bold group-hover:gap-2 transition-all">
                Login Now <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>

            {/* Signup Option */}
            <div 
              onClick={() => setView('signup')}
              className="group cursor-pointer bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-violet-500/50 hover:bg-violet-900/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/5 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 mb-6 mx-auto group-hover:scale-110 transition-transform">
                <UserPlus className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">New Member</h3>
              <p className="text-slate-400 mb-6">Create a new account to get listed in the directory.</p>
               <span className="inline-flex items-center text-violet-400 font-bold group-hover:gap-2 transition-all">
                Create Account <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: SIGNUP FORM ---
  return (
    <div className="min-h-screen py-24 px-4 relative overflow-hidden flex justify-center">
       <div className="fixed inset-0 bg-[#060812]"></div>
       <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none"></div>

       <div className="relative z-10 w-full max-w-3xl animate-fadeIn">
          {!googleData && (
            <button onClick={() => setView('choice')} className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Choice
            </button>
          )}

          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
                {googleData && (
                    <img src={googleData.photoURL} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary" />
                )}
               <h2 className="text-3xl font-heading font-bold text-white mb-2">{googleData ? 'Complete Your Profile' : 'Create Account'}</h2>
               <p className="text-slate-400">Join the VisionX community today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Identity Section */}
               <div className="space-y-4">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4" /> Identity
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">Full Name</label>
                        <input 
                          name="fullName"
                          placeholder="Full Name (e.g. Nitin Deep)"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors disabled:opacity-50"
                          value={formData.fullName}
                          onChange={handleChange}
                          readOnly={!!googleData}
                          required
                        />
                     </div>
                     <div className="space-y-1 relative">
                        <label className="text-xs font-bold text-slate-500">Username/Roll No</label>
                        <input 
                          name="username"
                          placeholder="2022..."
                          className={`w-full bg-slate-950 border ${errors.username ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors`}
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                        {formData.username.length > 5 && <CheckCircle2 className="w-4 h-4 text-green-500 absolute right-3 top-9" />}
                     </div>
                  </div>
               </div>

               {/* Security Section (Only if not Google Auth) */}
               {!googleData && (
                   <div className="space-y-4 pt-4 border-t border-white/5">
                      <h3 className="text-xs font-bold text-violet-400 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Security
                      </h3>
                      <div className="space-y-2">
                          <div className="relative">
                            <input 
                              type="password"
                              name="password"
                              placeholder="Password"
                              className={`w-full bg-slate-950 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:border-violet-500 outline-none transition-colors`}
                              onChange={handleChange}
                              required
                            />
                            {errors.password && <span className="text-[10px] text-red-400 absolute right-2 top-0 -mt-5 bg-slate-900 px-2 border border-red-500/30 rounded">{errors.password}</span>}
                          </div>
                          <p className="text-[10px] text-slate-500 pl-1">
                            Must contain: 8+ chars, 1 Uppercase, 1 Number, 1 Special Symbol (@$!%*?&)
                          </p>
                      </div>
                   </div>
               )}

               {/* Contact Section */}
               <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Contact
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">Official Email</label>
                        <input 
                          type="email"
                          name="email"
                          placeholder="College Email"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-emerald-500 outline-none transition-colors disabled:opacity-50"
                          value={formData.email}
                          onChange={handleChange}
                          readOnly={!!googleData}
                          required
                        />
                     </div>
                     <div className="space-y-1 col-span-full md:col-span-1">
                        <label className="text-xs font-bold text-slate-500">Phone</label>
                        <div className="relative">
                          <input 
                            name="phone"
                            placeholder="Phone Number (10 digits)"
                            maxLength={10}
                            className={`w-full bg-slate-950 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-xl p-3 text-white focus:border-emerald-500 outline-none transition-colors`}
                            onChange={handleChange}
                            required
                          />
                          {errors.phone && <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-3.5" />}
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Academic Section */}
               <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="text-xs font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Academic & Bio
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                     <select 
                        name="branch"
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                        required
                     >
                        <option value="">Select Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EE">EE</option>
                        <option value="ME">ME</option>
                        <option value="CE">CE</option>
                     </select>
                     <select 
                        name="year"
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                     >
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                     </select>
                  </div>
                  
                  <div className="space-y-1">
                     <textarea 
                        name="bio"
                        placeholder="Short Bio..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-pink-500 outline-none"
                        onChange={handleChange}
                        rows={2}
                     />
                  </div>
               </div>

               {/* Skills & Extra Curricular */}
               <div className="space-y-4 pt-4 border-t border-white/5">
                  <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Skills & Interests
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                         <input 
                            name="skills"
                            placeholder="Skills (React, Python...)"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                            onChange={handleChange}
                         />
                         <Code className="absolute right-3 top-3.5 w-4 h-4 text-slate-500" />
                      </div>
                      <div className="relative">
                         <input 
                            name="sports"
                            placeholder="Sports Interest"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                            onChange={handleChange}
                         />
                         <Dumbbell className="absolute right-3 top-3.5 w-4 h-4 text-slate-500" />
                      </div>
                  </div>

                  <div className="relative">
                     <input 
                        name="achievements"
                        placeholder="Key Achievements (Hackathon Winner...)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                        onChange={handleChange}
                     />
                     <Trophy className="absolute right-3 top-3.5 w-4 h-4 text-slate-500" />
                  </div>

                  <div className="relative">
                     <input 
                        name="hobbies"
                        placeholder="Hobbies (Reading, Gaming...)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                        onChange={handleChange}
                     />
                  </div>

                  <div className="relative">
                     <textarea 
                        name="projects"
                        placeholder="Mention a project you've worked on..."
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
                        onChange={handleChange}
                     />
                  </div>
               </div>

               <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
               >
                  {loading ? 'Registering...' : 'Complete Registration'}
               </button>
            </form>
          </div>
       </div>
    </div>
  );
};
