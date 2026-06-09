import { useRef } from 'react';
import { motion } from 'motion/react';
import { Star, Clock, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin } from 'lucide-react';
import { Tour } from '../types';
import { formatINR } from '../utils/currency';

interface NetflixCategoryRowsProps {
  tours: Tour[];
  onTourSelect: (tour: Tour) => void;
  onToggleWishlist: (tourId: string) => void;
  wishlistIds: string[];
  onCategoryClick?: (category: string) => void;
}

export default function NetflixCategoryRows({
  tours,
  onTourSelect,
  onToggleWishlist,
  wishlistIds,
  onCategoryClick
}: NetflixCategoryRowsProps) {
  
  // Categorize our gorgeous tour data
  const trendingTours = tours.filter(t => t.category === 'trending');
  const popularTours = tours.filter(t => t.category === 'popular');
  const weekendTours = tours.filter(t => t.category === 'weekend');
  const internationalTours = tours.filter(t => t.category === 'international');

  const categories = [
    { title: 'Trending Escapes', subtitle: 'Highly sought experiences this month', data: trendingTours },
    { title: 'Popular Destinations', subtitle: 'Timeless favorites favored by global travelers', data: popularTours },
    { title: 'Weekend Getaways', subtitle: 'Quick premium detox spots around the corner', data: weekendTours },
    { title: 'International Wonders', subtitle: 'Breathtaking global expeditions beyond borders', data: internationalTours }
  ];

  const exploreCategories = [
    { label: 'Beach', tag: 'Beach', emoji: '🏖️' },
    { label: 'Mountain', tag: 'Mountains', emoji: '⛰️' },
    { label: 'Adventure', tag: 'Adventure', emoji: '⛺' },
    { label: 'Culture', tag: 'Cultural', emoji: '🏛️' },
    { label: 'Luxury', tag: 'Luxury', emoji: '💎' },
  ];

  return (
    <div className="py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-16 select-none bg-[#FAFAFA]">
      {categories.map((cat, idx) => {
        if (cat.data.length === 0) return null;
        return (
          <CategoryRow
            key={idx}
            title={cat.title}
            subtitle={cat.subtitle}
            tours={cat.data}
            onTourSelect={onTourSelect}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
          />
        );
      })}

      {/* Explore by Category section with Frosted Glass cards */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pt-4"
      >
        <div className="flex justify-between items-end mb-6 px-1">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
              Explore by Category
            </h2>
            <p className="text-xs md:text-sm text-[#666666] font-light mt-1">
              Filter and find curated premium excursions matching your exact dream theme
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {exploreCategories.map((ecat, index) => (
            <div
              key={index}
              onClick={() => onCategoryClick?.(ecat.tag)}
              className="h-20 bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center gap-3 shadow-md hover:border-[#00BFA5]/50 hover:bg-white/60 transition-all duration-350 cursor-pointer hover:scale-[1.03] active:scale-95 group"
            >
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 select-none">
                {ecat.emoji}
              </span>
              <span className="font-display font-bold text-sm text-[#111111]/90 group-hover:text-[#00BFA5]">
                {ecat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* Single Horizontal Shelf with Scroll buttons */
interface CategoryRowProps {
  key?: number | string;
  title: string;
  subtitle: string;
  tours: Tour[];
  onTourSelect: (tour: Tour) => void;
  onToggleWishlist: (tourId: string) => void;
  wishlistIds: string[];
}

function CategoryRow({
  title,
  subtitle,
  tours,
  onTourSelect,
  onToggleWishlist,
  wishlistIds
}: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group/row"
    >
      <div className="flex items-end justify-between mb-5 px-1">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
            {title}
          </h2>
          <p className="text-xs md:text-sm text-[#666666] font-light mt-1">
            {subtitle}
          </p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full bg-white border border-gray-100 hover:border-[#00BFA5] flex items-center justify-center text-[#111111] hover:text-[#00BFA5] shadow-sm transition-all duration-200 cursor-pointer active:scale-90"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full bg-white border border-gray-100 hover:border-[#00BFA5] flex items-center justify-center text-[#111111] hover:text-[#00BFA5] shadow-sm transition-all duration-200 cursor-pointer active:scale-90"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Cards Shelter */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 scroll-smooth no-scrollbar snap-x snap-mandatory"
      >
        {tours.map((tour) => {
          const isWishlisted = wishlistIds.includes(tour.id);
          return (
            <div 
              key={tour.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start"
            >
              <div 
                onClick={() => onTourSelect(tour)}
                className="relative h-[340px] rounded-[30px] overflow-hidden bg-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-400 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(0,191,165,0.12)] cursor-pointer group/card"
              >
                {/* Background Image */}
                <img 
                  src={tour.bannerImage} 
                  alt={tour.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                />
                
                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10 transition-opacity duration-300" />
                
                {/* Wishlist triggers (absolute top-4 right-4 z-20) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(tour.id);
                  }}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border backdrop-blur-md cursor-pointer z-20 ${
                    isWishlisted 
                      ? 'bg-[#00BFA5] border-[#00BFA5] text-white shadow-md' 
                      : 'bg-white/85 border-white/60 text-gray-600 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4.5 h-4.5 transition-transform duration-300 ${isWishlisted ? 'scale-110 fill-current' : 'scale-100'}`} />
                </button>

                {/* Top Difficulty Tag (absolute top-4 left-4 z-20) */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold text-white uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#00BFA5]" />
                    <span>{tour.difficulty}</span>
                  </span>
                </div>

                {/* Rating indicator (absolute top-14 left-4 z-20) */}
                <div className="absolute top-14 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs z-20 border border-white/10">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{tour.rating}</span>
                </div>

                {/* Bottom details Overlay block (absolute bottom-0 inset-x-0 p-6 z-20 text-white) */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-20 text-white flex flex-col justify-end">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#00BFA5] flex items-center gap-1 mb-1 font-display">
                    <MapPin className="w-3.5 h-3.5 text-[#00BFA5] shrink-0" />
                    <span>{tour.location}</span>
                  </p>
                  
                  <h3 className="font-display text-lg font-bold leading-snug group-hover/card:text-[#00BFA5] transition-colors duration-200">
                    {tour.title}
                  </h3>
                  
                  <p className="text-[11px] text-gray-300 font-light mt-1.5 line-clamp-1 leading-normal">
                    {tour.subtitle}
                  </p>
                  
                  <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between animate-[fadeIn_0.5s_ease-out]">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold block">Starting from</span>
                      <span className="text-base font-bold text-white font-display">
                        {formatINR(tour.price)}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[11px] text-gray-300 justify-end font-light">
                        <Clock className="w-3.5 h-3.5 text-[#00BFA5]" />
                        <span>{tour.duration.split(',')[0]}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 font-light mt-0.5">{tour.groupSize}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
