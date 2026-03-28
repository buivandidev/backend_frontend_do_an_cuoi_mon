import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

const menu = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Người dùng' },
  { to: '/admin/categories', label: 'Danh mục' },
  { to: '/admin/articles', label: 'Bài viết' },
  { to: '/admin/comments', label: 'Bình luận' },
  { to: '/admin/services', label: 'Dịch vụ' },
  { to: '/admin/applications', label: 'Hồ sơ' },
]

export function AdminLayout() {
  const user = useAuthStore((state) => state.user)
  const roles = useAuthStore((state) => state.roles)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="container-page grid gap-5 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="panel p-4">
          <div className="mb-5 border-b border-[var(--line)] pb-3">
            <Link to="/" className="text-sm font-bold text-[var(--brand)]">
              Về trang công khai
            </Link>
            <h2 className="mt-2 text-xl font-extrabold text-[var(--brand-ink)]">Quản trị hệ thống</h2>
            <p className="text-sm text-[var(--ink-muted)]">{user?.hoTen ?? user?.HoTen ?? 'Tài khoản quản trị'}</p>
            <p className="mono text-xs text-[var(--ink-muted)]">{roles.join(', ') || 'Không có vai trò'}</p>
          </div>

          <nav className="space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-[var(--brand)] text-white' : 'text-[var(--ink-muted)] hover:bg-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="panel p-6">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
