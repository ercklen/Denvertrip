"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
  time?: string;
}

const slides: Slide[] = [
  {
    image: "/dest_vail_mountain_1786504003022.jpg",
    title: "Vail & Beaver Creek",
    description: "World-class mountain resort transfers with luxury all-weather 4WD SUVs.",
    badge: "Ski Resort",
    time: "~2h 30min",
  },
  {
    image: "/dest_aspen_1786508288136.jpg",
    title: "Aspen & Snowmass",
    description: "Premier private chauffeur service to Aspen's luxury resorts and private residences.",
    badge: "Executive",
    time: "~4h",
  },
  {
    image: "/dest_breckenridge_1786508308049.jpg",
    title: "Breckenridge & Summit",
    description: "Direct airport transfers to Breckenridge, Keystone, and Copper Mountain.",
    badge: "Mountain",
    time: "~1h 45min",
  },
  {
    image: "/dest_downtown_denver_1786503992679.jpg",
    title: "Downtown Denver",
    description: "Corporate travel, hotel transfers, and luxury transportation across the Denver Metro.",
    badge: "Metro & DIA",
    time: "~45 min",
  },
  {
    image: "/dest_boulder_1786508277820.jpg",
    title: "Boulder & Flatirons",
    description: "Executive and university transfers between DIA and Boulder with premium comfort.",
    badge: "VIP Service",
    time: "~1h 15min",
  },
  {
    image: "/dest_colorado_springs_1786508297951.jpg",
    title: "Colorado Springs",
    description: "Long-distance luxury chauffeured rides to The Broadmoor and Garden of the Gods.",
    badge: "Long Distance",
    time: "~2h 10min",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 100,
      velocityDivisor: 450,
      sensitivity: 150,
      xMultiplier: 45,
      yMultiplier: 12,
      rotationMultiplier: 5,
      scaleReduction: 0.08,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 150,
      velocityDivisor: 600,
      sensitivity: 200,
      xMultiplier: 100,
      yMultiplier: 25,
      rotationMultiplier: 8,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export const CarouselStacked = () => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-6 select-none">
      <div className="relative w-full max-w-6xl h-80 sm:h-96 lg:h-112 flex items-center justify-center">
        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          onTap={() => {
            const activeIndex = (Math.round(scrollProgress.get()) % total + total) % total;
            const slide = slides[activeIndex];
            if (typeof window !== "undefined" && (window as any).openRouteModal) {
              const modal = document.getElementById("routeModal");
              if (modal) {
                modal.classList.add("open");
                document.body.classList.add("modal-open");
              }
              (window as any).openRouteModal(slide.title, slide.time || "~1h", slide.description);
            }
          }}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 text-xs text-[#b89535] uppercase tracking-widest">
        <span>← Swipe to Explore →</span>
        <span className="hidden sm:block">•</span>
        <span>Tap to View Route Preview</span>
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-2xl overflow-hidden bg-[#161616] border border-[#d4af37]/30 shadow-2xl group pointer-events-none",
        "w-44 h-64 sm:w-60 sm:h-84 lg:w-72 lg:h-96",
      )}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
      />

      <motion.div
        style={{
          opacity: useTransform(
            offset,
            [-2, -0.5, 0, 0.5, 2],
            [0.6, 0.25, 0, 0.25, 0.6],
          ),
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-widest shadow-md">
        {slide.badge}
      </Badge>

      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-5 sm:right-5 text-white text-left">
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-base sm:text-lg lg:text-xl font-bold leading-tight mb-1 text-[#f5f5f5] drop-shadow-md font-serif"
        >
          {slide.title}
        </motion.p>
        <motion.p
          style={{
            opacity: useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]),
          }}
          className="text-xs text-white/80 line-clamp-2 font-normal"
        >
          {slide.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
