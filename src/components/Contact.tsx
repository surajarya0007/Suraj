"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Form from "@/components/Form";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animationEnd = "+=1000"; // Same duration for both animations
  
      // Hero timeline: "Let's Connect" animation
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: animationEnd, // Sync end time
          scrub: true,
          pin: true,
        },
      });
  
      heroTimeline
        .to(heroTextRef.current, {
          scale: 50,
          ease: "none",
        })
        .to(heroRef.current, { ease: "none" }, 0)
        .to(
          heroTextRef.current,
          {
            opacity: 0,
            ease: "none",
          },
          "-=0.5"
        );
  
      // Main content timeline: Zoom-in effect
      const contentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "center center",
          end: animationEnd, // Sync end time
          scrub: true,
          pin: true,
        },
      });
  
      contentTimeline.fromTo(
        contentRef.current,
        { scale: 0, opacity: 0 },
        { scale: 0.8, opacity: 1, ease: "none" }
      );
    });
  
    return () => ctx.revert();
  }, []);
  

  return (
    <>
      {/* Hero Section with "Lets Connect" text centered */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center z-50"
      >
        <h1
          ref={heroTextRef}
          className="text-accent font-bold text-4xl text-center"
        >
          Lets Connect
        </h1>
      </section>

      {/* Main Content */}
      <article
        ref={contentRef}
        className="relative w-full flex flex-col items-center justify-center py-8 sm:py-12 space-y-12"
      >
        {/* Intro Section */}
        <section className="flex flex-col items-center justify-center space-y-4 w-full sm:w-3/4">
          <h1 className="text-accent font-semibold text-center text-4xl capitalize">
            Contact Me
          </h1>
          <p className="text-center text-lg text-gray-700">
            I would love to hear from you! Whether you have a question, project idea or just want to say hi feel free to reach out.
          </p>
        </section>

        {/* Contact Details */}
        <section className="flex flex-col sm:flex-row items-center justify-around w-full sm:w-3/4 space-y-6 sm:space-y-0 sm:space-x-6">
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-3xl text-accent" />
            <h3 className="font-semibold mt-2">Email</h3>
            <p className="text-gray-600">example@example.com</p>
          </div>
          <div className="flex flex-col items-center">
            <FaPhone className="text-3xl text-accent" />
            <h3 className="font-semibold mt-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-3xl text-accent" />
            <h3 className="font-semibold mt-2">Location</h3>
            <p className="text-gray-600">City, Country</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="w-full sm:w-3/4">
          <Form />
        </section>

        {/* Social Media Links */}
        <section className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-semibold">Follow Me</h2>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-gray-600"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-gray-600"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-gray-600"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
