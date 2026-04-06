import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">travel_explore</span>
              <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight hidden sm:block">
                Cổng Dịch vụ công
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Trang chủ</Link>
            <Link href="/tin-tuc" className="text-sm font-medium hover:text-primary transition-colors">Tin tức</Link>
            <Link href="/dich-vu-cong" className="text-sm font-medium hover:text-primary transition-colors">Thủ tục hành chính</Link>
            <Link href="/tra-cuu" className="text-sm font-medium hover:text-primary transition-colors">Tra cứu hồ sơ</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dang-nhap" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
