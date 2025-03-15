"use client";

import { useEffect, useRef, JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. Import brand icons from react-icons/si
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

// 2. Map each skill to the appropriate icon & color
const skillIcons: Record<string, JSX.Element> = {
  "C++": <SiCplusplus size={40} className="text-[#00599C]" />,
  SQL: <SiMysql size={40} className="text-[#CC2927]" />, // Replaces SiMicrosoftsqlserver
  HTML: <SiHtml5 size={40} className="text-[#E34F26]" />,
  CSS: <SiCss3 size={40} className="text-[#1572B6]" />,
  JavaScript: <SiJavascript size={40} className="text-[#F7DF1E]" />,

  React: <SiReact size={40} className="text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs size={40} className="text-white" />,
  "Node.js": <SiNodedotjs size={40} className="text-[#339933]" />,

  MySQL: <SiMysql size={40} className="text-[#4479A1]" />,
  PostgreSQL: <SiPostgresql size={40} className="text-[#336791]" />,
  MongoDB: <SiMongodb size={40} className="text-[#47A248]" />,

  Git: <SiGit size={40} className="text-[#F05032]" />,
  "VS Code": <SiMysql size={40} className="text-[#007ACC]" />, // Replaces SiVisualstudiocode
  Postman: <SiPostman size={40} className="text-[#FF6C37]" />,
  Tailwind: <SiTailwindcss size={40} className="text-[#38B2AC]" />,
  "Framer Motion": <SiFramer size={40} className="text-[#CF005D]" />,
};

// 3. Your skill sections
const skillSections = [
  {
    heading: "Languages",
    direction: -300,
    items: ["C++", "SQL", "HTML", "CSS", "JavaScript"],
  },
  {
    heading: "Frameworks",
    direction: 300,
    items: ["React", "Next.js", "Node.js"],
  },
  {
    heading: "Databases",
    direction: -300,
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    heading: "Dev Tools",
    direction: 300,
    items: ["Git", "VS Code", "Postman", "Tailwind", "Framer Motion"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Fade in the entire section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate each skill row's horizontal movement (only transform)
    const rows = sectionRef.current.querySelectorAll<HTMLElement>(".skill-row-content");
    rows.forEach((row, i) => {
      const direction = skillSections[i].direction;
      // Set initial transform with GPU acceleration
      gsap.set(row, { x: direction, force3D: true });
      // Animate only the horizontal transform on scroll
      gsap.to(row, {
        x: 0,
        ease: "power2.out",
        duration: 1,
        force3D: true,
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className=" text-white py-20 px-6 font-[Poppins] relative"
    >
      {/* Centered Main Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold inline-block  px-6 py-2 rounded-full">
          Skills
        </h2>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        {skillSections.map((section, i) => (
          <div key={section.heading} className="skill-row">
            {/* Section Heading */}
            <h3 className="text-2xl font-bold text-center mb-6 ">
              {section.heading}
            </h3>
            {/* Row Content */}
            <div
              className="skill-row-content flex flex-wrap justify-center gap-6 will-change-transform"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {section.items.map((item) => (
                <SkillCard key={item} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Single skill card
 */
function SkillCard({ item }: { item: string }) {
  // If no icon is found, fallback to <SiCplusplus />
  const Icon = skillIcons[item] || <SiCplusplus size={40} className="text-[#00599C]" />;
  return (
    <div className="w-28 h-28 bg-[#181818] rounded-lg shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
      <div className="mb-2">{Icon}</div>
      <span className="text-gray-300 text-sm">{item}</span>
    </div>
  );
}
