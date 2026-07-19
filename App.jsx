import React, { useState, useEffect } from "react";
import {
  Compass,
  User,
  MessageCircle,
  MapPin,
  Languages,
  Send,
  ChevronRight,
  Sparkles,
  Stamp,
  Search,
  Heart,
  X,
  SlidersHorizontal,
  UserPlus,
  Home,
  Check,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Shared interest tags — used by both the profile form and the swipe filters
// ---------------------------------------------------------------------------
const ALL_INTERESTS = ["Foodie", "Architecture", "Nightlife", "Nature", "Art"];

// ---------------------------------------------------------------------------
// Google Fonts: Fraunces (editorial, travel-journal display) + Inter (body)
// ---------------------------------------------------------------------------
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .swipe-photo-col { width: 100%; }
    .swipe-details-col { width: 100%; }
    @media (min-width: 768px) {
      .swipe-photo-col { width: 40%; flex-shrink: 0; }
      .swipe-details-col { flex: 1 1 0%; min-width: 0; }
    }
    .app-sidebar { width: 100%; }
    @media (min-width: 768px) {
      .app-sidebar { width: 220px; flex-shrink: 0; }
    }
    @media (min-width: 1024px) {
      .app-sidebar { width: 240px; }
    }
    .chat-sidebar { width: 100%; }
    @media (min-width: 768px) {
      .chat-sidebar { width: 256px; flex-shrink: 0; }
    }
    .hero-postcards { position: relative; width: 100%; min-height: 260px; }
    @media (min-width: 768px) {
      .hero-postcards { min-height: 420px; }
    }
    .hero-postcard { position: absolute; }
  `}</style>
);

export default function App() {
  // -------------------------------------------------------------------------
  // GLOBAL APP STATE
  // -------------------------------------------------------------------------
  const [currentView, setCurrentView] = useState("landing"); // 'landing' | 'profile' | 'swipe' | 'chat'

  const [userProfile, setUserProfile] = useState({
    name: "Alex",
    role: "Traveler",
    homeCity: "San Francisco, USA",
    destination: "Istanbul, Turkey",
    bio: "Looking for local foodies!",
    interests: ["Foodie"],
  });

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Elif Yildiz",
      age: 27,
      role: "Local",
      city: "Istanbul",
      country: "Turkey",
      countryFlag: "🇹🇷",
      languages: ["Turkish", "English"],
      interests: ["Foodie", "Nightlife", "Architecture"],
      bio: "Born and raised in Istanbul. I know every hidden baklava shop and rooftop view worth seeing.",
      avatar: "https://i.pravatar.cc/300?img=47",
      photo: "https://i.pravatar.cc/900?img=47",
      willMatch: true,
    },
    {
      id: 2,
      name: "Marco Rossi",
      age: 29,
      role: "Traveler",
      city: "Rome",
      country: "Italy",
      countryFlag: "🇮🇹",
      languages: ["Italian", "English", "Spanish"],
      interests: ["Foodie", "Nightlife"],
      bio: "Backpacking through the Mediterranean for three months. Always down for street food and bad karaoke.",
      avatar: "https://i.pravatar.cc/300?img=12",
      photo: "https://i.pravatar.cc/900?img=12",
      willMatch: false,
    },
    {
      id: 3,
      name: "Aiko Tanaka",
      age: 24,
      role: "Local",
      city: "Kyoto",
      country: "Japan",
      countryFlag: "🇯🇵",
      languages: ["Japanese", "English"],
      interests: ["Architecture", "Nature", "Art"],
      bio: "Tea ceremony enthusiast and part-time hiking guide. Happy to show you the temples tourists miss.",
      avatar: "https://i.pravatar.cc/300?img=32",
      photo: "https://i.pravatar.cc/900?img=32",
      willMatch: true,
    },
    {
      id: 4,
      name: "Liam O'Connor",
      age: 31,
      role: "Traveler",
      city: "Dublin",
      country: "Ireland",
      countryFlag: "🇮🇪",
      languages: ["English", "French"],
      interests: ["Nightlife", "Art"],
      bio: "Chasing good pubs and better stories across Europe. Currently plotting my next stop.",
      avatar: "https://i.pravatar.cc/300?img=51",
      photo: "https://i.pravatar.cc/900?img=51",
      willMatch: false,
    },
    {
      id: 5,
      name: "Sofia Mendes",
      age: 26,
      role: "Local",
      city: "Lisbon",
      country: "Portugal",
      countryFlag: "🇵🇹",
      languages: ["Portuguese", "English", "Spanish"],
      interests: ["Foodie", "Nature", "Nightlife"],
      bio: "Surfer, pastel de nata connoisseur, and unofficial ambassador of the Alfama district.",
      avatar: "https://i.pravatar.cc/300?img=25",
      photo: "https://i.pravatar.cc/900?img=25",
      willMatch: false,
    },
    {
      id: 6,
      name: "Noah Kim",
      age: 28,
      role: "Traveler",
      city: "Seoul",
      country: "South Korea",
      countryFlag: "🇰🇷",
      languages: ["Korean", "English"],
      interests: ["Foodie", "Art"],
      bio: "Here for the food markets and the noraebang. Looking for someone to explore Hongdae with.",
      avatar: "https://i.pravatar.cc/300?img=15",
      photo: "https://i.pravatar.cc/900?img=15",
      willMatch: true,
    },
    {
      id: 7,
      name: "Priya Sharma",
      age: 25,
      role: "Local",
      city: "Mumbai",
      country: "India",
      countryFlag: "🇮🇳",
      languages: ["Hindi", "English"],
      interests: ["Foodie", "Art", "Nightlife"],
      bio: "Street food tour guide by weekend, UX designer by day. I'll take you to the best chaat stalls in the city.",
      avatar: "https://i.pravatar.cc/300?img=5",
      photo: "https://i.pravatar.cc/900?img=5",
      willMatch: false,
    },
    {
      id: 8,
      name: "Kwame Mensah",
      age: 30,
      role: "Local",
      city: "Accra",
      country: "Ghana",
      countryFlag: "🇬🇭",
      languages: ["English", "Twi"],
      interests: ["Nightlife", "Foodie", "Nature"],
      bio: "Musician and beach volleyball enthusiast. I know every good jollof spot and the best sunset beaches.",
      avatar: "https://i.pravatar.cc/300?img=52",
      photo: "https://i.pravatar.cc/900?img=52",
      willMatch: true,
    },
    {
      id: 9,
      name: "Camila Torres",
      age: 28,
      role: "Local",
      city: "Buenos Aires",
      country: "Argentina",
      countryFlag: "🇦🇷",
      languages: ["Spanish", "English"],
      interests: ["Nightlife", "Art", "Foodie"],
      bio: "Tango instructor and steakhouse connoisseur. Let's dance first, eat second.",
      avatar: "https://i.pravatar.cc/300?img=44",
      photo: "https://i.pravatar.cc/900?img=44",
      willMatch: false,
    },
    {
      id: 10,
      name: "Somchai Panya",
      age: 26,
      role: "Local",
      city: "Bangkok",
      country: "Thailand",
      countryFlag: "🇹🇭",
      languages: ["Thai", "English"],
      interests: ["Foodie", "Nightlife", "Architecture"],
      bio: "Tuk-tuk driver turned street food blogger. I can get you into the night markets tourists never find.",
      avatar: "https://i.pravatar.cc/300?img=58",
      photo: "https://i.pravatar.cc/900?img=58",
      willMatch: true,
    },
    {
      id: 11,
      name: "Youssef El Amrani",
      age: 32,
      role: "Local",
      city: "Marrakech",
      country: "Morocco",
      countryFlag: "🇲🇦",
      languages: ["Arabic", "French", "English"],
      interests: ["Architecture", "Foodie", "Nature"],
      bio: "Rug weaver and desert guide. I'll show you the medina's hidden riads and take you into the dunes.",
      avatar: "https://i.pravatar.cc/300?img=68",
      photo: "https://i.pravatar.cc/900?img=68",
      willMatch: false,
    },
    {
      id: 12,
      name: "Freya Lindqvist",
      age: 29,
      role: "Local",
      city: "Stockholm",
      country: "Sweden",
      countryFlag: "🇸🇪",
      languages: ["Swedish", "English"],
      interests: ["Nature", "Art", "Architecture"],
      bio: "Museum curator who spends every free weekend kayaking the archipelago. Fika is non-negotiable.",
      avatar: "https://i.pravatar.cc/300?img=36",
      photo: "https://i.pravatar.cc/900?img=36",
      willMatch: true,
    },
    {
      id: 13,
      name: "Emma Johnson",
      age: 27,
      role: "Traveler",
      city: "Sydney",
      country: "Australia",
      countryFlag: "🇦🇺",
      languages: ["English"],
      interests: ["Nature", "Nightlife"],
      bio: "Taking a gap year to surf my way across the world. Currently chasing warm water and cold beer.",
      avatar: "https://i.pravatar.cc/300?img=22",
      photo: "https://i.pravatar.cc/900?img=22",
      willMatch: false,
    },
    {
      id: 14,
      name: "Diego Fernandez",
      age: 31,
      role: "Traveler",
      city: "Mexico City",
      country: "Mexico",
      countryFlag: "🇲🇽",
      languages: ["Spanish", "English"],
      interests: ["Foodie", "Art"],
      bio: "Photographer on a slow trip around the world, one taco stand at a time.",
      avatar: "https://i.pravatar.cc/300?img=63",
      photo: "https://i.pravatar.cc/900?img=63",
      willMatch: true,
    },
  ]);

  const [matches, setMatches] = useState([
    {
      id: 1,
      profileId: 1,
      name: "Elif Yildiz",
      city: "Istanbul, Turkey",
      countryFlag: "🇹🇷",
      avatar: "https://i.pravatar.cc/300?img=47",
      lastMessage: "Sounds great, see you at the ferry!",
      matchedOn: "2026-07-15",
    },
  ]);

  const [chatHistories, setChatHistories] = useState({
    1: [
      { sender: "them", text: "Hey Alex! Welcome to Istanbul, when do you land?", time: "10:02 AM" },
      { sender: "me", text: "Thursday morning! Already looking forward to the food tour you mentioned.", time: "10:05 AM" },
      { sender: "them", text: "Perfect, I'll meet you near the Galata Bridge.", time: "10:06 AM" },
      { sender: "them", text: "Sounds great, see you at the ferry!", time: "10:07 AM" },
    ],
  });

  // Which match conversation is currently open in the Chat view
  const [selectedMatchId, setSelectedMatchId] = useState(1);

  // -------------------------------------------------------------------------
  // NAVIGATION CONFIG
  // -------------------------------------------------------------------------
  const navItems = [
    { key: "swipe", label: "Find a Buddy", icon: Compass },
    { key: "profile", label: "My Profile", icon: User },
    { key: "chat", label: "Messages", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-800 overflow-x-hidden">
      <FontStyles />

      {/* ===================================================================
          STICKY NAV HEADER
      =================================================================== */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <button
              onClick={() => setCurrentView("landing")}
              className="flex items-center gap-2 group"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white group-hover:bg-orange-600 transition-colors">
                <Compass size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-slate-900">
                NomadBuds
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentView === item.key;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => setCurrentView(item.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-slate-500 hover:text-orange-600 hover:bg-orange-50/60"
                    }`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    {item.label}
                    {isActive && (
                      <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile: compact icon-only tabs in header (bottom bar handles primary nav) */}
            <div className="md:hidden flex items-center gap-1">
              {matches.length > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                  <Sparkles size={12} />
                  {matches.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================
          MAIN CONTENT SWITCHER
      =================================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-24 md:pb-10">
        {currentView === "landing" && <LandingView setCurrentView={setCurrentView} />}
        {currentView === "profile" && (
          <ProfileView userProfile={userProfile} setUserProfile={setUserProfile} />
        )}
        {currentView === "swipe" && (
          <SwipeView
            profiles={profiles}
            userProfile={userProfile}
            matches={matches}
            setMatches={setMatches}
            chatHistories={chatHistories}
            setChatHistories={setChatHistories}
            setCurrentView={setCurrentView}
            setSelectedMatchId={setSelectedMatchId}
          />
        )}
        {currentView === "chat" && (
          <ChatView
            matches={matches}
            setMatches={setMatches}
            chatHistories={chatHistories}
            setChatHistories={setChatHistories}
            selectedMatchId={selectedMatchId}
            setSelectedMatchId={setSelectedMatchId}
            userProfile={userProfile}
          />
        )}
      </main>

      {/* ===================================================================
          MOBILE BOTTOM TAB BAR
      =================================================================== */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200">
        <div className="flex items-stretch justify-around">
          {navItems.map((item) => {
            const isActive = currentView === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5"
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-orange-600" : "text-slate-400"}
                />
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-orange-600" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LANDING VIEW — High-Impact Desktop Homepage
// ---------------------------------------------------------------------------
const HOW_IT_WORKS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Tell us who you are — a traveler looking for a local guide, or a native proud to show off your city.",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Match with Buddies",
    description:
      "Filter by destination, languages spoken, and shared passions like food, history, or hiking.",
  },
  {
    step: "03",
    icon: MessageCircle,
    title: "Explore Together",
    description:
      "Chat safely on NomadBuds, then take the friendship out into the real city on your own terms.",
  },
];

const HERO_POSTCARDS = [
  { name: "Elif", flag: "🇹🇷", city: "Istanbul", tag: "Local Native", top: "4%", left: "6%", rotate: "-7deg" },
  { name: "Noah", flag: "🇰🇷", city: "Seoul", tag: "Traveler", top: "18%", left: "52%", rotate: "5deg" },
  { name: "Aiko", flag: "🇯🇵", city: "Kyoto", tag: "Local Native", top: "48%", left: "14%", rotate: "4deg" },
  { name: "Sofia", flag: "🇵🇹", city: "Lisbon", tag: "Local Native", top: "58%", left: "56%", rotate: "-4deg" },
];

function LandingView({ setCurrentView }) {
  return (
    <div className="py-6 sm:py-10">
      {/* ===================================================================
          HERO
      =================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full mb-6">
            <Stamp size={14} />
            Now boarding in 40+ cities
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-tight">
            Don't just visit.{" "}
            <span className="text-orange-500 italic">Make local friends.</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-slate-500 mt-6 leading-relaxed max-w-xl">
            NomadBuds pairs travelers with real locals for authentic cultural
            exchange — not a paid tour. Every profile is filled out by hand,
            every chat stays on the platform, and you always decide when and
            where to meet.
          </p>

          <button
            onClick={() => setCurrentView("swipe")}
            className="group mt-8 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-orange-200 transition-colors"
          >
            Find a Travel Buddy
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
            {["Verified profiles", "Safe in-app chat", "Meet on your terms"].map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-slate-500"
                >
                  <Check size={15} className="text-emerald-500" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* Decorative postcard collage — built from our own visual language,
            not stock photography, so it never depends on an external image load */}
        <div className="hero-postcards hidden md:block">
          {HERO_POSTCARDS.map((card) => (
            <div
              key={card.name}
              className="hero-postcard bg-white border border-slate-200 rounded-2xl shadow-lg p-4"
              style={{
                top: card.top,
                left: card.left,
                width: 192,
                transform: `rotate(${card.rotate})`,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-display font-semibold flex items-center justify-center text-sm shrink-0">
                  {card.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {card.name} {card.flag}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{card.city}</p>
                </div>
              </div>
              <span className="inline-flex mt-3 text-xs font-semibold uppercase tracking-wide text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                {card.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================
          HOW IT WORKS
      =================================================================== */}
      <div className="mt-24 sm:mt-32">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wide uppercase text-orange-500">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 mt-2">
            From stranger to local friend, in three steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(({ step, icon: Icon, title, description }, i) => (
            <div key={step} className="relative">
              <div className="flex flex-col items-start bg-white border border-slate-200 rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-orange-50 text-orange-500">
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-2xl text-slate-200 font-semibold">
                    {step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {description}
                </p>
              </div>
              {i < HOW_IT_WORKS.length - 1 && (
                <span className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-200 text-slate-300 z-10">
                  <ChevronRight size={14} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================
          CLOSING CTA BANNER
      =================================================================== */}
      <div className="mt-24 sm:mt-32 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl px-8 py-14 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
          Ready to make your first local friend?
        </h2>
        <p className="text-white/90 mt-3 max-w-md mx-auto">
          It takes less than two minutes to set up your profile and start
          browsing buddies nearby.
        </p>
        <button
          onClick={() => setCurrentView("swipe")}
          className="mt-7 inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-7 py-3.5 rounded-full shadow-lg hover:bg-orange-50 transition-colors"
        >
          Get Started
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PROFILE VIEW — Desktop Profile Creation Dashboard
// ---------------------------------------------------------------------------
function ProfileView({ userProfile, setUserProfile }) {
  const [draft, setDraft] = useState(() => ({ ...userProfile }));
  const [showSaved, setShowSaved] = useState(false);

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setDraft((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSave = () => {
    setUserProfile({ ...draft });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-slate-900 mb-1">
        My Profile
      </h2>
      <p className="text-sm text-slate-400 mb-8">
        This is what other travelers and locals will see when they discover you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* ===============================================================
            LEFT — Live Preview Card
        =============================================================== */}
        <div className="md:sticky md:top-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Live Preview
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 h-32 flex items-center justify-center">
              <span className="font-display text-white text-5xl font-semibold opacity-90">
                {draft.name ? draft.name.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {draft.name || "Your name"}
              </h3>
              <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold uppercase tracking-wide text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                <Stamp size={12} />
                {draft.role === "Local Native" ? "Local Native" : "Traveler"}
              </span>

              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-4">
                <Home size={14} className="text-slate-400" />
                {draft.homeCity || "Current city"}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1.5">
                <MapPin size={14} className="text-slate-400" />
                {draft.destination || "Destination country"}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                {draft.bio || "Your bio will show up here."}
              </p>

              {draft.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {draft.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs font-medium bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===============================================================
            RIGHT — Edit Form
        =============================================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          {/* Name */}
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Name
          </label>
          <input
            value={draft.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your name"
            className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 mb-6"
          />

          {/* Role toggle */}
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            I am a
          </label>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1 mb-6">
            {["Traveler", "Local Native"].map((roleOption) => {
              const isActive = draft.role === roleOption;
              const Icon = roleOption === "Traveler" ? Compass : Stamp;
              return (
                <button
                  key={roleOption}
                  onClick={() => updateField("role", roleOption)}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon size={15} />
                  {roleOption}
                </button>
              );
            })}
          </div>

          {/* City + Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Current City
              </label>
              <div className="relative">
                <Home
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={draft.homeCity}
                  onChange={(e) => updateField("homeCity", e.target.value)}
                  placeholder="e.g. San Francisco, USA"
                  className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Destination Country
              </label>
              <div className="relative">
                <MapPin
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={draft.destination}
                  onChange={(e) => updateField("destination", e.target.value)}
                  placeholder="e.g. Istanbul, Turkey"
                  className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Bio
          </label>
          <textarea
            value={draft.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Tell buddies a little about yourself..."
            rows={4}
            className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 mb-6 resize-none"
          />

          {/* Interests */}
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Interests
          </label>
          <div className="flex flex-wrap gap-2 mb-8">
            {ALL_INTERESTS.map((interest) => {
              const active = draft.interests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                    active
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>

          {/* Save */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-orange-200 transition-colors"
            >
              Save Profile
            </button>
            {showSaved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                <Check size={15} />
                Profile updated successfully!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AVATAR HELPERS — fall back to a generated initials tile if a photo
// URL fails to load (e.g. external image host unreachable in preview)
// ---------------------------------------------------------------------------
function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function CircleAvatar({ src, name, className = "" }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`${className} rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-display font-semibold flex items-center justify-center`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setErrored(true)}
      className={`${className} rounded-full object-cover`}
    />
  );
}

function PortraitPhoto({ src, name, className = "" }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`${className} rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 flex items-center justify-center`}
      >
        <span className="font-display text-white text-6xl font-semibold opacity-90">
          {getInitials(name)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setErrored(true)}
      className={`${className} rounded-2xl object-cover`}
    />
  );
}

// ---------------------------------------------------------------------------
// SWIPE VIEW — Desktop Web Matching Dashboard
// ---------------------------------------------------------------------------

function SwipeView({
  profiles,
  userProfile,
  matches,
  setMatches,
  chatHistories,
  setChatHistories,
  setCurrentView,
  setSelectedMatchId,
}) {
  const [destinationSearch, setDestinationSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All Languages");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState(null);

  // Only "Local" natives appear in the discovery deck
  const locals = profiles.filter((p) => p.role === "Local");

  const languageOptions = [
    "All Languages",
    ...Array.from(new Set(locals.flatMap((p) => p.languages))),
  ];

  const filteredProfiles = locals.filter((p) => {
    const matchesSearch =
      destinationSearch.trim() === "" ||
      p.country.toLowerCase().includes(destinationSearch.toLowerCase()) ||
      p.city.toLowerCase().includes(destinationSearch.toLowerCase());
    const matchesLanguage =
      languageFilter === "All Languages" || p.languages.includes(languageFilter);
    const matchesInterests =
      selectedInterests.length === 0 ||
      selectedInterests.every((interest) => p.interests.includes(interest));
    return matchesSearch && matchesLanguage && matchesInterests;
  });

  // Reset the deck position whenever filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [destinationSearch, languageFilter, selectedInterests]);

  const current = filteredProfiles[currentIndex];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const clearFilters = () => {
    setDestinationSearch("");
    setLanguageFilter("All Languages");
    setSelectedInterests([]);
  };

  const handlePass = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleConnect = () => {
    if (!current) return;
    if (current.willMatch) {
      // Create the match in global state if it doesn't already exist
      const alreadyMatched = matches.some((m) => m.profileId === current.id);
      if (!alreadyMatched) {
        const newMatchId =
          matches.length > 0 ? Math.max(...matches.map((m) => m.id)) + 1 : 1;
        const newMatch = {
          id: newMatchId,
          profileId: current.id,
          name: current.name,
          city: `${current.city}, ${current.country}`,
          countryFlag: current.countryFlag,
          avatar: current.avatar,
          lastMessage: "You just matched — say hi!",
          matchedOn: new Date().toISOString().slice(0, 10),
        };
        setMatches((prev) => [...prev, newMatch]);
        setChatHistories((prev) => ({
          ...prev,
          [newMatchId]: [
            {
              sender: "them",
              text: `Hey ${userProfile.name}! Excited to show you around ${current.city} 🎉`,
              time: "Just now",
            },
          ],
        }));
        setMatchedProfile({ ...current, matchId: newMatchId });
      } else {
        const existing = matches.find((m) => m.profileId === current.id);
        setMatchedProfile({ ...current, matchId: existing.id });
      }
    } else {
      handlePass();
    }
  };

  const closeModalAndContinue = () => {
    setMatchedProfile(null);
    setCurrentIndex((i) => i + 1);
  };

  const openChatFromModal = () => {
    if (matchedProfile) {
      setSelectedMatchId(matchedProfile.matchId);
    }
    setMatchedProfile(null);
    setCurrentView("chat");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* ===================================================================
          LEFT COLUMN — FILTER SIDEBAR
      =================================================================== */}
      <aside className="app-sidebar bg-white border border-slate-200 rounded-2xl p-5 md:sticky md:top-24">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal size={16} className="text-orange-500" />
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Refine Search
          </h3>
        </div>

        {/* Destination search */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
          Destination Country
        </label>
        <div className="relative mb-6">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={destinationSearch}
            onChange={(e) => setDestinationSearch(e.target.value)}
            placeholder="e.g. Japan, Turkey..."
            className="w-full text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-slate-400"
          />
        </div>

        {/* Language dropdown */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
          Languages Spoken
        </label>
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="w-full min-w-0 text-sm px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 mb-6"
        >
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        {/* Interest pills */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
          Interests
        </label>
        <div className="flex flex-wrap gap-2 mb-6">
          {ALL_INTERESTS.map((interest) => {
            const active = selectedInterests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  active
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>

        <button
          onClick={clearFilters}
          className="text-xs font-medium text-slate-400 hover:text-orange-600 transition-colors"
        >
          Clear all filters
        </button>

        <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-600">
            {filteredProfiles.length}
          </span>{" "}
          local{filteredProfiles.length !== 1 ? "s" : ""} matching your
          filters.
        </div>
      </aside>

      {/* ===================================================================
          RIGHT COLUMN — PROFILE SHOWCASE
      =================================================================== */}
      <section className="w-full md:flex-1 md:min-w-0">
        {current ? (
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-8 pt-6">
              <span className="text-xs font-medium text-slate-400">
                Profile {currentIndex + 1} of {filteredProfiles.length}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-orange-500">
                <Compass size={13} />
                Discovery Deck
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-0 mt-6">
              {/* Large portrait photo */}
              <div className="swipe-photo-col relative h-72 md:h-auto px-8 md:pr-0">
                <PortraitPhoto
                  src={current.photo}
                  name={current.name}
                  className="w-full h-full"
                />
                <span className="absolute bottom-4 left-12 flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow">
                  {current.countryFlag} {current.city}, {current.country}
                </span>
              </div>

              {/* Details panel */}
              <div className="swipe-details-col flex flex-col justify-between px-8 py-6">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-3xl font-semibold text-slate-900">
                        {current.name}, {current.age}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold uppercase tracking-wide text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                        <Stamp size={12} />
                        Local Native
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mt-5">
                    {current.bio}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Speaks fluently
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {current.languages.map((lang) => (
                        <span
                          key={lang}
                          className="flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full"
                        >
                          <Languages size={12} />
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                      Interests
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {current.interests.map((interest) => (
                        <span
                          key={interest}
                          className="text-xs font-medium text-center bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop action buttons */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100">
                  <button
                    onClick={handlePass}
                    className="flex items-center justify-center gap-2 flex-1 border border-slate-200 text-slate-500 font-medium text-sm px-5 py-3 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-colors"
                  >
                    <X size={16} />
                    Pass
                  </button>
                  <button
                    onClick={handleConnect}
                    className="flex items-center justify-center gap-2 flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-orange-200 transition-colors"
                  >
                    <Heart size={16} fill="white" />
                    Connect / Say Hi!
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center bg-white border-2 border-dashed border-orange-200 rounded-3xl h-96 px-8">
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-50 text-orange-500 mb-4">
              <Compass size={24} />
            </span>
            <p className="text-base font-semibold text-slate-700">
              You've viewed all buddies in this area!
            </p>
            <p className="text-sm text-slate-400 mt-1.5 max-w-sm">
              Try adjusting your search filters on the left.
            </p>
          </div>
        )}
      </section>

      {/* ===================================================================
          MATCH MODAL
      =================================================================== */}
      {matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 px-8 pt-10 pb-14 text-center relative overflow-hidden">
              <Sparkles
                size={22}
                className="absolute top-6 left-8 text-white/70"
              />
              <Sparkles
                size={16}
                className="absolute bottom-8 right-10 text-white/50"
              />
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 text-white mb-4">
                <Heart size={26} fill="white" />
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                It's a Match!
              </h2>
              <p className="text-white/90 text-sm mt-2">
                You and {matchedProfile.name} both want to explore{" "}
                {matchedProfile.city} together.
              </p>
            </div>

            {/* Split-screen profile cards */}
            <div className="grid grid-cols-2 gap-4 px-8 -mt-10 relative z-10">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-lg">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 border-4 border-white shadow flex items-center justify-center font-display text-xl text-slate-500">
                  {userProfile.name.charAt(0)}
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-3">
                  {userProfile.name}
                </p>
                <p className="text-xs text-slate-400">{userProfile.role}</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-lg">
                <CircleAvatar
                  src={matchedProfile.avatar}
                  name={matchedProfile.name}
                  className="w-16 h-16 mx-auto border-4 border-white shadow text-base"
                />
                <p className="text-sm font-semibold text-slate-800 mt-3">
                  {matchedProfile.name}
                </p>
                <p className="text-xs text-slate-400">Local Native</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-8 pb-8 pt-6">
              <button
                onClick={closeModalAndContinue}
                className="flex-1 text-sm font-medium text-slate-500 border border-slate-200 px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Continue Browsing
              </button>
              <button
                onClick={openChatFromModal}
                className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl shadow-lg shadow-orange-200 transition-colors"
              >
                <MessageCircle size={16} />
                Open Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CHAT VIEW — Live Messaging Dashboard
// ---------------------------------------------------------------------------
const AUTO_REPLIES = [
  "Hey! So excited you're visiting soon. I can't wait to show you around the best local spots!",
  "That sounds perfect! I know an amazing rooftop spot we should grab coffee at.",
  "Yes! Let's definitely do a food crawl together, I know all the hidden gems.",
  "Can't wait! I'll put together a little itinerary of my favorite spots nearby.",
  "Sounds great, keep me posted on your plans and I'll clear my schedule!",
  "Haha, love it. This is going to be such a fun trip.",
];

function getRandomReply() {
  return AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function ChatView({
  matches,
  setMatches,
  chatHistories,
  setChatHistories,
  selectedMatchId,
  setSelectedMatchId,
  userProfile,
}) {
  const activeId = selectedMatchId ?? matches[0]?.id ?? null;
  const activeMatch = matches.find((m) => m.id === activeId);

  const [inputText, setInputText] = useState("");
  const [typingMatchIds, setTypingMatchIds] = useState([]);
  const scrollRef = React.useRef(null);

  const isActiveTyping = typingMatchIds.includes(activeId);

  // Auto-scroll to the latest message whenever the thread updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistories, activeId, isActiveTyping]);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text || !activeMatch) return;

    const matchId = activeMatch.id;
    const myMessage = { sender: "me", text, time: formatTime() };

    // 1. Append my message immediately
    setChatHistories((prev) => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), myMessage],
    }));
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, lastMessage: text } : m))
    );
    setInputText("");

    // 2. Show a "Typing..." indicator, then auto-reply after 1 second
    setTypingMatchIds((prev) => [...new Set([...prev, matchId])]);

    setTimeout(() => {
      const replyText = getRandomReply();
      const replyMessage = { sender: "them", text: replyText, time: formatTime() };

      setChatHistories((prev) => ({
        ...prev,
        [matchId]: [...(prev[matchId] || []), replyMessage],
      }));
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId ? { ...m, lastMessage: replyText } : m
        )
      );
      setTypingMatchIds((prev) => prev.filter((id) => id !== matchId));
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display text-2xl font-semibold text-slate-900 mb-1">
        Messages
      </h2>
      <p className="text-sm text-slate-400 mb-8">
        {matches.length} match{matches.length !== 1 ? "es" : ""} so far.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* =================================================================
            LEFT SIDEBAR — Active Matches
        ================================================================= */}
        <div className="chat-sidebar bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
          {matches.length === 0 && (
            <p className="text-sm text-slate-400 p-5">
              No matches yet — go find a buddy!
            </p>
          )}
          {matches.map((match) => {
            const isActive = match.id === activeId;
            const isTyping = typingMatchIds.includes(match.id);
            return (
              <div
                key={match.id}
                onClick={() => setSelectedMatchId(match.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                  isActive ? "bg-orange-50" : "hover:bg-orange-50/50"
                }`}
              >
                <CircleAvatar
                  src={match.avatar}
                  name={match.name}
                  className="w-11 h-11 shrink-0 text-sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isActive ? "text-orange-700" : "text-slate-800"
                      }`}
                    >
                      {match.name}
                    </p>
                    {match.countryFlag && (
                      <span className="text-xs shrink-0">
                        {match.countryFlag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {isTyping ? (
                      <span className="text-orange-500 font-medium">
                        Typing...
                      </span>
                    ) : (
                      match.lastMessage
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================================
            RIGHT PANE — Conversation Area
        ================================================================= */}
        <div
          className="w-full md:flex-1 md:min-w-0 bg-white border border-slate-200 rounded-2xl flex flex-col"
          style={{ height: 560 }}
        >
          {activeMatch ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                <CircleAvatar
                  src={activeMatch.avatar}
                  name={activeMatch.name}
                  className="w-10 h-10 text-xs"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {activeMatch.name}{" "}
                    {activeMatch.countryFlag && (
                      <span>{activeMatch.countryFlag}</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">Local Native</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active now
                </span>
              </div>

              {/* Message History */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
              >
                {(chatHistories[activeMatch.id] || []).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === "me" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      style={{ maxWidth: "75%" }}
                      className={`px-4 py-2 rounded-2xl text-sm ${
                        msg.sender === "me"
                          ? "bg-orange-500 text-white rounded-br-sm"
                          : "bg-slate-100 text-slate-700 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.time && (
                      <span className="text-xs text-slate-400 mt-1 px-1">
                        {msg.time}
                      </span>
                    )}
                  </div>
                ))}

                {isActiveTyping && (
                  <div className="flex items-start">
                    <div className="flex items-center gap-1 bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-100">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message to your travel buddy..."
                  className="flex-1 min-w-0 text-sm bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white placeholder:text-slate-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 disabled:cursor-not-allowed text-white shrink-0 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
              Select a match to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
