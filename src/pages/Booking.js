import React from "react";

export default function Booking() {
  return (
    <section className="max-w-3xl mx-auto text-right">
      <h2>طلب الحجز</h2>
      <p className="text-divine-olive">املأ النموذج وسنتواصل لتأكيد التوافر والتفاصيل.</p>

      <form
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("تم إرسال الطلب (تجريبي)");
        }}
      >
        <input name="name" placeholder="الاسم الكامل" className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none" required />
        <input name="email" type="email" placeholder="البريد الإلكتروني" className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none" required />
        <input name="phone" placeholder="الهاتف" className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none" />

        <select name="type" className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none">
          <option>خلوة فردية</option>
          <option>خلوة للخدام/الشباب</option>
          <option>مؤتمر/اجتماع كنسي</option>
        </select>

        <label className="col-span-1 md:col-span-2 text-right">
          التواريخ المفضلة
          <input
            name="dates"
            placeholder="مثال: 2026-01-10 إلى 2026-01-14"
            className="mt-2 w-full p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none"
          />
        </label>

        <textarea
          name="notes"
          placeholder="ملاحظات إضافية"
          className="col-span-1 md:col-span-2 p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none h-28"
        />

        <div className="col-span-1 md:col-span-2 flex justify-between items-center">
          <div className="text-sm text-divine-olive">سنتواصل معك خلال 48 ساعة (تجريبي).</div>
          <button className="bg-divine text-divine-ivory py-2 px-4 rounded hover:shadow-lg transition-shadow">أرسل الطلب</button>
        </div>
      </form>

      <div className="mt-8 bg-divine-50 p-4 rounded shadow border-l-4 border-divine-gold">
        <h4 className="font-semibold text-divine-700">التواصل</h4>
        <p className="text-sm text-divine-olive">
          البريد الإلكتروني: info@trinity-retreat.example
          <br />
          الهاتف: +20 100 000 0000
        </p>
      </div>
    </section>
  );
}

