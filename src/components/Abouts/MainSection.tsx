import { Award, Calendar, CalendarHeart, Flag, Heart, MapPin, Mountain, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import About2 from "../../assets/image/about/about_2.png";
import About1 from "../../assets/image/about/about_1.png";
import AboutMain from "../../assets/image/about/bg-main-about.png";
import LietSiAnNghi from "../../assets/image/about/liet-si-an-nghi.webp";
import HectaDienTich from "../../assets/image/about/hecta-dien-tich.webp";
import DaiTuongNiem from "../../assets/image/about/dai-tuong-niem.jpg";
import KhuMoLietSi from "../../assets/image/about/khu-mo-liet-si.jpg";

export default function MainSection() {
  return (
    <section className="px-6 py-16">
      <div className="container mx-auto md:px-30">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-elegant transition-all duration-300 border-memorial-cream/50 hover:border-memorial-gold/30">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-cyan-600" />
              </div>
              <CardTitle className="text-memorial-dark">
                Vị trí địa lý
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-memorial-gray leading-relaxed">
                Nghĩa trang tọa lạc tại thôn 18, xã Vị Xuyên, tỉnh Tuyên
                Quang. Đền thờ nằm trên điểm cao 468 thuộc thôn Nặm Ngặt, xã
                Thanh Thủy, tỉnh Tuyên Quang cách nghĩa trang khoảng 40km về
                phía Bắc.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-elegant transition-all duration-300 border-memorial-cream/50 hover:border-memorial-gold/30">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#BCF0D4] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-memorial-dark">
                Lịch sử hình thành
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-memorial-gray leading-relaxed">
                Nghĩa trang được xây dựng năm 1990 hoàn thành năm 1991, sau
                cuộc chiến tranh bảo vệ biên giới phía Bắc (1979-1989), để tôn
                vinh và ghi nhớ những anh hùng đã ngã xuống vì Tổ quốc.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-elegant transition-all duration-300 border-memorial-cream/50 hover:border-memorial-gold/30">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-orange-600 " />
              </div>
              <CardTitle className="text-memorial-dark">
                Quy mô nghĩa trang
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-memorial-gray leading-relaxed">
                Với diện tích 11.4ha, là nơi yên nghỉ của 1957 liệt sĩ và 01
                phần mộ liệt sĩ tập thể. Được xây dựng khang trang với các khu
                vực: Đền thờ liệt sĩ, Tượng đài Tổ quốc ghi công và các khu
                mộ.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mountain className="w-6 h-6 text-memorial-red" />
                <h2 className="text-3xl font-bold text-memorial-dark">
                  Điểm cao 468
                </h2>
              </div>
              <p className="text-memorial-gray leading-relaxed mb-6">
                Cách nghĩa trang liệt sĩ Vị Xuyên khoảng 40km về phía Bắc là
                Đền thờ các Anh hùng liệt sĩ mặt trận Vị Xuyên, nằm trên điểm
                cao 468 thuộc thôn Nặm Ngặt, xã Thanh Thủy, tỉnh Tuyên Quang,
                từng là “tọa độ lửa” khốc liệt nhất trong những năm tháng
                chiến tranh. Tại đây, những người lính mặt trận Vị Xuyên cùng
                đồng đội đã kiên cường bám trụ, với tinh thần “sống bám đá
                đánh giặc, chết hoá đá bất tử”, viết nên bản anh hùng ca bất
                diệt.
              </p>
              <p className="text-memorial-gray leading-relaxed mb-6">
                Mỗi nén nhang, mỗi bước chân về nguồn tại đền thờ là sự kết
                nối quá khứ – hiện tại, là lời tri ân gửi tới những người đã
                hiến dâng tuổi xuân, máu xương cho Tổ quốc.
              </p>

              <div className="bg-memorial-cream/50 p-6 rounded-lg border border-memorial-gold/20">
                <h3 className="font-semibold text-memorial-dark mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-memorial-red" />Ý nghĩa lịch
                  sử
                </h3>
                <p className="text-memorial-gray leading-relaxed">
                  Đền thờ được xây dựng ngay trên mảnh đất này, nơi đặt sở chỉ
                  huy tiền phương của ta trong chiến dịch, là ngôi nhà chung
                  của hơn 4.000 cán bộ chiến sĩ đã anh dũng hy sinh trong cuộc
                  chiến đấu bảo vệ biên giới phía bắc của Tổ Quốc.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flag className="w-6 h-6 text-memorial-red" />
                <h2 className="text-3xl font-bold text-memorial-dark">
                  Sứ mệnh thiêng liêng
                </h2>
              </div>
              <p className="text-memorial-gray leading-relaxed mb-4">
                Hai địa điểm – một chiến trường, gắn liền thành hành trình tri
                ân đầy ý nghĩa.Nghĩa trang chính là nơi các anh sum họp, an
                giấc vĩnh hằng bên đồng đội, trong tình yêu thương vô hạn của
                Đảng bộ, Chính chuyền và Nhân dân các dân tộc nơi đây Đến với
                nghĩa trang Vị Xuyên, ta cúi mình trong lặng yên, thắp nén
                hương tưởng nhớ để nhắc nhở mình sống xứng đáng hơn với sự hy
                sinh to lớn của các anh. Đến với đền thờ 468, ta lắng nghe âm
                vọng của quá khứ, cảm nhận được khí phách hiên ngang của các
                anh hùng liệt sĩ.
              </p>
              <div className="bg-memorial-cream/30 p-6 rounded-lg border border-memorial-gold/20">
                <p className="text-memorial-gray leading-relaxed">
                  Ngày nay, đền thờ các Anh hùng liệt sĩ mặt trận Vị Xuyên và
                  nghĩa trang liệt sĩ Vị Xuyên đã trở thành "địa chỉ đỏ" trong
                  hành trình về nguồn của đồng bào cả nước. Hàng vạn lượt
                  người mỗi năm đã về đây dâng hương, tri ân, đặc biệt trong
                  những ngày: 12/7, 27/7, 22/12.
                </p>
              </div>
            </div>

            {/* Bảo tồn ký ức lịch sử */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Flag className="w-6 h-6 text-memorial-red" />
                <h2 className="text-3xl font-bold text-memorial-dark">
                  Bảo tồn ký ức lịch sử
                </h2>
              </div>
              <p className="text-memorial-gray leading-relaxed mb-4">
                Nghĩa trang Liệt sĩ Vị Xuyên và Đền thờ các Anh hùng liệt sĩ
                mặt trận Vị Xuyên mãi mãi là hai biểu tượng bất tử – một nơi
                ghi dấu chiến công, một nơi gửi gắm linh hồn các anh hùng –
                những người con bất tử của đất mẹ Việt Nam. Đó là lời nhắc nhở
                sâu sắc rằng: hòa bình hôm nay được đánh đổi bằng máu xương
                của những người đã nằm lại nơi cực Bắc Tổ quốc.
              </p>
              <div className="bg-memorial-cream/30 p-6 rounded-lg border border-memorial-gold/20">
                <p className="text-memorial-gray leading-relaxed">
                  Chúng tôi không ngừng thu thập, sắp xếp và lưu trữ các tài
                  liệu, hình ảnh, kỷ vật liên quan đến cuộc chiến và các anh
                  hùng liệt sĩ, tạo thành kho tàng tư liệu quý báu cho thế hệ
                  hôm nay và mai sau.
                </p>
              </div>
            </div>

            {/* Hỗ trợ thân nhân */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-memorial-red" />
                <h2 className="text-3xl font-bold text-memorial-dark">
                  Hỗ trợ thân nhân
                </h2>
              </div>
              <p className="text-memorial-gray leading-relaxed mb-4">
                Đồng hành cùng gia đình liệt sĩ trong việc tìm kiếm thông tin,
                tổ chức tưởng niệm và duy trì mối liên hệ tinh thần với người
                thân đã khuất. Mỗi gia đình đều được quan tâm, hỗ trợ tận
                tình.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-memorial-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-memorial-gray">
                    Hỗ trợ tra cứu thông tin và vị trí mộ liệt sĩ
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-memorial-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-memorial-gray">
                    Tổ chức các buổi tưởng niệm theo yêu cầu gia đình
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-memorial-red rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-memorial-gray">
                    Kết nối các gia đình có hoàn cảnh tương tự
                  </span>
                </li>
              </ul>
            </div>

            {/* Kết nối cộng đồng */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-memorial-red" />
                <h2 className="text-3xl font-bold text-memorial-dark">
                  Kết nối cộng đồng
                </h2>
              </div>
              <p className="text-memorial-gray leading-relaxed mb-4">
                Tạo cầu nối giữa các thế hệ, kết nối người dân khắp nơi trong
                tinh thần tri ân và tôn vinh những giá trị cao đẹp của dân
                tộc. Nghĩa trang là điểm hẹn của tình yêu nước và lòng biết
                ơn.
              </p>
              <div className="bg-memorial-gold/10 p-6 rounded-lg border border-memorial-gold/30">
                <p className="text-memorial-gray leading-relaxed">
                  Thông qua các hoạt động tưởng niệm, triển lãm và chương
                  trình giáo dục, chúng tôi góp phần xây dựng cộng đồng đoàn
                  kết, có trách nhiệm với lịch sử và truyền thống dân tộc.
                </p>
              </div>
            </div>

            {/* Giáo dục thế hệ trẻ */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-memorial-red" />
                <h2 className="text-3xl font-bold text-memorial-dark">
                  Giáo dục thế hệ trẻ
                </h2>
              </div>
              <p className="text-memorial-gray leading-relaxed mb-4">
                Nuôi dưỡng lòng yêu nước, tự hào dân tộc trong lòng thế hệ trẻ
                qua những bài học sống về lòng dũng cảm và tinh thần hy sinh.
                Mỗi chuyến thăm là một bài học về lòng yêu nước.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-memorial-cream/40 p-6 rounded-lg border border-memorial-gold/20">
                  <h4 className="font-semibold text-memorial-dark mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-memorial-red" />
                    Chương trình giáo dục
                  </h4>
                  <p className="text-memorial-gray leading-relaxed">
                    Tổ chức các buổi học ngoại khóa, kể chuyện lịch sử cho học
                    sinh, giúp các em hiểu rõ về truyền thống anh hùng của dân
                    tộc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Section */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="aspect-[4/3] bg-gradient-to-br from-memorial-cream via-memorial-gold/20 to-memorial-red/20 rounded-xl overflow-hidden shadow-elegant">
                <Image
                  src={AboutMain.src}
                  alt="Nghĩa trang Liệt sĩ Vị Xuyên"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-center p-8 text-white">
                    <Mountain className="w-16 h-16 text-white mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Toàn cảnh nghĩa trang
                    </h3>
                    <p className="text-white/90">
                      Nhìn từ trên cao xuống Điểm cao 468
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="relative overflow-hidden border-memorial-red/30">
                <div className="absolute inset-0">
                  <Image
                    src={LietSiAnNghi.src}
                    alt="Liệt sĩ an nghỉ"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <CardContent className="relative p-4 text-center z-10">
                  <div className="text-2xl font-bold text-white mb-1">
                    1957
                  </div>
                  <p className="text-xs text-white/90">
                    Liệt sĩ an nghỉ
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-memorial-gold/30">
                <div className="absolute inset-0">
                  <Image
                    src={HectaDienTich.src}
                    alt="Hecta diện tích"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <CardContent className="relative p-4 text-center z-10">
                  <div className="text-2xl font-bold text-white mb-1">
                    11.4
                  </div>
                  <p className="text-xs text-white/90">
                    Hecta diện tích
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-memorial relative">
                <Image
                  src={DaiTuongNiem.src}
                  alt="Đài tưởng niệm"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Flag className="w-10 h-10 text-white mx-auto mb-2 opacity-80" />
                    <p className="text-sm text-white font-medium">
                      Đài tưởng niệm
                    </p>
                  </div>
                </div>
              </div>

              <div className="aspect-square rounded-lg overflow-hidden shadow-memorial relative">
                <Image
                  src={KhuMoLietSi}
                  alt="Khu mộ liệt sĩ"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Heart className="w-10 h-10 text-white mx-auto mb-2 opacity-80" />
                    <p className="text-sm text-white font-medium">
                      Khu mộ liệt sĩ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Timeline */}
            <Card className="bg-gradient-to-br from-memorial-cream/50 to-memorial-gold/10 border-memorial-gold/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-memorial-dark flex items-center gap-2">
                  <CalendarHeart className="w-5 h-5 text-memorial-red" />
                  Dòng thời gian
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-red rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-memorial-dark">
                      1979-1989
                    </p>
                    <p className="text-xs text-memorial-gray">
                      Cuộc chiến bảo vệ biên giới
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-memorial-dark">
                      1990
                    </p>
                    <p className="text-xs text-memorial-gray">
                      Xây dựng nghĩa trang
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-red rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-memorial-dark">
                      1991
                    </p>
                    <p className="text-xs text-memorial-gray">
                      Hoàn thành và đưa vào sử dụng
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gallery placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-memorial-red/10 via-memorial-cream/30 to-memorial-gold/10 rounded-lg overflow-hidden shadow-memorial relative">
              <Image
                src={About1.src}
                alt="Nghĩa trang Liệt sĩ Vị Xuyên"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center p-6 text-white">
                  <Users className="w-12 h-12 text-white mx-auto mb-3 opacity-80" />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Hoạt động cộng đồng
                  </h4>
                  <p className="text-sm text-white/90">
                    Kết nối các gia đình liệt sĩ
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-memorial-gold/10 to-memorial-cream/50 border-memorial-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-memorial-red rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-memorial-dark">
                      Thông điệp
                    </h4>
                    <p className="text-sm text-memorial-gray">
                      Lời nhắn gửi đến thế hệ tương lai
                    </p>
                  </div>
                </div>
                <blockquote className="text-memorial-dark font-medium italic leading-relaxed">
                  "Không ai bị lãng quên, không điều gì bị lãng quên. Những
                  anh hùng đã ngã xuống để chúng ta có được hôm nay, và chúng
                  ta sẽ mãi mãi ghi nhớ công ơn ấy."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}