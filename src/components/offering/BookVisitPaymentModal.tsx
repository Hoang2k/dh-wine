

"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, User, Phone, Calendar, Users, MapPin, RotateCcw, Mail } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface BookVisitPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
    bookVisitData: any;
    totalAmount: number;
    totalQuantity: number;
}

export default function BookVisitPaymentModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    bookVisitData, 
    totalAmount, 
    totalQuantity 
}: BookVisitPaymentModalProps) {
    const [isReset, setIsReset] = React.useState(false);
    const [contactName, setContactName] = React.useState('');
    const [contactPhone, setContactPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [note, setNote] = React.useState('');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleReset = () => {
        setIsReset(true);
        setContactName('');
        setContactPhone('');
        setEmail('');
        setAddress('');
        setNote('');
        // Clear localStorage flags only when user explicitly resets
        localStorage.removeItem('fromBookVisit');
        localStorage.removeItem('bookVisitData');
    };

    const handleSubmit = () => {
        if (isReset) {
            // Submit with contact information only
            onConfirm({
                contact_name: contactName,
                contact_phone: contactPhone,
                email: email,
                address: address,
                note: note
            });
        } else {
            // Submit with book visit data
            onConfirm({
                bookVisitData
            });
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="border-none shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-lg font-semibold">
                            {isReset ? 'Thông tin thanh toán' : 'Thông tin đặt lịch & Thanh toán'}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            {!isReset && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleReset}
                                    className="text-orange-600 border-orange-600 hover:bg-orange-50"
                                >
                                    <RotateCcw className="h-4 w-4 mr-1" />
                                    Thay đổi thông tin
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isReset ? (
                            /* Book Visit Information */
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-4 text-blue-900">Thông tin đặt lịch viếng</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Tên cá nhân/tập thể</Label>
                                        <div className="relative">
                                            <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                value={bookVisitData?.org_name || ''}
                                                disabled
                                                className="pl-9 bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Số điện thoại</Label>
                                        <div className="relative">
                                            <Phone className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                value={bookVisitData?.phone || ''}
                                                disabled
                                                className="pl-9 bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Thời gian viếng</Label>
                                        <div className="relative">
                                            <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                value={bookVisitData?.time || ''}
                                                disabled
                                                className="pl-9 bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    {bookVisitData?.representative_name && (
                                        <div className="space-y-2">
                                            <Label>Tên người đại diện</Label>
                                            <Input
                                                value={bookVisitData.representative_name}
                                                disabled
                                                className="bg-gray-50"
                                            />
                                        </div>
                                    )}

                                </div>
                            </div>
                        ) : (
                            /* Contact Information Form */
                            <div className="bg-emerald-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-4 text-emerald-900">Thông tin liên hệ</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_name">Họ và tên *</Label>
                                        <div className="relative">
                                            <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="contact_name"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder="Nhập họ và tên"
                                                className="pl-9"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="contact_phone">Số điện thoại *</Label>
                                        <div className="relative">
                                            <Phone className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="contact_phone"
                                                value={contactPhone}
                                                onChange={(e) => setContactPhone(e.target.value)}
                                                placeholder="0xxxxxxxxx"
                                                className="pl-9"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="email@example.com"
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Địa chỉ *</Label>
                                        <div className="relative">
                                            <MapPin className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                                            <Textarea
                                                id="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Nhập địa chỉ giao hàng"
                                                className="pl-9 min-h-[80px]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="note">Ghi chú</Label>
                                        <Textarea
                                            id="note"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Ghi chú thêm (tùy chọn)"
                                            className="min-h-[60px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="bg-emerald-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Tóm tắt đơn hàng</h3>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>Số lượng sản phẩm:</span>
                                    <span className="font-medium">{totalQuantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tổng tiền:</span>
                                    <span className="font-bold text-emerald-600">{formatPrice(totalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1"
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isReset && (!contactName || !contactPhone)}
                                className="flex-1 bg-emerald-700 hover:bg-emerald-800"
                            >
                                Xác nhận thanh toán
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}