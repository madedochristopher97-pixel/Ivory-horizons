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

  // New Modal Elements
  const itineraryModal = document.getElementById('itineraryModal');
  const closeItineraryBtn = document.getElementById('closeItineraryBtn');
  const itineraryModalContent = document.getElementById('itineraryModalContent');

  const destinationModal = document.getElementById('destinationModal');
  const closeDestinationBtn = document.getElementById('closeDestinationBtn');
  const destinationModalContent = document.getElementById('destinationModalContent');

  const accommodationGrid = document.getElementById('accommodationGrid');
  const accommodationFilterBar = document.getElementById('accommodationFilterBar');
  const experienceFilterBar = document.getElementById('experienceFilterBar');

  // ----------------------------------------------------
  // DATASETS
  // ----------------------------------------------------

  // Destination Metadata (Section 6 Requirements)
  const destinationData = {
    "Kenya": {
      name: "Kenya",
      image: "assets/images/dest_kenya.jpg",
      fallback: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      overview: "Track mountain gorillas or witness millions of wildebeest across the Maasai Mara. Kenya offers the quintessential African safari alongside pristine Indian Ocean coastlines.",
      coreExperiences: ["Wildlife", "Beaches", "Culture", "Adventure"],
      idealDuration: "3–12 Days",
      bestFor: "Families, Groups, Honeymooners",
      journeys: ["Classic Maasai Mara Safari", "Amboseli, Lake Nakuru & Maasai Mara Safari", "Samburu Wildlife Adventure", "Laikipia Luxury Safari", "Great Migration Safari", "Tsavo East & West Safari", "Luxury Fly-in Safari", "Diani Beach Escape", "Lamu Getaway", "Kenya Bush & Beach"],
      accommodations: ["Angama Mara", "Giraffe Manor Nairobi", "Hemingways Watamu", "Segera Retreat Laikipia"]
    },
    "Tanzania": {
      name: "Tanzania",
      image: "assets/images/Handpicked Lands/Tanzania.jpg",
      fallback: "assets/images/dest_tanzania.jpg",
      overview: "Home to the boundless Serengeti, Ngorongoro Crater, and snow-capped Mount Kilimanjaro. A sanctuary of raw wilderness and fly-in luxury.",
      coreExperiences: ["Wildlife", "Luxury Safari", "Mountains"],
      idealDuration: "4–10 Days",
      bestFor: "Safari Enthusiasts, Luxury Travelers, Adventure",
      journeys: ["Serengeti Migration Safari", "Ngorongoro Crater Experience", "Tarangire & Lake Manyara Safari", "Southern Tanzania Safari", "Tanzania Fly-in Luxury Safari"],
      accommodations: ["Four Seasons Safari Lodge Serengeti", "Ngorongoro Crater Lodge", "Singita Grumeti Camps", "Tarangire Treetops"]
    },
    "Uganda": {
      name: "Uganda",
      image: "assets/images/Handpicked Lands/Uganda.jpg",
      fallback: "assets/images/dest_uganda.jpg",
      overview: "The Pearl of Africa features lush misty emerald rainforests, rare mountain gorilla encounters, and thunderous waterfalls along the Nile.",
      coreExperiences: ["Primates", "Wildlife", "Adventure"],
      idealDuration: "4–9 Days",
      bestFor: "Adventure, Nature Lovers, Photographers",
      journeys: ["Queen Elizabeth National Park Safari", "Murchison Falls Safari", "Uganda Primates & Wildlife Combination", "Gorilla Trekking Adventure", "Chimpanzee Tracking"],
      accommodations: ["Sanctuary Gorilla Forest Camp", "Clouds Mountain Gorilla Lodge", "Paraa Safari Lodge", "Ndali Lodge Kibale"]
    },
    "Zanzibar": {
      name: "Zanzibar",
      image: "assets/images/dest_zanzibar.jpg",
      fallback: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
      overview: "Powder-white sand beaches, turquoise Indian Ocean waters, and ancient Swahili Stone Town heritage scented with spice.",
      coreExperiences: ["Beaches", "Romance", "Culture"],
      idealDuration: "3–7 Days",
      bestFor: "Couples, Families, Beach Lovers",
      journeys: ["Beach Honeymoon Package", "Luxury Beach Holiday", "Luxury All-Inclusive Holiday"],
      accommodations: ["The Residence Zanzibar", "Baraza Resort & Spa", "Zawadi Hotel Zanzibar", "Park Hyatt Zanzibar"]
    },
    "Rwanda": {
      name: "Rwanda",
      image: "assets/images/Handpicked Lands/Rwanda.jpg",
      fallback: "assets/images/dest_rwanda.jpg",
      overview: "Land of a thousand hills, pioneering conservation, and architectural eco-luxury lodges set against misty volcanic peaks.",
      coreExperiences: ["Gorillas", "Luxury", "Culture"],
      idealDuration: "3–7 Days",
      bestFor: "Luxury Travelers, Wildlife Lovers",
      journeys: ["Gorilla Trekking Experience", "Rwanda & Uganda Gorilla Combo", "Luxury Rwanda Escape", "Rwanda Cultural Experience"],
      accommodations: ["One&Only Gorillas' Nest", "Bisate Lodge Volcanoes", "Singita Kwitonda Lodge", "The Retreat by Heaven Kigali"]
    },
    "Ghana": {
      name: "Ghana",
      image: "assets/images/Handpicked Lands/Accra Ghana.jpg",
      fallback: "assets/images/dest_ghana.jpg",
      overview: "Vibrant coastal heritage, rich West African history, Ashanti kingdom traditions, and soulful cultural rhythms.",
      coreExperiences: ["Heritage", "Culture", "Beaches"],
      idealDuration: "4–8 Days",
      bestFor: "Diaspora Travel, Culture Seekers",
      journeys: ["Beach & Heritage Holiday", "Luxury Ghana Experience", "Ashanti Kingdom Cultural Tour", "Afro-Future in Ghana"],
      accommodations: ["Kempinski Hotel Gold Coast City Accra", "Villa Monticello Accra", "Lou Moon Eco Luxury Resort", "Zaina Lodge Mole"]
    },
    "Mauritius": {
      name: "Mauritius",
      image: "assets/images/dest_mauritius.jpg",
      fallback: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      overview: "Dramatic volcanic peaks, vibrant coral lagoons, and world-class luxury beachfront resorts offering refined Indian Ocean hospitality.",
      coreExperiences: ["Beaches", "Luxury", "Relaxation"],
      idealDuration: "4–8 Days",
      bestFor: "Honeymooners, Families, Luxury Travelers",
      journeys: ["Luxury Beach Escape", "Family Resort Escape", "Honeymoon Getaway", "Adventure & Nature Tours"],
      accommodations: ["Royal Palm Beachcomber Luxury", "LUX* Grand Baie", "Four Seasons Resort Mauritius", "One&Only Le Saint Géran"]
    },
    "Egypt": {
      name: "Egypt",
      image: "assets/images/dest_egypt.jpg",
      fallback: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
      overview: "Timeless wonders along the Nile River, ancient pharaonic monuments, private desert luxury, and vibrant historical markets.",
      coreExperiences: ["Ancient History", "Culture", "Pilgrimage"],
      idealDuration: "5–10 Days",
      bestFor: "History Lovers, Couples, Families",
      journeys: ["Egypt Honeymoon Package", "Luxury Egypt Highlights", "Pilgrimage Trip"],
      accommodations: ["Marriott Mena House Cairo", "Sofitel Legend Old Cataract Aswan", "Four Seasons Hotel Cairo at Nile Plaza", "The Oberoi Sahl Hasheesh"]
    },
    "Malaysia": {
      name: "Malaysia",
      image: "assets/images/dest_malaysia.jpg",
      fallback: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
      overview: "Lush ancient rainforests, exotic wildlife sanctuaries, and serene tropical island archipelagos for global explorers.",
      coreExperiences: ["Cities", "Islands", "Nature"],
      idealDuration: "5–8 Days",
      bestFor: "Families, Couples, First-time Asia Visitors",
      journeys: ["Malaysia Family Holidays", "Kuala Lumpur City Tour"],
      accommodations: ["The Datai Langkawi", "Four Seasons Resort Langkawi", "Mandarin Oriental Kuala Lumpur", "Pangkor Laut Resort"]
    },
    "Singapore": {
      name: "Singapore",
      image: "assets/images/dest_singapore.jpg",
      fallback: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
      overview: "A futuristic garden city gateway blending ultra-luxury skyline hospitality, Michelin dining, and family entertainment.",
      coreExperiences: ["City", "Entertainment", "Luxury"],
      idealDuration: "3–5 Days",
      bestFor: "Families, Couples, Luxury Travelers",
      journeys: ["Singapore City Explorer"],
      accommodations: ["Raffles Hotel Singapore", "Marina Bay Sands", "Capella Singapore Sentosa", "The Ritz-Carlton Millenia"]
    }
  };

  // Journeys Master Database (Sections 2 & 3 Requirements)
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
      excluded: ["International airfare", "Visa fees", "Personal travel insurance"]
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
      excluded: ["International flights", "Staff gratuities"]
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
      excluded: ["International flights", "Personal items"]
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
      excluded: ["International flights", "Personal purchases"]
    },
    {
      id: "diani-escape",
      name: "Diani Beach Escape",
      destination: "Kenya",
      location: "Kenya • Diani",
      category: "Beach",
      duration: "4–7 Days",
      bestFor: "Beach Lovers • Families • Couples",
      tags: ["Beach", "Relaxation", "Luxury"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      fallback: "assets/images/beach_escape.jpg",
      description: "Pristine white sand, crystal waters, and private beachfront luxury along Kenya's awarded south coast.",
      bestSeason: "Year-Round",
      highlights: ["Private ocean villa with chef", "Kite surfing and dhow excursions", "Seafood dining on sandbars"],
      itinerary: [{ day: "Days 1–5", title: "Diani Beach Relaxation", details: "Unwind at a luxury beach resort with private butler service, snorkeling, and sunset cruises." }],
      included: ["Resort stay", "All meals", "Airport transfers"],
      excluded: ["Flights"]
    },
    {
      id: "serengeti-migration",
      name: "Serengeti Migration Safari",
      destination: "Tanzania",
      location: "Tanzania • Serengeti",
      category: "Safari",
      duration: "5–8 Days",
      bestFor: "Safari Enthusiasts • Couples",
      tags: ["Safari", "Wildlife", "Luxury"],
      image: "assets/images/Handpicked Lands/Tanzania.jpg",
      fallback: "assets/images/dest_tanzania.jpg",
      description: "Explore the vast plains of the Serengeti, following the endless herds of wildebeest and predators.",
      bestSeason: "December – March & July – October",
      highlights: ["Luxury fly-in safari camp", "Private Serengeti game drives", "Sunrise balloon ride"],
      itinerary: [{ day: "Days 1–6", title: "Serengeti Game Exploration", details: "Daily private safari tracking lion pride hunts, elephant herds, and migration crossings." }],
      included: ["Fly-in transfers", "Camp stay", "Meals & spirits"],
      excluded: ["International airfare"]
    },
    {
      id: "zanzibar-honeymoon",
      name: "Beach Honeymoon Package",
      destination: "Zanzibar",
      location: "Zanzibar • Stone Town & Coast",
      category: "Honeymoon",
      duration: "5–8 Days",
      bestFor: "Honeymooners • Couples",
      tags: ["Honeymoon", "Beach", "Romance"],
      image: "assets/images/dest_zanzibar.jpg",
      fallback: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
      description: "Romantic oceanfront villas, couples candlelit dinners on private sandbanks, and spice island tranquility.",
      bestSeason: "Year-Round",
      highlights: ["Couples massage by the sea", "Private dhow sunset voyage", "Candlelit beach dining"],
      itinerary: [{ day: "Days 1–6", title: "Honeymoon Bliss", details: "Exclusive privacy, ocean villa, private butler, and personalized island tours." }],
      included: ["Villa stay", "All inclusive dining", "Private transfers"],
      excluded: ["Flights"]
    },
    {
      id: "mauritius-luxury",
      name: "Luxury Beach Escape",
      destination: "Mauritius",
      location: "Mauritius",
      category: "Luxury",
      duration: "5–8 Days",
      bestFor: "Luxury Travelers • Couples • Families",
      tags: ["Luxury", "Beach", "Resort"],
      image: "assets/images/dest_mauritius.jpg",
      fallback: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      description: "Indulge in 5-star beachfront resorts surrounded by turquoise lagoons, volcanic backdrops, and world-class culinary art.",
      bestSeason: "May – December",
      highlights: ["Private pool villa", "Catamaran reef sailing", "Helicopter island tour"],
      itinerary: [{ day: "Days 1–7", title: "Mauritian Luxury Stay", details: "Relax in total privacy with world-class spa facilities and fine dining." }],
      included: ["Luxury resort stay", "Half-board dining", "Private transfers"],
      excluded: ["International flights"]
    },
    {
      id: "egypt-highlights",
      name: "Luxury Egypt Highlights",
      destination: "Egypt",
      location: "Egypt • Cairo & Nile",
      category: "Culture",
      duration: "7–10 Days",
      bestFor: "History Seekers • Families • Culture Lovers",
      tags: ["Culture", "History", "Luxury"],
      image: "assets/images/dest_egypt.jpg",
      fallback: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
      description: "Private Egyptologist-guided exploration of the Pyramids of Giza, Sphinx, Luxor temples, and a private dahabiya Nile river cruise.",
      bestSeason: "October – April",
      highlights: ["Private entry to Pyramids & King Tut museum", "Luxury Nile cruise", "Aswan & Abu Simbel flight"],
      itinerary: [{ day: "Days 1–8", title: "Pharaonic Wonders Expedition", details: "Explore Cairo's ancient treasures, cruise the Nile in private luxury, and visit Valley of the Kings." }],
      included: ["Private Egyptologist", "5-star hotel & Nile cruise", "Domestic flights", "All permits"],
      excluded: ["International flights"]
    },
    {
      id: "ghana-heritage",
      name: "Beach & Heritage Holiday",
      destination: "Ghana",
      location: "Ghana • Accra & Cape Coast",
      category: "Culture",
      duration: "6–9 Days",
      bestFor: "Diaspora Travel • Culture Seekers • Families",
      tags: ["Culture", "Heritage", "Beach"],
      image: "assets/images/Handpicked Lands/Accra Ghana.jpg",
      fallback: "assets/images/dest_ghana.jpg",
      description: "Reconnect with ancestral roots, explore historic coastal fortresses, Kumasi royal kingdoms, and vibrant Accra culinary culture.",
      bestSeason: "November – March",
      highlights: ["Cape Coast Castle ancestral tour", "Ashanti Kingdom royal palace visit", "Accra art & gastronomy tour"],
      itinerary: [{ day: "Days 1–7", title: "Ghana Cultural Rhythms", details: "Accra city discovery, Cape Coast historical exploration, and coastal eco-resort relaxation." }],
      included: ["Private guide & driver", "Boutique hotel stays", "Entry tickets & tours"],
      excluded: ["International flights"]
    },
    {
      id: "singapore-city",
      name: "Singapore City Explorer",
      destination: "Singapore",
      location: "Singapore",
      category: "Family",
      duration: "3–5 Days",
      bestFor: "Families • Couples • City Lovers",
      tags: ["City", "Luxury", "Family"],
      image: "assets/images/dest_singapore.jpg",
      fallback: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
      description: "Experience futuristic gardens, Michelin-starred street food, luxury shopping, and family entertainment in Singapore.",
      bestSeason: "Year-Round",
      highlights: ["Gardens by the Bay VIP pass", "Raffles Hotel high tea", "Sentosa Island private tour"],
      itinerary: [{ day: "Days 1–4", title: "Garden City Discovery", details: "Explore iconic attractions, private yacht cruising, and luxury skyline dining." }],
      included: ["5-star hotel stay", "Private transfers", "VIP access passes"],
      excluded: ["Flights"]
    }
  ];

  // Accommodations Database (Section 5 Requirements)
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

  // ----------------------------------------------------
  // CONCIERGE MODAL SYSTEM (REFINED)
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

  // Sticky Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
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

  // Open & Pre-fill Concierge Modal
  function openConcierge(preselectType = null, preselectDest = null, preselectJourney = null, preselectHotel = null) {
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

    currentStep = 1;
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
      openConcierge(type, dest, journey, hotel);
    }
  });

  // Step View Updates
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

  // Form Submission & WhatsApp Link Generation (Section 1 Requirements)
  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const journeyType = conciergeForm.querySelector('input[name="journeyType"]:checked')?.value || 'Bespoke Experience';
      const destinations = Array.from(conciergeForm.querySelectorAll('input[name="destination"]:checked')).map(cb => cb.value);
      const travelDates = document.getElementById('travelDates')?.value || 'Flexible';
      const guests = document.getElementById('travelersCount')?.value || '2 Guests';
      const rooms = document.getElementById('roomsCount')?.value || '1 Room';
      const roomType = document.getElementById('roomType')?.value || 'Double Room';
      const budget = document.getElementById('budgetRange')?.value || '$10,000 - $25,000 USD';
      const specialRequests = document.getElementById('specialPreferences')?.value || 'None specified';
      const guestName = document.getElementById('guestName')?.value || 'Valued Guest';

      const selectedDestStr = destinations.length ? destinations.join(', ') : 'Curated Recommendation';

      // Render Summary Recap
      summaryRecap.innerHTML = `
        <p><strong>Guest:</strong> ${guestName}</p>
        <p><strong>Journey Style:</strong> ${journeyType}</p>
        <p><strong>Destinations:</strong> ${selectedDestStr}</p>
        <p><strong>Dates:</strong> ${travelDates} • <strong>Guests:</strong> ${guests}</p>
        <p><strong>Rooms:</strong> ${rooms} (${roomType})</p>
        <p><strong>Investment:</strong> ${budget}</p>
        <p><strong>Special Notes:</strong> ${specialRequests}</p>
      `;

      // Build WhatsApp Pre-filled URL
      const waText = `Hello Viv, I would like to book a trip with Ivory Horizons:
- Destination: ${selectedDestStr}
- Selected Journey: ${journeyType}
- Travel Dates: ${travelDates}
- Number of Guests: ${guests}
- Number of Rooms: ${rooms}
- Room Type: ${roomType}
- Budget: ${budget}
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
  // INTELLIGENT EXPERIENCE CATEGORIES & FILTERING (SECTION 2)
  // ----------------------------------------------------

  function filterExperiences(category) {
    if (experienceFilterBar) {
      experienceFilterBar.querySelectorAll('.filter-pill').forEach(pill => {
        if (pill.dataset.filter.toLowerCase() === category.toLowerCase()) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }

    const journeyCards = document.querySelectorAll('.journey-featured-card');
    journeyCards.forEach(card => {
      const cardCategory = card.dataset.category || '';
      if (category.toLowerCase() === 'all' || cardCategory.toLowerCase().includes(category.toLowerCase())) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    const destCards = document.querySelectorAll('.destination-card');
    destCards.forEach(card => {
      const destName = card.querySelector('.dest-title')?.textContent.trim() || '';
      const destObj = destinationData[destName];
      if (category.toLowerCase() === 'all') {
        card.style.display = 'flex';
      } else if (destObj) {
        const matchesCategory = destObj.coreExperiences.some(exp => exp.toLowerCase().includes(category.toLowerCase())) ||
                                (category.toLowerCase() === 'safari' && (destName === 'Kenya' || destName === 'Tanzania' || destName === 'Uganda' || destName === 'Rwanda')) ||
                                (category.toLowerCase() === 'beach' && (destName === 'Kenya' || destName === 'Zanzibar' || destName === 'Mauritius' || destName === 'Ghana')) ||
                                (category.toLowerCase() === 'honeymoon' && (destName === 'Kenya' || destName === 'Zanzibar' || destName === 'Mauritius' || destName === 'Egypt')) ||
                                (category.toLowerCase() === 'family' && (destName === 'Kenya' || destName === 'Mauritius' || destName === 'Malaysia' || destName === 'Singapore')) ||
                                (category.toLowerCase() === 'luxury' && (destName === 'Kenya' || destName === 'Tanzania' || destName === 'Rwanda' || destName === 'Ghana' || destName === 'Egypt' || destName === 'Zanzibar' || destName === 'Mauritius')) ||
                                (category.toLowerCase() === 'adventure' && (destName === 'Kenya' || destName === 'Uganda' || destName === 'Tanzania' || destName === 'Mauritius')) ||
                                (category.toLowerCase() === 'culture' && (destName === 'Kenya' || destName === 'Rwanda' || destName === 'Ghana' || destName === 'Egypt' || destName === 'Malaysia' || destName === 'Singapore'));
        card.style.display = matchesCategory ? 'flex' : 'none';
      }
    });

    const journeysSection = document.getElementById('journeys');
    if (journeysSection) {
      journeysSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (experienceFilterBar) {
    experienceFilterBar.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (pill) {
        const cat = pill.dataset.filter;
        filterExperiences(cat);
      }
    });
  }

  document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const btnLink = card.querySelector('.card-link');
      const cat = btnLink ? btnLink.dataset.type : 'all';
      filterExperiences(cat);
    });
  });

  // ----------------------------------------------------
  // FULL ITINERARY VIEW MODAL (SECTION 3 & 4)
  // ----------------------------------------------------

  function openItineraryModal(journeyId) {
    const journey = journeysData.find(j => j.id === journeyId || j.name.toLowerCase() === journeyId.toLowerCase()) || journeysData[0];
    
    itineraryModalContent.innerHTML = `
      <div class="itinerary-header">
        <div class="itinerary-hero-img-wrap">
          <img src="${journey.image}" alt="${journey.name}" onerror="this.src='${journey.fallback}';">
          <div class="itinerary-overlay"></div>
          <div class="itinerary-badge">${journey.duration}</div>
        </div>
        <div class="itinerary-title-box">
          <span class="location-tag">${journey.location}</span>
          <h2 class="modal-itinerary-title">${journey.name}</h2>
          <p class="best-for-text"><strong>Best For:</strong> ${journey.bestFor}</p>
        </div>
      </div>

      <div class="itinerary-body-grid">
        <div class="itinerary-main-info">
          <div class="info-block">
            <h3>Overview</h3>
            <p>${journey.description}</p>
          </div>

          <div class="info-block">
            <h3>Best Travel Season</h3>
            <p>🗓️ ${journey.bestSeason}</p>
          </div>

          <div class="info-block">
            <h3>Day-by-Day Journey Itinerary</h3>
            <div class="timeline">
              ${journey.itinerary.map(item => `
                <div class="timeline-item">
                  <div class="timeline-day">${item.day}</div>
                  <div class="timeline-content">
                    <h4>${item.title}</h4>
                    <p>${item.details}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="info-block services-dual-grid">
            <div class="service-col">
              <h4>✓ Included Services</h4>
              <ul>${journey.included.map(inc => `<li>${inc}</li>`).join('')}</ul>
            </div>
            <div class="service-col">
              <h4>✕ Excluded Services</h4>
              <ul>${journey.excluded.map(exc => `<li>${exc}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
      </div>

      <div class="itinerary-modal-footer">
        <button type="button" class="btn btn-primary btn-large plan-this-journey-btn" data-journey="${journey.name}" data-dest="${journey.destination}">Plan This Journey</button>
      </div>
    `;

    const planBtn = itineraryModalContent.querySelector('.plan-this-journey-btn');
    if (planBtn) {
      planBtn.addEventListener('click', () => {
        closeItineraryModal();
        openConcierge(null, journey.destination, journey.name);
      });
    }

    if (itineraryModal.showModal) {
      itineraryModal.showModal();
    } else {
      itineraryModal.setAttribute('open', 'true');
    }
  }

  function closeItineraryModal() {
    if (itineraryModal.close) {
      itineraryModal.close();
    } else {
      itineraryModal.removeAttribute('open');
    }
  }

  if (closeItineraryBtn) closeItineraryBtn.addEventListener('click', closeItineraryModal);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-itinerary-trigger');
    if (btn) {
      e.preventDefault();
      const journeyId = btn.dataset.journeyId || btn.dataset.journey || 'mara-classic';
      openItineraryModal(journeyId);
    }
  });

  // ----------------------------------------------------
  // DESTINATION DETAILS MODAL (SECTION 6)
  // ----------------------------------------------------

  function openDestinationModal(destName) {
    const dest = destinationData[destName] || destinationData["Kenya"];
    const matchingJourneys = journeysData.filter(j => j.destination.includes(destName));
    const matchingAccom = accommodationsData.filter(a => a.destination.toLowerCase() === destName.toLowerCase());

    destinationModalContent.innerHTML = `
      <div class="dest-modal-header">
        <div class="dest-hero-wrap">
          <img src="${dest.image}" alt="${dest.name}" onerror="this.src='${dest.fallback}';">
          <div class="dest-overlay"></div>
          <h2 class="dest-modal-title">Explore ${dest.name}</h2>
        </div>
      </div>

      <div class="dest-modal-body">
        <p class="dest-overview-lead">${dest.overview}</p>

        <div class="dest-meta-cards">
          <div class="meta-card">
            <span class="meta-label">Core Experiences</span>
            <span class="meta-val">${dest.coreExperiences.join(' • ')}</span>
          </div>
          <div class="meta-card">
            <span class="meta-label">Ideal Duration</span>
            <span class="meta-val">${dest.idealDuration}</span>
          </div>
          <div class="meta-card">
            <span class="meta-label">Best For</span>
            <span class="meta-val">${dest.bestFor}</span>
          </div>
        </div>

        <div class="dest-section-block">
          <h3>Featured Signature Journeys in ${dest.name}</h3>
          <div class="dest-journey-list">
            ${matchingJourneys.length ? matchingJourneys.map(j => `
              <div class="dest-journey-mini-card">
                <h4>${j.name}</h4>
                <p>${j.duration} • ${j.description}</p>
                <button type="button" class="btn-text view-itinerary-trigger" data-journey-id="${j.id}">View Full Itinerary &rarr;</button>
              </div>
            `).join('') : `<p>Bespoke journeys curated upon request for ${dest.name}.</p>`}
          </div>
        </div>

        <div class="dest-section-block">
          <h3>Recommended Lodges & Resorts in ${dest.name}</h3>
          <div class="dest-accom-list">
            ${matchingAccom.length ? matchingAccom.map(a => `
              <div class="dest-accom-mini-card">
                <strong>${a.name}</strong> (${a.rating}) — ${a.description}
              </div>
            `).join('') : `<p>Luxury partner sanctuaries curated upon request for ${dest.name}.</p>`}
          </div>
        </div>
      </div>

      <div class="dest-modal-footer">
        <button type="button" class="btn btn-primary btn-large plan-dest-btn" data-dest="${dest.name}">Plan My ${dest.name} Journey</button>
      </div>
    `;

    const planDestBtn = destinationModalContent.querySelector('.plan-dest-btn');
    if (planDestBtn) {
      planDestBtn.addEventListener('click', () => {
        closeDestinationModal();
        openConcierge(null, dest.name);
      });
    }

    if (destinationModal.showModal) {
      destinationModal.showModal();
    } else {
      destinationModal.setAttribute('open', 'true');
    }
  }

  function closeDestinationModal() {
    if (destinationModal.close) {
      destinationModal.close();
    } else {
      destinationModal.removeAttribute('open');
    }
  }

  if (closeDestinationBtn) closeDestinationBtn.addEventListener('click', closeDestinationModal);

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.explore-dest-trigger');
    if (trigger) {
      e.preventDefault();
      const destName = trigger.dataset.dest || 'Kenya';
      openDestinationModal(destName);
    }
  });

  // ----------------------------------------------------
  // ACCOMMODATIONS LISTING SYSTEM (SECTION 5)
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
            <button type="button" class="btn btn-outline concierge-trigger" data-hotel="${item.name}" data-dest="${item.destination}">Book Through Ivory Horizons</button>
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
