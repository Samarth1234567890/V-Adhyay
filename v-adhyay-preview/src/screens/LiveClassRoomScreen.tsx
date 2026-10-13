import React, { useState } from 'react';
import { 
  ChevronLeft, Users, Mic, MicOff, Video, VideoOff, Hand, MessageSquare, 
  FileText, Share2, MoreVertical, Send, ShieldCheck, Heart, Sparkles, X, PhoneOff
} from 'lucide-react';
import { LiveSession } from '../types';

interface LiveClassRoomScreenProps {
  session: LiveSession;
  onLeaveRoom: () => void;
  isTeacher?: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  role: 'Faculty' | 'Scholar';
  text: string;
  time: string;
}

export const LiveClassRoomScreen: React.FC<LiveClassRoomScreenProps> = ({
  session,
  onLeaveRoom,
  isTeacher = false,
}) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'CHAT' | 'DOUBTS' | 'NOTES'>('CHAT');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'Prof. Dr. A. Sen',
      role: 'Faculty',
      text: 'Welcome scholars. We are examining Stokes Theorem on piecewise smooth orientable 2-manifolds today.',
      time: '18:02',
    },
    {
      id: 'm2',
      sender: 'Siddharth N.',
      role: 'Scholar',
      text: 'Sir, does the curl integral evaluate to zero over closed Gaussian surfaces as well?',
      time: '18:05',
    },
    {
      id: 'm3',
      sender: 'Arya Kulkarni',
      role: 'Scholar',
      text: 'Yes Siddharth, because boundary ∂S of a closed surface is empty!',
      time: '18:06',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: isTeacher ? session.instructorName : 'Samarth',
      role: isTeacher ? 'Faculty' : 'Scholar',
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  return (
    <div className="flex-1 bg-[#121013] text-stone-100 flex flex-col h-full overflow-hidden select-none">
      
      {/* Top Stream Header */}
      <header className="px-3.5 py-2.5 bg-[#1C181B] border-b border-stone-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onLeaveRoom}
            className="p-1 rounded-full hover:bg-white/10 text-stone-300"
            title="Leave Classroom"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold bg-[#7D202B] text-white px-2 py-0.5 rounded">
                {session.roomCode}
              </span>
              <span className="text-xs font-bold text-white truncate max-w-[170px]">
                {session.title}
              </span>
            </div>
            <p className="text-[10px] text-stone-400">
              {session.instructorName} • WebRTC SFU Mesh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Scholars Badge */}
          <div className="flex items-center gap-1 bg-red-950/60 text-red-300 border border-red-700/50 text-[10px] font-bold px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>142 LIVE</span>
          </div>

          <button
            onClick={onLeaveRoom}
            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs"
            title="Leave Session"
          >
            <PhoneOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Video Stage */}
      <div className="relative w-full aspect-video bg-[#0A090B] shrink-0 flex items-center justify-center border-b border-stone-800 overflow-hidden">
        {/* Simulated Blackboard Canvas View */}
        <div className="absolute inset-0 bg-[#162B20] p-4 flex flex-col justify-between text-emerald-100 font-serif">
          
          <div className="flex items-center justify-between text-[11px] text-emerald-300/80 font-mono">
            <span>CHALKBOARD STREAM • HD 1080p60</span>
            <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 text-[9px]">
              Latency: 34ms • Loss: 0.0%
            </span>
          </div>

          {/* Mathematical Blackboard Content */}
          <div className="my-auto text-center space-y-2">
            <div className="text-[10px] font-mono text-[#D6B45B] uppercase tracking-widest">
              Stokes' Theorem for Differential 2-Forms
            </div>
            <div className="text-xl sm:text-2xl font-serif text-white tracking-wider">
              ∮<sub>∂S</sub> 𝐅 · d𝐫 = ∬<sub>S</sub> (∇ × 𝐅) · d𝐒
            </div>
            <p className="text-[10px] text-emerald-200/80 max-w-xs mx-auto">
              Circulation of vector field 𝐅 along boundary loop ∂S equals flux of curl(𝐅) through surface S.
            </p>
          </div>

          {/* Teacher PiP Box */}
          <div className="absolute bottom-2 right-2 w-24 h-16 bg-[#1A1619] rounded-xl border border-stone-700 overflow-hidden shadow-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-6 h-6 rounded-full bg-[#7D202B] text-white text-[10px] font-bold mx-auto flex items-center justify-center">
                AS
              </div>
              <span className="text-[9px] text-stone-300 font-medium block mt-1">Dr. A. Sen</span>
            </div>
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

        </div>

        {/* Hand Raised Overlay Banner */}
        {isHandRaised && (
          <div className="absolute top-2 left-2 bg-amber-500/90 text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md animate-bounce">
            <Hand className="w-3 h-3 fill-stone-900" />
            <span>Hand Raised (Position #3 in Doubt Queue)</span>
          </div>
        )}
      </div>

      {/* Stream Quick Interaction Bar */}
      <div className="px-3 py-2 bg-[#1A1619] border-b border-stone-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-2 rounded-xl text-xs font-bold transition-all ${
              isMicOn ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
            title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-2 rounded-xl text-xs font-bold transition-all ${
              isVideoOn ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
            title={isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
          >
            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isHandRaised
                ? 'bg-[#D6B45B] text-[#461820] shadow-md'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</span>
          </button>
        </div>

        {/* Prep Notes Quick Trigger */}
        <button
          onClick={() => setActiveTab('NOTES')}
          className="flex items-center gap-1 bg-[#7D202B]/40 hover:bg-[#7D202B]/60 text-[#F7F4EC] text-[11px] font-semibold px-2.5 py-1.5 rounded-xl border border-[#D6B45B]/30"
        >
          <FileText className="w-3.5 h-3.5 text-[#D6B45B]" />
          <span>Notes PDF</span>
        </button>
      </div>

      {/* Tabs for Lower Mobile Pane */}
      <div className="flex items-center bg-[#151214] px-3 pt-1 border-b border-stone-800 text-xs font-bold shrink-0">
        <button
          onClick={() => setActiveTab('CHAT')}
          className={`py-2 px-3 border-b-2 transition-all ${
            activeTab === 'CHAT'
              ? 'border-[#D6B45B] text-[#D6B45B]'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          Live Discussion ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab('DOUBTS')}
          className={`py-2 px-3 border-b-2 transition-all ${
            activeTab === 'DOUBTS'
              ? 'border-[#D6B45B] text-[#D6B45B]'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          Q&A Queue (2)
        </button>
        <button
          onClick={() => setActiveTab('NOTES')}
          className={`py-2 px-3 border-b-2 transition-all ${
            activeTab === 'NOTES'
              ? 'border-[#D6B45B] text-[#D6B45B]'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          Lecture Materials
        </button>
      </div>

      {/* Lower Content Surface */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col justify-between">
        
        {activeTab === 'CHAT' && (
          <>
            <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 rounded-xl text-xs ${
                    msg.role === 'Faculty'
                      ? 'bg-[#7D202B]/20 border border-[#7D202B]/40'
                      : 'bg-stone-900 border border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-stone-200">{msg.sender}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        msg.role === 'Faculty'
                          ? 'bg-[#D6B45B] text-[#461820]'
                          : 'bg-stone-700 text-stone-300'
                      }`}>
                        {msg.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono">{msg.time}</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[11px]">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="mt-2 pt-2 border-t border-stone-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask faculty or discuss with scholars..."
                className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-[#D6B45B]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#7D202B] hover:bg-[#631821] text-white rounded-xl flex items-center justify-center transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        )}

        {activeTab === 'DOUBTS' && (
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
                <span>Scholar: Siddharth N.</span>
                <span className="text-emerald-400 font-bold">Answered Live</span>
              </div>
              <p className="text-stone-200">"Why does Stokes theorem require piecewise smooth orientation?"</p>
            </div>
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
                <span>Scholar: Arya K.</span>
                <span className="text-[#D6B45B] font-bold">Next in Queue</span>
              </div>
              <p className="text-stone-200">"Can we apply this directly to Maxwell's Ampere-Maxwell law?"</p>
            </div>
          </div>
        )}

        {activeTab === 'NOTES' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Lecture Notes & Handout</span>
                <span className="text-[10px] text-stone-400">PDF • 2.4 MB</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                Stokes' Theorem, Green's Theorem reduction, and vector curl operator proofs.
              </p>
              <button className="w-full py-2 bg-[#D6B45B] text-[#461820] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs">
                <FileText className="w-3.5 h-3.5" />
                <span>Open Verified Study PDF</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
