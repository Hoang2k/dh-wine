import Image from "next/image";
import HeroMemorialImage from "../../assets/image/about/about_6.png";

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
              <p className="text-sm text-underline">
              VỊ XUYÊN
            </p>
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
              Chiến trường Vị Xuyên, Hà Giang, là một trong những mặt trận khốc liệt nhất
              trong cuộc chiến bảo vệ biên giới phía Bắc những năm 1979–1989. Hàng nghìn
              chiến sĩ đã ngã xuống, nhiều người đến nay vẫn chưa tìm thấy hài cốt.
              <br /><br />
              Nghĩa trang Liệt sĩ Vị Xuyên là nơi quy tụ hơn 2.000 phần mộ của các anh hùng
              liệt sĩ, trở thành biểu tượng bất diệt của tinh thần quả cảm và tình yêu quê
              hương đất nước...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
