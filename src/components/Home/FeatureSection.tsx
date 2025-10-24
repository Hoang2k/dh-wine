import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  CalendarCheck,
  Gift,
  BookOpen,
  Users,
  MessageCircleHeart,
  Newspaper,
  Images,
} from "lucide-react";
import Link from "next/link";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  path: string;
};

const features: Feature[] = [
  {
    title: "Tra cứu mộ Liệt sĩ",
    description: "Tìm kiếm thông tin mộ Liệt sĩ theo tên, quê quán, đơn vị",
    icon: Search,
    color: "bg-green-100 text-green-600",
    path: "/tra-cuu",
  },
  {
    title: "Đăng ký viếng trực tuyến",
    description: "Đăng ký lịch viếng mộ Liệt sĩ theo tên, quê quán, đơn vị",
    icon: CalendarCheck,
    color: "bg-purple-100 text-purple-600",
    path: "/dat-lich-vieng",
  },
  {
    title: "Đặt lễ trực tuyến",
    description: "Đặt hoa, lễ vật viếng online, thanh toán tiện lợi",
    icon: Gift,
    color: "bg-blue-100 text-blue-600",
    path: "/",
  },
  {
    title: "Tin tức & Sự kiện",
    description:
      "Cập nhật tin tức, hoạt động tưởng niệm, sự kiện tri ân mới nhất",
    icon: Newspaper,
    color: "bg-cyan-100 text-cyan-600",
    path: "/tin-tuc",
  },
  {
    title: "Hình ảnh, Video nổi bật",
    description:
      "Bộ sưu tập ảnh và video về các sự kiện tại Nghĩa trang Liệt sĩ Vị Xuyên",
    icon: Images,
    color: "bg-orange-100 text-orange-600",
    path: "/media",
  },
  {
    title: "Sổ vàng tri ân",
    description: "Ghi lại những đóng góp từ các nhà hảo tâm, tổ chức, cá nhân",
    icon: BookOpen,
    color: "bg-yellow-100 text-yellow-600",
    path: "/so-vang",
  },
];

export default function FeatureSection() {
  return (
    <section className="px-6 py-8">
      <div className="container mx-auto md:px-30 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Tiện ích nổi bật
        </h2>
        <p className="mt-3 text-gray-600 max-w-full mx-auto">
          Hệ thống tích hợp đầy đủ các tiện ích hỗ trợ thân nhân và người dân
          trong việc tra cứu, tưởng niệm, tri ân các Anh hùng Liệt sĩ
        </p>

        {/* Grid chức năng */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link key={idx} href={feature.path} className="block group">
                <Card
                  key={idx}
                  className="border border-gray-200 hover:shadow-lg transition"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${feature.color} mb-4`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
