import { BUSINESS_INFO } from "./business";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS_INFO.siteUrl}/#organization`,
    "name": BUSINESS_INFO.name,
    "legalName": BUSINESS_INFO.legalName,
    "url": BUSINESS_INFO.siteUrl,
    "logo": `${BUSINESS_INFO.siteUrl}/og-image.jpg`,
    "image": `${BUSINESS_INFO.siteUrl}/hero_den_airport_1786503942729.jpg`,
    "telephone": BUSINESS_INFO.phone,
    "email": BUSINESS_INFO.email,
    "description": "Premier private airport transportation and luxury chauffeur car service serving Denver International Airport (DEN), downtown Denver, and Colorado mountain ski resorts including Vail, Aspen, and Breckenridge.",
    "priceRange": "$$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Denver", "sameAs": "https://en.wikipedia.org/wiki/Denver" },
      { "@type": "City", "name": "Vail", "sameAs": "https://en.wikipedia.org/wiki/Vail,_Colorado" },
      { "@type": "City", "name": "Aspen", "sameAs": "https://en.wikipedia.org/wiki/Aspen,_Colorado" },
      { "@type": "City", "name": "Breckenridge", "sameAs": "https://en.wikipedia.org/wiki/Breckenridge,_Colorado" },
      { "@type": "City", "name": "Boulder", "sameAs": "https://en.wikipedia.org/wiki/Boulder,_Colorado" },
      { "@type": "City", "name": "Colorado Springs", "sameAs": "https://en.wikipedia.org/wiki/Colorado_Springs,_Colorado" },
      { "@type": "State", "name": "Colorado" }
    ],
    "serviceArea": {
      "@type": "AdministrativeArea",
      "name": "State of Colorado, USA"
    }
  };
}

export function getServiceSchema(serviceName: string, serviceDescription: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_INFO.name,
      "telephone": BUSINESS_INFO.phone,
      "url": BUSINESS_INFO.siteUrl
    },
    "areaServed": "Colorado",
    "url": url
  };
}
