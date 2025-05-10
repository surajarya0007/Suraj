"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ExternalLink, Github, X, ChevronRight, ChevronLeft, Play, Pause } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: "API_Security_Shield",
    link: "https://management-fontend.vercel.app/Login",
    github: "https://github.com/username/api-security-shield",
    date: "Aug '24",
    description:
      "Comprehensive API management system focused on real-time API inventory, security assessments, and role-based data access.",
    longDescription:
      "API Security Shield is a robust platform designed to help organizations manage and secure their API ecosystem. The system provides real-time monitoring, vulnerability assessment, and comprehensive access control features to ensure API security at scale.",
    points: [
      "Created a comprehensive API management system focused on real-time API inventory, security assessments, and role-based data access.",
      "Designed a personalized dashboard for seamless data handling.",
      "Implemented automated vulnerability scanning and reporting features.",
      "Integrated with existing security tools via custom-built connectors.",
      "Reduced security incident response time by 60% through automated alerting.",
    ],
    images: ["/projects/1.jpg", "/projects/2.jpg", "/projects/3.jpg"],
    video: "/videos/demo1.mp4",
    tech: ["Next.js", "Node.js", "Express", "Tailwind", "MongoDB", "Framer Motion"],
    featured: true,
    stats: {
      developmentTime: "3 months",
      teamSize: "4 developers",
      codeLines: "15,000+",
      deployments: "120+",
    },
  },
  {
    name: "TeeGenius",
    link: "https://github.com/Prasoon2050/Stage0",
    github: "https://github.com/Prasoon2050/Stage0",
    date: "July '24",
    description: "E-commerce platform for custom-printed t-shirts with AI integration for design generation.",
    longDescription:
      "TeeGenius revolutionizes the custom t-shirt market by combining e-commerce functionality with AI-powered design generation. Users can create unique designs using text prompts or upload their own artwork, preview them on virtual models, and order high-quality printed products.",
    points: [
      "Built a full-stack application using Next.js, Tailwind CSS, Node.js, MongoDB, and JWT authentication.",
      "Enabled users to purchase and sell custom-designed t-shirts.",
      "Integrated AI for prompt-based design generation.",
      "Implemented a virtual try-on feature using 3D modeling.",
      "Created a marketplace for designers to sell their templates.",
    ],
    images: ["/projects/3.jpg", "/projects/4.jpg", "/projects/5.jpg"],
    video: "/videos/demo2.mp4",
    tech: ["Next.js", "React.js", "Node.js", "Open API", "Framer-motion", "Fabric.js", "react-three"],
    featured: true,
    stats: {
      developmentTime: "4 months",
      teamSize: "3 developers",
      codeLines: "22,000+",
      deployments: "85+",
    },
  },
  {
    name: "You and Me",
    link: "https://you-and-me-jet.vercel.app/",
    github: "https://github.com/username/you-and-me",
    date: "Feb '24",
    description: "Social media platform for wedding memories with guest authentication and photo sharing capabilities.",
    longDescription:
      "You and Me is a specialized social platform designed for wedding couples to share their special moments with guests. The platform provides a private, elegant space for photo sharing, memory collection, and guest interaction before, during, and after the wedding celebration.",
    points: [
      "Developed a wedding invitation platform with guest authentication features.",
      "Enabled guests to upload, download, and like photos for memory sharing.",
      "Implemented separate database views for the groom's and bride's sides.",
      "Created a timeline feature to organize photos chronologically.",
      "Built a comment and reaction system for guest interaction.",
    ],
    images: ["/projects/2.jpg", "/projects/1.jpg", "/projects/5.jpg"],
    video: "/videos/demo3.mp4",
    tech: ["Next.js", "React.js", "Node.js", "Google Drive API", "Framer"],
    featured: false,
    stats: {
      developmentTime: "2 months",
      teamSize: "2 developers",
      codeLines: "8,000+",
      deployments: "45+",
    },
  },
  {
    name: "NFT Market Place",
    github: "https://github.com/username/nft-marketplace",
    date: "May '23",
    description: "Decentralized NFT marketplace for minting and trading digital assets using blockchain technology.",
    longDescription:
      "This NFT Marketplace is a decentralized application built on blockchain technology that allows users to mint, buy, sell, and trade unique digital assets. The platform supports various NFT standards and provides a secure, transparent environment for digital asset transactions.",
    points: [
      "Spearheaded development of a decentralized NFT marketplace using a React.js frontend and a Motoko-powered backend integrated with Web3 technologies.",
      "Enabled over 500 users to securely upload, list, and sell NFTs for crypto tokens.",
      "Implemented smart contracts for secure, transparent transactions.",
      "Created a bidding system for auction-style sales.",
      "Built a wallet integration supporting multiple blockchain networks.",
    ],
    images: ["/projects/4.jpg", "/projects/3.jpg", "/projects/1.jpg"],
    video: "/videos/demo4.mp4",
    tech: ["Next.js", "React.js", "Node.js", "Web3", "Blockchain", "Motoko"],
    featured: false,
    stats: {
      developmentTime: "5 months",
      teamSize: "6 developers",
      codeLines: "30,000+",
      deployments: "150+",
    },
  },
  {
    name: "3D Portfolio Website",
    link: "https://port-taupe-mu.vercel.app/",
    github: "https://github.com/username/3d-portfolio",
    date: "Jun '22",
    description: "Interactive 3D portfolio website showcasing projects and skills with immersive user experience.",
    longDescription:
      "This portfolio website pushes the boundaries of web design by incorporating 3D elements, interactive animations, and immersive experiences. Built with Three.js and WebGL, the site creates a memorable showcase for creative work while maintaining performance and accessibility.",
    points: [
      "Designed and developed an interactive 3D portfolio with Three.js for immersive user experience.",
      "Implemented responsive design principles for optimal viewing across all devices.",
      "Created custom 3D models and animations to showcase technical skills.",
      "Optimized 3D rendering for performance across different devices.",
      "Incorporated interactive elements that respond to user movement and scroll.",
    ],
    images: ["/projects/5.jpg", "/projects/2.jpg", "/projects/4.jpg"],
    video: "/videos/demo5.mp4",
    tech: ["React.js", "Node.js", "Three.js", "email.js", "GSAP"],
    featured: false,
    stats: {
      developmentTime: "2 months",
      teamSize: "1 developer",
      codeLines: "5,000+",
      deployments: "30+",
    }
  },
  {
    name: "CryptoMarket",
    link: "https://cryptoorderbook-steel.vercel.app/",
    github: "https://github.com/surajarya0007/goQuant",
    date: "Feb '25",
    description: "Dashboard that streams real-time cryptocurrency order book data with some indicators.",
    longDescription:
      "A Next.js dashboard that streams real-time cryptocurrency order book data—bids, asks, bid-ask spread, volume imbalance, and market depth—from a public API. It features an intuitive, responsive UI with components for the order book, spread and imbalance indicators, a depth chart, and a trading-pair selector.",
    points: [
      "Developed a wedding invitation platform with guest authentication features.",
      "Enabled guests to upload, download, and like photos for memory sharing.",
      "Implemented separate database views for the groom's and bride's sides.",
      "Created a timeline feature to organize photos chronologically.",
      "Built a comment and reaction system for guest interaction.",
    ],
    images: ["/projects/6.jpg", "/projects/1.jpg", "/projects/5.jpg"],
    video: "/videos/demo3.mp4",
    tech: ["Next.js", "React.js", "Node.js", "Google Drive API", "Framer"],
    featured: false,
    stats: {
      developmentTime: "2 months",
      teamSize: "2 developers",
      codeLines: "8,000+",
      deployments: "45+",
    },
  },
]

