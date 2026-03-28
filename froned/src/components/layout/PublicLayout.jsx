import { Link, NavLink, Outlet } from 'react-router-dom'
import { env } from '../../config/environment'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  { to: '/tin-tuc', label: 'Tin tức' },
  { to: '/dich-vu', label: 'Dịch vụ' },
  { to: '/thu-vien', label: 'Thư viện' },
  { to: '/lien-he', label: 'Liên hệ' },
]

export function PublicLayout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg-soft)]/95 backdrop-blur">
        <div className="container-page flex items-center justify-between gap-6 py-4">
          <Link to="/" className="text-lg font-extrabold tracking-tight text-[var(--brand-ink)]">
            {env.appName}
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--ink-muted)]">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 transition ${
                    isActive ? 'bg-[var(--brand)] text-white' : 'hover:bg-white hover:text-[var(--brand-ink)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-12 md:py-20">
        <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <h3 className="text-xl font-extrabold text-[var(--brand-ink)]">{env.appName}</h3>
            <p className="mt-4 max-w-sm text-[var(--ink-muted)]">
              Nền tảng thông tin và dịch vụ công trực tuyến dân sinh. 
              Kết nối người dân với chính quyền điện tử một cách nhanh chóng và minh bạch.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[var(--ink)]">Liên kết nhanh</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--ink-muted)]">
              {navItems.map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-[var(--brand)]">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[var(--ink)]">Liên hệ</h4>
            <ul className="mt-4 space-y-2 text-sm text-[var(--ink-muted)]">
              <li>Địa chỉ: 123 Đường Chính, Phường X, Quận Y</li>
              <li>Điện thoại: (028) 1234 5678</li>
              <li>Email: lienhe@phuongxa.gov.vn</li>
            </ul>
          </div>
        </div>
        <div className="container-page mt-12 border-t border-[var(--line)] pt-8 text-center text-xs text-[var(--ink-muted)]">
          &copy; {new Date().getFullYear()} UBND Phường Xã. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  )
}
