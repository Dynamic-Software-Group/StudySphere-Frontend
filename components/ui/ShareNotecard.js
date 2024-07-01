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
                        <Button disabled={loading} className="invite" type="submit" variant="ghost" onClick={() => inviteUser()}>
                            {loading ? "Inviting..." : "Invite"}
                        </Button>
                    </div>

                    <h1 className="mt-5 text-[#181818] font-lg">People with access</h1>

                    {collaborators.map((collaborator) => (
                        <div key={collaborator.id} className="w-full flex flex-row items-center justify-between mt-2">
                            <div className="flex flex-row">
                                <div className="flex flex-col ml-2">
                                    <h1 className="text-sm">{collaborator.name}</h1>
                                    <h1 className="text-xs text-[#595959]">{collaborator.email}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
