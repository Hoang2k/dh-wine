import HeroMemorialImage from "../../assets/image/bg2.jpg";
import { Users2, MapPin, Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";

type StatItem = {
  label: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

interface HeroMemorialProps {
  backgroundSrc?: string;
  title?: string;
  description?: string;
  stats?: StatItem[];
  alt?: string;
}

export default function HeroMemorial({
  backgroundSrc = HeroMemorialImage.src,
  title = "Nghĩa trang Liệt sĩ Vị Xuyên",
  description = "Nằm tại Điểm cao 468, Vị Xuyên, Hà Giang. Nơi đã diễn ra những trận chiến oanh liệt bảo vệ biên giới phía Bắc. Nghĩa trang là nơi an nghỉ của hàng nghìn Anh hùng Liệt sĩ đã hy sinh vì Tổ quốc.",
  alt = "Nghĩa trang Liệt sĩ Vị Xuyên",
  stats = [
    { label: "Liệt sĩ", value: "1870", icon: Users2 },
    { label: "Diện tích", value: "10 ha", icon: MapPin },
    { label: "Xây dựng", value: "1990", icon: CalendarIcon },
  ],
}: HeroMemorialProps) {
  return (
    <div className="lg:px-10">
      <section
        className="relative h-fit lg:h-[85vh] isolate w-full overflow-hidden bg-[#fbfbfb]"
        aria-label="Giới thiệu Nghĩa trang Liệt sĩ Vị Xuyên"
      >
        {/* Ảnh nền */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundSrc}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70" />
        </div>

        {/* Nội dung */}
        <div className="container mx-auto px-4">
          <div className="py-16 md:py-20 lg:py-24 text-center text-white">
            <div>
              <h1 className="mx-auto max-w-4xl text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                {title}
              </h1>
              <p className="mx-auto mt-4 max-w-4xl text-base md:text-lg/8 text-white/90">
                {description}
              </p>
            </div>

            <div className="mx-auto mt-12 lg:mt-20 grid grid-cols-3 gap-6 max-w-5xl">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={`${s.label}-${idx}`}
                    className="flex flex-col items-center gap-3 text-white"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/15 shadow-lg">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <div className="text-sm text-white/90 uppercase tracking-wide">
                      {s.label}
                    </div>

                    {/* Count up value */}
                    <div className="text-2xl md:text-3xl font-bold tracking-tight">{s.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
