import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BUSINESS_INFO } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms of Service | DenveroTrip Transportation",
  description: "Terms and conditions for DenveroTrip luxury transportation, private chauffeur bookings, ski resort transfers, and charter services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader currentPath="/terms" />

      <main>
        <header className="page-hero">
          <div className="container">
            <span className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Legal &amp; Policy</span>
            <h1 className="page-title">Terms of Service</h1>
            <p style={{ color: "var(--text-muted)" }}>Last Updated: August 2026</p>
          </div>
        </header>

        <section className="legal-content">
          <h2>1. Agreement to Terms</h2>
          <p>
            By booking a ride, requesting a quote, or utilizing private chauffeur services provided by {BUSINESS_INFO.name}, you agree to be bound by these Terms of Service and Colorado state transportation regulations.
          </p>

          <h2>2. Reservations &amp; Quotes</h2>
          <p>
            Online quotes and quote requests are subject to driver and fleet availability until officially confirmed by our dispatch team. Rates are determined based on destination distance, vehicle category, service duration, and seasonal mountain driving conditions.
          </p>

          <h2>3. Cancellations &amp; Modifications</h2>
          <p>
            We accommodate itinerary adjustments with reasonable advance notice. Cancellations made with at least 24 hours prior to scheduled pickup incur no cancellation penalty. Late cancellations or client no-shows may be subject to a fee up to the total reservation value.
          </p>

          <h2>4. Flight Tracking &amp; Airport Pickups</h2>
          <p>
            For Denver International Airport (DEN) pickups, we monitor flight status via real-time FAA feeds. Complimentary wait time is extended for commercial flights (up to 45 minutes after actual landing for domestic, 60 minutes for international) to accommodate baggage collection.
          </p>

          <h2>5. Passenger Safety &amp; Conduct</h2>
          <p>
            To guarantee safety and comfort for all clients and chauffeurs:
          </p>
          <ul>
            <li>Smoking, vaping, and use of illicit substances are strictly prohibited inside all vehicles.</li>
            <li>Seatbelts must remain fastened during vehicle operation in accordance with Colorado state law.</li>
            <li>{BUSINESS_INFO.name} reserves the right to terminate service without refund if passenger behavior endangers vehicle occupants or safe driving.</li>
          </ul>

          <h2>6. Vehicle Care &amp; Liability</h2>
          <p>
            Clients are responsible for any intentional damage or excessive cleaning fees resulting from spills or passenger negligence. {BUSINESS_INFO.name} is fully licensed and commercially insured in Colorado. We are not liable for transit delays caused by severe mountain blizzards, I-70 road closures by CDOT, or unprecedented force majeure events.
          </p>

          <h2>7. Contact Concierge</h2>
          <p>
            If you have questions regarding these terms, please contact our 24/7 dispatch office at{" "}
            <a href={`tel:${BUSINESS_INFO.phoneRaw}`} style={{ color: "var(--gold)" }}>
              {BUSINESS_INFO.phone}
            </a>{" "}
            or via email at{" "}
            <a href={`mailto:${BUSINESS_INFO.email}`} style={{ color: "var(--gold)" }}>
              {BUSINESS_INFO.email}
            </a>.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
