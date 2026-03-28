import { apiClient, unwrapApi } from './api'

export const publicServicesService = {
  async getAll({ timKiem = '', danhMucId = '', trang = 1, kichThuocTrang = 12 } = {}) {
    const response = await apiClient.get('/api/services', {
      params: {
        timKiem: timKiem || undefined,
        danhMucId: danhMucId || undefined,
        trang,
        kichThuocTrang,
      },
    })
    return unwrapApi(response)
  },

  async getById(id) {
    const response = await apiClient.get(`/api/services/${id}`)
    return unwrapApi(response)
  },

  async submitApplication(payload) {
    const response = await apiClient.post('/api/applications/submit', payload)
    return unwrapApi(response)
  },

  async trackApplication(maTheoDoi, emailNguoiNop) {
    const response = await apiClient.get(`/api/applications/track/${maTheoDoi}`, {
      params: { emailNguoiNop },
    })
    return unwrapApi(response)
  },
}
