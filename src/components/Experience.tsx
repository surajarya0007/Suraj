"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into word spans for animations.
 */
function splitIntoWordSpans(text: string) {
  return text.split(" ").map((word, idx) => (
    <span key={idx} className="word inline-block mr-1">
      {word}
    </span>
  ));
}

export default function Experience() {
  const expRef = useRef<HTMLElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  const leftLines = ["WHY", "ME?"];
  const experiences = [
    {
      title: "Tata Consultancy Services",
      techStack:
        "Next.js, Node.js, Express, Tailwind, MongoDB, Framer Motion",
      points: [
        "Developed and maintained scalable client projects using Next.js.",
        "Collaborated with cross-functional teams to optimize MongoDB performance.",
        "Integrated dynamic animations with Framer Motion to elevate user experience.",
      ],
    },
    {
      title: "Cadence Design Systems",
      techStack: "Node.js, Express, MySQL, React Native",
      points: [
        "Refined the website frontend to deliver a modern, user-centric interface.",
        "Managed and updated the product verification module to ensure data accuracy.",
      ],
    },
  ];

  useEffect(() => {
    const sectionEl = expRef.current;
    const rightColEl = rightColumnRef.current;
    const scrollContentEl = scrollContentRef.current;
    if (!sectionEl || !rightColEl || !scrollContentEl) return;
  
    // Calculate the scroll distance based on content height minus viewport height.
    const scrollDistance =
      scrollContentEl.scrollHeight - rightColEl.clientHeight;
  
    // Create a unified timeline with a single scrollTrigger.
    // Adjust the end value if needed so the entire timeline fits within your desired scroll range.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        // The end value now includes both the left animation duration and the right scroll tween.
        end: `+=${1300 + scrollDistance}`,
        scrub: 0.5,
        pin: true,
      },
    });
  
    // Left Column: text animation
    const leftColumn = sectionEl.querySelector(".left-column");
    if (leftColumn) {
      const headers = leftColumn.querySelectorAll("h2");
      headers.forEach((header, index) => {
        const splitText = new SplitType(header, { types: "chars" });
        tl.fromTo(
          splitText.chars,
          {
            willChange: "transform, opacity",
            opacity: 0,
            scale: 5.5,
            y: (i, target, arr) =>
              -40 * Math.abs(i - arr.length / 2),
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
  
    // Right Column: animate after the left column animation completes.
    // By adding this tween to the same timeline after the left column animations,
    // it won’t start until the previous tweens are done.
    tl.to(
      scrollContentEl,
      {
        y: -scrollDistance,
        ease: "power1.out",
        duration: 1.5,
      },
      ">" // this means start immediately after the previous tween completes
    );
  }, []);
  

  return (
    <section
      id="experience"
      ref={expRef}
      className="min-h-screen flex items-center justify-center text-white font-[Poppins]"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {/* Left Column */}
        <div className="flex flex-col justify-center mt-10">
          <div className="border-l-4 border-[#cf005d] pl-6 left-column">
            {leftLines.map((line, i) => (
              <h2
                key={i}
                className="text-6xl md:text-7xl font-bold mb-4  leading-none uppercase"
              >
                {line}
              </h2>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightColumnRef} className="relative h-screen overflow-hidden">
          <div
            ref={scrollContentRef}
            className="space-y-[20vh] md:space-y-[50vh] text-lg md:text-xl leading-relaxed pt-[70vh] md:pt-[20vh] pb-[40vh] md:pb-[30vh]"
          >
            {experiences.map((exp, idx) => (
              <div key={idx} className="p-6 bg-opacity-10 rounded-xl max-w-lg">
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {exp.title}
                </h3>
                <p className="mt-4">
                  <span className="font-semibold text-[#cf005d]">
                    Tech Stack:
                  </span>{" "}
                  {splitIntoWordSpans(exp.techStack)}
                </p>
                <ul className="list-disc list-inside mt-4 space-y-4 text-gray-300">
                  {exp.points.map((point, i) => (
                    <li key={i}>{splitIntoWordSpans(point)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
