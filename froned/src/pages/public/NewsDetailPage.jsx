import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { articlesService } from '../../services/articles.service'
import { commentsService } from '../../services/comments.service'
import { shortText, toVnDate } from '../../utils/formatters'
import { notify } from '../../utils/notify'

const getField = (item, camel, pascal, fallback = '') => item?.[camel] ?? item?.[pascal] ?? fallback

function CommentItem({ item, isReply = false }) {
  const author = getField(item, 'tenTacGia', 'TenTacGia', 'Khách')
  const content = getField(item, 'noiDung', 'NoiDung')
  const createdAt = getField(item, 'ngayTao', 'NgayTao')
  const replies = getField(item, 'danhSachTraLoi', 'DanhSachTraLoi', [])

  return (
    <article className={`rounded-xl border border-[var(--line)] bg-white p-4 ${isReply ? 'ml-6 mt-3' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold text-[var(--brand-ink)]">{author}</h4>
        <span className="text-xs text-[var(--ink-muted)]">{toVnDate(createdAt)}</span>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--ink-muted)]">{content}</p>

      {Array.isArray(replies) && replies.length > 0
        ? replies.map((reply) => <CommentItem key={getField(reply, 'id', 'Id')} item={reply} isReply />)
        : null}
    </article>
  )
}

export default function NewsDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [related, setRelated] = useState([])
  const [comments, setComments] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [commentForm, setCommentForm] = useState({ tenKhach: '', emailKhach: '', noiDung: '' })
  const [commentPending, setCommentPending] = useState(false)
  const [commentMessage, setCommentMessage] = useState('')

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await articlesService.getBySlug(slug)
        if (!mounted) {
          return
        }

        setArticle(data)
        const id = getField(data, 'id', 'Id')

        const [relatedData, commentsData] = await Promise.all([
          articlesService.getRelated(slug, 4).catch(() => []),
          commentsService.getByArticleId(id, { trang: 1, kichThuocTrang: 20 }).catch(() => ({ danhSach: [] })),
        ])

        if (!mounted) {
          return
        }

        setRelated(Array.isArray(relatedData) ? relatedData : [])
        setComments(commentsData?.danhSach ?? commentsData?.DanhSach ?? [])
      } catch (err) {
        if (mounted) {
          setError(err?.response?.data?.thongDiep ?? err?.message ?? 'Không thể tải nội dung bài viết')
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
  }, [slug])

  const articleData = useMemo(() => {
    if (!article) {
      return null
    }

    return {
      id: getField(article, 'id', 'Id'),
      title: getField(article, 'tieuDe', 'TieuDe'),
      summary: getField(article, 'tomTat', 'TomTat'),
      content: getField(article, 'noiDung', 'NoiDung'),
      cover: getField(article, 'anhDaiDien', 'AnhDaiDien'),
      author: getField(article, 'tenTacGia', 'TenTacGia', 'Ban biên tập'),
      category: getField(article, 'tenDanhMuc', 'TenDanhMuc', 'Tin tức'),
      publishDate: getField(article, 'ngayXuatBan', 'NgayXuatBan'),
      views: getField(article, 'soLuotXem', 'SoLuotXem', 0),
      tags: getField(article, 'theTag', 'TheTag', ''),
    }
  }, [article])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareArticle = async () => {
    if (!articleData) {
      return
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: articleData.title,
          text: shortText(articleData.summary, 100),
          url: shareUrl,
        })
        notify.success('Da chia se bai viet.')
      } else {
        await navigator.clipboard.writeText(shareUrl)
        setCommentMessage('Đã sao chép liên kết bài viết.')
        notify.success('Da sao chep lien ket bai viet.')
      }
    } catch {
      setCommentMessage('Không thể chia sẻ vào lúc này.')
      notify.error('Khong the chia se bai viet vao luc nay.')
    }
  }

  const onSubmitComment = async (event) => {
    event.preventDefault()
    if (!articleData) {
      return
    }

    setCommentPending(true)
    setCommentMessage('')
    try {
      await commentsService.create({
        baiVietId: articleData.id,
        noiDung: commentForm.noiDung,
        tenKhach: commentForm.tenKhach,
        emailKhach: commentForm.emailKhach,
      })

      setCommentForm({ tenKhach: '', emailKhach: '', noiDung: '' })
      setCommentMessage('Bình luận đã được gửi. Nội dung sẽ hiển thị sau khi duyệt.')
      notify.success('Da gui binh luan. Noi dung se hien thi sau khi duyet.')
    } catch (err) {
      const message = err?.response?.data?.thongDiep ?? err?.message ?? 'Gửi bình luận thất bại'
      setCommentMessage(message)
      notify.error(message)
    } finally {
      setCommentPending(false)
    }
  }

  if (loading) {
    return <section className="panel p-6 text-[var(--ink-muted)]">Đang tải bài viết...</section>
  }

  if (error || !articleData) {
    return (
      <section className="panel p-6">
        <h1 className="text-2xl font-bold text-[var(--brand-ink)]">Không thể hiển thị bài viết</h1>
        <p className="mt-3 text-[var(--danger)]">{error || 'Bài viết không tồn tại.'}</p>
      </section>
    )
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_330px]">
      <article className="panel overflow-hidden">
        <div className="h-56 bg-gradient-to-br from-emerald-100 via-amber-50 to-cyan-100 md:h-80">
          {articleData.cover ? <img src={articleData.cover} alt={articleData.title} className="h-full w-full object-cover" /> : null}
        </div>

        <div className="space-y-5 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-[var(--brand)]/10 px-2 py-1 font-semibold text-[var(--brand)]">{articleData.category}</span>
            <span className="rounded-full bg-amber-100 px-2 py-1 font-semibold text-amber-700">{articleData.views} lượt xem</span>
            <span className="text-[var(--ink-muted)]">{toVnDate(articleData.publishDate)}</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-[var(--brand-ink)] md:text-4xl">{articleData.title}</h1>
          <p className="text-base leading-7 text-[var(--ink-muted)]">{articleData.summary}</p>

          <div className="flex flex-wrap items-center gap-3 border-y border-[var(--line)] py-3 text-sm text-[var(--ink-muted)]">
            <span>Tác giả: {articleData.author}</span>
            <span className="mono">Thẻ: {articleData.tags || 'Chưa cập nhật'}</span>
            <button onClick={shareArticle} className="rounded-lg border border-[var(--line)] px-3 py-1 font-semibold hover:bg-white">
              Chia sẻ bài viết
            </button>
          </div>

          <div
            className="prose prose-neutral max-w-none leading-7 text-[var(--ink)]"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleData.content) }}
          />
        </div>
      </article>

      <aside className="space-y-5">
        <section className="panel p-5">
          <h3 className="text-lg font-bold text-[var(--brand-ink)]">Bài viết liên quan</h3>
          <div className="mt-3 space-y-3">
            {related.map((item) => {
              const id = getField(item, 'id', 'Id')
              const title = getField(item, 'tieuDe', 'TieuDe')
              const postSlug = getField(item, 'duongDan', 'DuongDan')
              const summary = getField(item, 'tomTat', 'TomTat')

              return (
                <Link key={id} to={`/tin-tuc/${postSlug}`} className="block rounded-lg border border-[var(--line)] bg-white p-3 hover:border-[var(--brand)]">
                  <h4 className="line-clamp-2 text-sm font-bold text-[var(--brand-ink)]">{title}</h4>
                  <p className="mt-2 text-xs leading-5 text-[var(--ink-muted)]">{shortText(summary || '', 90)}</p>
                </Link>
              )
            })}
            {related.length === 0 ? <p className="text-sm text-[var(--ink-muted)]">Chưa có bài liên quan.</p> : null}
          </div>
        </section>

        <section className="panel p-5">
          <h3 className="text-lg font-bold text-[var(--brand-ink)]">Bình luận ({comments.length})</h3>

          <form className="mt-3 space-y-3" onSubmit={onSubmitComment}>
            <input
              value={commentForm.tenKhach}
              onChange={(event) => setCommentForm((prev) => ({ ...prev, tenKhach: event.target.value }))}
              placeholder="Tên của bạn"
              className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
            />
            <input
              value={commentForm.emailKhach}
              onChange={(event) => setCommentForm((prev) => ({ ...prev, emailKhach: event.target.value }))}
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
            />
            <textarea
              value={commentForm.noiDung}
              onChange={(event) => setCommentForm((prev) => ({ ...prev, noiDung: event.target.value }))}
              required
              minLength={2}
              rows={4}
              placeholder="Nhập nội dung bình luận..."
              className="w-full rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
            />

            <button
              type="submit"
              disabled={commentPending}
              className="w-full rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {commentPending ? 'Đang gửi...' : 'Gửi bình luận'}
            </button>

            {commentMessage ? <p className="text-sm text-[var(--ink-muted)]">{commentMessage}</p> : null}
          </form>

          <div className="mt-4 space-y-3">
            {comments.map((item) => (
              <CommentItem key={getField(item, 'id', 'Id')} item={item} />
            ))}
            {comments.length === 0 ? <p className="text-sm text-[var(--ink-muted)]">Chưa có bình luận được duyệt.</p> : null}
          </div>
        </section>
      </aside>
    </section>
  )
}
