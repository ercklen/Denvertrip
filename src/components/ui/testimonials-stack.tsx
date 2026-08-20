"use client"

import * as React from "react"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/ui/animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const REAL_TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Michael Vance",
    location: "Aspen Ski Trip",
    rating: 5,
    description:
      "Arrived at DIA during a heavy snowstorm. Our chauffeur was waiting at baggage claim, guided us to a pristine 4WD Escalade with ski racks, and navigated I-70 to Aspen effortlessly. Flawless 5-star experience.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "testimonial-2",
    name: "Sarah Jenkins",
    location: "Corporate Travel / Downtown Denver",
    rating: 5,
    description:
      "We rely on Denvertrip for all our executive board transportation between Denver Airport and our headquarters in Cherry Creek. Punctual, discreet, and exceptionally professional every single time.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "testimonial-3",
    name: "David Sterling",
    location: "Vail Family Vacation",
    rating: 5,
    description:
      "Traveling with 4 kids and 6 pieces of luggage is usually chaotic. The custom Sprinter van gave us immense comfort, complimentary drinks, and child car seats pre-installed. The gold standard of airport transfers.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "testimonial-4",
    name: "Elena Rostova",
    location: "Breckenridge Wedding Party",
    rating: 5,
    description:
      "Booked two vehicles for our wedding guests from DEN to Breckenridge. Flight delays were tracked automatically and drivers adjusted without any stress. Highly recommend Denvertrip!",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  },
]

export function TestimonialsStack() {
  return (
    <div className="w-full bg-[#0a0a0a] text-white py-4">
      <ContainerScroll className="container mx-auto h-[350vh] max-w-4xl">
        <div className="sticky left-0 top-20 h-[80vh] w-full flex items-center justify-center">
          <CardsContainer className="mx-auto size-full h-[460px] max-w-[380px] sm:max-w-[440px]">
            {REAL_TESTIMONIALS.map((testimonial, index) => (
              <CardTransformed
                arrayLength={REAL_TESTIMONIALS.length}
                key={testimonial.id}
                variant="light"
                index={index}
                role="article"
                className="bg-[#141414]/98 border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <ReviewStars rating={testimonial.rating} />
                    <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider bg-[#d4af37]/10 px-2.5 py-1 rounded-full border border-[#d4af37]/25">
                      Verified Client
                    </span>
                  </div>
                  <blockquote className="text-sm sm:text-base text-stone-200 leading-relaxed font-light italic">
                    "{testimonial.description}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-4">
                  <Avatar className="size-12 border-2 border-[#d4af37]">
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-[#1f1f1f] text-[#d4af37] font-bold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-base font-semibold text-white font-serif">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-[#b89535]">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
      <p className="text-center text-xs text-[#b89535] uppercase tracking-widest mt-2">
        ↓ Scroll down to reveal all {REAL_TESTIMONIALS.length} reviews ↓
      </p>
    </div>
  )
}

export default TestimonialsStack
