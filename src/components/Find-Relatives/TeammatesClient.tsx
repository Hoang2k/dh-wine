"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Calendar, 
    User, 
    ArrowRight, 
    Clock,
    Eye,
    Share2,
    BookOpen,
    TrendingUp,
    Star,
    Heart,
    Plus,
    Users,
    MapPin,
    Briefcase,
    Shield,
    Flag,
    Cross,
    Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for martyrs/comrades search
const martyrsData = [
    {
        id: 1,
        slug: "tim-dong-doi-nguyen-van-anh",
        title: "Tìm đồng đội Nguyễn Văn Anh - Sư đoàn 316",
        content: "Tìm kiếm thông tin về đồng đội Nguyễn Văn Anh, Thiếu úy thuộc Sư đoàn 316, hy sinh năm 1979 trong chiến dịch Vị Xuyên. Anh đã được phong tặng danh hiệu Anh hùng lực lượng vũ trang...",
        author: "Gia đình Nguyễn Văn Anh",
        publishedAt: "2024-01-15",
        readTime: "3 phút",
        views: 1250,
        category: "Tìm đồng đội",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
        location: "Hà Nội",
        teamSize: "Sư đoàn 316",
        skills: ["Thiếu úy", "Anh hùng", "Huân chương Quân công"],
        featured: true,
        rank: "Thiếu úy",
        unit: "Sư đoàn 316",
        birthYear: 1955,
        deathYear: 1979,
        hometown: "Hà Nội",
        graveLocation: "Khu A - Hàng 15 - Mộ 23",
        status: "Đã tìm thấy",
        lastSeen: "Chiến dịch Vị Xuyên",
        achievements: ["Anh hùng lực lượng vũ trang", "Huân chương Quân công hạng Nhì"]
    },
    {
        id: 2,
        slug: "tim-dong-doi-tran-van-binh",
        title: "Tìm đồng đội Trần Văn Bình - Trung đoàn 174",
        content: "Tìm kiếm thông tin về đồng đội Trần Văn Bình, Trung sĩ thuộc Tiểu đoàn 2 - Trung đoàn 174, hy sinh năm 1984 tại điểm cao 468. Anh đã được tặng thưởng Huân chương Chiến công hạng Ba...",
        author: "Gia đình Trần Văn Bình",
        publishedAt: "2024-01-12",
        readTime: "2 phút",
        views: 890,
        category: "Tìm đồng đội",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center",
        location: "Hải Phòng",
        teamSize: "Tiểu đoàn 2",
        skills: ["Trung sĩ", "Huân chương Chiến công"],
        featured: false,
        rank: "Trung sĩ",
        unit: "Tiểu đoàn 2 - Trung đoàn 174",
        birthYear: 1958,
        deathYear: 1984,
        hometown: "Hải Phòng",
        graveLocation: "Khu B - Hàng 8 - Mộ 45",
        status: "Đã tìm thấy",
        lastSeen: "Điểm cao 468",
        achievements: ["Huân chương Chiến công hạng Ba"]
    },
    {
        id: 3,
        slug: "tim-dong-doi-le-thi-cam",
        title: "Tìm đồng đội Lê Thị Cẩm - Bệnh viện dã chiến 211",
        content: "Tìm kiếm thông tin về đồng đội Lê Thị Cẩm, Y sĩ thuộc Bệnh viện dã chiến 211, hy sinh năm 1985 tại trạm cứu thương tiền tuyến. Chị đã được tặng thưởng Huân chương Lao động hạng Nhì...",
        author: "Gia đình Lê Thị Cẩm",
        publishedAt: "2024-01-10",
        readTime: "4 phút",
        views: 1100,
        category: "Tìm đồng đội",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop&crop=center",
        location: "Đà Nẵng",
        teamSize: "Bệnh viện dã chiến",
        skills: ["Y sĩ", "Huân chương Lao động"],
        featured: false,
        rank: "Y sĩ",
        unit: "Bệnh viện dã chiến 211",
        birthYear: 1960,
        deathYear: 1985,
        hometown: "Đà Nẵng",
        graveLocation: "Khu C - Hàng 12 - Mộ 67",
        status: "Đã tìm thấy",
        lastSeen: "Trạm cứu thương tiền tuyến",
        achievements: ["Huân chương Lao động hạng Nhì"]
    },
    {
        id: 4,
        slug: "tim-dong-doi-pham-van-duc",
        title: "Tìm đồng đội Phạm Văn Đức - Đại đội 3",
        content: "Tìm kiếm thông tin về đồng đội Phạm Văn Đức, Hạ sĩ thuộc Đại đội 3 - Tiểu đoàn 1, hy sinh năm 1982 trong trận đánh đồi 468. Anh đã được tặng thưởng Huân chương Chiến công hạng Nhì...",
        author: "Gia đình Phạm Văn Đức",
        publishedAt: "2024-01-08",
        readTime: "3 phút",
        views: 750,
        category: "Tìm đồng đội",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
        location: "Cần Thơ",
        teamSize: "Đại đội 3",
        skills: ["Hạ sĩ", "Huân chương Chiến công"],
        featured: false,
        rank: "Hạ sĩ",
        unit: "Đại đội 3 - Tiểu đoàn 1",
        birthYear: 1957,
        deathYear: 1982,
        hometown: "Cần Thơ",
        graveLocation: "Khu A - Hàng 20 - Mộ 89",
        status: "Đã tìm thấy",
        lastSeen: "Trận đánh đồi 468",
        achievements: ["Huân chương Chiến công hạng Nhì"]
    },
    {
        id: 5,
        slug: "tim-dong-doi-hoang-van-em",
        title: "Tìm đồng đội Hoàng Văn Em - Đại đội 5",
        content: "Tìm kiếm thông tin về đồng đội Hoàng Văn Em, Thượng sĩ thuộc Đại đội 5 - Tiểu đoàn 2, hy sinh năm 1981 trong chiến dịch phản công. Anh đã được phong tặng danh hiệu Anh hùng lực lượng vũ trang...",
        author: "Gia đình Hoàng Văn Em",
        publishedAt: "2024-01-05",
        readTime: "4 phút",
        views: 980,
        category: "Tìm đồng đội",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&crop=center",
        location: "Quảng Ninh",
        teamSize: "Đại đội 5",
        skills: ["Thượng sĩ", "Anh hùng", "Huân chương Quân công"],
        featured: true,
        rank: "Thượng sĩ",
        unit: "Đại đội 5 - Tiểu đoàn 2",
        birthYear: 1953,
        deathYear: 1981,
        hometown: "Quảng Ninh",
        graveLocation: "Khu B - Hàng 5 - Mộ 12",
        status: "Đã tìm thấy",
        lastSeen: "Chiến dịch phản công",
        achievements: ["Anh hùng lực lượng vũ trang", "Huân chương Quân công hạng Ba"]
    }
];

