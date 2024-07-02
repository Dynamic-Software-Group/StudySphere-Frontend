"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import React, { Fragment } from 'react';
import RequestNewEmailPopup from "@/components/ui/RequestNewEmailPopup";
export default function VerifyError() {
    const router = useRouter();
    const [error, setError] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const path = window.location.path;
        if (typeof window !== 'undefined') {

            setError(new URLSearchParams(window.location.search).get("error"));
            if (!path.includes("?error")) {
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
                    <RequestNewEmailPopup />
                </div>
            </div>
        </main>
    );
}