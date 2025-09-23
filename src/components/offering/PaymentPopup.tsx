"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, CreditCard, User, Phone, Mail, MapPin } from "lucide-react";
import { createServiceOrder } from "@/services/service-order";
import { TServiceOrder } from "@/types/service-order";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { BOOK_VISIT_LOCATIONS } from "@/constants";

const PaymentSchema = z.object({
    contactName: z.string().min(1, "Vui lòng nhập họ tên"),
    contactPhone: z.string().min(1, "Vui lòng nhập số điện thoại").regex(/^(\+?84|0)(\d{9})$/, "Số điện thoại không hợp lệ"),
    siteId: z.number().min(1, "Chọn địa điểm"),
    note: z.string().optional(),
});

type PaymentForm = z.infer<typeof PaymentSchema>;

interface PaymentPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: PaymentForm) => void;
    totalAmount: number;
    totalQuantity: number;
}

export default function PaymentPopup({ isOpen, onClose, onConfirm, totalAmount, totalQuantity }: PaymentPopupProps) {
    const form = useForm<PaymentForm>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            contactName: "",
            contactPhone: "",
            siteId: 1,
            note: "",
        },
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleSubmit = (data: PaymentForm) => {
        onConfirm(data);
        form.reset();
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
                className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="border-none shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-lg font-semibold">Thông tin thanh toán</CardTitle>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
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

                        {/* Payment Form */}
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="contact_name">Tên cá nhân/tập thể *</Label>
                                <div className="relative">
                                    <User className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="contact_name"
                                        placeholder="Nhập họ và tên"
                                        className="pl-9"
                                        {...form.register("contactName")}
                                    />
                                </div>
                                {form.formState.errors.contactName && (
                                    <p className="text-sm text-rose-600">{form.formState.errors.contactName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact_phone">Số điện thoại *</Label>
                                <div className="relative">
                                    <Phone className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="contact_phone"
                                        placeholder="0xxxxxxxxx"
                                        className="pl-9"
                                        {...form.register("contactPhone")}
                                    />
                                </div>
                                {form.formState.errors.contactPhone && (
                                    <p className="text-sm text-rose-600">{form.formState.errors.contactPhone.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                    <Label htmlFor="location">Địa điểm</Label>
                                    <Select
                                        value={form.getValues("siteId")?.toString() || ""}
                                        onValueChange={(v) => form.setValue("siteId", Number(v))}
                                    >
                                        <SelectTrigger id="location" className="w-full">
                                            <SelectValue placeholder="Chọn địa điểm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {BOOK_VISIT_LOCATIONS.map((location) => (
                                                <SelectItem key={location.id} value={location.id.toString()}>
                                                    {location.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.siteId && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.siteId.message}</p>
                                    )}
                                </div>

                            <div className="space-y-2">
                                <Label htmlFor="note">Ghi chú</Label>
                                <Textarea
                                    id="note"
                                    placeholder="Ghi chú thêm"
                                    className="min-h-[60px]"
                                    {...form.register("note")}
                                />
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
                                    type="submit"
                                    className="flex-1 bg-emerald-700 hover:bg-emerald-800"
                                >
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Xác nhận thanh toán
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
