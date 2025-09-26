"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { 
    ArrowLeft, 
    Plus, 
    FileText,
    User,
    Mail,
    Phone,
    Image as ImageIcon,
    Save,
    X,
    Upload,
    Shield,
    Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const createPostSchema = z.object({
    // Post fields
    title: z.string().min(1, "Tiêu đề là bắt buộc").max(200, "Tiêu đề không được quá 200 ký tự"),
    summary: z.string().min(1, "Tóm tắt là bắt buộc").max(500, "Tóm tắt không được quá 500 ký tự"),
    content: z.string().min(1, "Nội dung là bắt buộc").max(5000, "Nội dung không được quá 5000 ký tự"),
    image: z.any().optional(),
    
    // Contact fields
    name: z.string().min(1, "Họ tên là bắt buộc").max(100, "Họ tên không được quá 100 ký tự"),
    phone: z.string().min(1, "Số điện thoại là bắt buộc").regex(/^[\+]?[1-9][\d]{0,15}$/, "Vui lòng nhập số điện thoại hợp lệ"),
    email: z.string().min(1, "Email là bắt buộc").email("Vui lòng nhập email hợp lệ"),
});

type CreatePostForm = z.infer<typeof createPostSchema>;

export default function CreatePostClient() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);

    const form = useForm<CreatePostForm>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: "",
            summary: "",
            content: "",
            image: null,
            name: "",
            phone: "",
            email: "",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: CreatePostForm) => {
        setIsSubmitting(true);
        try {
            console.log("Creating post:", data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push("/posts");
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-[#fbfbfb]">
            <div className="container mx-auto px-4 py-6">
                {/* Header - Centered and Balanced */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                            className="border-[#087443] text-[#087443] hover:bg-[#087443] hover:text-white"
                        >
                            <Link href="/find-relatives">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Quay lại danh sách
                            </Link>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Đăng bài tìm liệt sĩ</h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Chia sẻ thông tin về liệt sĩ để tìm kiếm và kết nối
                        </p>
                    </div>
                </div>

                {/* Form - Centered and Balanced */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="shadow-lg border-0 bg-white">
                        <CardHeader className="bg-[#087443] text-white text-center">
                            <CardTitle className="flex items-center justify-center gap-3 text-xl md:text-2xl">
                                <Shield className="h-5 w-5 md:h-6 md:w-6" />
                                Thông tin liệt sĩ
                            </CardTitle>
                            <p className="text-green-100 mt-2 text-sm md:text-base">
                                Vui lòng điền đầy đủ thông tin để đăng bài tìm kiếm
                            </p>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Post Information Section */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-[#087443]/10 rounded-lg">
                                                <FileText className="h-5 w-5 text-[#087443]" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Thông tin bài đăng</h3>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                                                            Tiêu đề bài đăng *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="Ví dụ: Tìm kiếm liệt sĩ Nguyễn Văn A - Đơn vị 123" 
                                                                className="h-11 md:h-12 text-sm md:text-base border-gray-300 focus:border-[#087443] focus:ring-[#087443]"
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500 text-sm" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="summary"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                                                            Tóm tắt thông tin *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea 
                                                                placeholder="Tóm tắt ngắn gọn về liệt sĩ: họ tên, đơn vị, thời gian hy sinh, địa điểm..."
                                                                className="min-h-20 md:min-h-24 text-sm md:text-base border-gray-300 focus:border-[#087443] focus:ring-[#087443]"
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500 text-sm" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                                                            Nội dung chi tiết *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea 
                                                                placeholder="Mô tả chi tiết về liệt sĩ: thông tin cá nhân, quá trình phục vụ, hoàn cảnh hy sinh, địa điểm cuối cùng được nhìn thấy, thông tin gia đình..."
                                                                className="min-h-32 md:min-h-40 text-sm md:text-base border-gray-300 focus:border-[#087443] focus:ring-[#087443]"
                                                                {...field} 
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500 text-sm" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="image"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                                                            Hình ảnh liệt sĩ
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="space-y-4">
                                                                <div className="relative">
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handleImageChange}
                                                                        className="hidden"
                                                                        id="image-upload"
                                                                    />
                                                                    <label
                                                                        htmlFor="image-upload"
                                                                        className="flex items-center justify-center w-full h-24 md:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#087443] hover:bg-[#087443]/5 transition-colors"
                                                                    >
                                                                        <div className="text-center">
                                                                            <Upload className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mx-auto mb-1 md:mb-2" />
                                                                            <p className="text-xs md:text-sm text-gray-600">
                                                                                Tải lên hình ảnh liệt sĩ
                                                                            </p>
                                                                            <p className="text-xs text-gray-500">
                                                                                PNG, JPG, GIF (tối đa 10MB)
                                                                            </p>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                                
                                                                {previewImage && (
                                                                    <div className="mt-4">
                                                                        <p className="text-xs md:text-sm text-gray-600 mb-2">Xem trước hình ảnh:</p>
                                                                        <Image
                                                                            src={previewImage}
                                                                            alt="Preview"
                                                                            width={400}
                                                                            height={192}
                                                                            className="w-full h-32 md:h-48 object-cover rounded-lg border border-gray-200"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-red-500 text-sm" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Information Section */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Thông tin người đăng</h3>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                                                            Họ và tên người đăng *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <User className="absolute left-3 md:left-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                                                                <Input 
                                                                    placeholder="Nhập họ và tên đầy đủ của bạn" 
                                                                    className="pl-10 md:pl-12 h-11 md:h-12 text-sm md:text-base border-gray-300 focus:border-[#087443] focus:ring-[#087443]"
                                                                    {...field} 
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-red-500 text-sm" />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                                                                Số điện thoại liên hệ *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Phone className="absolute left-3 md:left-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                                                                    <Input 
                                                                        placeholder="+84 123 456 789" 
                                                                        className="pl-10 md:pl-12 h-11 md:h-12 text-sm md:text-base border-gray-300 focus:border-[#087443] focus:ring-[#087443]"
                                                                        {...field} 
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-red-500 text-sm" />
                                                        </FormItem>
                                                    )}
                                                />
                                                
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                                                                Email liên hệ *
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Mail className="absolute left-3 md:left-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                                                                    <Input 
                                                                        placeholder="email@example.com" 
                                                                        className="pl-10 md:pl-12 h-11 md:h-12 text-sm md:text-base border-gray-300 focus:border-[#087443] focus:ring-[#087443]"
                                                                        type="email"
                                                                        {...field} 
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-red-500 text-sm" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notice Section */}
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 md:p-6">
                                        <div className="flex items-start gap-3">
                                            <Award className="h-4 w-4 md:h-5 md:w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-amber-800 mb-2 text-sm md:text-base">Lưu ý quan trọng</h4>
                                                <ul className="text-xs md:text-sm text-amber-700 space-y-1">
                                                    <li>• Vui lòng cung cấp thông tin chính xác và đầy đủ</li>
                                                    <li>• Hình ảnh phải rõ nét và có chất lượng tốt</li>
                                                    <li>• Thông tin liên hệ sẽ được hiển thị công khai</li>
                                                    <li>• Bài đăng sẽ được kiểm duyệt trước khi xuất bản</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons - Centered */}
                                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 md:pt-8 border-t border-gray-200">
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={handleCancel}
                                            disabled={isSubmitting}
                                            className="h-11 md:h-12 px-6 md:px-8 text-sm md:text-base border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 order-2 sm:order-1"
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Hủy bỏ
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            className="h-11 md:h-12 px-6 md:px-8 text-sm md:text-base bg-[#087443] hover:bg-[#065a33] text-white shadow-lg hover:shadow-xl transition-all duration-200 order-1 sm:order-2"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Đang đăng bài...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Đăng bài tìm kiếm
                                </>
                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
