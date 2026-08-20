"use client";

import { useState, useCallback } from "react";
import { motion, type Transition } from "framer-motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
  revealDirection?: "start" | "end" | "center" | "random";
}

function getRevealOrder(length: number, direction: "start" | "end" | "center" | "random"): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  if (direction === "end") return indices.reverse();
  if (direction === "center") {
    const mid = Math.floor(length / 2);
    return indices.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
  }
  if (direction === "random") return indices.sort(() => Math.random() - 0.5);
  return indices; // "start"
}

export function RandomLetterSwap({
  label,
  className = "",
  staggerDuration = 0.025,
  transition = { duration: 0.5, type: "spring" },
  revealDirection = "random",
}: RandomLetterSwapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayChars, setDisplayChars] = useState<string[]>(label.split(""));

  const animate = useCallback(() => {
    const chars = label.split("");
    const order = getRevealOrder(chars.length, revealDirection);
    const intervals: ReturnType<typeof setTimeout>[] = [];

    order.forEach((charIndex, step) => {
      if (chars[charIndex] === " ") return;
      let iterations = 0;
      const maxIterations = 8;

      const interval = setInterval(() => {
        setDisplayChars((prev) => {
          const next = [...prev];
          if (iterations < maxIterations) {
            next[charIndex] = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          } else {
            next[charIndex] = chars[charIndex];
            clearInterval(interval);
          }
          iterations++;
          return next;
        });
      }, (staggerDuration * 1000 * step) / order.length + 40);

      intervals.push(interval);
    });
  }, [label, staggerDuration, revealDirection]);

  return (
    <motion.span
      className={`inline-flex overflow-hidden ${className}`}
      onHoverStart={() => {
        setIsHovered(true);
        animate();
      }}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={label}
    >
      {displayChars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ minWidth: char === " " ? "0.3em" : undefined }}
          animate={isHovered ? { y: 0 } : { y: 0 }}
          transition={transition}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
