"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SERVICE_ITEM_MODE_QTY,
  SERVICE_ITEM_PRICING_TYPE,
} from "@/constants/service-item";
import { useCart } from "@/contexts/CartContext";
import { TServiceItem } from "@/types/offerings";
import { formatPrice } from "@/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { toast } from "react-toastify";

interface OfferingDetailClientProps {
  serviceItem: TServiceItem;
}

export default function OfferingDetailClient({
  serviceItem,
}: OfferingDetailClientProps) {
  const [quantity, setQuantity] = React.useState<number | string>(1);
  const [selectedPrice, setSelectedPrice] = React.useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [slideDirection, setSlideDirection] = React.useState<
    "left" | "right" | null
  >(null);
  const { addToCart } = useCart();

  // Initialize selected price when serviceItem loads
  React.useEffect(() => {
    if (serviceItem) {
      if (
        serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.FIXED &&
        serviceItem.unitPrice
      ) {
        // Fixed pricing
        setSelectedPrice(serviceItem.unitPrice);
      } else if (
        serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.CHOICES &&
        serviceItem.priceChoices &&
        serviceItem.priceChoices.length > 0
      ) {
        // Choices pricing - select first option
        setSelectedPrice(serviceItem.priceChoices[0]);
      } else if (
        serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY &&
        serviceItem.minPrice
      ) {
        // Min only pricing - start with min price
        setSelectedPrice(serviceItem.minPrice);
      }
    }
  }, [serviceItem]);

  const handleQuantityChange = (newQuantity: number) => {
    if (serviceItem) {
      let maxQty = 1;

      if (
        serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.FIXED &&
        serviceItem.fixedQty
      ) {
        // Fixed quantity
        maxQty = serviceItem.fixedQty;
      } else if (
        serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.CHOICES &&
        serviceItem.choicesQty &&
        serviceItem.choicesQty.length > 0
      ) {
        // Choices quantity - use max from choices
        maxQty = Math.max(...serviceItem.choicesQty);
      } else if (
        serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.RANGE &&
        serviceItem.maxQty
      ) {
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
      if (
        serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY &&
        serviceItem.minPrice &&
        selectedPrice < serviceItem.minPrice
      ) {
        alert(`Giá phải ≥ ${formatPrice(serviceItem.minPrice)}`);
        return;
      }

      // Create a modified service item with the selected price
      const cartItem = {
        ...serviceItem,
        unitPrice: selectedPrice,
      };
      const qty =
        typeof quantity === "string" ? parseInt(quantity) || 1 : quantity;
      const result = addToCart(cartItem, qty);

      // Show appropriate toast message
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleBuyNow = () => {
    if (serviceItem && selectedPrice !== null) {
      // Validate min price for MIN_ONLY pricing type
      if (
        serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.MIN_ONLY &&
        serviceItem.minPrice &&
        selectedPrice < serviceItem.minPrice
      ) {
        alert(`Giá phải ≥ ${formatPrice(serviceItem.minPrice)}`);
        return;
      }

      // Create a modified service item with the selected price
      const cartItem = {
        ...serviceItem,
        unitPrice: selectedPrice,
      };
      const qty =
        typeof quantity === "string" ? parseInt(quantity) || 1 : quantity;
      const result = addToCart(cartItem, qty);

      // Show appropriate toast message
      if (result.success) {
        toast.success(result.message);
        // Redirect to cart page
        window.location.href = "/cart";
      } else {
        toast.error(result.message);
      }
    }
  };

  // Helper function to check if quantity is valid
  const isQuantityValid = () => {
    if (quantity === "" || quantity === null || quantity === undefined) {
      return false;
    }

    const qty = typeof quantity === "string" ? parseInt(quantity) : quantity;
    if (isNaN(qty) || qty < 1) {
      return false;
    }

    if (serviceItem) {
      if (
        serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.FIXED &&
        serviceItem.fixedQty
      ) {
        return qty === serviceItem.fixedQty;
      } else if (
        serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.CHOICES &&
        serviceItem.choicesQty
      ) {
        return serviceItem.choicesQty.includes(qty);
      } else if (serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.RANGE) {
        return (
          qty >= (serviceItem.minQty || 1) && qty <= (serviceItem.maxQty || 100)
        );
      }
    }

    return true;
  };

  // Get multiple images for the product
  const getProductImages = () => {
    if (!serviceItem) return [];

    const images: string[] = [];

    if (serviceItem.avatarUrl) {
      images.push(serviceItem.avatarUrl);
    }

    if (serviceItem.imagesUrl && Array.isArray(serviceItem.imagesUrl)) {
      images.push(...serviceItem.imagesUrl);
    }

    return images;
  };

  const productImages = getProductImages();

  // Reset slide direction after animation
  React.useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => {
        setSlideDirection(null);
      }, 400); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  // Navigation functions for image slider
  const goToPreviousImage = () => {
    setSlideDirection("left");
    setSelectedImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setSlideDirection("right");
    setSelectedImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  // Handle thumbnail click with slide direction
  const handleThumbnailClick = (index: number) => {
    if (index === selectedImageIndex) return;

    const direction = index > selectedImageIndex ? "right" : "left";
    setSlideDirection(direction);
    setSelectedImageIndex(index);
  };

  return (
    <div className="container mx-auto lg:px-30 px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Product Image */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-gray-200 group">
            <motion.div
              key={selectedImageIndex}
              initial={{
                x:
                  slideDirection === "right"
                    ? "100%"
                    : slideDirection === "left"
                    ? "-100%"
                    : 0,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={productImages[selectedImageIndex] || "/placeholder.jpg"}
                alt={serviceItem.name}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {productImages.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {selectedImageIndex + 1} / {productImages.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative w-20 h-20 rounded-md border-2 cursor-pointer flex-shrink-0 ${
                    selectedImageIndex === index
                      ? "border-emerald-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-4">
              {serviceItem.name}
            </h1>

            {/* Pricing Type Selection */}
            <div className="mb-4 lg:flex items-center gap-8">
              <Label className="text-lg font-semibold mb-3 block">
                Phân loại
              </Label>
              {serviceItem.pricingType === SERVICE_ITEM_PRICING_TYPE.FIXED &&
              serviceItem.unitPrice ? (
                // Fixed pricing
                <div className="flex items-center gap-2">
                  <Input
                    value={formatPrice(serviceItem.unitPrice)}
                    disabled
                    className="w-40"
                  />
                </div>
              ) : serviceItem.pricingType ===
                  SERVICE_ITEM_PRICING_TYPE.CHOICES &&
                serviceItem.priceChoices ? (
                // Choices pricing - using styled checkboxes like the image
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceItem.priceChoices.map((price, index) => (
                    <div
                      key={index}
                      className={`
                        relative border-2 rounded-lg p-3 cursor-pointer transition-all duration-200
                        ${
                          selectedPrice === price
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-300 hover:border-gray-400"
                        }
                      `}
                      onClick={() => setSelectedPrice(price)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">
                          {formatPrice(price)}
                        </span>
                        {selectedPrice === price && (
                          <div className="ml-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
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
              ) : serviceItem.pricingType ===
                  SERVICE_ITEM_PRICING_TYPE.MIN_ONLY && serviceItem.minPrice ? (
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
                    placeholder={`Tối thiểu ${formatPrice(
                      serviceItem.minPrice
                    )}`}
                    className="w-40"
                  />
                  {selectedPrice !== null &&
                    selectedPrice < serviceItem.minPrice && (
                      <p className="text-sm text-red-500">
                        Vui lòng nhập giá ≥ {formatPrice(serviceItem.minPrice)}
                      </p>
                    )}
                  <p className="text-sm text-muted-foreground">
                    Giá tối thiểu của sản phầm là ≥{" "}
                    {formatPrice(serviceItem.minPrice)}, vui lòng nhập giá ≥{" "}
                    {formatPrice(serviceItem.minPrice)}
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

          {/* Product Specifications */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">Thông số sản phẩm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceItem.weight && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Cân nặng:{" "}
                  </span>
                  <span className="text-lg font-semibold text-emerald-700">
                    {serviceItem.weight}g
                  </span>
                </div>
              )}
              {serviceItem.size && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Kích thước:{" "}
                  </span>
                  <span className="text-lg font-semibold text-emerald-700">
                    {serviceItem.size} (cm)
                  </span>
                </div>
              )}
              {serviceItem.quantityShow && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Số lượng đã đặt:{" "}
                  </span>
                  <span className="text-lg font-semibold text-emerald-700">
                    {serviceItem.quantityShow} sản phẩm
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Quantity Selection */}
          <div className="flex items-center gap-8">
            <Label className="text-lg font-semibold mb-3 block">Số lượng</Label>
            {serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.FIXED &&
            serviceItem.fixedQty ? (
              // Fixed quantity
              <div className="flex items-center gap-2">
                <Input
                  value={serviceItem.fixedQty}
                  disabled
                  className="w-20 text-center"
                />
              </div>
            ) : serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.CHOICES &&
              serviceItem.choicesQty ? (
              // Choices quantity - using styled checkboxes like the image
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceItem.choicesQty.map((qty, index) => (
                  <div
                    key={index}
                    className={`
                      relative border-2 rounded-lg py-1 px-4 box-border cursor-pointer transition-all duration-200
                      ${
                        quantity === qty
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-300 hover:border-gray-400"
                      }
                    `}
                    onClick={() => setQuantity(qty)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{qty}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : serviceItem.modeQty === SERVICE_ITEM_MODE_QTY.RANGE ? (
              // Range quantity
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleQuantityChange((quantity as number) - 1)
                    }
                    disabled={(quantity as number) <= (serviceItem.minQty || 1)}
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
                    onClick={() =>
                      handleQuantityChange((quantity as number) + 1)
                    }
                    disabled={
                      (quantity as number) >= (serviceItem.maxQty || 100)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Nhập số lượng từ {serviceItem.minQty || 1} đến{" "}
                  {serviceItem.maxQty || 100}
                </p>
              </div>
            ) : (
              // Default quantity selection
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange((quantity as number) - 1)}
                  disabled={(quantity as number) <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  min={1}
                  max={serviceItem.stockQuantity || 1}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange((quantity as number) + 1)}
                  disabled={
                    (quantity as number) >= (serviceItem.stockQuantity || 1)
                  }
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
                {formatPrice(
                  (selectedPrice || serviceItem.unitPrice || 0) *
                    (typeof quantity === "string"
                      ? parseInt(quantity) || 1
                      : quantity)
                )}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={
                selectedPrice === null ||
                !isQuantityValid() ||
                (serviceItem.pricingType ===
                  SERVICE_ITEM_PRICING_TYPE.MIN_ONLY &&
                  serviceItem.minPrice &&
                  selectedPrice !== null &&
                  selectedPrice < serviceItem.minPrice) ||
                false
              }
              className="hover:cursor-pointer bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Thêm vào giỏ hàng
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={
                selectedPrice === null ||
                !isQuantityValid() ||
                (serviceItem.pricingType ===
                  SERVICE_ITEM_PRICING_TYPE.MIN_ONLY &&
                  serviceItem.minPrice &&
                  selectedPrice !== null &&
                  selectedPrice < serviceItem.minPrice) ||
                false
              }
              variant="outline"
              className="hover:cursor-pointer border-emerald-700 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Đặt ngay
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
