import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BUSINESS_INFO } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy | DenveroTrip Transportation",
  description: "Privacy policy and client data protection practices for DenveroTrip luxury transportation and chauffeur services in Colorado.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader currentPath="/privacy" />

      <main>
        <header className="page-hero">
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Legal &amp; Privacy</span>
            <h1 className="page-title">Privacy Policy</h1>
            <p style={{ color: "var(--text-muted)" }}>Last Updated: August 2026</p>
          </div>
        </header>

        <section className="legal-content">
          <h2>1. Introduction</h2>
          <p>
            At {BUSINESS_INFO.name}, we respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we handle and safeguard your information when you visit our website, request quotes, or reserve private chauffeur and transportation services.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            We may collect, store, and process contact and trip details necessary to deliver professional chauffeur and private airport transfer services:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> Full name, title, and passenger roster details.</li>
            <li><strong>Contact Data:</strong> Mobile phone number and email address for dispatch updates and itinerary confirmations.</li>
            <li><strong>Travel &amp; Flight Data:</strong> Airline flight numbers, arrival/departure dates, pickup/destination addresses, luggage counts, and vehicle preferences.</li>
            <li><strong>Transaction Records:</strong> Invoices, itinerary confirmations, and booking history. We do not store sensitive payment card details directly on our servers.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>We process your data strictly to execute transportation contracts and provide customer care:</p>
          <ul>
            <li>To confirm pickup schedules, dispatch assigned chauffeurs, and track real-time flight arrivals at Denver International Airport (DEN).</li>
            <li>To respond directly to inquiries submitted through our quote request and contact forms.</li>
            <li>To fulfill statutory tax, commercial licensing, and transportation regulatory compliance in the State of Colorado.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard encryption, secure socket layers (SSL), and restricted internal access to protect customer records against unauthorized disclosure, loss, or alteration.
          </p>

          <h2>5. Third-Party Analytics &amp; Cookies</h2>
          <p>
            With your consent, our website uses Google Analytics 4 and Google Ads measurement tools in strict compliance with Google Consent Mode v2 to evaluate aggregate traffic and ad performance. We never share personally identifiable passenger details or booking content with third-party advertising networks.
          </p>

          <h2>6. Contact Privacy Concierge</h2>
          <p>
            For questions regarding this policy or to request updates to your saved information, contact us at{" "}
            <a href={`mailto:${BUSINESS_INFO.email}`} style={{ color: "var(--gold)" }}>
              {BUSINESS_INFO.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${BUSINESS_INFO.phoneRaw}`} style={{ color: "var(--gold)" }}>
              {BUSINESS_INFO.phone}
            </a>.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
