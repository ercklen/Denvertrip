"use client";

import React, { useState } from "react";
import { BUSINESS_INFO } from "@/lib/business";
import { trackCallClick, trackLeadSubmission } from "@/lib/analytics";

interface BookingFormProps {
  defaultService?: string;
  defaultPickup?: string;
  defaultDestination?: string;
  defaultVehicle?: string;
}

export default function HighConvertingBookingForm({
  defaultService = "Denver Airport Transfer",
  defaultPickup = "Denver International Airport (DEN)",
  defaultDestination = "",
  defaultVehicle = "suv",
}: BookingFormProps) {
  const [pickup, setPickup] = useState(defaultPickup);
  const [destination, setDestination] = useState(defaultDestination);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [vehicle, setVehicle] = useState(defaultVehicle);
  const [flightNumber, setFlightNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [serviceType] = useState(defaultService);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!pickup.trim()) {
      setErrorMsg("Please provide your pickup location.");
      return;
    }
    if (!destination.trim()) {
      setErrorMsg("Please provide your destination address or hotel name.");
      return;
    }
    if (!date) {
      setErrorMsg("Please select your date of travel.");
      return;
    }
    if (!time) {
      setErrorMsg("Please select your desired pickup or flight arrival time.");
      return;
    }
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg("Please provide your name, email, and contact phone number.");
      return;
    }

    setLoading(true);

    // Simulate reliable dispatch reservation inquiry
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Track conversion event safely without PII in payload
      trackLeadSubmission("quote_reservation_inquiry", serviceType);
    }, 600);
  };

  return (
    <div className="planner-card" style={{ maxWidth: "860px", margin: "0 auto" }}>
      <div className="planner-header" style={{ marginBottom: "28px" }}>
        <span className="planner-eyebrow">Instant Chauffeur Reservation Inquiry</span>
        <h2 className="planner-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>
          Request Your Private Colorado Transfer
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "8px" }}>
          Fill in your itinerary details. Our concierge team confirms availability, sends a guaranteed upfront quote, and assigns your executive chauffeur.
        </p>
      </div>

      {submitted ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: "3rem", color: "var(--gold)", marginBottom: "16px" }}>✦</div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--warm-white)", marginBottom: "12px" }}>
            Reservation Request Received!
          </h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.7 }}>
            Thank you, <strong style={{ color: "var(--gold-light)" }}>{fullName}</strong>. We have received your trip details for <strong>{destination}</strong> on <strong>{date} at {time}</strong>. Our 24/7 dispatch desk will review flight logistics, calculate your guaranteed quote, and reach out via email or phone within 30 minutes.
          </p>

          <div style={{ padding: "20px", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "12px", maxWidth: "480px", margin: "0 auto 28px", textAlign: "left" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
              Immediate Airport Pickup Needed?
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
              If your flight is landing within the next 2-4 hours, call our 24/7 airport dispatcher directly for priority vehicle allocation.
            </p>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="btn-gold"
              onClick={() => trackCallClick("confirmation_box_call")}
              style={{ display: "inline-flex", width: "100%", justifyContent: "center", textDecoration: "none" }}
            >
              Call 24/7 Dispatch: {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>

          <button
            type="button"
            className="btn-outline"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Route / Change Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="planner-form" noValidate>
          {errorMsg && (
            <div style={{ padding: "12px 16px", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.35)", borderRadius: "8px", color: "#fca5a5", fontSize: "0.9rem", marginBottom: "20px" }}>
              {errorMsg}
            </div>
          )}

          {/* Locations */}
          <div className="field-row">
            <div className="form-field">
              <label htmlFor="bookingPickup">Pickup Location *</label>
              <div className="field-input">
                <span className="field-icon">✈</span>
                <input
                  id="bookingPickup"
                  type="text"
                  required
                  placeholder="e.g. Denver Airport (DEN) or Hotel address"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="bookingDest">Drop-off Destination *</label>
              <div className="field-input">
                <span className="field-icon">📍</span>
                <input
                  id="bookingDest"
                  type="text"
                  required
                  placeholder="e.g. Vail, Aspen, Downtown Denver, Breckenridge"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="field-row field-row-three">
            <div className="form-field">
              <label htmlFor="bookingDate">Date of Service *</label>
              <div className="field-input">
                <span className="field-icon">📅</span>
                <input
                  id="bookingDate"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="bookingTime">Pickup / Flight Time *</label>
              <div className="field-input">
                <span className="field-icon">🕐</span>
                <input
                  id="bookingTime"
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="bookingFlight">Flight # (Optional)</label>
              <div className="field-input">
                <span className="field-icon">🛫</span>
                <input
                  id="bookingFlight"
                  type="text"
                  placeholder="e.g. UA 1248"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Passengers & Luggage */}
          <div className="field-row" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="form-field">
              <label>Passenger Count</label>
              <div className="field-input passenger-selector" style={{ justifyContent: "space-between" }}>
                <span>👤 {passengers} {passengers === 1 ? "Passenger" : "Passengers"}</span>
                <div className="passenger-controls">
                  <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button>
                  <button type="button" onClick={() => setPassengers(Math.min(14, passengers + 1))}>+</button>
                </div>
              </div>
            </div>
            <div className="form-field">
              <label>Luggage / Ski Bags</label>
              <div className="field-input passenger-selector" style={{ justifyContent: "space-between" }}>
                <span>🧳 {luggage} {luggage === 1 ? "Bag" : "Bags / Ski Gear"}</span>
                <div className="passenger-controls">
                  <button type="button" onClick={() => setLuggage(Math.max(0, luggage - 1))}>−</button>
                  <button type="button" onClick={() => setLuggage(Math.min(14, luggage + 1))}>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Class Selector */}
          <div className="vehicle-selector-row" style={{ marginTop: "16px" }}>
            <label className="vehicle-label">Select Preferred Vehicle Class</label>
            <div className="vehicle-options">
              <button
                type="button"
                className={`vehicle-opt${vehicle === "suv" ? " active" : ""}`}
                onClick={() => setVehicle("suv")}
              >
                <img className="vopt-img" src="/vopt_suv.png" alt="Luxury Full-Size SUV" />
                <span className="vopt-name">Luxury SUV</span>
                <span className="vopt-cap">Up to 6 Passengers</span>
              </button>
              <button
                type="button"
                className={`vehicle-opt${vehicle === "sedan" ? " active" : ""}`}
                onClick={() => setVehicle("sedan")}
              >
                <img className="vopt-img" src="/vopt_sedan.png" alt="Executive Sedan" />
                <span className="vopt-name">Executive Sedan</span>
                <span className="vopt-cap">Up to 3 Passengers</span>
              </button>
              <button
                type="button"
                className={`vehicle-opt${vehicle === "sprinter" ? " active" : ""}`}
                onClick={() => setVehicle("sprinter")}
              >
                <img className="vopt-img" src="/vopt_sprinter.png" alt="Executive Sprinter Van" />
                <span className="vopt-name">Sprinter Van</span>
                <span className="vopt-cap">Up to 14 Passengers</span>
              </button>
            </div>
          </div>

          {/* Passenger Contact Info */}
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h4 style={{ color: "var(--gold-light)", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              Passenger &amp; Contact Details
            </h4>
            <div className="field-row">
              <div className="form-field">
                <label htmlFor="bookingName">Full Name *</label>
                <div className="field-input">
                  <input
                    id="bookingName"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="bookingEmail">Email Address *</label>
                <div className="field-input">
                  <input
                    id="bookingEmail"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="field-row" style={{ marginTop: "16px" }}>
              <div className="form-field">
                <label htmlFor="bookingPhone">Phone Number *</label>
                <div className="field-input">
                  <input
                    id="bookingPhone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="bookingNotes">Special Requests (Child seats, extra ski bags, meet &amp; greet)</label>
                <div className="field-input">
                  <input
                    id="bookingNotes"
                    type="text"
                    placeholder="Optional notes or airline details"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="planner-actions" style={{ marginTop: "28px" }}>
            <button
              type="submit"
              className="btn-gold planner-btn"
              disabled={loading}
              style={{ minWidth: "260px" }}
            >
              {loading ? "Processing Itinerary..." : "Request Guaranteed Quote & Hold Ride"}
              <span className="btn-arrow">→</span>
            </button>
            <div style={{ textAlign: "center" }}>
              <p className="planner-note" style={{ margin: 0 }}>
                ✓ No credit card required upfront • Free cancellation up to 24h prior
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "4px" }}>
                Need immediate ride? Call <a href={`tel:${BUSINESS_INFO.phoneRaw}`} style={{ color: "var(--gold)" }} onClick={() => trackCallClick("planner_sub_call")}>{BUSINESS_INFO.phoneDisplay}</a>
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
