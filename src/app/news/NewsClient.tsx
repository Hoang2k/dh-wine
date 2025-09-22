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
    Heart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for news articles
const mockNews = [
    {
        id: 1,
        slug: "ky-su-dien-nganh-nghe-tiem-nang-voi-moi-sinh-vien-yeu-thich-khoi-tu-nhien",
        title: "Cải táng mộ phần là gì? Quy trình cải táng mộ phần",
        excerpt: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        content: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        author: "Chuyên gia hướng nghiệp",
        publishedAt: "2025-03-25",
        readTime: "5 phút",
        views: 343,
        category: "Tin tức trong tỉnh",
        image: "https://nghiatrangthienduong.com.vn/wp-content/uploads/2024/10/Lua-chon-vi-tri-tot-de-dat-mo.png",
        featured: true
    },
    {
        id: 1,
        slug: "ky-su-dien-nganh-nghe-tiem-nang-voi-moi-sinh-vien-yeu-thich-khoi-tu-nhien",
        title: "Cải táng mộ phần là gì? Quy trình cải táng mộ phần",
        excerpt: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        content: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        author: "Chuyên gia hướng nghiệp",
        publishedAt: "2025-03-25",
        readTime: "5 phút",
        views: 343,
        category: "Tin tức ngoài tỉnh",
        image: "https://nghiatrangthienduong.com.vn/wp-content/uploads/2024/10/Lua-chon-vi-tri-tot-de-dat-mo.png",
        featured: true
    },
    {
        id: 1,
        slug: "ky-su-dien-nganh-nghe-tiem-nang-voi-moi-sinh-vien-yeu-thich-khoi-tu-nhien",
        title: "Cải táng mộ phần là gì? Quy trình cải táng mộ phần",
        excerpt: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        content: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        author: "Chuyên gia hướng nghiệp",
        publishedAt: "2025-03-25",
        readTime: "5 phút",
        views: 343,
        category: "Tin tức trong tỉnh",
        image: "https://nghiatrangthienduong.com.vn/wp-content/uploads/2024/10/Lua-chon-vi-tri-tot-de-dat-mo.png",
        featured: true
    },
    {
        id: 1,
        slug: "ky-su-dien-nganh-nghe-tiem-nang-voi-moi-sinh-vien-yeu-thich-khoi-tu-nhien",
        title: "Cải táng mộ phần là gì? Quy trình cải táng mộ phần",
        excerpt: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        content: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        author: "Chuyên gia hướng nghiệp",
        publishedAt: "2025-03-25",
        readTime: "5 phút",
        views: 343,
        category: "Tin tức trong tỉnh",
        image: "https://nghiatrangthienduong.com.vn/wp-content/uploads/2024/10/Lua-chon-vi-tri-tot-de-dat-mo.png",
        featured: true
    },
    {
        id: 1,
        slug: "ky-su-dien-nganh-nghe-tiem-nang-voi-moi-sinh-vien-yeu-thich-khoi-tu-nhien",
        title: "Cải táng mộ phần là gì? Quy trình cải táng mộ phần",
        excerpt: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        content: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        author: "Chuyên gia hướng nghiệp",
        publishedAt: "2025-03-25",
        readTime: "5 phút",
        views: 343,
        category: "Tin tức ngoài tỉnh",
        image: "https://nghiatrangthienduong.com.vn/wp-content/uploads/2024/10/Lua-chon-vi-tri-tot-de-dat-mo.png",
        featured: true
    },
    {
        id: 1,
        slug: "ky-su-dien-nganh-nghe-tiem-nang-voi-moi-sinh-vien-yeu-thich-khoi-tu-nhien",
        title: "Cải táng mộ phần là gì? Quy trình cải táng mộ phần",
        excerpt: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        content: "Cải táng mộ phần là giai đoạn cuối cùng trong việc mai táng người đã mất. Đây là một phong tục lâu đời của người Việt mang giá trị cốt lõi về tâm linh, truyền thống cũng như cách để con cháu trong gia đình thể hiện lòng tôn kính đối với người đã khuất. Vì vậy, cải táng mộ phần cần phải thực hiện cẩn thận và đúng quy trình để tránh gây ra động mộ. Trong bài viết này hãy cùng tìm hiểu về Cải táng mộ phần là gì? Và quy trình cải táng mộ phần một cách chi tiết nhất!",
        author: "Chuyên gia hướng nghiệp",
        publishedAt: "2025-03-25",
        readTime: "5 phút",
        views: 343,
        category: "Tin tức trong tỉnh",
        image: "https://nghiatrangthienduong.com.vn/wp-content/uploads/2024/10/Lua-chon-vi-tri-tot-de-dat-mo.png",
        featured: true
    }
];

