"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { username: "" },
    });

    function onSubmit(values: FormValues) {
        console.log(values);
    }

    return (
        <section className="py-8 px-6">
            <div className="container mx-auto md:px-30 text-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
                    {/* left form */}
                    <div className="">
                        <h2  className="font-bold text-[48px] mb-12">Góp ý/ Liên hệ</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                            <div className="grid gap-y-8 md:gap-y-0 md:grid-cols-2 md:gap-x-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Họ và tên</FormLabel>
                                            <FormControl>
                                                <Input className="h-11" placeholder="Nhập họ và tên" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số điện thoại</FormLabel>
                                            <FormControl>
                                                <Input className="h-11" placeholder="Nhập số điện thoại" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className="h-11" placeholder="Vd: abc@gmail.com" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nội dung</FormLabel>
                                        <FormControl>
                                            <Textarea className="h-[134px]" placeholder="Nhập nội dung muốn gửi." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="bg-[#087443] text-[20px] w-full h-[62px] font-bold "
                                type="submit">
                                Gửi
                            </Button>
                        </form>
                    </Form>
                    </div>
                    {/* right: map box */}
                    <div className="rounded-xl overflow-hidden shadow-lg border">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.498151797037!2d106.70042311526057!3d10.77653069232243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f41e2a11c47%3A0xabcde1234567890!2zQ2hvbmcgVGjhu4sgTeG7mXQ!5e0!3m2!1sen!2s!4v1692780012345!5m2!1sen!2s"
                            width="100%"
                            height="400"
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
