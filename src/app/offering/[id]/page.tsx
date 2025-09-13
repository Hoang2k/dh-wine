"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShoppingCart, CreditCard, Plus, Minus } from "lucide-react";
import { getServiceItemById } from "@/services/offerings";
import { TServiceItem } from "@/types/offerings";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICE_ITEM_MODE_QTY, SERVICE_ITEM_PRICING_TYPE } from "@/constants/service-item";
import { formatPrice } from "@/utils";

async function getServiceItemData(id: string): Promise<TServiceItem> {
    try {
        // Call actual API
        const response = await getServiceItemById(id);
        console.log("Service item API response:", response);
        return response;
    } catch (error) {
        console.error("Error fetching service item:", error);
        throw error;
    }
}

export default function OfferingDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [quantity, setQuantity] = React.useState<number | string>(1);
    const [selectedPrice, setSelectedPrice] = React.useState<number | null>(null);
    const { addToCart } = useCart();

    const { data: serviceItem, isLoading, error, refetch } = useQuery({
        queryKey: ["service-item", id],
        queryFn: () => getServiceItemData(id),
        retry: 1, // Retry once if API fails
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });

    // Initialize selected price when serviceItem loads
    React.useEffect(() => {
        if (serviceItem) {
            if (serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.FIXED && serviceItem.unitPrice) {
                // Fixed pricing
                setSelectedPrice(serviceItem.unitPrice);
            } else if (serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.CHOICES && serviceItem.priceChoices && serviceItem.priceChoices.length > 0) {
                // Choices pricing - select first option
                setSelectedPrice(serviceItem.priceChoices[0]);
            } else if (serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY && serviceItem.minPrice) {
                console.log("Min only pricing", serviceItem.minPrice);
                // Min only pricing - start with min price
                setSelectedPrice(serviceItem.minPrice);
            }
        }
    }, [serviceItem]);

    const handleQuantityChange = (newQuantity: number) => {
        if (serviceItem) {
            let maxQty = 1;
            
            if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.FIXED && serviceItem.fixedQty) {
                // Fixed quantity
                maxQty = serviceItem.fixedQty;
            } else if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.CHOICES && serviceItem.choicesQty && serviceItem.choicesQty.length > 0) {
                // Choices quantity - use max from choices
                maxQty = Math.max(...serviceItem.choicesQty);
            } else if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.RANGE && serviceItem.maxQty) {
                // Range quantity
                maxQty = serviceItem.maxQty;
            } else if (serviceItem.stockQuantity) {
                // Fallback to stock quantity
                maxQty = serviceItem.stockQuantity;
            }

            if (newQuantity >= 1 && newQuantity <= maxQty) {
                setQuantity(newQuantity);
            }
        }
    };

    const handleAddToCart = () => {
        if (serviceItem && selectedPrice !== null) {
            // Validate min price for MIN_ONLY pricing type
            if (serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY && 
                serviceItem.minPrice && selectedPrice < serviceItem.minPrice) {
                alert(`Giá phải ≥ ${formatPrice(serviceItem.minPrice)}`);
                return;
            }
            
            // Create a modified service item with the selected price
            const cartItem = {
                ...serviceItem,
                unitPrice: selectedPrice
            };
            addToCart(cartItem, quantity as number);
        }
    };

    const handleBuyNow = () => {
        if (serviceItem && selectedPrice !== null) {
            // Validate min price for MIN_ONLY pricing type
            if (serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY && 
                serviceItem.minPrice && selectedPrice < serviceItem.minPrice) {
                alert(`Giá phải ≥ ${formatPrice(serviceItem.minPrice)}`);
                return;
            }
            
            // Create a modified service item with the selected price
            const cartItem = {
                ...serviceItem,
                unitPrice: selectedPrice
            };
            addToCart(cartItem, quantity as number);
            console.log("Added to cart, redirecting...");
            // Redirect to cart page
            window.location.href = "/cart";
        }
    };

    // Helper function to check if quantity is valid
    const isQuantityValid = () => {
        if (quantity === "" || quantity === null || quantity === undefined) {
            return false;
        }
        
        const qty = typeof quantity === 'string' ? parseInt(quantity) : quantity;
        if (isNaN(qty) || qty < 1) {
            return false;
        }

        if (serviceItem) {
            if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.FIXED && serviceItem.fixedQty) {
                return qty === serviceItem.fixedQty;
            } else if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.CHOICES && serviceItem.choicesQty) {
                return serviceItem.choicesQty.includes(qty);
            } else if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.RANGE) {
                return qty >= (serviceItem.minQty || 1) && qty <= (serviceItem.maxQty || 100);
            }
        }
        
        return true;
    };

    if (isLoading) {
        return (
            <div className="min-h-[100dvh]">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="aspect-square bg-gray-200 rounded-lg"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !serviceItem) {
        return (
            <div className="min-h-[100dvh]">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold mb-4">
                            {error ? "Có lỗi xảy ra khi tải sản phẩm" : "Không tìm thấy sản phẩm"}
                        </h1>
                        {error && (
                            <Button onClick={() => refetch()} variant="outline" className="mb-4">
                                Thử lại
                            </Button>
                        )}
                        <Button asChild>
                            <Link href="/offering">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Quay lại danh sách
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh]">
            {/* Header */}
            <div className="container mx-auto px-4 py-6">
                <Button variant="ghost" asChild className="mb-6">
                    <Link href="/offering">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại danh sách
                    </Link>
                </Button>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                            <Image
                                src={serviceItem.imageMedia?.path || "/placeholder.jpg"}
                                alt={serviceItem.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-emerald-900 mb-4">
                                {serviceItem.name}
                            </h1>
                            
                            {/* Pricing Type Selection */}
                            <div className="mb-4">
                                <Label className="text-lg font-semibold mb-3 block">
                                    Chọn loại
                                </Label>
                                {serviceItem.pricingType === 1 && serviceItem.unitPrice ? (
                                    // Fixed pricing
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={formatPrice(serviceItem.unitPrice)}
                                            disabled
                                            className="w-40"
                                        />
                                    </div>
                                ) : serviceItem.pricingType === 2 && serviceItem.priceChoices ? (
                                    // Choices pricing - using styled checkboxes like the image
                                    <div className="grid grid-cols-2 gap-3">
                                        {serviceItem.priceChoices.map((price, index) => (
                                            <div 
                                                key={index}
                                                className={`
                                                    relative border-2 rounded-lg p-3 cursor-pointer transition-all duration-200
                                                    ${selectedPrice === price 
                                                        ? 'border-emerald-500 bg-emerald-50' 
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }
                                                `}
                                                onClick={() => setSelectedPrice(price)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-gray-700">
                                                        {formatPrice(price)}
                                                    </span>
                                                    {selectedPrice === price && (
                                                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                                            <svg 
                                                                className="w-3 h-3 text-white" 
                                                                fill="currentColor" 
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path 
                                                                    fillRule="evenodd" 
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                                                    clipRule="evenodd" 
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY && serviceItem.minPrice ? (
                                    // Min only pricing
                                    <div className="space-y-2">
                                        <Input
                                            type="number"
                                            value={selectedPrice || ""}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                if (e.target.value === "") {
                                                    setSelectedPrice(null);
                                                } else if (!isNaN(value)) {
                                                    setSelectedPrice(value);
                                                }
                                            }}
                                            min={serviceItem.minPrice}
                                            placeholder={`Tối thiểu ${formatPrice(serviceItem.minPrice)}`}
                                            className="w-40"
                                        />
                                                                                {selectedPrice !== null && selectedPrice < serviceItem.minPrice && (
                                            <p className="text-sm text-red-500">
                                                Vui lòng nhập giá ≥ {formatPrice(serviceItem.minPrice)}
                                            </p>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            Giá tối thiểu của sản phầm là ≥ {formatPrice(serviceItem.minPrice)}, vui lòng nhập giá ≥ {formatPrice(serviceItem.minPrice)}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-3xl font-bold text-emerald-600">
                                        {formatPrice(serviceItem.unitPrice || 0)}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Description */}
                        {serviceItem.description && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {serviceItem.description}
                                </p>
                            </div>
                        )}

                        <Separator />

                        {/* Quantity Selection */}
                        <div>
                            <Label className="text-lg font-semibold mb-3 block">
                                Số lượng
                            </Label>
                            {serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.FIXED && serviceItem.fixedQty ? (
                                // Fixed quantity
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={serviceItem.fixedQty}
                                        disabled
                                        className="w-20 text-center"
                                    />
                                </div>
                            ) : serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.CHOICES && serviceItem.choicesQty ? (
                                // Choices quantity
                                <Select
                                    value={quantity.toString()}
                                    onValueChange={(value) => setQuantity(parseInt(value))}
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceItem.choicesQty.map((qty, index) => (
                                            <SelectItem key={index} value={qty.toString()}>
                                                {qty}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.RANGE ? (
                                // Range quantity
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleQuantityChange(quantity as number - 1)}
                                            disabled={quantity as number <= (serviceItem.minQty || 1)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => {
                                                if (e.target.value === "") {
                                                    setQuantity("");
                                                } else {
                                                    const value = parseInt(e.target.value);
                                                    if (!isNaN(value)) {
                                                        handleQuantityChange(value);
                                                    }
                                                }
                                            }}
                                            min={serviceItem.minQty || 1}
                                            max={serviceItem.maxQty || 100}
                                            className="w-20 text-center"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleQuantityChange(quantity as number + 1)}
                                            disabled={quantity as number >= (serviceItem.maxQty || 100)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Nhập số lượng từ {serviceItem.minQty || 1} đến {serviceItem.maxQty || 100}
                                    </p>
                                </div>
                            ) : (
                                // Default quantity selection
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleQuantityChange(quantity as number - 1)}
                                        disabled={quantity as number <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                        min={1}
                                        max={serviceItem.stockQuantity || 1}
                                        className="w-20 text-center"
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleQuantityChange(quantity as number + 1)}
                                        disabled={quantity as number >= (serviceItem.stockQuantity || 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Total Price */}
                        <div className="bg-emerald-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Tổng cộng:</span>
                                <span className="text-2xl font-bold text-emerald-600">
                                    {formatPrice((selectedPrice || serviceItem.unitPrice || 0) * (typeof quantity === 'string' ? parseInt(quantity) || 1 : quantity))}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={handleAddToCart}
                                disabled={selectedPrice === null || !isQuantityValid() || (serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY && serviceItem.minPrice && selectedPrice !== null && selectedPrice < serviceItem.minPrice) || false}
                                className="hover:cursor-pointer w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                size="lg"
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Thêm vào giỏ hàng
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                disabled={selectedPrice === null || !isQuantityValid() || (serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY && serviceItem.minPrice && selectedPrice !== null && selectedPrice < serviceItem.minPrice) || false}
                                variant="outline"
                                className="hover:cursor-pointer w-full border-emerald-700 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                size="lg"
                            >
                                <CreditCard className="h-5 w-5 mr-2" />
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
