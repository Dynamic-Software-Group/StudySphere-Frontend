import Image from "next/image";
import {HiOutlineHeart, HiOutlineShare, HiOutlineTrash} from "react-icons/hi";
import {BiCategory} from "react-icons/bi";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";

export default function Home() {
  return (
    <main className="w-full h-screen flex overflow-x-clip">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex flex-col w-4/5">
            {/* Topbar */}
            <Topbar />

            {/* Main Content */}
            <div className="ml-[25%] mt-16 w-full">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="w-1/3 justify-left flex flex-row items-center h-32">
                        <Image src={'/calendar.svg'} alt={"calendar"} width={40} height={40} className="ml-10"/>
                        <div className="flex flex-col ml-5">
                            <h1 className="text-lg font-semibold">Plan your projects</h1>
                            <h1 className="text-sm font-medium">Get the comfort when starting a new project</h1>
                        </div>
                    </div>
                    <div className="w-1/3 justify-left flex flex-row items-center h-32">
                        <Image src={'/lightning.svg'} alt={"lightning bolt"} width={40} height={40} className="ml-10"/>
                        <div className="flex flex-col ml-5">
                            <h1 className="text-lg font-semibold">Quick Notes</h1>
                            <h1 className="text-sm font-medium">Jot your idea down so you never lose one</h1>
                        </div>                    </div>
                    <div className="w-1/3 justify-left flex flex-row items-center h-32">
                        <Image src={'/teamwork.svg'} alt={"teamwork"} width={40} height={40} className="ml-10"/>
                        <div className="flex flex-col ml-5">
                            <h1 className="text-lg font-semibold">Collaboration</h1>
                            <h1 className="text-sm font-medium">Collaborate with the entire group</h1>
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-semibold ml-8">All Notes</h1>

                {/* Notecards */}
                <div className="grid grid-cols-2 gap-4 w-full ml-10 mt-5">
                    <div
                        className="notecard flex flex-col items-start justify-around h-60 rounded-md p-4 w-10/12">
                        <h1 className="text-xl font-medium text-[#232323]">Test Note</h1>
                        <div className="flex flex-row items-center justify-start w-full space-x-4">
                            <h1 className="text-sm text-[#989898]">12th Sep 22</h1>
                            <h1 className="text-sm text-[#565656]">7 mins ago</h1>
                        </div>
                        <h1 style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical'
                        }}>Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi dolor nunc, vestibulum nec dictum a,
                            molestie sed sapien. Integer sodales metus dolor,
                            ac malesuada nunc pharetra at. Nullam est enim,
                            vestibulum vel purus sed, fermentum.</h1>

                        <div className="flex flex-row items-center justify-start w-full">
                            <div className="flex flex-row space-x-4">
                                <HiOutlineHeart/>
                                <HiOutlineShare/>
                                <BiCategory/>
                            </div>

                            <HiOutlineTrash className="ml-auto"/>
                        </div>
                    </div>
                    <div
                        className="notecard flex flex-col items-start justify-around h-60 rounded-md p-4 w-10/12">
                        <h1 className="text-xl font-medium text-[#232323]">Test Note</h1>
                        <div className="flex flex-row items-center justify-start w-full space-x-4">
                            <h1 className="text-sm text-[#989898]">12th Sep 22</h1>
                            <h1 className="text-sm text-[#565656]">7 mins ago</h1>
                        </div>
                        <h1 style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical'
                        }}>Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi dolor nunc, vestibulum nec dictum a,
                            molestie sed sapien. Integer sodales metus dolor,
                            ac malesuada nunc pharetra at. Nullam est enim,
                            vestibulum vel purus sed, fermentum.</h1>

                        <div className="flex flex-row items-center justify-start w-full">
                            <div className="flex flex-row space-x-4">
                                <HiOutlineHeart/>
                                <HiOutlineShare/>
                                <BiCategory/>
                            </div>

                            <HiOutlineTrash className="ml-auto"/>
                        </div>
                    </div>
                    <div
                        className="notecard flex flex-col items-start justify-around h-60 rounded-md p-4 w-10/12">
                        <h1 className="text-xl font-medium text-[#232323]">Test Note</h1>
                        <div className="flex flex-row items-center justify-start w-full space-x-4">
                            <h1 className="text-sm text-[#989898]">12th Sep 22</h1>
                            <h1 className="text-sm text-[#565656]">7 mins ago</h1>
                        </div>
                        <h1 style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical'
                        }}>Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi dolor nunc, vestibulum nec dictum a,
                            molestie sed sapien. Integer sodales metus dolor,
                            ac malesuada nunc pharetra at. Nullam est enim,
                            vestibulum vel purus sed, fermentum.</h1>

                        <div className="flex flex-row items-center justify-start w-full">
                            <div className="flex flex-row space-x-4">
                                <HiOutlineHeart/>
                                <HiOutlineShare/>
                                <BiCategory/>
                            </div>

                            <HiOutlineTrash className="ml-auto"/>
                        </div>
                    </div>
                    <div
                        className="notecard flex flex-col items-start justify-around h-60 rounded-md p-4 w-10/12">
                        <h1 className="text-xl font-medium text-[#232323]">Test Note</h1>
                        <div className="flex flex-row items-center justify-start w-full space-x-4">
                            <h1 className="text-sm text-[#989898]">12th Sep 22</h1>
                            <h1 className="text-sm text-[#565656]">7 mins ago</h1>
                        </div>
                        <h1 style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical'
                        }}>Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi dolor nunc, vestibulum nec dictum a,
                            molestie sed sapien. Integer sodales metus dolor,
                            ac malesuada nunc pharetra at. Nullam est enim,
                            vestibulum vel purus sed, fermentum.</h1>

                        <div className="flex flex-row items-center justify-start w-full">
                            <div className="flex flex-row space-x-4">
                                <HiOutlineHeart/>
                                <HiOutlineShare/>
                                <BiCategory/>
                            </div>

                            <HiOutlineTrash className="ml-auto"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
