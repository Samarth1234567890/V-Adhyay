import React, { useState } from 'react';
import { AndroidDeviceFrame } from './components/AndroidDeviceFrame';
import { StudentHomeScreen } from './screens/StudentHomeScreen';
import { AdminHomeScreen } from './screens/AdminHomeScreen';
import { LiveClassRoomScreen } from './screens/LiveClassRoomScreen';
import { LoginScreen } from './screens/LoginScreen';
import { JoinClassroomModal } from './components/JoinClassroomModal';
import { RazorpayCheckoutSheet } from './components/RazorpayCheckoutSheet';
import { AndroidProjectInspectorModal } from './components/AndroidProjectInspectorModal';
import { 
  INITIAL_USERS, 
  INITIAL_CLASSROOMS, 
  INITIAL_IMMINENT_SESSION, 
  INITIAL_INVITATIONS, 
  INITIAL_JOIN_REQUESTS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_TELEMETRY 
} from './data/mockData';
import { UserRole, Classroom, LiveSession, JoinRequest, InstitutionalInvitation, AcademicTransaction } from './types';

export default function App() {
  // Only 2 dashboards: 'STUDENT' and 'ADMIN'
  const [activeRole, setActiveRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  
  // Login Page is fully supported and can be experienced on initial load or via Sign Out
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // App Data States
  const [classrooms, setClassrooms] = useState<Classroom[]>(INITIAL_CLASSROOMS);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(INITIAL_JOIN_REQUESTS);
  const [invitations, setInvitations] = useState<InstitutionalInvitation[]>(INITIAL_INVITATIONS);
  const [transactions, setTransactions] = useState<AcademicTransaction[]>(INITIAL_TRANSACTIONS);
  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);
  
  // Navigation & Modal States
  const [activeLiveSession, setActiveLiveSession] = useState<LiveSession | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [checkoutClassroom, setCheckoutClassroom] = useState<Classroom | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentUser = INITIAL_USERS[activeRole] || INITIAL_USERS.STUDENT;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Student Actions
  const handleJoinSuccess = (classroom: Classroom) => {
    setClassrooms((prev) =>
      prev.map((c) => (c.classroomId === classroom.classroomId ? { ...c, isEnrolled: true } : c))
    );
    showToast(`Successfully enrolled in ${classroom.name} (${classroom.code})!`);
  };

  const handleOpenPaidCheckout = (classroom: Classroom) => {
    setCheckoutClassroom(classroom);
  };

  const handlePaymentSuccess = (classroom: Classroom, txnId: string) => {
    setClassrooms((prev) =>
      prev.map((c) => (c.classroomId === classroom.classroomId ? { ...c, isEnrolled: true } : c))
    );

    const newTxn: AcademicTransaction = {
      txnId,
      classroomCode: classroom.code,
      itemTitle: classroom.name,
      institution: classroom.instituteName,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: classroom.feeAmount || 1200,
      currency: 'INR',
      paymentMethod: 'UPI / Razorpay Verified',
      entitlementValidity: 'Valid until Term End',
      receiptStatus: 'Razorpay Verified',
      isCompliant: true,
    };
    setTransactions((prev) => [newTxn, ...prev]);
    showToast(`Payment of ₹${classroom.feeAmount} verified! Entitlement activated.`);
  };

  const handleAcceptInvitation = (invitationId: string) => {
    setInvitations((prev) => prev.filter((i) => i.invitationId !== invitationId));
    showToast('Invitation accepted! Enrolled into Batch #PHYS-102.');
  };

  const handleDeclineInvitation = (invitationId: string) => {
    setInvitations((prev) => prev.filter((i) => i.invitationId !== invitationId));
    showToast('Invitation declined.');
  };

  // Android Back Gesture Handler
  const handleBackGesture = () => {
    if (activeLiveSession) {
      setActiveLiveSession(null);
    } else if (isJoinModalOpen) {
      setIsJoinModalOpen(false);
    } else if (checkoutClassroom) {
      setCheckoutClassroom(null);
    } else if (isLoggedIn && activeRole === 'ADMIN') {
      setActiveRole('STUDENT');
    } else if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  return (
    <AndroidDeviceFrame
      activeRole={activeRole}
      onRoleChange={(role) => {
        // Only accept STUDENT or ADMIN
        const targetRole = role === 'ADMIN' ? 'ADMIN' : 'STUDENT';
        setActiveRole(targetRole);
        setIsLoggedIn(true);
        setActiveLiveSession(null);
        showToast(`Switched to ${targetRole === 'STUDENT' ? 'Student' : 'Admin'} Dashboard`);
      }}
      onOpenSourceInspector={() => setIsInspectorOpen(true)}
      onBackGesture={handleBackGesture}
      canGoBack={!!activeLiveSession || activeRole === 'ADMIN' || isLoggedIn}
      isLoggedIn={isLoggedIn}
      onToggleLoginState={() => {
        setIsLoggedIn(!isLoggedIn);
        setActiveLiveSession(null);
        showToast(!isLoggedIn ? 'Entered Session' : 'Returned to Login Screen');
      }}
    >
      {/* Toast Notification Banner inside Mobile Screen */}
      {toastMessage && (
        <div className="absolute top-12 left-4 right-4 z-40 bg-[#461820] text-white px-3.5 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center justify-between border border-[#D6B45B]/50 animate-in slide-in-from-top duration-150">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D6B45B]" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-stone-300 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Screen Router: Login Page OR (Student Dashboard / Admin Dashboard) */}
      {!isLoggedIn ? (
        <LoginScreen
          onLoginSuccess={(role) => {
            const finalRole = role === 'ADMIN' ? 'ADMIN' : 'STUDENT';
            setActiveRole(finalRole);
            setIsLoggedIn(true);
            showToast(`Welcome! Signed in to ${finalRole === 'STUDENT' ? 'Student' : 'Admin'} Dashboard`);
          }}
        />
      ) : activeLiveSession ? (
        <LiveClassRoomScreen
          session={activeLiveSession}
          onLeaveRoom={() => setActiveLiveSession(null)}
          isTeacher={false}
        />
      ) : activeRole === 'STUDENT' ? (
        <StudentHomeScreen
          user={currentUser}
          classrooms={classrooms}
          imminentSession={INITIAL_IMMINENT_SESSION}
          invitations={invitations}
          joinRequests={joinRequests}
          transactions={transactions}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
          onEnterLiveRoom={(session) => setActiveLiveSession(session)}
          onAcceptInvitation={handleAcceptInvitation}
          onDeclineInvitation={handleDeclineInvitation}
          onOpenPaidCheckout={handleOpenPaidCheckout}
          onSignOut={() => {
            setIsLoggedIn(false);
            showToast('Signed out of Student Dashboard');
          }}
        />
      ) : (
        <AdminHomeScreen
          user={currentUser}
          classrooms={classrooms}
          telemetry={telemetry}
          isSuperAdmin={false}
          onSignOut={() => {
            setIsLoggedIn(false);
            showToast('Signed out of Admin Dashboard');
          }}
        />
      )}

      {/* Modals & Bottom Sheets */}
      <JoinClassroomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        classrooms={classrooms}
        onJoinSuccess={handleJoinSuccess}
        onRequestPaidAccess={handleOpenPaidCheckout}
      />

      {checkoutClassroom && (
        <RazorpayCheckoutSheet
          classroom={checkoutClassroom}
          isOpen={!!checkoutClassroom}
          onClose={() => setCheckoutClassroom(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      <AndroidProjectInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </AndroidDeviceFrame>
  );
}
