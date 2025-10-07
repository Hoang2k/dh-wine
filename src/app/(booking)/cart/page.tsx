"use client";

import LogoVNP from "@/assets/image/logovnpay.png";
import BookVisitPaymentModal from "@/components/offering/BookVisitPaymentModal";
import PaymentPopup from "@/components/offering/PaymentPopup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { SERVICE_ITEM_MODE_QTY } from "@/constants/service-item";
import { useCart } from "@/contexts/CartContext";
import { createVNPayPayment, TVNPayCreateRequest } from "@/services/payment";
import { createServiceOrder } from "@/services/service-order";
import { TCartItem } from "@/types/offerings";
import { TServiceOrder, TServiceOrderItem } from "@/types/service-order";
import { motion } from "framer-motion";
import {
  Trash2,
  ShoppingCart,
  CreditCard,
  Plus,
  Minus,
  ArrowLeft,
  CheckSquare,
  Square,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    selectedItems,
    toggleItemSelection,
    selectAllItems,
    deselectAllItems,
    getSelectedItems,
    getTotalQuantity,
    getTotalAmount,
  } = useCart();

  const [showPaymentPopup, setShowPaymentPopup] = React.useState(false);
  const [showBookVisitPaymentModal, setShowBookVisitPaymentModal] =
    React.useState(false);
  const [bookVisitData, setBookVisitData] = React.useState<any>(null);
  const [fromBookVisit, setFromBookVisit] = React.useState(false);
  const [hasNavigatedAway, setHasNavigatedAway] = React.useState(false);

  // Loading states
  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = React.useState<
    string | null
  >(null);
  const [isDeletingItem, setIsDeletingItem] = React.useState<string | null>(
    null
  );
  const [isProcessingPayment, setIsProcessingPayment] = React.useState(false);

  // Check BookVisit flags whenever the component becomes visible
  const checkBookVisitFlags = React.useCallback(() => {
    const isFromBookVisit = localStorage.getItem("fromBookVisit") === "true";
    const savedBookVisitData = localStorage.getItem("bookVisitData");

    if (isFromBookVisit && savedBookVisitData && !hasNavigatedAway) {
      setFromBookVisit(true);
      setBookVisitData(JSON.parse(savedBookVisitData));
    } else {
      setFromBookVisit(false);
      setBookVisitData(null);
    }
  }, [hasNavigatedAway]);

  // Check flags on component mount
  React.useEffect(() => {
    checkBookVisitFlags();
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [checkBookVisitFlags]);

  // Track navigation away from cart
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      setHasNavigatedAway(true);
      // Clear flags when user leaves the cart page
      localStorage.removeItem("fromBookVisit");
      localStorage.removeItem("bookVisitData");
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User navigated away or switched tabs
        setHasNavigatedAway(true);
      } else if (hasNavigatedAway) {
        // User returned, check flags again but respect navigation state
        checkBookVisitFlags();
      }
    };

    const handleFocus = () => {
      if (hasNavigatedAway) {
        // User returned, check flags again but respect navigation state
        checkBookVisitFlags();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [hasNavigatedAway, checkBookVisitFlags]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = async (item: TCartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      // Add validation for RANGE mode like in offering detail
      if (item.service_item.modeQty === SERVICE_ITEM_MODE_QTY.RANGE) {
        const minQty = item.service_item.minQty || 1;
        const maxQty = item.service_item.maxQty || 100;

        if (newQuantity < minQty || newQuantity > maxQty) {
          // Show error message or prevent the change
          alert(`Số lượng phải từ ${minQty} đến ${maxQty}`);
          return;
        }
      }

      setIsUpdatingQuantity(item.service_item.id.toString());
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      updateQuantity(item.service_item.id.toString(), newQuantity);
      setIsUpdatingQuantity(null);
    }
  };

  const handleChoicesQuantityChange = async (
    item: TCartItem,
    newQuantity: number
  ) => {
    setIsUpdatingQuantity(item.service_item.id.toString());
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    updateQuantity(item.service_item.id.toString(), newQuantity);
    setIsUpdatingQuantity(null);
  };

  const handleDeleteItem = async (itemId: string) => {
    setIsDeletingItem(itemId);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    removeFromCart(itemId);
    setIsDeletingItem(null);
  };

  const handlePayment = async (paymentData: any) => {
    setIsProcessingPayment(true);
    try {
      // Prepare order items from selected cart items
      const selectedItems = getSelectedItems();
      const orderItems: TServiceOrderItem[] = selectedItems.map((item) => ({
        serviceId: Number(item.service_item.id),
        quantity: item.quantity,
        unitPrice: Number(item.service_item.unitPrice) || 0,
      }));

      // Prepare order data
      const orderData: TServiceOrder = {
        orderCode: `ORDER-${Date.now()}`,
        groupName:
          paymentData.bookVisitData?.org_name ||
          paymentData.contactName ||
          "Khách hàng",
        contactName:
          paymentData.contactName || paymentData.bookVisitData?.org_name || "",
        contactPhone:
          paymentData.contactPhone || paymentData.bookVisitData?.phone || "",
        note: paymentData.note || "",
        orderItems: orderItems,
        visitRequestId: paymentData.bookVisitData?.id || null,
        siteId: paymentData.siteId || 1,
        scheduledAt: paymentData.bookVisitData
          ? new Date().toISOString()
          : null,
      };

      // Call API to create service order
      const orderResponse = await createServiceOrder(orderData);
      console.log("Service order created: 111", orderResponse);

      // Create VNPay payment after successful order creation
      const paymentRequest: TVNPayCreateRequest = {
        orderId: Number(orderResponse.id),
        returnUrl: `${window.location.origin}/payment/result`,
      };

      const paymentResponse = await createVNPayPayment(paymentRequest);
      console.log("VNPay payment created:", paymentResponse);
      window.location.assign(paymentResponse.paymentUrl);

      // Close modals
      setShowPaymentPopup(false);
      setShowBookVisitPaymentModal(false);

      // Clear the flags after successful payment
      localStorage.removeItem("fromBookVisit");
      localStorage.removeItem("bookVisitData");
      localStorage.removeItem("directFromBookVisit");
      setFromBookVisit(false);
      setBookVisitData(null);
      setHasNavigatedAway(false);

      // Redirect to VNPay payment page
      window.location.href = paymentResponse.paymentUrl;
    } catch (error) {
      console.error("Error creating service order or payment:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentClick = () => {
    // Re-check flags before showing payment modal
    checkBookVisitFlags();

    if (fromBookVisit && !hasNavigatedAway) {
      setShowBookVisitPaymentModal(true);
    } else {
      setShowPaymentPopup(true);
    }
  };

  // Clear BookVisit flags when user cancels BookVisitPaymentModal
  const handleBookVisitModalClose = () => {
    setShowBookVisitPaymentModal(false);
    // Don't clear flags when user just closes the modal
    // Only clear when user explicitly resets or completes payment
  };

  const isAllSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;
  const hasSelectedItems = selectedItems.length > 0;

  // Show loading screen
  if (isPageLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-lg font-medium text-gray-600">
            Đang tải giỏ hàng...
          </p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[100dvh]">
        <div className="container mx-auto lg:px-30 px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/offering">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách sản phẩm
            </Link>
          </Button>

          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
            <p className="text-muted-foreground mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Button asChild>
              <Link href="/offering">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh]">
      {/* Header */}
      <div className="container mx-auto lg:px-30 px-4 py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/offering">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách sản phẩm
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-emerald-900">Giỏ hàng</h1>
          <Badge variant="secondary" className="text-sm">
            {cartItems.length} sản phẩm
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto lg:px-30 px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cart Items List */}
            {/* Column Headers with Select All */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              {/* Column Headers - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-4 mb-4">
                {/* Select All Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="select-all"
                      checked={isAllSelected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          selectAllItems();
                        } else {
                          deselectAllItems();
                        }
                      }}
                    />
                    <Label htmlFor="select-all" className="font-medium">
                      Chọn tất cả ({cartItems.length} sản phẩm)
                    </Label>
                  </div>
                </div>

                {/* Ảnh sản phẩm */}
                <div className="w-16 flex-shrink-0"></div>
                {/* Tên sản phẩm */}
                <div className="flex-1 min-w-0"></div>

                {/* Số lượng */}
                <div className="w-32">
                  <span className="text-sm font-medium text-gray-600">
                    Số lượng
                  </span>
                </div>

                {/* Số tiền */}
                <div className="w-24 text-right">
                  <span className="text-sm font-medium text-gray-600">
                    Số tiền
                  </span>
                </div>

                {/* Thao tác */}
                <div className="w-16 text-center">
                  <span className="text-sm font-medium text-gray-600">
                    Thao tác
                  </span>
                </div>
              </div>

              {/* Select All Controls - Mobile */}
              <div className="md:hidden mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="select-all-mobile"
                      checked={isAllSelected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          selectAllItems();
                        } else {
                          deselectAllItems();
                        }
                      }}
                    />
                    <Label htmlFor="select-all-mobile" className="font-medium">
                      Chọn tất cả ({cartItems.length} sản phẩm)
                    </Label>
                  </div>
                  {hasSelectedItems && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={deselectAllItems}
                    >
                      Bỏ chọn tất cả
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <motion.div
                key={item.service_item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center space-x-4">
                      {/* Checkbox */}
                      <Checkbox
                        id={`item-${item.service_item.id}`}
                        checked={selectedItems.includes(
                          item.service_item.id.toString()
                        )}
                        onCheckedChange={() =>
                          toggleItemSelection(item.service_item.id.toString())
                        }
                      />

                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={
                            item.service_item.imageMedia?.path ||
                            "/placeholder.jpg"
                          }
                          alt={item.service_item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-lg mb-1 line-clamp-2">
                          {item.service_item.name}
                        </h3>
                        <p className="text-emerald-600 font-semibold">
                          {formatPrice(item.service_item.unitPrice || 0)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 w-38">
                        {item.service_item.modeQty ===
                        SERVICE_ITEM_MODE_QTY.FIXED ? (
                          // FIXED mode: disable all controls, show fixed quantity
                          <div className="flex items-center space-x-2">
                            <Input
                              value={item.service_item.fixedQty || 1}
                              disabled
                              className="w-16 text-center bg-gray-100"
                            />
                          </div>
                        ) : item.service_item.modeQty ===
                            SERVICE_ITEM_MODE_QTY.CHOICES &&
                          item.service_item.choicesQty ? (
                          // CHOICES mode: show dropdown with choices
                          <div className="flex items-center space-x-2">
                            <Select
                              value={item.quantity.toString()}
                              onValueChange={(value) =>
                                handleChoicesQuantityChange(
                                  item,
                                  parseInt(value)
                                )
                              }
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {item.service_item.choicesQty.map(
                                  (qty, index) => (
                                    <SelectItem
                                      key={index}
                                      value={qty.toString()}
                                    >
                                      {qty}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          // RANGE mode: normal +/- controls with proper validation
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity - 1)
                                }
                                disabled={
                                  item.quantity <=
                                  (item.service_item.minQty || 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                min={item.service_item.minQty || 1}
                                max={item.service_item.maxQty || 100}
                                className="w-16 text-center"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(item, item.quantity + 1)
                                }
                                disabled={
                                  item.quantity >=
                                  (item.service_item.maxQty || 100)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Nhập số lượng từ {item.service_item.minQty || 1}{" "}
                              đến {item.service_item.maxQty || 100}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Total Price */}
                      <div className="text-right w-24">
                        <p className="font-semibold text-lg">
                          {formatPrice(
                            item.service_item.unitPrice
                              ? item.service_item.unitPrice * item.quantity
                              : 0
                          )}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <div className="w-16 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeleteItem(item.service_item.id.toString())
                          }
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={
                            isDeletingItem === item.service_item.id.toString()
                          }
                        >
                          {isDeletingItem ===
                          item.service_item.id.toString() ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-4">
                      {/* Header with checkbox and delete */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={`item-mobile-${item.service_item.id}`}
                            checked={selectedItems.includes(
                              item.service_item.id.toString()
                            )}
                            onCheckedChange={() =>
                              toggleItemSelection(
                                item.service_item.id.toString()
                              )
                            }
                          />
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={
                                item.service_item.imageMedia?.path ||
                                "/placeholder.jpg"
                              }
                              alt={item.service_item.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeleteItem(item.service_item.id.toString())
                          }
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={
                            isDeletingItem === item.service_item.id.toString()
                          }
                        >
                          {isDeletingItem ===
                          item.service_item.id.toString() ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {/* Product Info */}
                      <div className="ml-8">
                        <h3 className="font-medium text-lg mb-2 line-clamp-2">
                          {item.service_item.name}
                        </h3>
                        <p className="text-emerald-600 font-semibold mb-3">
                          {formatPrice(item.service_item.unitPrice || 0)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mb-3">
                          <label className="text-sm font-medium text-gray-600 mb-2 block">
                            Số lượng:
                          </label>
                          {item.service_item.modeQty ===
                          SERVICE_ITEM_MODE_QTY.FIXED ? (
                            // FIXED mode: disable all controls, show fixed quantity
                            <div className="flex items-center space-x-2">
                              <Input
                                value={
                                  item.service_item.fixedQty || item.quantity
                                }
                                disabled
                                className="w-20 text-center bg-gray-100"
                              />
                            </div>
                          ) : item.service_item.modeQty ===
                              SERVICE_ITEM_MODE_QTY.CHOICES &&
                            item.service_item.choicesQty ? (
                            // CHOICES mode: show dropdown with choices
                            <div className="flex items-center space-x-2">
                              <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) =>
                                  handleChoicesQuantityChange(
                                    item,
                                    parseInt(value)
                                  )
                                }
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {item.service_item.choicesQty.map(
                                    (qty, index) => (
                                      <SelectItem
                                        key={index}
                                        value={qty.toString()}
                                      >
                                        {qty}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            // RANGE mode: normal +/- controls with proper validation
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={
                                    item.quantity <=
                                    (item.service_item.minQty || 1)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item,
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  min={item.service_item.minQty || 1}
                                  max={item.service_item.maxQty || 100}
                                  className="w-20 text-center"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={
                                    item.quantity >=
                                    (item.service_item.maxQty || 100)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Nhập số lượng từ {item.service_item.minQty || 1}{" "}
                                đến {item.service_item.maxQty || 100}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Total Price */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">
                            Tổng cộng:
                          </span>
                          <p className="font-semibold text-lg">
                            {formatPrice(
                              item.service_item.unitPrice
                                ? item.service_item.unitPrice * item.quantity
                                : 0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Thông tin đơn hàng
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Số lượng sản phẩm:</span>
                    <span className="font-medium">
                      {hasSelectedItems ? getTotalQuantity() : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng tiền:</span>
                    <span className="font-bold text-emerald-600 text-lg">
                      {hasSelectedItems
                        ? formatPrice(getTotalAmount())
                        : formatPrice(0)}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Phương thức thanh toán */}
                <div className="mb-6">
                  <p className="font-medium mb-2">Phương thức thanh toán</p>
                  <div className="flex items-center space-x-3">
                    {/* Checkbox tròn mặc định check */}
                    <Checkbox
                      id="vnpay-option"
                      checked
                      className="rounded-full data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Image src={LogoVNP} alt="VNPay" width={80} />
                    <span className="text-sm font-medium text-gray-700">
                      Cổng thanh toán VNPAY
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handlePaymentClick}
                    disabled={!hasSelectedItems || isProcessingPayment}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
                    size="lg"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Thanh toán
                  </Button>

                  <Button variant="outline" asChild className="w-full">
                    <Link href="/offering">Tiếp tục mua sắm</Link>
                  </Button>
                </div>

                {!hasSelectedItems && (
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    Vui lòng chọn ít nhất một sản phẩm để thanh toán
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Popup */}
      <PaymentPopup
        isOpen={showPaymentPopup}
        onClose={() => setShowPaymentPopup(false)}
        onConfirm={handlePayment}
        totalAmount={getTotalAmount()}
        totalQuantity={getTotalQuantity()}
      />

      {/* Book Visit Payment Modal */}
      <BookVisitPaymentModal
        isOpen={showBookVisitPaymentModal}
        onClose={handleBookVisitModalClose}
        onConfirm={handlePayment}
        bookVisitData={bookVisitData}
        totalAmount={getTotalAmount()}
        totalQuantity={getTotalQuantity()}
      />
    </div>
  );
}
