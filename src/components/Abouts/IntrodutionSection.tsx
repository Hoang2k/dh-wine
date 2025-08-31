import HeroMemorialImage from "../../assets/image/about/about_6.png";
import Image from "next/image";

export default function IntrodutionSection() {
  return (
    <section className="relative bg-[#EBFFEF80] py-20 bg-gradient-to-br from-memorial-cream via-white to-memorial-cream overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* LEFT */}
          <div className="md:col-span-2">
            {/* Nhóm tiêu đề + ảnh giữa, khoảng cách trên/dưới ảnh = nhau */}
            {/* Nhóm tiêu đề + ảnh, text nằm giữa ảnh */}
            <div className="mt-3 flex justify-center">
              <div className="relative w-[220px] md:w-[280px] aspect-[16/10] rounded-xl overflow-hidden">
                <p className="text-sm text-underline">VỊ XUYÊN</p>
                <Image
                  src={HeroMemorialImage}
                  alt="Nghĩa trang Liệt sĩ Vị Xuyên"
                  fill
                  priority
                  sizes="(min-width:1024px) 280px, 220px"
                  className="object-contain"
                />

                {/* Overlay phủ toàn bộ khung ảnh, căn giữa tuyệt đối */}
                <div className="absolute inset-0 grid place-items-center p-2 pointer-events-none">
                  <h2
                    className="max-w-[90%] text-center text-xl md:text-2xl font-extrabold
                   text-emerald-700 leading-tight break-words"
                  >
                    BẢN HÙNG CA NƠI BIÊN CƯƠNG
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-3">
            <p className="text-lg md:text-xl text-memorial-gray leading-relaxed">
              Trên mảnh đất địa đầu cực Bắc Tổ quốc, có hai địa danh thiêng
              liêng gắn liền với ký ức bi tráng của một thời máu lửa: Nghĩa
              trang Liệt sĩ Vị Xuyên và Đền thờ các Anh hùng liệt sĩ mặt trận Vị
              Xuyên tại điểm cao 468. Một nơi là chiến trường xưa, nơi bao người
              con người hùng của đất mẹ Việt Nam đã ngã xuống trong cuộc chiến
              bảo vệ biên giới phía Bắc (1979 – 1989). Một nơi là chốn yên nghỉ
              ngàn thu, nơi đất mẹ ôm trọn những người con ưu tú đã hóa thân vào
              điệp trùng đá núi để trường tồn với non sông.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
