export default function QuyHoachKienTruc() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Quy hoạch kiến trúc đô thị</h1>
        <div className="prose dark:prose-invert prose-slate max-w-none">
          <p>
            Chuyên trang cung cấp thông tin công khai về các đồ án quy hoạch phân khu, quy hoạch chi tiết xây dựng, dự án trọng điểm trên địa bàn. Qua đó thúc đẩy sự phát triển đô thị bền vững.
          </p>
          <h3>Công khai thông tin quy hoạch</h3>
          <ul>
            <li>Bản đồ định hướng phát triển không gian và hạ tầng.</li>
            <li>Sử dụng đất theo thời kỳ, kế hoạch.</li>
            <li>Các dự án nhà ở xã hội và trung tâm hành chính mới.</li>
          </ul>
          <p className="p-4 bg-primary/10 text-primary rounded border border-primary/20">
            Dữ liệu quy hoạch đang được tiến hành cập nhật liên thông. Mọi thắc mắc xin liên hệ phòng Quản lý đô thị.
          </p>
        </div>
      </div>
    </main>
  );
}