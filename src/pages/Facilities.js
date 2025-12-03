import React from "react";

export default function Facilities({ onNavigate }) {
  const features = [
    { title: "الكنيسة", desc: "مكان للصلاة والعبادة والخلوة." },
    { title: "قاعة المؤتمرات", desc: "قاعة مجهزة للمحاضرات والاجتماعات." },
    { title: "الغرف", desc: "غرف بسيطة ونظيفة للإقامة." },
    { title: "قاعة الطعام", desc: "قاعة طعام واسعة للضيافة." },
    { title: "الحديقة والممرات", desc: "مساحات خارجية هادئة للمشي والتأمل." },
    { title: "المكتبة", desc: "مراجع وكتب روحية للزوار." },
  ];

  return (
    <section className="text-right">
      <h2 className="mb-4">المرافق</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="bg-divine-50 rounded-lg p-5 shadow hover:shadow-lg transition-shadow border-t-4 border-divine-gold">
            <h4 className="font-semibold text-divine-700">{f.title}</h4>
            <p className="mt-2 text-divine-olive text-sm">{f.desc}</p>
            <button onClick={() => onNavigate("booking")} className="mt-4 text-sm underline text-divine hover:text-divine-700 font-semibold">
              اطلب هذا المكان
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

