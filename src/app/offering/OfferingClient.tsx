"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Eye } from "lucide-react";
import { getServiceItems } from "@/services/offerings";
import { TServiceItem } from "@/types/offerings";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

async function getServiceItemsData(params: { search?: string; category?: string } = {}) {
    try {
        // Call actual API
        const response = await getServiceItems({
            search: params.search,
            category: params.category,
            page: 1,
            per_page: 50
        });
        console.log("Service items API response:", response);
        return response;
    } catch (error) {
        console.error("Error fetching service items:", error);
        throw error;
    }
}

export default function OfferingClient() {
    const [search, setSearch] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<string>("");
    const { addToCart } = useCart();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["service-items", search, selectedCategory],
        queryFn: () => getServiceItemsData({ search, category: selectedCategory }),
        retry: 1, // Retry once if API fails
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });

    const serviceItems = data?.data || [];
    // Get categories from API data
    const categories = serviceItems.length > 0 
        ? Array.from(new Set(serviceItems.map(item => item.category).filter(Boolean)))
        : [];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="min-h-[100dvh]">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(13,110,0,0.08),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(0,110,189,0.08),transparent_50%)]" />
                <div className="container mx-auto px-4 py-10 md:py-14 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-emerald-900">
                            Sản phẩm cúng viếng
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                            Chọn lựa các sản phẩm cúng viếng chất lượng cao, phù hợp với truyền thống văn hóa Việt Nam
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto px-4 pb-20">
                {/* Search and Filter */}
                <div className="my-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm sản phẩm..."
                            className="pl-9"
                        />
                    </div>
                    {/* Debug info - remove in production */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="text-xs text-muted-foreground">
                            API Status: {isLoading ? 'Loading...' : error ? 'Error' : 'Success'} | 
                            Items: {serviceItems.length}
                        </div>
                    )}
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                variant={selectedCategory === "" ? "default" : "outline"}
                                onClick={() => setSelectedCategory("")}
                                size="sm"
                            >
                                Tất cả
                            </Button>
                            {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category || "")}
                                size="sm"
                            >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Card key={index} className="animate-pulse">
                                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                                <CardContent className="p-4">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">Có lỗi xảy ra khi tải dữ liệu</p>
                        <Button onClick={() => refetch()} variant="outline">
                            Thử lại
                        </Button>
                    </div>
                ) : serviceItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {serviceItems.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="group hover:shadow-lg transition-shadow duration-300">
                                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                                        <Image
                                            src={item.imageMedia?.path || "/placeholder.jpg"}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {item.category && (
                                            <Badge className="absolute top-2 left-2 bg-emerald-600">
                                                {item.category}
                                            </Badge>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-medium text-lg mb-2 line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-emerald-600 font-semibold text-xl mb-3">
                                            {formatPrice(item?.unitPrice || 0)}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button asChild className="flex-1" size="sm">
                                                <Link href={`/offering/${item.id}`}>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Xem chi tiết
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
