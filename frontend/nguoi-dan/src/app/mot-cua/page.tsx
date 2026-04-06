export default function MotCuaDienTu() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 text-center">
        <span className="material-symbols-outlined text-6xl text-primary mb-4 block">computer</span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Một cửa điện tử (MCĐT)</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Hệ thống Thông tin giải quyết thủ tục hành chính, cung cấp giao diện dành cho chuyên viên tiếp nhận, xử lý và trả kết quả liên thông các cấp.
        </p>
        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
          Đăng nhập MCĐT dành cho Cán bộ
        </button>
      </div>
    </main>
  );
}