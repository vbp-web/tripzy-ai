import { useState, useEffect } from 'react';
import { Compass, Search, Heart, Map, User, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface GlassNavbarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSearchClick: () => void;
  wishlistCount: number;
  bookingsCount: number;
}

export default function GlassNavbar({
  currentTab,
  onTabChange,
  onSearchClick,
  wishlistCount,
  bookingsCount
}: GlassNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if reading top area or scrolling up
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down and past threshold -> hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Compass },
    { id: 'explore' as TabType, label: 'Explore', icon: Map },
    { id: 'trips' as TabType, label: 'Trips & Wishlist', icon: Heart, badge: wishlistCount + bookingsCount },
    { id: 'profile' as TabType, label: 'Profile', icon: User }
  ];

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl hidden md:block select-none transition-all duration-500 cubic-bezier(0.16,1,0.3,1) ${
      visible ? 'top-5 opacity-100' : 'top-0 -translate-y-28 opacity-0 pointer-events-none'
    }`}>
      <div className="glass-liquid flex items-center justify-between px-8 py-3.5 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] border border-white/40 transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(31,38,135,0.12)]">
        
        {/* Logo */}
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-[#00BFA5] flex items-center justify-center text-white shadow-md shadow-[#00BFA5]/20 transition-transform duration-300 group-hover:rotate-12">
            <Compass className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-[#111111] transition-colors duration-200 group-hover:text-[#00BFA5]">
            Tripzy
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-white/20 p-1 rounded-full border border-white/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive 
                    ? 'text-[#111111] bg-white shadow-sm' 
                    : 'text-[#666666] hover:text-[#111111] hover:bg-white/40'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110 text-[#00BFA5]' : 'scale-100'}`} />
                <span>{tab.label}</span>
                
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00BFA5] px-1 text-[9px] font-bold text-white shadow-[0_2px_6px_rgba(0,191,165,0.4)] animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-4">
          {/* Quick Search Trigger */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAFA]/50 border border-white/60 hover:bg-[#FAFAFA] hover:border-white/90 text-sm text-[#666666] hover:text-[#111111] transition-all duration-200 shadow-inner"
          >
            <Search className="w-4 h-4 text-[#00BFA5]" />
            <span className="text-xs">Search escapes...</span>
            <kbd className="hidden lg:inline-flex h-4 items-center gap-1 rounded bg-[#EAEAEA] px-1.5 font-mono text-[9px] text-[#666666]">
              ⌘K
            </kbd>
          </button>

          {/* Luxury Status Badge */}
          <div 
            onClick={() => onTabChange('profile')}
            className="flex items-center gap-2 bg-[#111111] hover:bg-[#00BFA5] text-white pl-3.5 pr-2 py-1.5 rounded-full cursor-pointer transition-all duration-300 group shadow-md"
          >
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00BFA5] group-hover:text-white transition-colors duration-200 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase font-display">Aura Tier</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white/10 group-hover:bg-white group-hover:text-[#111111] transition-all duration-200">
              V
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}
