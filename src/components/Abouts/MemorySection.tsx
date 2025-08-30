import { Flag, Heart, Users } from "lucide-react";
import Image from "next/image";
import About2 from "../../assets/image/about/about_2.png";

export default function MemorySection() {
    return (
        <section className="py-20 bg-gradient-to-br from-memorial-red/5 via-memorial-cream/30 to-memorial-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--memorial-gold))_0%,transparent_70%)] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Memorial Image Placeholder */}
            <div className="aspect-[16/9] bg-gradient-to-br from-memorial-red/20 via-memorial-cream/50 to-memorial-gold/30 rounded-2xl overflow-hidden shadow-elegant mb-12 relative">
                <Image src={About2.src} alt="Nghĩa trang Liệt sĩ Vị Xuyên" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-memorial-dark/60 via-transparent to-transparent"></div>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-12 relative z-10">
                  <Flag className="w-20 h-20 text-memorial-red mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold text-memorial-dark mb-4">
                    Tượng đài tưởng niệm
                  </h3>
                  <p className="text-memorial-gray text-lg">
                    Biểu tượng của lòng tri ân vĩnh cửu
                  </p>
                </div>
              </div>
            </div>

            {/* Memorial Message */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-memorial-red leading-tight">
                  Tổ quốc ghi công – Nhân dân đời đời nhớ ơn
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-memorial-red to-memorial-gold mx-auto rounded-full"></div>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-lg text-memorial-dark leading-relaxed font-medium">
                  Mỗi nén nhang, mỗi bông hoa, mỗi lời tri ân tại Nghĩa trang
                  Liệt sĩ Vị Xuyên là minh chứng rằng: sự hy sinh của các anh
                  hùng sẽ không bao giờ bị lãng quên.
                </p>

                <p className="text-memorial-gray leading-relaxed">
                  Chúng ta – những thế hệ hôm nay và mai sau – có trách nhiệm
                  tiếp nối, ghi nhớ và tri ân. Hãy cùng nhau:
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white/50 p-6 rounded-xl border border-memorial-gold/20 backdrop-blur-sm">
                    <div className="w-12 h-12 bg-cyan-100  rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6 text-cyan-600" />
                    </div>
                    <p className="text-memorial-dark font-medium text-sm leading-relaxed">
                      Thăm viếng, tưởng niệm trực tiếp hoặc trực tuyến
                    </p>
                  </div>

                  <div className="bg-white/50 p-6 rounded-xl border border-memorial-gold/20 backdrop-blur-sm">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Flag className="w-6 h-6 text-memorial-dark" />
                    </div>
                    <p className="text-memorial-dark font-medium text-sm leading-relaxed">
                      Ghi lại, chia sẻ những câu chuyện, kỷ niệm về các anh hùng
                      liệt sĩ
                    </p>
                  </div>

                  <div className="bg-white/50 p-6 rounded-xl border border-memorial-gold/20 backdrop-blur-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <p className="text-memorial-dark font-medium text-sm leading-relaxed">
                      Chung tay xây dựng và lan tỏa tinh thần "Tổ quốc ghi công"
                      đến cộng đồng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}