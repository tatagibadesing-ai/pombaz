"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className = "", delay = 0, y = 22 }: RevealProps) {
  const transition: HTMLMotionProps<"div">["transition"] = {
    duration: 0.72,
    ease: [0.22, 1, 0.36, 1],
    delay: delay / 1000,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
