import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactFormSection from "./ContactFormSection";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO } from "@/lib/business";
import { getLocalBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact DenveroTrip | 24/7 Colorado Luxury Transportation & Concierge",
  description: "Contact DenveroTrip for private airport transfers, mountain ski resort transfers, and executive car service. Call +1 (720) 568-0206 or request an online quote 24/7.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact DenveroTrip | 24/7 Colorado Luxury Chauffeur Concierge",
    description: "Connect directly with DenveroTrip dispatch. Available 24/7 for airport transfers, corporate travel, and mountain ski transportation.",
    url: "https://denverotrip.com/contact",
    images: ["/hero_den_airport_1786503942729.jpg"],
  },
};

export default function ContactPage() {
  const schema = getLocalBusinessSchema();

  return (
    <>
      <Script
        id="schema-contact-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/contact" />

      <main>
        <header className="page-hero">
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>24/7 Concierge &amp; Dispatch</span>
            <h1 className="page-title">
              Contact <em>DenveroTrip</em>
            </h1>
            <p className="page-sub">
              We are available 24 hours a day, 7 days a week for reservations, immediate airport pickups, corporate travel coordination, and custom Colorado itineraries.
            </p>
          </div>
        </header>

        {/* Contact info and interactive form */}
        <ContactFormSection />

        <SitelinksGrid currentPath="/contact" />
      </main>

      <SiteFooter />
    </>
  );
}
