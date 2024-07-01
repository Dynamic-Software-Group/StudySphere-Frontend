"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState("");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values) {
        setIsLoading(true);
        try {
            const token = await login(values.email, values.password);

            if (token == null) {
                toast.error("Invalid credentials", {
                    description: "Login failed",
                    action: {
                        label: "OK",
                        onClick: () => {},
                    },
                });
                setLoginStatus("Invalid credentials");
            } else {
                document.cookie = `token=${token}; path=/`;
                toast.success(`${values.email} logged in successfully`, {
                    description: "Logged in",
                    action: {
                        label: "OK",
                        onClick: () => {},
                    },
                });
                setLoginStatus("Logged in successfully");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Error occurred while logging in", {
                description: "Please try again later",
                action: {
                    label: "OK",
                    onClick: () => {},
                },
            });
            setLoginStatus("Error occurred while logging in");
        } finally {
            setIsLoading(false);
            window.location.href = "/";
        }
    }

    return (
        <main className="flex h-screen bg-[#D9D9D9] w-full">
            <Image src={'/auth-background.svg'} alt={"bg img"} width={561} height={435} className="ml-auto"/>
            <div className="my-auto flex flex-col ml-auto h-[95%] w-1/3 mr-5 bg-white rounded-2xl items-center">
                <Image src={'/logo-small.svg'} alt={"logo"} width={60} height={60} className="mt-20" />

                <h1 className="text-3xl font-semibold mt-5 text-[#2B2B2B]">Welcome back!</h1>

                <h1 className="text-sm font-medium mt-2 text-[#5A5858]">
                    Please enter your details
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[80%] mt-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input placeholder="example@example.com" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-2.5" />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <div className="relative">
                                        <Input placeholder="Enter your password" {...field} type={showPassword ? "text" : "password"} />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-0  mt-2.5 mr-5"
                                        >
                                            {showPassword ? <IoIosEyeOff />
                                                : <IoMdEye /> }
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-row items-center space-x-2 mt-4 w-full">
                            <div className="mr-auto space-x-2 items-center h-full">
                                <Checkbox id="rememberme" onClick={() => setRememberMe(!rememberMe)}/>

                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5A5858]"
                                >
                                    Remember me for 30 days
                                </label>
                            </div>
                        </div>

                        <Button type="submit" className="mt-5 w-full rounded-full h-10" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Log in"}
                        </Button>
                    </form>
                </Form>

                <h1 className="text-sm mt-auto mb-10">
                    <span className="text-[#625050]">Don&apos;t have an account?</span>
                    <span className="text-[#2B2B2B] font-medium"> <a href="/signup">Sign Up</a></span>
                </h1>
            </div>
        </main>
    );
}
