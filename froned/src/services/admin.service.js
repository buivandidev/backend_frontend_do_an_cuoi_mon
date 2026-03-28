import { apiClient, unwrapApi } from './api'

export const adminService = {
  async getServices({ timKiem = '', danhMucId = '', dangHoatDong = '', trang = 1, kichThuocTrang = 20 } = {}) {
    const response = await apiClient.get('/api/services/admin', {
      params: {
        timKiem: timKiem || undefined,
        danhMucId: danhMucId || undefined,
        dangHoatDong: dangHoatDong === '' ? undefined : dangHoatDong,
        trang,
        kichThuocTrang,
      },
    })

    return unwrapApi(response)
  },

  async getApplications({ trangThai = '', dichVuId = '', timKiem = '', trang = 1, kichThuocTrang = 20 } = {}) {
    const response = await apiClient.get('/api/applications', {
      params: {
        trangThai: trangThai === '' ? undefined : trangThai,
        dichVuId: dichVuId || undefined,
        timKiem: timKiem || undefined,
        trang,
        kichThuocTrang,
      },
    })

    return unwrapApi(response)
  },

  async updateApplicationStatus(id, { trangThai, ghiChuNguoiXuLy }) {
    const response = await apiClient.patch(`/api/applications/${id}/status`, {
      trangThai,
      ghiChuNguoiXuLy: ghiChuNguoiXuLy || undefined,
    })

    return unwrapApi(response)
  },

  async getArticles({ timKiem = '', danhMucId = '', trangThai = '', trang = 1, kichThuocTrang = 20 } = {}) {
    const response = await apiClient.get('/api/articles/admin', {
      params: {
        timKiem: timKiem || undefined,
        danhMucId: danhMucId || undefined,
        trangThai: trangThai === '' ? undefined : trangThai,
        trang,
        kichThuocTrang,
      },
    })
    return unwrapApi(response)
  },

  async getArticleDetail(id) {
    const response = await apiClient.get(`/api/articles/${id}/detail`)
    return unwrapApi(response)
  },

  async createArticle(payload) {
    const response = await apiClient.post('/api/articles', payload)
    return unwrapApi(response)
  },

  async updateArticle(id, payload) {
    const response = await apiClient.put(`/api/articles/${id}`, payload)
    return unwrapApi(response)
  },

  async publishArticle(id) {
    const response = await apiClient.patch(`/api/articles/${id}/publish`, {})
    return unwrapApi(response)
  },

  async deleteArticle(id) {
    const response = await apiClient.delete(`/api/articles/${id}`)
    return unwrapApi(response)
  },

  async getComments({ daDuyet = '', trang = 1, kichThuocTrang = 20 } = {}) {
    const response = await apiClient.get('/api/comments/admin', {
      params: {
        daDuyet: daDuyet === '' ? undefined : daDuyet,
        trang,
        kichThuocTrang,
      },
    })
    return unwrapApi(response)
  },

  async approveComment(id) {
    const response = await apiClient.patch(`/api/comments/${id}/approve`, {})
    return unwrapApi(response)
  },

  async deleteComment(id) {
    const response = await apiClient.delete(`/api/comments/${id}`)
    return unwrapApi(response)
  },
}
