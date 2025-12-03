import React, { useState, useEffect } from "react";
import FawryCheckout from "../components/FawryCheckout";

export default function Booking({ selectedDates, setSelectedDates }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "خلوة فردية",
    startDay: "",
    endDay: "",
    notes: ""
  });
  const [showCheckout, setShowCheckout] = useState(false);

  // Generate days for the selected month
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Populate dates if coming from calendar
  useEffect(() => {
    if (selectedDates?.start && selectedDates?.end) {
      const startDate = new Date(selectedDates.start);
      const endDate = new Date(selectedDates.end);
      
      setYear(startDate.getFullYear());
      setMonth(startDate.getMonth() + 1);
      setFormData(prev => ({
        ...prev,
        startDay: startDate.getDate().toString(),
        endDay: endDate.getDate().toString()
      }));
    }
  }, [selectedDates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMonthYearChange = (e) => {
    const { name, value } = e.target;
    if (name === "year") {
      setYear(parseInt(value));
    } else if (name === "month") {
      setMonth(parseInt(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate date selection
    if (!formData.startDay || !formData.endDay) {
      alert("يرجى اختيار تاريخ البداية والنهاية");
      return;
    }

    const startDate = new Date(year, month - 1, parseInt(formData.startDay));
    const endDate = new Date(year, month - 1, parseInt(formData.endDay));

    // Validate that end date is not before start date
    if (endDate < startDate) {
      alert("تاريخ النهاية يجب أن يكون بعد تاريخ البداية");
      return;
    }

    // Show checkout with booking details
    setShowCheckout(true);
  };

  // Calculate nights
  const calculateNights = () => {
    if (!formData.startDay || !formData.endDay) return 0;
    const startDate = new Date(year, month - 1, parseInt(formData.startDay));
    const endDate = new Date(year, month - 1, parseInt(formData.endDay));
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDateString = (day) => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const bookingDetails = showCheckout ? {
    id: `booking-${Date.now()}`,
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    type: formData.type,
    dates: `${formatDateString(formData.startDay)} إلى ${formatDateString(formData.endDay)}`,
    nights: calculateNights(),
    notes: formData.notes
  } : null;

  if (showCheckout && bookingDetails) {
    return (
      <section className="max-w-4xl mx-auto text-right">
        <button
          onClick={() => setShowCheckout(false)}
          className="mb-6 px-4 py-2 bg-divine-300 text-divine-700 rounded hover:bg-divine-gold transition-colors"
        >
          ← العودة للنموذج
        </button>
        <FawryCheckout bookingDetails={bookingDetails} />
      </section>
    );
  }

  const monthName = new Date(year, month - 1).toLocaleDateString("ar-EG", { month: "long", year: "numeric" });

  return (
    <section className="max-w-3xl mx-auto text-right">
      <h2 className="text-3xl font-semibold text-divine-700 mb-2">📝 طلب الحجز</h2>
      <p className="text-divine-olive mb-6">املأ النموذج وسنتواصل لتأكيد التوافر والتفاصيل.</p>

      <form
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none"
          required
        />
        <input
          name="phone"
          placeholder="الهاتف"
          value={formData.phone}
          onChange={handleChange}
          className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none"
        >
          <option>خلوة للخدام/الشباب</option>
          <option>مؤتمر/اجتماع كنسي</option>
        </select>

        {/* Date selection - Year and Month */}
        <div className="col-span-1 md:col-span-2 bg-divine-50 p-4 rounded-lg border border-divine-300">
          <label className="block text-divine-700 font-semibold mb-3">اختر السنة والشهر</label>
          <div className="flex gap-3 justify-end mb-4">
            <select
              name="month"
              value={month}
              onChange={handleMonthYearChange}
              className="flex-1 p-2 border-2 border-divine-300 rounded focus:border-divine focus:outline-none text-right"
            >
              <option value="1">يناير</option>
              <option value="2">فبراير</option>
              <option value="3">مارس</option>
              <option value="4">أبريل</option>
              <option value="5">مايو</option>
              <option value="6">يونيو</option>
              <option value="7">يوليو</option>
              <option value="8">أغسطس</option>
              <option value="9">سبتمبر</option>
              <option value="10">أكتوبر</option>
              <option value="11">نوفمبر</option>
              <option value="12">ديسمبر</option>
            </select>

            <select
              name="year"
              value={year}
              onChange={handleMonthYearChange}
              className="flex-1 p-2 border-2 border-divine-300 rounded focus:border-divine focus:outline-none"
            >
              {[2025, 2026, 2027, 2028].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <span className="flex items-center text-divine-700 font-semibold text-lg px-2">{monthName}</span>
          </div>

          {/* Day selection dropdowns */}
          <div className="flex gap-3 justify-end items-center">
            <select
              name="endDay"
              value={formData.endDay}
              onChange={handleChange}
              className="flex-1 p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none text-right"
              required
            >
              <option value="">اختر اليوم</option>
              {dayOptions.map(day => (
                <option key={`end-${day}`} value={day}>{day}</option>
              ))}
            </select>

            <span className="text-divine-700 font-semibold text-lg">إلى</span>

            <select
              name="startDay"
              value={formData.startDay}
              onChange={handleChange}
              className="flex-1 p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none text-right"
              required
            >
              <option value="">اختر اليوم</option>
              {dayOptions.map(day => (
                <option key={`start-${day}`} value={day}>{day}</option>
              ))}
            </select>

            <span className="text-divine-700 font-semibold text-lg">من</span>
          </div>

          {/* Display selected dates */}
          {formData.startDay && formData.endDay && (
            <div className="mt-4 p-3 bg-divine-gold bg-opacity-20 rounded text-divine-700 text-center font-semibold border-r-4 border-divine-gold">
              ✓ من {formData.startDay} إلى {formData.endDay} {monthName}
              <div className="text-sm mt-1">({calculateNights()} ليلة)</div>
            </div>
          )}
        </div>

        <textarea
          name="notes"
          placeholder="ملاحظات إضافية"
          value={formData.notes}
          onChange={handleChange}
          className="col-span-1 md:col-span-2 p-3 border-2 border-divine-300 rounded focus:border-divine focus:outline-none h-28"
        />

        <div className="col-span-1 md:col-span-2 flex justify-between items-center">
          <div className="text-sm text-divine-olive">ملاحظة: بعد ملء النموذج، سيتم عرض خيار الدفع الآمن.</div>
          <button type="submit" className="bg-divine text-divine-ivory py-2 px-4 rounded hover:shadow-lg transition-shadow">
            المتابعة للدفع
          </button>
        </div>
      </form>

      <div className="mt-8 bg-divine-50 p-4 rounded shadow border-l-4 border-divine-gold">
        <h4 className="font-semibold text-divine-700">📞 التواصل المباشر</h4>
        <p className="text-sm text-divine-olive">
          البريد الإلكتروني: info@trinity-retreat.example
          <br />
          الهاتف: +20 100 000 0000
        </p>
      </div>
    </section>
  );
}

