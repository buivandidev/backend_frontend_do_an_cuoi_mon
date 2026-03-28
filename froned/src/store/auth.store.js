import { create } from 'zustand'
import { clearAuthToken } from '../utils/cookies'

/**
 * Normalize auth payload from API response
 * Handles both camelCase and PascalCase field names
 */
const normalizeAuthPayload = (payload) => {
  const accessToken = payload?.maTruyCap ?? payload?.MaTruyCap ?? null
  const user = payload?.nguoiDung ?? payload?.NguoiDung ?? null
  const roles = user?.danhSachVaiTro ?? user?.DanhSachVaiTro ?? []

  return {
    accessToken,
    user,
    roles,
    isAuthenticated: Boolean(accessToken),
  }
}

/**
 * Zustand auth store
 * IMPORTANT: Auth state is now kept IN-MEMORY ONLY
 * - Tokens are stored in HTTP-only cookies (set by backend)
 * - This store is hydrated on app mount by calling /api/auth/me
 * - No localStorage persistence (XSS vulnerability removed)
 */
export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  roles: [],
  isAuthenticated: false,

  /**
   * Called after successful login with token from API
   * Backend should set HTTP-only cookie via Set-Cookie header
   * Frontend store tracks the user session state
   */
  loginSuccess: (payload) => {
    const normalized = normalizeAuthPayload(payload)
    set(normalized)
  },

  /**
   * Hydrate store from user profile
   * Called after token validation with backend
   */
  hydrateFromUserProfile: (user) => {
    const snapshot = {
      accessToken: get().accessToken,
      user,
      roles: user?.danhSachVaiTro ?? user?.DanhSachVaiTro ?? [],
      isAuthenticated: Boolean(get().accessToken),
    }
    set(snapshot)
  },

  /**
   * Clear auth state on logout
   * Important: Also clear HTTP-only cookie via /api/auth/logout
   */
  logout: () => {
    clearAuthToken() // Clear any development cookies
    set({
      accessToken: null,
      user: null,
      roles: [],
      isAuthenticated: false,
    })
  },

  /**
   * Check if user has a specific role
   */
  hasRole: (role) => get().roles.includes(role),

  /**
   * Set auth state directly (called by hydration logic)
   */
  setAuth: (authData) => {
    const normalized = normalizeAuthPayload(authData)
    set(normalized)
  },
}))
