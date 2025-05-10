"use client";

import { useEffect, useRef, useState, JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiPostman,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skillIcons: Record<string, JSX.Element> = {
  "C++": (
    <SiCplusplus className="text-[#00599C] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  SQL: (
    <SiMysql className="text-[#CC2927] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  HTML: (
    <SiHtml5 className="text-[#E34F26] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  CSS: (
    <SiCss3 className="text-[#1572B6] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  JavaScript: (
    <SiJavascript className="text-[#F7DF1E] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  React: (
    <SiReact className="text-[#61DAFB] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  "Next.js": (
    <SiNextdotjs className="text-white w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  "Node.js": (
    <SiNodedotjs className="text-[#339933] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  MySQL: (
    <SiMysql className="text-[#4479A1] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  PostgreSQL: (
    <SiPostgresql className="text-[#336791] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  MongoDB: (
    <SiMongodb className="text-[#47A248] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  Git: (
    <SiGit className="text-[#F05032] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  Postman: (
    <SiPostman className="text-[#FF6C37] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  Tailwind: (
    <SiTailwindcss className="text-[#38B2AC] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
  "Framer Motion": (
    <SiFramer className="text-[#CF005D] w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72" />
  ),
};

const allItems = [
  "C++",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "Postman",
  "Tailwind",
  "Framer Motion",
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [scrollAnim, setScrollAnim] = useState<gsap.core.Animation | null>(
    null
  );

  useEffect(() => {
    const containerEl = containerRef.current;
    const rowEl = rowRef.current;
    if (!containerEl || !rowEl) return;

    const totalWidth = rowEl.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    const anim = gsap.to(rowEl, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerEl,
        start: "center center",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
      },
    });
    setScrollAnim(anim);
  }, []);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full h-screen bg-black text-white flex flex-col justify-center overflow-hidden py-10"
    >
      {/* Horizontal scrolling row */}
      <div
        ref={rowRef}
        className="flex justify-center items-center w-max gap-16"
      >
        {/* Spacer with animated Skills text occupying full viewport width */}

        <SkillsText scrollAnim={scrollAnim} />

        {allItems.map((item, index) => (
          <SkillCard key={index} item={item} scrollAnim={scrollAnim} />
        ))}
      </div>
    </section>
  );
}

/**
 * SkillsText Component
 * The text starts hidden (opacity: 0, x: -100). A narrow trigger range forces
 * the text to reset its state on leaving, so its fade/slide animation plays every time it reaches the center.
 */
function SkillsText({
  scrollAnim,
}: {
  scrollAnim: gsap.core.Animation | null;
}) {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || !scrollAnim) return;

    // Use GSAP.matchMedia to set different x values based on viewport width.
    const mm = gsap.matchMedia();
    let initialX = 500; // default for larger screens

    mm.add("(max-width: 768px)", () => {
      initialX = 50; // smaller x for small screens
      // Reset the element state for small screens.
      gsap.set(el, { opacity: 0, x: initialX, scale: 5.5 });
    });

    mm.add("(min-width: 769px)", () => {
      initialX = 500;
      // Reset the element state for larger screens.
      gsap.set(el, { opacity: 0, x: initialX, scale: 5.5 });
    });

    // Create a timeline that's scrubbed by scroll.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        containerAnimation: scrollAnim,
        start: "left right", // adjust as needed
        end: "center center",
        scrub: true, // ties the animation progress to the scroll position
      },
    });

    // Animate the text gradually as the scroll progresses.
    tl.to(el, {
      opacity: 1,
      x: 0,
      scale: 2,
      ease: "power2.out",
      duration: 1,
    });

    // Clean up on unmount.
    return () => {
      tl.kill();
      mm.revert();
    };
  }, [scrollAnim]);

  return (
    <div className="flex items-center justify-center h-full w-[100vw] ml-[100vw] ">
      <h2
        ref={textRef}
        className="text-5xl md:text-9xl font-bold inspiration-regular"
      >
        S k i l l s
      </h2>
    </div>
  );
}

/**
 * SkillCard Component with individual scroll-triggered animations.
 */
