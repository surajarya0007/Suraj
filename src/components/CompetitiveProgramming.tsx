"use client"

import { useEffect, useState, type JSX, useRef } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiLeetcode, SiCodechef, SiHackerrank, SiGeeksforgeeks, SiCodeforces } from "react-icons/si"
import { ExternalLink, Code, Award, Star, Users, CheckCircle2, RefreshCw } from "lucide-react"
import FetchData, { type PlatformData } from "@/components/FetchData"

gsap.registerPlugin(ScrollTrigger)

// logo mapping
const logoComponents: Record<string, JSX.Element> = {
  leetcode: <SiLeetcode className="w-full h-full" />,
  codechef: <SiCodechef className="w-full h-full" />,
  hackerrank: <SiHackerrank className="w-full h-full" />,
  gfg: <SiGeeksforgeeks className="w-full h-full" />,
  codeforces: <SiCodeforces className="w-full h-full" />,
}

// Animation variants for internal card content and hovers
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
}

const iconHoverVariants: Variants = {
  rest: { scale: 1, filter: "drop-shadow(0 0 0px currentColor)" },
  hover: {
    scale: 1.3,
    filter: "drop-shadow(0 0 8px currentColor)",
    transition: { duration: 0.3 },
  },
}

const profileCardContentHover: Variants = {
  rest: { opacity: 0.8, y: 0, transition: { duration: 0.3 } },
  hover: { opacity: 1, y: -5, transition: { duration: 0.3 } },
}

const containerVariants: Variants = { // Kept for AnimatePresence on platform change
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}


