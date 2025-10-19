import { useCallback, useState } from 'react'
import { Scene } from './Scene'
import clsx from 'clsx'

const DEFAULT_ROTATION_SPEED = 8.0
const MAXIMIZED_ROTATION_SPEED = DEFAULT_ROTATION_SPEED * 5

interface Logo3DProps {
  isMaximized: boolean
  className?: string
}

export function Logo3D({ isMaximized, className }: Logo3DProps) {
  const [rotationSpeed, setRotationSpeed] = useState(DEFAULT_ROTATION_SPEED)

  const onPointerOver = useCallback(() => {
    if (!isMaximized) {
      setRotationSpeed(MAXIMIZED_ROTATION_SPEED)
    }
  }, [isMaximized])

  const onPointerOut = useCallback(() => {
    if (!isMaximized) {
      setRotationSpeed(DEFAULT_ROTATION_SPEED)
    }
  }, [isMaximized])

  const navigateHome = () => {
    // Scroll to home section
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
    setRotationSpeed(DEFAULT_ROTATION_SPEED);
  }

  return (
    <div
      className={clsx(
        isMaximized ? 'w-full h-full pointer-events-none' : 'w-10 h-10 p-1 cursor-pointer',
        'duration-500 fixed top-0 left-0 z-20 mix-blend-difference flex items-center justify-center',
        className,
      )}
      onClick={!isMaximized ? navigateHome : undefined}>
      <Scene
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        rotationSpeed={rotationSpeed}
        isInteractive={isMaximized}
      />
    </div>
  )
}
