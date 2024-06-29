import {Input} from "@/components/ui/input";
import Image from "next/image";

export default function Topbar() {
    return (
        <div className="flex flex-row items-center justify-between w-full h-16 border-b-2 border-[#999999]">
            <Input type="text" placeholder="Search notes..." className="w-[90%] h-10 ml-10"/>
            <Image src={'/placeholder-avatar.svg'} alt={"avatar"} width={40} height={40} className="mx-auto"/>
        </div>
    )
}