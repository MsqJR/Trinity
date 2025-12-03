import React, { useState } from "react";
import { generateDaysForMonth, calculatePricing, isDateInRange, formatDateForDisplay } from "../utils/calendarUtils";
import PricingQuote from "../components/PricingQuote";

export default function Calendar({ onNavigate, selectedDates, setSelectedDates }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(1);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [reserved] = useState(["2026-01-10", "2026-01-11", "2026-01-15", "2026-01-20", "2026-02-05"]);

  const days = generateDaysForMonth(year, month);

  // Handle day selection
  const handleDayClick = (day) => {
    if (reserved.includes(day)) return; // Can't select reserved days

    if (!selectedStart) {
      setSelectedStart(day);
      setSelectedEnd(null);
    } else if (!selectedEnd) {
      // Determine start and end (handle backward selection)
      const start = new Date(selectedStart);
      const clicked = new Date(day);
      
      if (clicked < start) {
        setSelectedStart(day);
        setSelectedEnd(selectedStart);
      } else {
        setSelectedEnd(day);
      }
    } else {
      // Reset and start new selection
      setSelectedStart(day);
      setSelectedEnd(null);
    }
  };

  // Calculate pricing if range is selected
  const pricing = selectedStart && selectedEnd ? calculatePricing(calculateNights(selectedStart, selectedEnd)) : null;

  // Handle reserve button
  const handleReserve = () => {
    if (selectedStart && selectedEnd && onNavigate) {
      // Save selected dates to app state
      setSelectedDates({ start: selectedStart, end: selectedEnd });
      // Navigate to booking page
      onNavigate("booking");
    }
  };

  // Month navigation
  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Get selected dates range for highlighting
  const selectedDateRange = selectedStart && selectedEnd ? getSelectedRange(selectedStart, selectedEnd) : [];

  function calculateNights(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function getSelectedRange(start, end) {
    const range = [];
    const current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      range.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
    return range;
  }

  const monthName = new Date(year, month - 1).toLocaleDateString("ar-EG", { month: "long", year: "numeric" });

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-2 text-divine-700">📅 التقويم والحجز</h2>
      <p className="text-divine-olive mb-6">
        اختر الأيام التي تريد قضاءها معنا. انقر على اليوم الأول، ثم على اليوم الأخير للاختيار.
      </p>

      {/* Month selector */}
      <div className="flex justify-between items-center mb-6 bg-divine-50 p-4 rounded-lg">
        <button onClick={handlePrevMonth} className="bg-divine text-divine-ivory px-4 py-2 rounded hover:shadow-lg transition-shadow">
          ← الشهر السابق
        </button>
        <h3 className="text-2xl font-semibold text-divine-700">{monthName}</h3>
        <button onClick={handleNextMonth} className="bg-divine text-divine-ivory px-4 py-2 rounded hover:shadow-lg transition-shadow">
          الشهر التالي →
        </button>
      </div>

      {/* Year selector */}
      <div className="mb-6 flex gap-4 items-center justify-center">
        <button onClick={() => setYear(year - 1)} className="bg-divine-300 text-divine-700 px-3 py-1 rounded hover:bg-divine-gold transition-colors">
          -
        </button>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-20 p-2 border-2 border-divine-300 rounded text-center font-semibold"
        />
        <button onClick={() => setYear(year + 1)} className="bg-divine-300 text-divine-700 px-3 py-1 rounded hover:bg-divine-gold transition-colors">
          +
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {/* Day headers */}
        {["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((day) => (
          <div key={day} className="text-center font-semibold text-divine-700 py-2">
            {day}
          </div>
        ))}

        {/* Days */}
        {days.map((day) => {
          const isReserved = reserved.includes(day);
          const isSelected = selectedDateRange.includes(day);
          const isStart = day === selectedStart;
          const isEnd = day === selectedEnd;
          const dayNum = parseInt(day.split("-")[2]);

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={isReserved}
              className={`p-3 text-center rounded-md font-semibold transition-all transform ${
                isReserved
                  ? "bg-divine-100 border-2 border-divine-300 text-divine-700 opacity-50 cursor-not-allowed"
                  : isStart || isEnd
                  ? "bg-divine text-divine-ivory border-2 border-divine-gold scale-110 shadow-lg"
                  : isSelected
                  ? "bg-divine-50 border-2 border-divine-gold text-divine-700"
                  : "bg-divine-ivory border-2 border-divine-300 text-divine-olive hover:bg-divine-50 hover:scale-105"
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Selection summary */}
      {selectedStart && selectedEnd && (
        <div className="bg-divine-gold bg-opacity-20 p-4 rounded-lg mb-6 text-right border-r-4 border-divine-gold">
          <p className="text-divine-700 font-semibold">
            ✓ تم اختيار من <span className="text-divine">{formatDateForDisplay(selectedStart)}</span> إلى{" "}
            <span className="text-divine">{formatDateForDisplay(selectedEnd)}</span>
          </p>
        </div>
      )}

      {/* Pricing quote */}
      {pricing && (
        <PricingQuote
          pricing={pricing}
          selectedDates={{ start: selectedStart, end: selectedEnd }}
          onReserve={handleReserve}
        />
      )}

      {/* Legend */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-divine-ivory border-2 border-divine-300 rounded"></div>
          <span className="text-divine-olive">متاح</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-divine-100 border-2 border-divine-300 rounded opacity-50"></div>
          <span className="text-divine-olive">محجوز</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-divine border-2 border-divine-gold rounded"></div>
          <span className="text-divine-olive">مختار</span>
        </div>
      </div>
    </section>
  );
}

