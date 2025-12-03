import React from "react";

export default function Gallery() {
  return (
    <section className="mt-8 text-right">
      <h4 className="font-semibold mb-4">معرض الصور</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1,2,3,4,5,6,7,8].map((n) => (
          <div key={n} className="h-28 bg-divine-50 border-2 border-divine-300 rounded-md flex items-center justify-center text-divine-olive hover:bg-divine-100 transition-colors">
            صورة {n}
          </div>
        ))}
      </div>
    </section>
  );
}

