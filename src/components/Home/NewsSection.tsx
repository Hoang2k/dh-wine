"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { IPost } from "@/types/post";




export default function NewsSection({ listPosts }: { listPosts: IPost[] }) {
  return (
    <section className="py-8 px-6">
      <div className="container mx-auto pb-16 pt-4 md:px-8 text-center rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Tin tức
        </h2>

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
            loop={listPosts.length > 1}
            speed={600}
            className="
                        !pb-8
                        [&_.swiper-pagination]:!bottom-4
                        [&_.swiper-pagination]:translate-y-4
                        [&_.swiper-pagination-bullet]:!bg-[#087443]/40
                        [&_.swiper-pagination-bullet-active]:!bg-[#087443]
                        [&_.swiper-slide]:!h-auto
                        [&_.swiper-wrapper]:!items-stretch
                      "
          >
            {listPosts.map((item, index) => (
              <SwiperSlide key={`${item.title}-${index}`}>
                <article className="transition rounded-lg overflow-hidden bg-white text-left shadow hover:shadow-md h-full flex flex-col">
                  <div className="relative w-full h-48 flex-shrink-0">
                    <Link href={`/tin-tuc/${item.slug}`}>
                      <Image
                        src={item.thumbnailImage?.path || ''}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority={index < 3}
                      />
                    </Link>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <Link href={`/tin-tuc/${item.slug}`} className="text-xl font-semibold text-[#101828] hover:text-blue-600 line-clamp-2">
                      {item.title}
                    </Link>
                    <p className="mt-2 text-base text-gray-600 line-clamp-3 md:!line-clamp-2 flex-grow">
                      {item.summary}
                    </p>

                    <div className="mt-4 flex-shrink-0">
                      <Link
                        href={`/tin-tuc/${item.slug}`}
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
          <Link
            href="/tin-tuc"
            className="px-6 py-2 rounded-lg bg-blue-100 text-blue-600 
               font-semibold hover:bg-blue-200 transition"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </section>
  );
}
