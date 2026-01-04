import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AuthService } from '../services/authService';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowLeft, 
  Chrome, 
  Linkedin, 
  Lock, 
  Mail,
  Loader2,
  Users,
  ChevronRight,
  Shield,
  Fingerprint
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
  
  // Typewriter effect state
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Malaviyans";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypewriterText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setError('');
  };

  const handleBack = () => {
    setRole(null);
    setError('');
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
          navigate(`/student/${result.user.uid}`);
        }
      } else {
        setError(result.message);
      }
    } catch (e) {
      setError("Authentication failed.");
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
        const targetId = result.user.studentId || 'nitin-deep';
        navigate(`/student/${targetId}`);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cc-gateway-page">
      <div className="cc-bg-layer">
        <div className="cc-grid-overlay"></div>
        <div className="cc-ambient-glow" style={{ top: '10%', left: '10%' }}></div>
        <div className="cc-ambient-glow" style={{ bottom: '10%', right: '10%', background: '#8b5cf6' }}></div>
      </div>

      <main className="cc-main-container">
        {/* Left Side: Editorial Content */}
        <section className="cc-hero-section">
          <div className="cc-welcome-box">
            <h1 className="cc-display-text">
              <span className="cc-text-reveal cc-reveal-1">Welcome</span>
              <span className="cc-text-reveal cc-reveal-2 cc-typewriter-glow">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
          </div>
          
          <div className="cc-brand-meta">
            <div className="cc-brand-name">Campus Connect</div>
            <div className="cc-brand-tag">
               Official Digital Campus Network. A verified platform connecting students, alumni, and faculty through trusted academic identity.
            </div>
          </div>
        </section>

        {/* Right Side: Identity Card */}
        <section className="cc-gateway-section">
          {!role ? (
            <div className="cc-glass-card">
              <div className="cc-card-header">
                <h2>Continue as</h2>
                <div className="cc-header-line"></div>
              </div>

              <div className="cc-role-list">
                {/* Student Row */}
                <button className="cc-role-row" onClick={() => handleRoleSelect('student')}>
                  <div className="cc-role-icon"><GraduationCap size={24} /></div>
                  <div className="cc-role-info">
                    <h4>Student</h4>
                    <p>Enrolled at MMMUT</p>
                    <div className="cc-auth-hint">
                      <Chrome size={12} /> Google Workspace <div className="cc-auth-dot"></div> @mmmut.ac.in
                    </div>
                  </div>
                  <ChevronRight className="ml-auto opacity-30" size={18} />
                </button>

                {/* Alumni Row */}
                <button className="cc-role-row" onClick={() => handleRoleSelect('alumni')}>
                  <div className="cc-role-icon"><Users size={24} /></div>
                  <div className="cc-role-info">
                    <h4>Alumni</h4>
                    <p>Former students & graduates</p>
                    <div className="cc-auth-hint">
                      LinkedIn <div className="cc-auth-dot"></div> Google <div className="cc-auth-dot"></div> Phone
                    </div>
                  </div>
                  <ChevronRight className="ml-auto opacity-30" size={18} />
                </button>

                {/* Faculty Row */}
                <button className="cc-role-row" onClick={() => handleRoleSelect('faculty')}>
                  <div className="cc-role-icon"><ShieldCheck size={24} /></div>
                  <div className="cc-role-info">
                    <h4>Faculty</h4>
                    <p>Teaching & administration</p>
                    <div className="cc-auth-hint">
                      Username <div className="cc-auth-dot"></div> College Email
                    </div>
                  </div>
                  <ChevronRight className="ml-auto opacity-30" size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="cc-glass-card cc-auth-view">
              <button className="cc-back-link" onClick={handleBack}>
                <ArrowLeft size={16} /> Back to roles
              </button>

              <div className="cc-card-header">
                <h2>
                  {role === 'student' ? 'Student Portal' : role === 'alumni' ? 'Alumni Login' : 'Faculty Access'}
                </h2>
                <p className="text-slate-400 text-sm mt-2">Identify yourself to continue</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                   <Lock size={14} /> {error}
                </div>
              )}

              <div className="cc-role-interaction">
                <button className="cc-btn-primary flex items-center justify-center gap-3" onClick={handleGoogleLogin} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Chrome size={20} />}
                  <span>Sign in with {role === 'faculty' ? 'Institution ID' : 'Google'}</span>
                </button>

                {role !== 'student' && (
                  <>
                    <div className="cc-divider"><span>Secure Credentials</span></div>
                    
                    {role === 'alumni' && (
                       <div className="cc-social-grid">
                          <button className="cc-social-btn"><Linkedin size={18} /></button>
                          <button className="cc-social-btn"><Fingerprint size={18} /></button>
                       </div>
                    )}

                    <form onSubmit={handleCredentialLogin}>
                      <div className="cc-input-wrapper">
                        <input 
                          name="username"
                          type="text"
                          className="cc-input"
                          placeholder="University ID / Username"
                          required
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="cc-input-wrapper">
                        <input 
                          name="password"
                          type="password"
                          className="cc-input"
                          placeholder="Password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button type="submit" className="cc-btn-primary" disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Access Dashboard'}
                      </button>
                      <div className="text-center mt-4 text-[10px] text-slate-600 font-mono">
                        DEMO: nitin / 123
                      </div>
                    </form>
                  </>
                )}

                {role === 'student' && (
                   <div className="mt-12 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3 items-start">
                      <Shield className="text-blue-500 shrink-0 mt-1" size={16} />
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Student accounts are strictly restricted to @mmmut.ac.in domains. This ensures all profile data on the leaderboard remains credible and academic-focused.
                      </p>
                   </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="cc-footer-strip">
        <div className="cc-footer-info">
          <strong>Campus Connect</strong> is a secure, identity-verified platform designed for academic collaboration and engagement at Madan Mohan Malaviya University of Technology.
        </div>
        <div className="cc-footer-status">
          <Shield className="cc-pulse-icon" size={14} />
          Secure authentication & identity verification
        </div>
      </footer>
    </div>
  );
};