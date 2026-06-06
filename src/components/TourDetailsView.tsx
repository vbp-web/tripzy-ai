import { useState } from 'react';
import { 
  ArrowLeft, Star, Clock, MapPin, Sparkles, CheckCircle, Heart, Share2, 
  ChevronRight, CalendarCheck, Utensils, Plane, ShieldAlert, Home, Compass, User
} from 'lucide-react';
import { Tour } from '../types';
import { formatINR } from '../utils/currency';

interface TourDetailsViewProps {
  tour: Tour;
  onBack: () => void;
  onBookNowClick: (tour: Tour) => void;
  onToggleWishlist: (tourId: string) => void;
  isWishlisted: boolean;
}

// Map service icons
function ServiceIconHelper({ iconName }: { iconName: string }) {
  const cn = "w-5 h-5 text-[#00BFA5]";
  switch (iconName) {
    case 'Utensils': return <Utensils className={cn} />;
    case 'Plane': return <Plane className={cn} />;
    case 'ShieldAlert': return <ShieldAlert className={cn} />;
    case 'Home': return <Home className={cn} />;
    default: return <Compass className={cn} />;
  }
}

export default function TourDetailsView({
  tour,
  onBack,
  onBookNowClick,
  isWishlisted,
  onToggleWishlist
}: TourDetailsViewProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeDay, setActiveDay] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pt-24 pb-32 bg-[#FAFAFA] min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Back and Header Toolbar */}
        <div className="flex items-center justify-between mb-8 py-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-xs font-semibold text-[#111111] border border-gray-100 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#00BFA5]" />
            <span>Return to Escapes</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#00BFA5] shadow-sm cursor-pointer hover:scale-[1.03]"
              title="Share Tour"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleWishlist(tour.id)}
              className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all hover:scale-[1.03] ${
                isWishlisted
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md'
                  : 'bg-white border-gray-100 text-gray-600 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {sharedGallerySection()}

        {/* Content Structure details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 items-start">
          
          {/* Main Info column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Overview paragraph */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
              <span className="text-[10px] font-bold tracking-widest text-[#00BFA5] uppercase block mb-2 font-display">
                Sanctuary Overview
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-4">
                About the {tour.title}
              </h2>
              <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed">
                {tour.description}
              </p>

              {/* Tag Badges row */}
              <div className="flex flex-wrap gap-2 mt-6">
                {tour.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-3.5 py-1 rounded-full bg-[#FAFAFA] text-xs font-medium text-[#111111] border border-gray-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary timeline */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-widest text-[#00BFA5] uppercase block font-display">
                  Chronological Journey
                </span>
                <h3 className="font-display text-2xl font-bold text-[#111111] tracking-tight">
                  Daily Expedition Schedule
                </h3>
              </div>

              {/* Day numbers selector bar */}
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-gray-100">
                {tour.itinerary.map((it) => (
                  <button
                    key={it.day}
                    onClick={() => setActiveDay(it.day)}
                    className={`px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      activeDay === it.day
                        ? 'bg-[#00BFA5] text-white shadow-md shadow-[#00BFA5]/15'
                        : 'bg-[#FAFAFA] hover:bg-gray-50 text-gray-500 border border-gray-100'
                    }`}
                  >
                    Day 0{it.day}
                  </button>
                ))}
              </div>

              {/* Active day visual card */}
              <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#FAFAFA]/70 border border-gray-100/60 animate-[fadeIn_0.30s_ease-out]">
                {tour.itinerary.map((it) => {
                  if (it.day !== activeDay) return null;
                  return (
                    <div key={it.day} className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-[#00BFA5] uppercase font-display block">
                          Day 0{it.day} Morning Departure
                        </span>
                        <h4 className="font-display text-lg font-bold text-[#111111] mt-0.5">
                          {it.title}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                        {it.description}
                      </p>

                      <div className="pt-2">
                        <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2.5">
                          Highlight Activities:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {it.activities.map((act, aIdx) => (
                            <div key={aIdx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-[#00BFA5] shrink-0" />
                              <span className="text-xs text-[#111111] font-medium">{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Included Services Column */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-widest text-[#00BFA5] uppercase block font-display">
                  Amenities Matrix
                </span>
                <h3 className="font-display text-2xl font-bold text-[#111111] tracking-tight">
                  Included Premium Services
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.includedServices.map((srv, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-3 p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 items-start hover:scale-[1.01] transition-transform"
                  >
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100/50">
                      <ServiceIconHelper iconName={srv.iconName} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#111111] mb-0.5">{srv.name}</h4>
                      <p className="text-[10px] text-gray-400 font-light leading-none">High-tier luxury standard</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Reviews Section */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] pb-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#00BFA5] uppercase block font-display">
                    Guest Book Notes
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#111111] tracking-tight">
                    Traveler Testimonials
                  </h3>
                </div>
                
                <div className="flex items-center gap-1 bg-[#FAFAFA] p-2.5 rounded-2xl border border-gray-100">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-[#111111]">{tour.rating}</span>
                  <span className="text-xs text-gray-400 font-light">({tour.reviewsCount})</span>
                </div>
              </div>

              <div className="space-y-6">
                {tour.reviews.map((rev) => (
                  <div 
                    key={rev.id}
                    className="p-5.5 rounded-2xl bg-[#FAFAFA] border border-gray-100 relative space-y-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={rev.avatar} 
                          alt={rev.author}
                          className="w-10 h-10 rounded-full object-cover border border-[#00BFA5]/20"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-[#111111] leading-none mb-0.5">{rev.author}</h4>
                          <p className="text-[10px] text-gray-400 font-light">{rev.date}</p>
                        </div>
                      </div>

                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(rev.rating) 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Checkout right-sidebar sticker column */}
          <div className="sticky top-28 space-y-6">
            
            {/* Quick Metrics details cards */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.015)] space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#00BFA5] uppercase block font-display">
                Escapes metrics
              </span>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFAFA] text-xs">
                  <span className="text-gray-500 font-light">Price Bracket</span>
                  <span className="font-bold text-[#111111] font-display text-sm">{formatINR(tour.price)}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFAFA] text-xs">
                  <span className="text-gray-500 font-light">Duration Total</span>
                  <span className="font-bold text-[#111111]">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFAFA] text-xs">
                  <span className="text-gray-500 font-light">Group Sizing</span>
                  <span className="font-bold text-[#111111]">{tour.groupSize}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAFAFA] text-xs">
                  <span className="text-gray-500 font-light">Physical difficulty</span>
                  <span className="font-bold text-[#00BFA5]">{tour.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Instant Book Invitation Panel */}
            <div className="bg-[#111111] hover:bg-[#151515] text-white p-6 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#ffffff]/10 relative overflow-hidden transition-all duration-300">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#00BFA5]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div>
                  <span className="text-[#00BFA5] text-[10px] font-bold tracking-widest uppercase mb-1 block font-display">
                    Aura Booking Terminal
                  </span>
                  <h3 className="font-display text-xl font-bold leading-tight">
                    Secure an Expedition Slot
                  </h3>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mt-1.5">
                    Spaces for our high-intensity boutique custom charters are capped strictly at {tour.groupSize.toLowerCase()}. Lock your dates safely today.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Total Price Starting</p>
                    <p className="text-2xl font-extrabold text-white font-display">
                      {formatINR(tour.price)}
                    </p>
                  </div>
                  <span className="text-xs text-[#00BFA5] font-light">No covert fees</span>
                </div>

                <button 
                  onClick={() => onBookNowClick(tour)}
                  className="w-full py-3.5 bg-[#00BFA5] hover:bg-[#00D9B8] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Initialize Booking Flow</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Sticky Bottom Booking Drawer (For Screen accessibility) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 md:hidden shadow-[0_-8px_32px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between max-w-md mx-auto gap-3">
          <div>
            <p className="text-[9px] text-[#666666] leading-none mb-0.5">ESTIMATED TOTAL</p>
            <p className="text-lg font-extrabold text-[#111111] font-display">
              {formatINR(tour.price)}
            </p>
          </div>

          <button 
            onClick={() => onBookNowClick(tour)}
            className="flex-1 max-w-[200px] py-3 bg-[#00BFA5] hover:bg-[#00D9B8] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer text-center active:scale-95 transition-all"
          >
            Book Now
          </button>
        </div>
      </div>

      {copiedLink && (
        <div className="fixed bottom-24 right-8 z-50 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 pointer-events-none animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#00BFA5]" />
          <span>Trip link copied to clipboard!</span>
        </div>
      )}
    </div>
  );

  function sharedGallerySection() {
    return (
      <div className="space-y-4">
        {/* Gallery viewport */}
        <div className="relative h-[48vh] sm:h-[55h] rounded-[32px] overflow-hidden bg-gray-100 shadow-[0_12px_45px_rgba(0,0,0,0.06)] group">
          <img 
            src={tour.images[activePhotoIndex]} 
            alt={`${tour.title} full aspect`}
            className="w-full h-full object-cover transition-all duration-700 ease-out scale-102 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15 pointer-events-none" />

          {/* Subtitle details layered atop images */}
          <div className="absolute bottom-8 left-8 sm:left-12 space-y-1 z-10 text-white max-w-xl">
            <p className="text-xs uppercase font-bold text-[#00BFA5] tracking-widest font-display flex items-center gap-1.5 mb-1 bg-white/10 backdrop-blur px-3 py-1 rounded-full w-fit">
              <MapPin className="w-3.5 h-3.5 text-[#00BFA5]" />
              <span>{tour.location}</span>
            </p>
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {tour.title}
            </h1>
            <p className="text-xs sm:text-base text-gray-200 font-light mt-1.5 leading-relaxed">
              {tour.subtitle}
            </p>
          </div>

          <div className="absolute top-8 right-8 z-10 hidden sm:flex items-center gap-1 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs border border-white/20">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-bold">{tour.rating}</span>
            <span className="text-[10px] text-gray-300">({tour.reviewsCount} verified)</span>
          </div>
        </div>

        {/* Multi-photo select thumb row */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {tour.images.map((photo, i) => (
            <button
               key={i}
               onClick={() => setActivePhotoIndex(i)}
               className={`relative w-20 sm:w-28 h-14 sm:h-20 shrink-0 rounded-2xl overflow-hidden focus:outline-none transition-all cursor-pointer ${
                 activePhotoIndex === i 
                   ? 'ring-2.5 ring-[#00BFA5] scale-[0.98]' 
                   : 'opacity-75 hover:opacity-100'
               }`}
            >
              <img 
                src={photo} 
                alt={`${tour.title} thumb ${i+1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
}