function SkillCard({
  item,
  scrollAnim,
}: {
  item: string;
  scrollAnim: gsap.core.Animation | null;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !scrollAnim) return;

    const baseConfig = {
      scrollTrigger: {
        trigger: el,
        containerAnimation: scrollAnim,
        start: "right right",
        end: "center center",
        scrub: 1,
      },
    };

    let anim;
    switch (item) {
      case "C++":
        anim = gsap.from(el, {
          duration: 1,
          opacity: 0,
          rotation: 360,
          scale: 0.5,
          y: -50,
          ease: "power2.out",
          delay: 0.2,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "SQL":
        anim = gsap.from(el, {
          duration: 1,
          scale: 0,
          rotation: 180,
          x: -100,
          ease: "back.out(1.7)",
          delay: 0.1,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "HTML":
        anim = gsap.from(el, {
          duration: 1,
          x: -100,
          opacity: 0,
          scale: 0.8,
          rotation: -45,
          ease: "power2.out",
          delay: 0.15,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "CSS":
        anim = gsap.from(el, {
          duration: 1,
          x: 100,
          opacity: 0,
          scale: 0.8,
          rotation: 45,
          ease: "power2.out",
          delay: 0.15,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "JavaScript":
        anim = gsap.from(el, {
          duration: 1,
          y: 100,
          x: 50,
          opacity: 0,
          scale: 1.2,
          ease: "bounce.out",
          delay: 0.2,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "React":
        anim = gsap.from(el, {
          duration: 1,
          y: -100,
          x: -50,
          opacity: 0,
          scale: 1.2,
          ease: "bounce.out",
          delay: 0.2,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "Next.js":
        anim = gsap.from(el, {
          duration: 1,
          rotationX: 90,
          opacity: 0,
          scale: 0.7,
          y: 30,
          ease: "back.out(1.7)",
          delay: 0.1,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "Node.js":
        anim = gsap.from(el, {
          duration: 1,
          rotationY: 90,
          opacity: 0,
          x: 30,
          scale: 0.7,
          ease: "back.out(1.7)",
          delay: 0.1,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "MySQL":
        anim = gsap.from(el, {
          duration: 1,
          scale: 0.5,
          opacity: 0,
          x: 100,
          rotation: 90,
          ease: "elastic.out(1, 0.3)",
          delay: 0.15,
          repeat: 0,
          yoyo: true,
          ...baseConfig,
        });
        break;
      case "PostgreSQL":
        anim = gsap.from(el, {
          duration: 1,
          rotation: -180,
          opacity: 0,
          y: 100,
          scale: 1.1,
          ease: "power2.out",
          delay: 0.15,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "MongoDB":
        anim = gsap.from(el, {
          duration: 1,
          x: 50,
          y: 50,
          opacity: 0,
          rotation: 45,
          scale: 1.2,
          ease: "power2.out",
          delay: 0.1,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "Git":
        anim = gsap.from(el, {
          duration: 1,
          rotation: 720,
          opacity: 0,
          x: -200,
          scale: 0.3,
          ease: "expo.out",
          delay: 0.2,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "Postman":
        anim = gsap.from(el, {
          duration: 1,
          y: 200,
          opacity: 0,
          x: 100,
          scale: 0.8,
          ease: "bounce.out",
          delay: 0.2,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "Tailwind":
        anim = gsap.from(el, {
          duration: 1,
          x: -200,
          opacity: 0,
          y: -50,
          scale: 1.3,
          ease: "power2.out",
          delay: 0.1,
          repeat: 0,
          ...baseConfig,
        });
        break;
      case "Framer Motion":
        anim = gsap.from(el, {
          duration: 1,
          x: 200,
          opacity: 0,
          y: 50,
          rotation: -90,
          ease: "power2.out",
          delay: 0.1,
          repeat: 0,
          ...baseConfig,
        });
        break;
      default:
        anim = gsap.from(el, {
          duration: 1,
          opacity: 0,
          scale: 0.8,
          ease: "power2.out",
          delay: 0.1,
          repeat: 0,
          ...baseConfig,
        });
        break;
    }

    return () => {
      if (anim && anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
    };
  }, [item, scrollAnim]);

  const Icon = skillIcons[item] || (
    <SiCplusplus size={200} className="text-[#00599C]" />
  );
  return (
    <div className="px-6 md:px-12">
      <div ref={cardRef}>{Icon}</div>
    </div>
  );
}
