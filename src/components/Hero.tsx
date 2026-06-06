import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Sparkles, SlidersHorizontal, ArrowRight, Star, MapPin, Anchor, Landmark } from 'lucide-react';
import Interactive3DSpace from './Interactive3DSpace';

interface HeroProps {
  onStartExploringClick: () => void;
  onSearchClick: () => void;
  onQuickCategoryClick: (category: string) => void;
}

const FEATURED_CARDS = [
  {
    id: 'maldives',
    title: 'Amilla Resplendent',
    location: 'Baa Atoll, Maldives',
    rating: '4.95',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    icon: Anchor,
    tag: 'Beach',
    price: '$2,400'
  },
  {
    id: 'alpine',
    title: 'The Glass Chalet',
    location: 'Zermatt, Switzerland',
    rating: '4.98',
    img: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop',
    icon: Compass,
    tag: 'Mountains',
    price: '$3,100'
  }
];

export default function Hero({
  onStartExploringClick,
  onSearchClick,
  onQuickCategoryClick
}: HeroProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Quick rotation index cycle for the 3D preview cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalised mouse coordinates between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Direct cursor offset variables for fluid light-glare overlays
    setMouseX((e.clientX - rect.left));
    setMouseY((e.clientY - rect.top));

    // Map coordinates to maximum degrees of skew/rotation for perspective tilt
    setRotateX(-relativeY * 18); // Tilt up and down on X axis
    setRotateY(relativeX * 18);  // Tilt side to side on Y axis
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA] select-none pt-20 md:pt-12"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Parallax Space Background - Moves inversely to cursor */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out scale-105"
        style={{
          transform: `translate3d(${rotateY * -0.6}px, ${rotateX * -0.6}px, -20px)`,
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop"
          alt="Cinematic background"
          className="w-full h-full object-cover brightness-[0.96] contrast-[1.01]"
        />
        {/* Premium 3D interactive particle network */}
        <Interactive3DSpace />

        {/* Soft, beautiful dark radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 via-[#FAFAFA]/10 to-[#FAFAFA]" />
        
        {/* Cursor tracking ambient glow beacon */}
        <div 
          className="absolute w-[450px] h-[450px] rounded-full blur-[130px] bg-gradient-to-tr from-[#00BFA5]/15 to-teal-200/10 pointer-events-none transition-all duration-300"
          style={{
            left: `${mouseX - 225}px`,
            top: `${mouseY - 225}px`,
            opacity: isHovered ? 0.85 : 0.35,
          }}
        />
      </div>

      {/* Decorative Floating Spheres */}
      <div 
        className="absolute top-1/4 left-10 md:left-24 w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hidden md:block transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${rotateY * 1.5}px, ${rotateX * 1.5}px, 50px) rotate(${rotateY * 2}deg)`,
        }}
      />
      
      <div 
        className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full border border-teal-250/10 bg-[#00BFA5]/5 backdrop-blur-md hidden lg:block transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${rotateY * -2}px, ${rotateX * -2}px, -30px)`,
        }}
      />

      {/* Responsive Grid Coordinate Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Content layout (Grid 7 cols) with 3D entry animation and float depth */}
        <div 
          className="lg:col-span-7 text-center lg:text-left transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${rotateY * 0.4}px, ${rotateX * 0.4}px, 30px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Sparkle high-end label badge with spring hover state */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/70 shadow-sm mb-6 hover:shadow-md transition-all duration-300 transform hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00BFA5] animate-pulse" />
            <span className="text-[10px] font-bold text-[#111111] uppercase tracking-wider font-display shrink-0">
              The New Era of Bespoke 3D Luxury
            </span>
          </motion.div>

          {/* Majestic Header with cinematic perspective drop-shadow */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.06] mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
          >
            Curating Prismatic <br />
            <span className="text-white relative font-extrabold inline-block">
              Adventures
              <span className="absolute bottom-2 left-0 w-full h-[6px] bg-[#00BFA5]/85 rounded-full blur-[1px] hidden md:block" />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-white/95 font-light max-w-xl mx-auto lg:mx-0 drop-shadow-sm mb-9 leading-relaxed font-sans"
          >
            Explore the world’s most pristine private villas, majestic helicopter glacier safaris, and luxury oceanic sanctuaries curated with realistic rates and immersive guides.
          </motion.p>

          {/* Interactive Floating tactile search bar container */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-2xl mx-auto lg:mx-0 p-2 rounded-full bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_24px_55px_rgba(0,0,0,0.12)] mb-8 transition-all hover:shadow-[0_30px_65px_rgba(0,191,165,0.18)] group/search relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Soft inner glow on hover */}
            <div className="absolute inset-0 rounded-full border border-[#00BFA5]/0 group-hover/search:border-[#00BFA5]/25 transition-colors duration-400 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center gap-1.5 justify-between">
              
              {/* Destination trigger */}
              <div 
                onClick={onSearchClick}
                className="flex items-center gap-3.5 px-6 py-3 w-full text-left cursor-pointer hover:bg-white/60 rounded-full transition-all duration-200"
              >
                <Search className="w-5 h-5 text-[#00BFA5] shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-[#111111] leading-none mb-0.5">Where next?</p>
                  <p className="text-[11px] text-[#555] truncate leading-none">Maldives, Switzerland, Alps safari...</p>
                </div>
              </div>

              <div className="hidden sm:block h-7 w-[1px] bg-gray-200/80" />

              {/* Preferences trigger */}
              <div 
                onClick={onSearchClick}
                className="hidden sm:flex items-center gap-3.5 px-6 py-3 w-full text-left cursor-pointer hover:bg-white/60 rounded-full transition-all duration-200"
              >
                <SlidersHorizontal className="w-4.5 h-4.5 text-[#00BFA5] shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#111111] leading-none mb-0.5">Party & Date</p>
                  <p className="text-[11px] text-[#555] leading-none">Guests • Any Timeframe</p>
                </div>
              </div>

              {/* Luxury CTA submit */}
              <button 
                onClick={onSearchClick}
                className="w-full sm:w-auto px-6.5 py-3.5 bg-[#111111] hover:bg-[#00BFA5] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
              >
                <span>Verify Sanctuary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Interactive Aesthetic Escape Tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-xl"
          >
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest mr-1 hidden sm:inline">
              Aesthetic Keys:
            </span>
            <button 
              onClick={() => onQuickCategoryClick('Beach')}
              className="px-3.5 py-1.5 rounded-full bg-white/40 hover:bg-[#00BFA5] hover:text-white border border-white/20 backdrop-blur-md text-[11px] font-medium text-white hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              🏝️ Beach
            </button>
            <button 
              onClick={() => onQuickCategoryClick('Mountains')}
              className="px-3.5 py-1.5 rounded-full bg-white/40 hover:bg-[#00BFA5] hover:text-white border border-white/20 backdrop-blur-md text-[11px] font-medium text-white hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              ⛰️ Mountains
            </button>
            <button 
              onClick={() => onQuickCategoryClick('Adventure')}
              className="px-3.5 py-1.5 rounded-full bg-white/40 hover:bg-[#00BFA5] hover:text-white border border-white/20 backdrop-blur-md text-[11px] font-medium text-white hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              🦁 Wildlife
            </button>
            <button 
              onClick={() => onQuickCategoryClick('Cultural')}
              className="px-3.5 py-1.5 rounded-full bg-white/40 hover:bg-[#00BFA5] hover:text-white border border-white/20 backdrop-blur-md text-[11px] font-medium text-white hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              ⛩️ Sanctuary
            </button>
          </motion.div>
        </div>

        {/* Right Side 3D Showcase Block (Grid 5 cols) - Overlapping dynamic interactive layout */}
        <div 
          className="lg:col-span-5 h-[340px] md:h-[420px] relative hidden md:block justify-center items-center transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${rotateY * 1.5}px, ${rotateX * 1.5}px, 120px) rotateX(${-rotateX * 0.8}deg) rotateY(${rotateY * 0.8}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Background Ambient Wireframe Overlay */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-72 border border-[#00BFA5]/10 rounded-[35px] border-dashed pointer-events-none transform -rotate-6 z-0" />

          {/* Sliding Showcases with Motion Cards */}
          <div className="relative w-full h-[380px] max-w-[325px] mx-auto z-10" style={{ transformStyle: 'preserve-3d' }}>
            <AnimatePresence mode="wait">
              {FEATURED_CARDS.map((card, idx) => {
                if (idx !== activeCardIndex) return null;
                const IconComp = card.icon;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 35, translateZ: -100 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, translateZ: 0 }}
                    exit={{ opacity: 0, scale: 0.92, rotateY: -35, translateZ: -100 }}
                    transition={{ duration: 0.85, cubicBezier: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 rounded-[32px] overflow-hidden bg-white shadow-[0_22px_50px_rgba(0,0,0,0.12)] border border-white p-4.5 cursor-pointer group flex flex-col justify-between"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Glowing reflective shine layer matching mouse tracking coordinate */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" 
                      style={{
                        background: `radial-gradient(circle at ${(rotateY + 18) * 2.7}% ${(rotateX + 18) * 2.7}%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`
                      }}
                    />

                    {/* Image Box */}
                    <div className="relative h-[220px] rounded-2xl overflow-hidden bg-neutral-100">
                      <img 
                        src={card.img} 
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      
                      {/* Top rating badge floated high z */}
                      <div className="absolute top-3 left-3 flex gap-1 items-center px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/15 rounded-full text-white text-[10px] font-bold">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>{card.rating}</span>
                      </div>

                      {/* Hot luxury floating category sticker */}
                      <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-white/20 backdrop-blur-sm border border-white/25 rounded-full text-white font-mono text-[9px] uppercase tracking-wider">
                        Luxury {card.tag}
                      </span>
                    </div>

                    {/* Bottom details with pure 3D translate effect */}
                    <div 
                      className="pt-2 flex-1 flex flex-col justify-between"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <div>
                        {/* Location */}
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#00BFA5] font-bold font-display">
                          <MapPin className="w-3 h-3 text-[#00BFA5] shrink-0" />
                          <span>{card.location}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-black text-base text-[#111111] leading-tight mt-1.5 line-clamp-1 group-hover:text-[#00BFA5] transition-colors">
                          {card.title}
                        </h3>
                      </div>

                      {/* Launch indicator overlay with action trigger */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100/60 text-[#00BFA5] shrink-0">
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[9px] text-gray-400 block font-light leading-none">Luxury Bracket</span>
                            <span className="text-xs font-bold text-gray-800 block mt-0.5 font-display">{card.price}</span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#00BFA5] flex items-center gap-0.5">
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Overlapping Background Offset luxury visual card layer to look stacked */}
            <div className="absolute inset-0 bg-[#FAFAFA]/70 border border-gray-150 rounded-[32px] transform translate-x-4.5 translate-y-4.5 scale-95 shadow-md -z-10 pointer-events-none transition-transform duration-700 hover:scale-98" />
            <div className="absolute inset-0 bg-[#FAFAFA]/40 border border-gray-200 rounded-[32px] transform translate-x-9 translate-y-9 scale-90 -z-20 pointer-events-none" />
          </div>

          {/* Staggered progress dot indicator coordinates */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {FEATURED_CARDS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveCardIndex(i)}
                className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                  i === activeCardIndex ? 'bg-[#00BFA5] w-8' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Decorative Elegant Soft Gradient Over Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />

    </div>
  );
}
