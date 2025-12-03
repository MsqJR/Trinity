import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-divine-700 border-t-4 border-divine-red">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-right">
        <div>
          <h5 className="font-semibold text-divine-red">ترينيتي</h5>
          <p className="text-sm text-divine-ivory opacity-90">بيت الخلوة والمؤتمرات القبطية الأرثوذكسية.</p>
        </div>

        <div className="text-sm text-divine-ivory opacity-90">
          <div>© {new Date().getFullYear()} ترينيتي</div>
          <div className="mt-2">العنوان: ريف هادئ (استبدل بالعنوان الحقيقي)</div>
        </div>
      </div>
    </footer>
  );
}
