"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar, Check, X, Phone, Mail, NotebookPen, Loader2 } from "lucide-react";
import SuccessPopup from "./SuccessPopup";
import moment from 'moment';

// ========== Types & Validation ==========
const phoneRegex = /^(\+?84|0)(\d{9})$/;

const BookingSchema = z.object({
    visit_type: z.number().min(1, "Vui lòng chọn loại đối tượng"),
    org_name: z.string().min(1, "Vui lòng nhập tên cá nhân/tập thể").max(256, "Tối đa 256 ký tự"),
    representative_name: z.string().min(1, "Vui lòng nhập tên trưởng đoàn").max(100, "Tối đa 100 ký tự"),
    phone: z.string().regex(phoneRegex, "Số điện thoại không hợp lệ"),
    date: z.string().min(1, "Chọn ngày viếng"),
    time: z.string().min(1, "Chọn khung giờ"),
    group_size: z.number({
        required_error: "Vui lòng nhập số người viếng",
        invalid_type_error: "Vui lòng nhập số người viếng"
    }).min(1, "Vui lòng nhập số người viếng"),
    location: z.number().min(1, "Chọn địa điểm"),
    agree: z.boolean().refine((val) => val === true, {
        message: "Bạn cần đồng ý điều khoản",
    }),
});

type BookingForm = z.infer<typeof BookingSchema>;

interface BookVisitFormProps {
    onSubmit: (values: BookingForm) => Promise<void>;
    onCancel: () => void;
    onNavigateToList: () => void;
    onNavigateToHome: () => void;
    onRefetchData: () => void;
}

