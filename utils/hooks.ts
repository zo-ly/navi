import { useCallback, useEffect, useRef, useState } from 'react'

const getScrollTop = () =>
  document.documentElement.scrollTop || document.body.scrollTop

const lock = () => {
  const scrollTop = getScrollTop()
  document.body.style.height = '100vh'
  document.body.style.overflow = 'hidden'
  document.body.scrollTo(0, scrollTop)
}

export const useLockScroll = () => {
  const styleRef = useRef({ height: '', overflow: '' })

  useEffect(() => {
    const { style } = document.body
    styleRef.current = {
      height: style.height,
      overflow: style.overflow,
    }
  }, [])

  const unlock = useCallback(() => {
    const scrollTop = getScrollTop()
    const { height, overflow } = styleRef.current
    document.body.style.height = height
    document.body.style.overflow = overflow
    window.scrollTo(0, scrollTop)
  }, [])

  return [lock, unlock]
}

export const useFadeState = (visible?: boolean): ['block' | 'none', number] => {
  const [innerVisible, setInnerVisible] = useState(visible)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (visible) {
      setInnerVisible(visible)
      setTimeout(() => setOpacity(1), 100)
      return
    }

    setOpacity(0)
    setTimeout(() => setInnerVisible(false), 350)
  }, [visible])

  return [innerVisible ? 'block' : 'none', opacity]
}
