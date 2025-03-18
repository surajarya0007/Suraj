// "use client";
// import { useState, useEffect } from "react";
// import { gsap } from "gsap";
// import { Menu, X } from "lucide-react";
// import SplitType from "split-type";

// // Extend HTMLElement to include custom properties used in the split effect.
// interface SplitElement extends HTMLElement {
//   _splitInstance?: InstanceType<typeof SplitType>;
//   _splitTimeline?: gsap.core.Timeline;
// }

// export default function ToggleMenu() {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       // Animate overlay in
//       gsap.to(".menu-overlay", {
//         duration: 0.7,
//         x: 0,
//         ease: "power3.out",
//       });
//       gsap.to(".menu-overlay-content", {
//         duration: 0.7,
//         opacity: 1,
//         delay: 0.1,
//         ease: "power3.out",
//       });

//       // Nav items rolling animation on open
//       gsap.fromTo(
//         ".link-text",
//         { y: 50, rotationX: 90, opacity: 0, transformOrigin: "bottom" },
//         {
//           y: 0,
//           rotationX: 0,
//           opacity: 1,
//           duration: 0.6,
//           ease: "power3.out",
//           stagger: 0.15,
//           delay: 0.3,
//         }
//       );

//       // Fade in additional content (email & social links)
//       gsap.fromTo(
//         ".additional-email",
//         { opacity: 0 },
//         { opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 }
//       );

//       gsap.fromTo(
//         ".additional-social",
//         { opacity: 0 },
//         { opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 }
//       );
      
//     } else {
//       // Animate closing out
//       gsap.to(".menu-overlay-content", {
//         duration: 0.4,
//         opacity: 0,
//         ease: "power3.in",
//       });
//       gsap.to(".menu-overlay", {
//         duration: 0.5,
//         x: "100%",
//         delay: 0.1,
//         ease: "power3.in",
//       });
//     }
//   }, [isOpen]);

//   // Nav item hover effects (unchanged)
//   const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const bullet = e.currentTarget.querySelector(".bullet");
//     const linkText = e.currentTarget.querySelector(".link-text");
//     gsap.to(bullet, {
//       x: 30,
//       opacity: 1,
//       duration: 0.3,
//       ease: "power3.out",
//     });
//     gsap.to(linkText, {
//       x: 50,
//       color: "#cf005d",
//       duration: 0.3,
//       ease: "power3.out",
//     });
//   };

//   const handleLinkHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     const bullet = e.currentTarget.querySelector(".bullet");
//     const linkText = e.currentTarget.querySelector(".link-text");
//     gsap.to(bullet, {
//       x: -5,
//       opacity: 0,
//       duration: 0.3,
//       ease: "power3.in",
//     });
//     gsap.to(linkText, {
//       x: 0,
//       color: "#ffffff",
//       duration: 0.3,
//       ease: "power3.in",
//     });
//   };

//   // On hover: perform the split effect with spacing.
//   const handleAdditionalTextHover = (e: React.MouseEvent<HTMLElement>) => {
//     const el = e.currentTarget as SplitElement;
//     // Use SplitType to split the text into characters if not already done.
//     let splitInstance = el._splitInstance;
//     if (!splitInstance) {
//       splitInstance = new SplitType(el, { types: "chars" });
//       el._splitInstance = splitInstance;
//     }
//     // Calculate the center index to offset letters evenly around the middle.
//     const centerIndex = splitInstance.chars ? (splitInstance.chars.length - 1) / 2 : 0;
//     // Create a GSAP timeline for the split effect.
//     const tl = gsap.timeline();
//     tl.to(splitInstance.chars, {
//       duration: 0.5,
//       rotation: 360,
//       scale: 1.3,
//       // Move each character outward from the center to add spacing.
//       x: (i: number) => (i - centerIndex) * 4, // Adjust multiplier (4) to change spacing.
//       stagger: 0.05,
//       ease: "power2.out",
//     });
//     // Store the timeline so that we can reverse it on hover off.
//     el._splitTimeline = tl;
//   };

//   // On hover off: reverse the split effect (join back).
//   const handleAdditionalTextHoverOut = (e: React.MouseEvent<HTMLElement>) => {
//     const el = e.currentTarget as SplitElement;
//     if (el._splitTimeline) {
//       el._splitTimeline.reverse();
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed top-8 right-8 z-50 bg-gray-800 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
//       >
//         {isOpen ? <X size={32} /> : <Menu size={32} />}
//       </button>

//       {/* Responsive Overlay Menu */}
//       <div className="menu-overlay fixed top-0 right-0 h-full bg-black text-white z-40 w-full md:w-2/3 lg:w-1/2 translate-x-full">
//         <div className="menu-overlay-content flex flex-col h-full md:py-3 md:px-8 opacity-0">
//           {/* Nav Items Section */}
//           <div className="flex-1 flex flex-col justify-center px-3 ">
//             <nav className="space-y-1">
//               {[
//                 "HOME",
//                 "ABOUT",
//                 "EXPERIENCE",
//                 "SKILLS",
//                 "TESTIMONIALS",
//                 "CONTACT",
//               ].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className="text-4xl md:text-7xl font-bold block transition-all"
//                   onMouseEnter={handleLinkHover}
//                   onMouseLeave={handleLinkHoverOut}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <span className="inline-flex items-center">
//                     <span className="bullet inline-block opacity-0 transform -translate-x-10">
//                       •
//                     </span>
//                     <span className="link-text">{item}</span>
//                   </span>
//                 </a>
//               ))}
//             </nav>
//           </div>

//           {/* Additional Content Section */}
//           <div className="py-5 ">
//             <div className="additional-email">
//               <p className="text-xl md:text-2xl font-serif hover:underline px-8 uppercase mb-2 text-gray-500">Email address</p>
//               <a
//                 href="mailto:suraj.arya@iiitg.ac.in"
//                 className="text-lg md:text-xl font-serif hover:underline inline-block px-8"
//                 onMouseEnter={handleAdditionalTextHover}
//                 onMouseLeave={handleAdditionalTextHoverOut}
//               >
//                 suraj.arya@iiitg.ac.in
//               </a>
//             </div>
//             <div className="mt-12 flex flex-row justify-between px-1 md:px-8">
//               {["LinkedIn", "YouTube", "Instagram"].map((platform) => (
//                 <div
//                   key={platform}
//                   className="additional-social bg-gray-800 text-white px-3 py-2 md:px-7 md:py-4 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
//                   onMouseEnter={handleAdditionalTextHover}
//                   onMouseLeave={handleAdditionalTextHoverOut}
//                 >
//                   <a
//                     href={`https://${platform.toLowerCase()}.com`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-lg md:text-xl uppercase hover:underline inline-block"
//                   >
//                     {platform}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
