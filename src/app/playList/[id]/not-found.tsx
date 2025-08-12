"use client"
import Link from "next/link"
import { motion } from "framer-motion"

export default function MusicNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-purple-600 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50"
      >
        <span className="text-3xl font-bold">🎵</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl font-bold mb-3"
      >
        Music Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-400 mb-6 max-w-md text-center"
      >
        Sorry, the track you are looking for doesn’t exist, or it might have been removed.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link
          href="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-500 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
