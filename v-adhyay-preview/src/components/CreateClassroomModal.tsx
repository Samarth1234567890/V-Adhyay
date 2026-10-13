import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Check, Building, ShieldCheck } from 'lucide-react';
import { Classroom, AccessMode } from '../types';

interface CreateClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClassroom: (newClass: Classroom) => void;
  defaultFacultyName?: string;
  defaultInstituteName?: string;
}

export const CreateClassroomModal: React.FC<CreateClassroomModalProps> = ({
  isOpen,
  onClose,
  onCreateClassroom,
  defaultFacultyName = 'Dr. Vikram Seth',
  defaultInstituteName = 'Aventra STEM Institute',
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Science & Mathematics');
  const [level, setLevel] = useState('Advanced Level • 4 Credits');
  const [description, setDescription] = useState('');
  const [accessMode, setAccessMode] = useState<AccessMode>('PAID');
  const [feeAmount, setFeeAmount] = useState('1200');
  const [capacity, setCapacity] = useState('60');
  const [code, setCode] = useState(() => `#CLS-${Math.floor(100 + Math.random() * 900)}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newClass: Classroom = {
      classroomId: 'cls_' + Date.now(),
      code: code.trim().toUpperCase(),
      courseCodeText: 'NODE-' + code.replace('#', '').toUpperCase(),
      name: name.trim(),
      instituteName: defaultInstituteName,
      instituteId: 'inst_local',
      category: category.trim(),
      level: level.trim(),
      description: description.trim() || 'Comprehensive course syllabus managed by accredited sovereign faculty.',
      accessMode,
      feeAmount: accessMode === 'PAID' ? Number(feeAmount) || 1200 : 0,
      billingPeriod: accessMode === 'PAID' ? '/mo' : undefined,
      assignedFacultyName: defaultFacultyName,
      assignedFacultyTitle: 'Fellow / Academic Chair',
      enrolledCount: 1,
      capacity: Number(capacity) || 60,
      liveStreamStatus: 'SCHEDULED',
      modulesCount: 10,
      progressPercentage: 0,
      tags: [category, accessMode === 'FREE' ? 'Free Tier' : `Paid (₹${feeAmount})`],
      isEnrolled: true,
    };

    onCreateClassroom(newClass);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[420px] bg-[#FAF7EE] rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl border border-[#D6B45B]/40 max-h-[90vh] overflow-y-auto animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#7D202B] text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Create Academic Classroom</h3>
              <p className="text-[10px] text-stone-500">PRD FR-006 Unique Classroom ID Generation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {/* Unique Code */}
          <div className="p-2.5 bg-stone-100 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 font-semibold uppercase">Classroom Code (Unique)</span>
              <div className="text-xs font-mono font-bold text-[#7D202B]">{code}</div>
            </div>
            <button
              type="button"
              onClick={() => setCode(`#CLS-${Math.floor(100 + Math.random() * 900)}`)}
              className="text-[10px] text-[#7D202B] font-bold hover:underline"
            >
              Regenerate
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-1">Classroom / Course Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Quantum Computing & Algorithms"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#7D202B]"
            />
          </div>

          {/* Category & Level */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-stone-600 block mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-600 block mb-1">Academic Level</label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
              />
            </div>
          </div>

          {/* Access Mode */}
          <div>
            <label className="text-[11px] font-bold text-stone-700 block mb-1">Access & Entitlement Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccessMode('FREE')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  accessMode === 'FREE'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                Free Open Node
              </button>
              <button
                type="button"
                onClick={() => setAccessMode('PAID')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  accessMode === 'PAID'
                    ? 'bg-[#7D202B]/10 border-[#7D202B] text-[#7D202B] shadow-xs'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                Paid Access
              </button>
            </div>
          </div>

          {accessMode === 'PAID' && (
            <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">Fee Amount (INR)</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-amber-900">₹</span>
                <input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  className="w-20 px-2 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold text-stone-900"
                />
                <span className="text-[10px] text-stone-500">/mo</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-[10px] font-bold text-stone-600 block mb-1">Syllabus Overview</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Key concepts, prerequisites, and learning objectives..."
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-[#7D202B] hover:bg-[#631821] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all mt-3"
          >
            <Check className="w-4 h-4" />
            <span>Create & Publish Classroom</span>
          </button>
        </form>

      </div>
    </div>
  );
};
