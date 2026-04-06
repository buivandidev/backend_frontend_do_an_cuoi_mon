export default function KhaoSat() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Khảo sát & Lấy ý kiến</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 border-b pb-6 dark:border-slate-800">
          Đóng góp ý kiến của nhân dân vào dự thảo chính sách, quy chuẩn địa phương. Hãy cho chúng tôi biết suy nghĩ của bạn để góp phần xây dựng hệ thống minh bạch hơn.
        </p>
        <div className="space-y-6">
          <div className="p-4 border rounded-xl dark:border-slate-800 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Lấy ý kiến Dự thảo Luật BHXH sửa đổi</h3>
              <p className="text-sm text-slate-500 mt-1">Thời hạn: từ 10/10/2024 đến 25/11/2024</p>
            </div>
            <button className="bg-primary/10 text-primary px-4 py-2 font-semibold rounded-lg hover:bg-primary/20">Tham gia</button>
          </div>
          <div className="p-4 border rounded-xl dark:border-slate-800 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Đánh giá sự hài lòng khi sử dụng Dịch vụ công</h3>
              <p className="text-sm text-slate-500 mt-1">Thời hạn: Vô thời hạn (Liên tục)</p>
            </div>
            <button className="bg-primary/10 text-primary px-4 py-2 font-semibold rounded-lg hover:bg-primary/20">Tham gia</button>
          </div>
        </div>
      </div>
    </main>
  );
}