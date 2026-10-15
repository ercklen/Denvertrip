import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HighConvertingBookingForm from "@/components/HighConvertingBookingForm";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO, POPULAR_ROUTES } from "@/lib/business";
import { getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Denver Airport Transportation | Private Luxury DEN Transfers | DenveroTrip",
  description: "Reliable, private luxury airport transfers to and from Denver International Airport (DEN). Meet & greet, real-time flight tracking, luxury SUVs and executive sedans. 24/7 service.",
  alternates: {
    canonical: "/denver-airport-transportation",
  },
  openGraph: {
    title: "Denver Airport Transportation | Private Luxury Transfers",
    description: "Premium curb-to-curb and meet-and-greet airport transfers at Denver International Airport (DEN). 24/7 flight tracking and professional chauffeurs.",
    url: "https://denverotrip.com/denver-airport-transportation",
    images: ["/hero_den_airport_1786503942729.jpg"],
  },
};

export default function DenverAirportPage() {
  const schema = getServiceSchema(
    "Denver Airport Transportation Service",
    "Private luxury airport transfers between Denver International Airport (DEN) and destinations across Denver, Boulder, Vail, Aspen, and Colorado ski resorts.",
    "https://denverotrip.com/denver-airport-transportation"
  );

  return (
    <>
      <Script
        id="schema-den-airport"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/denver-airport-transportation" />

      <main>
        {/* Hero Section */}
        <header className="page-hero" style={{ background: "linear-gradient(rgba(8,8,8,0.7), rgba(8,8,8,0.9)), url(/hero_den_airport_1786503942729.jpg) center/cover" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Denver International Airport (DEN)</span>
            <h1 className="page-title">
              Private Denver Airport <em>Transportation</em>
            </h1>
            <p className="page-sub">
              Skip taxi lines, rideshare surge pricing, and crowded shuttles. Enjoy seamless door-to-door luxury transfers with professional chauffeurs and complimentary flight monitoring.
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#airport-booking" className="btn-gold">
                Reserve Your Airport Transfer
              </a>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline">
                Call Concierge: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* Airport Service Features */}
        <section className="section-pad">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
              <span className="section-eyebrow">Flight-Coordinated Travel</span>
              <h2 className="section-heading">
                The Denver Airport <em>Difference</em>
              </h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Denver International Airport is one of the busiest hubs in the world. We eliminate the stress with end-to-end luxury hospitality.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🛫</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Live Flight Tracking
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  We monitor your incoming flight in real time. Whether your flight arrives early or encounters weather delays, your chauffeur adjusts automatically so your vehicle is ready the moment you land.
                </p>
              </div>

              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🎩</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Curbside &amp; Baggage Meet
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Choose expedited Level 5 passenger pickup or inside baggage meet-and-greet service. Your driver assists with all heavy luggage, golf bags, and ski equipment.
                </p>
              </div>

              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🏔</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Direct Mountain Connect
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Avoid confusing rental car lines and snowy mountain pass driving. Our all-wheel-drive luxury SUVs safely transport you straight from DEN airport to Vail, Aspen, Breckenridge, or Beaver Creek.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Airport Routes & Times */}
        <section className="section-pad" style={{ background: "var(--section-bg)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
              <span className="section-eyebrow">Travel Durations</span>
              <h2 className="section-heading">Popular DEN Airport <em>Routes</em></h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Estimated travel durations from Denver International Airport under standard driving conditions.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {POPULAR_ROUTES.map((route, idx) => (
                <div key={idx} style={{ padding: "24px", background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Destination
                    </span>
                    <span style={{ fontSize: "0.85rem", background: "rgba(201,168,76,0.15)", color: "var(--gold-light)", padding: "3px 10px", borderRadius: "20px" }}>
                      {route.time}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--warm-white)", marginBottom: "8px" }}>
                    {route.to}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {route.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Anchor */}
        <section className="section-pad" id="airport-booking">
          <div className="container">
            <HighConvertingBookingForm
              defaultService="Denver Airport (DEN) Transfer"
              defaultPickup="Denver International Airport (DEN)"
              defaultDestination="Downtown Denver / Ski Resort"
            />
          </div>
        </section>

        {/* Sitelinks Grid for Related Services */}
        <SitelinksGrid currentPath="/denver-airport-transportation" />
      </main>

      <SiteFooter />
    </>
  );
}
