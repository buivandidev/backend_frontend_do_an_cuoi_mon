import { apiClient, unwrapApi } from './api'

export const articlesService = {
  async getPublished({ timKiem = '', danhMucId = '', noiBat = '', trang = 1, kichThuocTrang = 9 } = {}) {
    const response = await apiClient.get('/api/articles', {
      params: {
        timKiem: timKiem || undefined,
        danhMucId: danhMucId || undefined,
        noiBat: noiBat === '' ? undefined : noiBat,
        trang,
        kichThuocTrang,
      },
    })

    return unwrapApi(response)
  },

  async getBySlug(slug) {
    const response = await apiClient.get(`/api/articles/${slug}`)
    return unwrapApi(response)
  },

  async getRelated(slug, gioiHan = 4) {
    const response = await apiClient.get(`/api/articles/${slug}/related`, {
      params: { gioiHan },
    })
    return unwrapApi(response)
  },

  async getPopular(gioiHan = 5) {
    const response = await apiClient.get('/api/articles/popular', {
      params: { gioiHan },
    })
    return unwrapApi(response)
  },
}
