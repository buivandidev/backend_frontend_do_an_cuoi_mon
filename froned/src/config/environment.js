const DEFAULT_API_BASE_URL = 'http://localhost:5187'

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  useMockApi: String(import.meta.env.VITE_USE_MOCK_API ?? 'false').toLowerCase() === 'true',
  appName: 'Cổng Thông Tin Phường Xã',
}
