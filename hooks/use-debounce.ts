import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay: number = 500): string => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounceValue
}

export default useDebounce
