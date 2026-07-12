'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    tsParticles?: { load: (id: string, options: Record<string, unknown>) => void }
  }
}

const CONTAINER_ID = 'hero-tsparticles'
const CDN_SRC = 'https://cdn.jsdelivr.net/npm/tsparticles@3.3.0/tsparticles.bundle.min.js'

/** Thin client island: loads the tsParticles CDN bundle once and starts the
 * subtle drifting-dust layer over the Hero background — see design-handoff's
 * Homepage.dc.html componentDidMount for the source config this mirrors. */
export function HeroParticles() {
  useEffect(() => {
    const init = () => {
      if (window.tsParticles && document.getElementById(CONTAINER_ID)) {
        window.tsParticles.load(CONTAINER_ID, {
          fullScreen: { enable: false },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 80, duration: 0.8, factor: 1, speed: 1 } },
          },
          particles: {
            color: { value: '#ffffff' },
            move: {
              enable: true,
              direction: 'none',
              random: false,
              straight: false,
              outModes: { default: 'out' },
              speed: { min: 0.1, max: 0.6 },
            },
            number: { density: { enable: true, width: 400, height: 400 }, value: 60 },
            opacity: { value: { min: 0.1, max: 0.8 }, animation: { enable: true, speed: 3, sync: false, startValue: 'random' } },
            shape: { type: 'circle' },
            size: { value: { min: 0.4, max: 1.2 } },
          },
          detectRetina: true,
        })
      }
    }

    if (window.tsParticles) {
      init()
      return
    }

    const script = document.createElement('script')
    script.src = CDN_SRC
    script.async = true
    script.onload = init
    document.head.appendChild(script)
  }, [])

  return <div id={CONTAINER_ID} style={{ position: 'absolute', inset: 0 }} />
}
