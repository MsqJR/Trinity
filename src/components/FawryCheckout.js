import React, { useState } from "react";

export default function FawryCheckout({ bookingDetails }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Pricing configuration
  const DAILY_RATE = 500; // EGP per night
  const DEPOSIT_RATE = 0.3; // 30%

  // Calculate pricing from booking details
  const calculatePricing = () => {
    if (!bookingDetails?.nights) return { total: 0, deposit: 0, remaining: 0 };
    
    const total = bookingDetails.nights * DAILY_RATE;
    const deposit = Math.ceil(total * DEPOSIT_RATE);
    const remaining = total - deposit;
    
    return { total, deposit, remaining };
  };

  const pricing = calculatePricing();

  // Handle payment initiation
  const handlePayDeposit = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Prepare payment data
      const paymentData = {
        bookingId: bookingDetails?.id || `booking-${Date.now()}`,
        amount: pricing.deposit,
        customer: {
          name: bookingDetails?.name || "Guest",
          email: bookingDetails?.email || "",
          mobile: bookingDetails?.phone || ""
        }
      };

      // Call backend payment endpoint (placeholder)
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error("فشل في بدء عملية الدفع");
      }

      const result = await response.json();

      // Redirect to Fawry payment page
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      } else {
        setPaymentError("لم يتمكن من الحصول على رابط الدفع");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(error.message || "حدث خطأ أثناء معالجة الدفع");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingDetails) {
    return null;
  }

  return (
    <div className="mt-8 bg-gradient-to-r from-divine-50 to-divine-ivory p-6 rounded-lg shadow-lg border-r-4 border-divine-gold">
      <h3 className="text-2xl font-semibold text-divine-700 mb-6">💳 دفع العربون</h3>

      {/* Pricing breakdown */}
      <div className="space-y-3 mb-6 text-right">
        <div className="flex justify-between items-center pb-2 border-b-2 border-divine-300">
          <span className="text-divine-olive">عدد الليالي:</span>
          <span className="font-semibold text-lg text-divine-700">{bookingDetails.nights || 0}</span>
        </div>

        <div className="flex justify-between items-center pb-2 border-b-2 border-divine-300">
          <span className="text-divine-olive">السعر اليومي:</span>
          <span className="font-semibold text-divine-olive">{DAILY_RATE} جنيه</span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b-2 border-divine-gold">
          <span className="text-divine-olive font-semibold">الإجمالي:</span>
          <span className="font-bold text-xl text-divine-700">{pricing.total} جنيه</span>
        </div>

        {/* Deposit highlight */}
        <div className="bg-divine-100 p-4 rounded-lg border-l-4 border-divine-gold mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-divine-700 font-semibold">العربون المطلوب (30%):</span>
            <span className="text-2xl font-bold text-divine">{pricing.deposit} جنيه</span>
          </div>
          <div className="text-sm text-divine-700">
            المبلغ المتبقي عند الوصول: <span className="font-semibold">{pricing.remaining} جنيه</span>
          </div>
        </div>
      </div>

      {/* Payment details */}
      <div className="bg-white p-4 rounded-md border border-divine-300 mb-6 text-right text-sm">
        <p className="text-divine-700 font-semibold mb-2">📋 تفاصيل الحجز:</p>
        <div className="space-y-1 text-divine-olive">
          <p><span className="font-semibold">الاسم:</span> {bookingDetails.name || "غير محدد"}</p>
          <p><span className="font-semibold">البريد الإلكتروني:</span> {bookingDetails.email || "غير محدد"}</p>
          <p><span className="font-semibold">الهاتف:</span> {bookingDetails.phone || "غير محدد"}</p>
          <p><span className="font-semibold">نوع الخلوة:</span> {bookingDetails.type || "غير محدد"}</p>
        </div>
      </div>

      {/* Error message */}
      {paymentError && (
        <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg mb-6 text-right">
          <p className="text-red-700 font-semibold">❌ {paymentError}</p>
        </div>
      )}

      {/* Payment button */}
      <button
        onClick={handlePayDeposit}
        disabled={isProcessing || pricing.deposit === 0}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform ${
          isProcessing || pricing.deposit === 0
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-divine text-divine-ivory hover:shadow-xl hover:scale-105 active:scale-95"
        }`}
      >
        {isProcessing ? "⏳ جاري المعالجة..." : `💳 ادفع العربون - ${pricing.deposit} جنيه عبر Fawry`}
      </button>

      {/* Info message */}
      <p className="text-xs text-divine-olive text-center mt-4">
        ✓ سيتم توجيهك إلى بوابة الدفع الآمنة للفوري. المبلغ المتبقي يُدفع عند الوصول.
      </p>

      {/* Test mode notice */}
      <div className="mt-4 p-3 bg-divine-gold bg-opacity-20 rounded-lg border border-divine-gold text-right text-sm">
        <p className="text-divine-700">
          🔒 <span className="font-semibold">وضع تجريبي:</span> هذا نموذج اختبار للتكامل مع الفوري. تواصل معنا للبيانات الفعلية.
        </p>
      </div>
    </div>
  );
}
