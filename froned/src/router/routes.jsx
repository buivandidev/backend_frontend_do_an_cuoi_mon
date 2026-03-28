import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute, RoleRoute } from '../components/auth/ProtectedRoute'
import RouteSkeleton from '../components/common/RouteSkeleton'
import { AdminLayout } from '../components/layout/AdminLayout'
import { PublicLayout } from '../components/layout/PublicLayout'
import { ROLES } from '../config/constants'

const LoginPage = lazy(() => import('../pages/admin/LoginPage'))
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'))
const UsersPage = lazy(() => import('../pages/admin/UsersPage'))
const CategoriesPage = lazy(() => import('../pages/admin/CategoriesPage'))
const ArticlesPage = lazy(() => import('../pages/admin/ArticlesPage'))
const CommentsPage = lazy(() => import('../pages/admin/CommentsPage'))
const AdminServicesPage = lazy(() => import('../pages/admin/AdminServicesPage'))
const ApplicationsPage = lazy(() => import('../pages/admin/ApplicationsPage'))

const AboutPage = lazy(() => import('../pages/public/AboutPage'))
const ContactPage = lazy(() => import('../pages/public/ContactPage'))
const HomePage = lazy(() => import('../pages/public/HomePage'))
const LibraryPage = lazy(() => import('../pages/public/LibraryPage'))
const NewsDetailPage = lazy(() => import('../pages/public/NewsDetailPage'))
const NewsListPage = lazy(() => import('../pages/public/NewsListPage'))
const ServiceSubmitPage = lazy(() => import('../pages/public/ServiceSubmitPage'))
const ServiceTrackingPage = lazy(() => import('../pages/public/ServiceTrackingPage'))
const ServiceDetailPage = lazy(() => import('../pages/public/ServiceDetailPage'))
const ServicesPage = lazy(() => import('../pages/public/ServicesPage'))
const NotFoundPage = lazy(() => import('../pages/shared/NotFoundPage'))

function withSuspense(element) {
  return <Suspense fallback={<RouteSkeleton />}>{element}</Suspense>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={withSuspense(<HomePage />)} />
        <Route path="/gioi-thieu" element={withSuspense(<AboutPage />)} />
        <Route path="/tin-tuc" element={withSuspense(<NewsListPage />)} />
        <Route path="/tin-tuc/:slug" element={withSuspense(<NewsDetailPage />)} />
        <Route path="/dich-vu" element={withSuspense(<ServicesPage />)} />
        <Route path="/dich-vu/:id" element={withSuspense(<ServiceDetailPage />)} />
        <Route path="/dich-vu/nop-ho-so" element={withSuspense(<ServiceSubmitPage />)} />
        <Route path="/dich-vu/tra-cuu" element={withSuspense(<ServiceTrackingPage />)} />
        <Route path="/thu-vien" element={withSuspense(<LibraryPage />)} />
        <Route path="/lien-he" element={withSuspense(<ContactPage />)} />
      </Route>

      <Route path="/admin/login" element={withSuspense(<LoginPage />)} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={withSuspense(<DashboardPage />)} />
        <Route
          path="users"
          element={
            <RoleRoute allow={[ROLES.admin]}>
              {withSuspense(<UsersPage />)}
            </RoleRoute>
          }
        />
        <Route path="categories" element={withSuspense(<CategoriesPage />)} />
        <Route path="articles" element={withSuspense(<ArticlesPage />)} />
        <Route path="comments" element={withSuspense(<CommentsPage />)} />
        <Route path="services" element={withSuspense(<AdminServicesPage />)} />
        <Route path="applications" element={withSuspense(<ApplicationsPage />)} />
      </Route>

      <Route path="*" element={withSuspense(<NotFoundPage />)} />
    </Routes>
  )
}
