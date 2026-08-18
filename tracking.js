// tracking.js
// Configuration
const CONFIG = {
  GA4_MEASUREMENT_ID: 'G-38XNTL49BZ',
  GOOGLE_ADS_CONVERSION_ID: 'AW-11549299572',
  GOOGLE_ADS_CONVERSION_LABEL: '[PASTE_CONVERSION_LABEL_HERE]' // Optional: specific label for a primary conversion
};

// --- Consent Management System ---
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// 1. Set default consent state before initializing gtag
(function initializeConsent() {
  let storedConsent = localStorage.getItem('cookie_consent');
  let consentSettings = {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  };

  if (storedConsent) {
    try {
      const parsed = JSON.parse(storedConsent);
      if (parsed.analytics) consentSettings.analytics_storage = 'granted';
      if (parsed.advertising) {
        consentSettings.ad_storage = 'granted';
        consentSettings.ad_user_data = 'granted';
        consentSettings.ad_personalization = 'granted';
      }
    } catch (e) {
      console.error('Error parsing stored consent', e);
    }
  }

  gtag('consent', 'default', consentSettings);
})();

// 2. Initialize Google Tag
(function() {
  gtag('js', new Date());
  
  // Note: Consent mode automatically queues hits until granted, or fires them without cookies if denied (cookieless pings).
  gtag('config', CONFIG.GA4_MEASUREMENT_ID, {
    'send_page_view': true 
  });

  if (CONFIG.GOOGLE_ADS_CONVERSION_ID && CONFIG.GOOGLE_ADS_CONVERSION_ID !== '[PASTE_CONVERSION_ID_HERE]') {
    gtag('config', CONFIG.GOOGLE_ADS_CONVERSION_ID);
  }

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_MEASUREMENT_ID;
  document.head.appendChild(script);
})();

// --- UTM and Click ID Preservation ---
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
preserveTrackingParams();

// --- Event Tracking Utilities ---
function trackEvent(eventName, eventParams = {}) {
  const combinedParams = { ...eventParams, ...getStoredTrackingParams() };
  if (window.gtag) gtag('event', eventName, combinedParams);
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

// --- Setup Click Listeners ---
document.addEventListener('DOMContentLoaded', function() {
  
  // Track Phone Clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      trackEvent('phone_click', {
        page_location: window.location.href,
        button_text: this.innerText.trim()
      });
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
  const ctaSelectors = ['.btn-gold', '.btn-outline', '.btn-ghost', '.fleet-cta', '.nav-cta', '.hero-btn-primary', '.hero-btn-secondary'];
  document.querySelectorAll(ctaSelectors.join(', ')).forEach(button => {
    button.addEventListener('click', function() {
      const btnText = this.innerText.trim().toLowerCase();
      let eventName = 'cta_click'; 
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

  // Track Form Submissions (only on submit, implying basic validation passed)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
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
      if(CONFIG.GOOGLE_ADS_CONVERSION_LABEL && CONFIG.GOOGLE_ADS_CONVERSION_LABEL !== '[PASTE_CONVERSION_LABEL_HERE]') {
        trackGoogleAdsConversion(CONFIG.GOOGLE_ADS_CONVERSION_LABEL);
      }
    });
  });

  // --- Consent Banner UI Injection ---
  injectConsentUI();
});

