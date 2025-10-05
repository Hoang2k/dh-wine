"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFeedback } from "@/services/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// ✅ Schema validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự." })
    .max(256, { message: "Họ và tên không được vượt quá 256 ký tự." }),
    email: z
    .string()
    .email({ message: "Email không hợp lệ." })
    .max(256, { message: "Email không được vượt quá 256 ký tự." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại." })
    .regex(/^[0-9]*$/, "Số điện thoại chỉ được chứa các chữ số.")
    .max(20, { message: "Số điện thoại không được vượt quá 20 ký tự." }),
  subject: z
    .string()
    .min(1, { message: "Vui lòng nhập chủ đề." })
    .max(256, { message: "Chủ đề không được vượt quá 256 ký tự." }),
  content: z
    .string()
    .min(1, { message: "Vui lòng nhập nội dung tin nhắn." })
    .max(2000, { message: "Nội dung không được vượt quá 2000 ký tự." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      content: "",
    },
  });

  // ✅ Submit handler
  const onSubmit = async (values: FormValues) => {
    try {
      await createFeedback(values);
      toast.success("Cảm ơn bạn đã gửi tin nhắn!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Đóng góp ý kiến thất bại. Vui lòng thử lại sau!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <h2 className="text-3xl font-bold text-gray-900">
          Gửi tin nhắn cho chúng tôi
        </h2>
      </div>

      <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Họ tên + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Họ và tên *
              </label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Nhập họ và tên của bạn"
                className="h-12 text-base"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Nhập địa chỉ email"
                className="h-12 text-base"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone + Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Số điện thoại *
              </label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="Nhập số điện thoại"
                className="h-12 text-base"
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = onlyNums;
                }}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Chủ đề *
              </label>
              <Input
                id="subject"
                {...register("subject")}
                placeholder="Nhập chủ đề liên hệ"
                className="h-12 text-base"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nội dung tin nhắn *
            </label>
            <Textarea
              id="message"
              {...register("content")}
              placeholder="Nhập nội dung chi tiết..."
              className="min-h-32 text-base resize-none"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="h-5 w-5 mr-2" />
            {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
