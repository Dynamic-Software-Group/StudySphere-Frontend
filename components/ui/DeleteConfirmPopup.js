"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {GoPlusCircle} from "react-icons/go";
import {createCategory, deleteNotecard} from "@/lib/api";
import {HiOutlineTrash} from "react-icons/hi";
import {Checkbox} from "@/components/ui/checkbox";
import {toast} from "sonner";

export default function DeleteConfirmPopup({ notecardName, notecardId }) {

    async function handleDeleteNotecard() {
        const confirmCheckbox = document.getElementById("confirm");
        const checked = confirmCheckbox.getAttribute("data-state") === "checked";

        console.log(checked)

        if (!checked) {
            toast.error("Please confirm that you want to delete this notecard.");
        } else {
            const tokenCookie = document.cookie
                .split(";")
                .find((cookie) => cookie.includes("token"))
                .split("=")[1];

            const deleted = await deleteNotecard(notecardId, tokenCookie);

            if (deleted) {
                toast.success("Notecard deleted successfully.");
                window.location.reload();
            } else {
                toast.error("Error deleting notecard.");
            }
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <HiOutlineTrash className="ml-auto" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirm deletion</DialogTitle>
                    <DialogDescription>
                        <span className="text-red-600">Are you sure you want to delete the notecard <span className="font-bold">{notecardName}</span><span className="font-normal">?</span></span>
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="confirm"/>
                        <label
                            htmlFor="confirm"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I am sure I want to delete this notecard.
                        </label>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="invite w-full" type="submit" onClick={() => handleDeleteNotecard()}>Delete card</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}