import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HighConvertingBookingForm from "@/components/HighConvertingBookingForm";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO } from "@/lib/business";
import { getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding & Special Event Transportation Colorado | Luxury Denver Chauffeurs | DenveroTrip",
  description: "Luxury wedding transportation, anniversary, gala, and private event chauffeur services in Denver, Aspen, and Vail. Luxury SUVs, stretch limousines, and Sprinters.",
  alternates: {
    canonical: "/wedding-event-transportation",
  },
  openGraph: {
    title: "Wedding & Event Transportation Colorado | DenveroTrip",
    description: "Elegant, punctual luxury transportation for Colorado weddings, rehearsals, private mountain parties, and special events.",
    url: "https://denverotrip.com/wedding-event-transportation",
    images: ["/fleet_limousine_1786503972144.jpg"],
  },
};

export default function WeddingEventPage() {
  const schema = getServiceSchema(
    "Wedding & Special Event Luxury Transportation",
    "Private chauffeur and group transportation services for Colorado weddings, anniversaries, private galas, and VIP celebrations in Denver, Vail, and Aspen.",
    "https://denverotrip.com/wedding-event-transportation"
  );

  return (
    <>
      <Script
        id="schema-wedding-events"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/wedding-event-transportation" />

      <main>
        <header className="page-hero" style={{ background: "linear-gradient(rgba(8,8,8,0.75), rgba(8,8,8,0.92)), url(/fleet_limousine_1786503972144.jpg) center/cover" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Celebrations &amp; Special Occasions</span>
            <h1 className="page-title">
              Wedding &amp; Event <em>Transportation</em>
            </h1>
            <p className="page-sub">
              Your special day deserves extraordinary transportation. Punctual, elegant, and stress-free chauffeur service for bride &amp; groom arrivals, bridal parties, wedding guests, and VIP galas across Colorado.
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#event-booking" className="btn-gold">Request Wedding / Event Quote</a>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline">
                Speak With Event Coordinator: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* Highlights */}
        <section className="section-pad">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
              <span className="section-eyebrow">Flawless Coordination</span>
              <h2 className="section-heading">Memorable <em>Milestones</em></h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                From mountain resort weddings in Vail to black-tie galas in Cherry Creek and downtown Denver, our team handles all guest shuttles, bridal parties, and getaway cars with immaculate attention to detail.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>💍</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Bridal Party &amp; VIP Getaways
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Arrive in style in our pristine luxury SUVs or executive sedans. Chauffeurs are dressed in formal attire, ready to roll out the red carpet and ensure a smooth, relaxed ride to the altar and reception.
                </p>
              </div>

              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🚐</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Guest Shuttles &amp; Mountain Venues
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Our Mercedes-Benz Sprinter vans keep your guests together, providing safe, timely transfers between hotels, mountain wedding chapels, and reception venues with zero parking worries.
                </p>
              </div>

              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🥂</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Private Celebrations &amp; Concerts
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Red Rocks concerts, anniversaries, milestone birthdays, and Denver theater nights. Celebrate freely while your dedicated chauffeur handles navigation, traffic, and curbside pickup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Anchor */}
        <section className="section-pad" id="event-booking" style={{ background: "var(--section-bg)" }}>
          <div className="container">
            <HighConvertingBookingForm
              defaultService="Wedding & Special Event Transportation"
              defaultPickup="Denver / Hotel / Residence"
              defaultDestination="Wedding Venue / Reception"
            />
          </div>
        </section>

        <SitelinksGrid currentPath="/wedding-event-transportation" />
      </main>

      <SiteFooter />
    </>
  );
}
