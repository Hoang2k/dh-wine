"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock,
    Send,
    MessageCircle,
    Users,
    Heart,
    Star,
    CheckCircle
} from "lucide-react";

export default function ContactClient() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            <div className="container mx-auto px-4 lg:px-30 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                                <h2 className="text-3xl font-bold text-gray-900">Gửi tin nhắn cho chúng tôi</h2>
                            </div>

                            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Họ và tên *
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Nhập họ và tên của bạn"
                                                className="h-12 text-base"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Nhập địa chỉ email"
                                                className="h-12 text-base"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Số điện thoại
                                            </label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Nhập số điện thoại"
                                                className="h-12 text-base"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Chủ đề *
                                            </label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                placeholder="Nhập chủ đề liên hệ"
                                                className="h-12 text-base"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Nội dung tin nhắn *
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Nhập nội dung chi tiết..."
                                            className="min-h-32 text-base resize-none"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <Send className="h-5 w-5 mr-2" />
                                        Gửi tin nhắn
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Contact Information */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                    <MessageCircle className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Thông tin liên hệ</h3>
                            </div>

                            <div className="space-y-6">
                                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Phone className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">Điện thoại</h4>
                                            <p className="text-gray-600 mb-1">Hotline: 1900 1234</p>
                                            <p className="text-gray-600">Mobile: 0123 456 789</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Mail className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                                            <p className="text-gray-600 mb-1">info@ntlsvx.com</p>
                                            <p className="text-gray-600">support@ntlsvx.com</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">Địa chỉ</h4>
                                            <p className="text-gray-600">
                                                123 Đường ABC, Quận XYZ<br />
                                                Thành phố Hồ Chí Minh, Việt Nam
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Clock className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">Giờ làm việc</h4>
                                            <p className="text-gray-600 mb-1">Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                                            <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                                            <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>

                        {/* Why Choose Us */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                    <Star className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Tại sao chọn chúng tôi</h3>
                            </div>

                            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                        <span className="text-gray-700">Dịch vụ chuyên nghiệp</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                        <span className="text-gray-700">Hỗ trợ 24/7</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                        <span className="text-gray-700">Giá cả hợp lý</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                        <span className="text-gray-700">Đội ngũ tận tâm</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                        <span className="text-gray-700">Bảo mật thông tin</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
