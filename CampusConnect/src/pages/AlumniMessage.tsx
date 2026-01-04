
import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AlumniService } from '../services/alumniService';
import { Alumni } from '../types';
import { ChevronLeft, Send, Paperclip, AlertCircle, Lock, Image, FileText, File } from 'lucide-react';

const { useParams, Link } = ReactRouterDOM;

export const AlumniMessage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'user' | 'alumni'}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAttachments, setShowAttachments] = useState(false);
  
  const MAX_MESSAGES = 5;
  const messagesSent = messages.filter(m => m.sender === 'user').length;
  const isLimitReached = messagesSent >= MAX_MESSAGES;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
       if (id) {
           const data = await AlumniService.getAlumniById(id);
           setAlumni(data || null);
       }
       setLoading(false);
    };
    load();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLimitReached) return;

    const newMsg = { id: Date.now(), text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setShowAttachments(false);
  };

  const toggleAttachments = () => {
      setShowAttachments(!showAttachments);
  }

  if (loading) return <div className="min-h-screen pt-24 text-center text-white">Loading...</div>;
  if (!alumni) return <div className="min-h-screen pt-24 text-center text-white">Alumni not found.</div>;

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col pt-4 pb-4 relative">
       
       {/* Header */}
       <div className="flex items-center gap-4 bg-panel/90 backdrop-blur-md border border-white/10 p-4 rounded-t-[24px] shadow-sm">
           <Link to="/alumni" className="p-2 hover:bg-white/5 rounded-full text-textSecondary transition-colors">
              <ChevronLeft className="w-5 h-5" />
           </Link>
           <img src={alumni.avatar} alt={alumni.name} className="w-10 h-10 rounded-full border border-white/10" />
           <div>
              <h2 className="font-bold text-white leading-tight">{alumni.name}</h2>
              <p className="text-xs text-textSecondary">{alumni.role} at {alumni.company}</p>
           </div>
           <div className="ml-auto flex flex-col items-end">
               <span className="text-xs font-mono font-bold text-primary px-2 py-1 bg-primary/10 rounded-md border border-primary/20">
                  {MAX_MESSAGES - messagesSent} Messages Left
               </span>
           </div>
       </div>

       {/* Chat Area */}
       <div ref={scrollRef} className="flex-1 bg-slate-900/50 border-x border-white/5 overflow-y-auto p-6 space-y-4">
           {/* System Welcome Message */}
           <div className="flex justify-center my-6">
              <span className="text-xs text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                 You connected with {alumni.name}
              </span>
           </div>

           {messages.length === 0 && (
               <div className="text-center text-slate-500 mt-20">
                  <p className="mb-2">Start a professional conversation.</p>
                  <p className="text-xs">Ask for career advice, referral process, or industry insights.</p>
               </div>
           )}

           {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl p-4 text-sm ${
                      msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none'
                  }`}>
                      {msg.text}
                  </div>
              </div>
           ))}
       </div>

       {/* Input Area */}
       <div className="bg-panel/90 backdrop-blur-md border border-white/10 p-4 rounded-b-[24px] relative">
           
           {/* Attachment Popover */}
           {showAttachments && (
               <div className="absolute bottom-20 left-4 bg-slate-800 border border-slate-700 p-2 rounded-xl flex gap-2 animate-fadeIn shadow-2xl z-20">
                   <button className="flex flex-col items-center gap-1 p-2 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors">
                       <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                           <Image className="w-4 h-4" />
                       </div>
                       <span className="text-[10px]">Photo</span>
                   </button>
                   <button className="flex flex-col items-center gap-1 p-2 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors">
                       <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                           <FileText className="w-4 h-4" />
                       </div>
                       <span className="text-[10px]">Doc</span>
                   </button>
                   <button className="flex flex-col items-center gap-1 p-2 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors">
                       <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                           <File className="w-4 h-4" />
                       </div>
                       <span className="text-[10px]">File</span>
                   </button>
               </div>
           )}

           {isLimitReached ? (
               <div className="flex items-center justify-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 text-sm">
                   <Lock className="w-4 h-4" />
                   <span>Messaging limit reached. Wait for alumni approval to continue.</span>
               </div>
           ) : (
               <form onSubmit={handleSend} className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={toggleAttachments}
                    className={`p-3 rounded-xl transition-colors ${showAttachments ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                     <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                     type="text"
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder="Type a respectful message..."
                     className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 text-white focus:border-primary outline-none transition-colors"
                  />
                  <button 
                     type="submit" 
                     disabled={!inputValue.trim()}
                     className="p-3 bg-primary text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
                  >
                     <Send className="w-5 h-5" />
                  </button>
               </form>
           )}
           <div className="text-center mt-2">
               <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Be professional. Spamming will lead to an account ban.
               </p>
           </div>
       </div>
    </div>
  );
};
