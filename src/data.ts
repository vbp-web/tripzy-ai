import { Tour } from './types';

export const TOURS_DATA: Tour[] = [
  {
    id: 'maldives-luxury',
    title: 'Maldives Private Floating Oasis',
    subtitle: 'Overwater Lagoon Villas & Reef Snorkeling',
    description: 'Immerse yourself in unrivaled luxury at an exclusive private island resort in the North Malé Atoll. Dive directly from your villa deck into bioluminescent waters, dine on bespoke ocean-floor glass bistros, and unwind with floating wellness ceremonies tailored precisely to your energy signature.',
    category: 'trending',
    duration: '7 Days, 6 Nights',
    rating: 4.95,
    reviewsCount: 148,
    price: 2450,
    location: 'Maldivian Atolls',
    groupSize: 'Max 8 travelers',
    difficulty: 'Easy',
    bannerImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473116763269-255ea74275a5?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Arrival & Overwater Sunset Lounge',
        description: 'Sweep across cobalt lagoons in a private Twin Otter seaplane. Reach your Overwater Lagoon Villa and enjoy curated sunset champagnes accompanied by acoustic ocean harmonics.',
        activities: ['Seaplane flight', 'Private butler check-in', 'Sunset champagne pairing']
      },
      {
        day: 2,
        title: 'Bioluminescent Snorkeling & Coral Restoration',
        description: 'Explore the glowing marine ecosystems with a resident biologist. Plant your own customized coral restoration dome in our house reef.',
        activities: ['Night snorkel with glow-gear', 'Coral nursery workshop', 'Aura scanning spa session']
      },
      {
        day: 3,
        title: 'Sandbar Oasis Lunch & Sunset Catamaran Cruise',
        description: 'Unwind on a completely private, temporary white sandbar. Enjoy Chef-prepared charcoal lobster before a majestic dhow sailboat tour.',
        activities: ['Sandbar private dining', 'Sailing yacht charter', 'Open-air starlight cinema']
      },
      {
        day: 4,
        title: 'Sub-aquatic Fine Dining & Ocean Bed Sleep-out',
        description: 'Dine 5 meters below the Indian Ocean with panoramic views of sea turtles. Sleep under a custom glass dome canopy on the deck or try deep breathing lessons.',
        activities: ['Undersea restaurant reservation', 'Mindfulness meditation class', 'Astronomy stargazing']
      }
    ],
    includedServices: [
      { name: 'Ultra All-Inclusive Dining', iconName: 'Utensils' },
      { name: '5-Star Villa Butler Suite', iconName: 'Sparkles' },
      { name: 'Private Luxury Seaplane Charter', iconName: 'Plane' },
      { name: 'Elite Snorkeling & Diving Gear', iconName: 'ShieldAlert' },
      { name: 'Floating Breakfast Chamber', iconName: 'Compass' }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Julianne Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: 'May 12, 2026',
        comment: 'An ethereal escape from reality. The private sandbar dinner was absolute magic and our personal butler anticipated our every preference. Liquid glass aesthetics matched perfectly.'
      },
      {
        id: 'rev-2',
        author: 'Alexander Thorne',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop',
        rating: 4.9,
        date: 'April 28, 2026',
        comment: 'Pure cinematic travel. Floating breakfasts with the sunrise made for some incredible memories. We had turtle sightings directly beneath our glass floor boards.'
      }
    ],
    tags: ['Luxury', 'Beach', 'Honeymoon']
  },
  {
    id: 'kyoto-autumn',
    title: 'Kyoto Golden Autumn Sanctuary',
    subtitle: 'Bamboo Groves, Matcha Serenity & Hidden Zen Temples',
    description: 'Journey through Kyoto in its peak fiery-red autumn brilliance. Walk private trails after hours through world-heritage Arashiyama bamboo towers, learn ancestral matcha whisking with an 18th-generation tea master, and rest in an exquisite minimalist luxury ryokan fitted with mineral thermal onsen.',
    category: 'popular',
    duration: '5 Days, 4 Nights',
    rating: 4.98,
    reviewsCount: 201,
    price: 1890,
    location: 'Kyoto, Japan',
    groupSize: 'Max 6 travelers',
    difficulty: 'Easy',
    bannerImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Hidden Arashiyama & Moonlight Temple Walk',
        description: 'Wander deep into Bamboo clusters under soft evening lanterns. Feel the whispering breezes, ending at a strictly private Zen monastery courtyard.',
        activities: ['After-hours monastery visit', 'Handcrafted tea tasting', 'Traditional multi-course Kaiseki']
      },
      {
        day: 2,
        title: 'Ancestral Calligraphy & Gold Kinkaku-ji Reflection',
        description: 'Immerse your spirit in fine ink calligraphy. Behold the pure gold pavilion reflecting off mirroring mirror ponds at first light, avoiding all tourist crowds.',
        activities: ['Early access golden pavilion', 'Wabi-Sabi calligraphy workshop', 'Outdoor stone bath onsen']
      },
      {
        day: 3,
        title: 'Sento Imperial Garden & Sado Tea Ceremony',
        description: 'Stroll mossy paths of the secluded imperial villa. Sit with an heirloom master for a meditative, silent matcha experience in a historic timber house.',
        activities: ['Imperial garden botanical stroll', 'Sado tea experience', 'Traditional music concert']
      }
    ],
    includedServices: [
      { name: 'Heritage Luxury Ryokan', iconName: 'Home' },
      { name: 'Sado Matcha Masterclass', iconName: 'Sparkles' },
      { name: 'Private Shinto Shrine Pass', iconName: 'Compass' },
      { name: 'Chef-Curated Kaiseki Dinners', iconName: 'Utensils' },
      { name: 'Private Mercedes-S Chauffeur', iconName: 'Plane' }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Hiroshi Tanaka',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: 'Nov 12, 2025',
        comment: 'Unforgettable experience. Avoiding the heavy crowds and meeting the 18th-generation tea master transformed my view of Japanese history. Exquisite.'
      }
    ],
    tags: ['Cultural', 'Mountains', 'Adventure']
  },
  {
    id: 'santorini-caldera',
    title: 'Santorini Sunset Caldera Odyssey',
    subtitle: 'Blue Dome Caves, Cliffside Infinity Pools & Yacht Sailing',
    description: 'Experience Santorini as a cinematic fantasy. Perched high above the Aegean Sea, reside in a premium white cave villa featuring heated plunge pools. Set sail on a private catamaran through emerald geothermal bays, sampling volcanic vintages poured by legendary local sommeliers.',
    category: 'popular',
    duration: '6 Days, 5 Nights',
    rating: 4.91,
    reviewsCount: 112,
    price: 1540,
    location: 'Cyclades, Greece',
    groupSize: 'Max 10 travelers',
    difficulty: 'Easy',
    bannerImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Heated Cave Plunge & Cliffside Olive Oil Tasting',
        description: 'Settle into your absolute luxury carved-stone suite. Smell the warm maritime breezes while enjoying local organic olive pressings.',
        activities: ['Suite arrival wine pairing', 'Olive farm guided walks', 'Infinity pool twilight dip']
      },
      {
        day: 2,
        title: 'Sunset Yacht Odyssey & Volcanic Mud Hotsprings',
        description: 'Board a 54ft custom catamaran. Glide past deep obsidian sea walls, bathe in hot therapeutic sulfur springs, and feast on Mediterranean mezze as the golden sun dips under the horizon.',
        activities: ['Catamaran cruise', 'Hot geothermal swim', 'Sunset photography']
      }
    ],
    includedServices: [
      { name: 'Luxury Cave Suite Selection', iconName: 'Home' },
      { name: 'Exclusive Yacht Cruise', iconName: 'Compass' },
      { name: 'Private Wine Sommelier', iconName: 'Utensils' },
      { name: 'Scenic Helicopter Airport Link', iconName: 'Plane' }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop',
        rating: 4.9,
        date: 'June 01, 2026',
        comment: 'Positively magical. The catamaran tour was sensational. Dining on the cliffs with local caldera views felt completely unreal!'
      }
    ],
    tags: ['Beach', 'Luxury', 'Honeymoon']
  },
  {
    id: 'swiss-alps',
    title: 'Swiss Alps Helicopter & Glacier Peak',
    subtitle: 'Matterhorn Flight-see, Luxury Chalets & Alpine Hot Pools',
    description: 'Soar through the jagged peaks of Central Switzerland. Embark on an exclusive helicopter heli-hiking tour, traverse glacier crevices with mountain guides, and lodge in a high-elevation alpine design chalet featuring breathtaking 360-degree Matterhorn views from your private glass thermal jacuzzi.',
    category: 'trending',
    duration: '4 Days, 3 Nights',
    rating: 4.97,
    reviewsCount: 88,
    price: 2100,
    location: 'Zermatt, Switzerland',
    groupSize: 'Max 4 travelers',
    difficulty: 'Moderate',
    bannerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Alpine Helicopter Fly-by & Chalet Arrival',
        description: 'Take off from Sion Airfield in a private helicopter flying inches from dramatic ice-cliffs. Land on a high glacier plateau for exclusive photographs before checking into Zermatt.',
        activities: ['Matterhorn helicopter tour', 'Ski pass concierge service', 'Outdoor fireplace cheese fondue']
      },
      {
        day: 2,
        title: 'Glacier Crevasse Exploration & Snowshoes',
        description: 'Buckle up with dynamic spike crampons, following a master alpine mountaineer. Learn glacial formations, and enjoy piping hot cocoa in a secret ice cave.',
        activities: ['Kevlar safety safety walk', 'Ice cave gourmet lunch', 'Steam room recovery']
      }
    ],
    includedServices: [
      { name: 'Private Helicopter Charter', iconName: 'Plane' },
      { name: 'Glacier Spikes & Adventure Kit', iconName: 'ShieldAlert' },
      { name: 'Matterhorn View Jacuzzi Suite', iconName: 'Home' },
      { name: 'Chef-to-Chalet Fondue Room', iconName: 'Utensils' }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: 'Jan 15, 2026',
        comment: 'Heli-hiking across active glaciers with expert mountain guides is something I will pass down to my kids. Simply breathtaking. Worth every single cent!'
      }
    ],
    tags: ['Mountains', 'Adventure', 'Luxury']
  },
  {
    id: 'kenyan-safari',
    title: 'Serengeti & Masai Mara Great Migration',
    subtitle: 'Cinematic Game Drives & Luxury Canvas Tented Huts',
    description: 'Witness millions of migrating Wildebeests on the sprawling grasslands of Kenya and Tanzania. Travel in open-top carbon design cruisers, track rare black rhinos with local Maasai tribal scouts, and sleep in ultra-high end solar canopy suites with hot tubs looking onto herds of grazing zebras.',
    category: 'international',
    duration: '8 Days, 7 Nights',
    rating: 4.96,
    reviewsCount: 167,
    price: 3200,
    location: 'Masai Mara, Kenya',
    groupSize: 'Max 6 travelers',
    difficulty: 'Easy',
    bannerImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Savannah Sunset Canopy & Bushfire Stories',
        description: 'Settle into elevated canvas pavilions. Join community elders under an ancient acacia tree to learn wilderness navigation while sipping local rooibos gin.',
        activities: ['Arrival high tea', 'Wildlife spotting deck welcome', 'Traditional fire dance']
      },
      {
        day: 2,
        title: 'Mara River Wildebeest Crossing & Hot Air Balloon',
        description: 'Embark at 5 AM in a hot air balloon for absolute silence above the Savannah. Float alongside soaring eagle clusters, then touch down for champagne breakfast.',
        activities: ['Hot air balloon', 'Gourmet bush breakfast', 'Afternoon predator game drive']
      }
    ],
    includedServices: [
      { name: 'Solar Canvas Villa Deck', iconName: 'Home' },
      { name: '4WD Custom Safari Cruiser', iconName: 'Compass' },
      { name: 'Maasai Bush Wildlife Tracker', iconName: 'Compass' },
      { name: 'Gourmet Bush Catering Team', iconName: 'Utensils' }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Samantha Cruz',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&auto=format&fit=crop',
        rating: 5,
        date: 'March 18, 2026',
        comment: 'To fly over the Mara river and see herds of wildebeests run from above is a spiritual awakening. The service at the camp was absolutely elite.'
      }
    ],
    tags: ['Adventure', 'Nature', 'Luxury']
  },
  {
    id: 'patagonia-creeks',
    title: 'Patagonia Pristine Glaciers & Peaks',
    subtitle: 'Torres del Paine Jagged Hikes & Granite Pinnacles',
    description: 'Set foot in the wild, untamed boundaries of Chilean Patagonia. Hike through ancient sub-antarctic beech woods, traverse icy glacial streams, behold the majestic sharp granite towers rising from turquoise lakes, and relax in modern architectural domes with log-burning fireplaces.',
    category: 'international',
    duration: '9 Days, 8 Nights',
    rating: 4.89,
    reviewsCount: 94,
    price: 2750,
    location: 'Patagonia, Chile',
    groupSize: 'Max 8 travelers',
    difficulty: 'Challenging',
    bannerImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Fjords Eco-Dome Arrival & Pisco Sours',
        description: 'Drive along magnificent glacial flatlands beneath active eagle nests. Check into your cozy geodesic dome perched directly on Lago Toro.',
        activities: ['Eco-dome private log fires', 'Locally distilled welcome pisco sours', 'Trail safety induction']
      },
      {
        day: 2,
        title: 'Trek to the base of Torres del Paine',
        description: 'Tackle the iconic 18km high-altitude trail. Ascend dry moraine stone boulders, arriving at the pure emerald lake pool nestled directly under 3 sky-scraping granite columns.',
        activities: ['Master alpine guide hiking', 'Glacial lake photography', 'Hot mud bath massage']
      }
    ],
    includedServices: [
      { name: 'Eco Geodesic Hot Domes', iconName: 'Home' },
      { name: 'Professional Alpine Rescue Team', iconName: 'ShieldAlert' },
      { name: 'Expedition Meals & Hydration Pack', iconName: 'Utensils' },
      { name: 'Private Mountain Chauffeur', iconName: 'Plane' }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Dmitri V.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop',
        rating: 4.88,
        date: 'Feb 10, 2026',
        comment: 'Tough hike but our guide paced us beautifully. Waking up inside the panoramic ecodome seeing the sunrise hit the Paine horns was simply out of this world.'
      }
    ],
    tags: ['Mountains', 'Adventure', 'Nature']
  },
  {
    id: 'positano-cliffside',
    title: 'Amalfi Cliffside & Positano Coastline',
    subtitle: 'Private Yacht Charter, Limoncello Terraces & Italian Riviera',
    description: 'Unravel the secrets of Positano on Italy’s divine Amalfi Coast. Bask on high-contrast terracotta sun chairs, cruise pastel towns in a vintage Alfa Romeo convertible, take private private yachts to Capri’s hidden blue grotto caves, and enjoy organic citrus ravioli on private cliff heights.',
    category: 'weekend',
    duration: '3 Days, 2 Nights',
    rating: 4.93,
    reviewsCount: 155,
    price: 980,
    location: 'Positano, Italy',
    groupSize: 'Max 6 travelers',
    difficulty: 'Easy',
    bannerImage: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Alfa Romeo Coastline Spin & Positano Arrival',
        description: 'Grip the authentic wooden steering wheel of a vintage Italian sports car. Curve along deep clifftops arriving at your suite over the water.',
        activities: ['Vintage sports car rental', 'Prestige suite lemon grove tour', 'Sommelier select wines']
      },
      {
        day: 2,
        title: 'Grotta Azzura Yacht & Sunset Clifftop Dinners',
        description: 'Glide on a custom Riva wooden speedboat to Capri’s bioluminescent cavern water vaults. Finish your trip with local lemon-cream pastries.',
        activities: ['Yacht charter Capri', 'Bioluminescent ocean swim', 'Fine dining reservation']
      }
    ],
    includedServices: [
      { name: 'Vintage Alfa Romeo Convertible', iconName: 'Compass' },
      { name: 'Capri Riva Boat Charter', iconName: 'Plane' },
      { name: 'Cliffside Terraced Penthouse', iconName: 'Home' },
      { name: 'Prestige Wine cellar Pass', iconName: 'Utensils' }
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Christina L.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop',
        rating: 4.95,
        date: 'May 20, 2026',
        comment: 'Sipping limoncello looking out at the glittering lights of Positano was a dream. Tripzy organized everything perfectly!'
      }
    ],
    tags: ['Beach', 'Luxury', 'Honeymoon']
  },
  {
    id: 'joshua-desert',
    title: 'Joshua Tree Starry Night Glamping',
    subtitle: 'Bespoke Desert Airstreams & Celestial Sound Healing',
    description: 'Retreat to the surreal landscapes of the Mojave Desert. Rest in fully modernized vintage Airstreams equipped with copper tubs, explore Martian bouldering fields at golden hour, and join local shamans for ancestral sound ceremonies under dense, bright, zero-pollution starry night skies.',
    category: 'weekend',
    duration: '3 Days, 2 Nights',
    rating: 4.88,
    reviewsCount: 74,
    price: 490,
    location: 'Mojave Desert, USA',
    groupSize: 'Max 12 travelers',
    difficulty: 'Easy',
    bannerImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Desert Airstream Sunset Check-in',
        description: 'Step into your mid-century aluminum cocoon. Ignite your fire-bowl, and watch Joshua tree shadows stretch under bleeding pastel orange sky tones.',
        activities: ['Airstream copper bath soak', 'Artisanal desert barbeque', 'Acoustic evening live session']
      },
      {
        day: 2,
        title: 'Martian Rocks Bouldering & Celestial Sound Gong',
        description: 'Scramble up giant warm quartz rock boulders with park experts. At night, lie under cozy blankets as quartz sound gongs echo throughout the valley.',
        activities: ['Rock scrambling tour', 'Gong sound bath ceremony', 'Telescopic galaxy spotting']
      }
    ],
    includedServices: [
      { name: 'Customized Luxe Airstream Suite', iconName: 'Home' },
      { name: 'Shaman Starry Sound Ritual', iconName: 'Sparkles' },
      { name: 'All-terrain Mountain Fatbikes', iconName: 'Compass' },
      { name: 'Locally Sourced Organic Kitchen', iconName: 'Utensils' }
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Derrick Powell',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop',
        rating: 4.8,
        date: 'March 09, 2026',
        comment: 'Mind-blowing sunset and absolute silence. The Sound Healing was deep, spiritual, and reset my entire nervous system. Unbelievable weekend getaway!'
      }
    ],
    tags: ['Adventure', 'Nature', 'Luxury']
  }
];

export const CATEGORY_CHIPS = [
  { id: 'all', label: 'All Escapes', icon: 'Compass' },
  { id: 'Luxury', label: 'Luxury Focus', icon: 'Sparkles' },
  { id: 'Beach', label: 'Beach Lagoons', icon: 'Waves' },
  { id: 'Mountains', label: 'High Peaks', icon: 'Mountain' },
  { id: 'Adventure', label: 'Adventure Expeditions', icon: 'Flame' },
  { id: 'Nature', label: 'Nature Wilderness', icon: 'Trees' },
  { id: 'Cultural', label: 'Cultural Heritage', icon: 'BookOpen' }
];
