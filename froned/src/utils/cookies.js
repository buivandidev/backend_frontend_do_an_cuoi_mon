/**
 * HTTP-only Cookie Management Utilities
 * Handles secure token storage for authentication
 */

const COOKIE_NAME = 'phuongxa_auth_token'
const COOKIE_OPTIONS = {
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  path: '/',
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'lax', // CSRF protection
}

/**
 * Get auth token from document.cookie
 * Note: HTTP-only cookies are NOT accessible from JavaScript
 * This is for development/reference only. In production, the token
 * is automatically sent by the browser with credentials: 'include'
 */
export const getAuthToken = () => {
  try {
    const name = COOKIE_NAME + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieArray = decodedCookie.split(';')

    for (let cookie of cookieArray) {
      cookie = cookie.trim()
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length)
      }
    }
    return null
  } catch {
    return null
  }
}

/**
 * Set auth token in HTTP-only cookie
 * Should only be called from backend via Set-Cookie header
 */
export const setAuthToken = (token) => {
  if (!token) {
    clearAuthToken()
    return
  }

  // Note: In production, this should be set by the backend via Set-Cookie header
  // Frontend can only set non-HTTP-only cookies
  // This is a fallback for development-only usage
  if (process.env.NODE_ENV !== 'production') {
    const expiryDate = new Date()
    expiryDate.setTime(expiryDate.getTime() + COOKIE_OPTIONS.maxAge * 1000)
    const expires = 'expires=' + expiryDate.toUTCString()

    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)};${expires};${COOKIE_OPTIONS.path};SameSite=${COOKIE_OPTIONS.sameSite}`
  }
}

/**
 * Clear auth token from cookies
 */
export const clearAuthToken = () => {
  // Set cookie with past date to delete it
  const expiryDate = new Date()
  expiryDate.setTime(expiryDate.getTime() - 86400000) // 1 day ago
  const expires = 'expires=' + expiryDate.toUTCString()

  document.cookie = `${COOKIE_NAME}=;${expires};${COOKIE_OPTIONS.path}`
}

/**
 * Check if token cookie exists (without reading its value)
 * HTTP-only cookies can be checked but not read by JavaScript
 */
export const hasAuthTokenCookie = () => {
  try {
    const name = COOKIE_NAME + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    return decodedCookie.indexOf(name) !== -1
  } catch {
    return false
  }
}
