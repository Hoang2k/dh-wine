"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
    ArrowLeft,
    Calendar, 
    User, 
    MapPin,
    Shield,
    Phone,
    Mail,
    MessageSquare,
    Heart,
    Share2,
    Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

// Mock data for teammate detail
const teammateDetail = {
    id: 1,
    slug: "tim-dong-doi-nguyen-van-anh",
    title: "Tìm đồng đội Nguyễn Văn Anh - Sư đoàn 316",
    summary: "Tìm kiếm thông tin về đồng đội Nguyễn Văn Anh, Thiếu úy thuộc Sư đoàn 316, hy sinh năm 1979 trong chiến dịch Vị Xuyên.",
    content: `Nguyễn Văn Anh sinh năm 1955 tại Hà Nội, nhập ngũ năm 1973 và được phân công về Sư đoàn 316. Anh đã tham gia nhiều trận đánh quan trọng trong cuộc kháng chiến chống Mỹ cứu nước.

Trong chiến dịch Vị Xuyên năm 1979, anh đã hy sinh anh dũng khi bảo vệ vị trí chiến đấu. Anh được phong tặng danh hiệu Anh hùng lực lượng vũ trang nhân dân và Huân chương Quân công hạng Nhì.

Gia đình và đồng đội luôn mong muốn tìm kiếm thêm thông tin về anh, đặc biệt là những kỷ niệm, hình ảnh và câu chuyện từ những người đã từng chiến đấu cùng anh.

Nếu bạn có bất kỳ thông tin nào về Nguyễn Văn Anh, xin vui lòng liên hệ với chúng tôi để cùng nhau tưởng nhớ và tri ân người anh hùng đã hy sinh vì Tổ quốc.`,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
    rank: "Thiếu úy",
    unit: "Sư đoàn 316",
    birthYear: 1955,
    deathYear: 1979,
    hometown: "Hà Nội",
    graveLocation: "Khu A - Hàng 15 - Mộ 23",
    status: "Đã tìm thấy",
    lastSeen: "Chiến dịch Vị Xuyên",
    achievements: ["Anh hùng lực lượng vũ trang", "Huân chương Quân công hạng Nhì"],
    featured: true,
    publishedAt: "2024-01-15",
    author: "Gia đình Nguyễn Văn Anh"
};

export default function TeammateDetailClient() {
    const params = useParams();
    const [feedback, setFeedback] = React.useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFeedback(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        // Handle save logic here
        console.log("Saving feedback:", feedback);
        alert("Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ lại sớm nhất.");
    };

    const handleCancel = () => {
        setFeedback({
            name: "",
            phone: "",
            email: "",
            message: ""
        });
    };

    return (
        <div className="min-h-screen bg-[#fbfbfb]">
            <div className="container mx-auto px-4 lg:px-30 py-6 md:py-10">
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        href="/posts" 
                        className="inline-flex items-center gap-2 text-[#087443] hover:text-[#065a33] transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh sách
                    </Link>
                </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="overflow-hidden shadow-lg pt-0">
                                {/* Image */}
                                <div className="relative h-64 md:h-80 overflow-hidden">
                                    <Image
                                        src={teammateDetail.image}
                                        alt={teammateDetail.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-[#087443] text-white border-0">
                                            Tìm đồng đội
                                        </Badge>
                                    </div>
                                    {teammateDetail.featured && (
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-yellow-500 text-white border-0">
                                                <Star className="h-3 w-3 mr-1" />
                                                Anh hùng
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-6">
                                    {/* Title */}
                                    <h1 className="text-2xl md:text-3xl font-bold text-[#087443] mb-4">
                                        {teammateDetail.title}
                                    </h1>

                                    {/* Summary */}
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                                        <p className="text-gray-700 font-medium">
                                            {teammateDetail.summary}
                                        </p>
                                    </div>

                                    {/* Content */}
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                            {teammateDetail.content}
                                        </div>
                                    </div>

                                    {/* Military Info */}
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-[#087443]" />
                                                <span className="font-medium">Cấp bậc:</span>
                                                <span>{teammateDetail.rank}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-[#087443]" />
                                                <span className="font-medium">Đơn vị:</span>
                                                <span>{teammateDetail.unit}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-[#087443]" />
                                                <span className="font-medium">Năm sinh - mất:</span>
                                                <span>{teammateDetail.birthYear} - {teammateDetail.deathYear}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-[#087443]" />
                                                <span className="font-medium">Quê quán:</span>
                                                <span>{teammateDetail.hometown}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-[#087443]" />
                                                <span className="font-medium">Vị trí mộ:</span>
                                                <span>{teammateDetail.graveLocation}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-[#087443]" />
                                                <span className="font-medium">Nơi hy sinh:</span>
                                                <span>{teammateDetail.lastSeen}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Thành tích:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {teammateDetail.achievements.map((achievement, index) => (
                                                <Badge key={index} className="bg-[#087443] text-white">
                                                    {achievement}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
            </div>
        </div>
    );
}
