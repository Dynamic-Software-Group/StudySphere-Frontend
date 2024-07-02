"use client";

import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {getUser, updateUser} from "@/lib/api";

export default function Favorites() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function getData() {
            const tokenCookie = document.cookie
                .split(";")
                .find((cookie) => cookie.includes("token"))
                .split("=")[1];

            const data = await getUser(tokenCookie);

            setName(data.name);
            setEmail(data.email);
        }

        getData();
    }, []);

    async function handleUpdateUser() {
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];

        const updateObj = {
            token: tokenCookie,
            email,
            name,
        };

        await updateUser(updateObj);

        window.location.reload();
    }

    return (
        <main className="w-full h-screen flex overflow-x-clip">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col w-4/5">
                {/* Topbar */}
                <Topbar />

                {/* Main Content */}
                <div className="ml-[25%] mt-16 w-full">
                    <h1 className="text-2xl font-semibold ml-8 mt-10">Settings</h1>

                    <div className="flex flex-col items-center justify-center w-full border-b p-4 border-b-[#999] space-y-5">
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-light text-gray-500">Name</label>
                            <Input
                                label="Name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-sm font-light text-gray-500">Email</label>
                            <Input
                                label="Email"
                                placeholder="Email..."
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <Button className="invite w-full" onClick={handleUpdateUser}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}