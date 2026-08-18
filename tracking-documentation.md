# Denvertrip Tracking Documentation

This document explains the Google Analytics 4 (GA4), Google Ads, and Google Search Console infrastructure integrated into the website.

## 1. Configuration & Tracking IDs

The tracking configuration is centralized in the `tracking.js` file located in the root directory. This script is loaded in the `<head>` of every HTML page.

To connect your own Google accounts, open `tracking.js` and replace the placeholder variables at the top of the file:

```javascript
const CONFIG = {
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // Replace with your GA4 Measurement ID
  GOOGLE_ADS_CONVERSION_ID: 'AW-XXXXXXXXX', // Replace with your Google Ads Conversion ID
  GOOGLE_ADS_CONVERSION_LABEL: 'XXXXXXXXXXXXXXXXXXX' // (Optional) Replace with your Ads Conversion Label
};
```

## 2. Tracked Events (GA4)

The `tracking.js` script automatically tracks key interactions across the site. All events include `page_location` and `button_text` where applicable, along with persisted UTM parameters.

* **`page_view`**: Automatically tracked on all pages by the GA4 base tag.
* **`phone_click`**: Tracked when a user clicks on any `tel:` link (e.g., calling the phone number).
* **`email_click`**: Tracked when a user clicks on any `mailto:` link.
* **`whatsapp_click`**: Tracked when a user clicks on any WhatsApp link (`wa.me` or `whatsapp.com`).
* **`booking_request`**: Tracked when CTA buttons containing "book" or "plan" are clicked.
* **`quote_request`**: Tracked when CTA buttons containing "quote" are clicked.
* **`contact_click`**: Tracked when CTA buttons containing "contact" or "inquiry" are clicked.
* **`cta_click`**: Generic fallback for other main CTA buttons.
* **`contact_form_submit`**: Tracked when the contact form is successfully submitted.
* **`generate_lead`**: Tracked when other general forms are successfully submitted.

### Privacy & UTMs
* No Personally Identifiable Information (PII) like names, emails, or phone numbers are sent to Google Analytics.
* UTM parameters (`utm_source`, `utm_medium`, etc.) and Google Click IDs (`gclid`, `wbraid`, `gbraid`) are captured from the URL and stored in `sessionStorage` to persist across pages. They are attached to conversion events.

## 3. Google Ads Conversions

The infrastructure supports Google Ads conversion tracking directly.

When a form is submitted or a phone link is clicked, the script checks for `GOOGLE_ADS_CONVERSION_ID` and `GOOGLE_ADS_CONVERSION_LABEL`. If configured, it fires a direct Google Ads conversion event:

```javascript
gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYY' });
```

### Next Steps in Google Ads:
1. Ensure **Auto-tagging** is enabled in your Google Ads account settings (this adds the `gclid` parameter to your URLs).
2. Create Conversion Actions in Google Ads (e.g., "Lead Form Submit", "Phone Call Click").
3. Get the Conversion ID and Label for each action.
4. Paste the primary Conversion ID and Label into `tracking.js`.
5. Link your GA4 account to your Google Ads account to import key events like `whatsapp_click` or `booking_request`.

## 4. Google Search Console Readiness

The website is fully prepared for Google Search Console and SEO:

* **`robots.txt`**: Added to the root directory to allow crawling.
* **`sitemap.xml`**: Added to the root directory outlining all pages and their priority.
* **Canonical URLs**: `<link rel="canonical" href="...">` added to all HTML heads to prevent duplicate content issues.
* **Open Graph Meta Tags**: Added for better sharing on social media and visibility.
* **Semantic HTML**: Existing structure uses proper header tags (`<h1>`, `<h2>`, etc.).

### Next Steps in Search Console:
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your property (e.g., `https://denvertrip.com`).
3. Verify ownership (since the GA4 tag is on the site, you can verify using the Google Analytics method).
4. Submit the sitemap (`https://denvertrip.com/sitemap.xml`) in the Sitemaps tab.

## 5. Testing the Implementation

To test that everything is working correctly before launching campaigns:

1. **Google Tag Assistant**: Install the [Google Tag Assistant browser extension](https://get.google.com/tagassistant/) or use [tagassistant.google.com](https://tagassistant.google.com/). Enter your URL to verify that the GA4 tag is firing.
2. **GA4 DebugView**: Go to your GA4 property -> Admin -> DebugView. Click around your site (buttons, forms, phone links) and watch the events populate in real-time.
3. **Console Logs**: Open your browser's Developer Tools (F12) -> Console. The `tracking.js` script prints out exactly what is being tracked when you interact with tracked elements (e.g., `Tracking Event: phone_click { ... }`).
