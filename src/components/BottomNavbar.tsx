import { Compass, Map, Heart, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavbarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  wishlistCount: number;
  bookingsCount: number;
}

export default function BottomNavbar({
  currentTab,
  onTabChange,
  wishlistCount,
  bookingsCount
}: BottomNavbarProps) {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Compass },
    { id: 'explore' as TabType, label: 'Explore', icon: Map },
    { id: 'trips' as TabType, label: 'Trips', icon: Heart, badge: wishlistCount + bookingsCount },
    { id: 'profile' as TabType, label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md md:hidden select-none">
      <div className="glass-liquid flex items-center justify-around py-3 px-5 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/50 backdrop-blur-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative py-2 px-3.5 flex flex-col items-center justify-center transition-all duration-300 rounded-2xl active:scale-95"
            >
              {/* Highlight background pill */}
              <div 
                className={`absolute inset-0 rounded-2xl bg-[#00BFA5]/10 -z-10 transition-all duration-300 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`} 
              />
              
              <Icon 
                className={`w-5.5 h-5.5 transition-transform duration-300 ${
                  isActive 
                    ? 'text-[#00BFA5] scale-115 stroke-[2.2]' 
                    : 'text-[#666666] hover:text-[#111111] scale-100'
                }`} 
              />
              
              <span 
                className={`text-[10px] font-medium mt-1 font-sans transition-all duration-300 ${
                  isActive ? 'text-[#111111] opacity-100 font-semibold' : 'text-[#666666] opacity-80'
                }`}
              >
                {tab.label}
              </span>

              {/* Red Badge bubble for notifications / lists */}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute top-1 right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00BFA5] px-1 text-[8px] font-bold text-white ring-2 ring-white shadow">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
