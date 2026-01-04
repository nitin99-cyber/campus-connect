import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AuthService } from '../services/firebase';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowLeft, 
  Chrome, 
  Linkedin, 
  Lock, 
  ChevronRight,
  Shield,
  Fingerprint,
  Users,
  Loader2,
  Building,
  Smartphone
} from 'lucide-react';
import './Login.css';

const { useNavigate } = ReactRouterDOM;

type Role = 'student' | 'alumni' | 'faculty' | null;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleRoleSelect = (selected: Role) => {
    setRole(selected);
    setError('');
  };

  const handleBack = () => {
    setRole(null);
    setError('');
    setFormData({ username: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await AuthService.loginWithGoogle();
      if (result.success) {
        if (result.isNewUser) {
          navigate('/register', { state: { googleUser: result.user } });
        } else {
          if (role === 'alumni') {
            navigate(`/alumni-profile/${result.user.uid}`);
          } else {
            navigate(`/student/${result.user.uid}`);
          }
        }
      } else {
        setError(result.message);
      }
    } catch (e) {
      setError("Authentication failed. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const result = await AuthService.login(formData.username, formData.password);
      if (result.success) {
        if (role === 'alumni') {
           navigate(`/alumni-profile/${result.user.studentId || 'al-1'}`);
        } else {
           const targetId = result.user.studentId || 'nitin-deep';
           navigate(`/student/${targetId}`);
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Verification failed. Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cc-gateway-page">
      <div className="cc-bg-layer">
        <div className="cc-mesh-overlay"></div>
        <div className="cc-ambient-blob" style={{ top: '5%', left: '5%' }}></div>
        <div className="cc-ambient-blob" style={{ bottom: '10%', right: '5%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)' }}></div>
      </div>

      <main className="cc-main-container">
        {/* Left Section: Hero / Brand Story */}
        <section className="cc-hero-section">
          <div className="cc-welcome-container">
            <h1 className="cc-display-text">
              <span className="cc-reveal cc-reveal-1">Welcome</span>
              <span className="cc-reveal cc-reveal-2 cc-typewriter-glow">
                Malaviyans
              </span>
            </h1>
          </div>
          
          <div className="cc-brand-meta">
            <div className="cc-brand-id">Campus Connect</div>
            <p className="cc-brand-desc">
              The exclusive digital ecosystem for MMMUT. Bridging student innovation with professional alumni networks through verified academic identity.
            </p>
          </div>
        </section>

        {/* Right Section: Gateway Selection Card */}
        <section className="cc-gateway-section">
          {!role ? (
            <div className="cc-glass-card">
              <div className="cc-card-header">
                <h2>Continue as</h2>
                <div className="cc-header-accent"></div>
              </div>

              <div className="cc-role-stack">
                <button className="cc-role-row group/row" onClick={() => handleRoleSelect('student')}>
                  <div className="cc-role-icon-box"><GraduationCap size={40} /></div>
                  <div className="cc-role-details">
                    <h4>Student</h4>
                    <p>Current MMMUT enrollee</p>
                    <div className="cc-auth-badge">
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="16" alt="" /> Workspace Access
                    </div>
                  </div>
                  <ChevronRight className="ml-auto opacity-20 group-hover/row:opacity-100 group-hover/row:translate-x-1 transition-all" size={32} />
                </button>

                <button className="cc-role-row group/row" onClick={() => handleRoleSelect('alumni')}>
                  <div className="cc-role-icon-box"><Users size={40} /></div>
                  <div className="cc-role-details">
                    <h4>Alumni</h4>
                    <p>Graduates & Professionals</p>
                    <div className="cc-auth-badge">
                      Identity Verified
                    </div>
                  </div>
                  <ChevronRight className="ml-auto opacity-20 group-hover/row:opacity-100 group-hover/row:translate-x-1 transition-all" size={32} />
                </button>

                <button className="cc-role-row group/row" onClick={() => handleRoleSelect('faculty')}>
                  <div className="cc-role-icon-box"><ShieldCheck size={40} /></div>
                  <div className="cc-role-details">
                    <h4>Faculty</h4>
                    <p>Academic & Administration</p>
                    <div className="cc-auth-badge">
                      Institutional ID
                    </div>
                  </div>
                  <ChevronRight className="ml-auto opacity-20 group-hover/row:opacity-100 group-hover/row:translate-x-1 transition-all" size={32} />
                </button>
              </div>
            </div>
          ) : (
            <div className="cc-glass-card cc-auth-form-view">
              <button className="cc-back-control flex items-center gap-2 text-slate-500 hover:text-white mb-6 transition-colors" onClick={handleBack}>
                <ArrowLeft size={20} /> Back to roles
              </button>

              <div className="cc-card-header">
                <h2>
                  {role === 'student' ? 'Student Portal' : role === 'alumni' ? 'Alumni Login' : 'Faculty Access'}
                </h2>
                <p className="text-slate-400 text-sm mt-2">Verified secure gateway protocol active.</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8 text-sm flex items-center gap-3">
                   <Shield size={16} /> {error}
                </div>
              )}

              <div className="cc-auth-interaction">
                {role === 'student' ? (
                   <button className="cc-login-btn google" onClick={handleGoogleLogin} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" size={28} /> : <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="28" alt="G" />}
                    <span>Sign in with @mmmut.ac.in</span>
                   </button>
                ) : (
                   <div className="flex flex-col gap-4">
                      {role === 'alumni' && (
                        <button className="cc-login-btn linkedin" onClick={handleGoogleLogin} disabled={isLoading}>
                           <img src="https://www.svgrepo.com/show/448234/linkedin.svg" width="28" alt="L" />
                           <span>Sign in with LinkedIn</span>
                        </button>
                      )}
                      <button className="cc-login-btn google" onClick={handleGoogleLogin} disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" size={28} /> : <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="28" alt="G" />}
                        <span>Sign in with Google Account</span>
                      </button>
                   </div>
                )}

                {role !== 'student' && (
                  <>
                    <div className="flex items-center gap-4 my-8">
                       <div className="h-[1px] flex-1 bg-white/10"></div>
                       <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">OR</span>
                       <div className="h-[1px] flex-1 bg-white/10"></div>
                    </div>
                    
                    <form onSubmit={handleCredentialLogin} className="space-y-4">
                      <div className="cc-input-box">
                        <input 
                          name="username"
                          type="text"
                          className="cc-input-field"
                          placeholder={role === 'alumni' ? "Registration Roll Number" : "University Username"}
                          required
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="cc-input-box">
                        <input 
                          name="password"
                          type="password"
                          className="cc-input-field"
                          placeholder="Passcode"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button type="submit" className="cc-login-btn" disabled={isLoading} style={{background: 'linear-gradient(135deg, var(--cc-blue), #2563eb)', color: '#fff'}}>
                        {isLoading ? 'Verifying Identity...' : 'Unlock Dashboard'}
                      </button>
                      
                      <div className="mt-6 text-center">
                        <div className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">Encryption Node: AES-256-GCM</div>
                      </div>
                    </form>
                  </>
                )}

                {role === 'student' && (
                   <div className="mt-16 p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex gap-5 items-start shadow-inner">
                      <Lock className="text-blue-500 shrink-0 mt-1" size={24} />
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Access is strictly restricted to verified <strong>@mmmut.ac.in</strong> accounts. This protocol ensures the integrity and academic credibility of our digital campus.
                      </p>
                   </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="cc-footer-bar">
        <div className="cc-footer-text">
          <strong>Campus Connect MMMUT</strong> | Digital Identity Hub.
        </div>
        <div className="cc-security-status flex items-center gap-2">
           <Shield size={16} className="text-emerald-500" />
           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Secure Verification Active</span>
        </div>
      </footer>
    </div>
  );
};
