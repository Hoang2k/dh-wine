"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    MapPin
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { TCartItem } from "@/types/offerings";
import PaymentPopup from "@/components/offering/PaymentPopup";
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import BookVisitPaymentModal from "@/components/offering/BookVisitPaymentModal";
import { createServiceOrder } from "@/services/service-order";
import { TServiceOrder, TServiceOrderItem } from "@/types/service-order";
import { createVNPayPayment, TVNPayCreateRequest } from "@/services/payment";

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
    const [showBookVisitPaymentModal, setShowBookVisitPaymentModal] = React.useState(false);
    const [bookVisitData, setBookVisitData] = React.useState<any>(null);
    const [fromBookVisit, setFromBookVisit] = React.useState(false);
    const [hasNavigatedAway, setHasNavigatedAway] = React.useState(false);

    // Check BookVisit flags whenever the component becomes visible
    const checkBookVisitFlags = React.useCallback(() => {
        const isFromBookVisit = localStorage.getItem('fromBookVisit') === 'true';
        const savedBookVisitData = localStorage.getItem('bookVisitData');
        
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
    }, [checkBookVisitFlags]);

    // Track navigation away from cart
    React.useEffect(() => {
        const handleBeforeUnload = () => {
            setHasNavigatedAway(true);
            // Clear flags when user leaves the cart page
            localStorage.removeItem('fromBookVisit');
            localStorage.removeItem('bookVisitData');
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

        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
        };
    }, [checkBookVisitFlags, hasNavigatedAway]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleQuantityChange = (item: TCartItem, newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(item.service_item.id, newQuantity);
        }
    };

    const handleDeleteItem = (itemId: string) => {
        removeFromCart(itemId);
    };

    const handlePayment = async (paymentData: any) => {
        try {
            // Prepare order items from selected cart items
            const selectedItems = getSelectedItems();
            const orderItems: TServiceOrderItem[] = selectedItems.map(item => ({
                serviceId: Number(item.service_item.id),
                quantity: item.quantity,
                unit: item.service_item.unit,
                unitPrice: Number(item.service_item.unitPrice) || 0,
                totalAmount: (Number(item.service_item.unitPrice) || 0) * item.quantity,
            }));

            // Prepare order data
            const orderData: TServiceOrder = {
                orderCode: `ORDER-${Date.now()}`,
                groupName: paymentData.bookVisitData?.org_name || paymentData.contactName || 'Khách hàng',
                contactName: paymentData.contactName || paymentData.bookVisitData?.org_name || '',
                contactPhone: paymentData.contactPhone || paymentData.bookVisitData?.phone || '',
                note: paymentData.note || '',
                orderItems: orderItems,
                totalAmount: getTotalAmount(),
                visitRequestId: paymentData.bookVisitData?.id || null,
                siteId: paymentData.siteId || 1,
                scheduledAt: paymentData.bookVisitData ? new Date().toISOString() : null,
            };

            // Call API to create service order
            const orderResponse = await createServiceOrder(orderData);
            console.log("Service order created: 111", orderResponse);

            // Create VNPay payment after successful order creation
            const paymentRequest: TVNPayCreateRequest = {
                orderId: Number(orderResponse.id),
                returnUrl: `${window.location.origin}/payment/result`
            };

            const paymentResponse = await createVNPayPayment(paymentRequest);
            console.log("VNPay payment created:", paymentResponse);
            window.location.assign(paymentResponse.paymentUrl);

            // Close modals
            setShowPaymentPopup(false);
            setShowBookVisitPaymentModal(false);

            // Clear the flags after successful payment
            localStorage.removeItem('fromBookVisit');
            localStorage.removeItem('bookVisitData');
            localStorage.removeItem('directFromBookVisit');
            setFromBookVisit(false);
            setBookVisitData(null);
            setHasNavigatedAway(false);

            // Redirect to VNPay payment page
            window.location.href = paymentResponse.paymentUrl;

        } catch (error) {
            console.error("Error creating service order or payment:", error);
            alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
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

    const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;
    const hasSelectedItems = selectedItems.length > 0;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[100dvh]">
                <div className="container mx-auto px-4 py-8">
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
                            <Link href="/offering">
                                Tiếp tục mua sắm
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
            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Select All */}
                        <Card>
                            <CardContent className="p-4">
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
                            </CardContent>
                        </Card>

                        {/* Cart Items List */}
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.service_item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-4">
                                            {/* Checkbox */}
                                            <Checkbox
                                                id={`item-${item.service_item.id}`}
                                                checked={selectedItems.includes(item.service_item.id)}
                                                onCheckedChange={() => toggleItemSelection(item.service_item.id)}
                                            />

                                            {/* Product Image */}
                                            <div className="relative w-16 h-16 flex-shrink-0">
                                                <Image
                                                    src={item.service_item.imageMedia?.path || "/placeholder.jpg"}
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
                                                {item.service_item.category && (
                                                    <Badge variant="secondary" className="text-xs mb-2">
                                                        {item.service_item.category}
                                                    </Badge>
                                                )}
                                                <p className="text-emerald-600 font-semibold">
                                                    {formatPrice(item.service_item.unitPrice)}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                                                    min={1}
                                                    className="w-16 text-center"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Total Price */}
                                            <div className="text-right">
                                                <p className="font-semibold text-lg">
                                                    {formatPrice(item.service_item.unitPrice * item.quantity)}
                                                </p>
                                            </div>

                                            {/* Delete Button */}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeleteItem(item.service_item.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
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
                                <h3 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h3>
                                
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
                                            {hasSelectedItems ? formatPrice(getTotalAmount()) : formatPrice(0)}
                                        </span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-3">
                                    <Button
                                        onClick={handlePaymentClick}
                                        disabled={!hasSelectedItems}
                                        className="w-full bg-emerald-700 hover:bg-emerald-800"
                                        size="lg"
                                    >
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Thanh toán
                                    </Button>
                                    
                                    <Button
                                        variant="outline"
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/offering">
                                            Tiếp tục mua sắm
                                        </Link>
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
