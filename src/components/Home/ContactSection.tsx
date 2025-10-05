"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFeedback } from "@/services/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự." })
    .max(256, { message: "Họ và tên không được vượt quá 256 ký tự." }),
  phone: z
    .string()
    .regex(/^[0-9]*$/, "Số điện thoại chỉ được chứa các chữ số.")
    .max(20, { message: "Số điện thoại không được vượt quá 20 ký tự." }),
  email: z
    .string()
    .email({ message: "Email không hợp lệ." })
    .max(256, { message: "Email không được vượt quá 256 ký tự." })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .max(256, { message: "Chủ đề không được vượt quá 256 ký tự." }),
  content: z
    .string()
    .min(1, { message: "Vui lòng nhập nội dung." })
    .max(2000, { message: "Nội dung không được vượt quá 2000 ký tự." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      content: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await createFeedback(values);
      toast.success("Cảm ơn bạn đã đóng góp ý kiến!");
    } catch (error) {
      toast.error("Thất bại");
      return;
    }
  }

  return (
    <section className="py-8 px-6">
      <div className="container mx-auto md:px-30 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
          {/* left form */}
          <div className="">
            <h2 className="font-bold text-[48px] mb-12">Góp ý/ Liên hệ</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 text-left"
              >
                <div className="grid gap-y-8 md:gap-y-0 md:grid-cols-2 md:gap-x-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên *</FormLabel>
                        <FormControl>
                          <Input
                            className="h-11"
                            placeholder="Nhập họ và tên"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại *</FormLabel>
                        <FormControl>
                          <Input
                            className="h-11"
                            placeholder="Nhập số điện thoại"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-y-8 md:gap-y-0 md:grid-cols-2 md:gap-x-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="h-11"
                            placeholder="Vd: abc@gmail.com"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chủ đề *</FormLabel>
                        <FormControl>
                          <Input
                            className="h-11"
                            placeholder="Nhập chủ đề"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung *</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-[134px]"
                          placeholder="Nhập nội dung muốn gửi."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-[#087443] text-[20px] w-full h-[62px] font-bold cursor-pointer"
                  type="submit"
                >
                  Gửi
                </Button>
              </form>
            </Form>
          </div>
          {/* right: map box */}
          <div className="rounded-xl overflow-hidden shadow-lg border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.038572124707!2d104.96577717563986!3d22.68960797940849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cc7e39347266c1%3A0x8af0815631ad9e73!2zTmdoxKlhIHRyYW5nIFF14buRYyBnaWEgVuG7iyBYdXnDqm4!5e0!3m2!1svi!2s!4v1759312342244!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
