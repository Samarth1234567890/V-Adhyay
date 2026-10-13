import React, { useState } from 'react';
import { 
  Building, Users, Plus, Check, X, ShieldCheck, CheckCircle2, ArrowRight,
  Filter, Search, UserPlus, BookOpen, Clock, AlertTriangle, Layers
} from 'lucide-react';
import { VAdhyayLogo } from '../components/VAdhyayLogo';
import { Classroom, JoinRequest, UserProfile } from '../types';

interface InstituteHomeScreenProps {
  user: UserProfile;
  classrooms: Classroom[];
  joinRequests: JoinRequest[];
  onOpenCreateClassroom: () => void;
  onApproveRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onApproveAllCleared: () => void;
}

export const InstituteHomeScreen: React.FC<InstituteHomeScreenProps> = ({
  user,
  classrooms,
  joinRequests,
  onOpenCreateClassroom,
  onApproveRequest,
  onRejectRequest,
  onApproveAllCleared,
}) => {
  const [activeTab, setActiveTab] = useState<'CLASSROOMS' | 'APPROVALS' | 'FACULTY'>('CLASSROOMS');

  const pendingRequests = joinRequests.filter((r) => r.status === 'PENDING');

  return (
    <div className="flex-1 pb-16 bg-[#FAF7EE] text-stone-900 select-none">
      
      {/* Top Mobile App Bar */}
      <header className="sticky top-0 z-20 bg-[#FAF7EE]/95 backdrop-blur-md px-4 py-2.5 border-b border-stone-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <VAdhyayLogo size={32} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-xs tracking-tight text-[#461820]">V ADHYAY</span>
              <span className="text-[9px] bg-[#461820] text-[#D6B45B] font-bold px-1.5 py-0.2 rounded font-mono">
                INSTITUTE DEAN
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium leading-none">Aventra STEM Institute</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCreateClassroom}
            className="flex items-center gap-1 bg-[#7D202B] hover:bg-[#631821] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Classroom</span>
          </button>

          <div className="w-7 h-7 rounded-full bg-[#461820] text-[#D6B45B] flex items-center justify-center text-xs font-bold border border-[#D6B45B]/40 shadow-xs">
            SR
          </div>
        </div>
      </header>

      {/* Verified Institute Subheader */}
      <div className="px-4 py-2 bg-[#461820] text-white text-[10px] flex items-center justify-between border-b border-[#D6B45B]/30">
        <div className="flex items-center gap-1.5 font-semibold text-[#F7F4EC]">
          <Building className="w-3.5 h-3.5 text-[#D6B45B]" />
          <span>INSTITUTE • {user.instituteName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Active Node</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-[#461820] to-[#2B0E14] text-white p-4 rounded-3xl shadow-lg border border-[#D6B45B]/40">
          <div className="flex items-center justify-between text-[10px] mb-1 text-stone-300">
            <span>Sovereign Academic Protocol</span>
            <span className="text-[#D6B45B] font-bold">Tier Enterprise</span>
          </div>
          <h2 className="text-base font-bold text-white">{user.displayName}</h2>
          <p className="text-xs text-stone-300 mt-0.5">{user.designation}</p>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
            <div>
              <div className="text-[10px] text-stone-400 font-medium">Classrooms</div>
              <div className="text-sm font-bold text-white mt-0.5">{classrooms.length} Managed</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-medium">Pending Approvals</div>
              <div className="text-sm font-bold text-[#D6B45B] mt-0.5">{pendingRequests.length} New</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-medium">Enrolled</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">742 Scholars</div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center bg-stone-200/80 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('CLASSROOMS')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'CLASSROOMS'
                ? 'bg-white text-[#461820] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Classrooms ({classrooms.length})
          </button>
          <button
            onClick={() => setActiveTab('APPROVALS')}
            className={`flex-1 py-1.5 rounded-lg transition-all relative ${
              activeTab === 'APPROVALS'
                ? 'bg-white text-[#461820] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Approvals</span>
            {pendingRequests.length > 0 && (
              <span className="ml-1 bg-[#7D202B] text-white text-[9px] px-1.5 py-0.2 rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('FACULTY')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'FACULTY'
                ? 'bg-white text-[#461820] shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Faculty Fellows
          </button>
        </div>

        {/* Tab: APPROVALS */}
        {activeTab === 'APPROVALS' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900">Pending Membership Approvals</h3>
                <p className="text-[10px] text-stone-500">PRD FR-010 Verification of Fee & Sponsorship</p>
              </div>
              {pendingRequests.length > 0 && (
                <button
                  onClick={onApproveAllCleared}
                  className="text-[10px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-2.5 py-1 rounded-lg shadow-2xs"
                >
                  Approve All Cleared
                </button>
              )}
            </div>

            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-stone-900">All Approvals Cleared</h4>
                <p className="text-[11px] text-stone-500 mt-1">No pending classroom membership requests.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingRequests.map((req) => (
                  <div key={req.requestId} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-[#461820] text-white text-[10px] font-bold flex items-center justify-center">
                          {req.requesterName[0]}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-stone-900">{req.requesterName}</span>
                          <span className="text-[10px] text-stone-500 ml-1.5 font-semibold">({req.requesterRole})</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">{req.requestedAt}</span>
                    </div>

                    <div className="p-2 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-stone-500">Target Classroom: </span>
                        <strong className="text-stone-900 font-mono">{req.classroomCode}</strong>
                      </div>
                      <span className="text-[10px] font-bold text-[#7D202B] bg-[#7D202B]/10 px-2 py-0.5 rounded">
                        {req.feeStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onRejectRequest(req.requestId)}
                        className="flex-1 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => onApproveRequest(req.requestId)}
                        className="flex-1 py-1.5 bg-[#7D202B] hover:bg-[#631821] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: CLASSROOMS */}
        {activeTab === 'CLASSROOMS' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900">Institute Classrooms</h3>
                <p className="text-[10px] text-stone-500">Unique Classroom ID lookup & management</p>
              </div>
              <button
                onClick={onOpenCreateClassroom}
                className="text-xs font-bold text-[#7D202B] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {classrooms.map((cls) => (
                <div key={cls.classroomId} className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#7D202B] bg-[#7D202B]/10 px-2 py-0.5 rounded-md">
                      {cls.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      cls.liveStreamStatus === 'LIVE_NOW'
                        ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse'
                        : cls.liveStreamStatus === 'SCHEDULED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {cls.liveStreamStatus === 'LIVE_NOW' ? 'Live Stream Active' :
                       cls.liveStreamStatus === 'SCHEDULED' ? 'Scheduled' : 'Inactive'}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 text-xs mt-1.5">{cls.name}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Faculty: {cls.assignedFacultyName}</p>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
                    <div>
                      <span>Occupancy: </span>
                      <strong className="text-stone-900">{cls.enrolledCount} / {cls.capacity}</strong>
                    </div>
                    <span className="font-semibold text-[#7D202B]">
                      {cls.accessMode === 'FREE' ? 'Free Open Node' : `Paid (₹${cls.feeAmount}${cls.billingPeriod || ''})`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: FACULTY */}
        {activeTab === 'FACULTY' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900">Affiliated Faculty Fellows</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Dr. Vikram Seth</h4>
                  <p className="text-[10px] text-stone-500">Dean of Theoretical Physics • Fellow #FAC-4401</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Verified Active
                </span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Prof. Dr. A. Sen</h4>
                  <p className="text-[10px] text-stone-500">Chair of Pure Analysis • Fellow #FAC-1029</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Verified Active
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
