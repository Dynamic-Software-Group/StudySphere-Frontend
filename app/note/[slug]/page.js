"use client"

import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {IoShareSocial} from "react-icons/io5";
import InNoteNewNotePopup from "@/components/ui/InNoteNewNotePopup";
import ShareNotecard from "@/components/ui/ShareNotecard";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {getNotecard, getNotes, summarize} from "@/lib/api";
import { Note } from "@/lib/models/note";
import {FaWandMagicSparkles} from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

const RichTextEditor = dynamic(() => import('../../../components/ui/RichTextEditor'), { ssr: false });
export default function NotecardView() {
    const [notecard, setNotecard] = useState(null);
    const [allCards, setAllCards] = useState([]);
    const [aiLoading, setAiLoading] = useState(false);

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

            await getNotecard(notecardId, tokenCookie).then((response) => {
                console.log(response);
                const notecardObj = Note.fromJson(response);
                console.log(notecardObj);
                setNotecard(notecardObj);
            });

            const allCardsResponse = await getNotes(tokenCookie);
            setAllCards(allCardsResponse.notecards);
        }
        fetchData();
    }, []);

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
                    {/*<ShareNotecard />*/}
                </div>
                <h1>Share Note</h1>
            </div>
            <div className="w-[30%] h-full flex flex-col">
                <a href={"/"} className="ml-5 mt-12 hover:cursor-pointer">
                    <h1 className="font-medium">Back</h1>
                </a>

                {allCards.map((card) => {
                    console.log(card.content)
                    console.log(new TextDecoder().decode(card.content))
                    const decodedContent = new TextDecoder().decode(new Uint8Array(Object.values(card.content)));
                    console.log(decodedContent)
                    const displayedContent = decodedContent.replace(/<[^>]*>?/gm, '').substring(0, 100);
                    return (
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
                                {displayedContent}
                            </h1>
                        </div>
                    </div>
                )})}
            </div>
            <div className="h-screen w-[63%] flex flex-col bg-[#50F]">
                {notecard && (
                    <>
                        <div className="flex items-center">
                            <div>
                                <h1 className="text-md text-[#999999] font-normal ml-5 mt-24">{formatDate(notecard.created)}</h1>
                                <h1 className="text-4xl text-white font-bold ml-5 mt-1 mb-2">{notecard.name}</h1>
                            </div>
                            <button disabled={aiLoading} className="ml-auto mt-20 mr-[5%]" onClick={async () => {
                                setAiLoading(true);
                                const decoder = new TextDecoder();
                                console.log(notecard.content)
                                const decodedContent = decoder.decode(notecard.content);
                                const content = await summarize(decodedContent, notecard.id);

                                if (content === 'Quota') {
                                    setAiLoading(false);
                                    toast.error("AI Quota reached, please try again later");
                                    return;
                                }

                                if (content === 'Moderated') {
                                    setAiLoading(false);
                                    toast.error("Content is inappropriate");
                                    return;
                                }

                                if (content === null) {
                                    setAiLoading(false);
                                    toast.error("Error occurred while summarizing content");
                                    return;
                                }

                                setAiLoading(false);
                                toast.success("Content summarized successfully, open the summaries tab to view")
                            }}>
                                <FaWandMagicSparkles color="white" width={50} height={50} />
                            </button>
                        </div>
                        <RichTextEditor content={notecard.content} />
                    </>
                )}
            </div>
        </main>
    );
}