export default function TeammatesClient() {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 mb-10 lg:px-30 py-6 md:py-10">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm đồng đội</h1>
                            <p className="text-gray-600">Tìm kiếm thông tin về các anh hùng liệt sĩ đã hy sinh vì Tổ quốc</p>
                        </div>
                        <Button 
                            size="lg" 
                            className="bg-[#087443] hover:bg-[#065a33] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            asChild
                        >
                            <Link href="/find-relatives/create">
                                <Plus className="h-5 w-5 mr-2" />
                                Đăng bài tìm đồng đội
                            </Link>
                        </Button>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#087443]/10 rounded-lg flex items-center justify-center">
                                    <Users className="h-5 w-5 text-[#087443]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{martyrsData.length}</p>
                                    <p className="text-sm text-gray-600">Bài đăng</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">12</p>
                                    <p className="text-sm text-gray-600">Đơn vị</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Heart className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">156</p>
                                    <p className="text-sm text-gray-600">Kết nối thành công</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {martyrsData.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
                                {/* Image - Clickable */}
                                <Link href={`/nhan-tim-dong-doi/${post.slug}`} className="block">
                                    <div className="relative h-48 overflow-hidden cursor-pointer">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-[#087443] text-white border-0">
                                                {post.category}
                                            </Badge>
                                        </div>
                                        {post.featured && (
                                            <div className="absolute top-4 right-4">
                                                <Badge className="bg-yellow-500 text-white border-0">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    Anh hùng
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <CardContent className="p-6">
                                    {/* Title - Clickable */}
                                    <Link href={`/nhan-tim-dong-doi/${post.slug}`} className="block">
                                        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-[#087443] transition-colors cursor-pointer hover:underline">
                                            {post.title}
                                        </h3>
                                    </Link>

                                    {/* Content Preview */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                        {post.content}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {post.skills.slice(0, 3).map((skill, skillIndex) => (
                                            <Badge key={skillIndex} variant="outline" className="text-xs border-[#087443] text-[#087443]">
                                                {skill}
                                            </Badge>
                                        ))}
                                        {post.skills.length > 3 && (
                                            <Badge variant="outline" className="text-xs border-[#087443] text-[#087443]">
                                                +{post.skills.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <User className="h-4 w-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin className="h-4 w-4" />
                                            <span>{post.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Shield className="h-4 w-4" />
                                            <span>{post.teamSize}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(post.publishedAt)}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Button 
                                        className="w-full bg-[#087443] hover:bg-[#065a33] text-white"
                                        asChild
                                    >
                                        <Link href={`/nhan-tim-dong-doi/${post.slug}`}>
                                            Xem chi tiết
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-8">
                    <Button 
                        variant="outline" 
                        size="lg"
                        className="px-8 py-3 border-[#087443] text-[#087443] hover:bg-[#087443] hover:text-white"
                    >
                        Xem thêm bài đăng
                    </Button>
                </div>
            </div>
        </div>
    );
}
