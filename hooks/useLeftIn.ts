import { useEffect, useState } from 'react'

export default function useLeftIn(show: boolean, duration = 150) {
  const [left, setLeft] = useState(0)
  const [zIndex, setZIndex] = useState(1)

  useEffect(() => {
    setLeft(-150)
    const timer = window.setTimeout(() => {
      setLeft(0)
      setZIndex(show ? 2 : 1)
    }, duration)
    return () => {
      window.clearTimeout(timer)
    }
  }, [duration, show])

  return { left, zIndex }
}
