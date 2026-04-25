"use client"

import { useEffect, useRef } from "react"

export function ReceitaMagicaVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = 1.18
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label="Mascote POMBAZ com refeição saudável"
      className="relative z-[20] block h-auto max-h-[44svh] w-auto max-w-none translate-x-0 select-none self-end sm:max-h-[52svh] lg:z-[70] lg:max-h-[90svh] lg:translate-x-[13%]"
    >
      <source src="/heropombazmagicodieta.mp4" type="video/mp4" />
    </video>
  )
}
