"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    techStack: "Next.js, Node.js, Express, Tailwind, MongoDB, Framer Motion",
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

    // Calculate scroll distance based on content height minus the viewport height.
    const scrollDistance =
      scrollContentEl.scrollHeight - rightColEl.clientHeight;

    gsap.to(scrollContentEl, {
      y: -scrollDistance,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 0.2,
      },
    });
  }, []);

  return (
    <section
      id="experience"
      ref={expRef}
      className="min-h-screen flex items-center justify-center text-white font-[Poppins]"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <div className="border-l-4 border-[#cf005d] pl-6">
            {leftLines.map((line, i) => (
              <h2
                key={i}
                className="text-7xl font-bold mb-4 bg-white text-transparent bg-clip-text leading-none uppercase"
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
            className="space-y-[50vh] text-xl leading-relaxed pt-[20vh] pb-[30vh]"
          >
            {experiences.map((exp, idx) => (
              <div key={idx} className="p-6 bg-opacity-10 rounded-xl max-w-lg">
                <h3 className="text-2xl font-semibold text-white">
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




