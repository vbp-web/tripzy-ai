import { useState } from 'react';
import { 
  Heart, Calendar, MapPin, Users, CheckCircle2, Trash2, Printer, 
  ArrowRight, Sparkles, Compass, HelpCircle, AlertCircle
} from 'lucide-react';
import { Tour } from '../types';
import { formatINR } from '../utils/currency';

interface BookedItem {
  tourId: string;
  tourTitle: string;
  bannerImage: string;
  price: number;
  guests: number;
  date: string;
  fullName: string;
  email: string;
  bookingCode: string;
}

interface TripsWishlistViewProps {
  wishlistTours: Tour[];
  bookedTours: BookedItem[];
  onTourSelect: (tour: Tour) => void;
  onRemoveWishlist: (tourId: string) => void;
  onCancelExpedition: (bookingCode: string) => void;
  onNavigateExplore: () => void;
}

export default function TripsWishlistView({
  wishlistTours,
  bookedTours,
  onTourSelect,
  onRemoveWishlist,
  onCancelExpedition,
  onNavigateExplore
}: TripsWishlistViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'wishlist'>('bookings');
  const [mockPrintCode, setMockPrintCode] = useState<string | null>(null);

  const triggerMockPrint = (code: string) => {
    setMockPrintCode(code);
    setTimeout(() => setMockPrintCode(null), 2500);
  };

  return (
    <div className="pt-24 pb-32 px-4 sm:px-8 max-w-7xl mx-auto select-none bg-[#FAFAFA] min-h-screen">
      
      {/* Page header */}
      <div className="mb-10 text-center max-w-2xl mx-auto pt-6">
        <span className="px-3 py-1 bg-[#00BFA5]/10 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider rounded-full mb-3 inline-block">
          Your Curated Escapes Ledger
        </span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#111111]">
          Trips & Wishlists
        </h1>
        <p className="text-gray-500 font-light mt-1 text-sm leading-relaxed">
          Manage your fully scheduled private travel passes or refine your bookmarked luxury escapes.
        </p>
      </div>

      {/* Sub tabs pill buttons */}
      <div className="flex justify-center mb-10">
        <div className="bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 flex gap-2.5 shadow-sm">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'bookings'
                ? 'bg-[#111111] text-white shadow'
                : 'text-gray-500 hover:text-[#111111]'
            }`}
          >
            <span>Your Expeditions</span>
            {bookedTours.length > 0 && (
              <span className="h-4.5 min-w-4.5 rounded-full bg-[#00BFA5] text-[10px] font-bold text-white flex items-center justify-center px-1">
                {bookedTours.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveSubTab('wishlist')}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'wishlist'
                ? 'bg-[#111111] text-white shadow'
                : 'text-gray-500 hover:text-[#111111]'
            }`}
          >
            <span>Curated Wishlist</span>
            {wishlistTours.length > 0 && (
              <span className="h-4.5 min-w-4.5 rounded-full bg-[#00BFA5] text-[10px] font-bold text-white flex items-center justify-center px-1">
                {wishlistTours.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Booked Expeditions Panel */}
      {activeSubTab === 'bookings' && (
        <div className="space-y-6">
          {bookedTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bookedTours.map((bt) => (
                <div 
                  key={bt.bookingCode}
                  className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden flex flex-col justify-between"
                >
                  {/* Top card block info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex gap-4">
                        <img 
                          src={bt.bannerImage} 
                          alt={bt.tourTitle}
                          className="w-16 h-16 rounded-xl object-cover border"
                        />
                        <div>
                          <span className="text-[9px] font-bold text-[#00BFA5] uppercase tracking-widest font-display block mb-1">
                            Aura Boarding Pass confirmed
                          </span>
                          <h3 className="font-display font-semibold text-sm leading-snug text-[#111111] line-clamp-1">
                            {bt.tourTitle}
                          </h3>
                          <p className="text-[10px] text-gray-400 font-light mt-0.5 font-mono">CODE: {bt.bookingCode}</p>
                        </div>
                      </div>

                      <span className="px-3 py-1 bg-[#00BFA5]/10 text-[10px] font-bold text-[#00BFA5] rounded-full uppercase tracking-wider">
                        Approved
                      </span>
                    </div>

                    {/* Specifications lists */}
                    <div className="grid grid-cols-2 gap-3.5 bg-[#FAFAFA] p-4 rounded-2xl border border-gray-100 text-xs">
                      <div className="space-y-0.5">
                        <p className="text-[9px] text-gray-400 uppercase font-semibold">Departure Date</p>
                        <p className="font-bold text-[#111111] leading-none">{bt.date}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[9px] text-gray-400 uppercase font-semibold">Traveler Counts</p>
                        <p className="font-bold text-[#111111] leading-none">{bt.guests} {bt.guests === 1 ? 'Guest' : 'Guests'}</p>
                      </div>
                      <div className="space-y-0.5 mt-2">
                        <p className="text-[9px] text-gray-400 uppercase font-semibold">Primary Traveler</p>
                        <p className="font-bold text-[#111111] uppercase leading-none truncate max-w-[120px]">{bt.fullName}</p>
                      </div>
                      <div className="space-y-0.5 mt-2">
                        <p className="text-[9px] text-gray-400 uppercase font-semibold">Receipt Rate</p>
                        <p className="font-bold text-[#00BFA5] leading-none">{formatINR(bt.price)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vouchers operations */}
                  <div className="bg-[#FAFAFA] border-t border-gray-100 p-4 px-6 flex items-center justify-between gap-2.5">
                    <button
                      onClick={() => triggerMockPrint(bt.bookingCode)}
                      className="text-xs font-bold text-gray-600 hover:text-[#00BFA5] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-[#00BFA5]" />
                      <span>Print Voucher PDF</span>
                    </button>

                    <button
                      onClick={() => onCancelExpedition(bt.bookingCode)}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-[32px] max-w-md mx-auto p-6 shadow-sm">
              <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-[#111111]">No Scheduled Expeditions</h3>
              <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                You haven't locked in any luxury custom retreats. Head over to the tour explorer or category pages to authorize a booking voucher.
              </p>
              <button
                onClick={onNavigateExplore}
                className="mt-6 px-6 py-3 bg-[#00BFA5] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#111111] transition-all cursor-pointer inline-flex items-center gap-1"
              >
                <span>Browse Tour Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Curated Wishlist Panel */}
      {activeSubTab === 'wishlist' && (
        <div>
          {wishlistTours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistTours.map((tour) => (
                <div 
                  key={tour.id}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-gray-100">
                    <img 
                      src={tour.bannerImage} 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    
                    {/* Heart removal button */}
                    <button
                      onClick={() => onRemoveWishlist(tour.id)}
                      className="absolute top-3 right-3 w-8.5 h-8.5 rounded-full bg-[#00BFA5]/90 text-white flex items-center justify-center border border-[#00BFA5]/10 cursor-pointer shadow-sm hover:bg-rose-500 hover:border-rose-500 group-hover:scale-105"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-3 left-3 bg-black/45 backdrop-blur px-2.5 py-1 rounded-full text-[10px] text-white font-mono">
                      {formatINR(tour.price)}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#00BFA5] flex items-center gap-1 font-display mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>{tour.location}</span>
                      </p>
                      <h3 className="font-display font-semibold text-sm line-clamp-1 text-[#111111]">
                        {tour.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-light line-clamp-2 mt-0.5">{tour.subtitle}</p>
                    </div>

                    <button
                      onClick={() => onTourSelect(tour)}
                      className="w-full mt-4 py-2.5 bg-gray-50 text-[#111111] hover:bg-[#00BFA5] hover:text-white border border-gray-100 hover:border-[#00BFA5] rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
                    >
                      Bespoke Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-[32px] max-w-md mx-auto p-6 shadow-sm">
              <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-[#111111]">{`Your wishlist is pristine`}</h3>
              <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                As you explore, heart individual items to keep track of your favorite luxury villas, private yachts, or glacier chalets.
              </p>
              <button
                onClick={onNavigateExplore}
                className="mt-6 px-6 py-3 bg-[#00BFA5] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#111111] transition-all cursor-pointer inline-flex items-center gap-1"
              >
                <span>Inspect All Destinations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Printing Simulator overlay */}
      {mockPrintCode && (
        <div className="fixed top-24 right-8 z-55 bg-gray-900 border border-white/10 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideIn">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00BFA5] animate-ping" />
          <div className="text-xs">
            <p className="font-bold">Printing Digital Voucher...</p>
            <p className="font-light text-gray-400 text-[10px]">Processing pass TZ-{mockPrintCode}</p>
          </div>
        </div>
      )}

    </div>
  );
}
