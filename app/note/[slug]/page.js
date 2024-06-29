"use client"

import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {IoShareSocial} from "react-icons/io5";
import InNoteNewNotePopup from "@/components/ui/InNoteNewNotePopup";
import ShareNotecard from "@/components/ui/ShareNotecard";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import('../../../components/ui/RichTextEditor'), { ssr: false });
export default function NotecardView() {
    return (
        <main className="h-screen w-full flex flex-row">
            <div className="w-[7%] h-full flex flex-col items-center border-r-2 border-[#999999]">
                <InNoteNewNotePopup/>
                <h1>New Note</h1>

                <div className="h-14 w-14 bg-[#F97068] rounded-full mt-10 flex items-center justify-center">
                    <FaArrowUp color="white" size={30}/>
                </div>
                <h1>Prev. Note</h1>

                <div className="h-14 w-14 bg-[#DEB841] rounded-full mt-10 flex items-center justify-center">
                    <FaArrowDown color="white" size={30}/>
                </div>
                <h1>Next Note</h1>

                <div className="h-14 w-14 bg-[#D1613C] rounded-full mt-10 flex items-center justify-center">
                    <ShareNotecard />
                </div>
                <h1>Share Note</h1>

            </div>
            <div className="w-[30%] h-full flex flex-col">
                <a href={"/"} className="ml-5 mt-12 hover:cursor-pointer">
                    <h1 className="font-medium">Back</h1>
                </a>

                <div className="flex h-36 rounded-md flex-row justify-start w-[95%] mx-auto mt-5 bg-[#BBE0B6] p-4">
                    <div className="flex flex-col items-center">
                        <h1 className="text-md text-[#383838] font-medium">15</h1>
                        <h1 className="text-md text-[#383838]">Monday</h1>
                    </div>

                    <div className="flex flex-col items-start mt-1 ml-5">
                        <h1 className="text-lg font-medium">Job interview prep</h1>
                        <h1 className="text-md text-[#383838]"
                            style={{
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla mollis neque nec
                            efficitur. Quisque imperdiet eros sem, id ultrices dolor dapibus volutpat. Cras luctus arcu
                            in massa pellentesque aliquet. Aliquam rutrum pulvinar luctus. Nullam at leo tristique,
                            tincidunt lacus quis, posuere elit. In quam felis, gravida in semper at, gravida ac ipsum.
                            Suspendisse eget posuere metus. Fusce gravida leo sed porttitor convallis. Etiam venenatis
                            nibh non sapien scelerisqu
                        </h1>
                    </div>
                </div>

                <div
                    className="flex h-36 rounded-md flex-row justify-start w-[95%] mx-auto mt-5 hover:bg-[#BBE0B6] hover:cursor-pointer transition-all p-4">
                    <div className="flex flex-col items-center">
                        <h1 className="text-md text-[#383838] font-medium">15</h1>
                        <h1 className="text-md text-[#383838]">Monday</h1>
                    </div>

                    <div className="flex flex-col items-start mt-1 ml-5">
                        <h1 className="text-lg font-medium">Test Note</h1>
                        <h1 className="text-md text-[#383838]"
                            style={{
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical'
                            }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla mollis neque nec
                            efficitur. Quisque imperdiet eros sem, id ultrices dolor dapibus volutpat. Cras luctus arcu
                            in massa pellentesque aliquet. Aliquam rutrum pulvinar luctus. Nullam at leo tristique,
                            tincidunt lacus quis, posuere elit. In quam felis, gravida in semper at, gravida ac ipsum.
                            Suspendisse eget posuere metus. Fusce gravida leo sed porttitor convallis. Etiam venenatis
                            nibh non sapien scelerisqu
                        </h1>
                    </div>
                </div>
            </div>
            <div className="h-screen w-[63%] flex flex-col bg-[#50F]">
                <h1 className="text-md text-[#999999] font-normal ml-5 mt-24">June 12, 2023</h1>
                <h1 className="text-4xl text-white font-bold ml-5 mt-1 mb-10">Job Interview Prep</h1>

                <RichTextEditor />
            </div>
        </main>
    )
}