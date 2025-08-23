import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  CalendarCheck,
  MessageCircleHeart,
  Users,
  Gift,
  BookOpen,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

const features: Feature[] = [
  {
    title: "Tra cứu mộ Liệt sĩ",
    description: "Tìm kiếm thông tin mộ Liệt sĩ theo tên, quê quán, đơn vị",
    icon: Search,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Đăng ký viếng trực tuyến",
    description: "Đăng ký lịch viếng mộ Liệt sĩ theo tên, quê quán, đơn vị",
    icon: CalendarCheck,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Gửi lời tri ân",
    description: "Để lại lời tri ân, tưởng nhớ các Anh hùng Liệt sĩ",
    icon: MessageCircleHeart,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Nhắn tìm đồng đội",
    description: "Kết nối với chiến hữu, tìm kiếm thông tin đồng đội",
    icon: Users,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Đặt lễ trực tuyến",
    description: "Đặt hoa, lễ vật viếng online, thanh toán tiện lợi",
    icon: Gift,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Sổ vàng tri ân",
    description: "Ghi lại những câu chuyện, kỷ niệm về Anh hùng Liệt sĩ",
    icon: BookOpen,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-30 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Gắn kết & Tri ân
        </h2>
        <p className="mt-3 text-gray-600 max-w-full mx-auto">
          Hệ thống tích hợp đầy đủ các tiện ích hỗ trợ thân nhân và người dân trong
          việc tưởng niệm, tri ân các Anh hùng Liệt sĩ
        </p>

        {/* Grid chức năng */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
