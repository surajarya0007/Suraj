// "use client";
// import { useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav className="fixed w-full top-0 bg-white shadow-md z-50">
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
//         <h1 className="text-2xl font-bold">My Portfolio</h1>
//         <div className="hidden md:flex space-x-6">
//           <a href="#hero" className="hover:text-gray-600">
//             Home
//           </a>
//           <a href="#about" className="hover:text-gray-600">
//             About
//           </a>
//           <a href="#experience" className="hover:text-gray-600">
//             Experience
//           </a>
//           <a href="#skills" className="hover:text-gray-600">
//             Skills
//           </a>
//           <a href="#projects" className="hover:text-gray-600">
//             Projects
//           </a>
//           <a href="#contact" className="hover:text-gray-600">
//             Contact
//           </a>
//         </div>
//         <button className="md:hidden" onClick={toggleMenu}>
//           ☰
//         </button>
//       </div>
//       {isOpen && (
//         <div className="md:hidden flex flex-col items-center bg-white w-full py-4">
//           <a href="#hero" className="py-2" onClick={toggleMenu}>
//             Home
//           </a>
//           <a href="#about" className="py-2" onClick={toggleMenu}>
//             About
//           </a>
//           <a href="#experience" className="py-2" onClick={toggleMenu}>
//             Experience
//           </a>
//           <a href="#skills" className="py-2" onClick={toggleMenu}>
//             Skills
//           </a>
//           <a href="#projects" className="py-2" onClick={toggleMenu}>
//             Projects
//           </a>
//           <a href="#contact" className="py-2" onClick={toggleMenu}>
//             Contact
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(".mobile-menu", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(".mobile-menu", { opacity: 0, y: -20, duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-container flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-white">My Portfolio</h1>
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-[#cf005d] transition"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu md:hidden absolute top-16 left-0 w-full bg-black/90 p-6 flex flex-col items-center space-y-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {["Home", "About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white text-lg hover:text-[#cf005d] transition"
            onClick={() => setIsOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
