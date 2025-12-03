 import React from "react";

export default function Header({ onNavigate, current, setSidebarOpen }) {
  const nav = [
    { id: "home", label: "الرئيسية" },
    { id: "about", label: "من نحن" },
    { id: "facilities", label: "المرافق" },
    { id: "booking", label: "الحجز" },
    { id: "calendar", label: "التقويم" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-60 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
       <a href="/" className="flex items-center gap-2"> 
        <img src="/Trinity_Logo_only_fixed.svg" alt="ترينيتي" className="w-16 h-auto object-contain"/>
        <img src="/Trinity_text_only_fixed.svg" alt="ترينيتيi" className="w-28 h-auto object-contain"/>
        </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => onNavigate(n.id)}
              className={`py-2 px-3 rounded-md text-sm ${n.id === current ? "bg-divine-100 text-divine-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {n.label}
            </button>
          ))}

          <button onClick={() => onNavigate("booking")} className="mr-3 bg-divine text-divine-ivory py-2 px-4 rounded-md shadow-sm">
            احجز الآن
          </button>
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded border">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
