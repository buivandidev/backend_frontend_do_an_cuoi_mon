"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = ["Thông tin người nộp", "Biểu mẫu", "Đính kèm", "Hoàn tất"];

export default function NopTrucTuyenMultiStep({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Hồ sơ đã gửi thành công!");
      router.push("/ca-nhan/quan-ly-ho-so");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <main className="py-12 px-4 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow">
        <h1 className="text-2xl font-bold mb-4">Nộp hồ sơ trực tuyến</h1>
        <p className="mb-4">Dịch vụ ID: {resolvedParams.id}</p>
        
        <div className="flex gap-4 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className={i === currentStep ? "text-blue-600 font-bold" : "text-gray-400"}>
              {i + 1}. {s}
            </div>
          ))}
        </div>

        <div className="min-h-[200px] border-y py-4 mb-4">
          <p>Nội dung bước {currentStep + 1}</p>
        </div>

        <div className="flex justify-between">
          <button onClick={handlePrev} className="px-4 py-2 border rounded">Quay lại</button>
          <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">
            {currentStep === STEPS.length - 1 ? "Nộp hồ sơ" : "Tiếp tục"}
          </button>
        </div>
      </div>
    </main>
  );
}