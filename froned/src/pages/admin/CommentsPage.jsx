import { useEffect, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { toVnDate } from '../../utils/formatters'
import { notify } from '../../utils/notify'

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

export default function CommentsPage() {
  const [filter, setFilter] = useState('')
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState({ tongSo: 0, tongTrang: 1, trang: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingId, setPendingId] = useState('')

  const loadData = async (nextPage = pagination.trang) => {
    setLoading(true)
    setError('')
    try {
      const data = await adminService.getComments({ daDuyet: filter, trang: nextPage, kichThuocTrang: 15 })
      setRows(data?.danhSach ?? data?.DanhSach ?? [])
      setPagination({
        tongSo: data?.tongSo ?? data?.TongSo ?? 0,
        tongTrang: data?.tongTrang ?? data?.TongTrang ?? 1,
        trang: data?.trang ?? data?.Trang ?? 1,
      })
    } catch (err) {
      setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải danh sách bình luận')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const approve = async (id) => {
    setPendingId(id)
    setError('')
    try {
      await adminService.approveComment(id)
      await loadData(pagination.trang)
      notify.success('Duyệt bình luận thành công.')
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Duyệt bình luận thất bại'
      setError(message)
      notify.error(message)
    } finally {
      setPendingId('')
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa bình luận này?')) {
      return
    }
    setPendingId(id)
    setError('')
    try {
      await adminService.deleteComment(id)
      await loadData(pagination.trang)
      notify.success('Xóa bình luận thành công.')
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Xóa bình luận thất bại'
      setError(message)
      notify.error(message)
    } finally {
      setPendingId('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--brand-ink)]">Quản lý bình luận</h1>
          <p className="mt-2 text-[var(--ink-muted)]">Kiểm duyệt bình luận từ người dùng và xử lý nội dung không phù hợp.</p>
        </div>

        <label className="min-w-[220px]">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Trạng thái duyệt</span>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          >
            <option value="">Tất cả</option>
            <option value="false">Chưa duyệt</option>
            <option value="true">Đã duyệt</option>
          </select>
        </label>
      </div>

      {loading ? <div className="rounded-xl border border-[var(--line)] bg-white p-4 text-[var(--ink-muted)]">Đang tải bình luận...</div> : null}
      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{error}</div> : null}

      {!loading && !error ? (
        <div className="space-y-3">
          {rows.map((item) => {
            const id = getField(item, 'id', 'Id')
            const approved = Boolean(getField(item, 'daDuyet', 'DaDuyet', false))
            const busy = pendingId === id

            return (
              <article key={id} className="rounded-xl border border-[var(--line)] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--brand-ink)]">{getField(item, 'tenTacGia', 'TenTacGia', 'Khách')}</p>
                    <p className="text-xs text-[var(--ink-muted)]">
                      Bài viết: {getField(item, 'tenBaiViet', 'TenBaiViet', '-')}
                    </p>
                    <p className="text-xs text-[var(--ink-muted)]">{toVnDate(getField(item, 'ngayTao', 'NgayTao'))}</p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {approved ? 'Đã duyệt' : 'Chưa duyệt'}
                  </span>
                </div>

                <p className="mt-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3 text-sm leading-6 text-[var(--ink-muted)]">
                  {getField(item, 'noiDung', 'NoiDung')}
                </p>

                <div className="mt-3 flex gap-2">
                  {!approved ? (
                    <button
                      onClick={() => approve(id)}
                      disabled={busy}
                      className="rounded border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 disabled:opacity-60"
                    >
                      Duyệt
                    </button>
                  ) : null}

                  <button
                    onClick={() => remove(id)}
                    disabled={busy}
                    className="rounded border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60"
                  >
                    Xóa
                  </button>
                </div>
              </article>
            )
          })}

          {rows.length === 0 ? <div className="rounded-xl border border-[var(--line)] bg-white p-4 text-sm text-[var(--ink-muted)]">Không có bình luận phù hợp.</div> : null}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--ink-muted)]">Tổng {pagination.tongSo} bình luận</p>
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
