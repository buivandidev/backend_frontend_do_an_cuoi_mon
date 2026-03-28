import { apiClient, unwrapApi } from './api'

export const commentsService = {
  async getByArticleId(baiVietId, { trang = 1, kichThuocTrang = 20 } = {}) {
    const response = await apiClient.get('/api/comments', {
      params: {
        baiVietId,
        trang,
        kichThuocTrang,
      },
    })
    return unwrapApi(response)
  },

  async create({ baiVietId, noiDung, tenKhach, emailKhach, chaId } = {}) {
    const response = await apiClient.post('/api/comments', {
      baiVietId,
      noiDung,
      tenKhach: tenKhach || undefined,
      emailKhach: emailKhach || undefined,
      chaId: chaId || undefined,
    })
    return unwrapApi(response)
  },
}
