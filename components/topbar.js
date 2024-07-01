import {Input} from "@/components/ui/input";
import Image from "next/image";

export default function Topbar() {
    return (
        <div className="flex flex-row items-center justify-between w-4/5 h-16 border-b-2 border-[#999999] fixed top-0 left-1/5 right-0 bg-white z-10">
            <Input type="text" placeholder="Search notes..." className="w-[90%] h-10 mx-auto"/>
        </div>
    )
}