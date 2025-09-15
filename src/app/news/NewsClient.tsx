"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
    Search, 
    Calendar, 
    User, 
    ArrowRight, 
    Filter,
    Clock,
    Eye,
    Share2,
    BookOpen
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for news articles
const mockNews = [
    {
        id: 1,
        title: "Hướng dẫn chuẩn bị lễ cúng giỗ đầy đủ và ý nghĩa",
        excerpt: "Lễ cúng giỗ là một nghi lễ quan trọng trong văn hóa Việt Nam, thể hiện lòng hiếu thảo và tưởng nhớ đến tổ tiên...",
        content: "Lễ cúng giỗ là một nghi lễ quan trọng trong văn hóa Việt Nam, thể hiện lòng hiếu thảo và tưởng nhớ đến tổ tiên. Việc chuẩn bị lễ cúng giỗ cần được thực hiện một cách cẩn thận và đầy đủ để thể hiện sự tôn kính...",
        author: "Nguyễn Văn A",
        publishedAt: "2024-01-15",
        readTime: "5 phút",
        views: 1250,
        category: "Văn hóa",
        image: "https://i1-vnexpress.vnecdn.net/2025/09/12/RFF-1757649346-5203-1757649681.png?w=680&h=0&q=100&dpr=2&fit=crop&s=U1tJoKRfdEz0MjVPQCeM4A",
        featured: true
    },
    {
        id: 2,
        title: "Ý nghĩa của các loại hoa trong lễ cúng viếng",
        excerpt: "Mỗi loại hoa đều mang một ý nghĩa riêng trong lễ cúng viếng, thể hiện tình cảm và sự tôn kính...",
        content: "Mỗi loại hoa đều mang một ý nghĩa riêng trong lễ cúng viếng, thể hiện tình cảm và sự tôn kính đối với người đã khuất...",
        author: "Trần Thị B",
        publishedAt: "2024-01-12",
        readTime: "3 phút",
        views: 890,
        category: "Kiến thức",
        image: "https://i1-vnexpress.vnecdn.net/2025/09/11/dji-0834-1717031881-1717031936-1314-7245-1757590929.jpg?w=240&h=144&q=100&dpr=2&fit=crop&s=F9RMeOAekqMhkGf1XdoFtg",
        featured: false
    },
    {
        id: 3,
        title: "Cách chọn đồ cúng phù hợp theo từng dịp",
        excerpt: "Việc chọn đồ cúng phù hợp không chỉ thể hiện sự tôn kính mà còn phù hợp với từng dịp lễ...",
        content: "Việc chọn đồ cúng phù hợp không chỉ thể hiện sự tôn kính mà còn phù hợp với từng dịp lễ, từ giỗ chạp đến lễ tết...",
        author: "Lê Văn C",
        publishedAt: "2024-01-10",
        readTime: "4 phút",
        views: 1100,
        category: "Hướng dẫn",
        image: "https://i1-vnexpress.vnecdn.net/2025/09/11/dji-0834-1717031881-1717031936-1314-7245-1757590929.jpg?w=240&h=144&q=100&dpr=2&fit=crop&s=F9RMeOAekqMhkGf1XdoFtg",
        featured: false
    },
    {
        id: 4,
        title: "Truyền thống cúng viếng trong các vùng miền Việt Nam",
        excerpt: "Mỗi vùng miền Việt Nam đều có những truyền thống cúng viếng riêng biệt, tạo nên sự đa dạng...",
        content: "Mỗi vùng miền Việt Nam đều có những truyền thống cúng viếng riêng biệt, tạo nên sự đa dạng trong văn hóa...",
        author: "Phạm Thị D",
        publishedAt: "2024-01-08",
        readTime: "6 phút",
        views: 750,
        category: "Văn hóa",
        image: "https://i1-vnexpress.vnecdn.net/2025/09/11/dji-0834-1717031881-1717031936-1314-7245-1757590929.jpg?w=240&h=144&q=100&dpr=2&fit=crop&s=F9RMeOAekqMhkGf1XdoFtg",
        featured: false
    },
    {
        id: 5,
        title: "Những điều cần lưu ý khi tổ chức lễ cúng",
        excerpt: "Tổ chức lễ cúng cần chú ý đến nhiều yếu tố để đảm bảo tính trang nghiêm và ý nghĩa...",
        content: "Tổ chức lễ cúng cần chú ý đến nhiều yếu tố để đảm bảo tính trang nghiêm và ý nghĩa của nghi lễ...",
        author: "Hoàng Văn E",
        publishedAt: "2024-01-05",
        readTime: "4 phút",
        views: 980,
        category: "Hướng dẫn",
        image: "https://i1-vnexpress.vnecdn.net/2025/09/11/dji-0834-1717031881-1717031936-1314-7245-1757590929.jpg?w=240&h=144&q=100&dpr=2&fit=crop&s=F9RMeOAekqMhkGf1XdoFtg",
        featured: false
    },
    {
        id: 6,
        title: "Sự phát triển của dịch vụ cúng viếng hiện đại",
        excerpt: "Dịch vụ cúng viếng hiện đại đã phát triển mạnh mẽ, đáp ứng nhu cầu của xã hội...",
        content: "Dịch vụ cúng viếng hiện đại đã phát triển mạnh mẽ, đáp ứng nhu cầu của xã hội trong thời đại mới...",
        author: "Vũ Thị F",
        publishedAt: "2024-01-03",
        readTime: "5 phút",
        views: 650,
        category: "Tin tức",
        image: "https://i1-vnexpress.vnecdn.net/2025/09/11/dji-0834-1717031881-1717031936-1314-7245-1757590929.jpg?w=240&h=144&q=100&dpr=2&fit=crop&s=F9RMeOAekqMhkGf1XdoFtg",
        featured: false
    }
];

