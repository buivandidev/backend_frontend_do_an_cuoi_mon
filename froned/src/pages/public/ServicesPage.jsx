import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categoriesService } from '../../services/categories.service'
import { publicServicesService } from '../../services/public-services.service'

const PAGE_SIZE = 12

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

const toMoney = (value) => {
  if (value == null || value === '') {
    return 'Liên hệ'
  }
  try {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value)
  } catch {
    return `${value} VND`
  }
}

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [pagination, setPagination] = useState({ tongSo: 0, tongTrang: 1, trang: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const keyword = searchParams.get('q') ?? ''
  const categoryId = searchParams.get('categoryId') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

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

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError('')

    const loadServices = async () => {
      try {
        const data = await publicServicesService.getAll({
          timKiem: keyword,
          danhMucId: categoryId,
          trang: page,
          kichThuocTrang: PAGE_SIZE,
        })

        if (!mounted) {
          return
        }

        setServices(data?.danhSach ?? data?.DanhSach ?? [])
        setPagination({
          tongSo: data?.tongSo ?? data?.TongSo ?? 0,
          tongTrang: data?.tongTrang ?? data?.TongTrang ?? 1,
          trang: data?.trang ?? data?.Trang ?? 1,
        })
      } catch (err) {
        if (!mounted) {
          return
        }
        setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải danh sách dịch vụ')
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
  }, [keyword, categoryId, page])

  const categoryOptions = useMemo(() => {
    return categories.map((item) => ({
      id: getField(item, 'id', 'Id'),
      ten: getField(item, 'ten', 'Ten'),
    }))
  }, [categories])

  const onFilterSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const next = new URLSearchParams(searchParams)

    const nextKeyword = (formData.get('q') ?? '').toString().trim()
    const nextCategory = (formData.get('categoryId') ?? '').toString().trim()

    if (nextKeyword) next.set('q', nextKeyword)
    else next.delete('q')

    if (nextCategory) next.set('categoryId', nextCategory)
    else next.delete('categoryId')

    next.set('page', '1')
    setSearchParams(next)
  }

  const setPage = (nextPage) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(nextPage))
    setSearchParams(next)
  }

  return (
    <section className="space-y-5">
      <header className="panel p-6 md:p-8">
        <p className="mono text-xs uppercase tracking-[0.18em] text-[var(--sun)]">Dịch vụ công trực tuyến</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[var(--brand-ink)] md:text-4xl">Dịch vụ hành chính</h1>
        <p className="mt-3 max-w-3xl text-[var(--ink-muted)]">
          Tra cứu thủ tục, tải biểu mẫu và nộp hồ sơ trực tuyến ngay trên cổng thông tin phường xã.
        </p>
      </header>

      <form className="panel grid gap-3 p-4 md:grid-cols-[1fr_240px_auto] md:items-end" onSubmit={onFilterSubmit}>
        <label>
          <span className="mb-1 block text-sm font-semibold text-[var(--ink-muted)]">Tìm theo tên hoặc mã dịch vụ</span>
          <input
            name="q"
            defaultValue={keyword}
            placeholder="Ví dụ: chứng thực, hộ khẩu..."
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
          />
        </label>

        <label>
          <span className="mb-1 block text-sm font-semibold text-[var(--ink-muted)]">Danh mục dịch vụ</span>
          <select
            name="categoryId"
            defaultValue={categoryId}
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
          >
            <option value="">Tất cả</option>
            {categoryOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.ten}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white">
          Lọc dịch vụ
        </button>
      </form>

      <div className="grid gap-3 md:grid-cols-2">
        <Link to="/dich-vu/nop-ho-so" className="panel p-4 hover:border-[var(--brand)]">
          <h2 className="text-lg font-bold text-[var(--brand-ink)]">Nộp hồ sơ trực tuyến</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">Điền thông tin người nộp, chọn dịch vụ và nhận mã theo dõi ngay.</p>
        </Link>
        <Link to="/dich-vu/tra-cuu" className="panel p-4 hover:border-[var(--brand)]">
          <h2 className="text-lg font-bold text-[var(--brand-ink)]">Tra cứu trạng thái hồ sơ</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">Nhập mã theo dõi và email đã đăng ký để xem trạng thái xử lý.</p>
        </Link>
      </div>

      {loading ? <div className="panel p-6 text-[var(--ink-muted)]">Đang tải dịch vụ...</div> : null}
      {error ? <div className="panel p-6 text-[var(--danger)]">{error}</div> : null}

      {!loading && !error ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item) => {
              const id = getField(item, 'id', 'Id')
              const ten = getField(item, 'ten', 'Ten')
              const ma = getField(item, 'maDichVu', 'MaDichVu')
              const moTa = getField(item, 'moTa', 'MoTa')
              const tenDanhMuc = getField(item, 'tenDanhMuc', 'TenDanhMuc', 'Dịch vụ công')
              const soNgayXuLy = getField(item, 'soNgayXuLy', 'SoNgayXuLy', 0)
              const lePhi = getField(item, 'lePhi', 'LePhi')

              return (
                <article key={id} className="panel p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-[var(--brand)]/10 px-2 py-1 font-semibold text-[var(--brand)]">{tenDanhMuc}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700">{ma}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-[var(--brand-ink)]">{ten}</h2>
                  <p className="mt-2 min-h-[3rem] text-sm text-[var(--ink-muted)]">{moTa || 'Chưa có mô tả chi tiết.'}</p>
                  <p className="mt-3 text-sm text-[var(--ink-muted)]">Thời gian xử lý: {soNgayXuLy} ngày</p>
                  <p className="text-sm text-[var(--ink-muted)]">Lệ phí: {toMoney(lePhi)}</p>

                  <div className="mt-4 flex gap-2">
                    <Link to={`/dich-vu/${id}`} className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-white">
                      Xem chi tiết
                    </Link>
                    <Link to={`/dich-vu/nop-ho-so?dichVuId=${id}`} className="rounded-lg bg-[var(--brand)] px-3 py-2 text-sm font-semibold text-white">
                      Nộp hồ sơ
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {services.length === 0 ? <div className="panel p-6 text-[var(--ink-muted)]">Không có dịch vụ phù hợp với bộ lọc hiện tại.</div> : null}

          <div className="panel flex items-center justify-between gap-3 p-4">
            <p className="text-sm text-[var(--ink-muted)]">
              Trang {pagination.trang} / {pagination.tongTrang} • Tổng {pagination.tongSo} dịch vụ
            </p>

            <div className="flex gap-2">
              <button
                className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold disabled:opacity-50"
                disabled={pagination.trang <= 1}
                onClick={() => setPage(Math.max(1, pagination.trang - 1))}
              >
                Trước
              </button>
              <button
                className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold disabled:opacity-50"
                disabled={pagination.trang >= pagination.tongTrang}
                onClick={() => setPage(Math.min(pagination.tongTrang, pagination.trang + 1))}
              >
                Sau
              </button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  )
}

