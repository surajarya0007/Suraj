// "use client"

// import { useEffect, useState, type JSX } from "react"
// import { motion, useAnimation, AnimatePresence, type Variants } from "framer-motion"
// import { useInView } from "react-intersection-observer"
// import { SiLeetcode, SiCodechef, SiHackerrank, SiGeeksforgeeks, SiCodeforces } from "react-icons/si"
// import { ExternalLink, Code, Award, Star, Users, CheckCircle2, RefreshCw } from "lucide-react"
// import FetchData, { type PlatformData } from "@/components/FetchData"

// // logo mapping
// const logoComponents: Record<string, JSX.Element> = {
//   leetcode: <SiLeetcode className="w-full h-full" />,
//   codechef: <SiCodechef className="w-full h-full" />,
//   hackerrank: <SiHackerrank className="w-full h-full" />,
//   gfg: <SiGeeksforgeeks className="w-full h-full" />,
//   codeforces: <SiCodeforces className="w-full h-full" />,
// }

// // Animation variants
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15, delayChildren: 0.2 },
//   },
// }

// const itemVariants: Variants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 80, damping: 16 },
//   },
// }

// const iconHoverVariants: Variants = {
//   rest: { scale: 1, filter: "drop-shadow(0 0 0px currentColor)" },
//   hover: {
//     scale: 1.3,
//     filter: "drop-shadow(0 0 8px currentColor)",
//     transition: { duration: 0.3 },
//   },
// }

// const profileCardContentHover: Variants = {
//   rest: { opacity: 0.8, y: 0, transition: { duration: 0.3 } },
//   hover: { opacity: 1, y: -5, transition: { duration: 0.3 } },
// }

// export default function CompetitiveProgramming() {
//   const [ref, inView] = useInView({ threshold: 0.1 })
//   const controls = useAnimation()
//   const [isInitialRender, setIsInitialRender] = useState(true)
//   const [isRefreshing, setIsRefreshing] = useState(false)

//   // Get platform data from FetchData component
//   const { platformsData, isLoading, error, lastFetched } = FetchData()

//   // Set active platform state
//   const [activePlatform, setActivePlatform] = useState<PlatformData | null>(null)

//   // Update active platform when data is loaded
//   useEffect(() => {
//     if (platformsData.length > 0 && !activePlatform) {
//       setActivePlatform(platformsData[0])
//     }
//   }, [platformsData, activePlatform])

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible")
//     } else {
//       controls.start("hidden")
//     }
//   }, [controls, inView])

//   // Reset animation state on initial render or when inView changes
//   useEffect(() => {
//     if (isInitialRender) {
//       setIsInitialRender(false) // Set to false after the initial render
//       return // Skip the initial reset
//     }
//     controls.start("hidden")
//     if (inView) {
//       controls.start("visible")
//     }
//   }, [controls, inView])

//   // Function to manually refresh data
//   const refreshData = () => {
//     setIsRefreshing(true)
//     // Clear localStorage to force a fresh fetch
//     localStorage.removeItem("platformsData")
//     localStorage.removeItem("platformsDataTimestamp")
//     // Reload the page to trigger a fresh fetch
//     window.location.reload()
//   }

//   // Format the last fetched time
//   const formatLastFetched = () => {
//     if (!lastFetched) return "Never"

//     const now = new Date()
//     const diff = now.getTime() - lastFetched.getTime()

//     // Less than a minute
//     if (diff < 60 * 1000) {
//       return "Just now"
//     }

//     // Less than an hour
//     if (diff < 60 * 60 * 1000) {
//       const minutes = Math.floor(diff / (60 * 1000))
//       return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
//     }

//     // Less than a day
//     if (diff < 24 * 60 * 60 * 1000) {
//       const hours = Math.floor(diff / (60 * 60 * 1000))
//       return `${hours} hour${hours !== 1 ? "s" : ""} ago`
//     }

//     // More than a day
//     const days = Math.floor(diff / (24 * 60 * 60 * 1000))
//     return `${days} day${days !== 1 ? "s" : ""} ago`
//   }

//   // Show loading state
//   if (isLoading) {
//     return (
//       <section
//         id="competitive"
//         ref={ref}
//         className="min-h-screen pt-20 relative bg-gradient-to-b to-black flex items-center justify-center"
//       >
//         <div className="text-white text-2xl flex flex-col items-center">
//           <div className="animate-spin mb-4">
//             <RefreshCw size={40} />
//           </div>
//           <p>Loading competitive programming data...</p>
//           <p className="text-sm text-gray-400 mt-2">This may take a moment as we fetch real-time data</p>
//         </div>
//       </section>
//     )
//   }

