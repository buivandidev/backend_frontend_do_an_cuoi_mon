import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { publicServicesService } from '../../services/public-services.service'

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

export default function ServiceDetailPage() {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await publicServicesService.getById(id)
        if (mounted) {
          setService(data)
        }
      } catch (err) {
        if (mounted) {
          setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải thông tin dịch vụ')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [id])

  const data = useMemo(() => {
    if (!service) {
      return null
    }
    return {
      id: getField(service, 'id', 'Id'),
      ten: getField(service, 'ten', 'Ten'),
      ma: getField(service, 'maDichVu', 'MaDichVu'),
      moTa: getField(service, 'moTa', 'MoTa'),
      giayToCanThiet: getField(service, 'giayToCanThiet', 'GiayToCanThiet'),
      soNgayXuLy: getField(service, 'soNgayXuLy', 'SoNgayXuLy', 0),
      lePhi: getField(service, 'lePhi', 'LePhi'),
      canCuPhapLy: getField(service, 'canCuPhapLy', 'CanCuPhapLy'),
      quyTrinh: getField(service, 'quyTrinh', 'QuyTrinh'),
      tenDanhMuc: getField(service, 'tenDanhMuc', 'TenDanhMuc', 'Dịch vụ công'),
      urlBieuMau: getField(service, 'urlBieuMau', 'UrlBieuMau'),
    }
  }, [service])

  if (loading) {
    return <section className="panel p-6 text-[var(--ink-muted)]">Đang tải chi tiết dịch vụ...</section>
  }

  if (error || !data) {
    return (
      <section className="panel p-6">
        <h1 className="text-2xl font-bold text-[var(--brand-ink)]">Không thể hiển thị dịch vụ</h1>
        <p className="mt-2 text-[var(--danger)]">{error || 'Dịch vụ không tồn tại.'}</p>
      </section>
    )
  }

  return (
    <section className="space-y-5">
      <header className="panel p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-[var(--brand)]/10 px-2 py-1 font-semibold text-[var(--brand)]">{data.tenDanhMuc}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700">{data.ma}</span>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-[var(--brand-ink)] md:text-4xl">{data.ten}</h1>
        <p className="mt-3 text-[var(--ink-muted)]">{data.moTa || 'Chưa có mô tả chi tiết.'}</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <article className="panel space-y-4 p-6">
          <h2 className="text-xl font-bold text-[var(--brand-ink)]">Thông tin thủ tục</h2>
          <p className="text-[var(--ink-muted)]">Giấy tờ cần thiết: {data.giayToCanThiet || 'Liên hệ bộ phận một cửa để được hướng dẫn.'}</p>
          <p className="text-[var(--ink-muted)]">Quy trình: {data.quyTrinh || 'Chưa cập nhật quy trình chi tiết.'}</p>
          <p className="text-[var(--ink-muted)]">Căn cứ pháp lý: {data.canCuPhapLy || 'Chưa cập nhật căn cứ pháp lý.'}</p>
        </article>

        <aside className="panel space-y-4 p-6">
          <h3 className="text-lg font-bold text-[var(--brand-ink)]">Thông số xử lý</h3>
          <p className="text-sm text-[var(--ink-muted)]">Thời gian: {data.soNgayXuLy} ngày làm việc</p>
          <p className="text-sm text-[var(--ink-muted)]">Lệ phí: {toMoney(data.lePhi)}</p>

          {data.urlBieuMau ? (
            <a href={data.urlBieuMau} target="_blank" rel="noreferrer" className="inline-flex w-full justify-center rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-white">
              Tải biểu mẫu
            </a>
          ) : null}

          <Link to={`/dich-vu/nop-ho-so?dichVuId=${data.id}`} className="inline-flex w-full justify-center rounded-lg bg-[var(--brand)] px-3 py-2 text-sm font-semibold text-white">
            Nộp hồ sơ ngay
          </Link>
          <Link to="/dich-vu/tra-cuu" className="inline-flex w-full justify-center rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-white">
            Tra cứu hồ sơ
          </Link>
        </aside>
      </div>
    </section>
  )
}
