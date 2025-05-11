import { ReactNode } from "react";
import { useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";

interface AnimatedRoutesProps {
  children: ReactNode;
}

export function AnimatedRoutes({ children }: AnimatedRoutesProps) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location}>{children}</div>
    </AnimatePresence>
  );
}