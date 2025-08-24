
import { ArrowRight } from "lucide-react";
import New1 from "../../assets/image/bg2.jpg";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

type TNews = {
    title: string;
    summary: string;
    image_url: string;
}

const news: TNews[] = [
    {
        title: "Tin tức",
        image_url: New1.src,
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?"
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?"
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers your managers your managers your managers?"
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?"
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?"
    },
    {
        title: "Tin tức",
        image_url: New1.src,
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers? How do you create compelling presentations that wow your colleagues and impress your managers?"
    }
];

export default function NewsSection() {
    return (
        <section className="py-8 px-6">
            <div className="container mx-auto pb-16 pt-4 md:px-30 text-center bg-[#EBFFEF80]">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                    Tin tức
                </h2>
                <p className="mt-3 text-gray-600 max-w-full mx-auto text-2xl">
                    Tổng hợp các tin tức về Nghĩa trang Liệt sĩ Anh Hùng Vị Xuyên
                </p>
                <div className="mt-10 grid grid-cols-1 md:gap-x-8 gap-y-12 lg:grid-cols-2 xl:grid-cols-3">
                    {news.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="transition"
                            >
                                    <div className="relative w-full h-48 mb-4">
                                        <Image
                                            src={item.image_url}
                                            alt={item.title}
                                            fill
                                            priority
                                            sizes="100vw"
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-semibold text-left text-[#101828] hover:text-blue-500">{item.title}</h2>

                                    <p className="mt-2 text-base text-gray-600 text-left line-clamp-3 md:line-clamp-2">
                                        {item.summary}
                                    </p>
                            </div>
                        )
                    })
                    }
                </div>
                <div className="pt-[64px] flex justify-center">
                    <a className="text-[#087443] text-2xl flex items-center gap-x-3" href="">
                    Xem tất cả
                    <ArrowRight />
                    </a>
                </div>
            </div>
        </section>
    )
}