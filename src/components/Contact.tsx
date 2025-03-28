"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Form from "@/components/Form";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef(null);
  const contentRef = useRef(null);
  const introRef = useRef(null);
  const contactDetailsRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero timeline: "Let's Connect" animation
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1000",
          scrub: true,
          pin: true,
        },
        onComplete: () => {
          // Disable pointer events so underlying content is interactive
          if (heroRef.current) {
            heroRef.current.style.pointerEvents = "none";
          }
        }
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
            x: -170,
            y: -150,
            ease: "none",
          },
          "-=0.5"
        );

      // Intro Section animation: starts when the bottom enters the viewport and lasts 300px of scroll
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "bottom bottom",
            end: "+=300",
            scrub: true,
          },
        }
      );

      // Contact Details animation
      gsap.fromTo(
        contactDetailsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactDetailsRef.current,
            start: "bottom bottom",
            end: "+=300",
            scrub: true,
          },
        }
      );

      // Contact Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "bottom bottom",
            end: "+=300",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section with "Lets Connect" text centered */}
      <section
        id="contact"
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center z-10"
      >
        <h1
          ref={heroTextRef}
          className="text-accent font-bold alegreya text-4xl text-center"
        >
          Lets Connect
        </h1>
      </section>

      {/* Main Content */}
      <article
        ref={contentRef}
        className="relative w-full flex flex-col items-center justify-center py-8 pt-2 sm:py-12 space-y-12"
      >
        {/* Intro Section */}
        <section ref={introRef} className="flex flex-col items-center justify-center space-y-4 w-full sm:w-3/4">
          <h1 className="alegreya text-accent font-bold text-4xl sm:text-5xl">
            Contact Me
          </h1>
          <p className="alegreya text-center text-2xl text-black">
            I would love to hear from you! Whether you have a question, a project idea,
            or just want to say hi, feel free to reach out.
          </p>
        </section>

        {/* Contact Details */}
        <section ref={contactDetailsRef} className="flex flex-col sm:flex-row items-center justify-around w-full sm:w-3/4 space-y-6 sm:space-y-0 sm:space-x-6">
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-6xl text-accent mb-2" />
          </div>
          <div className="flex flex-col items-center">
            <FaLinkedin className="text-6xl text-accent mb-2" />
          </div>
          <div className="flex flex-col items-center">
            <FaGithub className="text-6xl text-accent mb-2" />
          </div>
        </section>

        {/* Contact Form */}
        <section ref={formRef} className="w-full sm:w-3/4 flex justify-center">
          <Form />
        </section>
      </article>
    </>
  );
}
