import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { articlesService } from '../../services/articles.service'
import { categoriesService } from '../../services/categories.service'
import { shortText, toVnDate } from '../../utils/formatters'

const PAGE_SIZE = 9

const getFeaturedBadge = (item) => {
  const value = item?.noiBat ?? item?.NoiBat
  return value ? 'Nổi bật' : null
}

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

export default function NewsListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [posts, setPosts] = useState([])
  const [pagination, setPagination] = useState({ tongSo: 0, tongTrang: 1, trang: 1 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const keyword = searchParams.get('q') ?? ''
  const categoryId = searchParams.get('categoryId') ?? ''
  const featuredOnly = searchParams.get('featured') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

  useEffect(() => {
    let mounted = true

    const loadCategories = async () => {
      try {
        const data = await categoriesService.getNewsCategories()
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

    const loadPosts = async () => {
      try {
        const data = await articlesService.getPublished({
          timKiem: keyword,
          danhMucId: categoryId,
          noiBat: featuredOnly === '1' ? true : '',
          trang: page,
          kichThuocTrang: PAGE_SIZE,
        })

        if (!mounted) {
          return
        }

        setPosts(data?.danhSach ?? data?.DanhSach ?? [])
        setPagination({
          tongSo: data?.tongSo ?? data?.TongSo ?? 0,
          tongTrang: data?.tongTrang ?? data?.TongTrang ?? 1,
          trang: data?.trang ?? data?.Trang ?? 1,
        })
      } catch (err) {
        if (!mounted) {
          return
        }
        setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải danh sách bài viết')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadPosts()
    return () => {
      mounted = false
    }
  }, [keyword, categoryId, featuredOnly, page])

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
    const nextFeatured = formData.get('featured') ? '1' : ''

    if (nextKeyword) next.set('q', nextKeyword)
    else next.delete('q')

    if (nextCategory) next.set('categoryId', nextCategory)
    else next.delete('categoryId')

    if (nextFeatured) next.set('featured', nextFeatured)
    else next.delete('featured')

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
        <p className="mono text-xs uppercase tracking-[0.18em] text-[var(--sun)]">Cổng thông tin địa phương</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[var(--brand-ink)] md:text-4xl">Tin tức và thông báo</h1>
        <p className="mt-3 max-w-3xl text-[var(--ink-muted)]">
          Cập nhật hoạt động cộng đồng, thông báo hành chính và các chương trình nổi bật của phường xã.
        </p>
      </header>

      <form className="panel grid gap-3 p-4 md:grid-cols-[1fr_240px_auto_auto] md:items-end" onSubmit={onFilterSubmit}>
        <label>
          <span className="mb-1 block text-sm font-semibold text-[var(--ink-muted)]">Tìm theo tiêu đề/tóm tắt/thẻ</span>
          <input
            name="q"
            defaultValue={keyword}
            placeholder="Nhập từ khóa..."
            className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 outline-none focus:border-[var(--brand)]"
          />
        </label>

        <label>
          <span className="mb-1 block text-sm font-semibold text-[var(--ink-muted)]">Danh mục</span>
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

        <label className="inline-flex items-center gap-2 pb-2 text-sm font-semibold text-[var(--ink-muted)]">
          <input name="featured" type="checkbox" value="1" defaultChecked={featuredOnly === '1'} className="h-4 w-4 accent-[var(--brand)]" />
          Chỉ xem tin nổi bật
        </label>

        <button type="submit" className="rounded-lg bg-[var(--brand)] px-4 py-2 font-semibold text-white">
          Lọc tin
        </button>
      </form>

      {loading ? <div className="panel p-6 text-[var(--ink-muted)]">Đang tải bài viết...</div> : null}
      {error ? <div className="panel p-6 text-[var(--danger)]">{error}</div> : null}

      {!loading && !error ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((item) => {
              const id = getField(item, 'id', 'Id')
              const title = getField(item, 'tieuDe', 'TieuDe')
              const slug = getField(item, 'duongDan', 'DuongDan')
              const summary = getField(item, 'tomTat', 'TomTat')
              const cover = getField(item, 'anhDaiDien', 'AnhDaiDien')
              const author = getField(item, 'tenTacGia', 'TenTacGia', 'Ban biên tập')
              const category = getField(item, 'tenDanhMuc', 'TenDanhMuc', 'Tin tức')
              const publishDate = getField(item, 'ngayXuatBan', 'NgayXuatBan')
              const views = getField(item, 'soLuotXem', 'SoLuotXem', 0)
              const badge = getFeaturedBadge(item)

              return (
                <article key={id} className="panel overflow-hidden">
                  <div className="h-44 bg-gradient-to-br from-emerald-100 via-amber-50 to-cyan-100">
                    {cover ? <img src={cover} alt={title} className="h-full w-full object-cover" /> : null}
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-[var(--brand)]/10 px-2 py-1 font-semibold text-[var(--brand)]">{category}</span>
                      {badge ? <span className="rounded-full bg-amber-100 px-2 py-1 font-semibold text-amber-700">{badge}</span> : null}
                    </div>

                    <h2 className="line-clamp-2 text-lg font-bold text-[var(--brand-ink)]">{title}</h2>
                    <p className="min-h-[3.5rem] text-sm leading-6 text-[var(--ink-muted)]">{shortText(summary || '', 130)}</p>
                    <p className="text-xs text-[var(--ink-muted)]">
                      {author} • {toVnDate(publishDate)} • {views} lượt xem
                    </p>

                    <Link to={`/tin-tuc/${slug}`} className="inline-flex rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-white">
                      Xem chi tiết
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {posts.length === 0 ? <div className="panel p-6 text-[var(--ink-muted)]">Không có bài viết phù hợp bộ lọc hiện tại.</div> : null}

          <div className="panel flex items-center justify-between gap-3 p-4">
            <p className="text-sm text-[var(--ink-muted)]">
              Trang {pagination.trang} / {pagination.tongTrang} • Tổng {pagination.tongSo} bài
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
