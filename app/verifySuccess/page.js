"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function VerifySuccess() {
    return (
        <main className="flex h-screen bg-[#D9D9D9] w-full">
            <div className="w-[50%] h-[95%] bg-white m-auto rounded-2xl">
                <Image src="/verify-success.png" alt="bg img" width={200} height={200} className="mx-auto mt-10"/>
                <h1 className="text-4xl font-semibold mt-5 text-[#2B2B2B] text-center">Verification Success</h1>

                <h1 className="text-xl font-medium mt-5 text-[#5A5858] text-center">
                    Thanks for verifying! Please click below<br />to login.
                </h1>

                <div className="w-full flex justify-center mt-[50%]">
                    <Button className="mt-5 w-[75%] rounded-full h-10" onClick={() => {
                        window.location.href = "/login";
                    }}>
                        Login
                    </Button>
                </div>
            </div>
        </main>
    );
}