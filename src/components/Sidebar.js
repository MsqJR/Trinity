 import React from "react";

export default function Sidebar({ open, setOpen, onNavigate }) {
  const nav = [
    { id: "home", label: "الرئيسية", icon: "🏠" },
    { id: "about", label: "من نحن", icon: "ℹ️" },
    { id: "facilities", label: "المرافق", icon: "🏛️" },
    { id: "booking", label: "الحجز", icon: "📅" },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black/30 z-20 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setOpen(false)} />

      <aside className={`fixed top-0 right-0 h-full w-72 bg-white z-30 transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">القائمة</h3>
            <p className="text-sm text-gray-500">تصفح أقسام الموقع</p>
          </div>
          <button onClick={() => setOpen(false)} className="text-2xl leading-none">×</button>
        </div>

        <nav className="p-4 flex flex-col gap-3">
          {nav.map((n) => (
            <button key={n.id} onClick={() => onNavigate(n.id)} className="text-right flex items-center justify-between gap-3 p-3 rounded hover:bg-divine-50 transition-colors">
              <span className="text-divine-olive">{n.label}</span>
              <span className="text-xl">{n.icon}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t-2 border-divine-gold">
          <button onClick={() => onNavigate("booking")} className="w-full bg-divine text-divine-ivory py-2 rounded hover:shadow-lg transition-shadow">
            احجز خلوة
          </button>
        </div>
      </aside>
    </>
  );
}