export default function BookVisitForm({ onSubmit, onCancel, onNavigateToList, onNavigateToHome, onRefetchData }: BookVisitFormProps) {
    const today = new Date().toISOString().slice(0, 10);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
    const [successOrgName, setSuccessOrgName] = React.useState("");
    const [successPhone, setSuccessPhone] = React.useState("");
    const [displayDate, setDisplayDate] = React.useState(today);
    const form = useForm<BookingForm>({
        resolver: zodResolver(BookingSchema),
        defaultValues: {
            visit_type: 1,
            org_name: "",
            representative_name: "",
            phone: "",
            date: today,
            time: "",
            location: 1,
            agree: false,
        },
    });
    
    async function handleSubmit(values: BookingForm) {
        try {
            setIsLoading(true);
            await onSubmit(values);
            setSuccessOrgName(values.org_name);
            setSuccessPhone(values.phone);
            setShowSuccessPopup(true);
            form.reset({ ...form.getValues(), agree: false });
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function handlePopupNo() {
        setShowSuccessPopup(false);
        onRefetchData(); // Refetch data before navigating
        onNavigateToList();
    }

    function handlePopupYes() {
        setShowSuccessPopup(false);
        onNavigateToHome();
    }

    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setDisplayDate(value);
        form.setValue("date", value);
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Form */}
            <div className="md:col-span-2">
                <Card className="border-emerald-100">
                    <CardHeader>
                        <CardTitle className="text-base">Thông tin đăng ký</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Cá nhân/tập thể đăng ký</Label>
                                    <Input id="fullName" placeholder="VD: Nguyễn Văn A" {...form.register("org_name")} />
                                    {form.formState.errors.org_name && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.org_name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại liên hệ</Label>
                                    <div className="relative">
                                        <Phone className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <Input id="phone" className="pl-9" placeholder="0xxxxxxxxx" {...form.register("phone")} />
                                    </div>
                                    {form.formState.errors.phone && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.phone.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Địa điểm</Label>
                                    <Select defaultValue={form.getValues("location").toString()} onValueChange={(v) => form.setValue("location", Number(v))}>
                                        <SelectTrigger id="location" className="w-full">
                                            <SelectValue placeholder="Chọn địa điểm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">NTLS</SelectItem>
                                            <SelectItem value="2">468</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.location && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.location.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Loại đối tượng</Label>
                                    <Select defaultValue={form.getValues("visit_type").toString()} onValueChange={(v) => form.setValue("visit_type", Number(v))}>
                                        <SelectTrigger id="location" className="w-full">
                                            <SelectValue placeholder="Chọn loại đối tượng" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Cá nhân</SelectItem>
                                            <SelectItem value="2">Tập thể</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.visit_type && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.visit_type.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Trưởng đoàn</Label>
                                    <Input id="fullName" placeholder="VD: Nguyễn Văn A" {...form.register("representative_name")} />
                                    {form.formState.errors.representative_name && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.representative_name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="attendees">Số người viếng</Label>
                                    <Input id="attendees" type="number" min={1} placeholder="Nhập số người viếng" {...form.register("group_size", { valueAsNumber: true })} />
                                    {form.formState.errors.group_size && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.group_size.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="date">Ngày viếng</Label>
                                    <div className="relative">
                                        <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <Input 
                                            id="date" 
                                            type="text" 
                                            value={moment(displayDate).format('DD/MM/YYYY')}
                                            onChange={handleDateChange}
                                            className="pl-9" 
                                            placeholder="DD/MM/YYYY"
                                            onFocus={(e) => {
                                                e.target.type = 'date';
                                                e.target.value = displayDate;
                                            }}
                                            onBlur={(e) => {
                                                e.target.type = 'text';
                                                e.target.value = moment(displayDate).format('DD/MM/YYYY');
                                            }}
                                        />
                                    </div>
                                    {form.formState.errors.date && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.date.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time">Giờ viếng</Label>
                                    <div className="relative">
                                        <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <Input id="time" type="time" min={today} className="pl-9" {...form.register("time")} />
                                    </div>
                                    {form.formState.errors.time && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.time.message}</p>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-start gap-3">
                                <Checkbox id="agree" checked={form.watch("agree")} onCheckedChange={(v) => form.setValue("agree", Boolean(v))} />
                                <Label htmlFor="agree" className="leading-6 text-sm text-muted-foreground">
                                    Tôi xác nhận thông tin trên là chính xác và đồng ý với <a className="underline text-emerald-700" href="#" onClick={(e) => e.preventDefault()}>Điều khoản</a> của ban quản lý.
                                </Label>
                            </div>
                            {form.formState.errors.agree && (
                                <p className="text-sm text-rose-600">{form.formState.errors.agree.message}</p>
                            )}

                            <div className="flex items-center gap-2 pt-2">
                                <Button type="submit" className="gap-2 bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
                                    <Check className="h-4 w-4" /> Gửi đăng ký
                                </Button>
                                <Button type="button" variant="outline" onClick={onCancel} className="gap-2">
                                    <X className="h-4 w-4" /> Hủy
                                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Info / Tips */}
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Hướng dẫn nhanh</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <p>• Mỗi khung giờ tối đa 50 người. Vui lòng chọn khung giờ khác nếu đã đủ.</p>
                        <p>• Trang phục lịch sự, giữ không gian yên tĩnh khi vào khu tưởng niệm.</p>
                        <p>• Nếu cần hỗ trợ, liên hệ <a href="tel:0123456789" className="underline text-emerald-700">0123 456 789</a>.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Chính sách</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <p>• Đăng ký cần được ban quản lý duyệt trước khi có hiệu lực.</p>
                        <p>• Mọi thay đổi / hủy cần thực hiện trước 24 giờ.</p>
                        <p>• Dữ liệu cá nhân được bảo mật theo quy định hiện hành.</p>
                    </CardContent>
                </Card>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl p-4 bg-emerald-700 text-white"
                >
                    <div className="font-medium">Gợi ý</div>
                    <div className="text-sm/6 opacity-90">
                        Đăng ký sớm giúp ban quản lý sắp xếp tốt hơn cho đoàn của bạn.
                    </div>
                </motion.div>
            </div>

            {/* Success Popup */}
            <SuccessPopup
                isOpen={showSuccessPopup}
                orgName={successOrgName}
                phone={successPhone}
                onClose={() => setShowSuccessPopup(false)}
                onNo={handlePopupNo}
                onYes={handlePopupYes}
            />
        </div>
    );
}
