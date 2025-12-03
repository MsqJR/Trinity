import React from "react";

export default function Calendar() {
  const reserved = ["2026-01-10", "2026-01-11", "2026-01-15", "2026-01-20", "2026-02-05"];
  const days = Array.from({ length: 30 }, (_, i) => `2026-01-${String(i + 1).padStart(2, "0")}`);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">التقويم</h2>
      <p className="text-gray-600 mb-6">
        هنا يمكنك رؤية الأيام المحجوزة والمتاحة قبل تقديم طلب الحجز.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {days.map((day) => {
          const isReserved = reserved.includes(day);
          return (
            <div
              key={day}
              className={`p-3 text-center rounded-md text-sm shadow-sm border ${
                isReserved
                  ? "bg-red-100 border-red-300 text-red-700"
                  : "bg-green-100 border-green-300 text-green-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </section>
  );
}

