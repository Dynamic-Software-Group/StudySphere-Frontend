"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {IoShareSocial} from "react-icons/io5";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import Image from "next/image";
import {FaRegCopy} from "react-icons/fa";
import {toast} from "@/components/ui/use-toast";
import {shareNotecard} from "@/lib/api";

export default function ShareNotecard({ notecardId }) {
    const [role, setRole] = useState('Editor')

    async function inviteUser() {
        const email = document.getElementById("email").value;
        console.log(email);

        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];

        const res = await shareNotecard(tokenCookie, notecardId, email)
        console.log(res)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <IoShareSocial color="white" size={30} className="hover:cursor-pointer"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share this notecard</DialogTitle>
                    <DialogDescription>
                        Invite your group to review and collaborate on this notecard
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="flex flex-row items-center space-x-5">
                        <Input id="email" placeholder="Enter email..." type="email"/>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="outline">{role}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setRole('Editor')}>Editor</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setRole('Viewer')}>Viewer</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="invite" type="submit" variant="ghost" onClick={() => inviteUser()}>Invite</Button>
                    </div>

                    <h1 className="mt-5 text-[#181818] font-lg">People with access</h1>

                    <div className="w-full flex flex-row items-center justify-between mt-2">
                        <div className="flex flex-row">
                            <Image src={'/placeholder-avatar.svg'} alt={"avatar"} width={30} height={30}/>
                            <div className="flex flex-col ml-2">
                                <h1 className="text-sm">Justin E</h1>
                                <h1 className="text-xs text-[#595959]">justin.e@example.com</h1>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost">{role}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Editor</DropdownMenuItem>
                                <DropdownMenuItem>Viewer</DropdownMenuItem>
                                <DropdownMenuItem>Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <h1 className="mt-5 text-[#181818] font-lg">General access</h1>

                    <div className="w-full flex flex-row items-center justify-between mt-2">
                        <div className="flex flex-row">
                            <Image src={'/link.svg'} alt={"avatar"} width={30} height={30}/>
                            <div className="flex flex-col ml-2">
                                <h1 className="text-sm">Anyone with the link</h1>
                                <h1 className="text-xs text-[#595959]">Anyone on the internet with the link can..</h1>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost">View</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem>None</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="linkcontainer rounded w-full flex-row flex items-center px-4 py-2">
                    <h1 className="text-sm text-[#59]">https://app.studysphere.com/notes/pR56G...</h1>
                    <Button variant="ghost" className="copy ml-auto text-[#1A56EB]">
                        <FaRegCopy className="mr-2" /> Copy
                    </Button>
                </div>
                <DialogFooter>
                    <Button className="invite w-full" type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
