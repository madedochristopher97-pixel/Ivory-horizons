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
  const openConciergeHeaderBtn = document.getElementById('openConciergeHeaderBtn');
  const heroPrimaryCta = document.getElementById('heroPrimaryCta');
  const finalCtaBtn = document.getElementById('finalCtaBtn');
  const closeConciergeBtn = document.getElementById('closeConciergeBtn');
  
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

  // Dedicated Page Views
  const pageViews = {
    home: document.getElementById('pageViewHome'),
    destination: document.getElementById('pageViewDestination'),
    journey: document.getElementById('pageViewJourney'),
    accommodation: document.getElementById('pageViewAccommodation'),
    blog: document.getElementById('pageViewBlog')
  };

  const destinationPageContent = document.getElementById('destinationPageContent');
  const journeyPageContent = document.getElementById('journeyPageContent');
  const accommodationGrid = document.getElementById('accommodationGrid');
  const accommodationFilterBar = document.getElementById('accommodationFilterBar');
  const experienceFilterBar = document.getElementById('experienceFilterBar');
  const blogGrid = document.getElementById('blogGrid');
  const blogFilterBar = document.getElementById('blogFilterBar');

  // ----------------------------------------------------
  // VIEW ROUTER & NAVIGATION
  // ----------------------------------------------------

  function showPage(pageId, targetHash = null) {
    Object.keys(pageViews).forEach(key => {
      if (pageViews[key]) {
        pageViews[key].style.display = key === pageId ? 'block' : 'none';
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'home' && targetHash) {
      setTimeout(() => {
        const elem = document.querySelector(targetHash);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  // Handle page link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-page-link');
    if (link) {
      e.preventDefault();
      const pageId = link.dataset.page || 'home';
      const href = link.getAttribute('href');
      showPage(pageId, href.startsWith('#') ? href : null);
      if (mainNav && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
      }
    }

    const backBtn = e.target.closest('.back-to-home-btn');
    if (backBtn) {
      e.preventDefault();
      showPage('home');
    }
  });

  // Sticky Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // ----------------------------------------------------
  // DATASETS
  // ----------------------------------------------------

  // Destination Metadata (Section 5 & 6 Requirements)
  const destinationData = {
    "Kenya": {
      name: "Kenya",
      image: "assets/images/dest_kenya.jpg",
      fallback: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      overview: "Track mountain gorillas or witness millions of wildebeest across the Maasai Mara. Kenya offers the quintessential African safari alongside pristine Indian Ocean coastlines.",
      coreExperiences: ["Wildlife", "Beaches", "Culture", "Adventure"],
      idealDuration: "3–12 Days",
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
      coreExperiences: ["Wildlife", "Luxury Safari", "Mountains"],
      idealDuration: "4–10 Days",
      bestTimeToVisit: "June – October & December – March",
      bestFor: "Safari Enthusiasts, Luxury Travelers, Adventure",
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
      overview: "The Pearl of Africa features lush misty emerald rainforests, rare mountain gorilla encounters, and thunderous waterfalls along the Nile.",
      coreExperiences: ["Primates", "Wildlife", "Adventure"],
      idealDuration: "4–9 Days",
      bestTimeToVisit: "June – September & December – February",
      bestFor: "Adventure, Nature Lovers, Photographers",
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
      overview: "Powder-white sand beaches, turquoise Indian Ocean waters, and ancient Swahili Stone Town heritage scented with spice.",
      coreExperiences: ["Beaches", "Romance", "Culture"],
      idealDuration: "3–7 Days",
      bestTimeToVisit: "June – October & December – February",
      bestFor: "Couples, Families, Beach Lovers",
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
      coreExperiences: ["Gorillas", "Luxury", "Culture"],
      idealDuration: "3–7 Days",
      bestTimeToVisit: "June – September & December – February",
      bestFor: "Luxury Travelers, Wildlife Lovers",
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
      coreExperiences: ["Heritage", "Culture", "Beaches"],
      idealDuration: "4–8 Days",
      bestTimeToVisit: "November – March",
      bestFor: "Diaspora Travel, Culture Seekers",
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
      coreExperiences: ["Beaches", "Luxury", "Relaxation"],
      idealDuration: "4–8 Days",
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
      coreExperiences: ["Ancient History", "Culture", "Pilgrimage"],
      idealDuration: "5–10 Days",
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
      coreExperiences: ["Cities", "Islands", "Nature"],
      idealDuration: "5–8 Days",
      bestTimeToVisit: "March – October",
      bestFor: "Families, Couples, First-time Asia Visitors",
      gallery: [
        "assets/images/dest_malaysia.jpg"
      ]
    },
    "Singapore": {
      name: "Singapore",
      image: "assets/images/dest_singapore.jpg",
      fallback: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
      overview: "A futuristic garden city gateway blending ultra-luxury skyline hospitality, Michelin dining, and family entertainment.",
      coreExperiences: ["City", "Entertainment", "Luxury"],
      idealDuration: "3–5 Days",
      bestTimeToVisit: "Year-Round",
      bestFor: "Families, Couples, Luxury Travelers",
      gallery: [
        "assets/images/dest_singapore.jpg"
      ]
    }
  };

  // Journeys Master Database (Section 7 & 8 Requirements)
  const journeysData = [
    {
      id: "mara-classic",
      name: "Classic Maasai Mara Safari",
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
        { day: "Day 1", title: "Arrival in Nairobi & Fly to Maasai Mara", details: "Private VIP transfer from Jomo Kenyatta to Wilson Airport. Fly directly into the Mara savannah. Evening game drive ending with champagne sundowners." },
        { day: "Day 2", title: "Big Five Tracking & Dawn Balloon Safari", details: "Early morning hot air balloon flight over the Mara River, followed by a bush champagne breakfast. Afternoon private 4x4 game drive tracking lions, leopards, and elephants." },
        { day: "Day 3", title: "Maasai Cultural Immersion & Bush Dinner", details: "Visit an authentic Maasai Manyatta village. Learn ancient tracking techniques and warrior customs. Dine under African stars surrounded by traditional fireside singing." },
        { day: "Days 4–5", title: "Private Wildlife Encounters & Farewell Flight", details: "Final sunrise game drive to spot rare cheetah hunts. Private charter flight back to Nairobi for departure." }
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
        { day: "Days 1–3", title: "Serengeti Migration Camps", details: "Fly to Northern Serengeti mobile camps positioned along the migration corridor. Watch vast herds gather along riverbanks." },
        { day: "Days 4–6", title: "Mara River Crossings", details: "Cross into Kenya's Maasai Mara. Spend days positioned at prime crossing points with expert wildlife guides." },
        { day: "Days 7–10", title: "Private Conservancy Sanctuary", details: "Retreat to a private conservancy for nighttime game drives, bush walks, and relaxation." }
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
        { day: "Day 1", title: "Kigali Arrival & Scenic Helicopter Transfer", details: "Meet-and-greet at Kigali Airport. Scenic helicopter flight over mist-shrouded peaks to Volcanoes National Park." },
        { day: "Day 2", title: "First Mountain Gorilla Trek", details: "Guided trek into Volcanoes Park with expert rangers. Spend one unforgettable hour observing a mountain gorilla family." },
        { day: "Day 3", title: "Golden Monkey Tracking & Cultural Visit", details: "Morning tracking of rare golden monkeys, followed by a visit to the Ellen DeGeneres Campus of the Dian Fossey Gorilla Fund." },
        { day: "Days 4–6", title: "Bwindi Impenetrable Forest Trek (Uganda)", details: "Cross into Bwindi, Uganda for a second gorilla trek in ancient primary forest. Relax at an eco-lodge overlooking the canopy." }
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
        { day: "Days 1–5", title: "Maasai Mara Wilderness Safari", details: "5 days of private game drives, sundowners, and luxury tented stay in the Mara." },
        { day: "Days 6–10", title: "Zanzibar Coastal Sanctuary", details: "Direct fly-in to Zanzibar. Stay in a private oceanfront pool villa with spa treatments, dhow cruises, and spice garden tours." }
      ],
      included: ["Domestic and inter-country flights", "Luxury bush & beach accommodations", "All meals & drinks", "Private safari & ocean activities"],
      excluded: ["International flights", "Personal purchases"],
      faqs: [
        { q: "Can this journey be customized for a honeymoon?", a: "Absolutely. We include special romantic touches, private beach dinners, and villa upgrades." }
      ]
    }
  ];

  // Accommodations Database (Section 10 Requirements)
  const accommodationsData = [
    {
      name: "Angama Mara",
      destination: "Kenya",
      location: "Maasai Mara, Kenya",
      rating: "5-Star Ultra-Luxury",
      roomTypes: "Glass-fronted Tented Suites",
      amenities: ["Private Airfield", "Infinity Pool", "Personal Butler", "Game Drives"],
      image: "assets/images/journey_kenya.jpg",
      fallback: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      description: "Perched high on the rim of the Great Rift Valley overlooking the Maasai Mara, offering breathtaking views and unmatched luxury."
    },
    {
      name: "Giraffe Manor",
      destination: "Kenya",
      location: "Nairobi, Kenya",
      rating: "5-Star Icon",
      roomTypes: "Historic Manor Suites",
      amenities: ["Giraffe Breakfast", "Private Gardens", "Fine Dining", "Spa Services"],
      image: "assets/images/Curated Modalities/Safari Adventure.jpg",
      fallback: "assets/images/safari_adventure.jpg",
      description: "An iconic boutique hotel set in 12 acres of private land within 140 acres of indigenous forest, home to resident Rothschild's giraffes."
    },
    {
      name: "Four Seasons Safari Lodge Serengeti",
      destination: "Tanzania",
      location: "Serengeti National Park, Tanzania",
      rating: "5-Star Luxury",
      roomTypes: "Savannah Rooms & Private Pool Villas",
      amenities: ["Waterhole View Pool", "Full-service Spa", "Kijana Kids Club", "Bush Dinners"],
      image: "assets/images/Handpicked Lands/Tanzania.jpg",
      fallback: "assets/images/dest_tanzania.jpg",
      description: "Deep within the Serengeti National Park, featuring elevated walkways and a watering hole visited by wildlife throughout the day."
    },
    {
      name: "Ngorongoro Crater Lodge",
      destination: "Tanzania",
      location: "Ngorongoro Conservation Area, Tanzania",
      rating: "5-Star Architectural Marvel",
      roomTypes: "Chateau-style Stilted Suites",
      amenities: ["Personal Butler", "Crater View Deck", "Fine Wine Cellar", "Private Guides"],
      image: "assets/images/dest_tanzania.jpg",
      fallback: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      description: "Dramatic architecture combining Versailles opulence with African craft on the rim of the ancient Ngorongoro Crater."
    },
    {
      name: "Sanctuary Gorilla Forest Camp",
      destination: "Uganda",
      location: "Bwindi Impenetrable Forest, Uganda",
      rating: "5-Star Eco-Luxury",
      roomTypes: "Luxury Tented Suites",
      amenities: ["Gorilla Visits in Camp", "Forest Spa", "Campfire Lounge", "Private Dining"],
      image: "assets/images/Handpicked Lands/Uganda.jpg",
      fallback: "assets/images/dest_uganda.jpg",
      description: "Nestled deep inside Bwindi Impenetrable Forest, where wild gorilla families occasionally wander right into camp."
    },
    {
      name: "One&Only Gorillas' Nest",
      destination: "Rwanda",
      location: "Volcanoes National Park, Rwanda",
      rating: "5-Star Sanctuary",
      roomTypes: "Forest Lodges & Treehouse Suites",
      amenities: ["Private Pool", "World-Class Spa", "Helipad", "Chef's Garden Dining"],
      image: "assets/images/Handpicked Lands/Rwanda.jpg",
      fallback: "assets/images/dest_rwanda.jpg",
      description: "Cradled by eucalyptus trees at the foothills of the Virunga Volcanoes, offering an intimate haven of mountain luxury."
    },
    {
      name: "The Residence Zanzibar",
      destination: "Zanzibar",
      location: "Mustaphi, Zanzibar",
      rating: "5-Star Oceanfront",
      roomTypes: "Luxury Ocean Pool Villas",
      amenities: ["Private Butler", "Infinity Pool", "Private Beach", "Spa & Wellness"],
      image: "assets/images/dest_zanzibar.jpg",
      fallback: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
      description: "Set among 32 hectares of tropical gardens alongside a mile-long white sand beach with elegant private pool villas."
    },
    {
      name: "Royal Palm Beachcomber Luxury",
      destination: "Mauritius",
      location: "Grand Baie, Mauritius",
      rating: "5-Star Palace",
      roomTypes: "Ocean Suites & Royal Villa",
      amenities: ["Helipad", "Yacht Transfers", "3 Gourmet Restaurants", "Spa by Clarins"],
      image: "assets/images/dest_mauritius.jpg",
      fallback: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      description: "The peak of Mauritian luxury on a sheltered beach in Grand Baie, renowned for discreet service and fine gastronomy."
    },
    {
      name: "Sofitel Legend Old Cataract",
      destination: "Egypt",
      location: "Aswan, Egypt",
      rating: "5-Star Historic Heritage",
      roomTypes: "Nile View Suites & Heritage Rooms",
      amenities: ["Nile Terrace Bar", "Infinity Pool", "Spa & Wellness", "Butler Service"],
      image: "assets/images/dest_egypt.jpg",
      fallback: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
      description: "A Victorian palace built on a pink granite cliff along the banks of the Nile, where Agatha Christie penned Death on the Nile."
    },
    {
      name: "Kempinski Hotel Gold Coast City",
      destination: "Ghana",
      location: "Accra, Ghana",
      rating: "5-Star City Resort",
      roomTypes: "Executive Suites & Presidential Villa",
      amenities: ["Resort Pool", "Luxury Spa", "Fine Dining", "Concierge Service"],
      image: "assets/images/Handpicked Lands/Accra Ghana.jpg",
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
      image: "assets/images/dest_malaysia.jpg",
      fallback: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
      description: "Embedded within an ancient rainforest opening onto a secluded crescent bay, offering serene natural luxury."
    },
    {
      name: "Raffles Hotel Singapore",
      destination: "Singapore",
      location: "Beach Road, Singapore",
      rating: "5-Star Heritage Icon",
      roomTypes: "Grand Colonial Suites",
      amenities: ["Private Butler", "Long Bar", "Raffles Spa", "Michelin Dining"],
      image: "assets/images/dest_singapore.jpg",
      fallback: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      description: "An iconic landmark offering legendary colonial luxury, unblemished hospitality, and timeless Singaporean charm."
    }
  ];

  // Blog Articles Database (Section 12 Requirements)
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
  // CONCIERGE MODAL & CONTEXT-AWARE WIZARD (SECTIONS 3, 4, 9)
  // ----------------------------------------------------

  let currentStep = 1;
  const totalSteps = 4;

  const stepTitles = {
    1: {
      title: "What type of trip are you imagining?",
      subtitle: "Select the experience that best captures your dream escape."
    },
    2: {
      title: "Which Iconic Horizons speak to you?",
      subtitle: "Choose one or more destinations you wish to explore."
    },
    3: {
      title: "Tell us about your travel parameters",
      subtitle: "Specify your dates, guests, room requirements, and budget."
    },
    4: {
      title: "Where should your private curator reach out?",
      subtitle: "Provide your details to receive your personalized proposal."
    }
  };

  // Open & Pre-fill Concierge Modal with Context-Aware Entry Points
  function openConcierge(preselectType = null, preselectDest = null, preselectJourney = null, preselectHotel = null, skipStep1 = false) {
    if (preselectType) {
      const radio = conciergeForm.querySelector(`input[name="journeyType"][value="${preselectType}"]`);
      if (radio) radio.checked = true;
    }

    if (preselectDest) {
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

    // Context-Aware Entry: Skip Step 1 if journey/dest already known
    currentStep = skipStep1 ? 3 : 1;
    updateStepView();

    if (conciergeModal.showModal) {
      conciergeModal.showModal();
    } else {
      conciergeModal.setAttribute('open', 'true');
    }
  }

  function closeConcierge() {
    if (conciergeModal.close) {
      conciergeModal.close();
    } else {
      conciergeModal.removeAttribute('open');
    }
  }

  if (openConciergeHeaderBtn) openConciergeHeaderBtn.addEventListener('click', () => openConcierge());
  if (heroPrimaryCta) heroPrimaryCta.addEventListener('click', () => openConcierge());
  if (finalCtaBtn) finalCtaBtn.addEventListener('click', () => openConcierge());
  if (closeConciergeBtn) closeConciergeBtn.addEventListener('click', closeConcierge);
  if (closeConfirmationBtn) closeConfirmationBtn.addEventListener('click', closeConcierge);

  // Concierge trigger delegation across site
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.concierge-trigger');
    if (trigger) {
      e.preventDefault();
      const type = trigger.dataset.type || null;
      const dest = trigger.dataset.dest || null;
      const journey = trigger.dataset.journey || null;
      const hotel = trigger.dataset.hotel || null;
      const skip = trigger.dataset.skipStep1 === 'true';
      openConcierge(type, dest, journey, hotel, skip);
    }
  });

  // Step View Updates & Back Navigation (Requirement 3)
  function updateStepView() {
    document.querySelectorAll('.concierge-step').forEach(step => {
      step.classList.remove('step-active');
      step.style.display = 'none';
    });

    if (currentStep <= totalSteps) {
      confirmationStep.style.display = 'none';
      modalFooterNav.style.display = 'flex';
      
      const activeStep = document.querySelector(`.concierge-step[data-step="${currentStep}"]`);
      if (activeStep) {
        activeStep.classList.add('step-active');
        activeStep.style.display = 'block';
      }

      stepBadge.textContent = `Step ${currentStep} of ${totalSteps}`;
      modalTitle.textContent = stepTitles[currentStep].title;
      modalSubtitle.textContent = stepTitles[currentStep].subtitle;

      progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

      // Show Back button on step 2, 3, and 4
      prevStepBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
      nextStepBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
      submitConciergeBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
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

  // Form Submission & WhatsApp Link Generator (Requirement 9)
  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName')?.value || 'Valued';
      const middleName = document.getElementById('middleName')?.value || '';
      const lastName = document.getElementById('lastName')?.value || 'Guest';
      const fullName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
      
      const guestEmail = document.getElementById('guestEmail')?.value || '';
      const guestPhone = document.getElementById('guestPhone')?.value || '';
      const contactPref = document.getElementById('contactPreference')?.value || 'WhatsApp Concierge';
      
      const journeyType = conciergeForm.querySelector('input[name="journeyType"]:checked')?.value || 'Bespoke Experience';
      const destinations = Array.from(conciergeForm.querySelectorAll('input[name="destination"]:checked')).map(cb => cb.value);
      const travelDates = document.getElementById('travelDates')?.value || 'Flexible';
      const guests = document.getElementById('travelersCount')?.value || '2 Guests';
      const rooms = document.getElementById('roomsCount')?.value || '1 Room';
      const roomType = document.getElementById('roomType')?.value || 'Double Room';
      const budget = document.getElementById('budgetRange')?.value || '$10,000 - $25,000 USD';
      const specialRequests = document.getElementById('specialPreferences')?.value || 'None specified';

      const selectedDestStr = destinations.length ? destinations.join(', ') : 'Curated Recommendation';

      // Render Summary Recap
      summaryRecap.innerHTML = `
        <p><strong>Guest Name:</strong> ${fullName}</p>
        <p><strong>Contact:</strong> ${guestEmail} • ${guestPhone} (${contactPref})</p>
        <p><strong>Journey Style:</strong> ${journeyType}</p>
        <p><strong>Destinations:</strong> ${selectedDestStr}</p>
        <p><strong>Travel Dates:</strong> ${travelDates} • <strong>Guests:</strong> ${guests}</p>
        <p><strong>Room Setup:</strong> ${rooms} (${roomType})</p>
        <p><strong>Investment:</strong> ${budget}</p>
        <p><strong>Special Requests:</strong> ${specialRequests}</p>
      `;

      // Build WhatsApp Pre-filled URL with complete details
      const waText = `Hello Viv, I would like to book a trip with Ivory Horizons:
- Name: ${fullName}
- Contact: ${guestPhone} (${guestEmail})
- Destination: ${selectedDestStr}
- Journey Style: ${journeyType}
- Travel Dates: ${travelDates}
- Number of Guests: ${guests}
- Number of Rooms: ${rooms}
- Room Type: ${roomType}
- Budget: ${budget}
- Preferred Contact: ${contactPref}
- Special Requests: ${specialRequests}`;

      const whatsappUrl = `https://wa.me/254740199975?text=${encodeURIComponent(waText)}`;

      if (whatsappCtaBtn) {
        whatsappCtaBtn.onclick = () => {
          window.open(whatsappUrl, '_blank');
        };
      }

      // Display Confirmation State
      document.querySelectorAll('.concierge-step').forEach(step => step.style.display = 'none');
      modalFooterNav.style.display = 'none';
      stepBadge.textContent = 'Request Received';
      modalTitle.textContent = 'Thank You';
      modalSubtitle.textContent = 'Your private concierge ticket has been created.';
      progressFill.style.width = '100%';
      
      confirmationStep.style.display = 'block';
    });
  }

  // ----------------------------------------------------
  // DEDICATED DESTINATION FULL PAGE VIEW (SECTION 5)
  // ----------------------------------------------------

  function renderDestinationPage(destName) {
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
                  <button type="button" class="btn btn-primary view-itinerary-trigger" data-journey-id="${j.id}">View Full Itinerary</button>
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
                    <button type="button" class="btn btn-outline concierge-trigger" data-hotel="${a.name}" data-dest="${a.destination}" data-skip-step1="true">Book Through Ivory Horizons</button>
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

    showPage('destination');
  }

  // Trigger Explore Destination Full Page
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.explore-dest-trigger');
    if (trigger) {
      e.preventDefault();
      const destName = trigger.dataset.dest || 'Kenya';
      renderDestinationPage(destName);
    }
  });

  // ----------------------------------------------------
  // DEDICATED JOURNEY DETAILS FULL PAGE VIEW (SECTIONS 8 & 9)
  // ----------------------------------------------------

  function renderJourneyPage(journeyId) {
    const journey = journeysData.find(j => j.id === journeyId || j.name.toLowerCase() === journeyId.toLowerCase()) || journeysData[0];

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
                <div class="faq-item">
                  <strong>Q: ${faq.q}</strong>
                  <p>A: ${faq.a}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="journey-page-cta-box text-center">
          <h2>Ready To Plan This Journey?</h2>
          <button type="button" class="btn btn-primary btn-large plan-this-journey-btn" data-journey="${journey.name}" data-dest="${journey.destination}">Plan This Journey</button>
        </div>
      </div>
    `;

    // Bind Plan This Journey CTA
    const planBtn = journeyPageContent.querySelector('.plan-this-journey-btn');
    if (planBtn) {
      planBtn.addEventListener('click', () => {
        openConcierge(null, journey.destination, journey.name, null, true);
      });
    }

    showPage('journey');
  }

  // Trigger View Full Itinerary Full Page
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.view-itinerary-trigger');
    if (trigger) {
      e.preventDefault();
      const journeyId = trigger.dataset.journeyId || 'mara-classic';
      renderJourneyPage(journeyId);
    }
  });

  // ----------------------------------------------------
  // DEDICATED ACCOMMODATION FULL PAGE (SECTION 10)
  // ----------------------------------------------------

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
            <button type="button" class="btn btn-outline concierge-trigger" data-hotel="${item.name}" data-dest="${item.destination}" data-skip-step1="true">Book Through Ivory Horizons</button>
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
  }

  renderAccommodations('all');

  // ----------------------------------------------------
  // DEDICATED BLOG FULL PAGE (SECTION 12)
  // ----------------------------------------------------

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
  }

  renderBlogArticles('all');

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
