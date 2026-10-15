"use client";

import React from "react";
import { BUSINESS_INFO } from "@/lib/business";
import { trackCallClick } from "@/lib/analytics";

interface SitelinksGridProps {
  currentPath?: string;
}

const ALL_SITELINKS = [
  {
    title: "Denver Airport Transfers",
    url: "/denver-airport-transportation",
    desc1: "Private luxury chauffeur pick-up & drop-off at DEN airport.",
    desc2: "Flight tracking, complimentary meet & greet, 24/7 service.",
  },
  {
    title: "Luxury SUV Service",
    url: "/luxury-suv-service",
    desc1: "Cadillac Escalades & Yukon Denalis for up to 6 passengers.",
    desc2: "AWD confidence for winter roads & mountain resort ski luggage.",
  },
  {
    title: "Executive Car Service",
    url: "/executive-car-service",
    desc1: "First-class Mercedes-Benz & luxury sedans for business travel.",
    desc2: "Quiet cabins, fast device charging & professional chauffeurs.",
  },
  {
    title: "Group Transportation",
    url: "/group-transportation",
    desc1: "Executive Mercedes Sprinter vans accommodating up to 14 guests.",
    desc2: "Ample luggage space for corporate roadshows & ski groups.",
  },
  {
    title: "Colorado Ski Resort Transfers",
    url: "/colorado-ski-resort-transfers",
    desc1: "Door-to-door private transfers to Vail, Aspen & Breckenridge.",
    desc2: "Experienced mountain drivers and winter-equipped AWD fleet.",
  },
  {
    title: "Wedding & Event Transportation",
    url: "/wedding-event-transportation",
    desc1: "Luxury chauffeur service for Colorado weddings & celebrations.",
    desc2: "Punctual group coordination and red-carpet vehicle presentation.",
  },
  {
    title: "Corporate Transportation",
    url: "/corporate-transportation",
    desc1: "Executive account travel, meeting logistics & airport transfers.",
    desc2: "Itemized billing, dedicated dispatch and NDA-level privacy.",
  },
  {
    title: "Contact DenveroTrip",
    url: "/contact",
    desc1: "Speak with our 24/7 Colorado concierge and dispatch desk.",
    desc2: "Instant phone booking or customized private transport quotes.",
  },
];

export default function SitelinksGrid({ currentPath }: SitelinksGridProps) {
  const filteredLinks = ALL_SITELINKS.filter((item) => item.url !== currentPath);

  return (
    <section className="section-pad" style={{ background: "var(--section-bg)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 48px" }}>
          <span className="section-eyebrow">Explore Our Services</span>
          <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
            Featured Transportation <em>Solutions</em>
          </h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Whether traveling for business, vacationing at Colorado ski resorts, or flying into Denver International Airport, explore our full suite of luxury car services.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredLinks.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "block",
                padding: "24px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(201, 168, 76, 0.15)",
                borderRadius: "12px",
                cursor: "default",
                userSelect: "none",
              }}
              className="sitelink-card"
            >
              <h3 style={{ fontSize: "1.15rem", color: "var(--warm-white)", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "6px" }}>
                {item.desc1}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {item.desc2}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Need a custom route or private charter? Call our 24/7 dispatch desk:{" "}
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              style={{ color: "var(--gold)", fontWeight: 600 }}
              onClick={() => trackCallClick("sitelinks_bottom_call")}
            >
              {BUSINESS_INFO.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
