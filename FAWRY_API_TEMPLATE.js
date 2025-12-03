/**
 * Fawry Payment API Endpoints (Placeholder)
 * 
 * Usage:
 * 1. Copy this to your backend (e.g., server/routes/payments.js)
 * 2. Set environment variables:
 *    - FAWRY_MERCHANT_CODE
 *    - FAWRY_MERCHANT_SECRET
 *    - FAWRY_API_URL (sandbox or production)
 *    - APP_URL (your app URL for callbacks)
 * 3. Import and use with your Express app
 */

// Example Express.js implementation
/*
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const FAWRY_API = process.env.FAWRY_API_URL || 'https://atg-api.fawry.example/fawry/init';
const MERCHANT_CODE = process.env.FAWRY_MERCHANT_CODE;
const MERCHANT_SECRET = process.env.FAWRY_MERCHANT_SECRET;

// POST /api/payments/create
// Body: { bookingId, amount, customer: { name, email, mobile } }
router.post('/create', express.json(), async (req, res) => {
  try {
    const { bookingId, amount, customer } = req.body;

    // Validate inputs
    if (!bookingId || !amount || !customer?.name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate merchant reference
    const merchantRef = `${bookingId}-${Date.now()}`;

    // Build Fawry payload (adjust fields per Fawry API docs)
    const payload = {
      merchantCode: MERCHANT_CODE,
      merchantRefNum: merchantRef,
      amount: amount,
      chargeItems: [
        {
          itemId: 'deposit',
          description: 'Trinity Retreat Booking Deposit',
          price: amount,
          quantity: 1
        }
      ],
      customer: {
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile
      },
      extras: {
        bookingId: bookingId
      },
      returnUrl: `${process.env.APP_URL}/payments/return`,
      callbackUrl: `${process.env.APP_URL}/api/payments/webhook`
    };

    // Compute signature if required by Fawry
    // const signature = computeSignature(payload, MERCHANT_SECRET);
    // payload.signature = signature;

    // Send request to Fawry
    const fawryResponse = await fetch(FAWRY_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MERCHANT_SECRET}`
      },
      body: JSON.stringify(payload)
    });

    const fawryData = await fawryResponse.json();

    if (!fawryResponse.ok) {
      console.error('Fawry error:', fawryData);
      return res.status(500).json({ error: 'Payment initiation failed', details: fawryData });
    }

    // Save pending payment in your DB
    // await db.payments.create({
    //   merchantRef,
    //   bookingId,
    //   amount,
    //   status: 'pending',
    //   createdAt: new Date()
    // });

    // Return redirect URL to frontend
    res.json({
      redirectUrl: fawryData.redirect || fawryData.paymentUrl || `${FAWRY_API}?token=${fawryData.token}`,
      merchantRef,
      raw: fawryData
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// POST /api/payments/webhook
// Fawry calls this after payment completes
router.post('/webhook', express.json(), async (req, res) => {
  try {
    const payload = req.body;

    // Verify webhook signature (per Fawry docs)
    // const isValid = verifyFawrySignature(payload, req.headers['x-fawry-signature'], MERCHANT_SECRET);
    // if (!isValid) return res.status(403).json({ error: 'Invalid signature' });

    const { merchantRefNum, status, transactionId, amount } = payload;

    // Update payment status in DB
    if (status === 'PAID' || status === 'SUCCESS') {
      // await db.payments.updateOne(
      //   { merchantRef: merchantRefNum },
      //   { 
      //     status: 'paid',
      //     transactionId,
      //     paidAt: new Date()
      //   }
      // );

      // Mark booking deposit as paid
      // const payment = await db.payments.findOne({ merchantRef: merchantRefNum });
      // await db.bookings.updateOne(
      //   { _id: payment.bookingId },
      //   { depositPaid: true, depositPaidAt: new Date() }
      // );

      console.log(`Payment ${merchantRefNum} confirmed for ${amount}`);
    } else if (status === 'FAILED' || status === 'DECLINED') {
      // await db.payments.updateOne(
      //   { merchantRef: merchantRefNum },
      //   { status: 'failed', failureReason: payload.failureReason }
      // );
      console.log(`Payment ${merchantRefNum} failed: ${payload.failureReason}`);
    }

    // Respond with 200 to acknowledge receipt
    res.json({ ok: true, received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// GET /api/payments/return
// Browser redirects here after Fawry payment (success or failure)
router.get('/return', (req, res) => {
  const { status, merchantRef, transactionId } = req.query;
  // Redirect to success/failure page based on status
  res.redirect(`/payments/result?status=${status}&ref=${merchantRef}&tx=${transactionId}`);
});

// Helper: Compute HMAC signature (example)
function computeSignature(payload, secret) {
  // This depends on Fawry's exact requirements
  // Example: HMAC-SHA256 or MD5
  const stringified = JSON.stringify(payload);
  return crypto.createHmac('sha256', secret).update(stringified).digest('hex');
}

// Helper: Verify Fawry webhook signature
function verifyFawrySignature(payload, headerSignature, secret) {
  const computed = computeSignature(payload, secret);
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(headerSignature));
}

module.exports = router;
*/

// Frontend placeholder hook for testing
export const useFawryPayment = () => {
  const initiatePayment = async (bookingId, amount, customer) => {
    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, amount, customer })
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await response.json();
      return { success: true, redirectUrl: data.redirectUrl, merchantRef: data.merchantRef };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { initiatePayment };
};

// Export for use
export default {
  useFawryPayment
};
