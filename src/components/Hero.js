import React from "react";

export default function Hero({ onNavigate }) {
  return (
    <div className="rounded-xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-[linear-gradient(90deg,#fff7ed_0%,#fff_100%)] shadow">
      <div className="flex-1 text-right">
        <h2 className="text-3xl md:text-4xl font-semibold">ابحث عن راحة لنفسك</h2>
        <p className="mt-4 text-gray-600 max-w-xl">
          مكان روحي قبطي مخصص للصلاة والتجديد الداخلي. انضم إلينا للخلوة والهدوء.
        </p>

        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={() => onNavigate("booking")} className="bg-amber-600 text-white py-2 px-4 rounded-md shadow">
            احجز الآن
          </button>
          <button onClick={() => onNavigate("facilities")} className="py-2 px-4 rounded-md border text-gray-700">
            تعرّف على المرافق
          </button>
        </div>

        <ul className="mt-6 text-sm text-gray-600 space-y-2">
          <li>🕊 خلوات فردية هادئة</li>
          <li>🙏 برامج روحية موجهة</li>
          <li>🏛 قاعات ومرافق خدمية</li>
        </ul>
      </div>

      <div className="flex-1 w-full">
        <div className="w-full h-56 md:h-72 rounded-lg bg-gradient-to-br from-amber-200 to-rose-100 flex items-center justify-center shadow-inner">
          <svg className="w-32 h-32 opacity-80" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="10" fill="white" />
            <path d="M32 12v40" stroke="#C2410C" strokeWidth="2" />
            <path d="M20 26h24" stroke="#C2410C" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

