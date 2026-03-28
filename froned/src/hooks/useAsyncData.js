/**
 * Custom hook for safe async data fetching with race condition prevention
 * Uses AbortController to cancel previous requests when dependencies change
 */
import { useEffect, useRef, useState } from 'react'

export const useAsyncData = (asyncFn, dependencies = [], options = {}) => {
  const [data, setData] = useState(options.initialData ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const abortControllerRef = useRef(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()

    const load = async () => {
      if (!isMountedRef.current) return

      setLoading(true)
      setError(null)

      try {
        // Pass abort signal to async function
        const result = await asyncFn({
          signal: abortControllerRef.current.signal,
        })

        // Only update state if component is still mounted and request wasn't aborted
        if (isMountedRef.current && !abortControllerRef.current.signal.aborted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        // Ignore abort errors (expected when dependencies change)
        if (err.name === 'AbortError') {
          return
        }

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setError(err)
          setData(null)
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    }

    load()

    // Cleanup: abort request on unmount or dependency change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, dependencies)

  return { data, loading, error }
}
