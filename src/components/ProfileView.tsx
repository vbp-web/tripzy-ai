import { useState, FormEvent } from 'react';
import { 
  Sparkles, TrendingUp, Trees, Award, UserCheck, Globe, 
  DollarSign, Sliders, ShieldAlert, Check, Milestone, HeartHandshake
} from 'lucide-react';

export default function ProfileView() {
  const [profileName, setProfileName] = useState('Alexandra Thorne');
  const [profileEmail, setProfileEmail] = useState('alex@luxury-travel.com');
  const [preferredCurrency, setPreferredCurrency] = useState('INR');
  const [selectedSeat, setSelectedSeat] = useState('Window');
  const [vipTier, setVipTier] = useState('Solstice Black Club');
  
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="pt-24 pb-32 px-4 sm:px-8 max-w-7xl mx-auto select-none bg-[#FAFAFA] min-h-screen">
      
      {/* Page Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto pt-6">
        <span className="px-3 py-1 bg-[#00BFA5]/10 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider rounded-full mb-3 inline-block">
          Your Executive Lounge Privilege
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#111111]">
          Member Portfolio
        </h1>
        <p className="text-gray-500 font-light mt-1 text-sm leading-relaxed">
          Manage your elite concierge preferences, verify mileage tallies, and carbon offset logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Aura Tier Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111111] text-white p-6.5 rounded-[32px] shadow-xl relative overflow-hidden border border-white/10">
            {/* Shimmers background decoration */}
            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-[#00BFA5]/25 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6.5 relative z-10">
              
              {/* Premium tier info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#00BFA5]">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest font-display">Tripzy Aura Elite</span>
                </div>
                <span className="px-2.5 py-0.5 bg-white/10 backdrop-blur text-[9px] font-bold tracking-wider uppercase rounded-full">
                  Lvl 09
                </span>
              </div>

              {/* Balance & status */}
              <div className="space-y-1">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest">LOYALTY LEVEL TIER</p>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white leading-normal">
                  {vipTier}
                </h2>
                <p className="text-xs text-gray-400 font-light mt-1 leading-normal">
                  Invitation level credentials honoring ultra-luxury flight-sharing and direct-to-island yacht transits.
                </p>
              </div>

              {/* Statistics points */}
              <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[8px] text-gray-500 uppercase leading-none mb-1">Aura Points Balance</p>
                  <p className="font-display font-bold text-lg text-white">48,250 <span className="text-[9px] text-[#00BFA5] font-light">pts</span></p>
                </div>
                <div>
                  <p className="text-[8px] text-gray-500 uppercase leading-none mb-1">Completed trips</p>
                  <p className="font-display font-bold text-lg text-white">12 <span className="text-[9px] text-[#00BFA5] font-light">escapes</span></p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Metrics stats */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 flex gap-4 items-center">
            <div className="p-3.5 bg-[#00BFA5]/10 rounded-2xl">
              <Trees className="w-5.5 h-5.5 text-[#00BFA5]" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">ECO IMPACT CREDIT</p>
              <p className="font-display font-extrabold text-[#111111] text-base">380 Kg <span className="text-xs text-[#00BFA5] font-light">CO2 Offset</span></p>
              <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-none">Your forestation quota contribution</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 flex gap-4 items-center">
            <div className="p-3.5 bg-[#00BFA5]/10 rounded-2xl">
              <HeartHandshake className="w-5.5 h-5.5 text-[#00BFA5]" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">MEMBER LOUNGE ACCESS</p>
              <p className="font-display font-extrabold text-[#111111] text-base">Complimentary VIP</p>
              <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-none">Valid across 450 airports globally</p>
            </div>
          </div>
        </div>

        {/* Right Side: Preferences Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                  Concierge Presets
                </h3>
                <p className="text-xs text-gray-500 font-light">Customized specifications auto-applied to future bookings</p>
              </div>
              <Award className="w-6 h-6 text-[#00BFA5]" />
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 pl-1">
                    Display Profile Name
                  </label>
                  <input 
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs sm:text-sm text-[#111111] rounded-xl outline-none focus:ring-1.5 focus:ring-[#00BFA5]/20 border border-gray-100 transition-all font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 pl-1">
                    Contact Email Address
                  </label>
                  <input 
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs sm:text-sm text-[#111111] rounded-xl outline-none focus:ring-1.5 focus:ring-[#00BFA5]/20 border border-gray-100 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 pl-1">
                    Loyalty Level
                  </label>
                  <select
                    value={vipTier}
                    onChange={(e) => setVipTier(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs text-[#111111] rounded-xl outline-none border border-gray-100 font-semibold cursor-pointer"
                  >
                    <option value="Solstice Black Club">📌 Solstice Black Club</option>
                    <option value="Aura Ambassador">📌 Aura Ambassador</option>
                    <option value="Nomadic Pioneer">📌 Nomadic Pioneer</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 pl-1">
                    Primary Currency
                  </label>
                  <select
                    value={preferredCurrency}
                    onChange={(e) => setPreferredCurrency(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs text-[#111111] rounded-xl outline-none border border-gray-100 font-semibold cursor-pointer"
                  >
                    <option value="INR">🇮🇳 INR (₹)</option>
                    <option value="USD">💵 USD ($)</option>
                    <option value="EUR">💶 EUR (€)</option>
                    <option value="JPY">💴 JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5 pl-1">
                    Preferred Cabin Seat
                  </label>
                  <select
                    value={selectedSeat}
                    onChange={(e) => setSelectedSeat(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAFAFA] focus:bg-white text-xs text-[#111111] rounded-xl outline-none border border-gray-100 font-semibold cursor-pointer"
                  >
                    <option value="Window">💺 Window Seat</option>
                    <option value="Aisle">💺 Aisle Seat</option>
                    <option value="Elite Suite">💺 Private Cabin</option>
                  </select>
                </div>
              </div>

              {/* Notification preferences checks */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">System Permissions</p>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="notify-1" defaultChecked className="rounded accent-[#00BFA5]" />
                  <label htmlFor="notify-1" className="text-xs text-gray-500 font-light cursor-pointer select-none">
                    Receive SMS alerts from helicopter and yacht dispatcher captains
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="notify-2" defaultChecked className="rounded accent-[#00BFA5]" />
                  <label htmlFor="notify-2" className="text-xs text-gray-500 font-light cursor-pointer select-none">
                    Subscribe to bi-weekly "Aura Gazette" travel review bulletins
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-[10px] text-gray-400 font-light italic flex items-center gap-1.5">
                  <ShieldCheckmark /> Aura ledger updates automatically
                </span>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#00BFA5] hover:bg-[#111111] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Presets</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>

      {isSaved && (
        <div className="fixed bottom-24 right-8 z-50 px-4 py-2.5 bg-[#00BFA5] text-white rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 pointer-events-none animate-bounce">
          <Check className="w-4 h-4" />
          <span>Concierge preferences updated securely!</span>
        </div>
      )}

    </div>
  );
}

function ShieldCheckmark() {
  return (
    <svg className="w-4 h-4 text-[#00BFA5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
