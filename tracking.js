// tracking.js
// Configuration
const CONFIG = {
  GA4_MEASUREMENT_ID: '[PASTE_MY_GA4_ID_HERE]',
  GOOGLE_ADS_CONVERSION_ID: '[PASTE_CONVERSION_ID_HERE]',
  GOOGLE_ADS_CONVERSION_LABEL: '[PASTE_CONVERSION_LABEL_HERE]' // Optional: specific label for a primary conversion
};

// 1. Initialize Google Tag
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('js', new Date());

  // Configure GA4
  gtag('config', CONFIG.GA4_MEASUREMENT_ID, {
    'send_page_view': true // Automatically tracks page views
  });

  // Configure Google Ads
  if (CONFIG.GOOGLE_ADS_CONVERSION_ID && CONFIG.GOOGLE_ADS_CONVERSION_ID !== '[PASTE_CONVERSION_ID_HERE]') {
    gtag('config', CONFIG.GOOGLE_ADS_CONVERSION_ID);
  }
})();

// 2. UTM and Click ID Preservation
function preserveTrackingParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToSave = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'wbraid', 'gbraid'];
  
  paramsToSave.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      sessionStorage.setItem('tracking_' + param, value);
    }
  });
}

function getStoredTrackingParams() {
  return {
    utm_source: sessionStorage.getItem('tracking_utm_source') || undefined,
    utm_medium: sessionStorage.getItem('tracking_utm_medium') || undefined,
    utm_campaign: sessionStorage.getItem('tracking_utm_campaign') || undefined,
    utm_term: sessionStorage.getItem('tracking_utm_term') || undefined,
    utm_content: sessionStorage.getItem('tracking_utm_content') || undefined
  };
}

// Run immediately
preserveTrackingParams();

// 3. Event Tracking Utilities
function trackEvent(eventName, eventParams = {}) {
  // Merge stored UTMs with event parameters
  const combinedParams = { ...eventParams, ...getStoredTrackingParams() };
  
  // Send to GA4
  if (window.gtag) {
    gtag('event', eventName, combinedParams);
  }
  
  console.log('Tracking Event:', eventName, combinedParams);
}

function trackGoogleAdsConversion(conversionLabel) {
    if (!CONFIG.GOOGLE_ADS_CONVERSION_ID || CONFIG.GOOGLE_ADS_CONVERSION_ID === '[PASTE_CONVERSION_ID_HERE]') return;
    if (!conversionLabel) return;
    
    if (window.gtag) {
        gtag('event', 'conversion', {
            'send_to': CONFIG.GOOGLE_ADS_CONVERSION_ID + '/' + conversionLabel
        });
    }
}

// 4. Setup Click Listeners
document.addEventListener('DOMContentLoaded', function() {
  
  // Track Phone Clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('phone_click', {
        page_location: window.location.href,
        button_text: this.innerText.trim()
      });
      // Example of firing a specific Ads conversion if a label exists
      if(CONFIG.GOOGLE_ADS_CONVERSION_LABEL && CONFIG.GOOGLE_ADS_CONVERSION_LABEL !== '[PASTE_CONVERSION_LABEL_HERE]') {
          trackGoogleAdsConversion(CONFIG.GOOGLE_ADS_CONVERSION_LABEL);
      }
    });
  });

  // Track Email Clicks
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('email_click', {
        page_location: window.location.href,
        button_text: this.innerText.trim()
      });
    });
  });

  // Track WhatsApp Clicks
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('whatsapp_click', {
        page_location: window.location.href,
        button_text: this.innerText.trim()
      });
    });
  });

  // Track CTA Buttons
  const ctaSelectors = [
    '.btn-gold', '.btn-outline', '.btn-ghost', '.fleet-cta', '.nav-cta', '.hero-btn-primary', '.hero-btn-secondary'
  ];
  
  document.querySelectorAll(ctaSelectors.join(', ')).forEach(button => {
    button.addEventListener('click', function() {
      const btnText = this.innerText.trim().toLowerCase();
      let eventName = 'cta_click'; // default
      
      if (btnText.includes('book') || btnText.includes('plan')) {
        eventName = 'booking_request';
      } else if (btnText.includes('quote')) {
        eventName = 'quote_request';
      } else if (btnText.includes('contact') || btnText.includes('inquiry')) {
        eventName = 'contact_click';
      }

      trackEvent(eventName, {
        page_location: window.location.href,
        button_text: this.innerText.trim()
      });
    });
  });

  // Track Form Submissions
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      // Assuming successful submission if we reach here (validation passed)
      // Note: If you have AJAX forms, you should call trackEvent inside the success callback instead.
      
      const formClass = this.className || 'default_form';
      let eventName = 'generate_lead';
      
      if (formClass.includes('contact')) {
        eventName = 'contact_form_submit';
      }
      
      trackEvent(eventName, {
        form_type: formClass,
        page_location: window.location.href,
        page_title: document.title
      });

      // Fire Google Ads conversion if applicable
      if(CONFIG.GOOGLE_ADS_CONVERSION_LABEL && CONFIG.GOOGLE_ADS_CONVERSION_LABEL !== '[PASTE_CONVERSION_LABEL_HERE]') {
        trackGoogleAdsConversion(CONFIG.GOOGLE_ADS_CONVERSION_LABEL);
      }
    });
  });
});
