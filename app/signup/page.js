"use client";
import Image from "next/image";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {useState} from "react";
import {IoIosEyeOff, IoMdEye} from "react-icons/io";
import {login, signup} from "@/lib/api";
import {toast} from "sonner";

const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string()
})

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    async function onSubmit(values) {
        if (values.password !== values.confirmPassword) {
            toast.error("Passwords do not match")
            return;
        }

        const signedUp = await signup(values.email, values.password, values.name);

        if (signedUp === false) {
            // 409; user already exists
            toast.error("User already exists, please make sure your email and username are unique!")
        } else {
            const token = await login(values.email, values.password);

            if (token == null) {
                toast.error("An error occurred while logging in. Please try again.")
            } else {
                document.cookie = `token=${token}; path=/`;
                console.log(token)
                toast.success("Logged in successfully as " + values.email)
                window.location.href = "/";
            }
        }
    }

    return (
        <main className="flex h-screen bg-[#D9D9D9] w-full">
            <Image src={'/auth-background.svg'} alt={"bg img"} width={561} height={435} className="ml-auto"/>
            <div className="my-auto flex flex-col ml-auto h-[95%] w-1/3 mr-5 bg-white rounded-2xl items-center">
                <Image src={'/logo-small.svg'} alt={"logo"} width={60} height={60} className="mt-20" />

                <h1 className="text-3xl font-semibold mt-5 text-[#2B2B2B]">Create your account</h1>

                <h1 className="text-sm font-medium mt-2 text-[#5A5858]">
                    Please enter your details
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[80%] mt-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="mt-2.5"/>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="mt-2.5"/>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input placeholder="Enter your password" {...field}
                                                   type={showPassword ? "text" : "password"}/>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-0  mt-2.5 mr-5"
                                            >
                                                {showPassword ? <IoIosEyeOff/>
                                                    : <IoMdEye/>}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="mt-2.5"/>
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input placeholder="Confirm your password" {...field}
                                                   type={showPassword ? "text" : "password"}/>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-0  mt-2.5 mr-5"
                                            >
                                                {showPassword ? <IoIosEyeOff/>
                                                    : <IoMdEye/>}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="mt-8 w-full rounded-full h-10">Create account</Button>
                    </form>
                </Form>

                <h1 className="text-sm mt-auto mb-10"><span className="text-[#625050]">Already have an account?</span> <span className="text-[#2B2B2B] font-medium"><a href="/login">Log In</a></span></h1>
            </div>
        </main>
    );
}
