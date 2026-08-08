/**
 * Fires a GA4 event when a visitor taps/clicks the phone number.
 * Safe to call even when gtag is not loaded (dev / ad-blockers).
 */
export function trackPhoneClick() {
  if (typeof gtag === "function") {
    gtag("event", "phone_click", {
      event_category: "contact",
      event_label: typeof window !== "undefined" ? window.location.pathname : "unknown",
    });
  }
}
