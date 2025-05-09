"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";
import SplitType from "split-type";

// Extend HTMLElement to include custom properties used in the split effect.
interface SplitElement extends HTMLElement {
  _splitInstance?: InstanceType<typeof SplitType>;
  _splitTimeline?: gsap.core.Timeline;
}

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

export default function ToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Reference for the menu overlay container.
  const menuOverlayRef = useRef<HTMLDivElement>(null);

  // Menu open/close animations.
  useEffect(() => {
    if (isOpen) {
      gsap.to(".menu-overlay", {
        duration: 0.7,
        x: 0,
        ease: "power3.out",
      });
      gsap.to(".menu-overlay-content", {
        duration: 0.7,
        opacity: 1,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.fromTo(
        ".link-text",
        { y: 50, rotationX: 90, opacity: 0, transformOrigin: "bottom" },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".additional-email",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 }
      );

      gsap.fromTo(
        ".additional-social",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 }
      );
    } else {
      gsap.to(".menu-overlay-content", {
        duration: 0.4,
        opacity: 0,
        ease: "power3.in",
      });
      gsap.to(".menu-overlay", {
        duration: 0.5,
        x: "100%",
        delay: 0.1,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  // Outside click handler: closes the menu when clicking outside.
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuOverlayRef.current &&
        !menuOverlayRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Nav item hover effects.
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const bullet = e.currentTarget.querySelector(".bullet");
    const linkText = e.currentTarget.querySelector(".link-text");
    gsap.to(bullet, {
      x: 30,
      opacity: 1,
      duration: 0.3,
      ease: "power3.out",
    });
    gsap.to(linkText, {
      x: 50,
      color: "#cf005d",
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleLinkHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const bullet = e.currentTarget.querySelector(".bullet");
    const linkText = e.currentTarget.querySelector(".link-text");
    gsap.to(bullet, {
      x: -5,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    });
    gsap.to(linkText, {
      x: 0,
      color: "#ffffff",
      duration: 0.3,
      ease: "power3.in",
    });
  };

  // Hover effect for additional text with split effect.
  const handleAdditionalTextHover = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as SplitElement;
    let splitInstance = el._splitInstance;
    if (!splitInstance) {
      splitInstance = new SplitType(el, { types: "chars" });
      el._splitInstance = splitInstance;
    }
    const centerIndex = splitInstance.chars ? (splitInstance.chars.length - 1) / 2 : 0;
    const tl = gsap.timeline();
    tl.to(splitInstance.chars, {
      duration: 0.5,
      rotation: 360,
      scale: 1.3,
      x: (i: number) => (i - centerIndex) * 4, // Adjust spacing multiplier if needed.
      stagger: 0.05,
      ease: "power2.out",
    });
    el._splitTimeline = tl;
  };

  const handleAdditionalTextHoverOut = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as SplitElement;
    if (el._splitTimeline) {
      el._splitTimeline.reverse();
    }
  };

  // Smooth scroll handler for nav items.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor jump.
    setIsOpen(false); // Close the menu.
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${id}`, offsetY: 80 }, // Adjust offset as needed.
      ease: "power2.out",
    });
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-50 bg-gray-800 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Responsive Overlay Menu */}
      <div
        ref={menuOverlayRef}
        className="menu-overlay fixed top-0 right-0 h-full bg-black text-white z-40 w-full md:w-2/3 lg:w-1/2 translate-x-full"
      >
        <div className="menu-overlay-content flex flex-col h-full md:py-3 md:px-8 opacity-0">
          {/* Nav Items Section */}
          <div className="flex-1 flex flex-col justify-center px-3">
            <nav className="space-y-1">
              {["HOME", "ABOUT", "EXPERIENCE", "COMPETITIVE", "SKILLS", "TESTIMONIALS", "CONTACT"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`} // Kept for accessibility.
                    className="text-4xl md:text-7xl font-bold block transition-all"
                    onMouseEnter={handleLinkHover}
                    onMouseLeave={handleLinkHoverOut}
                    onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  >
                    <span className="inline-flex items-center">
                      <span className="bullet inline-block opacity-0 transform -translate-x-10">
                        •
                      </span>
                      <span className="link-text">{item}</span>
                    </span>
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Additional Content Section */}
          <div className="py-5">
            <div className="additional-email">
              <p className="text-xl md:text-2xl font-serif hover:underline px-8 uppercase mb-2 text-gray-500">
                Email address
              </p>
              <a
                href="mailto:suraj.arya@iiitg.ac.in"
                className="text-lg md:text-xl font-serif hover:underline inline-block px-8"
                onMouseEnter={handleAdditionalTextHover}
                onMouseLeave={handleAdditionalTextHoverOut}
              >
                suraj.arya@iiitg.ac.in
              </a>
            </div>
            <div className="mt-12 flex flex-row justify-between px-1 md:px-8">
              {["LinkedIn", "YouTube", "Instagram"].map((platform) => (
                <div
                  key={platform}
                  className="additional-social bg-gray-800 text-white px-3 py-2 md:px-7 md:py-4 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
                  onMouseEnter={handleAdditionalTextHover}
                  onMouseLeave={handleAdditionalTextHoverOut}
                >
                  <a
                    href={`https://${platform.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl uppercase hover:underline inline-block"
                  >
                    {platform}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
