import { useEffect, useMemo, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { publicServicesService } from '../../services/public-services.service'
import { toVnDate } from '../../utils/formatters'
import { notify } from '../../utils/notify'

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

const STATUS_OPTIONS = [
  { value: 0, label: 'Chờ xử lý' },
  { value: 1, label: 'Đang xử lý' },
  { value: 2, label: 'Hoàn thành' },
  { value: 3, label: 'Từ chối' },
]

const statusText = Object.fromEntries(STATUS_OPTIONS.map((x) => [x.value, x.label]))

export default function ApplicationsPage() {
  const [services, setServices] = useState([])
  const [filters, setFilters] = useState({ timKiem: '', trangThai: '', dichVuId: '' })
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pagination, setPagination] = useState({ tongSo: 0, tongTrang: 1, trang: 1 })

  const [notes, setNotes] = useState({})
  const [pendingId, setPendingId] = useState('')

  useEffect(() => {
    let mounted = true

    const loadServices = async () => {
      try {
        const data = await publicServicesService.getAll({ trang: 1, kichThuocTrang: 100 })
        if (mounted) {
          setServices(data?.danhSach ?? data?.DanhSach ?? [])
        }
      } catch {
        if (mounted) {
          setServices([])
        }
      }
    }

    loadServices()
    return () => {
      mounted = false
    }
  }, [])

  const loadData = async (nextPage = pagination.trang) => {
    setLoading(true)
    setError('')

    try {
      const data = await adminService.getApplications({
        ...filters,
        trang: nextPage,
        kichThuocTrang: 15,
      })

      setRows(data?.danhSach ?? data?.DanhSach ?? [])
      setPagination({
        tongSo: data?.tongSo ?? data?.TongSo ?? 0,
        tongTrang: data?.tongTrang ?? data?.TongTrang ?? 1,
        trang: data?.trang ?? data?.Trang ?? 1,
      })
    } catch (err) {
      setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải danh sách hồ sơ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.timKiem, filters.trangThai, filters.dichVuId])

  const rowsNormalized = useMemo(() => {
    return rows.map((item) => ({
      id: getField(item, 'id', 'Id'),
      maTheoDoi: getField(item, 'maTheoDoi', 'MaTheoDoi'),
      tenDichVu: getField(item, 'tenDichVu', 'TenDichVu'),
      tenNguoiNop: getField(item, 'tenNguoiNop', 'TenNguoiNop'),
      dienThoai: getField(item, 'dienThoaiNguoiNop', 'DienThoaiNguoiNop'),
      ngayNop: getField(item, 'ngayNop', 'NgayNop'),
      trangThai: getField(item, 'trangThai', 'TrangThai', 0),
      ghiChuNguoiXuLy: getField(item, 'ghiChuNguoiXuLy', 'GhiChuNguoiXuLy', ''),
    }))
  }, [rows])

  const updateStatus = async (id, nextStatus) => {
    setPendingId(id)
    setError('')
    try {
      await adminService.updateApplicationStatus(id, {
        trangThai: Number(nextStatus),
        ghiChuNguoiXuLy: notes[id] ?? '',
      })
      await loadData(pagination.trang)
      notify.success('Cập nhật trạng thái hồ sơ thành công.')
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Cập nhật trạng thái thất bại'
      setError(message)
      notify.error(message)
    } finally {
      setPendingId('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--brand-ink)]">Quản lý hồ sơ</h1>
        <p className="mt-2 text-[var(--ink-muted)]">Theo dõi đơn ứng và cập nhật trạng thái xử lý theo từng hồ sơ.</p>
      </div>

      <div className="grid gap-3 rounded-xl border border-[var(--line)] bg-white p-4 md:grid-cols-[1fr_220px_220px_auto] md:items-end">
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Tìm kiếm</span>
          <input
            value={filters.timKiem}
            onChange={(event) => setFilters((prev) => ({ ...prev, timKiem: event.target.value }))}
            placeholder="Mã hồ sơ, tên hoặc số điện thoại"
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Trạng thái</span>
          <select
            value={filters.trangThai}
            onChange={(event) => setFilters((prev) => ({ ...prev, trangThai: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          >
            <option value="">Tất cả</option>
            {STATUS_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Dịch vụ</span>
          <select
            value={filters.dichVuId}
            onChange={(event) => setFilters((prev) => ({ ...prev, dichVuId: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          >
            <option value="">Tất cả</option>
            {services.map((item) => (
              <option key={getField(item, 'id', 'Id')} value={getField(item, 'id', 'Id')}>
                {getField(item, 'ten', 'Ten')}
              </option>
            ))}
          </select>
        </label>

        <button onClick={() => loadData(1)} className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white">
          Tải lại
        </button>
      </div>

      {loading ? <div className="rounded-xl border border-[var(--line)] bg-white p-4 text-[var(--ink-muted)]">Đang tải dữ liệu...</div> : null}
      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{error}</div> : null}

      {!loading && !error ? (
        <div className="space-y-3">
          {rowsNormalized.map((item) => (
            <article key={item.id} className="rounded-xl border border-[var(--line)] bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="mono text-xs uppercase tracking-wide text-[var(--ink-muted)]">{item.maTheoDoi}</p>
                  <h3 className="mt-1 text-lg font-bold text-[var(--brand-ink)]">{item.tenDichVu}</h3>
                  <p className="mt-1 text-sm text-[var(--ink-muted)]">
                    {item.tenNguoiNop} • {item.dienThoai} • {toVnDate(item.ngayNop)}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {statusText[item.trangThai] ?? `Mã ${item.trangThai}`}
                </span>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[200px_1fr_auto] md:items-end">
                <label>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Cập nhật trạng thái</span>
                  <select
                    defaultValue={item.trangThai}
                    onChange={(event) => updateStatus(item.id, event.target.value)}
                    disabled={pendingId === item.id}
                    className="w-full rounded-lg border border-[var(--line)] px-3 py-2 disabled:opacity-60"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Ghi chú xử lý</span>
                  <input
                    value={notes[item.id] ?? item.ghiChuNguoiXuLy}
                    onChange={(event) =>
                      setNotes((prev) => ({
                        ...prev,
                        [item.id]: event.target.value,
                      }))
                    }
                    placeholder="Nhập ghi chú cho lần cập nhật tiếp theo"
                    className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                  />
                </label>

                <button
                  onClick={() => updateStatus(item.id, item.trangThai)}
                  disabled={pendingId === item.id}
                  className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-[var(--bg)] disabled:opacity-60"
                >
                  {pendingId === item.id ? 'Đang lưu...' : 'Lưu ghi chú'}
                </button>
              </div>
            </article>
          ))}

          {rowsNormalized.length === 0 ? <div className="rounded-xl border border-[var(--line)] bg-white p-4 text-sm text-[var(--ink-muted)]">Không có hồ sơ phù hợp.</div> : null}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--ink-muted)]">Tổng {pagination.tongSo} hồ sơ</p>
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm disabled:opacity-50"
            disabled={pagination.trang <= 1}
            onClick={() => loadData(Math.max(1, pagination.trang - 1))}
          >
            Trước
          </button>
          <button
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm disabled:opacity-50"
            disabled={pagination.trang >= pagination.tongTrang}
            onClick={() => loadData(Math.min(pagination.tongTrang, pagination.trang + 1))}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  )
}
