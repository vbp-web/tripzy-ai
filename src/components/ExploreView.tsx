import { useState, useMemo } from 'react';
import { 
  Search, Star, Clock, Heart, Sparkles, MapPin, SlidersHorizontal,
  Waves, Mountain, Flame, Trees, BookOpen, Compass
} from 'lucide-react';
import { Tour } from '../types';
import { CATEGORY_CHIPS } from '../data';
import { formatINR } from '../utils/currency';

interface ExploreViewProps {
  tours: Tour[];
  onTourSelect: (tour: Tour) => void;
  onToggleWishlist: (tourId: string) => void;
  wishlistIds: string[];
  initialCategoryFilter?: string; // pass from quick-links
}

// Icon helper to map strings safely
function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#00BFA5]" />;
    case 'Waves': return <Waves className="w-4 h-4 text-[#00BFA5]" />;
    case 'Mountain': return <Mountain className="w-4 h-4 text-[#00BFA5]" />;
    case 'Flame': return <Flame className="w-4 h-4 text-[#00BFA5]" />;
    case 'Trees': return <Trees className="w-4 h-4 text-[#00BFA5]" />;
    case 'BookOpen': return <BookOpen className="w-4 h-4 text-[#00BFA5]" />;
    default: return <Compass className="w-4 h-4 text-[#00BFA5]" />;
  }
}

