import React, { useState } from 'react';
import { 
  ShieldAlert, Activity, Users, Database, Check, X, ShieldCheck, 
  Terminal, Server, Lock, AlertOctagon, TrendingUp, RefreshCw, FileText
} from 'lucide-react';
import { VAdhyayLogo } from '../components/VAdhyayLogo';
import { Classroom, PlatformTelemetry, UserProfile } from '../types';

interface AdminHomeScreenProps {
  user: UserProfile;
  classrooms: Classroom[];
  telemetry: PlatformTelemetry;
  isSuperAdmin?: boolean;
  onSignOut?: () => void;
}

export const AdminHomeScreen: React.FC<AdminHomeScreenProps> = ({
  user,
  classrooms,
  telemetry,
  isSuperAdmin = false,
  onSignOut,
}) => {
  const [activeSection, setActiveSection] = useState<'TELEMETRY' | 'CLASSROOMS' | 'GOVERNANCE'>('TELEMETRY');
  const [sentinelTestResult, setSentinelTestResult] = useState<string | null>(null);

  const simulateRoleEscalationProbe = () => {
    setSentinelTestResult('PROBE DETECTED: Scholar client attempted to alter role claim to "ADMIN". BLOCKED by Firestore Security Rules.');
    setTimeout(() => {
      setSentinelTestResult(null);
    }, 4000);
  };

  return (
    <div className="flex-1 pb-16 bg-[#FAF7EE] text-stone-900 select-none">
      
      {/* Top Mobile App Bar */}
      <header className="sticky top-0 z-20 bg-[#FAF7EE]/95 backdrop-blur-md px-3.5 py-2 border-b border-stone-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <VAdhyayLogo size={36} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-sm tracking-tight text-[#461820]">V ADHYAY</span>
              <span className="text-[9px] bg-[#461820] text-[#D6B45B] font-bold px-1.5 py-0.2 rounded font-mono border border-[#D6B45B]/30">
                ADMIN PORTAL
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium leading-none">Sovereign Architecture</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Node Live</span>
          </div>

          {onSignOut && (
            <button
              onClick={onSignOut}
              className="p-1.5 rounded-xl text-stone-500 hover:text-[#7D202B] hover:bg-[#7D202B]/10 transition-colors"
              title="Sign Out to Login Page"
            >
              <span className="text-[10px] font-bold">Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* Admin Role Ribbon */}
      <div className="px-4 py-2 bg-[#461820] text-white text-[10px] flex items-center justify-between border-b border-[#D6B45B]/30 font-mono">
        <div className="flex items-center gap-1.5 font-semibold text-[#F7F4EC]">
          <Lock className="w-3.5 h-3.5 text-[#D6B45B]" />
          <span>PRODUCTION v1.0 • NODE - BLR - 04</span>
        </div>
        <span className="text-[#D6B45B] font-bold">SOVEREIGN ROOT</span>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Main Stat KPI Grid matching image.png */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Active Classrooms */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-stone-500 uppercase">Active Classrooms</span>
              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded">+18 wk</span>
            </div>
            <div className="text-xl font-black text-[#461820] mt-0.5">{telemetry.activeClassrooms}</div>
            <p className="text-[10px] text-stone-500 mt-1">Across 24 Institutes • 94.2% Occupancy</p>
          </div>

          {/* Connected Faculty */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-500 uppercase">Connected Faculty</span>
            <div className="text-xl font-black text-[#461820] mt-0.5">{telemetry.connectedFaculty} Fellows</div>
            <p className="text-[10px] text-stone-500 mt-1">380 Institutional • 132 Independent</p>
          </div>

          {/* Registered Scholars */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-stone-500 uppercase">Registered Scholars</span>
              <span className="text-[9px] text-emerald-700 font-bold">89.4% Active</span>
            </div>
            <div className="text-xl font-black text-[#461820] mt-0.5">{telemetry.registeredScholars.toLocaleString('en-IN')}</div>
            <p className="text-[10px] text-stone-500 mt-1">Daily Active: 6,420 • Tier Sovereign</p>
          </div>

          {/* 30-Day Entitlement Volume */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-500 uppercase">30-Day Volume</span>
            <div className="text-xl font-black text-emerald-700 mt-0.5">₹18,42,500</div>
            <p className="text-[10px] text-stone-500 mt-1">Razorpay Webhooks: 99.1% Success</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center bg-stone-200/80 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveSection('TELEMETRY')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeSection === 'TELEMETRY' ? 'bg-white text-[#461820] shadow-xs' : 'text-stone-600'
            }`}
          >
            Telemetry & Sentinel
          </button>
          <button
            onClick={() => setActiveSection('CLASSROOMS')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeSection === 'CLASSROOMS' ? 'bg-white text-[#461820] shadow-xs' : 'text-stone-600'
            }`}
          >
            Classroom Registry
          </button>
          <button
            onClick={() => setActiveSection('GOVERNANCE')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeSection === 'GOVERNANCE' ? 'bg-white text-[#461820] shadow-xs' : 'text-stone-600'
            }`}
          >
            Audit Trail
          </button>
        </div>

        {/* Section: Telemetry */}
        {activeSection === 'TELEMETRY' && (
          <div className="space-y-3">
            {/* Live Infrastructure Telemetry Box */}
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#7D202B]" />
                  <h3 className="text-xs font-bold text-stone-900">Live Infrastructure Telemetry</h3>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Health 99.8%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-500 block">WebRTC Mesh & SFU</span>
                  <strong className="text-stone-900 text-sm">8 Rooms Streaming</strong>
                  <p className="text-[10px] text-stone-500 mt-0.5">Zero packet loss detected</p>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-[10px] text-stone-500 block">Razorpay Webhooks</span>
                  <strong className="text-stone-900 text-sm">100% Operational</strong>
                  <p className="text-[10px] text-stone-500 mt-0.5">Avg latency: 42ms</p>
                </div>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-600 font-medium">24h SFU Bitrate & Audio Peak</span>
                <span className="text-xs font-mono font-bold text-[#7D202B]">2.4 Gbps Peak</span>
              </div>
            </div>

            {/* Role Self-Escalation Sentinel */}
            <div className="bg-[#461820] text-white p-4 rounded-3xl border border-[#D6B45B]/40 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#D6B45B]" />
                  <h3 className="text-xs font-bold text-white">Role Self-Escalation Sentinel</h3>
                </div>
                <span className="text-[9px] font-mono bg-red-500/20 text-red-200 border border-red-400/40 px-2 py-0.5 rounded-full font-bold">
                  ACTIVE DEFENSE
                </span>
              </div>

              <p className="text-[11px] text-stone-200 leading-relaxed">
                PRD Section 4 & 12 Enforcement: Public registration strictly forbids self-assigned Admin or Super Admin privileges. Role claims are token-validated via trusted Cloud Functions.
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  <span>Strict Role Governance Active</span>
                </div>
                <button
                  onClick={simulateRoleEscalationProbe}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-[#D6B45B] text-[10px] font-bold rounded-lg border border-white/10"
                >
                  Test Defense Probe
                </button>
              </div>

              {sentinelTestResult && (
                <div className="p-2.5 bg-red-950/80 border border-red-500/50 rounded-xl text-[10px] font-mono text-red-200 animate-in fade-in">
                  {sentinelTestResult}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section: Classrooms */}
        {activeSection === 'CLASSROOMS' && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-stone-900">Sovereign Classroom Registry</h3>
            {classrooms.map((cls) => (
              <div key={cls.classroomId} className="bg-white p-3 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#7D202B] bg-[#7D202B]/10 px-2 py-0.5 rounded">
                      {cls.code}
                    </span>
                    <span className="text-xs font-bold text-stone-900">{cls.name}</span>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-0.5">{cls.instituteName} • {cls.assignedFacultyName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-stone-700 block">{cls.enrolledCount}/{cls.capacity}</span>
                  <span className="text-[9px] text-stone-500">{cls.accessMode}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section: Governance */}
        {activeSection === 'GOVERNANCE' && (
          <div className="bg-white p-4 rounded-3xl border border-stone-200 space-y-2.5">
            <h3 className="text-xs font-bold text-stone-900">Cryptographic Audit Ledger</h3>
            <div className="space-y-2 text-[10px] font-mono text-stone-700">
              <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                <span className="text-stone-400">14:31:02 UTC</span> — Entitlement Issued for #LAW-106 via Razorpay webhook. Txn #TXN-8449-VAD verified.
              </div>
              <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                <span className="text-stone-400">14:28:44 UTC</span> — SFU Room #LIVE-MATH-01 session initialized for Dr. A. Sen. 142 tokens authorized.
              </div>
              <div className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                <span className="text-stone-400">14:15:10 UTC</span> — Institutional membership sync: Aventra STEM Institute added Batch #PHYS-102.
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
