import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { publicServicesService } from '../../services/public-services.service'
import { toVnDate } from '../../utils/formatters'

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

const statusText = {
  0: 'Chờ xử lý',
  1: 'Đang xử lý',
  2: 'Hoàn thành',
  3: 'Từ chối',
}

const statusClass = {
  0: 'bg-amber-100 text-amber-700',
  1: 'bg-sky-100 text-sky-700',
  2: 'bg-emerald-100 text-emerald-700',
  3: 'bg-rose-100 text-rose-700',
}

export default function ServiceTrackingPage() {
  const [searchParams] = useSearchParams()

  const [form, setForm] = useState({
    maTheoDoi: searchParams.get('maTheoDoi') ?? '',
    emailNguoiNop: searchParams.get('email') ?? '',
  })

  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const status = useMemo(() => {
    const value = getField(result, 'trangThai', 'TrangThai', null)
    if (value == null) {
      return null
    }
    return {
      label: statusText[value] ?? getField(result, 'nhanTrangThai', 'NhanTrangThai', 'Đang cập nhật'),
      className: statusClass[value] ?? 'bg-slate-100 text-slate-700',
    }
  }, [result])

  const onSubmit = async (event) => {
    event.preventDefault()
    setPending(true)
    setError('')
    setResult(null)
    try {
      const data = await publicServicesService.trackApplication(form.maTheoDoi.trim(), form.emailNguoiNop.trim())
      setResult(data)
    } catch (err) {
      setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tra cứu hồ sơ')
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="space-y-5">
      <header className="panel p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-[var(--brand-ink)] md:text-4xl">Tra cứu trạng thái hồ sơ</h1>
        <p className="mt-2 text-[var(--ink-muted)]">Nhập mã theo dõi và email đã đăng ký để xem tình trạng xử lý hồ sơ.</p>
      </header>

      <form className="panel grid gap-3 p-6 md:grid-cols-[1fr_1fr_auto] md:items-end" onSubmit={onSubmit}>
        <label>
          <span className="mb-1 block text-sm font-semibold">Mã theo dõi</span>
          <input
            required
            value={form.maTheoDoi}
            onChange={(event) => setForm((prev) => ({ ...prev, maTheoDoi: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            placeholder="Ví dụ: HS20260323AB12CD34"
          />
        </label>

        <label>
          <span className="mb-1 block text-sm font-semibold">Email người nộp</span>
          <input
            required
            type="email"
            value={form.emailNguoiNop}
            onChange={(event) => setForm((prev) => ({ ...prev, emailNguoiNop: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
            placeholder="email@domain.com"
          />
        </label>

        <button type="submit" disabled={pending} className="rounded-lg bg-[var(--brand)] px-5 py-2 font-semibold text-white disabled:opacity-60">
          {pending ? 'Đang tra cứu...' : 'Tra cứu'}
        </button>
      </form>

      {error ? <div className="panel p-6 text-[var(--danger)]">{error}</div> : null}

      {result ? (
        <section className="panel space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-[var(--brand-ink)]">Kết quả tra cứu hồ sơ</h2>
            {status ? <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span> : null}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <p className="text-sm text-[var(--ink-muted)]">Mã theo dõi: <span className="mono font-semibold text-[var(--ink)]">{getField(result, 'maTheoDoi', 'MaTheoDoi')}</span></p>
            <p className="text-sm text-[var(--ink-muted)]">Dịch vụ: <span className="font-semibold text-[var(--ink)]">{getField(result, 'tenDichVu', 'TenDichVu')}</span></p>
            <p className="text-sm text-[var(--ink-muted)]">Người nộp: <span className="font-semibold text-[var(--ink)]">{getField(result, 'tenNguoiNop', 'TenNguoiNop')}</span></p>
            <p className="text-sm text-[var(--ink-muted)]">Điện thoại: <span className="font-semibold text-[var(--ink)]">{getField(result, 'dienThoaiNguoiNop', 'DienThoaiNguoiNop')}</span></p>
            <p className="text-sm text-[var(--ink-muted)]">Ngày nộp: <span className="font-semibold text-[var(--ink)]">{toVnDate(getField(result, 'ngayNop', 'NgayNop'))}</span></p>
            <p className="text-sm text-[var(--ink-muted)]">Ngày xử lý: <span className="font-semibold text-[var(--ink)]">{toVnDate(getField(result, 'ngayXuLy', 'NgayXuLy'))}</span></p>
          </div>

          <div className="rounded-lg border border-[var(--line)] bg-white p-4">
            <h3 className="text-sm font-bold text-[var(--brand-ink)]">Ghi chú từ cán bộ xử lý</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{getField(result, 'ghiChuNguoiXuLy', 'GhiChuNguoiXuLy', 'Chưa có ghi chú xử lý.')}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--brand-ink)]">Tệp hồ sơ đính kèm</h3>
            <ul className="mt-2 space-y-2">
              {(getField(result, 'danhSachTep', 'DanhSachTep', []) || []).map((file) => {
                const id = getField(file, 'id', 'Id')
                const name = getField(file, 'tenTep', 'TenTep')
                const url = getField(file, 'urlTep', 'UrlTep')
                const size = getField(file, 'kichThuocTep', 'KichThuocTep', 0)

                return (
                  <li key={id} className="flex items-center justify-between rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm">
                    <span>{name} ({Math.round(size / 1024)} KB)</span>
                    {url ? <a href={url} target="_blank" rel="noreferrer" className="font-semibold text-[var(--brand)]">Mở tệp</a> : null}
                  </li>
                )
              })}
              {(getField(result, 'danhSachTep', 'DanhSachTep', []) || []).length === 0 ? (
                <li className="text-sm text-[var(--ink-muted)]">Không có tệp đính kèm.</li>
              ) : null}
            </ul>
          </div>
        </section>
      ) : null}
    </section>
  )
}

