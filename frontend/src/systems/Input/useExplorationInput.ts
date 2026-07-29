import { useEffect, useRef } from 'react'

export function useExplorationInput(enabled: boolean) {
  const pressedKeys = useRef(new Set<string>())

  useEffect(() => {
    if (!enabled) {
      pressedKeys.current.clear()
      return
    }

    const press = (event: KeyboardEvent) => {
      pressedKeys.current.add(event.key.toLowerCase())
    }
    const release = (event: KeyboardEvent) => {
      pressedKeys.current.delete(event.key.toLowerCase())
    }
    const clear = () => pressedKeys.current.clear()

    window.addEventListener('keydown', press)
    window.addEventListener('keyup', release)
    window.addEventListener('blur', clear)

    return () => {
      window.removeEventListener('keydown', press)
      window.removeEventListener('keyup', release)
      window.removeEventListener('blur', clear)
    }
  }, [enabled])

  return pressedKeys
}