//   // Show error state
//   if (error || !activePlatform) {
//     return (
//       <section
//         id="competitive"
//         ref={ref}
//         className="min-h-screen pt-20 relative bg-gradient-to-b to-black flex items-center justify-center"
//       >
//         <div className="text-white text-2xl flex flex-col items-center">
//           <div className="text-red-500 mb-4">
//             <ExternalLink size={40} />
//           </div>
//           <p>{error || "Failed to load competitive programming data."}</p>
//           <button
//             onClick={refreshData}
//             className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center space-x-2"
//           >
//             <RefreshCw size={16} />
//             <span>Try Again</span>
//           </button>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section id="competitive" ref={ref} className="min-h-screen py-20 relative bg-gradient-to-b to-black">

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div className="text-center mb-7" variants={containerVariants} initial="hidden" animate={controls}>
//           <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white mb-4">
//             Competitive Programming
//           </motion.h2>
//           <motion.p variants={itemVariants} className="hidden lg:block text-gray-300 max-w-2xl mx-auto">
//             Solving complex algorithmic challenges across multiple platforms
//           </motion.p>

//           {/* Last updated info and refresh button */}
//           <motion.div variants={itemVariants} className="flex items-center justify-center mt-2 text-sm text-gray-400">
//             <span>Last updated: {formatLastFetched()}</span>
//             <button
//               onClick={refreshData}
//               disabled={isRefreshing}
//               className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
//               title="Refresh data"
//             >
//               <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
//             </button>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="flex flex-wrap justify-center gap-4 mb-12"
//           variants={containerVariants}
//           initial="hidden"
//           animate={controls}
//         >
//           {platformsData.map((pl) => (
//             <motion.button
//               key={pl.name}
//               onClick={() => setActivePlatform(pl)}
//               variants={itemVariants}
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: `0 0 12px ${pl.color}`,
//                 background: `linear-gradient(to right, black, ${pl.color}80)`,
//                 color: pl.color,
//               }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               className={`px-4 py-2 rounded-full flex items-center space-x-2 border border-transparent ${
//                 activePlatform.name === pl.name
//                   ? "bg-white text-black shadow-lg border-white"
//                   : "bg-black/30 text-white hover:border-white/30"
//               }`}
//             >
//               <motion.div className="w-5 h-5" variants={iconHoverVariants} initial="rest" whileHover="hover">
//                 {logoComponents[pl.logo]}
//               </motion.div>
//               <span>{pl.name}</span>
//             </motion.button>
//           ))}
//         </motion.div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activePlatform.name}
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//           >
//             {/* Profile Card */}
//             <motion.div
//               variants={itemVariants}
//               whileHover={{
//                 scale: 1.02,
//                 boxShadow: `0 4px 20px ${activePlatform.color}50`,
//                 background: `linear-gradient(to bottom, black, ${activePlatform.color}20)`,
//               }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 cursor-pointer"
//               style={{ borderColor: `${activePlatform.color}30` }}
//             >
//               <motion.div variants={containerVariants} initial="hidden" animate="visible">
//                 <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-6">
//                   <motion.div
//                     className="w-16 h-16 rounded-lg flex items-center justify-center p-3 text-white"
//                     style={{ backgroundColor: `${activePlatform.color}30` }}
//                     variants={iconHoverVariants}
//                     initial="rest"
//                     whileHover="hover"
//                   >
//                     {logoComponents[activePlatform.logo]}
//                   </motion.div>
//                   <div>
//                     <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white">
//                       {activePlatform.name}
//                     </motion.h3>
//                     <motion.p variants={itemVariants} className="text-gray-400">
//                       @{activePlatform.username}
//                     </motion.p>
//                   </div>
//                 </motion.div>

//                 <motion.a
//                   variants={itemVariants}
//                   href={activePlatform.profileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center space-x-2 w-full py-3 mb-6 rounded-lg text-white transition-all duration-300"
//                   style={{
//                     background: `linear-gradient(to right, black, ${activePlatform.color}80)`,
//                   }}
//                   whileHover={{
//                     scale: 1.05,
//                     boxShadow: `0 0 12px ${activePlatform.color}`,
//                   }}
//                 >
//                   <motion.div className="w-4 h-4" variants={iconHoverVariants} initial="rest" whileHover="hover">
//                     <ExternalLink className="w-full h-full" />
//                   </motion.div>
//                   <span>View Profile</span>
//                 </motion.a>

