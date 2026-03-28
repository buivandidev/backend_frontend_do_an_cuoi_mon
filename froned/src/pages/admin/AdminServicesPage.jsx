import { useEffect, useState } from 'react'
import { categoriesService } from '../../services/categories.service'
import { adminService } from '../../services/admin.service'

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

export default function AdminServicesPage() {
  const [filters, setFilters] = useState({ timKiem: '', danhMucId: '', dangHoatDong: '' })
  const [categories, setCategories] = useState([])
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState({ tongSo: 0, tongTrang: 1, trang: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getServiceCategories()
        if (mounted) {
          setCategories(Array.isArray(data) ? data : [])
        }
      } catch {
        if (mounted) {
          setCategories([])
        }
      }
    }

    loadCategories()
    return () => {
      mounted = false
    }
  }, [])

  const loadData = async (nextPage = pagination.trang) => {
    setLoading(true)
    setError('')
    try {
      const data = await adminService.getServices({ ...filters, trang: nextPage, kichThuocTrang: 15 })
      setRows(data?.danhSach ?? data?.DanhSach ?? [])
      setPagination({
        tongSo: data?.tongSo ?? data?.TongSo ?? 0,
        tongTrang: data?.tongTrang ?? data?.TongTrang ?? 1,
        trang: data?.trang ?? data?.Trang ?? 1,
      })
    } catch (err) {
      setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải danh sách dịch vụ quản trị')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.timKiem, filters.danhMucId, filters.dangHoatDong])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--brand-ink)]">Quản lý dịch vụ hành chính</h1>
        <p className="mt-2 text-[var(--ink-muted)]">Lọc nhanh danh sách dịch vụ để theo dõi trạng thái hoạt động và thuộc tính chính.</p>
      </div>

      <div className="grid gap-3 rounded-xl border border-[var(--line)] bg-white p-4 md:grid-cols-[1fr_220px_180px_auto] md:items-end">
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Tìm kiếm</span>
          <input
            value={filters.timKiem}
            onChange={(event) => setFilters((prev) => ({ ...prev, timKiem: event.target.value }))}
            placeholder="Tên hoặc mã dịch vụ"
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          />
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Danh mục</span>
          <select
            value={filters.danhMucId}
            onChange={(event) => setFilters((prev) => ({ ...prev, danhMucId: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          >
            <option value="">Tất cả</option>
            {categories.map((item) => (
              <option key={getField(item, 'id', 'Id')} value={getField(item, 'id', 'Id')}>
                {getField(item, 'ten', 'Ten')}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Trạng thái</span>
          <select
            value={filters.dangHoatDong}
            onChange={(event) => setFilters((prev) => ({ ...prev, dangHoatDong: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          >
            <option value="">Tất cả</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Ngưng hoạt động</option>
          </select>
        </label>

        <button
          onClick={() => loadData(1)}
          className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white"
        >
          Tải lại
        </button>
      </div>

      {loading ? <div className="rounded-xl border border-[var(--line)] bg-white p-4 text-[var(--ink-muted)]">Đang tải dữ liệu...</div> : null}
      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{error}</div> : null}

      {!loading && !error ? (
        <div className="overflow-auto rounded-xl border border-[var(--line)] bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--bg)] text-left text-xs uppercase tracking-wide text-[var(--ink-muted)]">
              <tr>
                <th className="px-4 py-3">Mã</th>
                <th className="px-4 py-3">Tên dịch vụ</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Ngày xử lý</th>
                <th className="px-4 py-3">Lệ phí</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const id = getField(item, 'id', 'Id')
                const active = Boolean(getField(item, 'dangHoatDong', 'DangHoatDong', false))
                return (
                  <tr key={id} className="border-t border-[var(--line)]">
                    <td className="px-4 py-3 font-semibold">{getField(item, 'maDichVu', 'MaDichVu')}</td>
                    <td className="px-4 py-3">{getField(item, 'ten', 'Ten')}</td>
                    <td className="px-4 py-3">{getField(item, 'tenDanhMuc', 'TenDanhMuc', '-')}</td>
                    <td className="px-4 py-3">{getField(item, 'soNgayXuLy', 'SoNgayXuLy', 0)} ngày</td>
                    <td className="px-4 py-3">{getField(item, 'lePhi', 'LePhi', '-') || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                        {active ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {rows.length === 0 ? <div className="p-4 text-sm text-[var(--ink-muted)]">Không có dịch vụ phù hợp.</div> : null}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--ink-muted)]">
          Tổng {pagination.tongSo} dịch vụ
        </p>
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

