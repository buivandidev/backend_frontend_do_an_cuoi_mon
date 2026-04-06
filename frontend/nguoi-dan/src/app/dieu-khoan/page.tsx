export default function DieuKhoanSuDung() {
  return (
    <>
      

      <main className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex-grow flex flex-col items-center">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden w-full">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 text-center">Điều Khoản Sử Dụng</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center text-sm">Cập nhật lần cuối: 06/04/2026</p>
          </div>
          
          <div className="p-8 prose dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">1. Chấp thuận các Điều khoản</h3>
            <p className="mb-6">
              Bằng việc truy cập và sử dụng Cổng Thông tin điện tử và Dịch vụ công của địa phương, bạn đồng ý tuân thủ toàn bộ các điều khoản được quy định tại văn bản này. Nếu bạn không đồng ý với quy định của chúng tôi, vui lòng ngừng sử dụng dịch vụ.
            </p>

            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">2. Quyền và Trách nhiệm của Người Sử Dụng</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Bạn phải cung cấp thông tin trung thực, chính xác khi đăng ký tài khoản và nộp hồ sơ.</li>
              <li>Tự bảo mật thông tin tài khoản, mật khẩu định danh của bạn.</li>
              <li>Chịu trách nhiệm hoàn toàn cho các nội dung số hóa, tài liệu tải lên hoặc bình luận theo quy định của Pháp luật.</li>
              <li>Không thực hiện các hành vi gây gián đoạn hệ thống như hack, tấn công từ chối dịch vụ (DDoS), hoặc phát tán mã độc.</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">3. Quyền và Trách nhiệm của Hệ Thống</h3>
            <p className="mb-6">
              Cổng cam kết xử lý các hồ sơ bạn đã nộp theo đúng các quy định Pháp luật và văn bản chuyên ngành hiện hành. Mọi thay đổi trong tiến độ xử lý hồ sơ sẽ được thông báo lại cho người dùng thông qua hệ thống hoặc kênh SMS/Email một cách minh bạch.
            </p>

            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">4. Giới Hạn Trách Nhiệm</h3>
            <p className="mb-6">
              Trong trường hợp xảy ra sự cố kỹ thuật không mong muốn từ máy chủ, đường truyền internet, hoặc do những trường hợp bất khả kháng, chúng tôi sẽ nỗ lực khắc phục nhanh nhất có thể. Tuy nhiên, Ban quản trị hoàn toàn miễn trừ trách nhiệm bồi thường về các thiệt hại (nếu có) phát sinh từ các sự cố này đối với một hồ sơ hành chính chưa phát sinh yêu cầu thu lệ phí chính thức.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
