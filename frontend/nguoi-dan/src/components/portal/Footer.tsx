import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B101E] text-white py-12 md:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 border-b border-slate-700/50 pb-12">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl">travel_explore</span>
              <h2 className="text-xl font-bold uppercase tracking-wider leading-tight">
                Cổng Thông Tin Điện Tử<br />Địa Phương
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Trang thông tin chính thống cung cấp dịch vụ và tin tức từ chính quyền địa phương đến người dân và doanh nghiệp.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-xl">public</span>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-xl">share</span>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-xl">mail</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Liên kết nhanh */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-100">Liên kết nhanh</h3>
            <ul className="space-y-4">
              <li><Link href="/gioi-thieu" className="text-slate-300 text-sm hover:text-white transition-colors">Giới thiệu bộ máy chính quyền</Link></li>
              <li><Link href="/quy-hoach" className="text-slate-300 text-sm hover:text-white transition-colors">Quy hoạch địa phương</Link></li>
              <li><Link href="/van-ban-phap-luat" className="text-slate-300 text-sm hover:text-white transition-colors">Cơ sở dữ liệu văn bản</Link></li>
              <li><Link href="/mot-cua" className="text-slate-300 text-sm hover:text-white transition-colors">Hệ thống một cửa điện tử</Link></li>
              <li><Link href="/khao-sat" className="text-slate-300 text-sm hover:text-white transition-colors">Khảo sát mức độ hài lòng</Link></li>
            </ul>
          </div>

          {/* Column 3: Dịch vụ công */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-100">Dịch vụ công</h3>
            <ul className="space-y-4">
              <li><Link href="/dich-vu-cong" className="text-slate-300 text-sm hover:text-white transition-colors">Thủ tục hành chính</Link></li>
              <li><Link href="/tra-cuu" className="text-slate-300 text-sm hover:text-white transition-colors">Tra cứu hồ sơ</Link></li>
              <li><Link href="/nop-ho-so" className="text-slate-300 text-sm hover:text-white transition-colors">Nộp hồ sơ trực tuyến</Link></li>
              <li><Link href="/ca-nhan/thanh-toan" className="text-slate-300 text-sm hover:text-white transition-colors">Thanh toán trực tuyến</Link></li>
              <li><Link href="/lien-he/hoi-dap" className="text-slate-300 text-sm hover:text-white transition-colors">Hỏi đáp pháp luật</Link></li>
            </ul>
          </div>

          {/* Column 4: Thông tin liên hệ */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-100">Thông tin liên hệ</h3>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">location_on</span>
                <span className="text-slate-300 text-sm leading-relaxed">01 Trần Hưng Đạo, Thành phố Trung tâm, Tỉnh Địa Phương</span>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">call</span>
                <span className="text-slate-300 text-sm">(024) 3823 4567 - 0988 123 456</span>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">mail</span>
                <span className="text-slate-300 text-sm">contact@diaphuong.gov.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 Cổng Thông tin điện tử địa phương. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6">
            <Link href="/dieu-khoan" className="hover:text-white transition-colors">Điều khoản sử dụng</Link>
            <Link href="/chinh-sach" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
            <Link href="/so-do-trang" className="hover:text-white transition-colors">Sơ đồ trang</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
