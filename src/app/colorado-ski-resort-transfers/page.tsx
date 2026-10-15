import type { Metadata } from "next";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HighConvertingBookingForm from "@/components/HighConvertingBookingForm";
import SitelinksGrid from "@/components/SitelinksGrid";
import { BUSINESS_INFO } from "@/lib/business";
import { getServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Colorado Ski Resort Transfers | Private Vail, Aspen & Breckenridge Transportation | DenveroTrip",
  description: "Private door-to-door luxury transfers from Denver Airport to Vail, Aspen, Beaver Creek, Breckenridge, and Keystone. Winter-equipped AWD luxury SUVs, experienced mountain drivers.",
  alternates: {
    canonical: "/colorado-ski-resort-transfers",
  },
  openGraph: {
    title: "Colorado Ski Resort Transfers | Private Mountain Chauffeur",
    description: "Safe, comfortable private luxury transfers from Denver Airport to world-class Colorado ski resorts.",
    url: "https://denverotrip.com/colorado-ski-resort-transfers",
    images: ["/dest_vail_mountain_1786504003022.jpg"],
  },
};

const RESORTS = [
  {
    id: "vail",
    name: "Vail & Beaver Creek",
    time: "~2h 15m - 2h 45m from DEN",
    image: "/dest_vail_mountain_1786504003022.jpg",
    desc: "Direct private transport to Vail Village, Lionshead, and Beaver Creek resorts. Travel in AWD luxury SUVs equipped for winter traction laws over Vail Pass.",
  },
  {
    id: "aspen",
    name: "Aspen & Snowmass",
    time: "~3h 45m - 4h 15m from DEN",
    image: "/dest_aspen_1786508288136.jpg",
    desc: "Luxury long-distance chauffeur service via Glenwood Canyon or Independence Pass (seasonal). Seamless connections to Aspen Mountain, Highlands, and Buttermilk.",
  },
  {
    id: "breckenridge",
    name: "Breckenridge & Keystone",
    time: "~1h 45m - 2h 15m from DEN",
    image: "/dest_breckenridge_1786508308049.jpg",
    desc: "Direct mountain ski transfers to Summit County lodging, condos, and ski chalets. Ample cargo capacity for all ski bags, boots, and family luggage.",
  },
  {
    id: "boulder",
    name: "Boulder & Northern Colorado",
    time: "~45 - 55 min from DEN",
    image: "/dest_boulder_1786508277820.jpg",
    desc: "Executive chauffeur travel between Denver Airport, downtown Boulder, CU Boulder campus, and technology parks along the US-36 corridor.",
  },
  {
    id: "colorado-springs",
    name: "Colorado Springs & Broadmoor",
    time: "~1h 20m - 1h 40m from DEN",
    image: "/dest_colorado_springs_1786508297951.jpg",
    desc: "First-class travel south along I-25 to The Broadmoor, Garden of the Gods, and corporate/defense facilities in Colorado Springs.",
  },
];

export default function SkiResortTransfersPage() {
  const schema = getServiceSchema(
    "Colorado Ski Resort Private Transportation",
    "Private mountain transfer service from Denver International Airport to world-class ski destinations including Vail, Aspen, Breckenridge, Keystone, and Steamboat Springs.",
    "https://denverotrip.com/colorado-ski-resort-transfers"
  );

  return (
    <>
      <Script
        id="schema-ski-transfers"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader currentPath="/colorado-ski-resort-transfers" />

      <main>
        <header className="page-hero" style={{ background: "linear-gradient(rgba(8,8,8,0.7), rgba(8,8,8,0.9)), url(/dest_vail_mountain_1786504003022.jpg) center/cover" }}>
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Winter Mountain Travel</span>
            <h1 className="page-title">
              Colorado Ski Resort <em>Transfers</em>
            </h1>
            <p className="page-sub">
              Your private gateway to the Rocky Mountains. Travel stress-free from Denver Airport directly to your ski resort chalet or hotel with dedicated AWD luxury vehicles and experienced winter chauffeurs.
            </p>
            <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#mountain-booking" className="btn-gold">Book Ski Transfer</a>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="btn-outline">
                Call Mountain Dispatch: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </header>

        {/* Resort highlights */}
        <section className="section-pad">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 48px" }}>
              <span className="section-eyebrow">Verified Destinations</span>
              <h2 className="section-heading">
                World-Class Mountain <em>Resorts</em>
              </h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Every vehicle in our mountain fleet is fully compliant with Colorado Traction Law (Code 15/16) requirements, equipped with premium winter tires, all-wheel drive, and spacious ski luggage compartments.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
              {RESORTS.map((resort) => (
                <div
                  key={resort.id}
                  id={resort.id}
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      src={resort.image}
                      alt={`${resort.name} Private Transportation`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                        <h3 style={{ fontSize: "1.3rem", color: "var(--warm-white)", fontFamily: "var(--font-serif)" }}>{resort.name}</h3>
                      </div>
                      <span style={{ display: "inline-block", fontSize: "0.8rem", color: "var(--gold)", marginBottom: "12px", fontWeight: 600 }}>
                        ⏱ {resort.time}
                      </span>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "16px" }}>
                        {resort.desc}
                      </p>
                    </div>
                    <a href="#mountain-booking" className="btn-outline" style={{ textAlign: "center", width: "100%" }}>
                      Request Quote for {resort.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mountain Booking Anchor */}
        <section className="section-pad" id="mountain-booking" style={{ background: "var(--section-bg)" }}>
          <div className="container">
            <HighConvertingBookingForm
              defaultService="Colorado Mountain Ski Resort Transfer"
              defaultPickup="Denver International Airport (DEN)"
              defaultDestination="Vail / Aspen / Breckenridge"
              defaultVehicle="suv"
            />
          </div>
        </section>

        <SitelinksGrid currentPath="/colorado-ski-resort-transfers" />
      </main>

      <SiteFooter />
    </>
  );
}
