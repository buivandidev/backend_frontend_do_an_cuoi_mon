export const dynamic = "force-dynamic";


import Image from "next/image";

// Types corresponding to /api/departments
interface Department {
  id: string;
  tenPhongBan: string;
  soDienThoai: string;
  email: string;
  moTa: string;
  trangThai: boolean;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  chucVu: string;
  phongBanId: string;
  anhDaiDienUrl?: string; // TĂªn property nĂ y do API User quyáº¿t Ä‘á»‹nh
}

async function getDepartments() {
  try {
    const res = await fetch("http://localhost:5000/api/departments", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.thanhCong && data.duLieu ? (data.duLieu as Department[]) : [];
  } catch (error) {
    console.error("Lá»—i khi láº¥y phĂ²ng ban:", error);
    return [];
  }
}

async function getUsersByDepartment(deptId: string) {
  try {
    // Sáº½ gá»i Ä‘áº¿n endpoint hoáº·c filter user theo phĂ²ng ban.
    // Táº¡m thá»i náº¿u BE chÆ°a cĂ³ API láº¥y nhĂ¢n viĂªn theo department public,
    // ta query list users chung (hoáº·c giáº£ láº­p náº¿u rá»—ng).
    const res = await fetch(`http://localhost:5000/api/users?PhongBanId=${deptId}&kichThuocTrang=100`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.thanhCong && data.duLieu?.muc ? (data.duLieu.muc as User[]) : [];
  } catch (error) {
    console.error("Lá»—i khi láº¥y cĂ¡n bá»™:", error);
    return [];
  }
}


export default async function ToChucPage() {
  const departments = await getDepartments();
  const activeDepartments = departments.filter(d => d.trangThai !== false);

  // Load nhĂ¢n viĂªn cho tá»«ng phĂ²ng ban (Ä‘á»ƒ nhanh thĂ¬ nĂªn dĂ¹ng Promise.all, nhÆ°ng hiá»‡n cĂ³ thá»ƒ map tuáº§n tá»±)
  const departmentsWithStaff = await Promise.all(
    activeDepartments.map(async (dept) => {
      const staff = await getUsersByDepartment(dept.id);
      return { ...dept, staff };
    })
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-4 py-16 dark:bg-slate-900 md:px-10">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.svg')] bg-center opacity-5 dark:opacity-10"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary dark:bg-primary/20">
            Giá»›i thiá»‡u chung
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl dark:text-slate-100">
            SÆ¡ Ä‘á»“ tá»• chá»©c & <span className="text-secondary">Bá»™ mĂ¡y hĂ nh chĂ­nh</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Há»‡ thá»‘ng cÆ¡ quan hĂ nh chĂ­nh nhĂ  nÆ°á»›c cáº¥p cÆ¡ sá»Ÿ, cam káº¿t phá»¥c vá»¥ nhĂ¢n dĂ¢n vá»›i tinh tháº§n trĂ¡ch nhiá»‡m, minh báº¡ch vĂ  hiá»‡u quáº£ nháº¥t.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-12 md:px-10">
        
        {/* LĂ£nh Ä‘áº¡o UBND (Static / Highlights) */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
            LĂ£nh Ä‘áº¡o UBND phÆ°á»ng/xĂ£
          </h2>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {/* Thay báº±ng dá»¯ liá»‡u Ä‘á»™ng náº¿u cĂ³ role LĂ£nh Ä‘áº¡o hoáº·c hardcode táº¡m */}
             <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
                <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-50 ring-4 ring-primary/20 dark:bg-slate-800">
                   <span className="material-symbols-outlined text-[80px] text-primary/50">person</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Chá»§ tá»‹ch UBND</h3>
                <p className="mt-1 font-medium text-primary">Äang cáº­p nháº­t</p>
                <div className="mt-4 flex flex-col items-center text-sm text-slate-500 dark:text-slate-400">
                   <a href="#" className="flex items-center hover:text-primary"><span className="material-symbols-outlined mr-1 text-[16px]">call</span> LiĂªn há»‡ sá»‘ Ä‘iá»‡n thoáº¡i ná»™i bá»™</a>
                   <a href="#" className="mt-1 flex items-center hover:text-primary"><span className="material-symbols-outlined mr-1 text-[16px]">mail</span> chuttich@phuongxa.gov.vn</a>
                </div>
            </div>
             <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
                <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-50 ring-4 ring-primary/20 dark:bg-slate-800">
                   <span className="material-symbols-outlined text-[80px] text-primary/50">person</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">PhĂ³ Chá»§ tá»‹ch (KT-XH)</h3>
                <p className="mt-1 font-medium text-primary">Äang cáº­p nháº­t</p>
                <div className="mt-4 flex flex-col items-center text-sm text-slate-500 dark:text-slate-400">
                   <a href="#" className="flex items-center hover:text-primary"><span className="material-symbols-outlined mr-1 text-[16px]">call</span> LiĂªn há»‡ sá»‘ Ä‘iá»‡n thoáº¡i ná»™i bá»™</a>
                </div>
            </div>
             <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
                <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-50 ring-4 ring-primary/20 dark:bg-slate-800">
                   <span className="material-symbols-outlined text-[80px] text-primary/50">person</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">PhĂ³ Chá»§ tá»‹ch (VH-XH)</h3>
                <p className="mt-1 font-medium text-primary">Äang cáº­p nháº­t</p>
                <div className="mt-4 flex flex-col items-center text-sm text-slate-500 dark:text-slate-400">
                   <a href="#" className="flex items-center hover:text-primary"><span className="material-symbols-outlined mr-1 text-[16px]">call</span> LiĂªn há»‡ sá»‘ Ä‘iá»‡n thoáº¡i ná»™i bá»™</a>
                </div>
            </div>
          </div>
        </section>

        {/* CĂ¡c PhĂ²ng Ban & Khá»‘i ÄoĂ n thá»ƒ */}
        <section>
          <div className="mb-10 flex items-end justify-between border-b pb-4 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              CĂ¡c PhĂ²ng Ban chuyĂªn mĂ´n
            </h2>
          </div>

          {departmentsWithStaff.length === 0 ? (
            <p className="text-center text-slate-500 py-10">Äang cáº­p nháº­t dá»¯ liá»‡u phĂ²ng ban...</p>
          ) : (
            <div className="space-y-8">
              {departmentsWithStaff.map((dept) => (
                <div key={dept.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="border-b border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="flex flex-col flex-wrap items-start justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <h3 className="text-xl font-bold text-primary dark:text-primary">{dept.tenPhongBan}</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                           {dept.moTa || "ChÆ°a cĂ³ mĂ´ táº£ chá»©c nÄƒng, nhiá»‡m vá»¥."}
                        </p>
                      </div>
                      <div className="flex gap-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-sm dark:bg-slate-800">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">call</span>
                          {dept.soDienThoai || "N/A"}
                        </div>
                        <div className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-sm dark:bg-slate-800">
                          <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                          {dept.email || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Danh sĂ¡ch cĂ¡n bá»™ */}
                  <div className="p-6">
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Danh sĂ¡ch cĂ¡n bá»™ / nhĂ¢n viĂªn ({dept.staff.length})
                    </h4>
                    
                    {dept.staff.length === 0 ? (
                      <p className="text-sm italic text-slate-500">ChÆ°a cĂ³ thĂ´ng tin nhĂ¢n sá»±.</p>
                    ) : (
                      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                         {dept.staff.map((user) => (
                           <div key={user.id} className="flex items-center gap-4 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                 {user.anhDaiDienUrl ? (
                                    <Image src={user.anhDaiDienUrl.startsWith('http') ? user.anhDaiDienUrl : `http://localhost:5000${user.anhDaiDienUrl}`} alt={user.fullName} width={48} height={48} className="h-full w-full object-cover" />
                                 ) : (
                                    <span className="material-symbols-outlined text-slate-400">person</span>
                                 )}
                              </div>
                              <div>
                                 <strong className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{user.fullName || "ChÆ°a cĂ³ tĂªn"}</strong>
                                 <span className="text-xs text-slate-500 dark:text-slate-400">{user.chucVu || "ChuyĂªn viĂªn"}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>
      </main>

      
    </div>
  );
}