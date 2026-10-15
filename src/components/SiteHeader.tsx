"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/business";
import { trackCallClick } from "@/lib/analytics";

interface NavbarProps {
  currentPath?: string;
}

export default function SiteHeader({ currentPath = "/" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header" id="navbar">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            <span className="logo-icon" aria-hidden="true">✦</span>
            <div className="logo-text">
              <span className="logo-main">DENVEROTRIP</span>
              <span className="logo-sub">TRANSPORTATION</span>
            </div>
          </Link>

          <nav className="nav-links" aria-label="Main Navigation">
            <Link
              href="/denver-airport-transportation"
              className={currentPath === "/denver-airport-transportation" ? "active" : ""}
            >
              Airport Transfer
            </Link>
            <Link
              href="/luxury-suv-service"
              className={currentPath === "/luxury-suv-service" ? "active" : ""}
            >
              Luxury SUV
            </Link>
            <Link
              href="/executive-car-service"
              className={currentPath === "/executive-car-service" ? "active" : ""}
            >
              Executive Sedan
            </Link>
            <Link
              href="/group-transportation"
              className={currentPath === "/group-transportation" ? "active" : ""}
            >
              Group &amp; Sprinter
            </Link>
            <Link
              href="/colorado-ski-resort-transfers"
              className={currentPath === "/colorado-ski-resort-transfers" ? "active" : ""}
            >
              Ski Resorts
            </Link>
            <Link
              href="/contact"
              className={currentPath === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </nav>

          <div className="nav-actions">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="nav-phone-link"
              onClick={() => trackCallClick("header_phone")}
              title="Call 24/7 Dispatch"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <Link href="/#planner-section" className="btn-gold nav-cta">
              Book / Quote
            </Link>
            <button
              className="hamburger"
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <button className="mobile-close" aria-label="Close navigation menu" onClick={closeMenu}>
          ✕
        </button>
        <ul>
          <li><Link href="/denver-airport-transportation" onClick={closeMenu}>Denver Airport (DEN) Transfer</Link></li>
          <li><Link href="/luxury-suv-service" onClick={closeMenu}>Luxury SUV Service</Link></li>
          <li><Link href="/executive-car-service" onClick={closeMenu}>Executive Car Service</Link></li>
          <li><Link href="/group-transportation" onClick={closeMenu}>Group &amp; Sprinter Service</Link></li>
          <li><Link href="/colorado-ski-resort-transfers" onClick={closeMenu}>Colorado Ski Resort Transfers</Link></li>
          <li><Link href="/wedding-event-transportation" onClick={closeMenu}>Wedding &amp; Event Transportation</Link></li>
          <li><Link href="/corporate-transportation" onClick={closeMenu}>Corporate Accounts &amp; Travel</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>Contact Concierge</Link></li>
        </ul>
        <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="btn-gold mobile-cta"
            style={{ textAlign: "center", textDecoration: "none" }}
            onClick={() => {
              trackCallClick("mobile_drawer_phone");
              closeMenu();
            }}
          >
            Call {BUSINESS_INFO.phoneDisplay}
          </a>
          <Link
            href="/#planner-section"
            className="btn-outline mobile-cta"
            style={{ textAlign: "center", textDecoration: "none" }}
            onClick={closeMenu}
          >
            Request Instant Quote
          </Link>
        </div>
      </div>
    </>
  );
}
