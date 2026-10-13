import React, { useState } from 'react';
import { 
  Users, Video, Plus, Calendar, Clock, BookOpen, CheckCircle, Award, 
  ExternalLink, FileText, ArrowRight, ShieldCheck, ChevronRight, Play, Radio, Share2
} from 'lucide-react';
import { VAdhyayLogo } from '../components/VAdhyayLogo';
import { Classroom, LiveSession, UserProfile } from '../types';

interface TeacherHomeScreenProps {
  user: UserProfile;
  classrooms: Classroom[];
  onEnterLiveBroadcaster: (session: LiveSession) => void;
  onOpenCreateSession: () => void;
  onShareClassroomCode: (code: string) => void;
}

export const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = ({
  user,
  classrooms,
  onEnterLiveBroadcaster,
  onOpenCreateSession,
  onShareClassroomCode,
}) => {
  const [activeTab, setActiveTab] = useState<'MY_CLASSES' | 'SCHEDULE' | 'STUDENTS'>('MY_CLASSES');

  // Classrooms taught by Dr. Vikram Seth
  const teacherClassrooms = classrooms.filter(
    (c) => c.assignedFacultyName.includes('Vikram') || c.assignedFacultyName.includes('Sen')
  );

  return (
    <div className="flex-1 pb-16 bg-[#FAF7EE] text-stone-900 select-none">
      
      {/* Top Mobile App Bar */}
      <header className="sticky top-0 z-20 bg-[#FAF7EE]/95 backdrop-blur-md px-4 py-2.5 border-b border-stone-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <VAdhyayLogo size={32} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-xs tracking-tight text-[#461820]">V ADHYAY</span>
              <span className="text-[9px] bg-[#D6B45B]/30 text-[#461820] font-bold px-1.5 py-0.2 rounded font-mono">
                FACULTY FELLOW
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium leading-none">Educator Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCreateSession}
            className="flex items-center gap-1 bg-[#7D202B] hover:bg-[#631821] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Class</span>
          </button>
          
          <div className="w-7 h-7 rounded-full bg-[#7D202B] text-white flex items-center justify-center text-xs font-bold shadow-xs">
            VS
          </div>
        </div>
      </header>

      {/* Verified Faculty Banner */}
      <div className="px-4 py-2 bg-[#461820] text-white text-[10px] flex items-center justify-between border-b border-[#D6B45B]/30">
        <div className="flex items-center gap-1.5 font-semibold text-[#F7F4EC]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D6B45B]" />
          <span>TEACHER • {user.scholarId || '#FAC-4401'} • VERIFIED FELLOW</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Broadcaster Ready</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Welcome Header */}
        <div>
          <h1 className="text-xl font-serif font-black tracking-tight text-[#461820]">
            Welcome, {user.displayName}
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            {user.designation} • Linked to 2 Sovereign Institutes & Independent Node.
          </p>
        </div>

        {/* Live Broadcast Hero Card */}
        <div className="bg-gradient-to-br from-[#7D202B] to-[#461820] text-white p-4 rounded-3xl shadow-lg border border-[#D6B45B]/40">
          <div className="flex items-center justify-between text-[10px] font-mono mb-2">
            <span className="bg-red-500/20 text-red-200 font-bold px-2 py-0.5 rounded-full border border-red-400/30 flex items-center gap-1">
              <Radio className="w-3 h-3 text-red-400 animate-pulse" />
              LIVE BROADCAST CONSOLE
            </span>
            <span className="text-[#D6B45B] font-bold">Room #LV-892</span>
          </div>

          <h3 className="text-sm font-bold text-white">
            Advanced Mechanics & Thermodynamics: Canonical Transformations
          </h3>
          <p className="text-xs text-stone-200 mt-1">
            Assigned: Aventra Science Foundation • 58 Enrolled Scholars Waiting
          </p>

          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={() => onShareClassroomCode('#PCM-102')}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-white/10"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D6B45B]" />
              <span>Invite (#PCM-102)</span>
            </button>
            <button
              onClick={() => onEnterLiveBroadcaster({
                sessionId: 'ses_pcm_broadcast',
                classroomId: 'cls_pcm_102',
                classroomCode: '#PCM-102',
                title: 'Advanced Mechanics & Thermodynamics',
                instructorName: 'Dr. Vikram Seth',
                instructorTitle: 'Dean of Theoretical Phys.',
                startsAt: '',
                startsAtFormatted: 'Live Broadcaster',
                durationMinutes: 90,
                roomCode: '#LV-892',
                isLiveNow: true,
                joinPolicy: 'ENTITLED_ONLY',
              })}
              className="flex-1 py-2 bg-[#D6B45B] hover:bg-[#c4a148] text-[#461820] text-[11px] font-black rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Video className="w-4 h-4 text-[#461820]" />
              <span>Start Live Class</span>
            </button>
          </div>
        </div>

        {/* Quick Teacher Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-2.5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] text-stone-500 font-semibold uppercase">Classrooms</span>
            <div className="text-base font-black text-[#461820] mt-0.5">3 Assigned</div>
          </div>
          <div className="bg-white p-2.5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] text-stone-500 font-semibold uppercase">Total Scholars</span>
            <div className="text-base font-black text-[#461820] mt-0.5">226 Enrolled</div>
          </div>
          <div className="bg-white p-2.5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] text-stone-500 font-semibold uppercase">Doubts Active</span>
            <div className="text-base font-black text-emerald-700 mt-0.5">5 In Queue</div>
          </div>
        </div>

        {/* Assigned Classrooms Roster */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Assigned Classrooms & Roster
            </h2>
            <span className="text-[10px] text-stone-500 font-mono">FR-011 Multi-Institute</span>
          </div>

          <div className="space-y-3">
            {teacherClassrooms.map((cls) => (
              <div key={cls.classroomId} className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#7D202B] bg-[#7D202B]/10 px-2 py-0.5 rounded-md">
                    {cls.code}
                  </span>
                  <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                    {cls.enrolledCount} / {cls.capacity} Scholars
                  </span>
                </div>

                <h3 className="font-bold text-stone-900 text-xs mt-1.5">{cls.name}</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">{cls.instituteName} • {cls.category}</p>

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-[#D6B45B] bg-[#461820] px-2 py-0.5 rounded-md">
                    {cls.accessMode === 'FREE' ? 'Open Access' : `Paid (₹${cls.feeAmount})`}
                  </span>

                  <button
                    onClick={() => onShareClassroomCode(cls.code)}
                    className="text-xs font-bold text-[#7D202B] hover:text-[#461820] flex items-center gap-1"
                  >
                    <span>Manage Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
