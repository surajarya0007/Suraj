"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "API_Security_Shield",
    link: "https://management-fontend.vercel.app/Login",
    date: "Aug '24",
    description: "Inventory Management System for API database.",
    points: [
      "Created a comprehensive API management system focused on real-time API inventory, security assessments, and role-based data access.",
      "Designed a personalized dashboard for seamless data handling.",
    ],
  },
  {
    name: "TeeGenius",
    link: "https://github.com/Prasoon2050/Stage0",
    date: "July '24",
    description:
      "E-commerce website for custom-printed t-shirts with AI integration.",
    points: [
      "Built a full-stack application using Next.js, Tailwind CSS, Node.js, MongoDB, and JWT authentication.",
      "Enabled users to purchase and sell custom-designed t-shirts.",
      "Integrated AI for prompt-based design generation.",
    ],
  },
  {
    name: "You and Me",
    link: "https://you-and-me-jet.vercel.app/",
    date: "Feb '24",
    description: "A social media website for wedding memories.",
    points: [
      "Developed a wedding invitation platform with guest authentication features.",
      "Enabled guests to upload, download, and like photos for memory sharing.",
      "Implemented separate database views for the groom's and bride's sides.",
    ],
  },
  {
    name: "NFT Market Place (Decentralized App)",
    date: "May '23",
    description: "A marketplace for minting NFTs and a personal crypto token.",
    points: [
      "Spearheaded development of a decentralized NFT marketplace using a React.js frontend and a Motoko-powered backend integrated with Web3 technologies.",
      "Enabled over 500 users to securely upload, list, and sell NFTs for crypto tokens.",
    ],
  },
  {
    name: "Portfolio Website",
    link: "https://port-taupe-mu.vercel.app/",
    date: "Jun '22",
    description:
      "A full-stack portfolio website created using React to showcase my skills.",
    points: [],
  },
];

export default function Projects() {
  const projRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!projRef.current) return;

    // Stacking Cards Effect
    const cards = gsap.utils.toArray<HTMLElement>(".card");

    const spacer = 20;
    const minScale = 0.8;

    const distributor = gsap.utils.distribute({ base: minScale, amount: 0.2 });

    cards.forEach((card, index) => {
      const scaleVal = distributor(index, cards[index], cards);

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: `top top`,
          scrub: true,
          invalidateOnRefresh: true,
        },
        ease: "none",
        scale: scaleVal,
      });

      ScrollTrigger.create({
        trigger: card,
        start: `top-=${index * spacer} top`,
        endTrigger: ".cards",
        end: `bottom top+=${450 + cards.length * spacer}`,
        pin: true,
        pinSpacing: false,
        id: "pin",
        invalidateOnRefresh: true,
      });
    });
  }, []);

  return (
    <section id="testimonials" ref={projRef} className="py-20 px-6 relative">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#cf005d] to-[#ff4d79] text-transparent bg-clip-text">
        Projects
      </h2>

      <div className="cards relative" style={{ height: "420vh" }}>
        {projects.map((project, index) => (
          <div
            key={index}
            className="card absolute left-1/2 transform -translate-x-1/2 w-11/12 h-[580px] bg-black p-8 rounded-2xl shadow-xl"
            style={{
              top: `${index * 600}px`,
            }}
          >
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-semibold text-[#cf005d] hover:underline"
              >
                {project.name}
              </a>
            ) : (
              <span className="text-2xl font-semibold text-[#cf005d]">
                {project.name}
              </span>
            )}
            <p className="text-sm text-gray-400 mt-2">{project.date}</p>
            <p className="text-gray-300 mt-4">{project.description}</p>
            {project.points.length > 0 && (
              <ul className="list-disc list-inside ml-4 mt-4 space-y-1 text-gray-400">
                {project.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
