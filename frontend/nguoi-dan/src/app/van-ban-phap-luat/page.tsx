export default function VanBanPhapLuat() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 gap-8 flex flex-col">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Hệ thống văn bản pháp quy</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Số ký hiệu, từ khóa trích yếu..." 
            className="flex-1 px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700" 
          />
          <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">Tìm kiếm</button>
        </div>
        <div className="relative overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="px-6 py-3">Số, Ký hiệu</th>
                <th className="px-6 py-3">Cơ quan ban hành</th>
                <th className="px-6 py-3">Trích yếu</th>
                <th className="px-6 py-3">Ngày ban hành</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">102/2023/QD-UBND</td>
                <td className="px-6 py-4">Ủy ban nhân dân</td>
                <td className="px-6 py-4">Quy định về việc phân cấp quản lý trật tự xây dựng...</td>
                <td className="px-6 py-4">15/10/2023</td>
              </tr>
              <tr className="bg-white dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">85/CT-UBND</td>
                <td className="px-6 py-4">Chủ tịch UBND</td>
                <td className="px-6 py-4">Chỉ thị về chuyển đổi số toàn diện các ngành năm 2024</td>
                <td className="px-6 py-4">02/01/2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}