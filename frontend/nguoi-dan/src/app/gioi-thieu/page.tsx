export default function GioiThieu() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Giới thiệu bộ máy chính quyền</h1>
        <div className="prose dark:prose-invert prose-slate max-w-none">
          <p>
            Cổng thông tin điện tử cung cấp cái nhìn tổng quan về cơ cấu tổ chức, vai trò và nhiệm vụ của các cấp chính quyền địa phương. Chúng tôi cam kết xây dựng một nền hành chính dân chủ, chuyên nghiệp, hiện đại, tinh gọn, hiệu lực, hiệu quả và phục vụ nhân dân.
          </p>
          <h3>1. Sơ đồ tổ chức</h3>
          <p>Hệ thống bao gồm các cơ quan chuyên môn, Ủy ban nhân dân các cấp và các đơn vị sự nghiệp công lập trực thuộc.</p>
          <h3>2. Chức năng và nhiệm vụ</h3>
          <ul>
            <li>Quản lý nhà nước trên các lĩnh vực kinh tế, văn hóa, xã hội, an ninh quốc phòng...</li>
            <li>Đảm bảo các chính sách An sinh xã hội cho người dân.</li>
            <li>Cung cấp và giải quyết các thủ tục hành chính công.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}