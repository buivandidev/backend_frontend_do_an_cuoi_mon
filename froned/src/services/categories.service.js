import { apiClient, unwrapApi } from './api'

export const categoriesService = {
  async getNewsCategories() {
    const response = await apiClient.get('/api/categories', {
      params: { loai: 0 },
    })
    return unwrapApi(response)
  },

  async getServiceCategories() {
    const response = await apiClient.get('/api/categories', {
      params: { loai: 1 },
    })
    return unwrapApi(response)
  },
}
