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
import { BOOK_VISIT_LOCATIONS, BOOK_VISIT_TYPES } from "@/constants";

// ========== Types & Validation ==========
const phoneRegex = /^(\+?84|0)(\d{9})$/;

const BookingSchema = z.object({
    visit_type: z.number().min(1, "Vui lòng chọn loại đối tượng"),
    org_name: z.string().min(1, "Vui lòng nhập tên cá nhân/tập thể").max(256, "Tối đa 256 ký tự"),
    representative_name: z.string().optional(),
    representative_position: z.string().max(256, "Tối đa 256 ký tự").optional(),
    phone: z.string().min(1, "Vui lòng nhập số điện thoại").regex(phoneRegex, "Số điện thoại không hợp lệ"),
    time: z.string().min(1, "Vui lòng chọn thời gian đăng ký viếng"),
    group_size: z.number({
        required_error: "Vui lòng nhập số người viếng",
        invalid_type_error: "Vui lòng nhập số người viếng"
    }).min(1, "Vui lòng nhập số người viếng"),
    location: z.number().min(1, "Chọn địa điểm"),
    note: z.string().optional(), // Add note field
    agree: z.boolean().refine((val) => val === true, {
        message: "Bạn cần đồng ý điều khoản",
    }),
});

type BookingForm = z.infer<typeof BookingSchema>;

interface BookVisitFormProps {
    onSubmit: (values: BookingForm) => Promise<any>;
    onCancel: () => void;
    onNavigateToList: () => void;
    onNavigateToHome: () => void;
    onRefetchData: () => void;
}

