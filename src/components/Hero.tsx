"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // Section reference
  const heroRef = useRef(null);

  // Container for ALL letters ("SURAJ")
  const lettersContainerRef = useRef(null);

  // Letter references for split‑letter animation
  const sRef = useRef(null);
  const uRef = useRef(null);
  const rRef = useRef(null);
  const aRef = useRef(null);
  const jRef = useRef(null);

  useLayoutEffect(() => {
    // Reveal the hero section once GSAP is ready to apply initial settings.
    gsap.set(heroRef.current, { visibility: "visible" });
    // Set initial states (also defined inline as a fallback)
    gsap.set(lettersContainerRef.current, {
      scale: 2,
    });
    gsap.set(
      [sRef.current, uRef.current, rRef.current, aRef.current, jRef.current],
      {
        opacity: 0,
      }
    );

    // ----- INITIAL ANIMATION (Auto-Play) -----
    const initialTl = gsap.timeline({ delay: 0.5 });
    initialTl.to(sRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });
    initialTl.to(
      uRef.current,
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
    initialTl.to(
      rRef.current,
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
    initialTl.to(
      aRef.current,
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "+=0.2"
    );
    initialTl.to(
      jRef.current,
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // ----- SCROLL-TRIGGERED ANIMATION -----
    gsap
      .timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          // markers: true, // Uncomment for debugging
        },
      })
      .to(
        lettersContainerRef.current,
        {
          scale: 1,
          yPercent: -25,
          duration: 1,
          ease: "power3.inOut",
        },
        "+=0.3"
      );
  }, []);

  return (
    <section
  id="hero"
  ref={heroRef}
  className="h-screen w-full flex items-center justify-center overflow-hidden"
  style={{ visibility: "hidden" }} // Hide until GSAP makes it visible
>
  <div
    ref={lettersContainerRef}
    className="inspiration-regular text-[10vw] md:text-[13vw] font-bold uppercase leading-none flex items-center justify-center"
  >
    <span ref={sRef} className="text-[#cf005d] opacity-0 translate-y-24">S</span>
    <span ref={uRef} className="text-white opacity-0 translate-y-24">U</span>
    <span ref={rRef} className="text-white opacity-0 translate-y-24">R</span>
    <span ref={aRef} className="text-white opacity-0 translate-y-24">A</span>
    <span ref={jRef} className="text-white opacity-0 translate-y-24">J</span>
  </div>
</section>

  );
}
