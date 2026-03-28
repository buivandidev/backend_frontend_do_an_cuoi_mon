import React from 'react';
import Section from '../../components/shared/Section';
import Button from '../../components/shared/Button';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-[var(--brand-dark)] py-20 text-white overflow-hidden">
        {/* Background Pattern/Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-600 blur-[120px]"></div>
        </div>
        
        <div className="container-page relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="mono mb-4 inline-block rounded-full bg-cyan-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 backdrop-blur-sm">
              Trang thông tin điện tử chính thống
            </span>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Kết nối <span className="text-cyan-400">Người dân</span> <br /> 
              với <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-300">Chính quyền</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-slate-300 md:text-xl">
              Nền tảng tích hợp dịch vụ công trực tuyến, tin tức dân sinh và kênh phản ánh hiện trường phục vụ mọi nhu cầu thiết yếu của công dân.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button size="lg" className="px-10">Dịch vụ trực tuyến</Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Tìm hiểu thêm</Button>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[300px] w-[300px] rounded-full border-4 border-cyan-500/30 p-4 md:h-[450px] md:w-[450px]">
              <div className="h-full w-full overflow-hidden rounded-full bg-slate-800 shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1573164067507-400cd222444b?auto=format&fit=crop&q=80&w=800" 
                   alt="City Hall" 
                   className="h-full w-full object-cover opacity-80"
                 />
              </div>
              {/* Floating Cards */}
              <div className="absolute -left-10 top-1/4 glass animate-bounce rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Thủ tục nhanh</p>
                    <p className="text-sm font-bold text-slate-900">85% Xử lý trong ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Section className="bg-white">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { label: 'Cư dân thân thiện', value: '12K+', color: 'text-cyan-600' },
            { label: 'Thanh niên số', value: '2.5K', color: 'text-blue-600' },
            { label: 'Dịch vụ công', value: '50+', color: 'text-emerald-600' },
            { label: 'Tin tức mỗi ngày', value: '100+', color: 'text-amber-600' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <span className={`block text-3xl font-black md:text-5xl ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                {stat.value}
              </span>
              <span className="mt-2 block text-sm font-bold uppercase tracking-widest text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Services Section */}
      <Section 
        title="Dịch vụ công nổi bật" 
        subtitle="TIỆN ÍCH CHO BẠN"
        className="bg-slate-50"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: 'Ký số pháp lý', desc: 'Đăng ký chữ ký số công cộng phục vụ các giao dịch điện tử cá nhân.', icon: '✍️' },
            { title: 'Khai sinh trực tuyến', desc: 'Nộp hồ sơ đăng ký khai sinh tại nhà, nhận kết quả qua bưu điện.', icon: '👶' },
            { title: 'Cấp phép xây dựng', desc: 'Tra cứu quy hoạch và thực hiện thủ tục cấp phép xây dựng nhanh chóng.', icon: '🏗️' },
            { title: 'Tạm trú tạm vắng', desc: 'Đăng ký cư trú dễ dàng qua ứng dụng hoặc trang thông tin điện tử.', icon: '🏠' },
            { title: 'Phản ánh kiến nghị', desc: 'Kênh tiếp nhận và phản hồi các vấn đề hạ tầng, môi trường đô thị.', icon: '📢' },
            { title: 'Tra cứu điểm tin', desc: 'Hệ thống bản đồ số tích hợp các điểm tiện ích và tin tức địa phương.', icon: '📍' },
          ].map((service, i) => (
            <div key={i} className="panel group p-8 hover:border-[var(--brand)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl transition-colors group-hover:bg-[var(--brand-light)]">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold group-hover:text-[var(--brand)] transition-colors">{service.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-500">
                {service.desc}
              </p>
              <button className="mt-6 font-bold text-[var(--brand)] transition-all hover:translate-x-2">
                Chi tiết &rarr;
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg">Xem tất cả các dịch vụ (48+)</Button>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-3xl shadow-2xl">
              <img 
                 src="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=800" 
                 alt="Community" 
                 className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 glass rounded-2xl p-6 shadow-2xl md:p-8">
              <p className="text-4xl font-black text-[var(--brand)]">30+</p>
              <p className="text-sm font-bold text-slate-500 uppercase">Năm hình thành</p>
            </div>
          </div>
          <div>
            <span className="mono mb-4 inline-block text-[var(--brand)] font-bold">LỊCH SỬ & TẦM NHÌN</span>
            <h2 className="text-3xl font-black md:text-5xl leading-tight">Phát triển bền vững,<br />Cộng đồng văn minh.</h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Chúng tôi luôn nỗ lực xây dựng một môi trường sống xanh, hiện đại và nhân văn. Thông qua chuyển đổi số, chính quyền mong muốn mang lại sự thuận tiện nhất cho mọi người dân trong việc tiếp cận thông tin và thực hiện các dịch vụ hành chính.
            </p>
            <div className="mt-8 space-y-4 font-bold text-slate-800">
              {['Mục tiêu chuyển đổi số 100% các thủ tục cơ bản', 'Cải thiện hạ tầng giao thông và không gian công cộng', 'Xây dựng cộng đồng gắn kết thông qua các hoạt động văn hóa'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button className="mt-10">Đọc câu chuyện của chúng tôi</Button>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section 
        title="Thắc mắc thường gặp" 
        subtitle="HỖ TRỢ GIẢI ĐÁP"
        className="bg-slate-50"
      >
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            { q: 'Làm thế nào để đăng ký khai sinh trực tuyến?', a: 'Bạn chỉ cần truy cập mục "Dịch vụ trực tuyến", chọn "Hộ tịch" và tải lên các giấy tờ cần thiết như Giấy chứng sinh, Căn cước công dân của cha/mẹ.' },
            { q: 'Thời gian xử lý hồ sơ hành chính là bao lâu?', a: 'Phần lớn các thủ tục cơ bản được xử lý trong vòng 24-48 giờ làm việc. Bạn có thể theo dõi tiến độ qua mã hồ sơ được cấp.' },
            { q: 'Tôi có thể phản ánh các vấn đề đô thị ở đâu?', a: 'Sử dụng tính năng "Phản ánh hiện trường" trên trang chủ để gửi hình ảnh và vị trí các sự cố như đèn đường hỏng, rác thải hoặc ngập úng.' },
            { q: 'Cần những giấy tờ gì để đăng ký tạm trú?', a: 'Hệ thống sẽ hướng dẫn chi tiết các giấy tờ cần thiết (như hợp đồng thuê nhà, sổ hộ khẩu/CCCD) khi bạn bắt đầu thực hiện thủ tục.' },
          ].map((faq, i) => (
            <details key={i} className="panel group p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-slate-900 group-open:text-[var(--brand)]">
                {faq.q}
                <span className="text-xl transition-transform group-open:rotate-180">+</span>
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed border-t pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="container-page my-16">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[var(--brand)] to-blue-700 p-12 text-center text-white shadow-2xl md:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>
           <h2 className="relative z-10 text-3xl font-black md:text-5xl">Gia nhập cộng đồng số hôm nay</h2>
           <p className="relative z-10 mx-auto mt-6 max-w-2xl text-lg text-cyan-100">
             Cập nhật những thông tin mới nhất và trải nghiệm dịch vụ công tiện lợi nhất ngay trên thiết bị di động của bạn.
           </p>
           <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-4">
             <Button variant="white" size="lg">Đăng ký tài khoản</Button>
             <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Liên hệ hỗ trợ</Button>
           </div>
        </div>
      </section>
    </div>
  );
}
