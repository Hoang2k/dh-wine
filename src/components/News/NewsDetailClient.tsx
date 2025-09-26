"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    Calendar, 
    User, 
    ArrowLeft, 
    Clock,
    Eye,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Article {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: string;
    readTime: string;
    views: number;
    category: string;
    image: string;
    featured: boolean;
}

interface NewsDetailClientProps {
    article: Article;
}

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
    }
];

export default function NewsDetailClient({ article }: NewsDetailClientProps) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(0);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const title = article.title;
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
        }
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className="min-h-[100dvh] bg-white">
            {/* Article Content */}
            <div className="px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
                    >
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Back Button */}
                            <Link 
                                href="/tin-tuc" 
                                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Quay lại tin tức
                            </Link>

                            {/* Article Header */}
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="h-5 w-5 text-emerald-600" />
                                <Badge variant="secondary" className="text-emerald-700 bg-emerald-100">
                                    {article.category}
                                </Badge>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6 leading-tight">
                                {article.title}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
                                {article.excerpt}
                            </p>

                            {/* Article Meta */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(article.publishedAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{article.readTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>{article.views} lượt xem</span>
                                </div>
                            </div>

                            <Card className="overflow-hidden shadow-lg mb-8">
                                <div className="relative h-64 md:h-80 lg:h-96">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-8">
                                    <div 
                                        className="prose prose-lg max-w-none prose-headings:text-emerald-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-emerald-800"
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Button
                                        onClick={handleLike}
                                        variant={isLiked ? "default" : "outline"}
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <span>{isLiked ? "Đã thích" : "Thích"}</span>
                                        <span>({likeCount})</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                {/* Related Articles */}
                                <div className="p-6 ">
                                    <h3 className="font-bold text-lg mb-4">Tin liên quan</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-3 border-b-2 border-gray-200 pb-6">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                                                    Hướng dẫn chuẩn bị lễ cúng giỗ
                                                </h4>
                                                <p className="text-xs text-muted-foreground">15/01/2024</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 border-b-2 border-gray-200 pb-6">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                                                    Ý nghĩa của các loại hoa
                                                </h4>
                                                <p className="text-xs text-muted-foreground">12/01/2024</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 border-b-2 border-gray-200 pb-6">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                                                    Cách chọn đồ cúng phù hợp
                                                </h4>
                                                <p className="text-xs text-muted-foreground">10/01/2024</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-4">Bài viết khác</h3>
                                    <div className="space-y-4">
                                        {mockNews.map((article) => (
                                        <div className="flex gap-3 border-b-2 border-gray-200 pb-6" key={article.id}>
                                            <Image src={article.image} alt={article.title} width={64} height={64} className="rounded-lg flex-shrink-0" />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                                                    {article.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">{article.publishedAt}</p>
                                            </div>
                                        </div>
                                        ))}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
