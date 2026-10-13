import React, { useState } from 'react';
import { 
  Eye, EyeOff, Lock, User, ShieldCheck, ArrowRight, Fingerprint, 
  AlertCircle, KeyRound, CheckCircle2, UserCheck
} from 'lucide-react';
import { VAdhyayLogo } from '../components/VAdhyayLogo';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  
  // Trial credentials requested by user: username: samarth | password: 1234
  const [username, setUsername] = useState('samarth');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleRoleSwitch = (role: 'STUDENT' | 'ADMIN') => {
    setSelectedRole(role);
    setErrorMsg('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanUsername) {
      setErrorMsg('Please enter your username or ID');
      return;
    }
    if (!cleanPassword) {
      setErrorMsg('Please enter your password');
      return;
    }

    // Trial verification: username: samarth (or admin) & password: 1234
    const isUsernameValid = cleanUsername === 'samarth' || cleanUsername === 'admin' || cleanUsername.includes('samarth');
    const isPasswordValid = cleanPassword === '1234';

    if (isUsernameValid && isPasswordValid) {
      setIsLoading(true);
      setErrorMsg('');

      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(selectedRole);
      }, 500);
    } else {
      setErrorMsg('Invalid credentials. For trial access, use Username: samarth and Password: 1234');
    }
  };

  const handleBiometricLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 450);
  };

  return (
    <div className="flex-1 bg-[#FAF7EE] text-stone-900 flex flex-col justify-between p-5 select-none min-h-full">
      
      {/* Top Brand Banner with Full Unclipped V Adhyay Emblem */}
      <div className="text-center pt-3 pb-2 flex flex-col items-center">
        {/* Generous container ensuring the circular logo and all glyphs are 100% visible */}
        <div className="w-24 h-24 mb-2 flex items-center justify-center">
          <VAdhyayLogo size={96} />
        </div>
        
        <h1 className="text-2xl font-serif font-black tracking-tight text-[#461820] mt-1">
          V ADHYAY
        </h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#7D202B]/10 border border-[#7D202B]/20 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7D202B] animate-pulse" />
          <span className="text-[10px] text-[#7D202B] font-bold tracking-widest uppercase font-mono">
            Academic Sovereignty Platform
          </span>
        </div>
        <p className="text-[11px] text-stone-500 max-w-[260px] mx-auto mt-2 leading-tight">
          Connecting students, educators, and institutions on Android.
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-4 my-auto">
        
        {/* Role Toggle: 2 Portals Only (Student and Admin) */}
        <div>
          <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
            Select Portal
          </label>
          <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => handleRoleSwitch('STUDENT')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === 'STUDENT'
                  ? 'bg-[#7D202B] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSwitch('ADMIN')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === 'ADMIN'
                  ? 'bg-[#461820] text-[#D6B45B] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-1.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-3">
          {/* Username Field */}
          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#7D202B]"
                placeholder="Enter username (trial: samarth)"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field with Active Show/Hide toggle */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-stone-700">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[10px] text-[#7D202B] font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#7D202B]"
                placeholder="Enter password (trial: 1234)"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-500 hover:text-stone-700 focus:outline-none cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-[#7D202B]" />
                ) : (
                  <Eye className="w-4 h-4 text-stone-400" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me checkbox */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#7D202B] accent-[#7D202B]"
              />
              <span className="text-[11px] text-stone-600 font-medium">Keep signed in on this device</span>
            </label>
          </div>

          {/* Sign In Primary CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 mt-1 ${
              selectedRole === 'STUDENT'
                ? 'bg-[#7D202B] hover:bg-[#661821]'
                : 'bg-[#461820] hover:bg-[#341117] text-[#D6B45B]'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In as {selectedRole === 'STUDENT' ? 'Student' : 'Admin'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Biometric Quick Unlock */}
        <div className="pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={handleBiometricLogin}
            disabled={isLoading}
            className="w-full py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-[11px] font-bold text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Fingerprint className="w-4 h-4 text-[#D6B45B]" />
            <span>Biometric Quick Unlock</span>
          </button>
        </div>

        {/* Trial Access Hint */}
        <div className="bg-[#FAF7EE] py-2 px-3 rounded-xl border border-[#D6B45B]/40 text-center">
          <span className="text-[10px] font-medium text-stone-600">
            Trial Credentials • Username: <strong className="text-[#7D202B] font-mono">samarth</strong> | Password: <strong className="text-[#7D202B] font-mono">1234</strong>
          </span>
        </div>

      </div>

      {/* Security Footer Notice */}
      <div className="text-center text-[10px] text-stone-500 max-w-[300px] mx-auto pt-2 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#D6B45B] shrink-0" />
        <span>PRD v1.0 Role Governance: Secure Firebase Session Token</span>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 shadow-2xl border border-stone-200 text-stone-900 animate-in zoom-in-95">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-5 h-5 text-[#7D202B]" />
              <h3 className="text-sm font-bold text-stone-900">Reset Credentials</h3>
            </div>
            
            {forgotSent ? (
              <div className="py-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-stone-900">OTP Sent Successfully!</p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Verification code dispatched for user samarth.
                </p>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="mt-4 w-full py-2 bg-[#7D202B] text-white text-xs font-bold rounded-xl"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <div>
                <p className="text-[11px] text-stone-500 mb-3">
                  Enter your registered username (samarth) to receive an OTP reset code.
                </p>
                <input
                  type="text"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="samarth"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs mb-3 text-stone-900"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setForgotSent(true)}
                    className="flex-1 py-2 bg-[#7D202B] hover:bg-[#631821] text-white text-xs font-bold rounded-xl"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
