import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export function ProtectedRoute({ children }) {
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}

export function RoleRoute({ children, allow = [] }) {
  const roles = useAuthStore((state) => state.roles)
  // CRITICAL FIX: User must have required role (not: everyone if allow is empty)
  const authorized = allow.length > 0 && allow.some((role) => roles.includes(role))

  if (!authorized) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return children
}