export default function CompetitiveProgramming() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const titleRef = useRef<HTMLDivElement | null>(null)
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const { platformsData, isLoading, error, lastFetched } = FetchData()
  const [activePlatform, setActivePlatform] = useState<PlatformData | null>(null)

  useEffect(() => {
    if (platformsData.length > 0 && !activePlatform) {
      setActivePlatform(platformsData[0])
    }
  }, [platformsData, activePlatform])

  // GSAP Animations useEffect
  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      gsap.fromTo( // Changed from const titleTween to direct call
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    const cardTweens: gsap.core.Tween[] = [];
    const cardScrollTriggers: ScrollTrigger[] = [];

    if (activePlatform && cardsContainerRef.current && !isLoading) {
      // Ensure cards are selected from the current cardsContainerRef after platform switch
      const cards = gsap.utils.toArray<HTMLElement>(cardsContainerRef.current.querySelectorAll(".cp-card"));
      
      // Kill previous ScrollTriggers & tweens for cards to avoid conflicts
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger && (trigger.vars.trigger as HTMLElement).classList.contains('cp-card')) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(cards);


      cards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 100, scale: 0.95 }); // Set initial state
        const tween = gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card, // Each card triggers its own animation based on vertical scroll
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        });
        cardTweens.push(tween);
        if (tween.scrollTrigger) {
          cardScrollTriggers.push(tween.scrollTrigger);
        }
      });
    }
     // Cleanup function
     return () => {
      if (titleRef.current) {
        const titleST = gsap.getTweensOf(titleRef.current);
        titleST.forEach(t => t.kill());
        gsap.killTweensOf(titleRef.current);
      }
      cardTweens.forEach(tween => tween.kill());
      cardScrollTriggers.forEach(st => st.kill());
    };
  }, [activePlatform, isLoading]) // Re-run GSAP animations when activePlatform changes or loading completes


  // Function to manually refresh data
  const refreshData = () => {
    setIsRefreshing(true)
    localStorage.removeItem("platformsData")
    localStorage.removeItem("platformsDataTimestamp")
    window.location.reload()
  }

  // Format the last fetched time
  const formatLastFetched = () => {
    if (!lastFetched) return "Never"
    const now = new Date()
    const diff = now.getTime() - lastFetched.getTime()
    if (diff < 60 * 1000) return "Just now"
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000))
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
    }
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000))
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    }
    const days = Math.floor(diff / (24 * 60 * 60 * 1000))
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  if (isLoading) {
    return (
      <section
        id="competitive"
        className="min-h-screen pt-20 relative bg-gradient-to-b to-black flex items-center justify-center"
      >
        <div className="text-white text-2xl flex flex-col items-center">
          <div className="animate-spin mb-4">
            <RefreshCw size={40} />
          </div>
          <p>Loading competitive programming data...</p>
          <p className="text-sm text-gray-400 mt-2">This may take a moment as we fetch real-time data</p>
        </div>
      </section>
    )
  }

  if (error || !activePlatform) {
    return (
      <section
        id="competitive"
        className="min-h-screen pt-20 relative bg-gradient-to-b to-black flex items-center justify-center"
      >
        <div className="text-white text-2xl flex flex-col items-center">
          <div className="text-red-500 mb-4">
            <ExternalLink size={40} />
          </div>
          <p>{error || "Failed to load competitive programming data."}</p>
          <button
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="competitive" className="max-h-screen py-10 md:py-20 relative bg-gradient-to-b to-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title section */}
        <div ref={titleRef} className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
            Competitive Programming
          </h2>
          <div className="flex items-center justify-center text-sm text-gray-400">
            <span>Last updated: {formatLastFetched()}</span>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Platform selection buttons - Horizontal scroll on small screens */}
        <motion.div
          className="flex flex-row flex-nowrap overflow-x-auto justify-start md:justify-center gap-4 my-10 md:my-2 py-2 scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {platformsData.map((pl) => (
            <motion.button
              key={pl.name}
              onClick={() => setActivePlatform(pl)}
              // Removed itemVariants from here for simplicity, direct animation is fine
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 12px ${pl.color}`,
                background: `linear-gradient(to right, black, ${pl.color}80)`,
                color: pl.color,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`px-4 py-2  rounded-full flex items-center space-x-2 border border-transparent flex-shrink-0 ${ // Added flex-shrink-0
                activePlatform.name === pl.name
                  ? "bg-white text-black shadow-lg border-white"
                  : "bg-black/30 text-white hover:border-white/30"
              }`}
            >
              <motion.div className="w-5 h-5" variants={iconHoverVariants} initial="rest" whileHover="hover">
                {logoComponents[pl.logo]}
              </motion.div>
              <span>{pl.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Cards section - Horizontal scroll on small screens, 3 cards per row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform.name}
            ref={cardsContainerRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-row flex-nowrap overflow-x-auto gap-2 md:gap-8 py-4 scrollbar-hide"
          >
            {/* Profile Card */}
            <motion.div
              className="cp-card bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 cursor-pointer w-72 md:w-3/10 flex-shrink-0" // Added w-80 and flex-shrink-0
              // GSAP handles entry animation, Framer Motion handles hover
              whileHover={{
                scale: 1.02,
                boxShadow: `0 4px 20px ${activePlatform.color}50`,
                background: `linear-gradient(to bottom, black, ${activePlatform.color}20)`,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ borderColor: `${activePlatform.color}30` }}
            >
              <motion.div variants={containerVariants} initial="hidden" animate="visible"> {/* For internal item staggering */}
                <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-6">
                  <motion.div
                    className="w-16 h-16 rounded-lg flex items-center justify-center p-3 text-white"
                    style={{ backgroundColor: `${activePlatform.color}30` }}
                    variants={iconHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {logoComponents[activePlatform.logo]}
                  </motion.div>
                  <div>
                    <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white">
                      {activePlatform.name}
                    </motion.h3>
                    <motion.p variants={itemVariants} className="text-gray-400">
                      @{activePlatform.username}
                    </motion.p>
                  </div>
                </motion.div>

                <motion.a
                  variants={itemVariants}
                  href={activePlatform.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 mb-6 rounded-lg text-white transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, black, ${activePlatform.color}80)`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 12px ${activePlatform.color}`,
                  }}
                >
                  <motion.div className="w-4 h-4" variants={iconHoverVariants} initial="rest" whileHover="hover">
                    <ExternalLink className="w-full h-full" />
                  </motion.div>
                  <span>View Profile</span>
                </motion.a>

                <motion.div variants={profileCardContentHover} initial="rest" whileHover="hover" className="space-y-4">
                  <motion.div variants={itemVariants} className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Competitive Programmer</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Algorithm Specialist</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Problem Solver</span>
                  </motion.div>
                  <motion.div variants={itemVariants} className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-white">Contest Participant</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Statistics Card */}
            <motion.div
              className="cp-card bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 cursor-pointer w-72 md:w-3/10 flex-shrink-0" // Added w-80 and flex-shrink-0
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${activePlatform.color}80`,
                transition: { type: "spring", stiffness: 300, damping: 20 },
                background: `linear-gradient(to bottom, black, ${activePlatform.color}20)`,
              }}
              style={{ borderColor: `${activePlatform.color}30` }}
            >
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <motion.h3 variants={itemVariants} className="text-xl font-bold text-white mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2" style={{ color: activePlatform.color }} />
                  Statistics
                </motion.h3>

                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  {[
                    ["Ranking", activePlatform.stats.ranking],
                    ["Problems Solved", activePlatform.stats.problemsSolved],
                    ["Contests", activePlatform.stats.contests],
                    ["Highest Rating", activePlatform.stats.highestRating],
                  ].map(([label, value]) => (
                    <motion.div
                      key={label as string}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 0 10px ${activePlatform.color}70`,
                        backgroundColor: `${activePlatform.color}30`,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                      className="bg-black/50 rounded-lg p-4 text-center"
                    >
                      <p className="text-gray-400 text-sm">{label as string}</p>
                      <p className="text-white text-xl font-bold" style={{ color: activePlatform.color }}>
                        {value as string | number}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="hidden md:block mt-6 pt-6 border-t border-white/10">
                  <motion.h4 variants={itemVariants} className="text-white font-medium mb-3">
                    Skill Progress
                  </motion.h4>
                  {[
                    ["Data Structures", 92],
                    ["Algorithms", 88],
                    ["Dynamic Programming", 85],
                  ].map(([skill, pct]) => (
                    <motion.div
                      key={skill as string}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: `0 0 8px ${activePlatform.color}50`,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                      className="mb-4"
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">{skill as string}</span>
                        <span className="text-white">{pct}%</span>
                      </div>
                      <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: activePlatform.color,
                            width: `${pct}%`,
                            transition: "width 0.5s ease",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              className="cp-card bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 cursor-pointer w-72 md:w-3/10 flex-shrink-0" // Added w-80 and flex-shrink-0
              whileHover={{
                scale: 1.02,
                boxShadow: `0 4px 20px ${activePlatform.color}50`,
                background: `linear-gradient(to bottom, black, ${activePlatform.color}20)`,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <motion.h3 variants={itemVariants} className="text-xl font-bold text-white mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2" style={{ color: activePlatform.color }} />
                  Achievements
                </motion.h3>

                <motion.ul variants={containerVariants} className="space-y-4">
                  {activePlatform.achievements.map((ach, i) => (
                    <motion.li
                      key={i}
                      variants={itemVariants}
                      className="flex items-start space-x-3"
                      whileHover={{
                        scale: 1.03,
                        x: 5,
                        color: activePlatform.color,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: activePlatform.color }} />
                      <span className="text-white">{ach}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
