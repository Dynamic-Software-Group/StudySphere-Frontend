"use client";

import {HiHeart, HiOutlineHeart, HiOutlineShare, HiOutlineTrash} from "react-icons/hi";
import {BiCategory} from "react-icons/bi";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import {useEffect, useState} from "react";
import {Note} from "@/lib/models/note";
import {getFavorites, getNotes, getShared, unfavoriteNotecard} from "@/lib/api";
import {Badge} from "@/components/ui/badge";
import DeleteConfirmPopup from "@/components/ui/DeleteConfirmPopup";

export default function Shared() {
    const [notecards, setNotecards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCategory, setFilteredCategory] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const tokenCookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.includes("token"))
                    .split("=")[1];

                const response = await getShared(tokenCookie);
                console.log(response);
                const notes = response.notecards.map((note) => Note.fromJson(note));
                setNotecards(notes);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        }
        fetchData();
    }, []);

    function handleNotecardClick(id) {
        const clickedElement = window.event.target;

        console.log(window.event.target.classList)
        if (window.event.target.tagName !== "svg" && window.event.target.tagName !== "path" && !clickedElement.classList.value.includes(
            'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300 border-transparent bg-red-500 text-neutral-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80'
        )) {
            window.location.href = `/note/${id}`;
        }
    }

    async function handleUnfavoriteNotecard(id) {
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];

        await unfavoriteNotecard(id, tokenCookie);
        window.location.reload();
    }

    const filteredNotecards = notecards.filter((notecard) => {
        const filteredByName = notecard.name.toLowerCase().includes(searchQuery.toLowerCase())
        if (filteredCategory === "") return filteredByName;

        const filteredByCategory = notecard.category.name.toLowerCase() === (filteredCategory.toLowerCase());

        return filteredByName && filteredByCategory;
    });

    return (
        <main className="w-full h-screen flex overflow-x-clip">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col w-4/5">
                {/* Topbar */}
                <Topbar />

                {/* Main Content */}
                <div className="ml-[25%] mt-16 w-full">
                    <h1 className="text-2xl font-semibold ml-8 mt-10">Shared</h1>

                    {/* Notecards */}
                    {filteredNotecards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <h1 className="text-2xl font-semibold text-gray-600">You don&apos;t have any notecards shared with you.</h1>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 w-full ml-10 mt-5">
                            {filteredNotecards.map((notecard) => (
                                <div
                                    key={notecard.id}
                                    className="notecard flex flex-col items-start justify-around h-60 rounded-md p-4 w-10/12 hover:cursor-pointer"
                                    onClick={() => handleNotecardClick(notecard.id)}
                                >
                                    <div className="flex flex-row items-center justify-start w-full space-x-4">
                                        <h1 className="text-xl font-medium text-[#232323]">
                                            {notecard.name}
                                        </h1>
                                        <Badge variant="destructive" onClick={() => {
                                            if (filteredCategory === "") {
                                                setFilteredCategory(notecard.category.name)
                                            } else {
                                                setFilteredCategory("")
                                            }
                                        }}>{notecard.category.name}</Badge>
                                    </div>
                                    <div className="flex flex-row items-center justify-start w-full space-x-4">
                                        <h1 className="text-sm text-[#989898]">12th Sep 22</h1>
                                        <h1 className="text-sm text-[#565656]">7 mins ago</h1>
                                    </div>
                                    <div className={`flex flex-row items-center ${notecard.content === "" ? "justify-center" : "justify-start"} w-full space-x-4 h-24`}>
                                        <h1
                                            style={{
                                                overflowWrap: "break-word",
                                                wordWrap: "break-word",
                                                overflow: "hidden",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {notecard.content || "No content"}
                                        </h1>
                                    </div>

                                    <div className="flex flex-row items-center justify-start w-full">
                                        <div className="flex flex-row space-x-4">
                                            <HiHeart color="red" onClick={() => handleUnfavoriteNotecard(notecard.id)} />
                                            <HiOutlineShare />
                                            <BiCategory />
                                        </div>

                                        <DeleteConfirmPopup notecardId={notecard.id} notecardName={notecard.name} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