export default function Projects() {
  const projRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const firstTextRef = useRef<HTMLParagraphElement | null>(null)
  const secondTextRef = useRef<HTMLParagraphElement | null>(null)
  const thirdTextRef = useRef<HTMLParagraphElement | null>(null)

  // State for modal
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "gallery" | "tech">("overview")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Filtered projects
  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.featured)

  // Marquee animation
  useEffect(() => {
    let xPercent = 0
    let direction = -1 // Default: scroll left
    let speedMultiplier = 1 // Default speed

    gsap.registerPlugin(ScrollTrigger)

    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        },
      },
    )

    // Animate marquee
    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0
      } else if (xPercent > 0) {
        xPercent = -100
      }

      gsap.set(firstTextRef.current, { xPercent })
      gsap.set(secondTextRef.current, { xPercent })
      gsap.set(thirdTextRef.current, { xPercent })

      xPercent += 0.3 * direction * speedMultiplier

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    // Track scroll velocity for marquee speed
    gsap.to(sliderRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          direction = e.direction * -1
          speedMultiplier = Math.min(Math.abs(e.getVelocity() / 1000) + 1, 3)
        },
      },
    })

    // Project cards animation
    const cards = gsap.utils.toArray<HTMLElement>(".project-card")

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        },
      )
    })
  }, [filter]) // Re-run when filter changes

  // Handle image navigation
  const nextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
  }

  // Toggle video playback
  const toggleVideo = () => {
    if (!videoRef.current) return

    if (isVideoPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsVideoPlaying(!isVideoPlaying)
  }

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null)
      if (e.key === "ArrowRight" && selectedProject) nextImage()
      if (e.key === "ArrowLeft" && selectedProject) prevImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
      setIsVideoPlaying(false)
      setActiveTab("overview")
    }

    return () => {
      document.body.style.overflow = "visible"
    }
  }, [selectedProject])

  // Reset video state when changing tabs
  useEffect(() => {
    if (activeTab !== "gallery") {
      setIsVideoPlaying(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [activeTab])

  return (
    <section id="testimonials" ref={projRef} className="py-20 h-full relative bg-gradient-to-b from-black ">
      {/* Title */}
      <div ref={titleRef} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          A collection of my recent work showcasing my skills in web development, design, and problem-solving.
        </p>

        {/* Filter buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              filter === "all"
                ? "bg-white text-[#cf005d] font-medium shadow-lg"
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              filter === "featured"
                ? "bg-white text-[#cf005d] font-medium shadow-lg"
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            Featured
          </button>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="w-full overflow-hidden h-32 md:h-40 flex items-center mb-16">
        <div ref={sliderRef} className="relative flex whitespace-nowrap mx-0">
          <p
            ref={firstTextRef}
            className="alegreya text-white font-bold text-[80px] md:text-[120px] opacity-20 m-0 pr-12 flex-shrink-0"
          >
            Works — Projects — Portfolio —
          </p>
          <p
            ref={secondTextRef}
            className="alegreya text-white font-bold text-[80px] md:text-[120px] opacity-20 m-0 pr-12 flex-shrink-0"
          >
            Works — Projects — Portfolio —
          </p>
          <p
            ref={thirdTextRef}
            className="alegreya text-white font-bold text-[80px] md:text-[120px] opacity-20 m-0 pr-12 flex-shrink-0"
          >
            Works — Projects — Portfolio —
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(207,0,93,0.3)] flex flex-col h-[450px] group cursor-pointer"
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image with Overlay */}
              <div className="relative h-48 overflow-hidden transition-all duration-500 group-hover:h-24">
                <Image
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.name}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <div className="flex space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                        aria-label={`GitHub repository for ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300"
                        aria-label={`Live demo for ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-grow flex flex-col relative overflow-hidden">
                <div className="mb-2 text-sm text-gray-400">{project.date}</div>
                <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {project.description}
                </p>

                {/* Long description that appears on hover */}
                <div className="absolute inset-0 p-6 pt-10 bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 overflow-y-auto max-h-full">
                  <p className="text-gray-300 text-sm mb-4">{project.longDescription}</p>
                  <ul className="space-y-2 text-gray-400 text-sm list-disc list-inside mb-4">
                    {project.points.slice(0, 3).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                  <p className="text-[#cf005d] text-sm font-medium">Click to view full details</p>
                </div>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-xs bg-[#cf005d]/20 text-white py-1 px-3 rounded-full">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs bg-white/10 text-white py-1 px-3 rounded-full">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-b from-black to-[#cf005d]/70 rounded-xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Project header - Reduced height */}
              <div className="relative h-40 md:h-48 overflow-hidden flex-shrink-0">
                <Image
                  src={selectedProject.images[0] || "/placeholder.svg"}
                  alt={selectedProject.name}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Project title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <motion.h2
                        className="text-2xl md:text-3xl font-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedProject.name}
                      </motion.h2>
                      <motion.p
                        className="text-gray-300 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedProject.date}
                      </motion.p>
                    </div>

                    {/* Links */}
                    <motion.div
                      className="flex space-x-3 mt-2 md:mt-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 bg-black/50 hover:bg-black/80 text-white px-3 py-1 rounded-full transition-colors text-sm"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 bg-[#cf005d] hover:bg-[#cf005d]/80 text-white px-3 py-1 rounded-full transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-white/10 flex-shrink-0">
                <div className="flex px-4 md:px-6 -mb-px">
                  <button
                    className={`py-3 px-3 font-medium transition-colors ${
                      activeTab === "overview"
                        ? "text-white border-b-2 border-[#cf005d]"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`py-3 px-3 font-medium transition-colors ${
                      activeTab === "gallery"
                        ? "text-white border-b-2 border-[#cf005d]"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("gallery")}
                  >
                    Gallery & Demo
                  </button>
                  <button
                    className={`py-3 px-3 font-medium transition-colors ${
                      activeTab === "tech" ? "text-white border-b-2 border-[#cf005d]" : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("tech")}
                  >
                    Tech & Stats
                  </button>
                </div>
              </div>

              {/* Tab content - Fix the overflow issue */}
              <div className="flex-grow overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 md:p-6"
                    >
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3">Project Overview</h3>
                        <p className="text-gray-300 text-base leading-relaxed">{selectedProject.longDescription}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                        <ul className="space-y-2 text-gray-300">
                          {selectedProject.points.map((point, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start"
                            >
                              <span className="inline-block w-2 h-2 rounded-full bg-[#cf005d] mt-2 mr-3 flex-shrink-0"></span>
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "gallery" && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 md:p-6"
                    >
                      {/* Video section */}
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3">Project Demo</h3>
                        <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden">
                          {/* This is a placeholder. In a real implementation, you would use actual video files */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white text-center">Video demo would play here</p>
                          </div>
                          <button
                            onClick={toggleVideo}
                            className="absolute bottom-4 right-4 bg-black/70 hover:bg-black p-3 rounded-full transition-colors"
                          >
                            {isVideoPlaying ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Image gallery */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Project Gallery</h3>
                        <div className="relative">
                          <div className="overflow-hidden rounded-lg">
                            <Image
                              src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                              alt={`${selectedProject.name} screenshot ${currentImageIndex + 1}`}
                              width={1200}
                              height={600}
                              className="w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>

                          {/* Image navigation */}
                          {selectedProject.images.length > 1 && (
                            <>
                              <button
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  prevImage()
                                }}
                              >
                                <ChevronLeft className="w-6 h-6 text-white" />
                              </button>
                              <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  nextImage()
                                }}
                              >
                                <ChevronRight className="w-6 h-6 text-white" />
                              </button>

                              {/* Image indicators */}
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {selectedProject.images.map((_, idx) => (
                                  <button
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      idx === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setCurrentImageIndex(idx)
                                    }}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Thumbnails */}
                        <div className="mt-4 grid grid-cols-5 gap-2">
                          {selectedProject.images.map((image, idx) => (
                            <div
                              key={idx}
                              className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                                idx === currentImageIndex ? "border-[#cf005d]" : "border-transparent"
                              }`}
                              onClick={() => setCurrentImageIndex(idx)}
                            >
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Thumbnail ${idx + 1}`}
                                width={100}
                                height={60}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "tech" && (
                    <motion.div
                      key="tech"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 md:p-6"
                    >
                      {/* Technologies */}
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {selectedProject.tech.map((tech, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-black/30 text-white p-3 rounded-lg flex items-center justify-center text-center hover:bg-[#cf005d]/30 transition-colors"
                            >
                              {tech}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Project Stats */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Project Statistics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-black/30 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">Development Time</p>
                            <p className="text-white text-xl font-semibold">{selectedProject.stats.developmentTime}</p>
                          </div>
                          <div className="bg-black/30 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">Team Size</p>
                            <p className="text-white text-xl font-semibold">{selectedProject.stats.teamSize}</p>
                          </div>
                          <div className="bg-black/30 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">Lines of Code</p>
                            <p className="text-white text-xl font-semibold">{selectedProject.stats.codeLines}</p>
                          </div>
                          <div className="bg-black/30 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">Deployments</p>
                            <p className="text-white text-xl font-semibold">{selectedProject.stats.deployments}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
