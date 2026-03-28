import { useLocation } from 'react-router-dom'

function Line({ width = '100%', className = '' }) {
  return <div className={`skeleton-line ${className}`} style={{ width }} />
}

function PublicSkeleton() {
  return (
    <div className="container-page py-8">
      <div className="panel p-5 md:p-7">
        <Line width="26%" className="mb-4" />
        <Line width="72%" className="mb-3" />
        <Line width="58%" className="mb-6" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-[var(--line)] bg-white p-4">
              <div className="skeleton-block h-24" />
              <Line width="78%" className="mt-3" />
              <Line width="55%" className="mt-2" />
              <Line width="92%" className="mt-4" />
              <Line width="88%" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdminSkeleton() {
  return (
    <div className="container-page py-6">
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="panel p-4">
          <Line width="65%" className="mb-3" />
          <Line width="45%" className="mb-6" />
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <Line key={index} width="90%" />
            ))}
          </div>
        </aside>

        <section className="panel p-6">
          <Line width="32%" className="mb-4" />
          <Line width="48%" className="mb-6" />

          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="rounded-lg border border-[var(--line)] bg-white p-4">
                <Line width="42%" className="mb-2" />
                <Line width="88%" className="mb-2" />
                <Line width="74%" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function RouteSkeleton() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return <AdminSkeleton />
  }

  return <PublicSkeleton />
}
