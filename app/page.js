"use client";

import Image from "next/image";
import { HiHeart, HiOutlineHeart, HiOutlineShare, HiOutlineTrash } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { useEffect, useState } from "react";
import { favoriteNotecard, getFavorites, getNotes, unfavoriteNotecard } from "@/lib/api";
import { Note } from "@/lib/models/note";
import CreateCategoryPopup from "@/components/ui/CreateCategoryPopup";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DeleteConfirmPopup from "@/components/ui/DeleteConfirmPopup";

const decoder = new TextDecoder();

export default function Home() {
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
                const response = await getNotes(tokenCookie);
                const favorites = await getFavorites(tokenCookie);
                const favoriteIds = favorites.notecards.map((note) => note.id);

                console.log(response);
                const notes = response.notecards.map((note) => {
                    const mappedNote = Note.fromJson(note);
                    mappedNote.favorited = favoriteIds.includes(note.id);
                    console.log(favoriteIds);
                    console.log(note.id);
                    console.log(mappedNote);

                    return mappedNote;
                });

                console.log(notes);

                setNotecards(notes);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        }
        fetchData();
    }, []);

    function getHeart(id) {
        const isFavorited = notecards.find((note) => note.id === id).favorited;
        return isFavorited ? (
            <HiHeart className="hover:cursor-pointer" color="red" onClick={() => handleUnfavoriteNotecard(id)} />
        ) : (
            <HiOutlineHeart className="hover:cursor-pointer" onClick={() => handleFavoriteNotecard(id)} />
        );
    }

    async function handleFavoriteNotecard(id) {
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];

        await favoriteNotecard(id, tokenCookie);
        window.location.reload();
    }

    async function handleUnfavoriteNotecard(id) {
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];

        await unfavoriteNotecard(id, tokenCookie);
        window.location.reload();
    }

    function handleNotecardClick(id) {
        const clickedElement = window.event.target;

        console.log(window.event.target.classList)
        if (window.event.target.tagName !== "svg" && window.event.target.tagName !== "path" && !clickedElement.classList.value.includes(
            'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300 border-transparent bg-red-500 text-neutral-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80'
        )) {
            window.location.href = `/note/${id}`;
        }
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
                <div
                    className="flex flex-row items-center justify-between w-4/5 h-16 border-b-2 border-[#999999] fixed top-0 left-1/5 right-0 bg-white z-10"
                >
                    <Input
                        type="text"
                        placeholder="Search notes..."
                        className="w-[90%] h-10 ml-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Image src={'/placeholder-avatar.svg'} alt={"avatar"} width={40} height={40} className="mx-auto" />
                </div>

                {/* Main Content */}
                <div className="ml-[25%] mt-16 w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="w-1/3 justify-left flex flex-row items-center h-32">
                            <Image src={'/calendar.svg'} alt={"calendar"} width={40} height={40} className="ml-10" />
                            <div className="flex flex-col ml-5">
                                <h1 className="text-lg font-semibold">Plan your projects</h1>
                                <h1 className="text-sm font-medium">Get the comfort when starting a new project</h1>
                            </div>
                        </div>
                        <div className="w-1/3 justify-left flex flex-row items-center h-32">
                            <Image src={'/lightning.svg'} alt={"lightning bolt"} width={40} height={40} className="ml-10" />
                            <div className="flex flex-col ml-5">
                                <h1 className="text-lg font-semibold">Quick Notes</h1>
                                <h1 className="text-sm font-medium">Jot your idea down so you never lose one</h1>
                            </div>
                        </div>
                        <div className="w-1/3 justify-left flex flex-row items-center h-32">
                            <Image src={'/teamwork.svg'} alt={"teamwork"} width={40} height={40} className="ml-10" />
                            <div className="flex flex-col ml-5">
                                <h1 className="text-lg font-semibold">Collaboration</h1>
                                <h1 className="text-sm font-medium">Collaborate with the entire group</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center w-full">
                        <h1 className="text-2xl font-semibold ml-8 mr-2">All Notes</h1>
                        <CreateCategoryPopup />
                    </div>

                    {/* Notecards */}
                    {filteredNotecards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <h1 className="text-2xl font-semibold text-gray-600">You don&apos;t have any notecards.</h1>
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
                                        }}>{notecard.category.name}</Badge>                                    </div>
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
                                            {notecard.content ? decoder.decode(new Uint8Array(notecard.content)) : "No content"}
                                        </h1>
                                    </div>

                                    <div className="flex flex-row items-center justify-start w-full">
                                        <div className="flex flex-row space-x-4">
                                            {getHeart(notecard.id)}
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
