import { useEffect, useMemo, useState } from 'react'
import { adminService } from '../../services/admin.service'
import { categoriesService } from '../../services/categories.service'
import { toVnDate } from '../../utils/formatters'
import { useAuthStore } from '../../store/auth.store'
import { notify } from '../../utils/notify'

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

const ARTICLE_STATUS = [
  { value: 0, label: 'Bản nháp' },
  { value: 1, label: 'Chờ duyệt' },
  { value: 2, label: 'Đã xuất bản' },
  { value: 3, label: 'Lưu trữ' },
]

export default function ArticlesPage() {
  const roles = useAuthStore((state) => state.roles)
  const isAdmin = roles.includes('Admin')

  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ timKiem: '', danhMucId: '', trangThai: '' })
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState({ tongSo: 0, tongTrang: 1, trang: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [pendingId, setPendingId] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState('')
  const [formPending, setFormPending] = useState(false)
  const [formError, setFormError] = useState('')
  const [form, setForm] = useState({
    tieuDe: '',
    tomTat: '',
    noiDung: '',
    anhDaiDien: '',
    danhMucId: '',
    noiBat: false,
    tieuDeMeta: '',
    moTaMeta: '',
    theTag: '',
    trangThai: 0,
  })

  useEffect(() => {
    let mounted = true
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getNewsCategories()
        if (mounted) {
          setCategories(Array.isArray(data) ? data : [])
          if (!form.danhMucId && Array.isArray(data) && data[0]) {
            setForm((prev) => ({ ...prev, danhMucId: getField(data[0], 'id', 'Id') }))
          }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async (nextPage = pagination.trang) => {
    setLoading(true)
    setError('')
    try {
      const data = await adminService.getArticles({ ...filters, trang: nextPage, kichThuocTrang: 15 })
      setRows(data?.danhSach ?? data?.DanhSach ?? [])
      setPagination({
        tongSo: data?.tongSo ?? data?.TongSo ?? 0,
        tongTrang: data?.tongTrang ?? data?.TongTrang ?? 1,
        trang: data?.trang ?? data?.Trang ?? 1,
      })
    } catch (err) {
      setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải danh sách bài viết')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.timKiem, filters.danhMucId, filters.trangThai])

  const resetForm = () => {
    setForm((prev) => ({
      ...prev,
      tieuDe: '',
      tomTat: '',
      noiDung: '',
      anhDaiDien: '',
      noiBat: false,
      tieuDeMeta: '',
      moTaMeta: '',
      theTag: '',
      trangThai: 0,
    }))
    setEditingId('')
    setFormError('')
  }

  const openCreateForm = () => {
    resetForm()
    setShowForm(true)
  }

  const openEditForm = async (id) => {
    setFormPending(true)
    setFormError('')
    try {
      const detail = await adminService.getArticleDetail(id)
      setEditingId(id)
      setForm({
        tieuDe: getField(detail, 'tieuDe', 'TieuDe'),
        tomTat: getField(detail, 'tomTat', 'TomTat'),
        noiDung: getField(detail, 'noiDung', 'NoiDung'),
        anhDaiDien: getField(detail, 'anhDaiDien', 'AnhDaiDien'),
        danhMucId: getField(detail, 'danhMucId', 'DanhMucId'),
        noiBat: Boolean(getField(detail, 'noiBat', 'NoiBat', false)),
        tieuDeMeta: getField(detail, 'tieuDeMeta', 'TieuDeMeta'),
        moTaMeta: getField(detail, 'moTaMeta', 'MoTaMeta'),
        theTag: getField(detail, 'theTag', 'TheTag'),
        trangThai: Number(getField(detail, 'trangThai', 'TrangThai', 0)),
      })
      setShowForm(true)
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải chi tiết bài viết'
      setError(message)
      notify.error(message)
    } finally {
      setFormPending(false)
    }
  }

  const onSubmitForm = async (event) => {
    event.preventDefault()
    setFormPending(true)
    setFormError('')

    const payload = {
      tieuDe: form.tieuDe,
      tomTat: form.tomTat || undefined,
      noiDung: form.noiDung,
      anhDaiDien: form.anhDaiDien || undefined,
      danhMucId: form.danhMucId,
      noiBat: form.noiBat,
      tieuDeMeta: form.tieuDeMeta || undefined,
      moTaMeta: form.moTaMeta || undefined,
      theTag: form.theTag || undefined,
      trangThai: Number(form.trangThai),
    }

    try {
      if (editingId) {
        await adminService.updateArticle(editingId, payload)
        notify.success('Cập nhật bài viết thành công.')
      } else {
        await adminService.createArticle(payload)
        notify.success('Tạo bài viết mới thành công.')
      }

      setShowForm(false)
      resetForm()
      await loadData(1)
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể lưu bài viết'
      setFormError(message)
      notify.error(message)
    } finally {
      setFormPending(false)
    }
  }

  const publishArticle = async (id) => {
    setPendingId(id)
    setError('')
    try {
      await adminService.publishArticle(id)
      await loadData(pagination.trang)
      notify.success('Xuất bản bài viết thành công.')
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể xuất bản bài viết'
      setError(message)
      notify.error(message)
    } finally {
      setPendingId('')
    }
  }

  const deleteArticle = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa bài viết này?')) {
      return
    }
    setPendingId(id)
    setError('')
    try {
      await adminService.deleteArticle(id)
      await loadData(pagination.trang)
      notify.success('Xóa bài viết thành công.')
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể xóa bài viết'
      setError(message)
      notify.error(message)
    } finally {
      setPendingId('')
    }
  }

  const statusMap = useMemo(
    () => Object.fromEntries(ARTICLE_STATUS.map((item) => [item.value, item.label])),
    [],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--brand-ink)]">Quản lý bài viết</h1>
          <p className="mt-2 text-[var(--ink-muted)]">Tạo, chỉnh sửa, xuất bản và kiểm soát nội dung tin tức.</p>
        </div>

        <button className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white" onClick={openCreateForm}>
          Tạo bài viết
        </button>
      </div>

      <div className="grid gap-3 rounded-xl border border-[var(--line)] bg-white p-4 md:grid-cols-[1fr_220px_180px_auto] md:items-end">
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">Tìm kiếm</span>
          <input
            value={filters.timKiem}
            onChange={(event) => setFilters((prev) => ({ ...prev, timKiem: event.target.value }))}
            placeholder="Tiêu đề bài viết"
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
            value={filters.trangThai}
            onChange={(event) => setFilters((prev) => ({ ...prev, trangThai: event.target.value }))}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
          >
            <option value="">Tất cả</option>
            {ARTICLE_STATUS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <button onClick={() => loadData(1)} className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white">
          Tải lại
        </button>
      </div>

      {loading ? <div className="rounded-xl border border-[var(--line)] bg-white p-4 text-[var(--ink-muted)]">Đang tải bài viết...</div> : null}
      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{error}</div> : null}

      {!loading && !error ? (
        <div className="overflow-auto rounded-xl border border-[var(--line)] bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--bg)] text-left text-xs uppercase tracking-wide text-[var(--ink-muted)]">
              <tr>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Tác giả</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const id = getField(item, 'id', 'Id')
                const status = Number(getField(item, 'trangThai', 'TrangThai', 0))
                const isPublished = status === 2
                const busy = pendingId === id

                return (
                  <tr key={id} className="border-t border-[var(--line)]">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--brand-ink)]">{getField(item, 'tieuDe', 'TieuDe')}</div>
                      <div className="mono text-xs text-[var(--ink-muted)]">/{getField(item, 'duongDan', 'DuongDan')}</div>
                    </td>
                    <td className="px-4 py-3">{getField(item, 'tenDanhMuc', 'TenDanhMuc', '-')}</td>
                    <td className="px-4 py-3">{getField(item, 'tenTacGia', 'TenTacGia', '-')}</td>
                    <td className="px-4 py-3">{statusMap[status] ?? status}</td>
                    <td className="px-4 py-3">{toVnDate(getField(item, 'ngayTao', 'NgayTao'))}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openEditForm(id)}
                          disabled={formPending || busy}
                          className="rounded border border-[var(--line)] px-2 py-1 text-xs font-semibold hover:bg-[var(--bg)] disabled:opacity-60"
                        >
                          Sửa
                        </button>

                        {!isPublished ? (
                          <button
                            onClick={() => publishArticle(id)}
                            disabled={busy}
                            className="rounded border border-emerald-300 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 disabled:opacity-60"
                          >
                            Xuất bản
                          </button>
                        ) : null}

                        {isAdmin ? (
                          <button
                            onClick={() => deleteArticle(id)}
                            disabled={busy}
                            className="rounded border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60"
                          >
                            Xóa
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {rows.length === 0 ? <div className="p-4 text-sm text-[var(--ink-muted)]">Không có bài viết phù hợp.</div> : null}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--ink-muted)]">Tổng {pagination.tongSo} bài viết</p>
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

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-white p-5">
            <h2 className="text-xl font-bold text-[var(--brand-ink)]">{editingId ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}</h2>

            <form className="mt-4 space-y-3" onSubmit={onSubmitForm}>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Tiêu đề</span>
                <input
                  required
                  minLength={5}
                  value={form.tieuDe}
                  onChange={(event) => setForm((prev) => ({ ...prev, tieuDe: event.target.value }))}
                  className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Tóm tắt</span>
                <textarea
                  rows={2}
                  value={form.tomTat}
                  onChange={(event) => setForm((prev) => ({ ...prev, tomTat: event.target.value }))}
                  className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Nội dung (HTML)</span>
                <textarea
                  required
                  rows={7}
                  value={form.noiDung}
                  onChange={(event) => setForm((prev) => ({ ...prev, noiDung: event.target.value }))}
                  className="mono w-full rounded-lg border border-[var(--line)] px-3 py-2"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label>
                  <span className="mb-1 block text-sm font-semibold">Ảnh đại diện (URL)</span>
                  <input
                    value={form.anhDaiDien}
                    onChange={(event) => setForm((prev) => ({ ...prev, anhDaiDien: event.target.value }))}
                    className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm font-semibold">Danh mục</span>
                  <select
                    required
                    value={form.danhMucId}
                    onChange={(event) => setForm((prev) => ({ ...prev, danhMucId: event.target.value }))}
                    className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((item) => (
                      <option key={getField(item, 'id', 'Id')} value={getField(item, 'id', 'Id')}>
                        {getField(item, 'ten', 'Ten')}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label>
                  <span className="mb-1 block text-sm font-semibold">Trạng thái</span>
                  <select
                    value={form.trangThai}
                    onChange={(event) => setForm((prev) => ({ ...prev, trangThai: Number(event.target.value) }))}
                    className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                  >
                    {ARTICLE_STATUS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-2 pt-7">
                  <input
                    type="checkbox"
                    checked={form.noiBat}
                    onChange={(event) => setForm((prev) => ({ ...prev, noiBat: event.target.checked }))}
                    className="h-4 w-4"
                  />
                  <span className="text-sm font-semibold">Đánh dấu nổi bật</span>
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label>
                  <span className="mb-1 block text-sm font-semibold">Tiêu đề SEO</span>
                  <input
                    value={form.tieuDeMeta}
                    onChange={(event) => setForm((prev) => ({ ...prev, tieuDeMeta: event.target.value }))}
                    className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm font-semibold">Mô tả SEO</span>
                  <input
                    value={form.moTaMeta}
                    onChange={(event) => setForm((prev) => ({ ...prev, moTaMeta: event.target.value }))}
                    className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Thẻ</span>
                <input
                  value={form.theTag}
                  onChange={(event) => setForm((prev) => ({ ...prev, theTag: event.target.value }))}
                  className="w-full rounded-lg border border-[var(--line)] px-3 py-2"
                />
              </label>

              {formError ? <p className="text-sm text-rose-700">{formError}</p> : null}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    resetForm()
                  }}
                  className="rounded-lg border border-[var(--line)] px-4 py-2 font-semibold"
                >
                  Hủy
                </button>
                <button type="submit" disabled={formPending} className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white disabled:opacity-60">
                  {formPending ? 'Đang lưu...' : 'Lưu bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
