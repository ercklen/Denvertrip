import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HighConvertingBookingForm from "@/components/HighConvertingBookingForm";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO } from "@/lib/business";
import { getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Corporate Transportation Denver | Executive Chauffeur & Business Travel | DenveroTrip",
  description: "Corporate transportation services in Denver and Colorado. Executive roadshows, board meeting travel, convention shuttles, corporate billing, and DEN airport transfers.",
  alternates: {
    canonical: "/corporate-transportation",
  },
  openGraph: {
    title: "Corporate Transportation Denver | DenveroTrip Executive Chauffeurs",
    description: "Reliable, confidential corporate car service and executive fleet solutions for Denver enterprises and visiting business leaders.",
    url: "https://denverotrip.com/corporate-transportation",
    images: ["/fleet_executive_sedan_1786503961868.jpg"],
  },
};

export default function CorporateTransportationPage() {
  const schema = getServiceSchema(
    "Corporate Transportation & Executive Travel",
    "Professional corporate car service, executive roadshows, airport transfers, and corporate account billing in Denver, DTC, and Colorado.",
    "https://denverotrip.com/corporate-transportation"
  );

  return (
    <>
      <Script
        id="schema-corporate"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/corporate-transportation" />

      <main>
        <header className="page-hero" style={{ background: "linear-gradient(rgba(8,8,8,0.7), rgba(8,8,8,0.9)), url(/fleet_executive_sedan_1786503961868.jpg) center/cover" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Business Logistics &amp; Travel</span>
            <h1 className="page-title">
              Corporate <em>Transportation</em> Denver
            </h1>
            <p className="page-sub">
              Punctual, professional, and discreet executive travel. Serving corporate headquarters, the Denver Tech Center, the Colorado Convention Center, and visiting executives.
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#corporate-booking" className="btn-gold">Book Corporate Transfer</a>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline">
                Corporate Account Desk: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* Corporate Benefits */}
        <section className="section-pad">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
              <span className="section-eyebrow">Executive Reliability</span>
              <h2 className="section-heading">Why Leading Enterprises <em>Trust Us</em></h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Missed flights and unpredictable rideshares cost valuable business time. Our corporate service guarantees vetted chauffeurs, immaculate vehicles, and seamless executive travel.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>💼</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Itemized Direct Invoicing
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Simplify expense reporting. We provide clear, itemized invoices, consolidated monthly billing statements for corporate accounts, and instant digital receipts.
                </p>
              </div>

              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🔒</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Discretion &amp; Confidentiality
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Conduct phone calls, discuss sensitive acquisitions, and review presentations with total privacy. All chauffeurs adhere to strict nondisclosure and confidentiality standards.
                </p>
              </div>

              <div style={{ padding: "32px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "12px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>⏱</div>
                <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", marginBottom: "12px", fontFamily: "var(--font-serif)" }}>
                  Priority Dispatch Guarantee
                </h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Corporate clients receive dedicated dispatch priority, guaranteed on-time pickup windows, and proactive flight and traffic monitoring across Denver and Colorado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Anchor */}
        <section className="section-pad" id="corporate-booking" style={{ background: "var(--section-bg)" }}>
          <div className="container">
            <HighConvertingBookingForm
              defaultService="Corporate & Executive Transportation"
              defaultPickup="Denver International Airport (DEN)"
              defaultDestination="Downtown Denver / Denver Tech Center"
            />
          </div>
        </section>

        <SitelinksGrid currentPath="/corporate-transportation" />
      </main>

      <SiteFooter />
    </>
  );
}
