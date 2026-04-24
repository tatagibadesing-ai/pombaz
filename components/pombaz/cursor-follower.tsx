"use client"

import { useEffect, useRef } from "react"

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const followerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    // Only enable on fine pointers (mouse/trackpad)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (!mediaQuery.matches) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let followerX = mouseX
    let followerY = mouseY
    let rafId = 0
    let visible = false

    const show = () => {
      if (visible) return
      visible = true
      dot.style.opacity = "1"
      follower.style.opacity = "1"
    }
    const hide = () => {
      visible = false
      dot.style.opacity = "0"
      follower.style.opacity = "0"
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      show()
    }
    const onLeave = () => hide()

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']")

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        follower.classList.add("is-hover")
      }
    }
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        follower.classList.remove("is-hover")
      }
    }

    const animate = () => {
      // Dot follows 1:1 with tight lerp for crispness
      dotX += (mouseX - dotX) * 0.6
      dotY += (mouseY - dotY) * 0.6
      // Follower lags with inertia (~80-100ms)
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="pombaz-cursor" style={{ opacity: 0 }} aria-hidden="true" />
      <div
        ref={followerRef}
        className="pombaz-cursor-follower"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  )
}
