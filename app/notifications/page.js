import {HiHeart, HiOutlineHeart, HiOutlineShare, HiOutlineTrash} from "react-icons/hi";
import {BiCategory} from "react-icons/bi";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import Image from "next/image";

export default function Favorites() {
    return (
        <main className="w-full h-screen flex overflow-x-clip">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col w-4/5">
                {/* Topbar */}
                <Topbar />

                {/* Main Content */}
                <div className="ml-[25%] mt-16 w-full">
                    <h1 className="text-2xl font-semibold ml-8 mt-10">Notifications</h1>

                    <div className="flex flex-row items-center justify-start w-full border-b p-4 border-b-[#999]">
                        <Image src={'/placeholder-avatar.svg'} alt={"avatar"} width={30} height={30}/>
                        <h1 className="text-md font-normal ml-2"><span className="font-medium">Justin E</span> <span
                            className="font-light text-gray-500">joined your notecard</span> <span
                            className="text-blue-600">Job Interview Prep</span></h1>

                        <h1 className="text-sm font-light text-gray-500 ml-auto">7 March 2023 • 12:12 AM</h1>
                    </div>

                    <div className="flex flex-row items-center justify-start w-full border-b p-4 border-b-[#999]">
                        <Image src={'/placeholder-avatar.svg'} alt={"avatar"} width={30} height={30}/>
                        <h1 className="text-md font-normal ml-2"><span className="font-medium">Justin E</span> <span
                            className="font-light text-gray-500">left your notecard</span> <span
                            className="text-blue-600">Job Interview Prep</span></h1>
                        <h1 className="text-sm font-light text-gray-500 ml-auto">7 March 2023 • 2:42 PM</h1>
                    </div>
                </div>
            </div>
        </main>
    );
}
