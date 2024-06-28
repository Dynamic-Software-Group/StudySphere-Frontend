import Image from "next/image";
import {Button} from "@/components/ui/button";
import {HiOutlineDocumentChartBar} from "react-icons/hi2";
import {HiOutlineBell, HiOutlineHeart, HiOutlineSearch, HiOutlineShare, HiOutlineTrash} from "react-icons/hi";
import {VscSettingsGear} from "react-icons/vsc";
import {Input} from "@/components/ui/input";

export default function Home() {
  return (
    <main className="w-full h-screen flex">
        {/* Sidebar */}
        <div className="flex flex-col items-center w-1/5 mr-auto border-r-2 border-[#999999] h-full">
            <div className="flex flex-row items-center justify-center w-full mt-8">
                <Image src={'/logo-small.svg'} alt={"logo"} width={35} height={35}/>
                <h1 className="text-xl ml-3 font-semibold">StudySphere</h1>
            </div>

            <Button
                className="new-note-button mt-10 bg-[#5500FF] text-white hover:drop-shadow-xl transition-all w-[80%]">+
                New Note</Button>

            <a href="/" className="w-full">
                <div className="w-full h-10 mt-10">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className="h-full bg-[#5500FF] w-[5px] rounded-r"/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineDocumentChartBar size={22}/>
                            <h1 className="text-md ml-2 font-semibold">Home</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className="h-full bg-white w-[5px] rounded-r"/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineHeart size={22}/>
                            <h1 className="text-md ml-2 font-medium">Favorites</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className="h-full bg-white w-[5px] rounded-r"/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineShare size={22}/>
                            <h1 className="text-md ml-2 font-medium">Shared Notes</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className="h-full bg-white w-[5px] rounded-r"/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineBell size={22}/>
                            <h1 className="text-md ml-2 font-medium">Notifications</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className="h-full bg-white w-[5px] rounded-r"/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <HiOutlineTrash size={22}/>
                            <h1 className="text-md ml-2 font-medium">Trash</h1>
                        </div>
                    </div>
                </div>
            </a>

            <a href="/" className="w-full">
                <div className="w-full h-10 mt-5">
                    <div className="flex flex-row items-center justify-center w-full h-full">
                        <div className="h-full bg-white w-[5px] rounded-r"/>
                        <div className="flex flex-row items-center justify-left w-full pl-6">
                            <VscSettingsGear size={22}/>
                            <h1 className="text-md ml-2 font-medium">Settings</h1>
                        </div>
                    </div>
                </div>
            </a>
        </div>

        <div className="flex flex-col w-4/5">
            {/* Topbar */}
            <div className="flex flex-row items-center justify-between w-full h-16 border-b-2 border-[#999999]">
                <Input type="text" placeholder="Search notes..." className="w-[90%] h-10 ml-10" />
                <Image src={'/placeholder-avatar.svg'} alt={"avatar"} width={40} height={40} className="mx-auto"/>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
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
            </div>
        </div>
    </main>
  );
}
