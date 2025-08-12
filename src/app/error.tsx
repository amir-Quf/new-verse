"use client"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ErrorPage({ error, reset }: { error?: Error; reset?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <motion.div
        initial={{ rotate: -10, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-red-600 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg shadow-red-500/50"
      >
        <span className="text-3xl font-bold">!</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl font-bold mb-3"
      >
        Something went wrong
      </motion.h1>

      {error?.message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-400 mb-6 max-w-md text-center text-sm"
        >
          {error.message}
        </motion.p>
      )}

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {reset && (
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Try Again
          </button>
        )}

        <Link
          href="/"
          className="px-6 py-3 bg-gray-800 text-white border border-gray-600 rounded-full font-semibold hover:bg-gray-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
