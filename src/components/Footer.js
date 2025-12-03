import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-right">
        <div>
          <h5 className="font-semibold">تريفينيتي</h5>
          <p className="text-sm text-gray-600">بيت الخلوة والمؤتمرات القبطية الأرثوذكسية.</p>
        </div>

        <div className="text-sm text-gray-600">
          <div>© {new Date().getFullYear()} تريفينيتي</div>
          <div className="mt-2">العنوان: ريف هادئ (استبدل بالعنوان الحقيقي)</div>
        </div>
      </div>
    </footer>
  );
}
