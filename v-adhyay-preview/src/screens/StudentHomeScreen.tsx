import React, { useState } from 'react';
import { 
  Bell, Search, Plus, Calendar, Clock, BookOpen, CheckCircle, Award, 
  ExternalLink, FileText, ArrowRight, ShieldCheck, ChevronRight, Check, X, Download, AlertCircle, PlayCircle
} from 'lucide-react';
import { VAdhyayLogo } from '../components/VAdhyayLogo';
import { Classroom, LiveSession, InstitutionalInvitation, JoinRequest, AcademicTransaction, UserProfile } from '../types';

interface StudentHomeScreenProps {
  user: UserProfile;
  classrooms: Classroom[];
  imminentSession: LiveSession;
  invitations: InstitutionalInvitation[];
  joinRequests: JoinRequest[];
  transactions: AcademicTransaction[];
  onOpenJoinModal: (initialCode?: string) => void;
  onEnterLiveRoom: (session: LiveSession) => void;
  onAcceptInvitation: (invitationId: string) => void;
  onDeclineInvitation: (invitationId: string) => void;
  onOpenPaidCheckout: (classroom: Classroom) => void;
  onSignOut?: () => void;
}

export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({
  user,
  classrooms,
  imminentSession,
  invitations,
  joinRequests,
  transactions,
  onOpenJoinModal,
  onEnterLiveRoom,
  onAcceptInvitation,
  onDeclineInvitation,
  onOpenPaidCheckout,
  onSignOut,
}) => {
  const [activeCourseTab, setActiveCourseTab] = useState<'ALL' | 'INSTITUTIONAL' | 'INDEPENDENT'>('ALL');
  const [quickCode, setQuickCode] = useState('');
  const [selectedPdfModal, setSelectedPdfModal] = useState<string | null>(null);

  const enrolledClassrooms = classrooms.filter((c) => c.isEnrolled);

  const filteredCourses = enrolledClassrooms.filter((c) => {
    if (activeCourseTab === 'INSTITUTIONAL') return c.instituteName.includes('Institute') || c.instituteName.includes('Academy');
    if (activeCourseTab === 'INDEPENDENT') return !c.instituteName.includes('Institute') && !c.instituteName.includes('Academy');
    return true;
  });

  return (
    <div className="flex-1 pb-16 bg-[#FAF7EE] text-stone-900 select-none">
      
      {/* Top Mobile App Bar */}
      <header className="sticky top-0 z-20 bg-[#FAF7EE]/95 backdrop-blur-md px-3.5 py-2 border-b border-stone-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <VAdhyayLogo size={36} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-sm tracking-tight text-[#461820]">V ADHYAY</span>
              <span className="text-[9px] bg-[#7D202B]/10 text-[#7D202B] font-bold px-1.5 py-0.2 rounded font-mono">
                STUDENT
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium leading-none">Premier Learning Space</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Join Class Quick Action */}
          <button
            onClick={() => onOpenJoinModal()}
            className="flex items-center gap-1 bg-[#7D202B] hover:bg-[#631821] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Join Class</span>
          </button>

          {/* Sign Out Button */}
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="p-1.5 rounded-xl text-stone-500 hover:text-[#7D202B] hover:bg-[#7D202B]/10 transition-colors"
              title="Sign Out to Login Page"
            >
              <span className="text-[10px] font-bold">Logout</span>
            </button>
          )}

          {/* Student Profile Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#D6B45B]/30 border border-[#D6B45B] flex items-center justify-center text-xs font-bold text-[#461820]">
            SM
          </div>
        </div>
      </header>

      {/* Verified Scholar Subheader Banner */}
      <div className="px-4 py-2 bg-[#461820] text-white text-[10px] flex items-center justify-between border-b border-[#D6B45B]/30">
        <div className="flex items-center gap-1.5 font-semibold text-[#F7F4EC]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D6B45B]" />
          <span>STUDENT • VERIFIED ID {user.scholarId || '#VA-98421'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Node Nominal</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Welcome Section */}
        <div>
          <h1 className="text-xl font-serif font-black tracking-tight text-[#461820] flex items-center gap-1.5">
            Welcome Back, {user.displayName.split(' ')[0]}! <span className="text-lg">👋</span>
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Academic Term Autumn '26. You have <span className="font-bold text-[#7D202B]">2 live lectures</span> scheduled today and 1 pending review.
          </p>
        </div>

        {/* Rapid Classroom Entry Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#D6B45B]/60 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-[#7D202B]">
              <span className="w-2 h-2 rounded-full bg-[#7D202B]" />
              <span>Rapid Classroom Entry</span>
            </div>
            <span className="text-[10px] text-stone-500 font-medium">Direct Access</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={quickCode}
              onChange={(e) => setQuickCode(e.target.value)}
              placeholder="E.G. #CAL-402, #PCM-102"
              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold text-stone-800 uppercase focus:outline-none focus:ring-1 focus:ring-[#7D202B]"
            />
            <button
              onClick={() => onOpenJoinModal(quickCode)}
              className="px-3.5 py-2 bg-[#7D202B] hover:bg-[#631821] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs active:scale-95 transition-all"
            >
              <span>Lookup & Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1 */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Active Enrolled</div>
            <div className="text-lg font-black text-[#461820] mt-0.5">6 Classrooms</div>
            <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D202B]" />
              <span>4 Institutional • 2 Sovereign</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Live Lectures Today</div>
            <div className="text-lg font-black text-[#461820] mt-0.5">2 Scheduled</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Next class in 24 mins</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Cumulative Progress</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">+3.8%</span>
            </div>
            <div className="text-lg font-black text-[#461820] mt-0.5">94.2%</div>
            <div className="text-[10px] text-stone-500 mt-1">Attendance & Graded Labs</div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Entitlements & Dues</div>
            <div className="text-lg font-black text-emerald-700 mt-0.5 flex items-center gap-1">
              <span>All Verified</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-[10px] text-stone-500 mt-1">Zero Pending Arrears</div>
          </div>
        </div>

        {/* Imminent Session Banner */}
        <div className="bg-gradient-to-br from-[#461820] to-[#2B0E14] text-white p-4 rounded-3xl shadow-lg border border-[#D6B45B]/40 relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              IMMINENT SESSION
            </span>
            <span className="text-[#D6B45B] font-bold font-mono">Room {imminentSession.roomCode}</span>
          </div>

          <h3 className="text-sm font-bold text-[#F7F4EC] leading-snug">
            {imminentSession.title}
          </h3>

          <div className="text-[11px] text-stone-300 mt-1 flex items-center gap-1.5 flex-wrap">
            <span>Instructor: <strong className="text-white">{imminentSession.instructorName}</strong></span>
            <span>•</span>
            <span className="text-[#D6B45B]">Starts at {imminentSession.startsAtFormatted} (in {imminentSession.timeRemaining})</span>
          </div>

          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={() => setSelectedPdfModal('Stokes_Theorem_Lecture_Notes_Draft_VA26.pdf')}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-[#FAF7EE] text-[11px] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-white/10"
            >
              <FileText className="w-3.5 h-3.5 text-[#D6B45B]" />
              <span>Prep Notes (PDF)</span>
            </button>
            <button
              onClick={() => onEnterLiveRoom(imminentSession)}
              className="flex-1 py-2 bg-[#D6B45B] hover:bg-[#c4a148] text-[#461820] text-[11px] font-black rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <PlayCircle className="w-4 h-4 fill-[#461820] text-white" />
              <span>Enter Live Room</span>
            </button>
          </div>
        </div>

        {/* My Courses Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-[#461820]">My Courses</h2>
              <p className="text-[10px] text-stone-500">Classrooms across accredited partner institutes and independent academies</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCourseTab('ALL')}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                activeCourseTab === 'ALL'
                  ? 'bg-[#7D202B] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              All ({enrolledClassrooms.length})
            </button>
            <button
              onClick={() => setActiveCourseTab('INSTITUTIONAL')}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                activeCourseTab === 'INSTITUTIONAL'
                  ? 'bg-[#7D202B] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              Institutional (2)
            </button>
            <button
              onClick={() => setActiveCourseTab('INDEPENDENT')}
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                activeCourseTab === 'INDEPENDENT'
                  ? 'bg-[#7D202B] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              Independent (1)
            </button>
          </div>

          {/* Course Cards List */}
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <div
                key={course.classroomId}
                className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs hover:border-[#7D202B]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#7D202B] bg-[#7D202B]/10 px-2 py-0.5 rounded-md">
                      {course.code}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      course.accessMode === 'FREE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : course.accessMode === 'PAID'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-purple-100 text-purple-900'
                    }`}>
                      {course.accessMode === 'FREE' ? 'ACTIVE (FREE TIER)' :
                       course.accessMode === 'PAID' ? 'ACTIVE (VERIFIED • PAID)' : 'ACTIVE (SPONSORED GRANT)'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 font-semibold">{course.courseCodeText}</span>
                </div>

                <h3 className="font-bold text-stone-900 text-xs">{course.name}</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {course.assignedFacultyName} • {course.instituteName}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {course.tags?.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                    {course.modulesCount} Modules
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1">
                      <span>Curriculum Progress</span>
                      <span className="font-bold text-stone-800">{course.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7D202B] rounded-full transition-all"
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (course.liveStreamStatus === 'LIVE_NOW') {
                        onEnterLiveRoom({
                          sessionId: 'ses_cur_' + course.classroomId,
                          classroomId: course.classroomId,
                          classroomCode: course.code,
                          title: course.name,
                          instructorName: course.assignedFacultyName,
                          instructorTitle: 'Faculty Fellow',
                          startsAt: '',
                          startsAtFormatted: 'Live Now',
                          durationMinutes: 60,
                          roomCode: course.liveRoomCode || '#LIVE-ROOM',
                          isLiveNow: true,
                          joinPolicy: 'ENTITLED_ONLY',
                        });
                      }
                    }}
                    className="text-xs font-bold text-[#7D202B] hover:text-[#461820] flex items-center gap-1 shrink-0"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Scheduled Sessions & Assignments */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-xs font-bold text-stone-900">Weekly Scheduled Sessions & Assignments</h3>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                2 Today
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#7D202B]">Full Calendar &gt;</span>
          </div>

          <div className="space-y-2.5">
            {/* Item 1 */}
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D202B] text-white flex flex-col items-center justify-center shrink-0">
                  <span className="text-[8px] uppercase tracking-wider font-bold">TODAY</span>
                  <span className="text-xs font-black leading-none">12</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-stone-900">Vector Calculus & Stokes Integration</h4>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 rounded">
                      LIVE OPEN
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">06:00 PM – 07:30 PM IST • Prof. Dr. A. Sen (Apex)</p>
                </div>
              </div>
              <button
                onClick={() => onEnterLiveRoom(imminentSession)}
                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-xs"
              >
                <span>Join</span>
              </button>
            </div>

            {/* Item 2 */}
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex flex-col items-center justify-center shrink-0 border border-amber-300">
                  <FileText className="w-4 h-4 text-[#7D202B]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-stone-900">Physics Mechanics Problem Set 4</h4>
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 rounded">
                      Due in 2 days
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">Assigned by Aventra STEM • Batch #PHYS-102</p>
                </div>
              </div>
              <button className="px-2.5 py-1 bg-[#7D202B] text-white text-[10px] font-bold rounded-lg shadow-xs">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Incoming Institutional Invitations (PRD Section 7.4 & 8) */}
        {invitations.length > 0 && (
          <div className="bg-[#FAF7EE] p-3.5 rounded-2xl border-2 border-[#D6B45B] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#461820] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D6B45B]" />
                Incoming Institutional Invitations
              </span>
              <span className="text-[10px] font-bold text-[#7D202B] bg-[#7D202B]/10 px-2 py-0.5 rounded-full">
                1 Action Required
              </span>
            </div>

            {invitations.map((inv) => (
              <div key={inv.invitationId} className="bg-white p-3 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#7D202B]">{inv.instituteName}</span>
                  <span className="text-[9px] text-stone-400">{inv.invitedTimeAgo}</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900">{inv.classroomTitle}</h4>
                <p className="text-[10px] text-stone-600">{inv.description}</p>
                
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onDeclineInvitation(inv.invitationId)}
                    className="flex-1 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold rounded-lg"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => onAcceptInvitation(inv.invitationId)}
                    className="flex-1 py-1.5 bg-[#7D202B] hover:bg-[#631821] text-white text-[11px] font-bold rounded-lg shadow-xs flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept & Enroll</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Outbound Join Requests */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-stone-900">My Outbound Join Requests</h3>
            <span className="text-[10px] text-stone-500">Live Audit Log</span>
          </div>

          <div className="space-y-2">
            {joinRequests.slice(0, 2).map((req) => (
              <div key={req.requestId} className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">{req.classroomTitle}</span>
                    <span className="text-[9px] font-mono text-stone-500 font-semibold">{req.classroomCode}</span>
                  </div>
                  <p className="text-[10px] text-stone-500">Submitted: {req.requestedAt} • {req.instituteName}</p>
                </div>
                <div>
                  {req.status === 'PENDING' ? (
                    <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      PENDING REVIEW
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      APPROVED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions & Academic Entitlements (PRD Section 8) */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold text-stone-900">Recent Transactions & Academic Entitlements</h3>
              <p className="text-[9px] text-stone-500">Compliant with PRD Section 8 fee entitlement & Razorpay/UPI settlement</p>
            </div>
            <button
              onClick={() => setSelectedPdfModal('VAdhyay_Statement_Autumn2026.pdf')}
              className="p-1 text-stone-600 hover:text-[#7D202B]"
              title="Export Statement"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {transactions.map((txn) => (
              <div key={txn.txnId} className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#7D202B]">{txn.txnId}</span>
                    <span className="text-xs font-bold text-stone-900">{txn.itemTitle}</span>
                  </div>
                  <p className="text-[10px] text-stone-500">{txn.date} • {txn.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-stone-900">
                    {txn.amount === 0 ? '₹0.00 (Grant)' : `₹${txn.amount.toLocaleString('en-IN')}`}
                  </div>
                  <span className="text-[9px] text-emerald-700 font-semibold">{txn.receiptStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info matching reference screenshot */}
        <div className="pt-2 text-center text-[10px] text-stone-400 font-mono">
          © 2026 V Adhyay Educational Technologies Inc. Academic Sovereignty Guaranteed. • PRD MVP v1.0
        </div>

      </div>

      {/* PDF Modal Simulator */}
      {selectedPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#7D202B]" />
                <h4 className="text-xs font-bold text-stone-900">Academic Document Archive</h4>
              </div>
              <button onClick={() => setSelectedPdfModal(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-700">
              <p className="font-bold text-stone-900">{selectedPdfModal}</p>
              <p className="text-stone-500 text-[10px] mt-1">Cryptographically stamped • SHA-256 Verified</p>
              <div className="mt-2 text-stone-600 text-[10px] space-y-1">
                <div>Issuer: Apex Institute Faculty Council</div>
                <div>Scholar: Samarth (#VA-98421)</div>
                <div>Status: Verified Entitlement Active</div>
              </div>
            </div>
            <button
              onClick={() => setSelectedPdfModal(null)}
              className="w-full mt-3 py-2 bg-[#7D202B] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
