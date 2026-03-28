import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl panel p-8 text-center">
      <p className="mono text-xs uppercase tracking-[0.2em] text-[var(--sun)]">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-[var(--brand-ink)]">Không tìm thấy trang</h1>
      <p className="mt-3 text-[var(--ink-muted)]">Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.</p>
      <Link to="/" className="mt-5 inline-flex rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white">
        Quay về Trang chủ
      </Link>
    </section>
  )
}