export default function ExploreView({
  tours,
  onTourSelect,
  onToggleWishlist,
  wishlistIds,
  initialCategoryFilter = 'all'
}: ExploreViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>(initialCategoryFilter);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter tours dynamically with deep searching
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // 1. Tag or Category Filter
      let matchesTag = true;
      if (selectedTag !== 'all') {
        matchesTag = tour.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());
      }

      // 2. Search Text
      let matchesSearch = true;
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        matchesSearch = 
          tour.title.toLowerCase().includes(term) ||
          tour.location.toLowerCase().includes(term) ||
          tour.subtitle.toLowerCase().includes(term) ||
          tour.tags.some(tag => tag.toLowerCase().includes(term)) ||
          tour.difficulty.toLowerCase().includes(term);
      }

      // 3. Difficulty selection
      let matchesDifficulty = true;
      if (difficultyFilter !== 'all') {
        matchesDifficulty = tour.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      }

      return matchesTag && matchesSearch && matchesDifficulty;
    });
  }, [tours, searchTerm, selectedTag, difficultyFilter]);

  return (
    <div className="pt-24 pb-32 px-4 sm:px-8 max-w-7xl mx-auto select-none bg-[#FAFAFA]">
      
      {/* Editorial Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto pt-6">
        <span className="px-3 py-1 bg-[#00BFA5]/10 text-xs font-semibold text-[#00BFA5] uppercase tracking-wider rounded-full mb-3 inline-block">
          Explore Absolute Freedom
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111111]">
          Find Your Sanctuary
        </h1>
        <p className="text-gray-500 font-light mt-2 text-sm sm:text-base leading-relaxed">
          Filter through pristine private coral islands, luxury deep-mountain hideouts, and high-altitude alpine charters.
        </p>
      </div>

      {/* Control Station (Search + Filters Expand) */}
      <div className="bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-gray-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Main search Input field */}
          <div className="relative flex-1">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#00BFA5]" />
            <input 
              type="text"
              placeholder="Search by Maldives lagoon, Kyoto gardens, Alps chalet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 focus:bg-white text-sm text-[#111111] rounded-2xl outline-none focus:ring-1.5 focus:ring-[#00BFA5]/20 border border-gray-100 transition-all placeholder:text-gray-400 font-sans"
            />
          </div>

          {/* Filters togglers */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3.5 rounded-2xl border text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
                showFilters || difficultyFilter !== 'all'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white border-gray-100 text-[#666666] hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Refine View</span>
            </button>
            
            {searchTerm || selectedTag !== 'all' || difficultyFilter !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('all');
                  setDifficultyFilter('all');
                }}
                className="px-4.5 py-3.5 text-xs text-rose-500 hover:text-rose-600 bg-white border border-rose-100 hover:bg-rose-50 font-bold rounded-2xl active:scale-95 cursor-pointer"
              >
                Clear all
              </button>
            ) : null}
          </div>
        </div>

        {/* Expandable detailed Filters drawer */}
        {showFilters && (
          <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 flex flex-wrap gap-4 items-center">
            <span className="text-xs font-semibold text-[#666666] uppercase tracking-wider">
              Filter by Difficulty:
            </span>
            <div className="flex gap-2">
              {['all', 'Easy', 'Moderate', 'Challenging'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                    difficultyFilter === diff
                      ? 'bg-[#00BFA5] border-[#00BFA5] text-white'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {diff === 'all' ? 'All Difficulties' : diff}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories Chips list */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 no-scrollbar border-t border-gray-100/50 pt-3">
          {CATEGORY_CHIPS.map((chip) => {
            const isSelected = selectedTag === chip.id;
            const icon = getCategoryIcon(chip.icon);
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedTag(chip.id)}
                className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-95 ${
                  isSelected 
                    ? 'bg-[#00BFA5] text-white shadow-md shadow-[#00BFA5]/15 font-semibold' 
                    : 'bg-white hover:bg-gray-50 border border-gray-100 text-[#666666]'
                }`}
              >
                {icon}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid displays */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-[fadeIn_0.5s_ease-out]">
          {filteredTours.map((tour) => {
            const isWishlisted = wishlistIds.includes(tour.id);
            return (
              <div 
                key={tour.id}
                onClick={() => onTourSelect(tour)}
                className="group relative h-[360px] rounded-[30px] overflow-hidden bg-gray-100 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(0,191,165,0.1)] hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between cursor-pointer group/card"
              >
                {/* Background Image */}
                <img 
                  src={tour.bannerImage} 
                  alt={tour.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  loading="lazy"
                />
                
                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10 transition-opacity duration-300" />
                
                {/* Wishlist Hearts */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(tour.id);
                  }}
                  className={`absolute top-4 right-4 w-9 h-9 border backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all z-20 ${
                    isWishlisted 
                      ? 'bg-[#00BFA5] text-white border-[#00BFA5] shadow-sm' 
                      : 'bg-white/80 hover:bg-white text-gray-600 border-white/50 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Rating Bubble */}
                <div className="absolute top-14 left-4 bg-black/45 backdrop-blur-md text-white rounded-full px-2.5 py-1 text-[11px] font-bold flex items-center gap-1 z-20 border border-white/10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{tour.rating}</span>
                </div>

                {/* Difficulty corner tag */}
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/20 backdrop-blur-md text-[9px] font-bold rounded-full text-white border border-white/30 tracking-wider uppercase z-20 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#00BFA5]" />
                  <span>{tour.difficulty}</span>
                </div>

                {/* Info block layered absolutely at the bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5.5 z-20 text-white flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-[#00BFA5] uppercase tracking-widest block font-display mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00BFA5] shrink-0" />
                    <span>{tour.location}</span>
                  </span>
                  
                  <h3 className="font-display text-base font-bold transition-colors group-hover/card:text-[#00BFA5]">
                    {tour.title}
                  </h3>
                  
                  <p className="text-[11px] text-gray-300 leading-relaxed mt-1 line-clamp-1 font-light">
                    {tour.subtitle}
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold leading-none mb-1 block">Starting from</span>
                      <span className="text-base font-extrabold text-white font-display">
                        {formatINR(tour.price)}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-200 flex items-center gap-1 font-light justify-end">
                        <Clock className="w-3.5 h-3.5 text-[#00BFA5]" />
                        <span>{tour.duration.split(',')[0]}</span>
                      </p>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5 leading-none">{tour.groupSize}</p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 max-w-lg mx-auto">
          <Compass className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-pulse" />
          <h3 className="font-display text-lg font-bold text-[#111111]">No escapes found</h3>
          <p className="text-xs text-gray-400 font-light mt-1 max-w-xs mx-auto">
            Try adjusting your key terms or changing the luxury category filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedTag('all');
              setDifficultyFilter('all');
            }}
            className="mt-6 px-5 py-2.5 bg-[#00BFA5] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#111111] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
