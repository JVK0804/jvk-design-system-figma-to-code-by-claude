import { useAnimation } from 'framer-motion'

const springConfig = {
  type: 'spring' as const,
  stiffness: 520,
  damping: 22,
  mass: 0.6,
}

export function useHapticPress() {
  const controls = useAnimation()

  const onPointerDown = async () => {
    await controls.start({
      scale: 0.955,
      transition: { duration: 0.03, ease: [0.4, 0, 1, 1] },
    })
  }

  const onPointerUp = async () => {
    await controls.start({
      scale: 1.018,
      transition: springConfig,
    })
    await controls.start({
      scale: 1,
      transition: { duration: 0.05, ease: 'easeOut' },
    })
  }

  const onPointerLeave = () => {
    controls.start({ scale: 1, transition: { duration: 0.15 } })
  }

  return { controls, onPointerDown, onPointerUp, onPointerLeave }
}
