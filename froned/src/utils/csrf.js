/**
 * CSRF Token Management
 * Handles Cross-Site Request Forgery protection
 */

/**
 * Get CSRF token from meta tag
 * Backend should include: <meta name="csrf-token" content="token-value">
 * in the HTML head
 */
export const getCsrfToken = () => {
  try {
    const meta = document.querySelector('meta[name="csrf-token"]')
    if (!meta) {
      console.warn('CSRF token meta tag not found. CSRF protection may not work.')
      return null
    }
    return meta.getAttribute('content')
  } catch {
    return null
  }
}

/**
 * Check if CSRF token is available
 */
export const hasCsrfToken = () => {
  return Boolean(getCsrfToken())
}
