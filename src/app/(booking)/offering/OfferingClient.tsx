"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SERVICE_ITEM_PRICING_TYPE } from "@/constants/service-item";
import { useCart } from "@/contexts/CartContext";
import { getServiceItems } from "@/services/offerings";
import { TServiceItem } from "@/types/offerings";
import { formatPrice } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";


export default function OfferingClient({ items }: { items: TServiceItem[] }) {
  const [searchInput, setSearchInput] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredItems, setFilteredItems] =
    React.useState<TServiceItem[]>(items);
  const [loading, setLoading] = React.useState(false);
  const { addToCart } = useCart();

  const handleSearch = async () => {
    if (searchInput.length === 0) {
      setFilteredItems(items);
      return;
    }
    setLoading(true);
    try {
      const res = await getServiceItems({
        search: searchInput,
        page: 1,
        per_page: 50,
      });
      setFilteredItems(res.data || []);
    } catch (err) {
      setFilteredItems([]);
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (item: TServiceItem) => {
    if (item.pricingType === SERVICE_ITEM_PRICING_TYPE.FIXED) {
      return item.unitPrice;
    } else if (item.pricingType === SERVICE_ITEM_PRICING_TYPE.CHOICES) {
      return item.priceChoices?.[0];
    } else if (item.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY) {
      return item.minPrice;
    }
  };


  return (
    <div className="min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(13,110,0,0.08),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(0,110,189,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
        <div className="container mx-auto md:px-4 py-10 md:py-14 relative items-center justify-center flex">
          <div className="px-8 w-full flex items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full items-center justify-center">
              {/* Input */}
              <div className="relative w-full sm:w-[600px] bg-white rounded-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-9"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                <Button
                  variant="default"
                  onClick={handleSearch}
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 hover:cursor-pointer"
                >
                  Tìm kiếm
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    setSearchQuery(""); 
                    setFilteredItems(items);
                  }}
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-800 hover:cursor-pointer"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-30 pb-20">
        {loading ? (
          <p className="text-center py-12">Đang tìm kiếm...</p>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/offering/${item.id}`} className="block">
                  <Card className="group pt-0 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.avatarUrl || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-emerald-600 font-semibold text-xl">
                        {formatPrice(getPrice(item) || 0)}
                      </p>
                    </CardContent>  
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
