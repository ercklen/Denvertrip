/**
 * DenveroTrip Central Client Tracking Script
 * Attaches conversion and click-to-call listeners while respecting Google Consent Mode.
 */

(function () {
  'use strict';

  // Automatically attach phone click tracking to all tel: links
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href^="tel:"]');
    if (target) {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'phone_call_click',
          tel_url: target.getAttribute('href'),
          page_path: window.location.pathname
        });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-18485059764/7eS2CIDmoY0dELTBru5E',
          event_category: 'engagement',
          event_label: 'tel_link_click'
        });
        window.gtag('event', 'generate_lead', {
          method: 'phone'
        });
      }
    }
  }, { passive: true });
})();
