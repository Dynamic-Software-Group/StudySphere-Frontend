"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import RequestNewEmailPopup from "@/components/ui/RequestNewEmailPopup";

export default function RequestEmail() {
    return (
        <main className="flex h-screen bg-[#D9D9D9] w-full">
            <div className="w-[50%] h-[95%] bg-white m-auto rounded-2xl">
                <Image src="/verify-request.png" alt="bg img" width={300} height={300} className="mx-auto mt-10"/>
                <h1 className="text-4xl font-semibold mt-5 text-[#2B2B2B] text-center">Email Verification</h1>

                <h1 className="text-xl font-medium mt-5 text-[#5A5858] text-center">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    To activate your account, please verify your email. If you<br />didn't receive an email, click below to request a new one.
                </h1>

                <div className="w-full flex justify-center mt-[50%]">
                    <RequestNewEmailPopup />
                </div>
            </div>
        </main>
    );
}