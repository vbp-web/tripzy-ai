import { useState, FormEvent } from 'react';
import { 
  X, Calendar, Users, FileText, Check, ShieldCheck, Mail, User, Sparkles, 
  ArrowRight, ArrowLeft, Trees, Info, CreditCard, TicketCheck
} from 'lucide-react';
import { Tour, BookingState } from '../types';
import { formatINR } from '../utils/currency';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour;
  onCompleteBooking: (bookingDetails: {
    tourId: string;
    tourTitle: string;
    bannerImage: string;
    price: number;
    guests: number;
    date: string;
    fullName: string;
    email: string;
    bookingCode: string;
  }) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  tour,
  onCompleteBooking
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [carbonOffset, setCarbonOffset] = useState(true);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Simulated error
  const [error, setError] = useState('');

  // Auto set a valid local travel date
  useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 14);
    setDate(nextWeek.toISOString().split('T')[0]);
  });

  if (!isOpen) return null;

  // Calculators
  const subtotal = tour.price * guests;
  const carbonFee = carbonOffset ? 25 * guests : 0;
  const luxuryTax = Math.round(subtotal * 0.05); // 5%
  const grandTotal = subtotal + carbonFee + luxuryTax;

  const handleStep1Submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (fullName.trim() === '') {
      setError('Please input your legal full name.');
      return;
    }
    if (!email.includes('@')) {
      setError('A valid email address is required.');
      return;
    }
    if (!date) {
      setError('Please select a journey start date.');
      return;
    }
    setStep(2);
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setError('');

    // Simulate luxury API transit loop
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2200);
  };

  // Create customized checkout confirmation receipt
  const handleSuccessClose = () => {
    const generatedCode = 'TZ-' + Math.floor(100000 + Math.random() * 900000);
    onCompleteBooking({
      tourId: tour.id,
      tourTitle: tour.title,
      bannerImage: tour.bannerImage,
      price: grandTotal,
      guests: guests,
      date: date,
      fullName: fullName,
      email: email,
      bookingCode: generatedCode
    });
    // reset steps
    setStep(1);
    setFullName('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none leading-normal">
      {/* Dark blur backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/35 backdrop-blur-md"
      />

      {/* Main Container */}
      <div className="w-full max-w-lg bg-white rounded-[32px] border border-white/60 shadow-[0_24px_50px_rgba(0,0,0,0.12)] relative z-10 animate-[scaleUp_0.25s_ease-out] overflow-hidden">
        
        {/* Step Indicator Header */}
        <div className="bg-[#FAFAFA] border-b border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00BFA5] animate-ping" />
            <span className="text-[10px] font-bold tracking-widest text-[#111111] uppercase font-display">
              {step === 1 && 'Step 1: Guest Credentials'}
              {step === 2 && 'Step 2: Premium Clearance'}
              {step === 3 && 'Step 3: Boarding Passage Ready'}
            </span>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 text-gray-500 hover:text-red-500 hover:border-red-200 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Step Panels */}
        <div className="p-6">
          
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4.5">
              
              {/* Short summary item */}
              <div className="flex gap-3.5 p-3 rounded-2xl bg-[#00BFA5]/5 border border-[#00BFA5]/15 items-center">
                <img 
                  src={tour.bannerImage} 
                  alt={tour.title}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] truncate">{tour.title}</h4>
                  <p className="text-[10px] text-gray-500 font-light mt-0.5">{tour.duration} • Min group focus</p>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 font-semibold">
                  {error}
                </p>
              )}

              {/* Form Input fields */}
              <div className="space-y-3.5">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">
                    Legal Name (matching passport)
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="e.g. Alexandra Thorne"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs sm:text-sm text-[#111111] rounded-xl outline-none focus:ring-1.5 focus:ring-[#00BFA5]/15 border border-gray-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">
                    Personal Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input 
                      type="email"
                      placeholder="e.g. alex@luxury-travel.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs sm:text-sm text-[#111111] rounded-xl outline-none focus:ring-1.5 focus:ring-[#00BFA5]/15 border border-gray-100 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">
                      Departure Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] text-xs font-medium text-[#111111] rounded-xl outline-none border border-gray-100 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">
                      Traveler Counts
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] text-xs sm:text-sm font-semibold text-[#111111] rounded-xl outline-none border border-gray-100 focus:bg-white cursor-pointer"
                      >
                        {[1, 2, 3, 4, 6, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Traveler' : 'Travelers'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 pl-1">
                    Special Requests (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4.5 w-4.5 h-4.5 text-gray-400" />
                    <textarea 
                      placeholder="Dietary requests, helicopter weight profiles, private access requests..."
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs text-[#111111] rounded-xl outline-none focus:ring-1.5 focus:ring-[#00BFA5]/15 border border-gray-100 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4.5 bg-[#111111] hover:bg-[#00BFA5] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer transition-transform duration-200 active:scale-95"
                >
                  <span>Advance Checkouts</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="mb-4">
                <h3 className="font-display text-lg font-bold text-[#111111]">Billing Ledger</h3>
                <p className="text-xs text-gray-500 font-light">Exquisite detailed transaction breakdown</p>
              </div>

              {/* Financial columns */}
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-light">Bespoke Suite Package ({formatINR(tour.price)} x {guests})</span>
                  <span className="font-bold text-[#111111]">{formatINR(subtotal)}</span>
                </div>
                
                {/* Luxury Carbon offsetting check Option */}
                <div className="flex items-start justify-between text-xs py-1 border-t border-b border-gray-100/60 p-1">
                  <div className="flex items-start gap-2.5">
                    <input 
                      type="checkbox"
                      id="carbon"
                      checked={carbonOffset}
                      onChange={(e) => setCarbonOffset(e.target.checked)}
                      className="mt-0.5 rounded accent-[#00BFA5]"
                    />
                    <label htmlFor="carbon" className="text-[10px] text-gray-500 leading-normal select-none cursor-pointer">
                      <span className="font-bold text-[#00BFA5] flex items-center gap-1.5">
                        <Trees className="w-3.5 h-3.5" /> Direct Aura Carbon Offsets
                      </span>
                      Fund organic local forest rejuvenation projects (+ {formatINR(25)} / traveler)
                    </label>
                  </div>
                  {carbonOffset && (
                    <span className="font-bold text-[#111111] shrink-0 font-sans z-10">{formatINR(carbonFee)}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-light flex items-center gap-1">
                    Luxury Tourism Fees & Care Ledger <Info className="w-3 h-3 text-[#00BFA5]" />
                  </span>
                  <span className="font-bold text-[#111111]">{formatINR(luxuryTax)}</span>
                </div>

                <div className="border-t border-dashed border-gray-200 mt-4 pt-3.5 flex items-baseline justify-between text-[#111111]">
                  <span className="text-xs font-bold uppercase tracking-wider font-display">Grand Total Starting</span>
                  <span className="text-xl font-extrabold text-[#00BFA5] font-display">
                    {formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Simulated Credit input */}
              <div className="p-3.5.5 rounded-2xl border border-[#00BFA5]/15 bg-[#00BFA5]/5 flex items-center gap-3 text-xs leading-relaxed text-gray-600">
                <CreditCard className="w-5 h-5 text-[#00BFA5] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-[#111111]">Complimentary Premium Clearance</p>
                  <p className="font-light">Demo transaction mode activated. Payments bypass bank servers safely.</p>
                </div>
              </div>

              {/* Booking CTAs */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isProcessing}
                  className="px-4.5 py-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 rounded-2xl text-xs font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="flex-1 py-4.5 bg-[#111111] hover:bg-[#00BFA5] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4.5 h-4.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Transiting premium clearing...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck className="w-4.5 h-4.5 text-[#00BFA5]" />
                      <span>Approve & Authorize Payment</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center pt-2">
              
              {/* Giant victory check tick */}
              <div className="w-16 h-16 bg-[#00BFA5]/10 rounded-full flex items-center justify-center text-[#00BFA5] mx-auto animate-bounce shadow">
                <TicketCheck className="w-8 h-8 stroke-[2.2]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#111111]">
                  Journey Approved!
                </h3>
                <p className="text-xs text-gray-500 font-light">
                  A high-contrast luxury digital boarding voucher has been logged
                </p>
              </div>

              {/* Curated Boarding Pass Style Receipt Card */}
              <div className="border border-dashed border-gray-200 rounded-2xl overflow-hidden bg-neutral-900 text-white shadow-xl text-left font-mono relative">
                
                {/* Visual side notches */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white z-10" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white z-10" />

                {/* Cover title */}
                <div className="bg-[#00BFA5] text-white p-3.5 flex items-center justify-between text-[11px] font-bold tracking-tight">
                  <span className="font-display">TRIPZY ELITE VOUCHER</span>
                  <span>CONFIRMED SECURE</span>
                </div>

                <div className="p-5.5 space-y-4 text-[11px]">
                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/10 text-gray-300">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase">PASS HOLDER</p>
                      <p className="font-bold text-white uppercase mt-0.5 truncate">{fullName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase">JOURNEY VALUE</p>
                      <p className="font-bold text-[#00BFA5] mt-0.5">{formatINR(grandTotal)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-white/10 text-gray-300">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase">START DEPARTURE</p>
                      <p className="font-bold text-white mt-0.5">{date}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase">GUEST ALLOCATION</p>
                      <p className="font-bold text-white mt-0.5">{guests} Travelers</p>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-[9px] text-gray-400">BOARDING VOUCHER CODE</p>
                    <p className="font-display font-medium text-[#00BFA5] tracking-widest text-[#00BFA5] text-base mt-0.5">
                      TZ-{(guests * 89 + indexSum(fullName)).toString().padStart(6, '9')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Closing Trigger button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSuccessClose}
                  className="w-full py-4.5 bg-[#00BFA5] hover:bg-[#111111] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md cursor-pointer transition-colors"
                >
                  Done, Add to My Trips
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// Simple algorithm to offset custom keys
function indexSum(str: string): number {
  let val = 0;
  for(let i=0; i<str.length; i++) {
    val += str.charCodeAt(i);
  }
  return val % 999;
}
