import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { publicServicesService } from '../../services/public-services.service'
import { notify } from '../../utils/notify'

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

export default function ServiceSubmitPage() {
  const [searchParams] = useSearchParams()
  const preselectedServiceId = searchParams.get('dichVuId') ?? ''

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const [form, setForm] = useState({
    dichVuId: preselectedServiceId,
    tenNguoiNop: '',
    emailNguoiNop: '',
    dienThoaiNguoiNop: '',
    diaChiNguoiNop: '',
    ghiChu: '',
  })

  useEffect(() => {
    let mounted = true
    const loadServices = async () => {
      setLoading(true)
      try {
        const data = await publicServicesService.getAll({ trang: 1, kichThuocTrang: 100 })
        if (mounted) {
          setServices(data?.danhSach ?? data?.DanhSach ?? [])
        }
      } catch {
        if (mounted) {
          setServices([])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadServices()
    return () => {
      mounted = false
    }
  }, [])

  const options = useMemo(() => {
    return services.map((item) => ({
      id: getField(item, 'id', 'Id'),
      label: `${getField(item, 'ten', 'Ten')} (${getField(item, 'maDichVu', 'MaDichVu')})`,
    }))
  }, [services])

  const onSubmit = async (event) => {
    event.preventDefault()
    setPending(true)
    setError('')
    setResult(null)

    try {
      const data = await publicServicesService.submitApplication({
        dichVuId: form.dichVuId,
        tenNguoiNop: form.tenNguoiNop,
        emailNguoiNop: form.emailNguoiNop,
        dienThoaiNguoiNop: form.dienThoaiNguoiNop,
        diaChiNguoiNop: form.diaChiNguoiNop || undefined,
        ghiChu: form.ghiChu || undefined,
      })

      const maTheoDoi = getField(data, 'maTheoDoi', 'MaTheoDoi')
      setResult({ maTheoDoi })
      setForm((prev) => ({ ...prev, ghiChu: '' }))
      notify.success(`Nop ho so thanh cong. Ma theo doi: ${maTheoDoi}`)
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Nộp hồ sơ thất bại'
      setError(message)
      notify.error(message)
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="space-y-5">
      <header className="panel p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-[var(--brand-ink)] md:text-4xl">Nộp hồ sơ trực tuyến</h1>
        <p className="mt-2 text-[var(--ink-muted)]">Điền đầy đủ thông tin để gửi hồ sơ. Hệ thống sẽ trả mã theo dõi để tra cứu tiến độ xử lý.</p>
      </header>

      <form className="panel space-y-4 p-6" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Dịch vụ</span>
          <select
            required
            value={form.dichVuId}
            onChange={(event) => setForm((prev) => ({ ...prev, dichVuId: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            disabled={loading}
          >
            <option value="">Chọn dịch vụ</option>
            {options.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Họ và tên</span>
            <input
              required
              value={form.tenNguoiNop}
              onChange={(event) => setForm((prev) => ({ ...prev, tenNguoiNop: event.target.value }))}
              className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Email</span>
            <input
              required
              type="email"
              value={form.emailNguoiNop}
              onChange={(event) => setForm((prev) => ({ ...prev, emailNguoiNop: event.target.value }))}
              className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Số điện thoại</span>
            <input
              required
              value={form.dienThoaiNguoiNop}
              onChange={(event) => setForm((prev) => ({ ...prev, dienThoaiNguoiNop: event.target.value }))}
              className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Địa chỉ</span>
            <input
              value={form.diaChiNguoiNop}
              onChange={(event) => setForm((prev) => ({ ...prev, diaChiNguoiNop: event.target.value }))}
              className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Ghi chú</span>
          <textarea
            rows={4}
            value={form.ghiChu}
            onChange={(event) => setForm((prev) => ({ ...prev, ghiChu: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
          />
        </label>

        {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}

        <button type="submit" disabled={pending || loading} className="rounded-lg bg-[var(--brand)] px-5 py-2 font-semibold text-white disabled:opacity-60">
          {pending ? 'Đang gửi hồ sơ...' : 'Gửi hồ sơ'}
        </button>
      </form>

      {result?.maTheoDoi ? (
        <section className="panel space-y-2 p-6">
          <h2 className="text-xl font-bold text-[var(--brand-ink)]">Nộp hồ sơ thành công</h2>
          <p className="text-[var(--ink-muted)]">Mã theo dõi của bạn: <span className="mono font-semibold">{result.maTheoDoi}</span></p>
          <Link to={`/dich-vu/tra-cuu?maTheoDoi=${encodeURIComponent(result.maTheoDoi)}&email=${encodeURIComponent(form.emailNguoiNop)}`} className="inline-flex rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-white">
            Tra cứu hồ sơ ngay
          </Link>
        </section>
      ) : null}
    </section>
  )
}

