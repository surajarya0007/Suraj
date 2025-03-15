"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "../../public/profile.png";

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

  // References for subtext, button, image, date
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const dateRef = useRef(null);

  useLayoutEffect(() => {
    // Reveal the hero section once GSAP is ready to apply initial settings.
    gsap.set(heroRef.current, { visibility: "visible" });
    // Set initial states (also defined inline as a fallback)
    gsap.set(lettersContainerRef.current, {
      scale: 2,
      yPercent: 50,
    });
    gsap.set([sRef.current, uRef.current, rRef.current, aRef.current, jRef.current], {
      y: 100,
      opacity: 0,
    });

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
      )
      .from(
        subTextRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        imageRef.current,
        {
          opacity: 0,
          x: 100,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7"
      )
      .from(
        dateRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="h-screen w-full flex flex-col items-center justify-center"
      style={{ visibility: "hidden" }}  // Hide until GSAP makes it visible
    >
      {/* Split-Letter Container */}
      <div
        ref={lettersContainerRef}
        className="inspiration-regular text-[13vw] font-bold uppercase leading-none text-center w-full flex justify-center gap-4"
      >
        {/* PARTIAL LETTERS: S, U, R */}
        <span
          ref={sRef}
          className="text-[#cf005d]"
          style={{ opacity: 0, transform: "translateY(100px)" }}
        >
          S
        </span>
        <span
          ref={uRef}
          className="text-white"
          style={{ opacity: 0, transform: "translateY(100px)" }}
        >
          U
        </span>
        <span
          ref={rRef}
          className="text-white"
          style={{ opacity: 0, transform: "translateY(100px)" }}
        >
          R
        </span>
        {/* MISSING LETTERS: A, J */}
        <span
          ref={aRef}
          className="text-white"
          style={{ opacity: 0, transform: "translateY(100px)" }}
        >
          A
        </span>
        <span
          ref={jRef}
          className="text-white"
          style={{ opacity: 0, transform: "translateY(100px)" }}
        >
          J
        </span>
      </div>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-8 px-6">
        {/* Left Side: Text & Button */}
        <div className="md:w-1/3 text-left space-y-6">
          <p
            ref={subTextRef}
            className="text-lg max-w-md text-gray-300"
          >
            I help growing brands and startups gain an unfair advantage through
            premium, results-driven websites.
          </p>
          <button
            ref={buttonRef}
            className="px-6 py-3 bg-[#cf005d] text-white rounded-full uppercase tracking-wide hover:bg-[#a30048] shadow-lg"
          >
            Book a Call ↗
          </button>
        </div>
        {/* Right Side: Image */}
        <div
          ref={imageRef}
          className="md:w-1/3 flex justify-center mt-6 md:mt-0"
        >
          <img src={heroImg.src} alt="Hero" className="w-72 h-72" />
        </div>
        {/* Availability Text */}
        <div
          ref={dateRef}
          className="md:w-1/3 flex flex-col justify-end h-full items-end text-right text-gray-300 text-sm"
        >
          <p className="uppercase font-mono">Available for freelance work</p>
          <p className="text-3xl font-bold text-white">Apr ‘25</p>
        </div>
      </div>
    </section>
  );
}
