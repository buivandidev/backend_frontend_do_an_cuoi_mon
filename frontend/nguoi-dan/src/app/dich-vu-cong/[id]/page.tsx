import Link from "next/link";
import { notFound } from "next/navigation";

// Trang chi tiết thủ tục hành chính
export default async function DichVuCongDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  // Dữ liệu mẫu (mô phỏng gọi API chi tiết TTHC)
  const thuTuc = {
    id,
    tenTTHC: "Thủ tục Cấp bản sao Trích lục hộ tịch",
    linhVuc: "Tư pháp - Hộ tịch",
    mucDo: "Toàn trình",
    coQuan: "UBND Phường/Xã",
    thoiGianGiaiQuyet: "1 ngày làm việc",
    phi: "10,000 VNĐ / Bản sao",
    lePhi: "Miễn phí",
    cachThuc: "Trực tuyến / Trực tiếp"
  };

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
        <div className="flex flex-col gap-4 mb-8">
          <Link href="/dich-vu-cong" className="text-primary font-medium hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Trở lại danh sách dịch vụ công
          </Link>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md uppercase">Mức độ: {thuTuc.mucDo}</span>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-md">{thuTuc.linhVuc}</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {thuTuc.tenTTHC}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 font-medium">Cơ quan thực hiện</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{thuTuc.coQuan}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Cách thức thực hiện</p>
              <p className="font-medium text-slate-900 dark:text-gray-300">{thuTuc.cachThuc}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 font-medium">Thời gian giải quyết</p>
              <p className="font-medium text-slate-900 dark:text-gray-300">{thuTuc.thoiGianGiaiQuyet}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Phí, Lệ phí</p>
              <p className="font-medium text-slate-900 dark:text-gray-300">Phí: {thuTuc.phi} | Lệ phí: {thuTuc.lePhi}</p>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-slate-800 pt-8 flex justify-center md:justify-end gap-4">
          <Link 
            href={`/dich-vu-cong/${id}/nop-truc-tuyen`}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2 transform transition hover:scale-105"
          >
            <span className="material-symbols-outlined">send</span>
            Nộp hồ sơ trực tuyến
          </Link>
        </div>
      </div>
    </main>
  );
}
