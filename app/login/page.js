"use client";
import Image from "next/image";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {useState} from "react";
import {IoIosEyeOff, IoMdEye} from "react-icons/io";
import {Checkbox} from "@/components/ui/checkbox";

const formSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values) {
        console.log(values)
        console.log(rememberMe)
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
                                    <FormControl>
                                        <Input placeholder="example@example.com" {...field} />
                                    </FormControl>
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
                                    <FormControl>
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
                                    </FormControl>
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
                            <div className="ml-auto">
                                <h1 className="text-xs text-[#A8A8A8]">Forgot password?</h1>
                            </div>
                        </div>

                        <Button type="submit" className="mt-5 w-full rounded-full h-10">Log in</Button>
                    </form>
                </Form>

                <h1 className="text-sm mt-auto mb-10"><span className="text-[#625050]">Don&apos;t have an account?</span> <span className="text-[#2B2B2B] font-medium">Sign Up</span></h1>
            </div>
        </main>
    );
}
