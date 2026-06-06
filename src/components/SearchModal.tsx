import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Search, X, Star, Clock, MapPin, Compass, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { Tour } from '../types';
import { formatINR } from '../utils/currency';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tours: Tour[];
  onSelectTour: (tour: Tour) => void;
}

const LUXURY_QUICK_TAGS = [
  { label: '#OverwaterVilla', query: 'Maldives', emoji: '🏝️' },
  { label: '#Safari', query: 'Kenya', emoji: '🦁' },
  { label: '#AlpineLuxury', query: 'Switzerland', emoji: '🏔️' },
  { label: '#WellnessRyokan', query: 'Kyoto', emoji: '🏯' },
  { label: '#MichelinDining', query: 'dine', emoji: '🍽️' },
  { label: '#PrivateYacht', query: 'Amalfi', emoji: '🛥️' }
];

export default function SearchModal({
  isOpen,
  onClose,
  tours,
  onSelectTour
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle keyboard shortcut (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Simulate predictive network lookup/filtering whenever query or tag changes
  useEffect(() => {
    if (query || selectedTag) {
      setIsFiltering(true);
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
      filterTimeoutRef.current = setTimeout(() => {
        setIsFiltering(false);
      }, 450); // Premium delay to highlight the glowing skeleton filters
    } else {
      setIsFiltering(false);
    }

    return () => {
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    };
  }, [query, selectedTag]);

  // Combined selector matching either text input or selected quick-tag
  const matchedTours = useMemo(() => {
    const activeTerm = selectedTag 
      ? selectedTag.toLowerCase() 
      : query.toLowerCase().trim();

    if (activeTerm === '') {
      return tours.slice(0, 3); // Curated popular suggestions by default
    }

    return tours.filter(t => 
      t.title.toLowerCase().includes(activeTerm) ||
      t.location.toLowerCase().includes(activeTerm) ||
      t.subtitle.toLowerCase().includes(activeTerm) ||
      t.description.toLowerCase().includes(activeTerm) ||
      t.tags.some(tag => tag.toLowerCase().includes(activeTerm))
    );
  }, [query, selectedTag, tours]);

  const handleTagClick = (tagLabel: string, searchQuery: string) => {
    if (selectedTag === searchQuery) {
      // Toggle off
      setSelectedTag(null);
      setQuery('');
    } else {
      setSelectedTag(searchQuery);
      setQuery(tagLabel); // Update text field to show what's currently active
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (selectedTag) {
      setSelectedTag(null); // Clear selected luxury tag if user types manually
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 select-none">
      {/* Premium Backdrop blur with modern color tint */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/45 backdrop-blur-md transition-opacity duration-300 animate-[fadeIn_0.2s_ease-out]"
      />

      {/* Main Glass Dialog container */}
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/60 p-6 md:p-7 rounded-[32px] shadow-[0_24px_70px_rgba(0,191,165,0.12)] relative z-10 animate-[scaleUp_0.3s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
        
        {/* Glowing top line decorator */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-200 via-[#00BFA5] to-teal-150 opacity-80" />

        {/* Header Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100">
              <Compass className="w-4 h-4 text-[#00BFA5] animate-spin-slow" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-[#111111] block">
                Aura Predictive Terminal
              </span>
              <span className="text-[10px] text-[#666666] font-light block leading-none">
                Predictive AI-filtered luxury search
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100 hover:border-red-200 text-gray-500 hover:text-red-500 hover:bg-rose-50 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Glowing Input search box */}
        <div className="relative group/input">
          <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BFA5] transition-transform duration-300 group-focus-within/input:scale-110" />
          <input 
            type="text"
            autoFocus
            placeholder="Search by destination, tag or luxury theme..."
            value={query}
            onChange={handleInputChange}
            className="w-full pl-12 pr-12 py-4.5 bg-[#FAFAFA] text-[#111111] focus:bg-white text-base rounded-2xl border border-gray-100 focus:border-[#00BFA5]/60 outline-none focus:ring-4 focus:ring-[#00BFA5]/10 font-sans transition-all duration-300 font-medium placeholder:text-gray-400 placeholder:font-light"
          />
          {query.trim() !== '' && (
            <button 
              onClick={() => { setQuery(''); setSelectedTag(null); }}
              className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-light text-xs bg-gray-200/50 hover:bg-gray-200 px-2 py-0.5 rounded-md transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Curated Luxury Quick-Tags container */}
        <div className="mt-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#00BFA5]" />
            <span>Luxury Hot Tags</span>
          </p>
          <div className="flex flex-wrap gap-2 max-h-[110px] overflow-y-auto no-scrollbar py-0.5">
            {LUXURY_QUICK_TAGS.map((tagObj, idx) => {
              const isActive = selectedTag === tagObj.query || query === tagObj.label;
              return (
                <button
                  key={idx}
                  onClick={() => handleTagClick(tagObj.label, tagObj.query)}
                  className={`px-3 py-1.5 rounded-full text-xs font-display font-medium flex items-center gap-1.5 transition-all duration-300 select-none cursor-pointer border ${
                    isActive
                      ? 'bg-[#00BFA5] text-white border-[#00BFA5] shadow-sm transform scale-102 hover:bg-[#00A58F]'
                      : 'bg-white/60 border-gray-100 hover:border-teal-200 hover:bg-teal-50/40 text-gray-700 hover:text-[#00BFA5]'
                  }`}
                >
                  <span className="text-sm">{tagObj.emoji}</span>
                  <span>{tagObj.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Window */}
        <div className="mt-6 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 font-display">
              {query.trim() === '' ? 'Bespoke Curated Showcase' : `Interactive Matches (${matchedTours.length})`}
            </h3>
            {isFiltering && (
              <span className="text-[9px] font-display font-bold text-[#00BFA5] animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA5] block" />
                Refining results...
              </span>
            )}
          </div>

          <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1 no-scrollbar min-h-[160px] flex flex-col justify-start">
            {isFiltering ? (
              // Premium Glowing Skeletons Screen while loading
              <div className="space-y-2.5 w-full animate-[fadeIn_0.2s_ease-out]">
                {[1, 2, 3].map((num) => (
                  <div 
                    key={num}
                    className="flex gap-4 p-3.5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.01)] items-center animate-pulse"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gray-100 shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/4 bg-gray-200 rounded" />
                      <div className="h-4.5 w-3/4 bg-gray-200 rounded" />
                      <div className="h-3 w-1/2 bg-gray-150 rounded" />
                    </div>
                    <div className="w-20 text-right space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded ml-auto" />
                      <div className="h-2.5 w-2/3 bg-gray-150 rounded ml-auto animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : matchedTours.length > 0 ? (
              // Actual Filtered Results list
              matchedTours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => {
                    onSelectTour(tour);
                    onClose();
                  }}
                  className="flex gap-4 p-3 rounded-2.5xl hover:bg-[#FAFAFA] border border-transparent hover:border-gray-100/80 items-center cursor-pointer group transition-all duration-350"
                >
                  {/* Tour mini thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0 relative shadow-sm border border-gray-100">
                    <img 
                      src={tour.bannerImage} 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Info layout */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-[#00BFA5] tracking-widest uppercase flex items-center gap-0.5 font-display">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{tour.location}</span>
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[10px] text-gray-400 font-light">{tour.duration.split(',')[0]}</span>
                    </div>

                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#111111] truncate group-hover:text-[#00BFA5] transition-colors leading-normal mt-1">
                      {tour.title}
                    </h4>

                    <p className="text-[10px] sm:text-xs text-gray-400 font-light truncate">
                      {tour.subtitle}
                    </p>
                  </div>

                  {/* Price info tag */}
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-[#111111] font-display">{formatINR(tour.price)}</p>
                    <p className="text-[9px] text-[#00BFA5] font-light leading-none mt-0.5 font-semibold uppercase flex items-center justify-end gap-0.5">
                      <span>Reserve</span>
                      <ChevronRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Empty search terminal display
              <div className="py-8 text-center bg-gray-50/40 border border-dashed border-gray-100 rounded-3xl animate-[fadeIn_0.3s_ease-out]">
                <p className="text-sm text-[#666666] font-semibold">No bespoke matches found</p>
                <p className="text-xs text-gray-400 font-light max-w-sm mx-auto mt-1 px-4 leading-relaxed">
                  We did not find any matches for "{query}". You can try searching for <strong className="text-gray-500 font-medium">Greece</strong>, <strong className="text-gray-500 font-medium">Maldives</strong>, <strong className="text-gray-500 font-medium">Switzerland</strong>, or tap on a hot tag above.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Elevated footer layout */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-light">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00BFA5]" />
            <span>Search optimized dynamic results</span>
          </span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-[9px] font-mono">ESC</span>
        </div>

      </div>
    </div>
  );
}
