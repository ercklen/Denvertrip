import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HighConvertingBookingForm from "@/components/HighConvertingBookingForm";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO, FLEET_DETAILS } from "@/lib/business";
import { getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Group Transportation Denver | Executive Sprinter Van Charter | DenveroTrip",
  description: "Private group transportation in Denver. Mercedes-Benz Sprinter vans seating up to 14 passengers. Corporate groups, ski charters, family reunions, and airport transfers.",
  alternates: {
    canonical: "/group-transportation",
  },
  openGraph: {
    title: "Group Transportation Denver | Mercedes-Benz Sprinter Service",
    description: "Executive Mercedes-Benz Sprinter van charters for up to 14 passengers with ample ski and luggage cargo capacity.",
    url: "https://denverotrip.com/group-transportation",
    images: ["/vopt_sprinter.jpg"],
  },
};

export default function GroupTransportationPage() {
  const sprinter = FLEET_DETAILS.find((f) => f.id === "sprinter")!;
  const schema = getServiceSchema(
    "Group Transportation & Sprinter Charters",
    "Executive Mercedes Sprinter group transportation service for corporate events, family mountain ski transfers, and Denver airport shuttles.",
    "https://denverotrip.com/group-transportation"
  );

  return (
    <>
      <Script
        id="schema-group-transport"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/group-transportation" />

      <main>
        <header className="page-hero" style={{ background: "linear-gradient(rgba(8,8,8,0.7), rgba(8,8,8,0.9)), url(/vopt_sprinter.jpg) center/cover" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Group Charters &amp; Sprinters</span>
            <h1 className="page-title">
              Executive Group <em>Transportation</em>
            </h1>
            <p className="page-sub">
              Travel together in unmatched luxury. Mercedes-Benz Sprinter vans accommodating up to 14 passengers with high-roof headroom, individual leather seats, and dedicated rear cargo space.
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#group-booking" className="btn-gold">Request Group Quote</a>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline">
                Call Group Dispatch: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* Fleet Details */}
        <section className="section-pad">
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
              <div>
                <span className="section-eyebrow">Capacity &amp; Versatility</span>
                <h2 className="section-heading">
                  Seamless Group <em>Logistics</em>
                </h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "1.05rem", marginBottom: "24px" }}>
                  Coordinating multiple rideshares or rental cars through Denver traffic or winter mountain passes can fragment your group. DenveroTrip offers unified charter service with professional chauffeurs experienced in group itineraries and Colorado mountain routes.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                  <div style={{ padding: "16px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Max Seating</span>
                    <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--warm-white)", marginTop: "4px" }}>{sprinter.capacity}</p>
                  </div>
                  <div style={{ padding: "16px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Cargo Volume</span>
                    <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--warm-white)", marginTop: "4px" }}>{sprinter.luggage}</p>
                  </div>
                </div>

                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {sprinter.features.map((feat, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                      <span style={{ color: "var(--gold)" }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <img
                  src="/vopt_sprinter.jpg"
                  alt="Executive Mercedes Sprinter Van Denver"
                  style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 16px 40px rgba(0,0,0,0.6)" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Anchor */}
        <section className="section-pad" id="group-booking" style={{ background: "var(--section-bg)" }}>
          <div className="container">
            <HighConvertingBookingForm
              defaultService="Group Transportation & Sprinter Charter"
              defaultVehicle="sprinter"
              defaultPickup="Denver International Airport (DEN)"
            />
          </div>
        </section>

        <SitelinksGrid currentPath="/group-transportation" />
      </main>

      <SiteFooter />
    </>
  );
}
