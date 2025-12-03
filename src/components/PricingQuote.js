import React from "react";

export default function PricingQuote({ pricing, selectedDates, onReserve }) {
  if (!pricing || !selectedDates.start || !selectedDates.end) {
    return null;
  }

  return (
    <div className="mt-8 bg-gradient-to-r from-divine-50 to-divine-ivory p-6 rounded-lg shadow-lg border-r-4 border-divine-gold">
      <h3 className="text-xl font-semibold text-divine-700 mb-4">💰 عرض السعر</h3>
      
      <div className="space-y-3 text-right text-divine-olive">
        <div className="flex justify-between pb-2 border-b border-divine-300">
          <span>عدد الليالي:</span>
          <span className="font-semibold text-lg">{pricing.nights}</span>
        </div>
        
        <div className="flex justify-between pb-2 border-b border-divine-300">
          <span>السعر اليومي:</span>
          <span>500 جنيه</span>
        </div>

        <div className="flex justify-between pb-3 border-b border-divine-gold text-base">
          <span>الإجمالي:</span>
          <span className="font-bold text-divine-700">{pricing.total} جنيه</span>
        </div>

        <div className="bg-divine-100 p-3 rounded-md border-l-4 border-divine-gold">
          <div className="flex justify-between mb-2">
            <span>العربون (30%):</span>
            <span className="font-bold text-divine">{pricing.deposit} جنيه</span>
          </div>
          <div className="text-sm text-divine-700">
            المتبقي عند الوصول: <span className="font-semibold">{pricing.remaining} جنيه</span>
          </div>
        </div>
      </div>

      <button
        onClick={onReserve}
        className="w-full mt-6 bg-divine text-divine-ivory py-3 px-4 rounded-md font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        🎫 احجز الآن
      </button>
    </div>
  );
}
