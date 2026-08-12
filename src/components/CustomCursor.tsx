import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (isTouch) {
      document.body.classList.add('has-touch')
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let currentX = x
    let currentY = y
    let raf = 0

    const move = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
    }

    const tick = () => {
      currentX += (x - currentX) * 0.22
      currentY += (y - currentY) * 0.22
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-cursor="hover"], a, button, input, textarea, select')) {
        cursor.classList.add('is-hover')
      }
    }

    const onOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('[data-cursor="hover"], a, button, input, textarea, select')) {
        cursor.classList.remove('is-hover')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return <div className="cursor" ref={cursorRef} aria-hidden />
}
