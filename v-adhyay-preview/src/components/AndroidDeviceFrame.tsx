import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, ChevronLeft, Home, Square, Code, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface AndroidDeviceFrameProps {
  children: React.ReactNode;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenSourceInspector: () => void;
  onBackGesture?: () => void;
  canGoBack?: boolean;
  isLoggedIn: boolean;
  onToggleLoginState: () => void;
}

export const AndroidDeviceFrame: React.FC<AndroidDeviceFrameProps> = ({
  children,
  activeRole,
  onRoleChange,
  onOpenSourceInspector,
  onBackGesture,
  canGoBack = false,
  isLoggedIn,
  onToggleLoginState,
}) => {
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0C0E] text-stone-200 flex flex-col items-center justify-start py-3 px-2 sm:px-4 selection:bg-[#7D202B] selection:text-white">
      {/* Top Controller Bar - External to Phone Frame for Engineer / Evaluator */}
      <header className="w-full max-w-4xl mb-3 flex flex-wrap items-center justify-between gap-3 bg-[#1A1619] border border-[#7D202B]/30 rounded-2xl px-4 py-2.5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">V ADHYAY</span>
              <span className="text-[10px] font-mono bg-[#7D202B]/60 text-[#D6B45B] px-2 py-0.5 rounded-full font-semibold border border-[#D6B45B]/30">
                2 DASHBOARDS + LOGIN
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Targeted Android Architecture: Student Dashboard • Admin Dashboard • Native Login Flow
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* 2 Dashboards Only Switcher: Student & Admin */}
          {isLoggedIn ? (
            <div className="flex items-center bg-[#241F23] rounded-xl p-1 border border-stone-800">
              <span className="text-[10px] font-semibold text-[#D6B45B] uppercase tracking-wider px-2">Dashboard:</span>
              <button
                onClick={() => onRoleChange('STUDENT')}
                className={`text-[11px] font-medium px-3 py-1 rounded-lg transition-all ${
                  activeRole === 'STUDENT'
                    ? 'bg-[#7D202B] text-white shadow-sm font-bold'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => onRoleChange('ADMIN')}
                className={`text-[11px] font-medium px-3 py-1 rounded-lg transition-all ${
                  activeRole === 'ADMIN' || activeRole === 'SUPER_ADMIN'
                    ? 'bg-[#461820] text-[#D6B45B] shadow-sm font-bold border border-[#D6B45B]/30'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Admin
              </button>
            </div>
          ) : (
            <div className="text-[11px] font-semibold text-[#D6B45B] bg-[#241F23] px-3 py-1.5 rounded-xl border border-stone-800">
              Viewing Login Screen
            </div>
          )}

          {/* Toggle Login Page Button */}
          <button
            onClick={onToggleLoginState}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-md active:scale-95 ${
              isLoggedIn
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                : 'bg-[#7D202B] hover:bg-[#631821] text-white'
            }`}
            title={isLoggedIn ? 'Sign out to view Login Page' : 'Enter Active Session'}
          >
            {isLoggedIn ? <LogOut className="w-3.5 h-3.5 text-[#D6B45B]" /> : <LogIn className="w-3.5 h-3.5 text-white" />}
            <span>{isLoggedIn ? 'Sign Out to Login Page' : 'Resume Session'}</span>
          </button>

          {/* Android Studio Source Inspector Modal Opener */}
          <button
            onClick={onOpenSourceInspector}
            className="flex items-center gap-1.5 bg-[#D6B45B] hover:bg-[#c4a148] text-[#461820] text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-md active:scale-95"
            title="Inspect Kotlin & Jetpack Compose Android Studio project code"
          >
            <Code className="w-4 h-4" />
            <span>Android Code</span>
          </button>
        </div>
      </header>

      {/* Flagship Android Phone Mockup (Google Pixel 9 Pro dimensions / aspect ratio) */}
      <div className="relative w-full max-w-[430px] h-[890px] bg-black rounded-[48px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(214,180,91,0.25)] border-[3px] border-[#2E282C] flex flex-col overflow-hidden">
        
        {/* Subtle phone hardware buttons on the side */}
        <div className="absolute -left-[5px] top-[140px] w-[3px] h-[45px] bg-[#3D353A] rounded-l" />
        <div className="absolute -left-[5px] top-[200px] w-[3px] h-[80px] bg-[#3D353A] rounded-l" />
        <div className="absolute -right-[5px] top-[180px] w-[3px] h-[65px] bg-[#3D353A] rounded-r" />

        {/* Outer Bezel Screen Frame */}
        <div className="relative w-full h-full bg-[#FAF7EE] rounded-[38px] overflow-hidden flex flex-col border border-black/10">

          {/* Android 15 Status Bar */}
          <div className="h-10 bg-[#FAF7EE] px-6 flex items-center justify-between text-stone-900 shrink-0 select-none z-30 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-tight text-stone-900">{currentTime}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D202B]" title="V Adhyay Service Node" />
            </div>

            {/* Front Camera Punch-hole */}
            <div className="w-4 h-4 rounded-full bg-black/90 shadow-inner flex items-center justify-center -mr-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0a1a2f]/60" />
            </div>

            <div className="flex items-center gap-2 text-stone-800">
              <span className="text-[10px] font-bold tracking-tight text-stone-700">5G</span>
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-bold">96%</span>
                <Battery className="w-4 h-4 fill-stone-800" />
              </div>
            </div>
          </div>

          {/* Main Mobile App Screen Surface */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col bg-[#FAF7EE]">
            {children}
          </div>

          {/* Android Material 3 Navigation Bar (Gesture Pill + Back Gestures) */}
          <div className="h-8 bg-[#FAF7EE] px-8 flex items-center justify-between shrink-0 border-t border-stone-200/60 z-30">
            <button
              onClick={onBackGesture}
              disabled={!canGoBack}
              className={`p-1 rounded-full transition-opacity ${canGoBack ? 'opacity-80 hover:opacity-100 text-stone-800' : 'opacity-20 text-stone-400 cursor-not-allowed'}`}
              title="Android Back Gesture"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Android Home Pill Indicator */}
            <div
              onClick={() => onRoleChange('STUDENT')}
              className="w-32 h-1 bg-stone-700/60 rounded-full hover:bg-[#7D202B] transition-colors cursor-pointer"
              title="Home Gesture"
            />

            <div className="w-4 h-4 flex items-center justify-center opacity-40">
              <Square className="w-3 h-3 text-stone-800" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Information Subtitle */}
      <footer className="mt-2 text-center text-[11px] text-stone-400 max-w-md">
        Designed strictly for Android Mobile. Two streamlined dashboards (Student & Admin) with genuine Material 3 login.
      </footer>
    </div>
  );
};
