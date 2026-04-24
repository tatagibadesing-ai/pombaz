"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: {
        offset: -24,
      },
    })

    let frame = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(raf)
    }

    frame = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
