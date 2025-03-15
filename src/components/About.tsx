"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Required to enable scroll-based animations
gsap.registerPlugin(ScrollTrigger);

/**
 * Splits a string into <span className="word">word</span> elements for word-by-word animation.
 */
function splitIntoWordSpans(text: string) {
  return text.split(" ").map((word, idx) => (
    <span key={idx} className="word inline-block mr-1">
      {word}
    </span>
  ));
}

export default function About() {
  const aboutRef = useRef<HTMLElement | null>(null);

  // We'll define the left text lines and the right paragraphs
  const leftLines = ["WHO", "AM I?"];
  const paragraphs = [
    "Driven by a passion for design and development, I transform ideas into innovative digital solutions—taking projects from initial concept to successful launch while delivering memorable user experiences and fostering business growth.",
    "I focus on crafting intuitive and visually engaging web experiences, where every detail is fine-tuned to ensure functionality meets creativity.",
    "Beyond the screen, I share my journey through digital content, explore creative pursuits, and draw inspiration from music and nature.",
  ];

  useEffect(() => {
    const sectionEl = aboutRef.current;
    if (!sectionEl) return;
  
    // Create a unified timeline with a single scrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "+=5000",
        pin: true,
        scrub: 0.5,
      },
    });
  
    // Left column animation: animate header characters more slowly
    const leftColumn = sectionEl.querySelector(".left-column");
    if (leftColumn) {
      const headers = leftColumn.querySelectorAll("h2");
      headers.forEach((header, index) => {
        const splitText = new SplitType(header as HTMLElement, { types: "chars" });
        tl.fromTo(
          splitText.chars,
          {
            willChange: "transform, opacity",
            opacity: 0,
            scale: 5.5,
            y: (i, target, arr) => -40 * Math.abs(i - arr.length / 2),
            z: () => gsap.utils.random(-500, -600),
            rotateX: () => gsap.utils.random(-500, -200),
          },
          {
            duration: 1.5,
            ease: "power1.inOut",
            opacity: 1,
            y: 0,
            z: 0,
            scale: 1,
            rotateX: 0,
            stagger: { each: 0.06, from: "center" },
          },
          index === 0 ? 0 : ">0"
        );
      });
    }
  
    // Right column: apply only character animation more slowly
    const rightParagraphs = sectionEl.querySelectorAll(".right-column p");
    rightParagraphs.forEach((para) => {
      // Split the paragraph into characters only
      const splitText = new SplitType(para as HTMLElement, { types: "chars" });
      tl.fromTo(
        splitText.chars,
        {
          autoAlpha: 0,
          scale: 4,
          rotationX: -180,
          transformOrigin: "100% 50%",
        },
        {
          duration: 1.5,
          autoAlpha: 1,
          scale: 1,
          rotationX: 0,
          ease: "back",
          stagger: 0.02,
        },
        ">0.5" // Starts after the left column animation
      );
      
    });
  }, []);
  
  
  

  return (
    <section
      id="about"
      ref={aboutRef}
      className="min-h-screen flex items-center justify-center text-white font-[Poppins]"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {/* Left Column: Large question with vertical line */}
        <div className="flex flex-col justify-center">
          <div className="border-l-4 border-[#cf005d] pl-6 left-column">
            {leftLines.map((line, i) => (
              <h2
                key={i}
                className="text-7xl font-bold mb-2  leading-none uppercase"
              >
                {line}
              </h2>
            ))}
          </div>
        </div>

        {/* Right Column: Word-by-word paragraphs */}
        <div className="right-column space-y-6 text-xl leading-relaxed">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-300">
              {splitIntoWordSpans(para)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
