import { useState, useEffect } from 'react';
import { Sparkles, Calendar, Heart, ShieldAlert, CheckCircle2, MapPin, Compass } from 'lucide-react';

// Import Types
import { TabType, Tour } from './types';

// Import Pre-curated Data
import { TOURS_DATA } from './data';

// Import Custom Modular Components
import GlassNavbar from './components/GlassNavbar';
import BottomNavbar from './components/BottomNavbar';
import Hero from './components/Hero';
import NetflixCategoryRows from './components/NetflixCategoryRows';
import ExploreView from './components/ExploreView';
import TourDetailsView from './components/TourDetailsView';
import SearchModal from './components/SearchModal';
import BookingModal from './components/BookingModal';
import TripsWishlistView from './components/TripsWishlistView';
import ProfileView from './components/ProfileView';

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

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Persistent client states
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tripzy_wishlist');
      // Initialize with Maldives as default pre-curated heart to feel polished
      return saved ? JSON.parse(saved) : ['maldives-luxury', 'kyoto-autumn'];
    } catch {
      return ['maldives-luxury', 'kyoto-autumn'];
    }
  });

  const [bookedTours, setBookedTours] = useState<BookedItem[]>(() => {
    try {
      const saved = localStorage.getItem('tripzy_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal display togglers
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeBookingTour, setActiveBookingTour] = useState<Tour | null>(null);

  // Dynamic temporary states
  const [exploreCategoryFilter, setExploreCategoryFilter] = useState('all');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('tripzy_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('tripzy_bookings', JSON.stringify(bookedTours));
  }, [bookedTours]);

  // Handle Global Keyboard Shortcut CMD+K and CTRL+K for Search Modal
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  // Operation: Toggle bookmark wishlist
  const handleToggleWishlist = (tourId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(tourId)) {
        return prev.filter((id) => id !== tourId);
      } else {
        return [...prev, tourId];
      }
    });
  };

  // Operation: Complete mock Checkout flow
  const handleCompleteBooking = (newBooking: BookedItem) => {
    setBookedTours((prev) => [newBooking, ...prev]);
    // Switch to trips page to view digital ticket
    setCurrentTab('trips');
    setSelectedTour(null);
  };

  // Operation: Cancel reservation
  const handleCancelExpedition = (bookingCode: string) => {
    if (confirm('Are you sure you want to cancel this scheduled luxury expedition?')) {
      setBookedTours((prev) => prev.filter((b) => b.bookingCode !== bookingCode));
    }
  };

  // Handle quick click redirection inside Hero suggestions
  const handleQuickCategoryClick = (categoryTag: string) => {
    setExploreCategoryFilter(categoryTag);
    setCurrentTab('explore');
    setSelectedTour(null);
  };

  // Retrieve tours bookmarked in the wishlist
  const wishlistTours = TOURS_DATA.filter((tour) => wishlistIds.includes(tour.id));

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] antialiased relative overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#00BFA5]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Top Glass Navigation Bar (Desktop Only) */}
      <GlassNavbar 
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setSelectedTour(null); // click a tab resets active detail view
        }}
        onSearchClick={() => setSearchModalOpen(true)}
        wishlistCount={wishlistIds.length}
        bookingsCount={bookedTours.length}
      />

      {/* Main Tab Rendering Coordinates */}
      <main className="w-full">
        {selectedTour ? (
          <TourDetailsView 
            tour={selectedTour}
            onBack={() => setSelectedTour(null)}
            onBookNowClick={(tour) => {
              setActiveBookingTour(tour);
              setBookingModalOpen(true);
            }}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedTour.id)}
          />
        ) : (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            
            {currentTab === 'home' && (
              <>
                <Hero 
                  onStartExploringClick={() => {
                    setExploreCategoryFilter('all');
                    setCurrentTab('explore');
                  }}
                  onSearchClick={() => setSearchModalOpen(true)}
                  onQuickCategoryClick={handleQuickCategoryClick}
                />
                
                {/* Netflix category rows */}
                <div className="py-6 bg-[#FAFAFA]">
                  <NetflixCategoryRows 
                    tours={TOURS_DATA}
                    onTourSelect={setSelectedTour}
                    onToggleWishlist={handleToggleWishlist}
                    wishlistIds={wishlistIds}
                    onCategoryClick={handleQuickCategoryClick}
                  />
                </div>
              </>
            )}

            {currentTab === 'explore' && (
              <ExploreView 
                tours={TOURS_DATA}
                onTourSelect={setSelectedTour}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                initialCategoryFilter={exploreCategoryFilter}
              />
            )}

            {currentTab === 'trips' && (
              <TripsWishlistView 
                wishlistTours={wishlistTours}
                bookedTours={bookedTours}
                onTourSelect={setSelectedTour}
                onRemoveWishlist={handleToggleWishlist}
                onCancelExpedition={handleCancelExpedition}
                onNavigateExplore={() => {
                  setExploreCategoryFilter('all');
                  setCurrentTab('explore');
                }}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileView />
            )}

          </div>
        )}
      </main>

      {/* Persistent Bottom Floating Pill Navbar (Mobile Only) */}
      <BottomNavbar 
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setSelectedTour(null);
        }}
        wishlistCount={wishlistIds.length}
        bookingsCount={bookedTours.length}
      />

      {/* Global Interactive Overlays */}
      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        tours={TOURS_DATA}
        onSelectTour={(tour) => {
          setSelectedTour(tour);
          setSearchModalOpen(false);
        }}
      />

      {activeBookingTour && (
        <BookingModal 
          isOpen={bookingModalOpen}
          onClose={() => {
            setBookingModalOpen(false);
            setActiveBookingTour(null);
          }}
          tour={activeBookingTour}
          onCompleteBooking={handleCompleteBooking}
        />
      )}

      {/* Decorative Brand Margins Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6 text-center select-none pb-28 md:pb-12 text-xs text-gray-400 font-light font-display">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Tripzy Concierge. Engineered for premium aesthetic exploration of luxury charters.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#00BFA5] cursor-pointer">Security Ledger</span>
            <span>•</span>
            <span className="hover:text-[#00BFA5] cursor-pointer">Aura Protocols</span>
            <span>•</span>
            <span className="hover:text-[#00BFA5] cursor-pointer">Terms of Passages</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
