/**
 * Central DenveroTrip business configuration
 * Keeps authentic verified phone number, email, and locations consistent across all pages.
 */

export const BUSINESS_INFO = {
  name: "DenveroTrip",
  legalName: "DenveroTrip Luxury Transportation LLC",
  tagline: "Luxury Airport & Mountain Transportation in Colorado",
  phone: "+1 (720) 568-0206",
  phoneRaw: "+17205680206",
  phoneDisplay: "(720) 568-0206",
  email: "coloradodenverlimousine@gmail.com",
  areaServed: "Denver, Vail, Aspen, Breckenridge, Colorado Springs, Boulder & all Colorado ski resorts",
  headquarters: "Denver, Colorado",
  operatingHours: "24/7 Concierge & Dispatch Service",
  siteUrl: "https://denverotrip.com",
} as const;

export const FLEET_DETAILS = [
  {
    id: "suv",
    title: "Luxury Full-Size SUV",
    models: "Cadillac Escalade, GMC Yukon Denali, Chevrolet Suburban",
    capacity: "Up to 6 Passengers",
    luggage: "6 Full-Size Bags",
    features: [
      "Heated leather captain chairs",
      "All-wheel drive for mountain snow & winter passes",
      "Tri-zone climate control & USB-C fast charging",
      "Complimentary bottled water & Wi-Fi",
      "Ample cargo room for skis, snowboards & luggage",
    ],
    image: "/fleet_escalade_suv_1786503952518.jpg",
    slug: "/luxury-suv-service",
  },
  {
    id: "sedan",
    title: "Executive First-Class Sedan",
    models: "Mercedes-Benz S-Class, BMW 7 Series, Cadillac CT6",
    capacity: "Up to 3 Passengers",
    luggage: "3 Bags",
    features: [
      "Acoustic noise isolation & privacy glass",
      "Executive reclining leather seating",
      "Smooth ride for airport business travel",
      "Device charging & flight monitoring",
      "Discreet, courteous professional chauffeurs",
    ],
    image: "/fleet_executive_sedan_1786503961868.jpg",
    slug: "/executive-car-service",
  },
  {
    id: "sprinter",
    title: "Executive Mercedes-Benz Sprinter",
    models: "Mercedes-Benz Sprinter Luxury Jet / Shuttle",
    capacity: "Up to 14 Passengers",
    luggage: "Up to 14 Bags",
    features: [
      "High-roof standing headroom & wide aisle",
      "Plush leather individual seating",
      "Large dedicated rear luggage compartment for ski gear",
      "Premium surround sound & rear climate zones",
      "Perfect for corporate roadshows & ski groups",
    ],
    image: "/vopt_sprinter.jpg",
    slug: "/group-transportation",
  },
] as const;

export const POPULAR_ROUTES = [
  {
    from: "Denver International Airport (DEN)",
    to: "Downtown Denver",
    time: "~40-50 min",
    desc: "Seamless curb-to-curb transfer to Cherry Creek, LoDo, Convention Center, and downtown luxury hotels.",
  },
  {
    from: "Denver International Airport (DEN)",
    to: "Vail & Beaver Creek",
    time: "~2h 15m - 2h 45m",
    desc: "Scenic I-70 private mountain transfer via AWD luxury SUVs equipped for Colorado winter road conditions.",
  },
  {
    from: "Denver International Airport (DEN)",
    to: "Aspen & Snowmass",
    time: "~3h 45m - 4h 15m",
    desc: "Private door-to-door luxury travel with scheduled comfort stops and professional mountain drivers.",
  },
  {
    from: "Denver International Airport (DEN)",
    to: "Breckenridge & Keystone",
    time: "~1h 45m - 2h 15m",
    desc: "Direct mountain ski shuttle for families and groups with room for all ski and snowboard gear.",
  },
  {
    from: "Denver International Airport (DEN)",
    to: "Boulder, CO",
    time: "~45-55 min",
    desc: "Executive chauffeur travel for university visits, corporate headquarters, and mountain foothills.",
  },
  {
    from: "Denver International Airport (DEN)",
    to: "Colorado Springs",
    time: "~1h 20m - 1h 40m",
    desc: "Private executive transfer to Broadmoor, US Air Force Academy, and southern Colorado.",
  },
] as const;
