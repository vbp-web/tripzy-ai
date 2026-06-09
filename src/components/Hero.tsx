import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  MapPin, 
  Compass, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  X,
  Shield,
  HelpCircle,
  Globe,
  DollarSign
} from 'lucide-react';
import { TOURS_DATA } from '../data';
import { Tour } from '../types';
import Interactive3DSpace from './Interactive3DSpace';

interface HeroProps {
  onStartExploringClick: () => void;
  onSearchClick: () => void;
  onQuickCategoryClick: (category: string) => void;
  onSelectTour?: (tour: Tour) => void; // Optional premium callback to view details directly
}

export default function Hero({
  onStartExploringClick,
  onSearchClick,
  onQuickCategoryClick,
  onSelectTour
}: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Mouse coordinates for absolute glow tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Continuous rotation angle in radians (initially centered on card index 2)
  const initialRotation = -2 * ((2 * Math.PI) / TOURS_DATA.length);
  const [rotationAngle, setRotationAngle] = useState(initialRotation);

  // Gesture dragging state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(initialRotation);
  const lastWheelTimeRef = useRef(0);

  // Demo Modal state
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  // Check mobile sizing for responsive orbit size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic rotatability - 4 seconds intervals
  useEffect(() => {
    if (isDragging) return; // Pause auto-rotation while drawing
    const timer = setInterval(() => {
      const stepSize = (2 * Math.PI) / TOURS_DATA.length;
      setRotationAngle((prev) => prev - stepSize);
    }, 4000);
    return () => clearInterval(timer);
  }, [isDragging]);

  // Handle pointer down
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = rotationAngle;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Handle pointer move for drag rotation
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diffX = currentX - dragStartXRef.current;
    
    // Scale drag pixels into orbital angle radians (e.g. 500px = one full 360 degree spin)
    const radiansPerPixel = (2 * Math.PI) / 500;
    setRotationAngle(dragStartAngleRef.current + diffX * radiansPerPixel);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const stepSize = (2 * Math.PI) / TOURS_DATA.length;
    // Calculate the nearest step based on the continuous floating angle
    const snappedAngle = Math.round(rotationAngle / stepSize) * stepSize;
    setRotationAngle(snappedAngle);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Mouse wheel dial controls to rotate the carousel
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 15) return;
    
    const now = Date.now();
    // Throttle wheel scroll actions to allow clean discrete updates
    if (now - lastWheelTimeRef.current < 280) return;
    lastWheelTimeRef.current = now;

    const stepSize = (2 * Math.PI) / TOURS_DATA.length;
    if (e.deltaY > 0) {
      setRotationAngle((prev) => prev - stepSize);
    } else {
      setRotationAngle((prev) => prev + stepSize);
    }
  };

  // Derive active discrete index from current float rotation angle
  const stepSize = (2 * Math.PI) / TOURS_DATA.length;
  const activeIndex = (Math.round(-rotationAngle / stepSize) % TOURS_DATA.length + TOURS_DATA.length) % TOURS_DATA.length;

  // Calculate precise orbital position angle for each card
  const getOrbitAngle = (index: number) => {
    return (index * stepSize) + rotationAngle;
  };

  // Click on surrounding map to rotate
  const handleCardClick = (idx: number) => {
    const currentActiveIdx = activeIndex;
    let diff = idx - currentActiveIdx;
    const len = TOURS_DATA.length;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;

    setRotationAngle((prev) => prev - diff * stepSize);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 text-white select-none pt-24 md:pt-16 pb-12"
      style={{ perspective: '1500px' }}
    >
      {/* Dark Cinematic Backplate with deep organic colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#091514] via-neutral-950 to-neutral-950 opacity-95" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
        
        {/* Dynamic Canvas Particles system */}
        <Interactive3DSpace />

        {/* Ambient Cursor follow spotlight beacon */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] bg-[#00BFA5]/8 pointer-events-none transition-all duration-300"
          style={{
            left: `${mousePos.x - 250}px`,
            top: `${mousePos.y - 250}px`,
          }}
        />

        {/* Diagonal aesthetic laser grid glow */}
        <div className="absolute top-1/4 left-1/3 w-[800px] h-[3px] bg-gradient-to-r from-transparent via-[#00BFA5]/20 to-transparent rotate-12 blur-[2px] pointer-events-none" />
      </div>

      {/* Grid framework */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side Content Column (Spans 6 cols) */}
        <div className="lg:col-span-6 text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
          
          {/* Sparkly luxury label */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] mb-6 hover:border-teal-400/30 transition-all duration-300 transform"
          >
            <span className="w-2 h-2 rounded-full bg-[#00BFA5] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#00BFA5]" />
            <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest font-display shrink-0">
              Tripzy AI Concierge 2.0
            </span>
          </motion.div>

          {/* Majestic Header with perspective text shadow */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-[66px] font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-left"
          >
            Travel Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA5] via-teal-300 to-white relative inline-block">
              Boundaries
            </span>
          </motion.h1>

          {/* Subheadline description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-350 font-light max-w-xl text-left drop-shadow-sm mb-10 leading-relaxed font-sans"
          >
            AI-powered trip planning that creates personalized journeys in seconds. Curate pristine private villas, majestic helicopter mountain expeditions, and tropical waters.
          </motion.p>

          {/* Luxury action CTAs with hover physics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={onSearchClick}
              className="w-full sm:w-auto px-8 py-4.5 bg-[#00BFA5] hover:bg-teal-400 text-neutral-950 font-display font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_12px_40px_-8px_rgba(0,191,165,0.45)] hover:shadow-[0_16px_50px_rgba(0,191,165,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-97 cursor-pointer"
            >
              <Compass className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Plan My Trip</span>
            </button>

            <button 
              onClick={() => setShowDemoVideo(true)}
              className="w-full sm:w-auto px-7.5 py-4 bg-white/5 hover:bg-white/10 text-white font-display font-medium text-sm rounded-xl border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#00BFA5]/20 flex items-center justify-center text-[#00BFA5]">
                <Play className="w-3 h-3 fill-current" />
              </div>
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Decorative Security Checklist */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 mt-12 text-xs text-neutral-400"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#00BFA5]" />
              <span>Verified Escapes Only</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00BFA5]" />
              <span>Exclusive Member Rates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#00BFA5]" />
              <span>24/7 Premium AI Concierge</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side 3D Circular Orbit Carousel (Spans 6 cols) */}
        <div 
          className="lg:col-span-6 h-[460px] sm:h-[500px] flex items-center justify-center relative w-full select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
          style={{ transformStyle: 'preserve-3d', touchAction: 'none' }}
        >
          {/* Manual Arrow Nav Indicators on Left/Right limits */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setRotationAngle((prev) => prev + stepSize);
            }}
            className="absolute left-0 z-40 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-300" />
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setRotationAngle((prev) => prev - stepSize);
            }}
            className="absolute right-0 z-40 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-neutral-300" />
          </button>

          {/* Circle wireframe guiding grid underlay */}
          <div className="absolute w-[440px] h-[190px] border border-stone-800/25 border-dashed rounded-[50%] pointer-events-none transform -rotate-12 z-0 hidden lg:block" />

          {/* Cards map */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {TOURS_DATA.map((tour, idx) => {
              const theta = getOrbitAngle(idx);
              const isActive = idx === activeIndex;

              // Compute circular parameters
              // Responsive radius fitting perfectly across desktop and mobile screens
              const radiusX = isMobile ? (window.innerWidth < 480 ? 100 : 130) : 230;
              const radiusZ = isMobile ? (window.innerWidth < 480 ? 90 : 110) : 210;

              // Parametric positioning
              const x = Math.sin(theta) * radiusX;
              const z = Math.cos(theta) * radiusZ;
              
              // Slightly curve list to look like an inclined orbit
              const y = -Math.sin(theta) * (isMobile ? 12 : 36);

              // 3D Perspective modifiers - fully continuous high-fidelity curves
              const valZ = Math.cos(theta); // goes from -1 (fully back) to 1 (fully front)
              const scale = 0.7 + (valZ + 1) * 0.125 + Math.pow(Math.max(0, valZ), 4) * 0.2;
              const opacity = 0.25 + (valZ + 1) * 0.225 + Math.pow(Math.max(0, valZ), 3) * 0.3;
              
              // Apple Vision Pro style real-time depth blur
              const blurPercent = Math.max(0, (1 - Math.pow(Math.max(0, valZ), 2)) * 6);
              const shadowOpacity = Math.max(0.05, (valZ + 1) * 0.35);

              return (
                <div
                  key={tour.id}
                  onClick={() => handleCardClick(idx)}
                  className={`absolute w-[200px] h-[310px] md:w-[230px] md:h-[340px] rounded-[24px] select-none text-left flex flex-col justify-between overflow-hidden border cursor-pointer ${
                    isDragging 
                      ? 'transition-none' 
                      : 'transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1)'
                  } ${
                    isActive 
                      ? 'shadow-[0_20px_50px_rgba(0,191,165,0.25)] border-teal-500/40 bg-neutral-900/90' 
                      : 'border-white/5 bg-neutral-950/75'
                  }`}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                    zIndex: Math.round((valZ + 1) * 15),
                    opacity: opacity,
                    filter: `blur(${blurPercent}px)`,
                    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`,
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative h-1/2 w-full bg-neutral-900 overflow-hidden">
                    {/* Dark gradient shadow on top of images */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />

                    <img 
                      src={tour.bannerImage} 
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      style={{
                        transform: hoveredCard === idx ? 'scale(1.1)' : 'scale(1)',
                      }}
                    />

                    {/* Floating Luxury Star Rating Label Badge */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white flex items-center gap-1 z-20">
                      <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                      <span>{tour.rating}</span>
                    </div>

                    {/* Quick Location Capsule */}
                    <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1 font-display text-[9px] uppercase tracking-wider text-[#00BFA5] font-bold">
                      <MapPin className="w-2.5 h-2.5 stroke-[2.5]" />
                      <span className="truncate max-w-[150px]">{tour.location.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Body Glass Details */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between bg-neutral-950/80" style={{ transform: 'translateZ(15px)' }}>
                    <div>
                      <h3 className="font-display font-bold text-xs md:text-sm text-white line-clamp-2 leading-snug">
                        {tour.title}
                      </h3>
                      <p className="text-[10px] text-neutral-400 font-light mt-1 line-clamp-2 leading-relaxed">
                        {tour.subtitle}
                      </p>
                    </div>

                    {/* Price and Explore Button layout */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1.5">
                      <div>
                        <span className="text-[9px] text-neutral-500 uppercase font-light tracking-wide block">Starts</span>
                        <span className="text-xs md:text-sm font-bold text-teal-300 font-display">
                          ${tour.price}
                        </span>
                      </div>

                      {/* Small Explore Button triggers parent detail toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectTour) {
                            onSelectTour(tour);
                          } else {
                            onStartExploringClick();
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1 ${
                          isActive 
                            ? 'bg-[#00BFA5] text-neutral-950 hover:bg-teal-400' 
                            : 'bg-white/5 text-white hover:bg-white/10 hover:text-[#00BFA5]'
                        }`}
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Staggered progress dot indicator coordinates */}
          <div className="absolute bottom-0 flex gap-2 z-30">
            {TOURS_DATA.map((_, i) => (
              <button 
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-[#00BFA5] w-6' : 'bg-neutral-800 w-2 hover:bg-neutral-600'
                }`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* WATCH DEMO POPUP MODAL (Apple Vision Cinematic Player mockup) */}
      <AnimatePresence>
        {showDemoVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#00BFA5]/10 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#00BFA5]" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm tracking-tight text-white block">
                      Tripzy AI Virtual Walkthrough
                    </span>
                    <span className="text-[10px] text-neutral-450 font-light block leading-none">
                      Generative custom scheduling preview
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowDemoVideo(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mock Player Screen area */}
              <div className="relative aspect-video bg-black flex flex-col justify-between p-6">
                
                {/* Visual Video Content */}
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop" 
                  alt="Video teaser" 
                  className="absolute inset-0 w-full h-full object-cover brightness-40 saturate-50"
                />

                {/* Simulated UI showing how AI generates trip itineraries in seconds */}
                <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
                  {/* Top overlay */}
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 bg-black/60 rounded-full text-[10px] text-teal-300 font-mono tracking-wider flex items-center gap-1.5 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      <span>SIMULATION PREVIEW</span>
                    </div>

                    <div className="text-[10px] text-neutral-400">
                      0:28 / 1:45
                    </div>
                  </div>

                  {/* Center AI Typing generation simulation card */}
                  <div className="max-w-md mx-auto w-full bg-neutral-950/75 backdrop-blur-md rounded-2xl border border-teal-500/30 p-4 shadow-xl space-y-3 transform scale-95 sm:scale-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#00BFA5] font-bold font-display">⚡ Tripzy AI Prompt Input</span>
                      <span className="px-2 py-0.5 bg-neutral-900 border border-white/10 rounded text-[9px] text-teal-300 font-mono">READY</span>
                    </div>
                    <p className="text-xs italic text-neutral-300 font-light font-display">
                      "Organize a private helicopter tour over Swiss mountain peaks, check into a panoramic chalet with an open hot spring, ending with wine cellars..."
                    </p>
                    <div className="space-y-1.5 border-t border-white/5 pt-2">
                      <span className="text-[9px] text-[#00BFA5] uppercase font-bold tracking-widest block font-display">AI Solution Found:</span>
                      <div className="flex items-center gap-2 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white">Swiss Alps Helicopter & Glacier Peak itinerary calibrated.</span>
                      </div>
                    </div>
                  </div>

                  {/* Left bottom details info */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] text-[#00BFA5] font-bold uppercase tracking-wider">Now Reviewing Scenario</p>
                      <h4 className="text-white text-sm font-bold font-display">Bespoke Glacier Explorations (Zermatt, Switzerland)</h4>
                    </div>

                    <button 
                      onClick={() => {
                        setShowDemoVideo(false);
                        onSearchClick();
                      }}
                      className="px-4 py-2 bg-white text-neutral-950 hover:bg-[#00BFA5] hover:text-neutral-950 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer"
                    >
                      Instant Plan
                    </button>
                  </div>

                </div>

                {/* Progress bar controller footer overlay */}
                <div className="relative z-10 w-full mt-4 bg-white/10 rounded-full h-1 overflow-hidden">
                  <div className="bg-[#00BFA5] w-1/4 h-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
