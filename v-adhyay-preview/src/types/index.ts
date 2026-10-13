export type UserRole = 'STUDENT' | 'TEACHER' | 'INSTITUTE' | 'ADMIN' | 'SUPER_ADMIN';

export interface UserProfile {
  uid: string;
  role: UserRole;
  displayName: string;
  email: string;
  phone?: string;
  scholarId?: string;
  designation?: string;
  instituteId?: string;
  instituteName?: string;
  photoURL?: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  createdAt: string;
}

export type AccessMode = 'FREE' | 'PAID' | 'SPONSORED';

export interface Classroom {
  classroomId: string;
  code: string; // e.g. #CAL-402, #PCM-102
  courseCodeText: string; // e.g. ADV-MECH-99
  name: string;
  instituteName: string;
  instituteId: string;
  category: string;
  level: string;
  description: string;
  accessMode: AccessMode;
  feeAmount?: number;
  billingPeriod?: string;
  assignedFacultyName: string;
  assignedFacultyTitle?: string;
  enrolledCount: number;
  capacity: number;
  liveStreamStatus: 'LIVE_NOW' | 'SCHEDULED' | 'INACTIVE';
  liveRoomCode?: string;
  scheduledTime?: string;
  modulesCount: number;
  progressPercentage?: number;
  tags?: string[];
  isEnrolled?: boolean;
}

export interface LiveSession {
  sessionId: string;
  classroomId: string;
  classroomCode: string;
  title: string;
  instructorName: string;
  instructorTitle: string;
  startsAt: string;
  startsAtFormatted: string;
  timeRemaining?: string;
  durationMinutes: number;
  roomCode: string;
  isLiveNow: boolean;
  prepNotesPdfUrl?: string;
  joinPolicy: 'ENTITLED_ONLY' | 'OPEN_NODE';
  activeViewerCount?: number;
}

export interface JoinRequest {
  requestId: string;
  classroomId: string;
  classroomCode: string;
  classroomTitle: string;
  instituteName: string;
  requesterUid: string;
  requesterName: string;
  requesterRole: 'Student' | 'Co-Teacher';
  feeStatus: string;
  feePaid?: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
}

export interface InstitutionalInvitation {
  invitationId: string;
  instituteName: string;
  classroomCode: string;
  classroomTitle: string;
  batchName: string;
  instructorName: string;
  description: string;
  invitedTimeAgo: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}

export interface AcademicTransaction {
  txnId: string;
  classroomCode: string;
  itemTitle: string;
  institution: string;
  date: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  entitlementValidity: string;
  receiptStatus: 'Razorpay Verified' | 'Grant Waived' | 'NetBanking (HDFC)';
  isCompliant: boolean;
}

export interface PlatformTelemetry {
  activeClassrooms: number;
  connectedFaculty: number;
  registeredScholars: number;
  monthlyEntitlementVolume: number;
  razorpaySuccessRate: number;
  activeLiveRooms: number;
  webrtcHealthPercentage: number;
  sfuBitratePeak: string;
  roleSelfEscalationDefenses: number;
}
