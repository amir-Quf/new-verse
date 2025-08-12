"use client"
import { motion } from "framer-motion"

export default function LoadingNewVerse() {
  const text = "new verse"
  const letters = text.split("")

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="text-white text-5xl font-bold flex space-x-1"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {},
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              duration: 0.3,
              delay: index * 0.15,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
