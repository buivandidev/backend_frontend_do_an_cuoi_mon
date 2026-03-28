/**
 * Custom hook for authentication hydration
 * Validates token with backend on app mount
 */
import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth.store'
import { apiClient, unwrapApi } from '../services/api'

export const useAuthHydration = () => {
  const [isHydrating, setIsHydrating] = useState(true)
  const [hydrateError, setHydrateError] = useState(null)
  const { setAuth, logout } = useAuthStore((state) => ({
    setAuth: state.setAuth,
    logout: state.logout,
  }))

  useEffect(() => {
    const hydrate = async () => {
      try {
        // Call /api/auth/me to validate token with backend
        const response = await apiClient.get('/auth/me')
        const userData = unwrapApi(response)

        // Set auth state with user data
        setAuth({
          maTruyCap: 'token', // Token is in HTTP-only cookie, just mark as authenticated
          nguoiDung: userData,
        })

        setHydrateError(null)
      } catch (err) {
        // Token is invalid or expired
        if (err?.response?.status === 401) {
          logout()
          setHydrateError(null) // Not an error, just not authenticated
        } else {
          // Network error or server error - log but don't force logout
          console.warn('Auth hydration error:', err?.message)
          setHydrateError(err?.message)
        }
      } finally {
        setIsHydrating(false)
      }
    }

    hydrate()
  }, [setAuth, logout])

  return { isHydrating, hydrateError }
}
