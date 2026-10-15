import React from "react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/business";
import { trackCallClick } from "@/lib/analytics";

export default function SiteFooter() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <span className="logo-icon" aria-hidden="true">✦</span>
            <div className="logo-text">
              <span className="logo-main">DENVEROTRIP</span>
              <span className="logo-sub">TRANSPORTATION</span>
            </div>
          </Link>
          <p className="footer-tagline">
            Colorado&apos;s premier luxury private car service. Private airport transfers, mountain resort chauffeurs, corporate transportation &amp; group charters.
          </p>
          <div style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--gold)" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80" }}></span>
            <span>24/7 Dispatch &amp; Flight Monitoring</span>
          </div>
        </div>

        <div className="footer-nav-group">
          <h4>Services &amp; Sitelinks</h4>
          <ul>
            <li><Link href="/denver-airport-transportation">Denver Airport Transfers</Link></li>
            <li><Link href="/luxury-suv-service">Luxury SUV Service</Link></li>
            <li><Link href="/executive-car-service">Executive Car Service</Link></li>
            <li><Link href="/group-transportation">Group Transportation</Link></li>
            <li><Link href="/colorado-ski-resort-transfers">Ski Resort Transfers</Link></li>
            <li><Link href="/corporate-transportation">Corporate Transportation</Link></li>
            <li><Link href="/wedding-event-transportation">Wedding &amp; Events</Link></li>
          </ul>
        </div>

        <div className="footer-nav-group">
          <h4>Destinations</h4>
          <ul>
            <li><Link href="/colorado-ski-resort-transfers#vail">Vail &amp; Beaver Creek</Link></li>
            <li><Link href="/colorado-ski-resort-transfers#aspen">Aspen &amp; Snowmass</Link></li>
            <li><Link href="/colorado-ski-resort-transfers#breckenridge">Breckenridge &amp; Keystone</Link></li>
            <li><Link href="/colorado-ski-resort-transfers#boulder">Boulder &amp; Flatirons</Link></li>
            <li><Link href="/colorado-ski-resort-transfers#colorado-springs">Colorado Springs &amp; Broadmoor</Link></li>
            <li><Link href="/#airport-section">Denver International (DEN)</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>24/7 Concierge</h4>
          <div className="contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              style={{ fontWeight: 600, color: "var(--warm-white)" }}
            >
              {BUSINESS_INFO.phone}
            </a>
          </div>
          <div className="contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>
          </div>
          <div className="contact-item" style={{ alignItems: "flex-start" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ marginTop: "3px" }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Denver Metropolitan Area &amp; Colorado Mountain Corridors</span>
          </div>
          <div style={{ marginTop: "16px" }}>
            <Link href="/contact" className="btn-gold" style={{ padding: "10px 20px", fontSize: "0.78rem" }}>
              Direct Inquiry Form
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 {BUSINESS_INFO.name}. All Rights Reserved. Licensed &amp; Insured Colorado Luxury Transportation.</p>
        <div className="footer-bottom-links">
          <Link href="/privacy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms">Terms of Service</Link>
          <span>|</span>
          <Link href="/contact">Contact Concierge</Link>
        </div>
      </div>
    </footer>
  );
}
