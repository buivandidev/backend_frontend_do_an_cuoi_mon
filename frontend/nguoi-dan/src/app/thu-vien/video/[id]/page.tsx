import Link from "next/link";
import Image from "next/image";

import { notFound } from "next/navigation";

// Táº¡m thá»i láº¥y danh sĂ¡ch video vĂ  lá»c ra video cĂ³ ID tÆ°Æ¡ng á»©ng
// vĂ¬ BE chÆ°a cĂ³ endpoint GET /api/media/{id}
async function getVideoDetails(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/media?loai=1&kichThuocTrang=100`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.thanhCong && data.duLieu?.danhSach) {
      const video = data.duLieu.danhSach.find((v: { id: string }) => v.id === id);
      return video || null;
    }
    return null;
  } catch (error) {
    console.error("Lá»—i láº¥y chi tiáº¿t video:", error);
    return null;
  }
}

async function getRelatedVideos(currentId: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/media?loai=1&kichThuocTrang=5`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.thanhCong && data.duLieu?.danhSach) {
      return data.duLieu.danhSach.filter((v: { id: string }) => v.id !== currentId).slice(0, 4);
    }
    return [];
  } catch (error) {
    console.error("Lá»—i láº¥y video liĂªn quan:", error);
    return [];
  }
}

export default async function ChiTietVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const video = await getVideoDetails(id);
  
  if (!video) {
    notFound();
  }

  const relatedVideos = await getRelatedVideos(id);
  const videoUrl = video.urlTep 
    ? (video.urlTep.startsWith('http') ? video.urlTep : `http://localhost:5000${video.urlTep}`) 
    : "";

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 md:px-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex text-sm font-medium">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link className="flex items-center text-slate-500 hover:text-primary dark:text-slate-400" href="/">
                <span className="material-symbols-outlined mr-1 text-lg">home</span>
                Trang chá»§
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined mx-1 text-sm text-slate-400">chevron_right</span>
                <Link className="text-slate-500 hover:text-primary dark:text-slate-400" href="/thu-vien">
                  ThÆ° viá»‡n Media
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="material-symbols-outlined mx-1 text-sm text-slate-400">chevron_right</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Chi tiáº¿t Video</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Video Section */}
          <div className="flex-1 space-y-6">
            <div className="overflow-hidden rounded-xl bg-black shadow-lg">
              <div className="relative aspect-video w-full">
                {videoUrl ? (
                  <video 
                    controls 
                    className="h-full w-full"
                    poster={video.duongDanAnh ? (video.duongDanAnh.startsWith('http') ? video.duongDanAnh : `http://localhost:5000${video.duongDanAnh}`) : undefined}
                  >
                    <source src={videoUrl} type={video.loaiNoiDung || "video/mp4"} />
                    TrĂ¬nh duyá»‡t cá»§a báº¡n khĂ´ng há»— trá»£ tháº» video.
                  </video>
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-800 text-white">
                    Video khĂ´ng kháº£ dá»¥ng
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h1 className="mb-4 text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100">
                {video.tieuDe || "Video khĂ´ng cĂ³ tiĂªu Ä‘á»"}
              </h1>
              
              <div className="mb-6 flex flex-wrap items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span> 
                    {video.thoiGianTao ? new Date(video.thoiGianTao).toLocaleDateString("vi-VN") : ""}
                  </span>
                  {video.tenNguoiTaiLen && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">person</span> 
                      ÄÄƒng bá»Ÿi: {video.tenNguoiTaiLen}
                    </span>
                  )}
                  {video.tenAlbum && (
                    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[16px]">folder</span> 
                      {video.tenAlbum}
                    </span>
                  )}
                </div>
              </div>
              
              {video.vanBanThayThe && (
                <div className="prose prose-slate max-w-none text-slate-600 dark:prose-invert dark:text-slate-400">
                  <p>{video.vanBanThayThe}</p>
                </div>
              )}
              
              <div className="mt-8 flex gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" type="button">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                  Chia sáº»
                </button>
              </div>
            </div>
          </div>

          {/* Related Videos Sidebar */}
          <aside className="scrollbar-hide flex-shrink-0 lg:w-80">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">Video khĂ¡c</h2>
            <div className="flex flex-col gap-4">
                {relatedVideos.map((rv: { id: string, tieuDe: string, duongDanFile?: string, duongDanAnh?: string, thoiGianTao?: string }) => (
                <Link
                  key={rv.id}
                  className="group flex gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-primary/30 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80"
                  href={`/thu-vien/video/${rv.id}`}
                >
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded border border-slate-200 dark:border-slate-800 bg-slate-900">
                    <Image
                      alt={rv.tieuDe}
                      width={128}
                      height={80}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105 opacity-80"
                      src={rv.duongDanAnh ? (rv.duongDanAnh.startsWith('http') ? rv.duongDanAnh : `http://localhost:5000${rv.duongDanAnh}`) : "https://placehold.co/128x80?text=Video"}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30">
                      <span className="material-symbols-outlined text-xl text-white">play_circle</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                      {rv.tieuDe}
                    </h3>
                    <p className="text-[12px] text-slate-500">
                      {rv.thoiGianTao ? new Date(rv.thoiGianTao).toLocaleDateString("vi-VN") : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>

      
    </div>
  );
}