//                 <motion.div variants={profileCardContentHover} initial="rest" whileHover="hover" className="space-y-4">
//                   <motion.div variants={itemVariants} className="flex items-center space-x-3">
//                     <Code className="w-5 h-5 text-gray-400" />
//                     <span className="text-white">Competitive Programmer</span>
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="flex items-center space-x-3">
//                     <Award className="w-5 h-5 text-gray-400" />
//                     <span className="text-white">Algorithm Specialist</span>
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="flex items-center space-x-3">
//                     <Star className="w-5 h-5 text-gray-400" />
//                     <span className="text-white">Problem Solver</span>
//                   </motion.div>
//                   <motion.div variants={itemVariants} className="flex items-center space-x-3">
//                     <Users className="w-5 h-5 text-gray-400" />
//                     <span className="text-white">Contest Participant</span>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             </motion.div>

//             {/* Statistics Card */}
//             <motion.div
//               variants={itemVariants}
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: `0 0 20px ${activePlatform.color}80`,
//                 transition: { type: "spring", stiffness: 300, damping: 20 },
//                 background: `linear-gradient(to bottom, black, ${activePlatform.color}20)`,
//               }}
//               className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 cursor-pointer"
//               style={{ borderColor: `${activePlatform.color}30` }}
//             >
//               <motion.div variants={containerVariants} initial="hidden" animate="visible">
//                 <motion.h3 variants={itemVariants} className="text-xl font-bold text-white mb-6 flex items-center">
//                   <Star className="w-5 h-5 mr-2" style={{ color: activePlatform.color }} />
//                   Statistics
//                 </motion.h3>

//                 <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
//                   {[
//                     ["Ranking", activePlatform.stats.ranking],
//                     ["Problems Solved", activePlatform.stats.problemsSolved],
//                     ["Contests", activePlatform.stats.contests],
//                     ["Highest Rating", activePlatform.stats.highestRating],
//                   ].map(([label, value]) => (
//                     <motion.div
//                       key={label as string}
//                       whileHover={{
//                         scale: 1.05,
//                         boxShadow: `0 0 10px ${activePlatform.color}70`,
//                         backgroundColor: `${activePlatform.color}30`,
//                         transition: {
//                           type: "spring",
//                           stiffness: 300,
//                           damping: 15,
//                         },
//                       }}
//                       className="bg-black/50 rounded-lg p-4 text-center"
//                     >
//                       <p className="text-gray-400 text-sm">{label as string}</p>
//                       <p className="text-white text-xl font-bold" style={{ color: activePlatform.color }}>
//                         {value as string | number}
//                       </p>
//                     </motion.div>
//                   ))}
//                 </motion.div>

//                 <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-white/10">
//                   <motion.h4 variants={itemVariants} className="text-white font-medium mb-3">
//                     Skill Progress
//                   </motion.h4>
//                   {[
//                     ["Data Structures", 92],
//                     ["Algorithms", 88],
//                     ["Dynamic Programming", 85],
//                   ].map(([skill, pct]) => (
//                     <motion.div
//                       key={skill as string}
//                       whileHover={{
//                         scale: 1.03,
//                         boxShadow: `0 0 8px ${activePlatform.color}50`,
//                         transition: {
//                           type: "spring",
//                           stiffness: 300,
//                           damping: 15,
//                         },
//                       }}
//                       className="mb-4"
//                     >
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-400">{skill as string}</span>
//                         <span className="text-white">{pct}%</span>
//                       </div>
//                       <div className="h-2 bg-black/50 rounded-full overflow-hidden">
//                         <div
//                           className="h-full rounded-full"
//                           style={{
//                             backgroundColor: activePlatform.color,
//                             width: `${pct}%`,
//                             transition: "width 0.5s ease",
//                           }}
//                         />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </motion.div>
//             </motion.div>

//             {/* Achievements Card */}
//             <motion.div
//               variants={itemVariants}
//               whileHover={{
//                 scale: 1.02,
//                 boxShadow: `0 4px 20px ${activePlatform.color}50`,
//                 background: `linear-gradient(to bottom, black, ${activePlatform.color}20)`,
//               }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 cursor-pointer"
//             >
//               <motion.div variants={containerVariants} initial="hidden" animate="visible">
//                 <motion.h3 variants={itemVariants} className="text-xl font-bold text-white mb-6 flex items-center">
//                   <Award className="w-5 h-5 mr-2" style={{ color: activePlatform.color }} />
//                   Achievements
//                 </motion.h3>

//                 <motion.ul variants={containerVariants} className="space-y-4">
//                   {activePlatform.achievements.map((ach, i) => (
//                     <motion.li
//                       key={i}
//                       variants={itemVariants}
//                       className="flex items-start space-x-3"
//                       whileHover={{
//                         scale: 1.03,
//                         x: 5,
//                         color: activePlatform.color,
//                         transition: {
//                           type: "spring",
//                           stiffness: 300,
//                           damping: 15,
//                         },
//                       }}
//                     >
//                       <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: activePlatform.color }} />
//                       <span className="text-white">{ach}</span>
//                     </motion.li>
//                   ))}
//                 </motion.ul>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   )
// }
