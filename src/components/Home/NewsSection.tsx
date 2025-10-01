'use client'

import { ArrowRight } from "lucide-react";
import New1 from "../../assets/image/bg2.jpg";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

type TNews = {
    title: string;
    summary: string;
    image_url: string;
};

const news: TNews[] = [
    {
        title: "Tin tức",
        image_url: New1.src,
        summary:
            "How do you create compelling presentations that wow your colleagues and impress your managers?",
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary:
            "How do you create compelling presentations that wow your colleagues and impress your managers?",
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary:
            "How do you create compelling presentations that wow your colleagues and impress your managers your managers your managers your managers?",
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary:
            "How do you create compelling presentations that wow your colleagues and impress your managers?",
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary:
            "How do you create compelling presentations that wow your colleagues and impress your managers?",
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary:
            "How do you create compelling presentations that wow your colleagues and impress your managers? How do you create compelling presentations that wow your colleagues and impress your managers?",
    },
];

export default function NewsSection() {
    return (
        <section className="py-8 px-6">
            <div className="container mx-auto pb-16 pt-4 md:px-8 text-center bg-[#EBFFEF80] rounded-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Tin tức</h2>
               

                {/* ONE Swiper, many slides */}
                <div className="mt-10">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2, spaceBetween: 24 },
                            1280: { slidesPerView: 3, spaceBetween: 24 },
                        }}

                        /* ==== autoplay ==== */
                        autoplay={{
                            delay: 5000,              
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,   
                        }}
                        loop={news.length > 1}      
                        speed={600}
                        className="
                        !pb-8
                        [&_.swiper-pagination]:!bottom-4
                        [&_.swiper-pagination]:translate-y-4
                        [&_.swiper-pagination-bullet]:!bg-[#087443]/40
                        [&_.swiper-pagination-bullet-active]:!bg-[#087443]
                      "
                    >
                        {news.map((item, index) => (
                            <SwiperSlide key={`${item.title}-${index}`}>
                                <article className="transition rounded-lg overflow-hidden bg-white text-left shadow hover:shadow-md h-full">
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={item.image_url}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                            priority={index < 3}
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-[#101828] hover:text-blue-600 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-base text-gray-600 line-clamp-3 md:!line-clamp-2">
                                            {item.summary}
                                        </p>

                                        <div className="mt-4">
                                            <Link
                                                href="#"
                                                className="inline-flex items-center gap-2 text-[#087443] hover:underline"
                                            >
                                                Xem chi tiết <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="pt-10 flex justify-center">
                    <Link href="/news" className="text-[#087443] hover:underline text-2xl flex items-center gap-x-3">
                        Xem tất cả <ArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