// Career topics
const careerTopics = [
    "Tin tức trong tỉnh",
    "Tin tức ngoài tỉnh",
    "Tin tức tôn giáo",
    "Tin tức nghĩa trang",
    "Tin tức xã hội",
    "Văn hoá"
];

// Featured articles
const featuredArticles = [
    {
        id: 1,
        slug: "mo-hinh-kinh-doanh-la-gi-giai-dap-thac-mac-ve-xay-dung-m",
        title: "Mô hình kinh doanh là gì? Giải đáp thắc mắc về xây dựng m...",
        publishedAt: "12-09-2019",
        views: 19499,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=100&fit=crop&crop=center"
    },
    {
        id: 2,
        slug: "top-nhung-cong-viec-lam-them-tai-nha-hap-dan-nhat",
        title: "Top những công việc làm thêm tại nhà hấp dẫn nhất",
        publishedAt: "15-09-2019",
        views: 152951,
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=150&h=100&fit=crop&crop=center"
    },
    {
        id: 3,
        slug: "trinh-do-van-hoa-la-gi-cach-ghi-trinh-do-van-hoa-trong-so",
        title: "Trình độ văn hóa là gì? Cách ghi trình độ văn hóa trong sơ...",
        publishedAt: "15-09-2019",
        views: 27594,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop&crop=center"
    },
    {
        id: 4,
        slug: "mo-hinh-kinh-doanh-la-gi-giai-dap-thac-mac-ve-xay-dung-m",
        title: "Mô hình kinh doanh là gì? Giải đáp thắc mắc về xây dựng m...",
        publishedAt: "12-09-2019",
        views: 19499,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=100&fit=crop&crop=center"
    },
    {
        id: 4,
        slug: "top-nhung-cong-viec-lam-them-tai-nha-hap-dan-nhat",
        title: "Top những công việc làm thêm tại nhà hấp dẫn nhất",
        publishedAt: "15-09-2019",
        views: 152951,
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=150&h=100&fit=crop&crop=center"
    },
    {
        id: 6,
        slug: "trinh-do-van-hoa-la-gi-cach-ghi-trinh-do-van-hoa-trong-so",
        title: "Trình độ văn hóa là gì? Cách ghi trình độ văn hóa trong sơ...",
        publishedAt: "15-09-2019",
        views: 27594,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop&crop=center"
    }
];

export default function NewsClient() {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 lg:px-30 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Featured Article */}
                            <motion.div
                                key={mockNews[0].id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 md:mb-8"
                            >
                                <Link href={`/tin-tuc/${mockNews[0].slug}`} className="block group">
                                    <div className="bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                                            <Image
                                                src={mockNews[0].image}
                                                alt={mockNews[0].title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4 md:p-6">
                                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                                {mockNews[0].title}
                                            </h1>
                                            <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                                                {mockNews[0].excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        {/* Latest News Section */}
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                                TIN MỚI NHẤT
                            </h2>
                            {mockNews.map((article) => (
                                <motion.div
                                    key={`latest-${article.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="mb-4"
                                >
                                    <Link href={`/tin-tuc/${article.slug}`} className="block group">
                                        <div className="bg-white rounded-lg p-3 md:p-4 shadow-md group-hover:shadow-lg transition-all duration-300">
                                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                                <div className="flex-1">
                                                    <Badge className="bg-blue-100 text-blue-800 text-xs mb-2">
                                                        {article.category}
                                                    </Badge>
                                                    <h3 className="font-bold text-base md:text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                        {article.excerpt}
                                                    </p>
                                                    <div className="text-xs text-gray-500">
                                                        {formatDate(article.publishedAt)} - {article.views} lượt xem
                                                    </div>
                                                </div>
                                                <div className="sm:ml-4 w-32 sm:w-36 md:w-40 sm:flex-shrink-0">
                                                    <div className="relative w-full sm:w-36 md:w-40 h-24 sm:h-28 md:h-32 overflow-hidden rounded">
                                                        <Image
                                                            src={article.image}
                                                            alt={article.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full lg:w-80 xl:w-96 space-y-4 md:space-y-6">
                        {/* Topics Section */}
                        <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">CHỦ ĐỀ</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                {careerTopics.map((topic, index) => (
                                    <div key={index} className="text-xs md:text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                                        {topic}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Featured Articles Section */}
                        <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 border-b border-gray-200 pb-2">
                                BÀI VIẾT NỔI BẬT
                            </h3>
                            <div className="space-y-3 md:space-y-4">
                                {featuredArticles.map((article, index) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/tin-tuc/${article.slug}`} className="block group">
                                            <div className="flex gap-3 group-hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                <div className="relative w-12 h-8 sm:w-16 sm:h-12 overflow-hidden rounded flex-shrink-0">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-xs sm:text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                        {article.title}
                                                    </h4>
                                                    <div className="text-xs text-gray-500">
                                                        {article.publishedAt} - {article.views.toLocaleString()} lượt xem
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
