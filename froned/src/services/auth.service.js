import { apiClient, unwrapApi } from './api'

export const authService = {
  async login({ email, password }) {
    const response = await apiClient.post('/api/auth/login', {
      email,
      matKhau: password,
    })
    return unwrapApi(response)
  },

  async me() {
    const response = await apiClient.get('/api/auth/me')
    return unwrapApi(response)
  },

  async refresh() {
    const response = await apiClient.post('/api/auth/refresh', {})
    return unwrapApi(response)
  },

  async logout() {
    const response = await apiClient.post('/api/auth/logout', {})
    return unwrapApi(response)
  },
}
