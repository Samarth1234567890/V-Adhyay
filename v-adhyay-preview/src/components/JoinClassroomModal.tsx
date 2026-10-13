import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, Sparkles, BookOpen, User, Building, ArrowRight } from 'lucide-react';
import { Classroom } from '../types';

interface JoinClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  classrooms: Classroom[];
  onJoinSuccess: (classroom: Classroom) => void;
  onRequestPaidAccess: (classroom: Classroom) => void;
}

export const JoinClassroomModal: React.FC<JoinClassroomModalProps> = ({
  isOpen,
  onClose,
  classrooms,
  onJoinSuccess,
  onRequestPaidAccess,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [foundClassroom, setFoundClassroom] = useState<Classroom | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = () => {
    setErrorMsg('');
    setFoundClassroom(null);
    const cleaned = inputCode.trim().toUpperCase();
    if (!cleaned) {
      setErrorMsg('Please enter a valid Classroom ID (e.g., #CAL-402, #PCM-102)');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const match = classrooms.find(
        (c) => c.code.toUpperCase() === cleaned || c.code.replace('#', '').toUpperCase() === cleaned.replace('#', '')
      );

      if (match) {
        setFoundClassroom(match);
      } else {
        setErrorMsg(`No active classroom found for ID "${cleaned}". Please check with your instructor or institute.`);
      }
    }, 400);
  };

  const handleAction = () => {
    if (!foundClassroom) return;
    if (foundClassroom.accessMode === 'PAID') {
      onClose();
      onRequestPaidAccess(foundClassroom);
    } else {
      onJoinSuccess(foundClassroom);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-[#FAF7EE] rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl border border-[#D6B45B]/40 max-h-[90vh] overflow-y-auto animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#7D202B]/10 flex items-center justify-center text-[#7D202B]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Join Academic Classroom</h3>
              <p className="text-[10px] text-stone-500">PRD FR-007 Classroom ID Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-4">
          <label className="text-xs font-bold text-stone-700 block mb-1.5">
            Enter Classroom Code or Sovereign Node ID
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  setErrorMsg('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="E.G. #CAL-402, #PCM-102"
                className="w-full pl-3.5 pr-8 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#7D202B] uppercase tracking-wider"
              />
              {inputCode && (
                <button
                  onClick={() => setInputCode('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-2.5 bg-[#7D202B] hover:bg-[#631821] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span>Verify</span>
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-[10px] text-stone-500 font-medium">Quick suggestions:</span>
            {['#CAL-402', '#PCM-102', '#LAW-401', '#VED-304'].map((code) => (
              <button
                key={code}
                onClick={() => {
                  setInputCode(code);
                  setErrorMsg('');
                }}
                className="text-[10px] font-mono font-bold text-[#7D202B] bg-[#7D202B]/10 hover:bg-[#7D202B]/20 px-2 py-0.5 rounded-md transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Found Classroom Card */}
        {foundClassroom && (
          <div className="mt-4 p-4 bg-white border border-[#D6B45B]/60 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold bg-[#7D202B] text-white px-2.5 py-0.5 rounded-full">
                {foundClassroom.code}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                foundClassroom.accessMode === 'FREE'
                  ? 'bg-emerald-100 text-emerald-800'
                  : foundClassroom.accessMode === 'PAID'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-indigo-100 text-indigo-900'
              }`}>
                {foundClassroom.accessMode === 'FREE' ? 'FREE TIER' :
                 foundClassroom.accessMode === 'PAID' ? `PAID ACCESS (₹${foundClassroom.feeAmount})` : 'SPONSORED GRANT'}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-stone-900">{foundClassroom.name}</h4>
              <p className="text-xs text-stone-600 line-clamp-2 mt-1">{foundClassroom.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-stone-400" />
                <span className="truncate">{foundClassroom.instituteName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span className="truncate">{foundClassroom.assignedFacultyName}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleAction}
              className={`w-full py-2.5 mt-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
                foundClassroom.accessMode === 'PAID'
                  ? 'bg-[#7D202B] hover:bg-[#631821] text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <span>
                {foundClassroom.accessMode === 'PAID'
                  ? `Proceed to Payment (₹${foundClassroom.feeAmount})`
                  : 'Confirm Enrollment & Join Classroom'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
