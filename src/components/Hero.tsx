"use client";
import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // Hero section & SURAJ refs
  const heroRef = useRef(null);
  const lettersContainerRef = useRef(null);
  const sRef = useRef(null);
  const uRef = useRef(null);
  const rRef = useRef(null);
  const aRef = useRef(null);
  const jRef = useRef(null);
  // Header / Navbar refs
  const navRef = useRef(null);
  const buttonRef = useRef(null);
  // Marquee refs for "Suraj Arya –"
  const sliderRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  const thirdTextRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  // Right and Left static text refs
  const rightTextRef = useRef(null);
  const leftTextRef = useRef(null);

  // SURAJ and overall transition animation
  useLayoutEffect(() => {
    // Reveal hero section
    gsap.set(heroRef.current, { visibility: "visible" });
    // Set initial styling for SURAJ (scaled up and centered)
    gsap.set(lettersContainerRef.current, { scale: 2 });
    gsap.set(
      [sRef.current, uRef.current, rRef.current, aRef.current, jRef.current],
      { opacity: 0 }
    );
    // Hide header, marquee container, and side texts initially
    gsap.set(navRef.current, { opacity: 0, y: -100 });
    gsap.set(marqueeContainerRef.current, { opacity: 0, scale: 0 });
    gsap.set(rightTextRef.current, { opacity: 0, x: 100 });
    gsap.set(leftTextRef.current, { opacity: 0, x: -100 });

    // ----- INITIAL SURAJ ANIMATION -----
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

    // ----- SCROLL-TRIGGERED TRANSITION -----
    // gsap
    //   .timeline({
    //     scrollTrigger: {
    //       trigger: heroRef.current,
    //       start: "top top",
    //       end: "bottom top",
    //       scrub: true,
    //       pin: true,
    //       // markers: true, // Uncomment to debug positions
    //     },
    //   })
    //   .to(lettersContainerRef.current, {
    //     opacity: 0,
    //     duration: 1,
    //     ease: "power3.inOut",
    //   })
    //   .to(
    //       ".hero-background",
    //     {
    //       opacity: 1,
    //       duration: 1,
    //       ease: "power3.inOut",
    //     },
    //     "<0.3"
    //   )
    //   .to(navRef.current, {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1.5,
    //     ease: "power3.inOut",
    //   })
    //   .to(marqueeContainerRef.current, {
    //     opacity: 1,
    //     scale: 1,
    //     duration: 1.5,
    //     ease: "power3.inOut",
    //   })
    //   .to(rightTextRef.current, {
    //     opacity: 1,
    //     x: 0,
    //     duration: 1.5,
    //     ease: "power3.inOut",
    //   })
    //   .to(leftTextRef.current, {
    //     opacity: 1,
    //     x: 0,
    //     duration: 1.5,
    //     ease: "power3.inOut",
    //   });

    gsap
  .timeline({
    scrollTrigger: {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      // markers: true, // Uncomment to debug positions
    },
  })
  .to(lettersContainerRef.current, {
    opacity: 0,
    duration: 1,
    ease: "power3.inOut",
  })
  .to(
    ".hero-background",
    {
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
    },
    "<0.3"
  )
  // Both nav and marquee animations will start together.
  .to(
    navRef.current,
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.inOut",
    },
    "<" // starts at the same time as the previous animation ends
  )
  .to(
    marqueeContainerRef.current,
    {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.inOut",
    },
    "<" // synchronized with nav animation
  )
  // Both text animations will start together.
  .to(
    rightTextRef.current,
    {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power3.inOut",
    },
    ">" // starts at the same time as the previous animation ends
  )
  .to(
    leftTextRef.current,
    {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power3.inOut",
    },
    "<" // synchronized with right text animation
  );


    // ----- HEADER BUTTON SCROLL ANIMATION -----
    gsap.to(buttonRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onLeave: () =>
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          }),
        onEnterBack: () =>
          gsap.to(buttonRef.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          }),
      },
    });
  }, []);

  // Marquee animation for "Suraj Arya –"
  useEffect(() => {
    let xPercent = 0;
    let direction = -1; // default scroll left

    // Update scroll direction via ScrollTrigger
    gsap.to(sliderRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          direction = e.direction * -1;
        },
      },
    });

    const animateMarquee = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }
      gsap.set(firstTextRef.current, { xPercent });
      gsap.set(secondTextRef.current, { xPercent });
      gsap.set(thirdTextRef.current, { xPercent });
      // Reduced increment for slower animation
      xPercent += 0.25 * direction;
      requestAnimationFrame(animateMarquee);
    };

    requestAnimationFrame(animateMarquee);
  }, []);

  // Smooth scroll handler for nav items.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor jump.
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${id}`, offsetY: 80 }, // Adjust offset as needed.
      ease: "power2.out",
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="h-screen w-full flex items-center justify-center overflow-hidden relative"
      style={{ visibility: "hidden" }}
    >
      {/* Background image */}
      <img
        src="/profile2.png"
        alt="Background"
        className="hero-background absolute inset-0 w-full h-full object-cover opacity-0"
      />

      {/* HEADER */}
      <header
        ref={navRef}
        className="absolute top-0 left-0 w-full z-10 px-4 py-4 md:px-8 flex justify-between items-center"
      >
        {/* Logo / "Code by Suraj Arya" with hover animations */}
        <div className="flex items-center cursor-pointer group ml-2 mt-7 md:ml-0 md:mt-0">
          {/* Rotating copyright */}
          <p className="m-0 text-white transition-all duration-500 group-hover:rotate-[360deg]">
            ©
          </p>
          {/* Name container */}
          <div className="ml-2 flex justify-center items-center overflow-hidden whitespace-nowrap relative transition-all duration-500 group-hover:pr-8">
            {/* "Code by" shifts fully out */}
            <p className="text-white uppercase tracking-wider text-lg transition-transform duration-500 group-hover:-translate-x-full">
              Code by
            </p>
            {/* "Suraj" shifts left by 65px */}
            <p className="text-white font-bold text-lg pl-2 transition-transform duration-500 group-hover:-translate-x-[90px]">
              Suraj
            </p>
            {/* "Arya" is positioned absolutely, shifts left by 65px on hover */}
            <p className="text-white font-bold text-lg absolute left-[150px]  transition-transform duration-500 group-hover:-translate-x-[90px]">
              Arya
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-white font-bold">
          <a
            href="#about"
            className="relative hover:scale-105 transition-transform duration-300"
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </a>
          <a
            href="#experience"
            className="relative hover:scale-105 transition-transform duration-300"
            onClick={(e) => handleNavClick(e, "experience")}
          >
            Work
          </a>
          <a
            href="#contact"
            className="relative hover:scale-105 transition-transform duration-300"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact
          </a>
        </nav>
        {/* Mobile Navigation (fallback) */}
        <div className="md:hidden">
          <Navbar />
        </div>
      </header>

      {/* "SURAJ" text container */}
      <div
        ref={lettersContainerRef}
        className="inspiration-regular text-[10vw] md:text-[13vw] font-bold uppercase leading-none flex items-center justify-center"
      >
        <span ref={sRef} className="text-[#cf005d] opacity-0 translate-y-24">
          S
        </span>
        <span ref={uRef} className="text-white opacity-0 translate-y-24">
          U
        </span>
        <span ref={rRef} className="text-white opacity-0 translate-y-24">
          R
        </span>
        <span ref={aRef} className="text-white opacity-0 translate-y-24">
          A
        </span>
        <span ref={jRef} className="text-white opacity-0 translate-y-24">
          J
        </span>
      </div>

      {/* Left-side static text for "Freelance Designer & Developer" */}
      <div
        ref={leftTextRef}
        className="absolute left-4 md:left-10 bottom-10 sm:top-3/12 md:top-5/12 md:bottom-auto md:transform md:-translate-y-1/2 block"
      >
        <svg
          className="my-3 md:my-5"
          width="30"
          height="30"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
            fill="#cf005d"
          />
        </svg>
        <p className="text-white text-lg sm:text-2xl md:text-4xl font-bold leading-tight">
          Freelance
        </p>
        <p className="text-white text-lg sm:text-2xl md:text-4xl font-bold leading-tight">
          Designer & <span className="text-[#cf005d]">Developer</span>
        </p>
      </div>

      {/* Right-side static text for "Freelance Designer & Developer" */}
      <div
        ref={rightTextRef}
        className="absolute right-0 sm:top-3/12 md:top-5/12 transform -translate-y-1/2 "
      >
        <p className="absolute hidden inset-0 text-white text-lg sm:flex flex-col justify-center items-end mr-16 z-1 ">
          <span>Located </span>
          <span>in the </span>
          <span>India</span>
        </p>
        <svg
          className="transform sm:block rotate-180 hidden"
          width="300px"
          height="95px"
          viewBox="0 0 300 121"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="100%" stopColor="#cf005d" />
            </linearGradient>
          </defs>
          <title>Combined Shape</title>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Artboard" transform="translate(0.000000, -366.000000)">
              <g
                id="Group"
                transform="translate(149.816828, 426.633657) rotate(90.000000) translate(-149.816828, -426.633657) translate(89.816828, 276.816828)"
                fill="url(#myGradient)"
              >
                <g
                  id="Hanger"
                  transform="translate(60.000000, 149.816828) rotate(-90.000000) translate(-60.000000, -149.816828) translate(-89.816828, 89.816828)"
                >
                  <path
                    d="M239.633657,0 C272.770742,1.0182436e-15 299.633657,26.862915 299.633657,60 C299.633657,93.137085 272.770742,120 239.633657,120 L0,120 L0,0 L239.633657,0 Z M239.633657,18.7755102 C216.866,18.7755102 198.409167,37.232343 198.409167,60 C198.409167,82.767657 216.866,101.22449 239.633657,101.22449 C262.401314,101.22449 280.858147,82.767657 280.858147,60 C280.858147,37.232343 262.401314,18.7755102 239.633657,18.7755102 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </g>
            </g>
          </g>
          {/* Added full globe svg */}
          <g id="globe" transform="translate(240,60)">
            <g>
              {/* Outer circle */}
              <circle
                cx="0"
                cy="0"
                r="30"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
              {/* Latitude ellipse */}
              <ellipse
                cx="0"
                cy="0"
                rx="30"
                ry="10"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
              />
              {/* Longitude ellipse */}
              <ellipse
                cx="0"
                cy="0"
                rx="10"
                ry="30"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
              />
              {/* Equator line */}
              <line
                x1="-30"
                y1="0"
                x2="30"
                y2="0"
                stroke="#fff"
                strokeWidth="1"
              />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Marquee Container for "Suraj Arya –" */}
      <div
        ref={marqueeContainerRef}
        className="absolute bottom-30 md:bottom-0 left-0 w-full overflow-hidden opacity-0"
      >
        <div
          ref={sliderRef}
          className="relative flex whitespace-nowrap mx-0 alegreya text-white font-serif text-[120px] md:text-[200px]"
        >
          <p
            ref={firstTextRef}
            style={{ margin: 0, paddingRight: "50px", flexShrink: 0 }}
          >
            Suraj Arya –
          </p>
          <p
            ref={secondTextRef}
            style={{ margin: 0, paddingRight: "50px", flexShrink: 0 }}
          >
            Suraj Arya –
          </p>
          <p
            ref={thirdTextRef}
            style={{ margin: 0, paddingRight: "50px", flexShrink: 0 }}
          >
            Suraj Arya –
          </p>
        </div>
      </div>
    </section>
  );
}
