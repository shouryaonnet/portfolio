"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 16,
  amount = 0.2,
  once = true,
  className = "",
}) {
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: {
      x: 0,
      y: distance,
    },

    down: {
      x: 0,
      y: -distance,
    },

    left: {
      x: distance,
      y: 0,
    },

    right: {
      x: -distance,
      y: 0,
    },

    none: {
      x: 0,
      y: 0,
    },
  };

  const offset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}