"use client"

import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import InNoteNewNotePopup from "@/components/ui/InNoteNewNotePopup";
import ShareNotecard from "@/components/ui/ShareNotecard";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getNotecard, getNotes } from "@/lib/api";
import { Note } from "@/lib/models/note";

const RichTextEditor = dynamic(() => import('../../../components/ui/RichTextEditor'), { ssr: false });

export default function NotecardView() {
    const [notecard, setNotecard] = useState(null);
    const [allCards, setAllCards] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    useEffect(() => {
        async function fetchData() {
            const notecardId = window.location.pathname.split("/")[2];
            const tokenCookie = document.cookie
                .split(";")
                .find((cookie) => cookie.includes("token"))
                .split("=")[1];

            const notecardResponse = await getNotecard(notecardId, tokenCookie);
            const notecardObj = Note.fromJson(notecardResponse);
            setNotecard(notecardObj);

            const allCardsResponse = await getNotes(tokenCookie);
            setAllCards(allCardsResponse.notecards);

            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="h-screen w-full flex flex-row">
            <div className="w-[7%] h-full flex flex-col items-center border-r-2 border-[#999999]">
                <InNoteNewNotePopup />
                <h1>New Note</h1>

                <div className="h-14 w-14 bg-[#F97068] rounded-full mt-10 flex items-center justify-center">
                    <FaArrowUp color="white" size={30} />
                </div>
                <h1>Prev. Note</h1>

                <div className="h-14 w-14 bg-[#DEB841] rounded-full mt-10 flex items-center justify-center">
                    <FaArrowDown color="white" size={30} />
                </div>
                <h1>Next Note</h1>

                <div className="h-14 w-14 bg-[#D1613C] rounded-full mt-10 flex items-center justify-center">
                    <ShareNotecard notecardId={notecard.id} />
                </div>
                <h1>Share Note</h1>
            </div>
            <div className="w-[30%] h-full flex flex-col">
                <a href={"/"} className="ml-5 mt-12 hover:cursor-pointer">
                    <h1 className="font-medium">Back</h1>
                </a>

                {allCards.map((card) => (
                    <div
                        key={card.id}
                        className={`flex h-36 rounded-md flex-row justify-start w-[95%] mx-auto mt-5 p-4 transition-all ${
                            card.id === notecard?.id ? "bg-[#BBE0B6]" : "hover:bg-[#BBE0B6] hover:cursor-pointer"
                        }`}
                        onClick={() => window.location.href = `/note/${card.id}`}
                    >
                        <div className="flex flex-col items-center">
                            <h1 className="text-md text-[#383838] font-medium">
                                {new Date(card.created).getDate()}
                            </h1>
                            <h1 className="text-md text-[#383838]">
                                {new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(card.created))}
                            </h1>
                        </div>

                        <div className="flex flex-col items-start mt-1 ml-5">
                            <h1 className="text-lg font-medium">{card.name}</h1>
                            <h1
                                className="text-md text-[#383838]"
                                style={{
                                    overflowWrap: "break-word",
                                    wordWrap: "break-word",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {card.content}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-screen w-[63%] flex flex-col bg-[#50F]">
                {notecard && (
                    <>
                        <h1 className="text-md text-[#999999] font-normal ml-5 mt-24">{formatDate(notecard.created)}</h1>
                        <h1 className="text-4xl text-white font-bold ml-5 mt-1 mb-2">{notecard.name}</h1>
                        <RichTextEditor content={notecard.content} />
                    </>
                )}
            </div>
        </main>
    );
}
