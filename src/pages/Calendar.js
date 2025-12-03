import React from "react";

export default function Calendar() {
  const reserved = ["2026-01-10", "2026-01-11", "2026-01-15", "2026-01-20", "2026-02-05"];
  const days = Array.from({ length: 30 }, (_, i) => `2026-01-${String(i + 1).padStart(2, "0")}`);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">التقويم</h2>
      <p className="text-divine-olive mb-6">
        هنا يمكنك رؤية الأيام المحجوزة والمتاحة قبل تقديم طلب الحجز.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {days.map((day) => {
          const isReserved = reserved.includes(day);
          return (
            <div
              key={day}
              className={`p-3 text-center rounded-md text-sm shadow-sm border transition-colors ${
                isReserved
                  ? "bg-divine-100 border-divine-300 text-divine-700"
                  : "bg-divine-50 border-divine-gold text-divine-olive hover:bg-divine-300"
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

