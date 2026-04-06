export default function ChinhSachBaoMat() {
  return (
    <>
      

      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex-grow flex flex-col items-center">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden w-full">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 text-center">Chính Sách Bảo Mật</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center text-sm">Cập nhật lần cuối: 06/04/2026</p>
          </div>
          
          <div className="p-8 prose dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">1. Mục Đích Thu Thập Thông Tin</h3>
            <p className="mb-6">
              Chúng tôi thu thập các thông tin cá nhân hợp pháp của bạn nhằm mục đích xử lý các thủ tục hành chính công. Bằng cách đăng ký tài khoản hoặc nộp các hồ sơ thông qua cổng Dịch vụ công, bạn đồng thuận cung cấp các dữ liệu định danh như: Họ Tên, CCCD/CMND, Số Điện Thoại, Email, Ngày Sinh...
            </p>

            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">2. Phương Thức Bảo Vệ Dữ Liệu</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Mọi dữ liệu bạn cung cấp đều được mã hóa theo chuẩn 256-bit hiện đại bằng chứng chỉ SSL/TLS.</li>
              <li>Thông tin của cá nhân, doanh nghiệp chỉ được truy xuất bởi những cán bộ, hệ thống có thẩm quyền được cấp phép xử lý các thủ tục hành chính.</li>
              <li>Mật khẩu của bạn được mã hóa hash một chiều nên ngay cả quản trị viên hệ thống cũng sẽ không thể biết mật khẩu gốc.</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">3. Chia Sẻ Thông Tin Của Bạn</h3>
            <p className="mb-6">
              Thông tin sẽ không bao giờ được bán hay chia sẻ với các bên thứ ba sử dụng cho các mục đích thương mại. Thông tin chỉ có thể được chia sẻ giữa các cơ quan, đơn vị hành chính trong hệ thống nhằm phối hợp giải quyết các thủ tục liên thông phục vụ bạn.
            </p>

            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">4. Quyền Xóa & Yêu Cầu Thay Đổi</h3>
            <p className="mb-6">
              Bạn có quyền yêu cầu cập nhật các dữ liệu, tài liệu của chính bạn trong phạm vi Cổng thông tin cho phép thông qua công cụ quản lý Hồ Sơ Cá Nhân (`/ca-nhan`). Với những dữ liệu đã được pháp lý hóa thành Giấy tờ/Biên lai kết quả, mọi yêu cầu thay đổi phải được quy chiếu theo đúng các thủ tục thay đổi văn bản trên pháp luật hiện hành.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
