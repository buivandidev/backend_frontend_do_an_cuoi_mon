import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ToastViewport from './components/common/ToastViewport'
import { env } from './config/environment'
import { AppRoutes } from './router/routes'
import { useAuthStore } from './store/auth.store'
import { notify } from './utils/notify'
import { useAuthHydration } from './hooks/useAuthHydration'

function App() {
  const logout = useAuthStore((state) => state.logout)
  const { isHydrating } = useAuthHydration()

  useEffect(() => {
    const onUnauthorized = () => {
      logout()
      window.location.href = '/admin/login'
    }

    window.addEventListener('auth:unauthorized', onUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized)
  }, [logout])

  useEffect(() => {
    if (env.useMockApi) {
      notify.info('Dang chay che do mock API. Du lieu hien thi la du lieu gia lap.')
    }
  }, [])

  // Show loading screen while validating auth
  if (isHydrating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--brand)]" />
          <p className="text-[var(--ink-muted)]">Đang xác thực phiên đăng nhập...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastViewport />
    </BrowserRouter>
  )
}

export default App
