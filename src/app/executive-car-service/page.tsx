import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HighConvertingBookingForm from "@/components/HighConvertingBookingForm";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO, FLEET_DETAILS } from "@/lib/business";
import { getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Executive Car Service Denver | First-Class Corporate Chauffeur | DenveroTrip",
  description: "Discreet, punctual executive car service in Denver. Mercedes-Benz S-Class, BMW 7 Series sedans for corporate travel, executive airport transfers, and meetings.",
  alternates: {
    canonical: "/executive-car-service",
  },
  openGraph: {
    title: "Executive Car Service Denver | Private Luxury Sedans",
    description: "Premium executive chauffeur sedan service for Denver corporate executives, board members, and discerning business travelers.",
    url: "https://denverotrip.com/executive-car-service",
    images: ["/fleet_executive_sedan_1786503961868.jpg"],
  },
};

export default function ExecutiveCarServicePage() {
  const sedan = FLEET_DETAILS.find((f) => f.id === "sedan")!;
  const schema = getServiceSchema(
    "Executive Car Service Denver",
    "First-class executive car service featuring Mercedes-Benz and luxury sedan chauffeur transportation for business travel throughout Denver and Colorado.",
    "https://denverotrip.com/executive-car-service"
  );

  return (
    <>
      <Script
        id="schema-executive-sedan"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/executive-car-service" />

      <main>
        <header className="page-hero" style={{ background: "linear-gradient(rgba(8,8,8,0.7), rgba(8,8,8,0.9)), url(/fleet_executive_sedan_1786503961868.jpg) center/cover" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>First-Class Sedans</span>
            <h1 className="page-title">
              Executive <em>Car Service</em> Denver
            </h1>
            <p className="page-sub">
              Refined, punctual, and discreet. Our first-class executive sedans provide a serene mobile office environment for Denver business travelers, C-suite executives, and private individuals.
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#sedan-booking" className="btn-gold">Book Executive Sedan</a>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline">
                Call Executive Desk: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* Feature section */}
        <section className="section-pad">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
              <div>
                <span className="section-eyebrow">Corporate Standards</span>
                <h2 className="section-heading">
                  Designed for Focus &amp; <em>Privacy</em>
                </h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "1.05rem", marginBottom: "24px" }}>
                  When preparing for high-stakes presentations or recovering from cross-country business flights, comfort and silence are paramount. Our executive sedans are maintained in pristine condition with acoustic double glazing, Wi-Fi connectivity, and impeccably presented professional drivers.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ padding: "16px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Ideal Capacity</span>
                    <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--warm-white)", marginTop: "4px" }}>{sedan.capacity}</p>
                  </div>
                  <div style={{ padding: "16px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Luggage Room</span>
                    <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--warm-white)", marginTop: "4px" }}>{sedan.luggage}</p>
                  </div>
                </div>

                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {sedan.features.map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--gold)" }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <img
                  src="/fleet_executive_sedan_1786503961868.jpg"
                  alt="Executive Sedan Denver Chauffeur"
                  style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Anchor */}
        <section className="section-pad" id="sedan-booking" style={{ background: "var(--section-bg)" }}>
          <div className="container">
            <HighConvertingBookingForm
              defaultService="Executive Sedan Service"
              defaultVehicle="sedan"
              defaultPickup="Denver International Airport (DEN)"
              defaultDestination="Downtown Denver / Denver Tech Center"
            />
          </div>
        </section>

        <SitelinksGrid currentPath="/executive-car-service" />
      </main>

      <SiteFooter />
    </>
  );
}
