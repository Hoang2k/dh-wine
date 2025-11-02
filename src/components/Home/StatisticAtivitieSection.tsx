"use client";

import BgStatistic from "../../assets/image/home/bg_statistic.jpg";
import CalendarImage from "../../assets/image/home/calendar.png";
import UserGroup from "../../assets/image/home/user-group-logo.png";
import { getMedia } from "@/services/media";
import { IGallery } from "@/types/media";
import { useDailyRollingCounter } from "@/utils/useDailyRollingCounterHook";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CountOnView({
  to,
  className = "",
  duration = 1200,
  locale = "vi-VN",
  direction = "up",
}: {
  to: number | string;
  className?: string;
  duration?: number;
  locale?: string;
  direction?: "up" | "down";
}) {
  const extract = (v: number | string) => {
    if (typeof v === "number") return { num: v, suffix: "" };
    const s = String(v).trim();
    const m = s.match(/^([\d.,\s]+)(.*)$/);
    if (!m) return { num: NaN, suffix: "" };
    const num = parseInt(m[1].replace(/[.,\s]/g, ""), 10);
    const suffix = m[2] ?? "";
    return { num, suffix };
  };

  const { num: goal, suffix } = extract(to);
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
      {suffix}
    </span>
  );
}

const statisic = {
  totalVisits: "100,000+",
  visitationSchedule: "1,872",
  todayVisit: 342,
};

export default function StatisticActivitieSection() {
  const { count, lastUpdate } = useDailyRollingCounter();
  const [activities, setActivities] = useState<IGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const response = await getMedia(1, 3);
        setActivities(response.data || []);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className=" px-6">
      <div className="container mx-auto md:px-30 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Thống kê & Hoạt động
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pt-[60px]">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                <div className="text-lg font-semibold text-[#475467]">
                  Lượt khách năm 2024
                </div>
                <div className="text-[30px] font-bold text-[#101828]">
                  <CountOnView
                    to={statisic.totalVisits}
                    className="mt-1 text-3xl font-bold"
                  />
                </div>
              </div>
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
                <div className="text-lg font-semibold text-[#475467]">
                  Mộ đã quy tập
                </div>
                <CountOnView
                  to={statisic.visitationSchedule}
                  className="text-[30px] font-bold text-[#101828]"
                />
              </div>
            </div>

            <div
              className="p-6 rounded-lg shadow-md text-white mb-8 bg-cover bg-center"
              style={{ backgroundImage: `url(${BgStatistic.src})` }}
            >
              <div className="text-xl">Lượt thăm viếng hôm nay</div>

              <div className="flex items-center justify-center">
                <CountOnView
                  to={count}
                  className="text-[64px] text-[#FAC515] font-bold"
                />
                <span className="text-4xl text-white font-bold pl-4">Lượt</span>
              </div>

              <div className="text-lg mt-2">
                {lastUpdate
                  ? `Cập nhật lúc ${lastUpdate.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}, ${lastUpdate.toLocaleDateString("vi-VN")}`
                  : "Chưa có cập nhật"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center w-full  mt-10 lg:mt-0"></div>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-gray-500">Đang tải...</div>
              </div>
            ) : activities.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-gray-500">Chưa có hoạt động nào</div>
              </div>
            ) : (
              activities.map((item) => {
                const firstImage =
                  item.images && item.images.length > 0 ? item.images[0] : null;
                return (
                  <Link
                    key={item.id}
                    href={`/media/${item.id}`}
                    className="block bg-white p-4 rounded-xl border border-[#D0D5DD] hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex gap-x-4 items-start">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        {firstImage ? (
                          <Image
                            src={firstImage}
                            alt={item.title}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#087443] flex items-center justify-center">
                            <Calendar color="white" size={32} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-start">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div className="font-semibold text-left text-lg line-clamp-2 leading-5">
                            {item.title}
                          </div>
                          <div className="text-sm text-[#475467] mt-1 sm:mt-0 text-left">
                            {item.time
                              ? new Date(item.time).toLocaleDateString("vi-VN")
                              : ""}
                          </div>
                        </div>

                        <p className="mt-2 text-[#475467] text-left text-base line-clamp-3 leading-5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
            <div className="flex justify-center mt-6">
              <Link
                href="/media"
                className="px-6 py-2 rounded-lg bg-blue-100 text-blue-600 
               font-semibold hover:bg-blue-200 transition"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
