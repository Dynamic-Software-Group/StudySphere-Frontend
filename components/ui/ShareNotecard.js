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
import {useEffect, useState} from "react";
import Image from "next/image";
import {FaRegCopy} from "react-icons/fa";
import {getCollaborators, shareNotecard} from "@/lib/api";
import {Collaborator} from "@/lib/models/collaborator";
import {toast} from "sonner";

export default function ShareNotecard({ notecardId }) {
    const [role, setRole] = useState('Editor')
    const [collaborators, setCollaborators] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const tokenCookie = document.cookie
                .split(";")
                .find((cookie) => cookie.includes("token"))
                .split("=")[1];

            const res = await getCollaborators(tokenCookie, notecardId)
            console.log(res)

            const collabs = res.map((collab) => new Collaborator(collab.name, collab.email, collab.base64Pfp, collab.role, collab.id))

            setCollaborators(collabs)
        }

        fetchData()
    }, []);

    async function inviteUser() {
        setLoading(true)
        const email = document.getElementById("email").value;
        console.log(email);

        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];

        const res = await shareNotecard(tokenCookie, notecardId, email)

        if (res === "already shared") {
            toast.error("This user has already been invited")
            setLoading(false)
            return
        }

        const collabObj = new Collaborator(res.name, res.email, res.base64Pfp)

        setCollaborators([...collaborators, collabObj])

        setLoading(false)
        toast.info("User invited successfully")
    }

    async function copyLink() {
        await navigator.clipboard.writeText(window.location.href);

        toast.success("Link copied to clipboard")
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
                        <Button disabled={loading} className="invite" type="submit" variant="ghost" onClick={() => inviteUser()}>
                            {loading ? "Inviting..." : "Invite"}
                        </Button>
                    </div>

                    <h1 className="mt-5 text-[#181818] font-lg">People with access</h1>

                    {collaborators.map((collaborator) => (
                        <div key={collaborator.id} className="w-full flex flex-row items-center justify-between mt-2">
                            <div className="flex flex-row">
                                <Image src={collaborator.base64Pfp || '/placeholder-avatar.svg'} alt="avatar" width={30} height={30} />
                                <div className="flex flex-col ml-2">
                                    <h1 className="text-sm">{collaborator.name}</h1>
                                    <h1 className="text-xs text-[#595959]">{collaborator.email}</h1>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost">{collaborator.role}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => updateRole(collaborator.id, 'Editor')}>Editor</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateRole(collaborator.id, 'Viewer')}>Viewer</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => removeCollaborator(collaborator.id)}>Remove</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}


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
                    <h1 className="text-sm text-[#59]">https://app.studysphere.com/notes/{window.location.href.split("/")[4].substring(0, 4)}...</h1>
                    <Button variant="ghost" className="copy ml-auto text-[#1A56EB]" onClick={() => copyLink()}>
                        <FaRegCopy className="mr-2" /> Copy
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
