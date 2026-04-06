export default function TraCuuHoSo() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Tra cứu tiến độ hồ sơ</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Nhập mã hồ sơ đã được cấp hoặc quét mã QR trên giấy tiếp nhận để kiểm tra tình trạng giải quyết cấp phép của bạn.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-primary/5 border border-slate-200 dark:border-slate-800 overflow-hidden mb-12">
          <div className="p-8">
            <form className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                <input 
                  type="text" 
                  placeholder="Nhập mã hồ sơ (VD: HS-123456789)" 
                  className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base transition-all dark:text-white placeholder:text-slate-400"
                />
              </div>
              <button type="submit" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                <span className="material-symbols-outlined">plagiarism</span>
                Tra cứu
              </button>
            </form>
          </div>
          
          {/* Example state when no searching is active */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 text-center border-t border-slate-100 dark:border-slate-800">
            <span className="material-symbols-outlined text-slate-300 text-5xl mb-2">content_paste_search</span>
            <p className="text-sm text-slate-500 dark:text-slate-400">Kết quả tra cứu sẽ hiển thị tại đây.</p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center mt-12">
          <div className="p-6">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">speed</span>
            </div>
            <h3 className="font-bold mb-2">Nhanh chóng & Chính xác</h3>
            <p className="text-sm text-slate-500">Cập nhật tiến độ xử lý hồ sơ real-time từ các đơn vị hành chính.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">phonelink_ring</span>
            </div>
            <h3 className="font-bold mb-2">Thông báo qua SMS</h3>
            <p className="text-sm text-slate-500">Nhận tin nhắn hoặc thông báo đẩy ngay khi có kết quả.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">mark_email_read</span>
            </div>
            <h3 className="font-bold mb-2">Minh bạch hồ sơ</h3>
            <p className="text-sm text-slate-500">Xem rõ từng quy trình xử lý, người tiếp nhận và thời gian hoàn thành mong kiến.</p>
          </div>
        </div>
    </main>
  );
}
