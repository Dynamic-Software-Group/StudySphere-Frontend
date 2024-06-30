"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import React, { Fragment } from 'react';
export default function VerifyError() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setError(searchParams.get("error"));
            if (!searchParams.get("error")) {
                router.push('/login');
            }
        }
    }, [router]);

    let errorMessage = "";
    if (error === "notFound") {
        errorMessage = "Invalid user, please check your email\nand retry.";
    } else if (error === "expiredToken") {
        errorMessage = "Expired token, please click request\nnew link and try again."
    } else if (error === "invalidToken") {
        errorMessage = "Invalid token, please check your email\nand retry.";
    }

    const formattedErrorMessage = errorMessage.split('\n').map((line, index) => (
        <p key={index}>
            {line}
        </p>
    ));

    return (
        <main className="flex h-screen bg-[#D9D9D9] w-full">
            <div className="w-[50%] h-[95%] bg-white m-auto rounded-2xl">
                <Image src="/verify-failure.png" alt="bg img" width={400} height={400} className="mx-auto mt-10"/>
                <h1 className="text-4xl font-semibold mt-5 text-[#2B2B2B] text-center">Verification Error</h1>

                <h1 className="text-xl font-medium mt-5 text-[#5A5858] text-center">
                    {formattedErrorMessage}
                </h1>

                <div className="w-full flex justify-center mt-[50%]">
                    <Button className="mt-5 w-[75%] rounded-full h-10" onClick={() => {
                        window.location.href = "/login";
                    }}>
                        Request New Link
                    </Button>
                </div>
            </div>
        </main>
    );
}