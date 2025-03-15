"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "../components/Footer";
import LoadingAnimation from "@/components/LoadingAnimation";

// Custom smooth scroll function
function smoothScrollTo(
  targetY: number,
  duration: number,
  callback: () => void
) {
  const startY = 0;
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

  useEffect(() => {
    window.scrollTo(0, 0); // Set scroll to top when the component mounts
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

  // Trigger both the fade-out animation and scrolling concurrently
  useEffect(() => {
    const timer = setTimeout(() => {
      // Trigger exit animation
      setAnimateOut(true);

      // Start smooth scrolling concurrently
      const scrollPosition = sessionStorage.getItem("scrollPosition");
      if (scrollPosition) {
        smoothScrollTo(parseInt(scrollPosition, 10), 500, () => {});
        sessionStorage.removeItem("scrollPosition");
      }

      // Remove the overlay after the longer of the two animations (adjust if needed)
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Here, 1000ms covers the fade-out duration
    }, 3500); // Initial delay before animations begin

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Loading Animation Overlay */}
      {isLoading && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 
          bg-transparent backdrop-blur-lg transition-all duration-1000 
          ${animateOut ? "opacity-0" : "opacity-100"}`}
        >
          <LoadingAnimation />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`${
          isLoading ? "visible" : "opacity-100"
        } transition-opacity duration-1000`}
      >
        {/* <Navbar /> */}
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