// --- Consent Banner UI Logic ---
function injectConsentUI() {
  const css = `
    #custom-consent-banner {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      max-width: 600px;
      background: var(--bg-card, #111);
      border: 1px solid rgba(255, 215, 0, 0.2);
      border-radius: 8px;
      padding: 24px;
      z-index: 999999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      color: var(--text-primary, #fff);
      font-family: var(--font-sans, 'Inter', sans-serif);
      display: none;
    }
    #custom-consent-banner h3 {
      margin-top: 0;
      margin-bottom: 12px;
      font-family: var(--font-serif, 'Cormorant Garamond', serif);
      font-size: 1.5rem;
      color: var(--gold, #D4AF37);
    }
    #custom-consent-banner p {
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--text-secondary, #ccc);
      margin-bottom: 20px;
    }
    .consent-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .consent-btn {
      padding: 10px 20px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border-radius: 4px;
      border: none;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .consent-btn-accept {
      background: var(--gold, #D4AF37);
      color: #000;
    }
    .consent-btn-accept:hover {
      background: #e6c045;
    }
    .consent-btn-reject {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }
    .consent-btn-reject:hover {
      background: rgba(255,255,255,0.2);
    }
    .consent-btn-manage {
      background: transparent;
      color: var(--text-muted, #999);
      text-decoration: underline;
      padding: 10px 5px;
    }
    .consent-btn-manage:hover {
      color: var(--gold, #D4AF37);
    }

    #consent-preferences-modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8);
      z-index: 1000000;
      display: none;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(4px);
    }
    .consent-modal-content {
      background: var(--bg-card, #111);
      border: 1px solid rgba(255, 215, 0, 0.2);
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 30px;
      color: #fff;
      font-family: var(--font-sans, 'Inter', sans-serif);
    }
    .consent-modal-content h3 {
      font-family: var(--font-serif, 'Cormorant Garamond', serif);
      font-size: 1.8rem;
      color: var(--gold, #D4AF37);
      margin-top: 0;
      margin-bottom: 20px;
    }
    .pref-group {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .pref-group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .pref-group-header h4 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
    }
    .pref-group p {
      margin: 0;
      font-size: 0.85rem;
      color: var(--text-secondary, #ccc);
      line-height: 1.4;
    }
    /* Toggle Switch */
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(255,255,255,0.2);
      transition: .4s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: var(--gold, #D4AF37);
    }
    input:checked + .slider:before {
      transform: translateX(20px);
    }
    input:disabled + .slider {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 30px;
    }
    .cookie-settings-link {
      cursor: pointer;
      text-decoration: underline;
      color: inherit;
    }
    
    @media (max-width: 600px) {
      .consent-buttons {
        flex-direction: column;
      }
      .consent-btn {
        width: 100%;
        text-align: center;
      }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const bannerHTML = `
    <div id="custom-consent-banner" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-desc">
      <h3 id="consent-title">Privacy & Cookies</h3>
      <p id="consent-desc">We use cookies and similar technologies to improve your experience, understand website traffic, and measure the effectiveness of our advertising. You can choose which optional cookies you allow.</p>
      <div class="consent-buttons">
        <button id="consent-accept-all" class="consent-btn consent-btn-accept">Accept All</button>
        <button id="consent-reject-all" class="consent-btn consent-btn-reject">Reject All</button>
        <button id="consent-manage" class="consent-btn consent-btn-manage">Manage Preferences</button>
      </div>
    </div>

    <div id="consent-preferences-modal" role="dialog" aria-modal="true" aria-labelledby="pref-title">
      <div class="consent-modal-content">
        <h3 id="pref-title">Manage Cookie Preferences</h3>
        
        <div class="pref-group">
          <div class="pref-group-header">
            <h4>Necessary</h4>
            <label class="toggle-switch">
              <input type="checkbox" checked disabled aria-label="Necessary cookies">
              <span class="slider"></span>
            </label>
          </div>
          <p>These cookies are required for the website to function and cannot be disabled.</p>
        </div>

        <div class="pref-group">
          <div class="pref-group-header">
            <h4>Analytics</h4>
            <label class="toggle-switch">
              <input type="checkbox" id="toggle-analytics" aria-label="Analytics cookies">
              <span class="slider"></span>
            </label>
          </div>
          <p>Helps us understand how visitors use our website and improve the website.</p>
        </div>

        <div class="pref-group" style="border-bottom: none;">
          <div class="pref-group-header">
            <h4>Advertising</h4>
            <label class="toggle-switch">
              <input type="checkbox" id="toggle-advertising" aria-label="Advertising cookies">
              <span class="slider"></span>
            </label>
          </div>
          <p>Used to measure advertising performance and provide more relevant advertising.</p>
        </div>

        <div class="modal-actions">
          <button id="pref-save" class="consent-btn consent-btn-accept">Save Preferences</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', bannerHTML);

  const banner = document.getElementById('custom-consent-banner');
  const modal = document.getElementById('consent-preferences-modal');
  const toggleAnalytics = document.getElementById('toggle-analytics');
  const toggleAdvertising = document.getElementById('toggle-advertising');

  function saveConsent(analytics, advertising) {
    const consent = {
      necessary: true,
      analytics: analytics,
      advertising: advertising,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    
    // Update Google Consent Mode v2
    gtag('consent', 'update', {
      'analytics_storage': analytics ? 'granted' : 'denied',
      'ad_storage': advertising ? 'granted' : 'denied',
      'ad_user_data': advertising ? 'granted' : 'denied',
      'ad_personalization': advertising ? 'granted' : 'denied'
    });

    banner.style.display = 'none';
    modal.style.display = 'none';
  }

  // Load existing preferences into toggles if they exist
  let stored = localStorage.getItem('cookie_consent');
  if (stored) {
    try {
      const p = JSON.parse(stored);
      toggleAnalytics.checked = p.analytics;
      toggleAdvertising.checked = p.advertising;
    } catch(e) {}
  } else {
    // Show banner if no consent stored
    banner.style.display = 'block';
  }

  // Banner Event Listeners
  document.getElementById('consent-accept-all').addEventListener('click', () => saveConsent(true, true));
  document.getElementById('consent-reject-all').addEventListener('click', () => saveConsent(false, false));
  document.getElementById('consent-manage').addEventListener('click', () => {
    banner.style.display = 'none';
    modal.style.display = 'flex';
  });

  // Modal Event Listeners
  document.getElementById('pref-save').addEventListener('click', () => {
    saveConsent(toggleAnalytics.checked, toggleAdvertising.checked);
  });
  
  // Close modal if clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      if (!localStorage.getItem('cookie_consent')) {
        banner.style.display = 'block';
      }
    }
  });

  // Attach to footer links dynamically
  document.querySelectorAll('a').forEach(link => {
    if (link.innerText.toLowerCase().includes('cookie') || link.innerText.toLowerCase().includes('privacy settings')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
      });
    }
  });
}
