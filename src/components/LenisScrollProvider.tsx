"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { ReactNode } from "react";

export default function LenisScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis with your preferred options
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Create a RAF loop to update Lenis on each animation frame
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup if needed when the component unmounts
    return () => {
      lenis.destroy();

      // Optionally, if Lenis offers a stop method:
      // lenis.stop();
    };
  }, []);

  return <>{children}</>;
}
