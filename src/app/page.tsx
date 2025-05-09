"use client";
import { useState, useEffect, useRef } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import LoadingAnimation from "@/components/LoadingAnimation";
import Navbar from "@/components/Navbar";
import CompetitiveProgramming from "@/components/CompetitiveProgramming";

// Custom smooth scroll function
function smoothScrollTo(targetY: number, duration: number, callback: () => void) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  duration = duration + diff;
  let start: number | undefined;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);
    window.scrollTo(0, startY + diff * percent);
    if (progress < duration) {
      requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  }
  requestAnimationFrame(step);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save scroll position before page unload
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };
    window.addEventListener("beforeunload", saveScrollPosition);
    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  // Trigger animations and smooth scroll on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        smoothScrollTo(parseInt(scrollPosition, 10), 100, () => {});
        sessionStorage.removeItem("scrollPosition");
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Listen to scroll events to control Navbar appearance.
  // When the Hero section is scrolled out of view, show the Navbar.
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        // Get the bottom position of the Hero element relative to the viewport.
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        if (heroBottom <= 0) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Check immediately in case the page is already scrolled
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Loading Animation Overlay */}
      {isLoading && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 
          bg-transparent backdrop-blur-sm transition-all duration-1000 
          ${animateOut ? "opacity-0" : "opacity-100"}`}
        >
          <LoadingAnimation />
        </div>
      )}

      {/* Main Content */}
      <div className={`${isLoading ? "visible" : "opacity-100"} transition-opacity duration-1000`}>
        {/* Conditionally render Navbar */}
        {showNavbar && <Navbar />}
        {/* Attach ref to Hero section */}
        <div ref={heroRef}>
          <Hero />
        </div>
        <About />
        <Experience />
        <CompetitiveProgramming />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}