const categories = ["Tất cả", "Văn hóa", "Kiến thức", "Hướng dẫn", "Tin tức"];

export default function NewsClient() {
    const [search, setSearch] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("Tất cả");
    const [filteredNews, setFilteredNews] = React.useState(mockNews);

    React.useEffect(() => {
        let filtered = mockNews;
        
        if (search) {
            filtered = filtered.filter(article => 
                article.title.toLowerCase().includes(search.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                article.content.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        if (selectedCategory !== "Tất cả") {
            filtered = filtered.filter(article => article.category === selectedCategory);
        }
        
        setFilteredNews(filtered);
    }, [search, selectedCategory]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const featuredArticle = filteredNews.find(article => article.featured);
    const regularArticles = filteredNews.filter(article => !article.featured);

    return (
        <div className="min-h-[100dvh]">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(13,110,0,0.05),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(0,110,189,0.05),transparent_50%)]" />
                <div className="container mx-auto px-4 py-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <BookOpen className="h-6 w-6 text-emerald-600" />
                            <Badge variant="secondary" className="text-emerald-700 bg-emerald-100">
                                Tin tức & Kiến thức
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
                            Tin tức & Kiến thức
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Cập nhật những thông tin mới nhất về văn hóa cúng viếng, hướng dẫn chi tiết và kiến thức bổ ích
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter */}
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm bài viết..."
                                className="pl-9 h-12 text-base"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(category)}
                                    size="sm"
                                    className="h-12"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Featured Article */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-12"
                    >
                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl overflow-hidden shadow-xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="relative h-64 lg:h-80">
                                    <Image
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white text-emerald-700 hover:bg-white">
                                            Nổi bật
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-8 text-white">
                                    <div className="flex items-center gap-4 mb-4 text-emerald-100">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">{formatDate(featuredArticle.publishedAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">{featuredArticle.readTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            <span className="text-sm">{featuredArticle.views}</span>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="mb-4 bg-emerald-100 text-emerald-800">
                                        {featuredArticle.category}
                                    </Badge>
                                    <h2 className="text-2xl font-bold mb-4 line-clamp-2">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-emerald-100 mb-6 line-clamp-3">
                                        {featuredArticle.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span className="text-sm">{featuredArticle.author}</span>
                                        </div>
                                        <Button variant="secondary" size="sm" className="bg-white text-emerald-700 hover:bg-emerald-50">
                                            Đọc thêm
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Two Column Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Left Column - 70% */}
                    <div className="lg:col-span-8 space-y-6">
                        <h2 className="text-2xl font-bold text-emerald-900 mb-6">Tin tức mới nhất</h2>
                        {regularArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-80 h-48 md:h-40 overflow-hidden">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-white text-emerald-700 hover:bg-white">
                                                    {article.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardContent className="p-6 flex-1">
                                            <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{formatDate(article.publishedAt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{article.readTime}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    <span>{article.views}</span>
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <User className="h-3 w-3" />
                                                    <span>{article.author}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column - 20% */}
                    <div className="lg:col-span-4 space-y-6">
                        <h2 className="text-xl font-bold text-emerald-900 mb-6">Tin tức khác</h2>
                        {regularArticles.slice(0, 4).map((article, index) => (
                            <motion.div
                                key={`sidebar-${article.id}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
                                    <div className="flex flex-col">
                                        <div className="relative h-32 overflow-hidden">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-2 left-2">
                                                <Badge className="bg-white text-emerald-700 hover:bg-white text-xs">
                                                    {article.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                <span>{formatDate(article.publishedAt)}</span>
                                            </div>
                                            <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <User className="h-3 w-3" />
                                                    <span>{article.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Eye className="h-3 w-3" />
                                                    <span>{article.views}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* No Results */}
                {filteredNews.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                            <Search className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Không tìm thấy bài viết nào</h3>
                        <p className="text-muted-foreground mb-6">
                            Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                        </p>
                        <Button
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("Tất cả");
                            }}
                            variant="outline"
                        >
                            Xóa bộ lọc
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