export default function BookVisitForm({ onSubmit, onCancel, onNavigateToList, onNavigateToHome, onRefetchData }: BookVisitFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
    const [displayDateTime, setDisplayDateTime] = React.useState(moment().format('DD/MM/YYYY HH:mm'));
    const [showDateTimePicker, setShowDateTimePicker] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [selectedTime, setSelectedTime] = React.useState(moment().format('HH:mm'));
    const [idBookVisit, setIdBookVisit] = React.useState<number>(0);
    const form = useForm<BookingForm>({
        resolver: zodResolver(BookingSchema),
        defaultValues: {
            visit_type: 0,
            org_name: "",
            representative_name: "",
            representative_position: "",
            phone: "",
            time: moment().format('DD/MM/YYYY HH:mm'),
            group_size: 1,
            location: 1,
            note: "",
            agree: false,
        },
    });
    
    async function handleSubmit(values: BookingForm) {
        try {
            setIsLoading(true);
            const response = await onSubmit(values);
            if(response.id) {
                setIdBookVisit(response.id);
            }


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

function handleDateTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // Allow any input while typing
    setDisplayDateTime(value);
    form.setValue("time", value);
}

function handleDateTimeFocus() {
    setShowDateTimePicker(true);
    // Parse current value to set picker state
    const momentDate = moment(displayDateTime, 'DD/MM/YYYY HH:mm');
    if (momentDate.isValid()) {
        setSelectedDate(momentDate);
        setSelectedTime(momentDate.format('HH:mm'));
    }
}

function handleDateSelect(date: moment.Moment) {
    setSelectedDate(date);
    const newDateTime = date.format('DD/MM/YYYY') + ' ' + selectedTime;
    setDisplayDateTime(newDateTime);
    form.setValue("time", newDateTime);
}

function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const time = e.target.value;
    setSelectedTime(time);
    const newDateTime = selectedDate.format('DD/MM/YYYY') + ' ' + time;
    setDisplayDateTime(newDateTime);
    form.setValue("time", newDateTime);
}

function handleDateTimePickerClose() {
    setShowDateTimePicker(false);
}


    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left: Form */}
            <div className="md:col-span-3">
                <Card className="border-emerald-100">
                    <CardContent className="space-y-4">
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Loại đối tượng</Label>
                                    <Select defaultValue={form.getValues("visit_type").toString()} onValueChange={(v) => {
                                        const visitType = Number(v);
                                        form.setValue("visit_type", visitType);
                                        // Clear representative_name when switching to "Cá nhân"
                                        if (visitType === 1) {
                                            form.setValue("representative_name", "");
                                        }
                                    }}>
                                        <SelectTrigger id="location" className="w-full">
                                            <SelectValue placeholder="Chọn loại đối tượng" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {BOOK_VISIT_TYPES.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.visit_type && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.visit_type.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Tên cá nhân/tập thể đăng ký</Label>
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
                                            {BOOK_VISIT_LOCATIONS.map((location) => (
                                                <SelectItem key={location.id} value={location.id.toString()}>
                                                    {location.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.formState.errors.location && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.location.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="representative_name">Trưởng đoàn</Label>
                                    <Input 
                                        id="representative_name" 
                                        placeholder="VD: Nguyễn Văn A" 
                                        disabled={form.watch("visit_type") === 1}
                                        className={form.watch("visit_type") === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                                        {...form.register("representative_name")} 
                                    />
                                    {form.formState.errors.representative_name && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.representative_name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="representative_position">Chức vụ Đảng, Chính quyền của trưởng đoàn/cá nhân</Label>
                                    <Input id="representative_position" type="string" placeholder="Nhập Chức vụ Đảng, Chính quyền (nếu có)" {...form.register("representative_position")} />
                                    {form.formState.errors.representative_position && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.representative_position.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time">Thời gian</Label>
                                    <div className="relative">
                                        <Calendar className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                        <Input 
                                            id="time" 
                                            type="text" 
                                            value={displayDateTime}
                                            onChange={handleDateTimeChange}
                                            onFocus={handleDateTimeFocus}
                                            className="pl-9" 
                                            placeholder="DD/MM/YYYY HH:mm"
                                            readOnly
                                        />
                                        
                                        {/* Custom DateTime Picker */}
                                        {showDateTimePicker && (
                                            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                                                <div className="space-y-4">
                                                    {/* Date Picker */}
                                                    <div>
                                                        <Label className="text-sm font-medium">Chọn ngày</Label>
                                                        <Input
                                                            type="date"
                                                            value={selectedDate.format('YYYY-MM-DD')}
                                                            onChange={(e) => {
                                                                const date = moment(e.target.value);
                                                                if (date.isValid()) {
                                                                    handleDateSelect(date);
                                                                }
                                                            }}
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    
                                                    {/* Time Picker */}
                                                    <div>
                                                        <Label className="text-sm font-medium">Chọn giờ</Label>
                                                        <Input
                                                            type="time"
                                                            value={selectedTime}
                                                            onChange={handleTimeChange}
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    
                                                    {/* Action Buttons */}
                                                    <div className="flex gap-2 pt-2">
                                                        <Button 
                                                            type="button" 
                                                            size="sm" 
                                                            onClick={handleDateTimePickerClose}
                                                            className="bg-emerald-700 hover:bg-emerald-800"
                                                        >
                                                            Xong
                                                        </Button>
                                                        <Button 
                                                            type="button" 
                                                            variant="outline" 
                                                            size="sm" 
                                                            onClick={() => {
                                                                const now = moment();
                                                                handleDateSelect(now);
                                                                setSelectedTime(now.format('HH:mm'));
                                                            }}
                                                        >
                                                            Bây giờ
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {form.formState.errors.time && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.time.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="attendees">Số người</Label>
                                    <Input id="attendees" type="number" min={1} placeholder="Nhập số người viếng" {...form.register("group_size", { valueAsNumber: true })} />
                                    {form.formState.errors.group_size && (
                                        <p className="text-sm text-rose-600">{form.formState.errors.group_size.message}</p>
                                    )}
                                </div>
                                
                            </div>

                            {/* Note Field */}
                            <div className="space-y-2">
                                <Label htmlFor="note">Ghi chú</Label>
                                <Textarea
                                    id="note"
                                    placeholder="Ghi chú thêm (tùy chọn)"
                                    className="min-h-[80px]"
                                    {...form.register("note")}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-start gap-3">
                                <Checkbox id="agree" checked={form.watch("agree")} onCheckedChange={(v) => form.setValue("agree", Boolean(v))} />
                                <Label htmlFor="agree" className="">
                                    Tôi xác nhận thông tin trên là chính xác và đồng ý với điều khoản của ban quản lý.
                                </Label>
                            </div>
                            {form.formState.errors.agree && (
                                <p className="text-sm text-rose-600">{form.formState.errors.agree.message}</p>
                            )}

                            <div className="flex items-center gap-2 pt-2">
                                <Button type="submit" className="gap-2 bg-emerald-700 hover:bg-emerald-800 hover:cursor-pointer" disabled={isLoading}>
                                    <Check className="h-4 w-4" /> Gửi đăng ký
                                </Button>
                                <Button type="button" variant="outline" onClick={onCancel} className="gap-2 hover:cursor-pointer">
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
                        <p>• Mọi thay đổi / hủy cần liên hệ với ban quản lý nghĩa trang trước 24 giờ.</p>
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
                orgName={form.getValues("org_name")}
                phone={form.getValues("phone")}
                idBookVisit={idBookVisit}
                bookVisitData={form.getValues()} // Pass the form data
                onClose={() => setShowSuccessPopup(false)}
                onNo={() => {
                    setShowSuccessPopup(false);
                    // Clear BookVisit flags when user chooses "Không"
                    localStorage.removeItem('fromBookVisit');
                    localStorage.removeItem('bookVisitData');
                    onNavigateToList();
                }}
                onYes={(bookVisitData) => {
                    setShowSuccessPopup(false);
                    // Navigate to cart page
                    window.location.href = "/gio-hang";
                }}
            />
        </div>
    );
}
