import axios from 'axios'
import { env } from '../config/environment'
import { mockApiAdapter } from './mock-api-adapter'
import { notify } from '../utils/notify'
import { getCsrfToken } from '../utils/csrf'

/**
 * Axios client for API requests
 * IMPORTANT: Authentication now uses HTTP-only cookies
 * - Tokens are stored in secure HTTP-only cookies (set by backend)
 * - axios is configured with withCredentials: true
 * - Browser automatically sends cookies with each request
 * - No need to manually add Authorization header
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  adapter: env.useMockApi ? mockApiAdapter : undefined,
  withCredentials: true, // CRITICAL: Send cookies automatically
})

/**
 * Request interceptor
 * Adds CSRF token to POST/PUT/DELETE requests for CSRF protection
 */
apiClient.interceptors.request.use((config) => {
  // Add CSRF token for state-changing requests
  if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
    const csrfToken = getCsrfToken()
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken
    }
  }
  return config
})

/**
 * Response interceptor
 * Handles errors and token expiration
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const message = error?.response?.data?.thongDiep ?? error?.message

    // Handle token expiration
    if (status === 401) {
      window.dispatchEvent(new Event('auth:unauthorized'))
      notify.warning('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
      // Clear auth store
      const { useAuthStore } = require('../store/auth.store')
      useAuthStore.getState().logout()
    } else if (status >= 500) {
      notify.error(message || 'Lỗi máy chủ. Vui lòng thử lại sau.')
    }

    return Promise.reject(error)
  },
)

/**
 * Unwrap API response
 * Handles custom API format: { thanhCong, thongDiep, duLieu }
 * Also handles PascalCase variants: { ThanhCong, ThongDiep, DuLieu }
 *
 * @param {Object} response - Axios response object
 * @returns {*} The unwrapped data from duLieu field
 * @throws {Error} If response format is invalid or thanhCong is false
 */
export const unwrapApi = (response) => {
  const payload = response?.data

  // Validate payload exists
  if (!payload || typeof payload !== 'object') {
    throw new Error('Phản hồi API không hợp lệ')
  }

  // Get success status (handle both camelCase and PascalCase)
  const thanhCong = payload.thanhCong ?? payload.ThanhCong ?? null

  // Check success status type
  if (typeof thanhCong !== 'boolean') {
    throw new Error('Định dạng API không nhất quán: thanhCong không phải boolean')
  }

  // If request failed, throw error message
  if (!thanhCong) {
    const errorMsg = payload.thongDiep ?? payload.ThongDiep ?? 'Yêu cầu thất bại'
    throw new Error(errorMsg)
  }

  // Extract data (handle both camelCase and PascalCase)
  const data = payload.duLieu ?? payload.DuLieu ?? null

  // IMPORTANT: Validate that duLieu exists when thanhCong is true
  if (data === null || data === undefined) {
    console.warn('API response format warning: duLieu is null but thanhCong is true')
    // Return empty object as fallback (some endpoints return no data)
    return {}
  }

  return data
}

