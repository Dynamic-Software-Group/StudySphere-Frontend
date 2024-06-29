"use client";

import Image from "next/image";
import {HiOutlineDocumentChartBar} from "react-icons/hi2";
import {HiOutlineBell, HiOutlineHeart, HiOutlineShare, HiOutlineTrash} from "react-icons/hi";
import {VscSettingsGear} from "react-icons/vsc";
import NewNotePopup from "@/components/ui/NewNotePopup";

export default function Sidebar() {

    function getBarColor(targetPath) {
        const path = window.location.pathname;

        if (targetPath === "/") {
            return path === "/" ? "#5500FF" : "#ffffff";
        }
        return path.includes(targetPath) ? "#5500FF" : "#ffffff";
    }

    function getTextWeight(targetPath) {
        const path = window.location.pathname;

        if (targetPath === "/") {
            return path === "/" ? "font-semibold" : "font-medium";
        }
        return path.includes(targetPath) ? "font-semibold" : "font-medium";
    }

    return (
        <div className="flex flex-col items-center w-1/5 mr-auto border-r-2 border-[#999999] h-full">
            <div className="flex flex-row items-center justify-center w-full mt-8">
                <Image src={'/logo-small.svg'} alt={"logo"} width={35} height={35}/>
                <h1 className="text-xl ml-3 font-semibold">StudySphere</h1>
            </div>

            <NewNotePopup />

            <a href="/" className="w-full">
                <div className="w-full h-10 mt-10">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className={`h-full bg-[${getBarColor("/")}] w-[5px] rounded-r`}/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineDocumentChartBar size={22}/>
                            <h1 className={`text-md ml-2 ${getTextWeight("/")}`}>Home</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/favorites" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className={`h-full bg-[${getBarColor("/favorites")}] w-[5px] rounded-r`}/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineHeart size={22}/>
                            <h1 className={`text-md ml-2 ${getTextWeight("/favorites")}`}>Favorites</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/shared" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className={`h-full bg-[${getBarColor("/shared")}] w-[5px] rounded-r`}/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineShare size={22}/>
                            <h1 className={`text-md ml-2 ${getTextWeight("/shared")}`}>Shared</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/notifications" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className={`h-full bg-[${getBarColor("/notifications")}] w-[5px] rounded-r`}/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineBell size={22}/>
                            <h1 className={`text-md ml-2 ${getTextWeight("/notifications")}`}>Notifications</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/trash" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className={`h-full bg-[${getBarColor("/trash")}] w-[5px] rounded-r`}/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineTrash size={22}/>
                            <h1 className={`text-md ml-2 ${getTextWeight("/trash")}`}>Trash</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/settings" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className={`h-full bg-[${getBarColor("/settings")}] w-[5px] rounded-r`}/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <VscSettingsGear size={22}/>
                            <h1 className={`text-md ml-2 ${getTextWeight("/settings")}`}>Settings</h1>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}