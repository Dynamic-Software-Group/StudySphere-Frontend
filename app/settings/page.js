import {HiHeart, HiOutlineShare, HiOutlineTrash} from "react-icons/hi";
import {BiCategory} from "react-icons/bi";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import {LiaTrashRestoreAltSolid} from "react-icons/lia";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

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
                    <h1 className="text-2xl font-semibold ml-8 mt-10">Settings</h1>

                    <div
                        className="flex flex-col items-center justify-center w-full border-b p-4 border-b-[#999] space-y-5">
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-light text-gray-500">Name</label>
                            <Input label="Name" placeholder="Name"/>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-sm font-light text-gray-500">Email</label>
                            <Input label="Email" placeholder="Email..." type="email" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-light text-gray-500">Profile Picture</label>
                            <Input label="Profile Picture" type="file"/>
                        </div>

                        <Button className="invite w-1/3 mx-auto ">Request Password Reset</Button>

                        <Button className="invite w-full">Save Changes</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
