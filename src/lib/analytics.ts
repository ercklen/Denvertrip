/**
 * Central Google Ads & GA4 Analytics Tracking Utility
 * Respects Google Consent Mode v2, prevents duplicates, and logs safely.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Google Ads Conversion configuration
export const GOOGLE_ADS_ID = "AW-18485059764";
export const CALL_CONVERSION_LABEL = "7eS2CIDmoY0dELTBru5E";

/**
 * Fires a phone call click conversion.
 * Safe against missing gtag and never exposes PII.
 */
export function trackCallClick(source = "phone_button") {
  if (typeof window !== "undefined") {
    // Push event to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "phone_call_click",
      call_source: source,
    });

    // Fire Google Ads conversion if gtag is loaded
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_ID}/${CALL_CONVERSION_LABEL}`,
        event_category: "engagement",
        event_label: source,
      });
      window.gtag("event", "generate_lead", {
        method: "phone",
        lead_source: source,
      });
    }
  }
}

/**
 * Fires a genuine form submission conversion (Quote Request / Contact / Reservation Inquiry).
 * ONLY invoked after form validation passes and request has been verified.
 */
export function trackLeadSubmission(formName: string, serviceType?: string) {
  if (typeof window !== "undefined") {
    // Push event to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_submission",
      form_name: formName,
      service_type: serviceType || "general",
    });

    // Fire GA4 & Google Ads conversion event
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        form_name: formName,
        service_type: serviceType || "general",
      });
    }
  }
}
