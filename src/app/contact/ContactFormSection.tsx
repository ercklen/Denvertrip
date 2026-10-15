"use client";

import React, { useState } from "react";
import { BUSINESS_INFO } from "@/lib/business";
import { trackCallClick, trackLeadSubmission } from "@/lib/analytics";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "Airport Transfer",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      trackLeadSubmission("contact_page_inquiry", formData.serviceType);
    }, 500);
  };

  return (
    <section className="contact-container">
      <div className="contact-info-panel">
        <span className="section-eyebrow">Direct Communication</span>
        <h3>Get in Touch With Dispatch</h3>
        <p>
          Our dedicated team is ready to ensure your Colorado journey is seamless from start to finish. Whether you need an immediate airport transfer from Denver International Airport or are planning complex corporate group transportation, our team is at your service 24/7.
        </p>

        <div className="contact-method">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <div className="c-method-details">
            <h4>24/7 Phone Dispatch</h4>
            <p>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                onClick={() => trackCallClick("contact_page_phone")}
                style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--warm-white)" }}
              >
                {BUSINESS_INFO.phone}
              </a>
            </p>
            <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>
              Available 24/7 for immediate airport pickups &amp; changes
            </p>
          </div>
        </div>

        <div className="contact-method">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <div className="c-method-details">
            <h4>Email Inquiries</h4>
            <p>
              <a href={`mailto:${BUSINESS_INFO.email}`}>
                {BUSINESS_INFO.email}
              </a>
            </p>
            <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>
              Quotes and corporate itinerary confirmations within 30 minutes
            </p>
          </div>
        </div>

        <div className="contact-method">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <div className="c-method-details">
            <h4>Service Territory</h4>
            <p style={{ color: "var(--warm-white)" }}>Denver, Colorado</p>
            <p style={{ fontSize: "0.8rem", marginTop: "4px" }}>
              Serving Denver International Airport (DEN), Denver Metro, Vail, Aspen, Breckenridge, and all Colorado destinations.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-form-panel">
        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "2.8rem", color: "var(--gold)", marginBottom: "16px" }}>✦</div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", color: "var(--warm-white)", marginBottom: "12px" }}>
              Message Received
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
              Thank you, <strong style={{ color: "var(--gold-light)" }}>{formData.firstName}</strong>. Your inquiry regarding <strong>{formData.serviceType}</strong> has been assigned to our concierge desk. We will reach back to you shortly.
            </p>
            <button
              type="button"
              className="btn-gold"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  serviceType: "Airport Transfer",
                  message: "",
                });
              }}
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <h4 style={{ color: "var(--gold-light)", fontSize: "1.1rem", fontFamily: "var(--font-serif)", marginBottom: "20px" }}>
              Send an Online Inquiry
            </h4>
            <div className="field-row">
              <div className="form-group">
                <label htmlFor="cFirstName">First Name *</label>
                <input
                  id="cFirstName"
                  type="text"
                  required
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cLastName">Last Name *</label>
                <input
                  id="cLastName"
                  type="text"
                  required
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="field-row">
              <div className="form-group">
                <label htmlFor="cEmail">Email Address *</label>
                <input
                  id="cEmail"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cPhone">Phone Number *</label>
                <input
                  id="cPhone"
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="cService">Service Needed</label>
              <select
                id="cService"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px",
                  padding: "14px 16px",
                  color: "var(--warm-white)",
                }}
              >
                <option value="Denver Airport Transfer" style={{ background: "#1a1a1a" }}>Denver Airport (DEN) Transfer</option>
                <option value="Luxury SUV Service" style={{ background: "#1a1a1a" }}>Luxury SUV Service</option>
                <option value="Executive Car Service" style={{ background: "#1a1a1a" }}>Executive Car Service</option>
                <option value="Group Transportation" style={{ background: "#1a1a1a" }}>Group &amp; Sprinter Transportation</option>
                <option value="Ski Resort Transfer" style={{ background: "#1a1a1a" }}>Colorado Ski Resort Transfer (Vail / Aspen / Breck)</option>
                <option value="Corporate Travel" style={{ background: "#1a1a1a" }}>Corporate / Business Travel</option>
                <option value="Wedding or Special Event" style={{ background: "#1a1a1a" }}>Wedding &amp; Special Event</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cMessage">Itinerary Details / Inquiries *</label>
              <textarea
                id="cMessage"
                required
                placeholder="Please tell us about your dates, flight numbers, pickup/drop-off addresses, or any special requests."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn-gold" disabled={loading}>
              {loading ? "Sending Inquiry..." : "Submit Reservation Inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
