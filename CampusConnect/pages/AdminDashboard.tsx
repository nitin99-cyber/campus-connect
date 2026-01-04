import React, { useState, useEffect } from 'react';
import { AdminService, SiteContent } from '../services/adminService';
import { Lock, Save, RefreshCw, LogOut, Layout, UserCog, FileText } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<SiteContent>(AdminService.getContent());
  const [activeTab, setActiveTab] = useState<'general' | 'developer'>('general');
  const [message, setMessage] = useState<string | null>(null);

  // Simple hardcoded password for demo purposes
  const ADMIN_PASSWORD = "admin";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleSave = () => {
    AdminService.saveContent(content);
    setMessage("Changes saved successfully!");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all content to defaults?")) {
      AdminService.resetContent();
      setContent(AdminService.getContent());
      setMessage("Content reset to defaults.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
          <p className="text-slate-400 text-center mb-6 text-sm">Restricted area for site administrators.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-violet-500"
              placeholder="Enter Password"
            />
            <button type="submit" className="w-full bg-gradient-to-r from-green-400 to-pink-500 hover:shadow-pink-500/20 text-white font-bold py-3 rounded-xl transition-all shadow-lg">
              Unlock Dashboard
            </button>
          </form>
          <p className="text-xs text-slate-600 text-center mt-4">Hint: The password is "admin"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400">Manage site content and settings.</p>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'general' ? 'border-violet-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <FileText className="w-4 h-4" /> Pages Content
        </button>
        <button
          onClick={() => setActiveTab('developer')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'developer' ? 'border-violet-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <UserCog className="w-4 h-4" /> Developer Info
        </button>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
         {message && (
            <div className="absolute top-0 left-0 w-full bg-green-500/90 text-white text-center text-sm py-2 font-bold animate-fade-in z-10">
              {message}
            </div>
         )}

         {activeTab === 'general' && (
           <div className="space-y-6">
             <div className="space-y-2">
               <label className="text-sm font-bold text-slate-300">Our Story Text</label>
               <textarea
                 rows={5}
                 className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                 value={content.ourStory}
                 onChange={(e) => setContent({...content, ourStory: e.target.value})}
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-bold text-slate-300">Vision Statement</label>
               <textarea
                 rows={3}
                 className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                 value={content.vision}
                 onChange={(e) => setContent({...content, vision: e.target.value})}
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-bold text-slate-300">Careers Page Text</label>
               <textarea
                 rows={3}
                 className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                 value={content.careersText}
                 onChange={(e) => setContent({...content, careersText: e.target.value})}
               />
             </div>
           </div>
         )}

         {activeTab === 'developer' && (
           <div className="space-y-6">
             <p className="text-sm text-slate-500 bg-slate-950 p-3 rounded-lg border border-slate-800">
                This information appears in the website footer.
             </p>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Developer Name</label>
                  <input
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                    value={content.developer.name}
                    onChange={(e) => setContent({...content, developer: {...content.developer, name: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Role / Title</label>
                  <input
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                    value={content.developer.role}
                    onChange={(e) => setContent({...content, developer: {...content.developer, role: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Contact Email</label>
                  <input
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                    value={content.developer.email}
                    onChange={(e) => setContent({...content, developer: {...content.developer, email: e.target.value}})}
                  />
                </div>
                 <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">Profile Link</label>
                  <input
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                    value={content.developer.link}
                    onChange={(e) => setContent({...content, developer: {...content.developer, link: e.target.value}})}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-300">Quote / Tagline</label>
                  <input
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-violet-500 outline-none"
                    value={content.developer.quote}
                    onChange={(e) => setContent({...content, developer: {...content.developer, quote: e.target.value}})}
                  />
                </div>
             </div>
           </div>
         )}

         <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button 
               onClick={handleReset}
               className="px-4 py-2 text-slate-400 hover:text-white flex items-center gap-2 font-medium transition-colors"
            >
               <RefreshCw className="w-4 h-4" /> Reset Defaults
            </button>
            <button 
               onClick={handleSave}
               className="bg-gradient-to-r from-green-400 to-pink-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-105 transition-all flex items-center gap-2"
            >
               <Save className="w-4 h-4" /> Save Changes
            </button>
         </div>
      </div>
    </div>
  );
};