import { useEffect, useState } from 'react'

// Custom Hook: trì hoãn cập nhật giá trị (debounce) — dùng cho ô tìm kiếm
export function useDebounce(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
