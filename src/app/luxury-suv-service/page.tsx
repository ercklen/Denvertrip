import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HighConvertingBookingForm from "@/components/HighConvertingBookingForm";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO, FLEET_DETAILS } from "@/lib/business";
import { getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Luxury SUV Service Denver | Cadillac Escalade & Suburban | DenveroTrip",
  description: "Private luxury SUV car service in Denver and Colorado. Up to 6 passengers, spacious luggage room for ski bags, AWD mountain capability, leather seating & 24/7 service.",
  alternates: {
    canonical: "/luxury-suv-service",
  },
  openGraph: {
    title: "Luxury SUV Service Denver | Premium Chauffeur Travel",
    description: "Book premium Cadillac Escalade and GMC Yukon Denali luxury SUV private transportation throughout Colorado.",
    url: "https://denverotrip.com/luxury-suv-service",
    images: ["/fleet_escalade_suv_1786503952518.jpg"],
  },
};

export default function LuxurySUVPage() {
  const suv = FLEET_DETAILS.find((f) => f.id === "suv")!;
  const schema = getServiceSchema(
    "Luxury SUV Car Service",
    "Private chauffeur-driven luxury SUV transportation serving Denver International Airport and Colorado mountain destinations with full-size Cadillac Escalades and GMC Yukon Denalis.",
    "https://denverotrip.com/luxury-suv-service"
  );

  return (
    <>
      <Script
        id="schema-luxury-suv"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/luxury-suv-service" />

      <main>
        <header className="page-hero" style={{ background: "linear-gradient(rgba(8,8,8,0.7), rgba(8,8,8,0.9)), url(/fleet_escalade_suv_1786503952518.jpg) center/cover" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Full-Size Luxury Fleet</span>
            <h1 className="page-title">
              Colorado Luxury <em>SUV Service</em>
            </h1>
            <p className="page-sub">
              Command the road with ultimate comfort, spaciousness, and all-wheel-drive winter capability. The gold standard for airport transfers, family ski holidays, and executive travel.
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#suv-booking" className="btn-gold">Reserve Luxury SUV</a>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline">
                Speak With Dispatch: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* Vehicle Showcase */}
        <section className="section-pad">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
              <div>
                <span className="section-eyebrow">Fleet Specifications</span>
                <h2 className="section-heading">
                  Engineered for Colorado <em>Comfort</em>
                </h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "1.05rem", marginBottom: "24px" }}>
                  Colorado weather can change rapidly, particularly when climbing the I-70 mountain corridor toward Vail, Aspen, or Summit County. Our full-size luxury SUVs (Cadillac Escalade ESV, GMC Yukon XL Denali, and Chevrolet Suburban) provide maximum safety, legroom, and cargo capacity.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ padding: "16px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Passenger Capacity</span>
                    <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--warm-white)", marginTop: "4px" }}>{suv.capacity}</p>
                  </div>
                  <div style={{ padding: "16px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Luggage Space</span>
                    <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--warm-white)", marginTop: "4px" }}>{suv.luggage}</p>
                  </div>
                </div>

                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {suv.features.map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--gold)" }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <img
                  src="/fleet_escalade_suv_1786503952518.jpg"
                  alt="Cadillac Escalade Luxury SUV Denver"
                  style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Anchor */}
        <section className="section-pad" id="suv-booking" style={{ background: "var(--section-bg)" }}>
          <div className="container">
            <HighConvertingBookingForm
              defaultService="Luxury SUV Private Transfer"
              defaultVehicle="suv"
              defaultPickup="Denver International Airport (DEN)"
            />
          </div>
        </section>

        <SitelinksGrid currentPath="/luxury-suv-service" />
      </main>

      <SiteFooter />
    </>
  );
}
