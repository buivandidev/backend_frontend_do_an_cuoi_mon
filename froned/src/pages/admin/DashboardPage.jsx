import { lazy, Suspense } from 'react'

const DashboardBarChart = lazy(() => import('../../components/dashboard/DashboardBarChart'))

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-extrabold text-[var(--brand-ink)]">Dashboard quản trị</h1>
        <p className="mt-2 text-[var(--ink-muted)]">Biểu đồ minh họa, bước tiếp theo sẽ nối dữ liệu thật từ API dashboard.</p>
      </header>

      <div className="panel p-5">
        <Suspense fallback={<p className="text-sm text-[var(--ink-muted)]">Dang tai bieu do...</p>}>
          <DashboardBarChart />
        </Suspense>
      </div>
    </div>
  )
}
