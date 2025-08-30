"use client";

import { useEffect, useRef, useState } from "react";
import HeroMemorialImage from "../../assets/image/about/bg-main-about.png";
import { Users2, MapPin, Calendar as CalendarIcon, Search, CalendarCheck } from "lucide-react";
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


export default function BannerAboutSection({
  backgroundSrc = HeroMemorialImage.src,
  title = "Nghĩa trang Liệt sĩ Vị Xuyên",
  description = "Tri ân các anh hùng liệt sĩ"
}: HeroMemorialProps) {
  return (
    <div className="lg:px-10">
      <section
        className="relative h-fit lg:h-[60vh] isolate w-full overflow-hidden bg-[#fbfbfb]"
        aria-label="Giới thiệu Nghĩa trang Liệt sĩ Vị Xuyên"
        style={{ backgroundImage: `url(${backgroundSrc})` }}
      >
        {/* Ảnh nền */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundSrc}
            alt={"Nghĩa trang Liệt sĩ Vị Xuyên"}
            fill
            priority
            sizes="100vw"
            className="object-contain lg:object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70" />
        </div>

        {/* Nội dung */}
        <div className="container mx-auto px-4">
          <div className="py-16 md:py-20 lg:py-24  text-white">
            <div>
              <h1 className="max-w-4xl text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                {title}
              </h1>
              <p className=" max-w-4xl text-base md:text-lg/8 text-white/90">
                {description}
              </p>
              <button className="bg-[#EBFFEF80] text-white flex items-center px-4 py-2 hover:cursor-pointer rounded-md mt-20">
                <Search className="w-4 h-4 mr-2" />
                 Tra cứu mộ liệt sĩ
                </button>
              <button className="bg-[#EBFFEF80] text-white flex items-center px-4 py-2 hover:cursor-pointer rounded-md mt-4">
                <CalendarCheck className="w-4 h-4 mr-2" />
                 Đăng ký viếng lễ trực tuyến
                </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  <div className="absolute inset-0 grid place-items-center p-2 pointer-events-none">
    <h2 className="max-w-[90%] text-center text-xl md:text-2xl font-extrabold
                       text-white leading-tight break-words">
      BẢN HÙNG CA NƠI BIÊN CƯƠNG
    </h2>
  </div>
}
