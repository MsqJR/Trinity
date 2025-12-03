/**
 * Calendar and pricing utilities for reservation system
 */

// Pricing configuration (in local currency, e.g., EGP)
export const PRICING = {
  dailyRate: 500, // per night
  depositPercentage: 30, // 30% of total
};

/**
 * Generate an array of date strings for a given month/year
 * @param {number} year - e.g., 2026
 * @param {number} month - 1-12
 * @returns {string[]} Array of YYYY-MM-DD strings
 */
export function generateDaysForMonth(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    days.push(dateStr);
  }
  return days;
}

/**
 * Parse date string (YYYY-MM-DD) to Date object
 * @param {string} dateStr
 * @returns {Date}
 */
export function parseDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format date for display
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {string} Formatted date (e.g., "Jan 5")
 */
export function formatDateForDisplay(dateStr) {
  const date = parseDate(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Calculate number of days between two date strings
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {number} Number of nights
 */
export function calculateNights(startDate, endDate) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate total cost and deposit
 * @param {number} nights - Number of nights
 * @returns {object} { total, deposit, remaining }
 */
export function calculatePricing(nights) {
  const total = nights * PRICING.dailyRate;
  const deposit = Math.round(total * (PRICING.depositPercentage / 100));
  const remaining = total - deposit;
  return { total, deposit, remaining, nights };
}

/**
 * Check if a date is between two dates (inclusive)
 * @param {string} dateStr - YYYY-MM-DD
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {boolean}
 */
export function isDateInRange(dateStr, startDate, endDate) {
  const date = parseDate(dateStr);
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return date >= start && date <= end;
}

/**
 * Get all dates in a range
 * @param {string} startDate - YYYY-MM-DD
 * @param {string} endDate - YYYY-MM-DD
 * @returns {string[]} Array of YYYY-MM-DD strings
 */
export function getDateRange(startDate, endDate) {
  const dates = [];
  const current = parseDate(startDate);
  const end = parseDate(endDate);
  
  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    dates.push(dateStr);
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}
