import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Building, Lock } from 'lucide-react';
import { Classroom } from '../types';

interface RazorpayCheckoutSheetProps {
  classroom: Classroom;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (classroom: Classroom, txnId: string) => void;
}

export const RazorpayCheckoutSheet: React.FC<RazorpayCheckoutSheetProps> = ({
  classroom,
  isOpen,
  onClose,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('samarth@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedTxnId, setGeneratedTxnId] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const txn = `#TXN-${Math.floor(1000 + Math.random() * 9000)}-VAD`;
      setGeneratedTxnId(txn);
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(classroom, txn);
        setIsSuccess(false);
        onClose();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center transition-all">
      <div className="w-full max-w-[430px] bg-[#FAF7EE] rounded-t-[32px] p-5 shadow-2xl border-t border-[#D6B45B]/40 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0C2340] flex items-center justify-center text-white font-bold text-xs">
              RZP
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 leading-tight">Razorpay Secure Checkout</h3>
              <p className="text-[10px] text-stone-500 font-mono">Order ID: order_vad_{Math.floor(Date.now() / 1000)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-stone-900">Payment Verified!</h4>
            <p className="text-xs text-stone-600 mt-1">Transaction ID: <span className="font-mono font-semibold">{generatedTxnId}</span></p>
            <p className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mt-3 font-medium">
              Academic Entitlement Activated (Valid until Term End)
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Classroom Summary Box */}
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#7D202B] bg-[#7D202B]/10 px-2 py-0.5 rounded-md">
                  {classroom.code}
                </span>
                <span className="text-xs font-semibold text-stone-500">{classroom.instituteName}</span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm mt-1">{classroom.name}</h4>
              <p className="text-xs text-stone-600 mt-0.5">Faculty: {classroom.assignedFacultyName}</p>
              
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500">Academic Access Fee</span>
                <span className="text-base font-extrabold text-[#7D202B]">
                  ₹{(classroom.feeAmount || 1200).toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-stone-500"> {classroom.billingPeriod || '/mo'}</span>
                </span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">Select Payment Mode</label>
              
              {/* UPI */}
              <div
                onClick={() => setSelectedMethod('upi')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'upi'
                    ? 'border-[#7D202B] bg-[#7D202B]/5 shadow-xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className={`w-4 h-4 ${selectedMethod === 'upi' ? 'text-[#7D202B]' : 'text-stone-500'}`} />
                  <div>
                    <div className="text-xs font-bold text-stone-900">Instant UPI (GPay / PhonePe / Paytm)</div>
                    <div className="text-[10px] text-stone-500">Zero surcharge • Direct bank transfer</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payMethod"
                  checked={selectedMethod === 'upi'}
                  onChange={() => setSelectedMethod('upi')}
                  className="accent-[#7D202B]"
                />
              </div>

              {selectedMethod === 'upi' && (
                <div className="p-2.5 bg-stone-100 rounded-xl">
                  <label className="text-[10px] font-semibold text-stone-600 block mb-1">UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-mono text-stone-800"
                    placeholder="user@okhdfcbank"
                  />
                </div>
              )}

              {/* Cards */}
              <div
                onClick={() => setSelectedMethod('card')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'card'
                    ? 'border-[#7D202B] bg-[#7D202B]/5 shadow-xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className={`w-4 h-4 ${selectedMethod === 'card' ? 'text-[#7D202B]' : 'text-stone-500'}`} />
                  <div>
                    <div className="text-xs font-bold text-stone-900">Credit / Debit Card</div>
                    <div className="text-[10px] text-stone-500">RuPay, Visa, Mastercard, Maestro</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payMethod"
                  checked={selectedMethod === 'card'}
                  onChange={() => setSelectedMethod('card')}
                  className="accent-[#7D202B]"
                />
              </div>

              {/* NetBanking */}
              <div
                onClick={() => setSelectedMethod('netbanking')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'netbanking'
                    ? 'border-[#7D202B] bg-[#7D202B]/5 shadow-xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building className={`w-4 h-4 ${selectedMethod === 'netbanking' ? 'text-[#7D202B]' : 'text-stone-500'}`} />
                  <div>
                    <div className="text-xs font-bold text-stone-900">NetBanking</div>
                    <div className="text-[10px] text-stone-500">HDFC, ICICI, SBI, Axis, Kotak</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payMethod"
                  checked={selectedMethod === 'netbanking'}
                  onChange={() => setSelectedMethod('netbanking')}
                  className="accent-[#7D202B]"
                />
              </div>
            </div>

            {/* Compliance Note */}
            <div className="flex items-center gap-2 text-[10px] text-stone-500 pt-1">
              <Lock className="w-3 h-3 text-[#D6B45B]" />
              <span>Compliant with PRD Section 8 fee entitlement & Razorpay settlement</span>
            </div>

            {/* Action Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 bg-[#7D202B] hover:bg-[#661a23] active:bg-[#461820] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying with Razorpay Gateway...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#D6B45B]" />
                  <span>Pay ₹{(classroom.feeAmount || 1200).toLocaleString('en-IN')} & Unlock Classroom</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
