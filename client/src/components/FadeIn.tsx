import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up" 
}: FadeInProps) {
  // Define direction-based offsets
  const directionOffset = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 }
  };

  const offset = directionOffset[direction];

  // Animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      ...offset 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier easing
        delay: delay
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}