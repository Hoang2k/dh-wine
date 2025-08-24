"use client";
import { ArrowRight, Calendar } from "lucide-react";
import CalendarImage from "../../assets/image/home/calendar.png";
import UserGroup from "../../assets/image/home/user-group-logo.png";
import BgStatistic from "../../assets/image/home/bg_statistic.jpg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


function CountOnView({
    to,
    className = "",
    duration = 1200,      // ms
    locale = "vi-VN",     // "vi-VN" -> 127.892 ; "en-US" -> 127,892
    direction = "up",     // "up" | "down"
  }: {
    to: number | string;
    className?: string;
    duration?: number;
    locale?: string;
    direction?: "up" | "down";
  }) {
    // parse "127,892" -> 127892
    const parseNumber = (v: number | string) => {
      if (typeof v === "number") return v;
      const s = String(v).trim();
      const m = s.match(/([\d.,]+)/);
      if (!m) return NaN;
      return parseInt(m[1].replace(/[.,\s]/g, ""), 10);
    };
  
    const goal = parseNumber(to);
    const [val, setVal] = useState<number | string>(
      Number.isFinite(goal) ? (direction === "down" ? goal : 0) : to
    );
    const ref = useRef<HTMLSpanElement | null>(null);
    const started = useRef(false);
  
    useEffect(() => {
      if (!Number.isFinite(goal)) return;
      const el = ref.current;
      if (!el) return;
  
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const from = direction === "down" ? (goal as number) : 0;
      const delta = direction === "down" ? -(goal as number) : (goal as number);
  
      const startAnim = () => {
        if (started.current) return;
        started.current = true;
  
        let t0: number | null = null;
        let raf = 0;
        const tick = (ts: number) => {
          if (t0 === null) t0 = ts;
          const p = Math.min((ts - t0) / duration, 1);
          const eased = easeOutCubic(p);
          const n = Math.round(from + delta * eased);
          setVal(n);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      };
  
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnim();
            io.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      io.observe(el);
      return () => io.disconnect();
    }, [goal, duration, direction]);
  
    if (!Number.isFinite(goal)) {
      return (
        <span ref={ref} className={className}>
          {String(to)}
        </span>
      );
    }
    return (
      <span ref={ref} className={className}>
        {Number(val).toLocaleString(locale)}
      </span>
    );
  }

type TActiviti = {
    title: string;
    created_at: string;
    description: string
}
const activity: TActiviti[] = [
    {
        title: "Lễ tưởng niệm 27/07/2024",
        created_at: "27/07/2024",
        description: "Lễ tưởng niệm 45 năm chiến thắng biên giới phía Bắc, với sự tham gia của 500+ thân nhân liệt sĩ."
    },
    {
        title: "Lễ tưởng niệm 27/07/2024",
        created_at: "27/07/2024",
        description: "Lễ tưởng niệm 45 năm chiến thắng biên giới phía Bắc, với sự tham gia của 500+ thân nhân liệt sĩ."
    },
    {
        title: "Lễ tưởng niệm 27/07/2024",
        created_at: "27/07/2024",
        description: "Lễ tưởng niệm 45 năm chiến thắng biên giới phía Bắc, với sự tham gia của 500+ thân nhân liệt sĩ."
    }
]

const statisic = {
    totalVisits: "127,892",
    visitationSchedule: "1,247",
    todayVisit: 342
}

export default function StatisticActivitieSection() {
    return (
        <section className=" px-6">
            <div className="container mx-auto md:px-30 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                    Thống kê và hoạt động
                </h2>
                <p className="mt-3 text-gray-600 max-w-full mx-auto text-2xl">
                    Các hoạt động và thống kê của Nghĩa trang Liệt sĩ Vị Xuyên sẽ được cập nhật.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pt-[60px]">
                    <div className="">
                        <div className="grid grid-cols-2 gap-6 mb-8 h-1/2">

                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="w-full  flex justify-center pb-4">
                                    <div className="relative w-[80px] h-[80px] ">
                                        <Image
                                            src={UserGroup.src}
                                            alt={UserGroup.src}
                                            fill
                                            priority
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-[#475467]">Lượt thăm viếng năm 2024</div>
                                <div className="text-[30px] font-bold text-[#101828]">
                                <CountOnView to={statisic.totalVisits} className="mt-1 text-3xl font-bold" />
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="w-full  flex justify-center pb-4">
                                    <div className="relative w-[80px] h-[80px] ">
                                        <Image
                                            src={CalendarImage.src}
                                            alt={CalendarImage.src}
                                            fill
                                            priority
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="text-lg font-semibold text-[#475467]">Lịch viếng đã đặt</div>
                                <CountOnView to={statisic.visitationSchedule} className="text-[30px] font-bold text-[#101828]" />
                            </div>
                        </div>

                        <div
                            className="p-6 rounded-lg shadow-md text-white mb-8 bg-cover bg-center h-1/2"
                            style={{ backgroundImage: `url(${BgStatistic.src})` }}
                        >
                            <div className="text-xl">Lượt thăm viếng hôm nay</div>
                            <div className=" flex items-center justify-center">
                                <CountOnView to={statisic.todayVisit} className="text-[64px] text-[#FAC515] font-bold" />
                                <span className="text-4xl text-white font-bold pl-4">Lượt</span></div>
                            <div className="text-lg mt-2">Cập nhật lúc 14:30, 16/08/2024</div>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <div className="flex justify-between items-center w-full  mt-10 lg:mt-0">
                        <p className="text-[#101828] text-2xl font-bold">Hoạt động</p>
                        <a href="" className="text-[#087443] text-2xl flex items-center gap-x-2"> Xem tất cả <ArrowRight /></a>
                        </div>
                        {
                            activity.map((item, index) => {
                                return (
                                    <div key={index} className="bg-white p-6 rounded-xl border border-[#D0D5DD]">
                                        <div className="flex gap-x-4">
                                            <div className="w-12 h-12 shrink-0 bg-[#087443] rounded-lg flex items-center justify-center">
                                                <Calendar color="white" />
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-between items-center">
                                                    <div className="font-semibold text-left text-lg">{item.title}</div>
                                                    <div className="text-sm text-[#475467]">{item.created_at}</div>
                                                </div>
                                                <p className="mt-2 text-[#475467] text-left text-base line-clamp-2">{item.description}</p>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}