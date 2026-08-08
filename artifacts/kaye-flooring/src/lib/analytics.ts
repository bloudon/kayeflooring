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

/**
 * Fires a GA4 event when a contact form is successfully submitted.
 * @param source - human-readable label for the referring page/CTA (e.g. "Hero — Get Your Free Estimate")
 * Safe to call even when gtag is not loaded (dev / ad-blockers).
 */
export function trackFormSubmission(source: string) {
  if (typeof gtag === "function") {
    gtag("event", "form_submission", {
      event_category: "contact",
      event_label: source || "Direct",
    });
  }
}
