/**
 * Ivory Horizons - Luxury Concierge Application Logic
 * Evolving the experience into a smart luxury travel concierge while
 * strictly preserving visual identity, branding, and styling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.querySelector('.main-nav');
  
  // Concierge Form Modal Elements
  const conciergeModal = document.getElementById('conciergeModal');
  const conciergeForm = document.getElementById('conciergeForm');
  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');
  const submitConciergeBtn = document.getElementById('submitConciergeBtn');
  
  const stepBadge = document.getElementById('stepBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const progressFill = document.getElementById('progressFill');
  
  const modalFooterNav = document.getElementById('modalFooterNav');
  const confirmationStep = document.getElementById('confirmationStep');
  const summaryRecap = document.getElementById('summaryRecap');
  const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');
  const whatsappCtaBtn = document.getElementById('whatsappCtaBtn');

  // Background Theme Music Elements
  const bgMusic = document.getElementById('bgMusic');
  const playMusicBtn = document.getElementById('playMusicBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  let isPlaying = false;

  // Page specific containers
  const destinationPageContent = document.getElementById('destinationPageContent');
  const journeyPageContent = document.getElementById('journeyPageContent');
  const accommodationGrid = document.getElementById('accommodationGrid');
  const accommodationFilterBar = document.getElementById('accommodationFilterBar');
  const experienceFilterBar = document.getElementById('experienceFilterBar');
  const blogGrid = document.getElementById('blogGrid');
  const blogFilterBar = document.getElementById('blogFilterBar');

  // Sticky Header Scroll Effect
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  // Mobile Navigation Toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // Continuous 3 Hero GIF Transitions (Seamless Crossfade)
  const heroGifBg = document.querySelector('.hero-gif-bg');
  if (heroGifBg) {
    const heroGifs = [
      'assets/Hero/Hero 2.gif',
      'assets/Hero/12221206_1920_1080_24fps-ezgif.com-optimize.gif',
      'assets/Hero/14264374_1920_1080_50fps-ezgif.com-video-to-gif-converter.gif'
    ];
    let currentGifIndex = 0;

    // Preload all GIF files
    heroGifs.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    setInterval(() => {
      currentGifIndex = (currentGifIndex + 1) % heroGifs.length;
      heroGifBg.style.opacity = '0.3';
      setTimeout(() => {
        heroGifBg.src = heroGifs[currentGifIndex];
        heroGifBg.style.opacity = '1';
      }, 500);
    }, 7000);
  }

  // ----------------------------------------------------
  // DATASETS
  // ----------------------------------------------------

  // Destination Metadata
  const destinationData = {
    "Kenya": {
      name: "Kenya",
      image: "assets/images/dest_kenya.jpg",
      fallback: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      overview: "Track mountain gorillas or witness millions of wildebeest across the Maasai Mara. Kenya offers the quintessential African safari alongside pristine Indian Ocean coastlines.",
      coreExperiences: ["Wildlife Safaris", "Primate Encounters", "Indian Ocean Beaches", "Maasai Culture"],
      idealDuration: "5–10 Days",
      bestTimeToVisit: "July – October (Great Migration) & January – March",
      bestFor: "Families, Groups, Honeymooners",
      gallery: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
        "assets/images/journey_kenya.jpg",
        "assets/images/Curated Modalities/Safari Adventure.jpg"
      ]
    },
    "Tanzania": {
      name: "Tanzania",
      image: "assets/images/Handpicked Lands/Tanzania.jpg",
      fallback: "assets/images/dest_tanzania.jpg",
      overview: "Home to the boundless Serengeti, Ngorongoro Crater, and snow-capped Mount Kilimanjaro. A sanctuary of raw wilderness and fly-in luxury.",
      coreExperiences: ["Serengeti Safaris", "Ngorongoro Crater", "Kilimanjaro Treks", "Zanzibar Beaches"],
      idealDuration: "7–12 Days",
      bestTimeToVisit: "June – October & December – March",
      bestFor: "Safari Enthusiasts, Luxury Travelers, Photographers",
      gallery: [
        "assets/images/Handpicked Lands/Tanzania.jpg",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
        "assets/images/dest_tanzania.jpg"
      ]
    },
    "Uganda": {
      name: "Uganda",
      image: "assets/images/Handpicked Lands/Uganda.jpg",
      fallback: "assets/images/dest_uganda.jpg",
      overview: "The Pearl of Africa features lush misty emerald rainforests, rare mountain gorilla encounters, and thunderous waterfalls along the Nile River.",
      coreExperiences: ["Gorilla Trekking", "Chimpanzee Tracking", "Nile River Expeditions", "Murchison Falls"],
      idealDuration: "4–8 Days",
      bestTimeToVisit: "June – September & December – February",
      bestFor: "Adventure Seekers, Nature Lovers, Wildlife Photographers",
      gallery: [
        "assets/images/Handpicked Lands/Uganda.jpg",
        "assets/images/Signature tours Imgs/Gorilla Kingdom.jpg",
        "assets/images/Curated Modalities/Wildlife experiences.jpg"
      ]
    },
    "Zanzibar": {
      name: "Zanzibar",
      image: "assets/images/dest_zanzibar.jpg",
      fallback: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
      overview: "Powder-white sand beaches, turquoise Indian Ocean waters, and ancient Swahili Stone Town heritage scented with cloves and cinnamon.",
      coreExperiences: ["Oceanfront Pool Villas", "Sunset Dhow Cruises", "Spice Island Tours", "Stone Town Culture"],
      idealDuration: "4–7 Days",
      bestTimeToVisit: "June – October & December – February",
      bestFor: "Couples, Honeymooners, Beach Lovers",
      gallery: [
        "assets/images/dest_zanzibar.jpg",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "assets/images/Curated Modalities/Honeymoon Journeys.jpg"
      ]
    },
    "Rwanda": {
      name: "Rwanda",
      image: "assets/images/Handpicked Lands/Rwanda.jpg",
      fallback: "assets/images/dest_rwanda.jpg",
      overview: "Land of a thousand hills, pioneering conservation, and architectural eco-luxury lodges set against misty volcanic peaks.",
      coreExperiences: ["Volcanoes Gorilla Trekking", "Golden Monkey Tracking", "Kigali Cultural Tours", "Eco-Lodge Luxury"],
      idealDuration: "4–6 Days",
      bestTimeToVisit: "June – September & December – February",
      bestFor: "Luxury Travelers, Conservation Enthusiasts",
      gallery: [
        "assets/images/Handpicked Lands/Rwanda.jpg",
        "assets/images/Signature tours Imgs/Gorilla Kingdom.jpg",
        "assets/images/dest_rwanda.jpg"
      ]
    },
    "Ghana": {
      name: "Ghana",
      image: "assets/images/Handpicked Lands/Accra Ghana.jpg",
      fallback: "assets/images/dest_ghana.jpg",
      overview: "Vibrant coastal heritage, rich West African history, Ashanti kingdom traditions, and soulful cultural rhythms.",
      coreExperiences: ["Cape Coast Heritage", "Accra Arts & Dining", "Kakum Canopy Walk", "Ashanti Kingdom Traditions"],
      idealDuration: "6–10 Days",
      bestTimeToVisit: "November – March",
      bestFor: "Diaspora Travel, Culture Seekers, Heritage Explorers",
      gallery: [
        "assets/images/Handpicked Lands/Accra Ghana.jpg",
        "assets/images/Curated Modalities/Cultural Discoveries.jpg",
        "assets/images/dest_ghana.jpg"
      ]
    },
    "Mauritius": {
      name: "Mauritius",
      image: "assets/images/dest_mauritius.jpg",
      fallback: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      overview: "Dramatic volcanic peaks, vibrant coral lagoons, and world-class luxury beachfront resorts offering refined Indian Ocean hospitality.",
      coreExperiences: ["Private Island Dining", "Coral Reef Diving", "Championship Golf", "Luxury Spa Sanctuaries"],
      idealDuration: "5–8 Days",
      bestTimeToVisit: "May – December",
      bestFor: "Honeymooners, Families, Luxury Travelers",
      gallery: [
        "assets/images/dest_mauritius.jpg",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
      ]
    },
    "Egypt": {
      name: "Egypt",
      image: "assets/images/dest_egypt.jpg",
      fallback: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
      overview: "Timeless wonders along the Nile River, ancient pharaonic monuments, private desert luxury, and vibrant historical markets.",
      coreExperiences: ["Private Nile River Cruise", "Pyramids & Sphinx Expeditions", "Luxor & Aswan Temples", "Desert Oasis Glamping"],
      idealDuration: "7–12 Days",
      bestTimeToVisit: "October – April",
      bestFor: "History Lovers, Couples, Families",
      gallery: [
        "assets/images/dest_egypt.jpg",
        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80"
      ]
    },
    "Malaysia": {
      name: "Malaysia",
      image: "assets/images/dest_malaysia.jpg",
      fallback: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
      overview: "Lush ancient rainforests, exotic wildlife sanctuaries, and serene tropical island archipelagos for global explorers.",
      coreExperiences: ["Langkawi Beach Resorts", "Borneo Wildlife Expeditions", "Kuala Lumpur Architecture", "Rainforest Eco-Villas"],
      idealDuration: "6–10 Days",
      bestTimeToVisit: "March – October",
      bestFor: "Families, Couples, First-time Asia Explorers",
      gallery: [
        "assets/images/dest_malaysia.jpg"
      ]
    },
    "Singapore": {
      name: "Singapore",
      image: "assets/images/dest_singapore.jpg",
      fallback: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
      overview: "A futuristic garden city gateway blending ultra-luxury skyline hospitality, Michelin dining, and family entertainment.",
      coreExperiences: ["Gardens by the Bay", "Raffles Heritage Suites", "Michelin Dining Tours", "Sentosa Luxury Island"],
      idealDuration: "3–5 Days",
      bestTimeToVisit: "Year-Round",
      bestFor: "Families, Couples, Luxury Travelers",
      gallery: [
        "assets/images/dest_singapore.jpg"
      ]
    }
  };

  // Journeys Master Database
  const journeysData = [
    {
      id: "mara-classic",
      name: "Kenya Classic Safari",
      destination: "Kenya",
      location: "Kenya • Maasai Mara",
      category: "Safari",
      duration: "3–5 Days",
      bestFor: "Families • Couples • First-Time Safari Travelers",
      tags: ["Safari", "Wildlife", "Luxury"],
      image: "assets/images/journey_kenya.jpg",
      fallback: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      description: "An intimate immersion into the legendary Maasai Mara. Rise with dawn game drives, sip sundowners under acacia canopies, and sleep under luxury canvas.",
      bestSeason: "July – October (Great Migration) or Year-Round Wildlife",
      highlights: [
        "Private charter flights directly to Mara airstrip",
        "Exclusive-use luxury tented camp with private butler",
        "Guided evening bush walks with Maasai warriors"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Arrival in Nairobi & Fly to Maasai Mara", 
          details: "Private VIP transfer from Jomo Kenyatta to Wilson Airport. Fly directly into the Mara savannah. Evening game drive ending with champagne sundowners.",
          img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80"
        },
        { 
          day: "Day 2", 
          title: "Big Five Tracking & Dawn Balloon Safari", 
          details: "Early morning hot air balloon flight over the Mara River, followed by a bush champagne breakfast. Afternoon private 4x4 game drive tracking lions, leopards, and elephants.",
          img: "assets/images/Curated Modalities/Safari Adventure.jpg"
        },
        { 
          day: "Day 3", 
          title: "Maasai Cultural Immersion & Bush Dinner", 
          details: "Visit an authentic Maasai Manyatta village. Learn ancient tracking techniques and warrior customs. Dine under African stars surrounded by traditional fireside singing.",
          img: "assets/images/journey_kenya.jpg"
        },
        { 
          day: "Days 4–5", 
          title: "Private Wildlife Encounters & Farewell Flight", 
          details: "Final sunrise game drive to spot rare cheetah hunts. Private charter flight back to Nairobi for departure.",
          img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80"
        }
      ],
      included: ["Private charter flights", "Luxury tented suite accommodation", "All gourmet meals & premium spirits", "Unlimited private 4x4 game drives", "Park & conservation fees", "24/7 dedicated concierge assistance"],
      excluded: ["International airfare", "Visa fees", "Personal travel insurance"],
      faqs: [
        { q: "What is the best time for the Great Migration?", a: "The wildebeest herds are usually in the Maasai Mara between July and October." },
        { q: "Are children welcome?", a: "Yes, our family safari itineraries include private vehicles and dedicated junior ranger programs." }
      ]
    },
    {
      id: "great-migration",
      name: "Great Migration Safari",
      destination: "Kenya & Tanzania",
      location: "Kenya & Tanzania",
      category: "Safari",
      duration: "7–10 Days",
      bestFor: "Safari Enthusiasts • Photographers • Families",
      tags: ["Safari", "Migration", "Luxury"],
      image: "assets/images/Signature tours Imgs/Great Migration Safari.jpg",
      fallback: "assets/images/journey_migration.jpg",
      description: "Witness one of nature's greatest spectacles. Over two million wildebeest and zebras crossing treacherous river bends in a dramatic rhythm of life and survival.",
      bestSeason: "July – October",
      highlights: [
        "Front-row access to dramatic Mara River crossings",
        "Hot air balloon safari with champagne breakfast",
        "Expert conservationist-led tracking sessions"
      ],
      itinerary: [
        { 
          day: "Days 1–3", 
          title: "Serengeti Migration Camps", 
          details: "Fly to Northern Serengeti mobile camps positioned along the migration corridor. Watch vast herds gather along riverbanks.",
          img: "assets/images/Handpicked Lands/Tanzania.jpg"
        },
        { 
          day: "Days 4–6", 
          title: "Mara River Crossings", 
          details: "Cross into Kenya's Maasai Mara. Spend days positioned at prime crossing points with expert wildlife guides.",
          img: "assets/images/Signature tours Imgs/Great Migration Safari.jpg"
        },
        { 
          day: "Days 7–10", 
          title: "Private Conservancy Sanctuary", 
          details: "Retreat to a private conservancy for nighttime game drives, bush walks, and relaxation.",
          img: "assets/images/journey_migration.jpg"
        }
      ],
      included: ["Inter-camp flight transfers", "Mobile luxury camp stays", "All meals & drinks", "Private guide and vehicle", "Conservation park permits"],
      excluded: ["International flights", "Staff gratuities"],
      faqs: [
        { q: "How close do we get to river crossings?", a: "Our private 4x4 vehicles are positioned at prime, safe vantage points with experienced conservation guides." }
      ]
    },
    {
      id: "gorilla-kingdom",
      name: "Gorilla Kingdom Expedition",
      destination: "Uganda & Rwanda",
      location: "Uganda + Rwanda",
      category: "Wildlife",
      duration: "5–7 Days",
      bestFor: "Adventure Lovers • Nature Enthusiasts • Photographers",
      tags: ["Primates", "Wildlife", "Adventure"],
      image: "assets/images/Signature tours Imgs/Gorilla Kingdom.jpg",
      fallback: "assets/images/journey_gorilla.jpg",
      description: "A rare, transformative encounter with gentle giants. Trek through ancient emerald mist rainforests to stand just paces away from wild mountain gorilla families.",
      bestSeason: "June – September & December – February",
      highlights: [
        "Guaranteed priority gorilla trekking permits",
        "Stays at architectural luxury sanctuaries in Volcanoes National Park",
        "Private helicopter transfer between Kigali and Bwindi"
      ],
      itinerary: [
        { 
          day: "Day 1", 
          title: "Kigali Arrival & Scenic Helicopter Transfer", 
          details: "Meet-and-greet at Kigali Airport. Scenic helicopter flight over mist-shrouded peaks to Volcanoes National Park.",
          img: "assets/images/Handpicked Lands/Rwanda.jpg"
        },
        { 
          day: "Day 2", 
          title: "First Mountain Gorilla Trek", 
          details: "Guided trek into Volcanoes Park with expert rangers. Spend one unforgettable hour observing a mountain gorilla family.",
          img: "assets/images/Signature tours Imgs/Gorilla Kingdom.jpg"
        },
        { 
          day: "Day 3", 
          title: "Golden Monkey Tracking & Cultural Visit", 
          details: "Morning tracking of rare golden monkeys, followed by a visit to the Ellen DeGeneres Campus of the Dian Fossey Gorilla Fund.",
          img: "assets/images/Curated Modalities/Wildlife experiences.jpg"
        },
        { 
          day: "Days 4–6", 
          title: "Bwindi Impenetrable Forest Trek (Uganda)", 
          details: "Cross into Bwindi, Uganda for a second gorilla trek in ancient primary forest. Relax at an eco-lodge overlooking the canopy.",
          img: "assets/images/Handpicked Lands/Uganda.jpg"
        }
      ],
      included: ["Gorilla trekking permits", "Helicopter & private land transfers", "Luxury lodge accommodations", "Expert ranger guides", "All meals"],
      excluded: ["International flights", "Personal items"],
      faqs: [
        { q: "How fit do I need to be for gorilla trekking?", a: "Treks range from 1 to 4 hours over forest terrain. Porters are available to assist guests on all climbs." }
      ]
    },
    {
      id: "bush-beach",
      name: "Kenya Bush & Beach Escape",
      destination: "Kenya & Zanzibar",
      location: "Kenya + Zanzibar",
      category: "Beach",
      duration: "10–14 Days",
      bestFor: "Honeymooners • Couples • Luxury Travelers",
      tags: ["Beach", "Safari", "Romance"],
      image: "assets/images/journey_bush_beach.jpg",
      fallback: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      description: "The ultimate dual-world journey. Begin with exhilarating game drives in the African bush, then transition seamlessly to warm Indian Ocean sands in Zanzibar.",
      bestSeason: "Year-Round",
      highlights: [
        "Private Mara safari followed by oceanfront villa stay",
        "Sunset dhow sailing and private island seafood dining",
        "Dedicated concierge managing every transit"
      ],
      itinerary: [
        { 
          day: "Days 1–5", 
          title: "Maasai Mara Wilderness Safari", 
          details: "5 days of private game drives, sundowners, and luxury tented stay in the Mara.",
          img: "assets/images/journey_kenya.jpg"
        },
        { 
          day: "Days 6–10", 
          title: "Zanzibar Coastal Sanctuary", 
          details: "Direct fly-in to Zanzibar. Stay in a private oceanfront pool villa with spa treatments, dhow cruises, and spice garden tours.",
          img: "assets/images/dest_zanzibar.jpg"
        }
      ],
      included: ["Domestic and inter-country flights", "Luxury bush & beach accommodations", "All meals & drinks", "Private safari & ocean activities"],
      excluded: ["International flights", "Personal purchases"],
      faqs: [
        { q: "Can this journey be customized for a honeymoon?", a: "Absolutely. We include special romantic touches, private beach dinners, and villa upgrades." }
      ]
    }
  ];

  // Accommodations Database
  const accommodationsData = [
    {
      name: "Angama Mara",
      destination: "Kenya",
      location: "Maasai Mara, Kenya",
      rating: "5-Star Ultra-Luxury",
      roomTypes: "Glass-fronted Tented Suites",
      price: "$1,850 USD / night",
      amenities: ["Private Airfield", "Infinity Pool", "Personal Butler", "Game Drives"],
      image: "assets/images/Accommodation Imgs/Angama-Mara-.webp",
      fallback: "assets/images/journey_kenya.jpg",
      description: "Perched high on the rim of the Great Rift Valley overlooking the Maasai Mara, offering breathtaking views and unmatched luxury."
    },
    {
      name: "Giraffe Manor",
      destination: "Kenya",
      location: "Nairobi, Kenya",
      rating: "5-Star Icon",
      roomTypes: "Historic Manor Suites",
      price: "$1,100 USD / night",
      amenities: ["Giraffe Breakfast", "Private Gardens", "Fine Dining", "Spa Services"],
      image: "assets/images/Accommodation Imgs/Giraffe Manor.jpg",
      fallback: "assets/images/safari_adventure.jpg",
      description: "An iconic boutique hotel set in 12 acres of private land within 140 acres of indigenous forest, home to resident Rothschild's giraffes."
    },
    {
      name: "Four Seasons Safari Lodge Serengeti",
      destination: "Tanzania",
      location: "Serengeti National Park, Tanzania",
      rating: "5-Star Luxury",
      roomTypes: "Savannah Rooms & Private Pool Villas",
      price: "$1,450 USD / night",
      amenities: ["Waterhole View Pool", "Full-service Spa", "Kijana Kids Club", "Bush Dinners"],
      image: "assets/images/Accommodation Imgs/Four Seasons Safari Lodge Serengeti.jpg",
      fallback: "assets/images/dest_tanzania.jpg",
      description: "Deep within the Serengeti National Park, featuring elevated walkways and a watering hole visited by wildlife throughout the day."
    },
    {
      name: "Ngorongoro Crater Lodge",
      destination: "Tanzania",
      location: "Ngorongoro Conservation Area, Tanzania",
      rating: "5-Star Architectural Marvel",
      roomTypes: "Chateau-style Stilted Suites",
      price: "$1,650 USD / night",
      amenities: ["Personal Butler", "Crater View Deck", "Fine Wine Cellar", "Private Guides"],
      image: "assets/images/Accommodation Imgs/ngorongoro-crater-lodge-2.jpg",
      fallback: "assets/images/dest_tanzania.jpg",
      description: "Dramatic architecture combining Versailles opulence with African craft on the rim of the ancient Ngorongoro Crater."
    },
    {
      name: "Sanctuary Gorilla Forest Camp",
      destination: "Uganda",
      location: "Bwindi Impenetrable Forest, Uganda",
      rating: "5-Star Eco-Luxury",
      roomTypes: "Luxury Tented Suites",
      price: "$1,350 USD / night",
      amenities: ["Gorilla Visits in Camp", "Forest Spa", "Campfire Lounge", "Private Dining"],
      image: "assets/images/Accommodation Imgs/Sanctuary Gorilla Forest Camp.jfif",
      fallback: "assets/images/dest_uganda.jpg",
      description: "Nestled deep inside Bwindi Impenetrable Forest, where wild gorilla families occasionally wander right into camp."
    },
    {
      name: "One&Only Gorillas' Nest",
      destination: "Rwanda",
      location: "Volcanoes National Park, Rwanda",
      rating: "5-Star Sanctuary",
      roomTypes: "Forest Lodges & Treehouse Suites",
      price: "$2,100 USD / night",
      amenities: ["Private Pool", "World-Class Spa", "Helipad", "Chef's Garden Dining"],
      image: "assets/images/Accommodation Imgs/One&Only Gorillas' Nest.jpg",
      fallback: "assets/images/dest_rwanda.jpg",
      description: "Cradled by eucalyptus trees at the foothills of the Virunga Volcanoes, offering an intimate haven of mountain luxury."
    },
    {
      name: "The Residence Zanzibar",
      destination: "Zanzibar",
      location: "Mustaphi, Zanzibar",
      rating: "5-Star Oceanfront",
      roomTypes: "Luxury Ocean Pool Villas",
      price: "$950 USD / night",
      amenities: ["Private Butler", "Infinity Pool", "Private Beach", "Spa & Wellness"],
      image: "assets/images/Accommodation Imgs/The Residence Zanzibarjpg.jpg",
      fallback: "assets/images/dest_zanzibar.jpg",
      description: "Set among 32 hectares of tropical gardens alongside a mile-long white sand beach with elegant private pool villas."
    },
    {
      name: "Royal Palm Beachcomber Luxury",
      destination: "Mauritius",
      location: "Grand Baie, Mauritius",
      rating: "5-Star Palace",
      roomTypes: "Ocean Suites & Royal Villa",
      price: "$1,050 USD / night",
      amenities: ["Helipad", "Yacht Transfers", "3 Gourmet Restaurants", "Spa by Clarins"],
      image: "assets/images/Accommodation Imgs/Royal Palm Beachcomber Luxury.jpg",
      fallback: "assets/images/dest_mauritius.jpg",
      description: "The peak of Mauritian luxury on a sheltered beach in Grand Baie, renowned for discreet service and fine gastronomy."
    },
    {
      name: "Sofitel Legend Old Cataract",
      destination: "Egypt",
      location: "Aswan, Egypt",
      rating: "5-Star Historic Heritage",
      roomTypes: "Nile View Suites & Heritage Rooms",
      price: "$780 USD / night",
      amenities: ["Nile Terrace Bar", "Infinity Pool", "Spa & Wellness", "Butler Service"],
      image: "assets/images/Accommodation Imgs/Sofitel Legend Old Cataract.jfif",
      fallback: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
      description: "A Victorian palace built on a pink granite cliff along the banks of the Nile, where Agatha Christie penned Death on the Nile."
    },
    {
      name: "Kempinski Hotel Gold Coast City",
      destination: "Ghana",
      location: "Accra, Ghana",
      rating: "5-Star City Resort",
      roomTypes: "Executive Suites & Presidential Villa",
      price: "$650 USD / night",
      amenities: ["Resort Pool", "Luxury Spa", "Fine Dining", "Concierge Service"],
      image: "assets/images/Accommodation Imgs/Kempinski Hotel Gold Coast City4K.jpg",
      fallback: "assets/images/dest_ghana.jpg",
      description: "Accra's premier 5-star luxury hotel, combining contemporary luxury with Ghanaian warmth and culture."
    },
    {
      name: "The Datai Langkawi",
      destination: "Malaysia",
      location: "Langkawi, Malaysia",
      rating: "5-Star Rainforest Retreat",
      roomTypes: "Rainforest Villas & Beach Suites",
      amenities: ["Private Beach", "10-Million-Year Rainforest", "Nature Center", "Spa"],
      image: "assets/images/Accommodation Imgs/The Datai Langkawi.jpg",
      fallback: "assets/images/dest_malaysia.jpg",
      description: "Embedded within an ancient rainforest opening onto a secluded crescent bay, offering serene natural luxury."
    },
    {
      name: "Raffles Hotel Singapore",
      destination: "Singapore",
      location: "Beach Road, Singapore",
      rating: "5-Star Heritage Icon",
      roomTypes: "Grand Colonial Suites",
      amenities: ["Private Butler", "Long Bar", "Raffles Spa", "Michelin Dining"],
      image: "assets/images/Accommodation Imgs/Raffles Hotel Singapore.jpg",
      fallback: "assets/images/dest_singapore.jpg",
      description: "An iconic landmark offering legendary colonial luxury, unblemished hospitality, and timeless Singaporean charm."
    }
  ];

  // Blog Articles Database
  const blogArticlesData = [
    {
      id: "fly-in-safari-art",
      title: "The Art of the Private Fly-in Safari",
      category: "Safari Tips",
      readTime: "5 min read",
      date: "October 2026",
      image: "assets/images/journey_kenya.jpg",
      excerpt: "Skip long road transfers and glide over Africa's iconic savannahs directly onto private airstrips near exclusive wilderness camps.",
      content: "Private fly-in safaris transform African travel by turning transit into breathtaking aerial sight-seeing. Charter flights connect remote conservancies in Kenya and Tanzania effortlessly."
    },
    {
      id: "best-time-migration",
      title: "When is the Best Time to Witness the Great Migration?",
      category: "Destination Guides",
      readTime: "7 min read",
      date: "September 2026",
      image: "assets/images/Signature tours Imgs/Great Migration Safari.jpg",
      excerpt: "From calving season in Southern Serengeti to dramatic river crossings in the Maasai Mara, discover the monthly rhythms of the migration.",
      content: "The Great Migration is a continuous year-round circuit. Understanding seasonal movements helps travelers position themselves for river crossings or predator encounters."
    },
    {
      id: "stone-town-heritage",
      title: "Exploring Zanzibar's Stone Town: Spices, Culture & Heritage",
      category: "Culture",
      readTime: "6 min read",
      date: "August 2026",
      image: "assets/images/dest_zanzibar.jpg",
      excerpt: "Wander through labyrinthine alleyways, carved Swahili doors, and aromatic spice bazaars in East Africa's historic coral stone city.",
      content: "Stone Town's rich fusion of Arab, Persian, Indian, and Swahili architecture tells the story of centuries of Indian Ocean trade."
    },
    {
      id: "gorilla-trekking-guide",
      title: "Uganda & Rwanda Gorilla Trekking: Permits, Gear & Preparation",
      category: "Travel Advice",
      readTime: "8 min read",
      date: "July 2026",
      image: "assets/images/Handpicked Lands/Uganda.jpg",
      excerpt: "Everything you need to know about permit bookings, required physical fitness, gaiters, and what happens during your hour with wild gorillas.",
      content: "Trekking wild mountain gorillas in Bwindi or Volcanoes National Park is one of the world's most intimate wildlife experiences."
    }
  ];

  // ----------------------------------------------------
  // MULTI-STEP ACCOMMODATION BOOKING WIZARD LOGIC (5 STEPS)
  // ----------------------------------------------------
  let currentAccomStep = 1;
  let currentAccomHotelObj = null;

  const accomModal = document.getElementById('accomBookingModal');
  const closeAccomBtn = document.getElementById('closeAccomModalBtn');
  const accomForm = document.getElementById('accomBookingForm');
  const accomStepBadge = document.getElementById('accomStepBadge');
  const accomModalTitle = document.getElementById('accomModalTitle');
  const accomModalSubtitle = document.getElementById('accomModalSubtitle');
  const accomProgressFill = document.getElementById('accomProgressFill');
  const prevAccomStepBtn = document.getElementById('prevAccomStepBtn');
  const nextAccomStepBtn = document.getElementById('nextAccomStepBtn');
  const accomFooterNav = document.getElementById('accomModalFooterNav');
  const submitAccomBtn = document.getElementById('submitAccomBtn');
  const accomWhatsAppCtaBtn = document.getElementById('accomWhatsAppCtaBtn');

  const accomStepMeta = {
    1: { title: "Confirm Your Sanctuary", subtitle: "Review your selected accommodation before selecting stay parameters.", fill: "20%" },
    2: { title: "Stay Details", subtitle: "Choose your check-in, check-out dates, guest count, and preferred room type.", fill: "40%" },
    3: { title: "Guest Information", subtitle: "Provide your contact details so our concierge can secure your private hold.", fill: "60%" },
    4: { title: "Tailor Your Stay", subtitle: "Tell us about the purpose of your trip and any special requests or celebration setups.", fill: "80%" },
    5: { title: "Review & Submit", subtitle: "Confirm your stay details below and submit your request or connect via WhatsApp.", fill: "100%" }
  };

  function openAccomBooking(hotelName = 'Angama Mara') {
    if (!accomModal) return;
    
    currentAccomHotelObj = accommodationsData.find(a => a.name.toLowerCase() === hotelName.toLowerCase()) || {
      name: hotelName,
      destination: "Africa",
      location: hotelName,
      description: "A handpicked luxury sanctuary curated by Ivory Horizons.",
      price: "$1,200 USD / night",
      image: "assets/images/Accommodation Imgs/Angama-Mara-.webp"
    };

    // Populate Step 1 Preview Card
    const previewImg = document.getElementById('accomPreviewImg');
    const previewBadge = document.getElementById('accomPreviewBadge');
    const previewName = document.getElementById('accomPreviewName');
    const previewLoc = document.getElementById('accomPreviewLocation');
    const previewDesc = document.getElementById('accomPreviewDesc');
    const priceVal = document.getElementById('accomPriceVal');

    if (previewImg) previewImg.src = currentAccomHotelObj.image || "assets/images/Accommodation Imgs/Angama-Mara-.webp";
    if (previewBadge) previewBadge.textContent = currentAccomHotelObj.destination || "Africa";
    if (previewName) previewName.textContent = currentAccomHotelObj.name || hotelName;
    if (previewLoc) previewLoc.textContent = `📍 ${currentAccomHotelObj.location || hotelName}`;
    if (previewDesc) previewDesc.textContent = currentAccomHotelObj.description || "A handpicked luxury sanctuary curated by Ivory Horizons.";
    if (priceVal) priceVal.textContent = currentAccomHotelObj.price || "$1,200 USD / night";

    currentAccomStep = 1;
    updateAccomStepView();
    
    if (typeof accomModal.showModal === 'function') {
      accomModal.showModal();
    } else {
      accomModal.setAttribute('open', '');
    }
  }

  function closeAccomModal() {
    if (!accomModal) return;
    if (typeof accomModal.close === 'function') {
      accomModal.close();
    } else {
      accomModal.removeAttribute('open');
    }
  }

  if (closeAccomBtn) {
    closeAccomBtn.addEventListener('click', closeAccomModal);
  }

  function updateAccomStepView() {
    const steps = accomModal ? accomModal.querySelectorAll('.accom-step') : [];
    steps.forEach(step => {
      const stepNum = parseInt(step.getAttribute('data-step'), 10);
      if (stepNum === currentAccomStep) {
        step.classList.add('step-active');
        step.style.display = 'block';
      } else {
        step.classList.remove('step-active');
        step.style.display = 'none';
      }
    });

    const meta = accomStepMeta[currentAccomStep] || accomStepMeta[1];
    if (accomStepBadge) accomStepBadge.textContent = `Step ${currentAccomStep} of 5`;
    if (accomModalTitle) accomModalTitle.textContent = meta.title;
    if (accomModalSubtitle) accomModalSubtitle.textContent = meta.subtitle;
    if (accomProgressFill) accomProgressFill.style.width = meta.fill;

    // Controls
    if (currentAccomStep === 1) {
      if (prevAccomStepBtn) prevAccomStepBtn.style.display = 'none';
      if (nextAccomStepBtn) {
        nextAccomStepBtn.style.display = 'inline-block';
        nextAccomStepBtn.textContent = 'Continue →';
      }
      if (accomFooterNav) accomFooterNav.style.display = 'flex';
    } else if (currentAccomStep >= 2 && currentAccomStep <= 4) {
      if (prevAccomStepBtn) prevAccomStepBtn.style.display = 'inline-flex';
      if (nextAccomStepBtn) {
        nextAccomStepBtn.style.display = 'inline-block';
        nextAccomStepBtn.textContent = currentAccomStep === 4 ? 'Review Booking →' : 'Next →';
      }
      if (accomFooterNav) accomFooterNav.style.display = 'flex';
    } else if (currentAccomStep === 5) {
      if (accomFooterNav) accomFooterNav.style.display = 'none';
      buildAccomSummaryRecap();
    }
  }

  function buildAccomSummaryRecap() {
    const checkIn = document.getElementById('accomCheckIn')?.value || 'Not specified';
    const checkOut = document.getElementById('accomCheckOut')?.value || 'Not specified';
    const guests = accomForm ? (accomForm.querySelector('input[name="accomGuests"]:checked')?.value || '2 Guests') : '2 Guests';
    const rooms = document.getElementById('accomRooms')?.value || '1 Room';
    const roomType = accomForm ? (accomForm.querySelector('input[name="accomRoomType"]:checked')?.value || 'Double Room') : 'Double Room';
    
    const firstName = document.getElementById('accomFirstName')?.value || '';
    const lastName = document.getElementById('accomLastName')?.value || '';
    const fullName = `${firstName} ${lastName}`.trim() || 'Valued Guest';
    const email = document.getElementById('accomEmail')?.value || '';
    const phone = document.getElementById('accomPhone')?.value || '';
    const whatsapp = document.getElementById('accomWhatsApp')?.value || phone;
    const pref = accomForm ? (accomForm.querySelector('input[name="accomContactPref"]:checked')?.value || 'WhatsApp') : 'WhatsApp';
    
    const purpose = accomForm ? (accomForm.querySelector('input[name="accomPurpose"]:checked')?.value || 'Holiday') : 'Holiday';
    const reqTags = accomForm ? Array.from(accomForm.querySelectorAll('input[name="accomReqTags"]:checked')).map(cb => cb.value) : [];
    const specialText = document.getElementById('accomSpecialText')?.value || '';

    const reqSummaryStr = [...reqTags, specialText].filter(Boolean).join(', ') || 'None specified';

    const recapBox = document.getElementById('accomSummaryRecap');
    if (recapBox && currentAccomHotelObj) {
      recapBox.innerHTML = `
        <p><strong>Sanctuary:</strong> ${currentAccomHotelObj.name} (${currentAccomHotelObj.location})</p>
        <p><strong>Check-in:</strong> ${checkIn} • <strong>Check-out:</strong> ${checkOut}</p>
        <p><strong>Guests:</strong> ${guests} • <strong>Rooms:</strong> ${rooms} (${roomType})</p>
        <p><strong>Guest Name:</strong> ${fullName}</p>
        <p><strong>Contact:</strong> ${email} • ${phone} (Preferred: ${pref})</p>
        <p><strong>Purpose of Travel:</strong> ${purpose}</p>
        <p><strong>Special Requests:</strong> ${reqSummaryStr}</p>
      `;
    }

    // Pre-filled WhatsApp message matching exact user specification
    const waMessage = `Hello Ivory Horizons! I'd like to book accommodation.

Hotel: ${currentAccomHotelObj ? currentAccomHotelObj.name : 'Sanctuary'}
Destination: ${currentAccomHotelObj ? currentAccomHotelObj.location : 'Africa'}
Check-in: ${checkIn}
Check-out: ${checkOut}
Guests: ${guests}
Rooms: ${rooms}
Room Type: ${roomType}
Purpose: ${purpose}
Special Requests: ${reqSummaryStr}

My contact details are:
Name: ${fullName}
Email: ${email}
Phone: ${phone}

I look forward to hearing from you.`;

    const waUrl = `https://wa.me/254740199975?text=${encodeURIComponent(waMessage)}`;

    if (accomWhatsAppCtaBtn) {
      accomWhatsAppCtaBtn.onclick = () => {
        window.open(waUrl, '_blank');
      };
    }
  }

  // Next Step Button Handler for Accom Modal
  if (nextAccomStepBtn) {
    nextAccomStepBtn.addEventListener('click', () => {
      // Validate Step 2 (Check-in & Check-out)
      if (currentAccomStep === 2) {
        const checkIn = document.getElementById('accomCheckIn');
        const checkOut = document.getElementById('accomCheckOut');
        if (!checkIn || !checkIn.value) {
          alert('Please select a Check-in Date before continuing.');
          checkIn?.focus();
          return;
        }
        if (!checkOut || !checkOut.value) {
          alert('Please select a Check-out Date before continuing.');
          checkOut?.focus();
          return;
        }
        if (new Date(checkOut.value) <= new Date(checkIn.value)) {
          alert('Check-out Date must be after Check-in Date.');
          checkOut?.focus();
          return;
        }
      }

      // Validate Step 3 (Guest Information)
      if (currentAccomStep === 3) {
        const fName = document.getElementById('accomFirstName');
        const lName = document.getElementById('accomLastName');
        const email = document.getElementById('accomEmail');
        const phone = document.getElementById('accomPhone');

        if (!fName || !fName.value.trim()) {
          alert('Please enter your First Name.');
          fName?.focus();
          return;
        }
        if (!lName || !lName.value.trim()) {
          alert('Please enter your Last Name.');
          lName?.focus();
          return;
        }
        if (!email || !email.value.trim()) {
          alert('Please enter a valid Email Address.');
          email?.focus();
          return;
        }
        if (!phone || !phone.value.trim()) {
          alert('Please enter your Phone Number.');
          phone?.focus();
          return;
        }
      }

      if (currentAccomStep < 5) {
        currentAccomStep++;
        updateAccomStepView();
      }
    });
  }

  if (prevAccomStepBtn) {
    prevAccomStepBtn.addEventListener('click', () => {
      if (currentAccomStep > 1) {
        currentAccomStep--;
        updateAccomStepView();
      }
    });
  }

  if (accomForm) {
    accomForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your sanctuary reservation request has been submitted to Ivory Horizons. Our travel curator will contact you shortly.');
      closeAccomModal();
    });
  }

  // ----------------------------------------------------
  // CONCIERGE WIZARD LOGIC
  // ----------------------------------------------------

  let currentStep = 1;
  const totalSteps = 4;

  const stepTitles = {
    1: { title: "What type of trip are you imagining?", subtitle: "Select the experience that best captures your dream escape." },
    2: { title: "Which Iconic Horizons speak to you?", subtitle: "Choose one or more destinations you wish to explore." },
    3: { title: "Tell us about your travel parameters", subtitle: "Specify your dates, guests, room requirements, and budget." },
    4: { title: "Where should your private curator reach out?", subtitle: "Provide your details to receive your personalized proposal." }
  };

  function openConcierge(preselectType = null, preselectDest = null, preselectJourney = null, preselectHotel = null, skipStep1 = false) {
    if (!conciergeModal) return;

    if (preselectType && conciergeForm) {
      const radio = conciergeForm.querySelector(`input[name="journeyType"][value="${preselectType}"]`);
      if (radio) radio.checked = true;
    }

    if (preselectDest && conciergeForm) {
      const checkbox = conciergeForm.querySelector(`input[name="destination"][value="${preselectDest}"]`);
      if (checkbox) checkbox.checked = true;
    }

    if (preselectJourney) {
      const prefsField = document.getElementById('specialPreferences');
      if (prefsField && !prefsField.value.includes(preselectJourney)) {
        prefsField.value = `Interested in Journey: ${preselectJourney}. ` + prefsField.value;
      }
    }

    if (preselectHotel) {
      const prefsField = document.getElementById('specialPreferences');
      if (prefsField && !prefsField.value.includes(preselectHotel)) {
        prefsField.value = `Accommodation Preference: ${preselectHotel}. ` + prefsField.value;
      }
    }

    currentStep = skipStep1 ? 3 : 1;
    updateStepView();

    if (conciergeModal.showModal) {
      conciergeModal.showModal();
    } else {
      conciergeModal.setAttribute('open', 'true');
    }
  }

  function closeConcierge() {
    if (!conciergeModal) return;
    if (conciergeModal.close) {
      conciergeModal.close();
    } else {
      conciergeModal.removeAttribute('open');
    }
  }

  const conciergeTriggers = document.querySelectorAll('.concierge-trigger');
  conciergeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const hotel = btn.dataset.hotel || null;
      if (hotel) {
        openAccomBooking(hotel);
        return;
      }
      const type = btn.dataset.type || null;
      const dest = btn.dataset.dest || null;
      const journey = btn.dataset.journey || null;
      const skip = btn.dataset.skipStep1 === 'true';
      openConcierge(type, dest, journey, hotel, skip);
    });
  });

  const closeConciergeBtn = document.getElementById('closeConciergeBtn');
  if (closeConciergeBtn) closeConciergeBtn.addEventListener('click', closeConcierge);
  if (closeConfirmationBtn) closeConfirmationBtn.addEventListener('click', closeConcierge);

  function updateStepView() {
    document.querySelectorAll('.concierge-step').forEach(step => {
      step.classList.remove('step-active');
      step.style.display = 'none';
    });

    if (currentStep <= totalSteps) {
      if (confirmationStep) confirmationStep.style.display = 'none';
      if (modalFooterNav) modalFooterNav.style.display = 'flex';
      
      const activeStep = document.querySelector(`.concierge-step[data-step="${currentStep}"]`);
      if (activeStep) {
        activeStep.classList.add('step-active');
        activeStep.style.display = 'block';
      }

      if (stepBadge) stepBadge.textContent = `Step ${currentStep} of ${totalSteps}`;
      if (modalTitle) modalTitle.textContent = stepTitles[currentStep].title;
      if (modalSubtitle) modalSubtitle.textContent = stepTitles[currentStep].subtitle;
      if (progressFill) progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

      if (prevStepBtn) prevStepBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
      if (nextStepBtn) nextStepBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
      if (submitConciergeBtn) submitConciergeBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    }
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepView();
      }
    });
  }

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepView();
      }
    });
  }

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName')?.value || 'Valued';
      const lastName = document.getElementById('lastName')?.value || 'Guest';
      const fullName = `${firstName} ${lastName}`.trim();
      
      const guestEmail = document.getElementById('guestEmail')?.value || '';
      const guestPhone = document.getElementById('guestPhone')?.value || '';
      const contactPref = document.getElementById('contactPreference')?.value || 'WhatsApp Concierge';
      
      const journeyType = conciergeForm.querySelector('input[name="journeyType"]:checked')?.value || 'Bespoke Experience';
      const destinations = Array.from(conciergeForm.querySelectorAll('input[name="destination"]:checked')).map(cb => cb.value);
      
      const travelCompanions = conciergeForm.querySelector('input[name="travelCompanions"]:checked')?.value || 'Not specified';
      const budget = conciergeForm.querySelector('input[name="budgetPill"]:checked')?.value || '3000-5000 USD';
      const flightStatus = conciergeForm.querySelector('input[name="flightStatus"]:checked')?.value || 'No';
      
      const travelYear = document.getElementById('travelYear')?.value || '';
      const travelMonth = document.getElementById('travelMonth')?.value || '';
      const travelDuration = document.getElementById('travelDuration')?.value || '';
      const whenToTravel = [travelMonth, travelYear, travelDuration].filter(Boolean).join(' ') || 'Flexible';
      
      const specialRequests = document.getElementById('specialPreferences')?.value || 'None specified';
      const selectedDestStr = destinations.length ? destinations.join(', ') : 'Curated Recommendation';

      if (summaryRecap) {
        summaryRecap.innerHTML = `
          <p><strong>Guest Name:</strong> ${fullName}</p>
          <p><strong>Contact:</strong> ${guestEmail} • ${guestPhone} (${contactPref})</p>
          <p><strong>Journey Style:</strong> ${journeyType}</p>
          <p><strong>Destinations:</strong> ${selectedDestStr}</p>
          <p><strong>Travelling With:</strong> ${travelCompanions}</p>
          <p><strong>Target Travel Date:</strong> ${whenToTravel}</p>
          <p><strong>Flights Booked:</strong> ${flightStatus}</p>
          <p><strong>Budget per Person:</strong> ${budget}</p>
          <p><strong>Special Requests:</strong> ${specialRequests}</p>
        `;
      }

      const waText = `Hello Viv, I would like to book a trip with Ivory Horizons:
- Name: ${fullName}
- Contact: ${guestPhone} (${guestEmail})
- Destination: ${selectedDestStr}
- Journey Style: ${journeyType}
- Travelling With: ${travelCompanions}
- Target Travel Date: ${whenToTravel}
- Flights Booked: ${flightStatus}
- Budget: ${budget}
- Preferred Contact: ${contactPref}
- Special Requests: ${specialRequests}`;

      const whatsappUrl = `https://wa.me/254740199975?text=${encodeURIComponent(waText)}`;

      if (whatsappCtaBtn) {
        whatsappCtaBtn.onclick = () => {
          window.open(whatsappUrl, '_blank');
        };
      }

      document.querySelectorAll('.concierge-step').forEach(step => step.style.display = 'none');
      if (modalFooterNav) modalFooterNav.style.display = 'none';
      if (stepBadge) stepBadge.textContent = 'Request Received';
      if (modalTitle) modalTitle.textContent = 'Thank You';
      if (modalSubtitle) modalSubtitle.textContent = 'Your private concierge ticket has been created.';
      if (progressFill) progressFill.style.width = '100%';
      if (confirmationStep) confirmationStep.style.display = 'block';
    });
  }

  // ----------------------------------------------------
  // DYNAMIC PAGE LOADERS (STANDALONE PAGES)
  // ----------------------------------------------------

  const urlParams = new URLSearchParams(window.location.search);

  // Standalone Journey Details Page Renderer (`journey.html`)
  if (journeyPageContent) {
    const journeyId = urlParams.get('id') || 'mara-classic';
    const journey = journeysData.find(j => j.id === journeyId || j.name.toLowerCase().includes(journeyId.toLowerCase())) || journeysData[0];

    journeyPageContent.innerHTML = `
      <div class="journey-hero-banner">
        <img src="${journey.image}" alt="${journey.name}" onerror="this.src='${journey.fallback}';">
        <div class="journey-hero-overlay"></div>
        <div class="journey-hero-text">
          <span class="section-badge badge-light">${journey.duration}</span>
          <h1 class="journey-hero-title">${journey.name}</h1>
          <p class="best-for-text"><strong>Best For:</strong> ${journey.bestFor}</p>
        </div>
      </div>

      <div class="journey-page-body">
        <div class="journey-overview-card">
          <h2>Journey Overview</h2>
          <p class="lead-p">${journey.description}</p>
          <p><strong>🗓️ Best Travel Season:</strong> ${journey.bestSeason}</p>
        </div>

        <div class="journey-section-block">
          <h2>Day-by-Day Itinerary</h2>
          <div class="timeline">
            ${journey.itinerary.map(item => `
              <div class="timeline-item">
                <div class="timeline-day">${item.day}</div>
                <div class="timeline-content">
                  <h3>${item.title}</h3>
                  <p>${item.details}</p>
                  ${item.img ? `<div class="timeline-img-wrap margin-top-sm"><img src="${item.img}" alt="${item.title}" class="rounded-img" style="max-height: 220px; width: 100%; object-fit: cover; border-radius: 8px;"></div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="services-dual-grid">
          <div class="service-col">
            <h3>✓ Included Services</h3>
            <ul>${journey.included.map(inc => `<li>${inc}</li>`).join('')}</ul>
          </div>
          <div class="service-col">
            <h3>✕ Excluded Services</h3>
            <ul>${journey.excluded.map(exc => `<li>${exc}</li>`).join('')}</ul>
          </div>
        </div>

        ${journey.faqs ? `
          <div class="journey-section-block">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-list">
              ${journey.faqs.map(faq => `
                <div class="faq-item" style="margin-bottom: 16px;">
                  <strong>Q: ${faq.q}</strong>
                  <p>A: ${faq.a}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="journey-page-cta-box text-center">
          <h2>Ready To Plan This Journey?</h2>
          <button type="button" class="btn btn-primary btn-large plan-this-journey-btn">Plan This Journey</button>
        </div>
      </div>
    `;

    const planBtn = journeyPageContent.querySelector('.plan-this-journey-btn');
    if (planBtn) {
      planBtn.addEventListener('click', () => {
        openConcierge(null, journey.destination, journey.name, null, true);
      });
    }
  }

  // Standalone Destination Details Page Renderer (`destination.html`)
  if (destinationPageContent) {
    const destName = urlParams.get('dest') || 'Kenya';
    const dest = destinationData[destName] || destinationData["Kenya"];
    const matchingJourneys = journeysData.filter(j => j.destination.includes(destName));
    const matchingAccom = accommodationsData.filter(a => a.destination.toLowerCase() === destName.toLowerCase());

    destinationPageContent.innerHTML = `
      <div class="dest-hero-banner">
        <img src="${dest.image}" alt="${dest.name}" onerror="this.src='${dest.fallback}';">
        <div class="dest-hero-overlay"></div>
        <div class="dest-hero-text">
          <span class="section-badge badge-light">${dest.idealDuration}</span>
          <h1 class="dest-hero-title">Explore ${dest.name}</h1>
        </div>
      </div>

      <div class="dest-page-body">
        <div class="dest-overview-card">
          <h2>Destination Overview</h2>
          <p class="lead-p">${dest.overview}</p>
        </div>

        <div class="dest-meta-grid">
          <div class="meta-box">
            <span class="meta-icon">🧭</span>
            <strong>Core Experiences</strong>
            <p>${dest.coreExperiences.join(' • ')}</p>
          </div>
          <div class="meta-box">
            <span class="meta-icon">🗓️</span>
            <strong>Best Time to Visit</strong>
            <p>${dest.bestTimeToVisit}</p>
          </div>
          <div class="meta-box">
            <span class="meta-icon">⌛</span>
            <strong>Ideal Duration</strong>
            <p>${dest.idealDuration}</p>
          </div>
          <div class="meta-box">
            <span class="meta-icon">👥</span>
            <strong>Ideal For</strong>
            <p>${dest.bestFor}</p>
          </div>
        </div>

        <div class="dest-section-block">
          <h2>Signature Journeys in ${dest.name}</h2>
          <div class="dest-journey-cards-grid">
            ${matchingJourneys.length ? matchingJourneys.map(j => `
              <div class="journey-featured-card">
                <div class="journey-img-wrap">
                  <img src="${j.image}" alt="${j.name}" onerror="this.src='${j.fallback}';">
                  <div class="journey-tag-floating">${j.duration}</div>
                </div>
                <div class="journey-info">
                  <h3>${j.name}</h3>
                  <p class="journey-excerpt">${j.description}</p>
                  <a href="journey.html?id=${j.id}" class="btn btn-primary">View Full Itinerary</a>
                </div>
              </div>
            `).join('') : `<p>Bespoke journeys curated upon request for ${dest.name}.</p>`}
          </div>
        </div>

        <div class="dest-section-block">
          <h2>Recommended Lodges & Sanctuaries in ${dest.name}</h2>
          <div class="accommodation-grid">
            ${matchingAccom.length ? matchingAccom.map(a => `
              <article class="accommodation-card">
                <div class="accom-img-wrap">
                  <img src="${a.image}" alt="${a.name}" onerror="this.src='${a.fallback}';">
                  <span class="accom-badge">${a.destination}</span>
                </div>
                <div class="accom-body">
                  <span class="star-rating">⭐ ${a.rating}</span>
                  <h3 class="accom-title">${a.name}</h3>
                  <span class="accom-location">📍 ${a.location}</span>
                  <p class="accom-desc">${a.description}</p>
                  <div class="accom-cta-wrap">
                    <button type="button" class="btn btn-outline concierge-trigger" data-hotel="${a.name}" data-dest="${a.destination}" data-skip-step1="true">Book Now</button>
                  </div>
                </div>
              </article>
            `).join('') : `<p>Luxury partner sanctuaries curated upon request for ${dest.name}.</p>`}
          </div>
        </div>

        <div class="dest-page-cta-box text-center">
          <h2>Ready To Experience ${dest.name}?</h2>
          <button type="button" class="btn btn-primary btn-large concierge-trigger" data-dest="${dest.name}" data-skip-step1="true">Plan My Journey</button>
        </div>
      </div>
    `;
  }

  // Standalone Accommodation Page Renderer (`accommodation.html`)
  function renderAccommodations(filterDest = 'all') {
    if (!accommodationGrid) return;
    accommodationGrid.innerHTML = '';

    const filtered = filterDest === 'all' 
      ? accommodationsData 
      : accommodationsData.filter(a => a.destination.toLowerCase() === filterDest.toLowerCase());

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'accommodation-card';
      card.innerHTML = `
        <div class="accom-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='${item.fallback}';">
          <span class="accom-badge">${item.destination}</span>
        </div>
        <div class="accom-body">
          <div class="accom-header">
            <span class="star-rating">⭐ ${item.rating}</span>
            <h3 class="accom-title">${item.name}</h3>
            <span class="accom-location">📍 ${item.location}</span>
          </div>
          <p class="accom-desc">${item.description}</p>
          <div class="room-types-info"><strong>Room Types:</strong> ${item.roomTypes}</div>
          <div class="amenities-list">
            ${item.amenities.map(am => `<span class="amenity-tag">${am}</span>`).join('')}
          </div>
          <div class="accom-cta-wrap">
            <button type="button" class="btn btn-outline concierge-trigger" data-hotel="${item.name}" data-dest="${item.destination}" data-skip-step1="true">Book Now</button>
          </div>
        </div>
      `;
      accommodationGrid.appendChild(card);
    });
  }

  if (accommodationFilterBar) {
    accommodationFilterBar.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (pill) {
        accommodationFilterBar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.destFilter;
        renderAccommodations(filter);
      }
    });
    renderAccommodations('all');
  }

  // Standalone Blog Page Renderer (`blog.html`)
  function renderBlogArticles(filterCat = 'all') {
    if (!blogGrid) return;
    blogGrid.innerHTML = '';

    const filtered = filterCat === 'all'
      ? blogArticlesData
      : blogArticlesData.filter(a => a.category.toLowerCase() === filterCat.toLowerCase());

    filtered.forEach(article => {
      const card = document.createElement('article');
      card.className = 'blog-card';
      card.innerHTML = `
        <div class="blog-img-wrap">
          <img src="${article.image}" alt="${article.title}">
          <span class="blog-cat-badge">${article.category}</span>
        </div>
        <div class="blog-body">
          <span class="blog-meta">${article.date} • ${article.readTime}</span>
          <h3 class="blog-title">${article.title}</h3>
          <p class="blog-excerpt">${article.excerpt}</p>
          <button type="button" class="btn-text read-article-btn" data-article-id="${article.id}">Read Guide &rarr;</button>
        </div>
      `;
      blogGrid.appendChild(card);
    });
  }

  if (blogFilterBar) {
    blogFilterBar.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (pill) {
        blogFilterBar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.blogFilter;
        renderBlogArticles(filter);
      }
    });
    renderBlogArticles('all');
  }

  // Audio Player Handlers
  if (playMusicBtn && bgMusic) {
    playMusicBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isPlaying) {
        bgMusic.play().then(() => {
          isPlaying = true;
          if (playIcon) playIcon.textContent = '⏸';
          if (playText) playText.textContent = 'Pause Theme Music';
        }).catch(err => {
          console.log("Audio playback error:", err);
        });
      } else {
        bgMusic.pause();
        isPlaying = false;
        if (playIcon) playIcon.textContent = '▶';
        if (playText) playText.textContent = 'Play Theme Music';
      }
    });
  }
});
