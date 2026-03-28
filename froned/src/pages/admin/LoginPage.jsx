import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { useAuthStore } from '../../store/auth.store'
import { notify } from '../../utils/notify'

export default function LoginPage() {
  const navigate = useNavigate()
  const loginSuccess = useAuthStore((state) => state.loginSuccess)

  const [form, setForm] = useState({ email: '', password: '' })
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      const payload = await authService.login(form)
      loginSuccess(payload)
      notify.success('Đăng nhập thành công. Chào mừng bạn quay lại.')
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Đăng nhập thất bại'
      setError(message)
      notify.error(message)
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="mx-auto max-w-xl panel p-6 md:p-8">
      <h1 className="text-2xl font-bold text-[var(--brand-ink)]">Đăng nhập quản trị</h1>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">Dùng tài khoản Admin/Editor/Viewer để truy cập khu vực quản trị.</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Email</span>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Mật khẩu</span>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          />
        </label>

        {error ? <p className="text-sm font-medium text-[var(--danger)]">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white disabled:opacity-60"
          disabled={pending}
        >
          {pending ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </section>
  )
}
