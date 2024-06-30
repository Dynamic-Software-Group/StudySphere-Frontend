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
import {createCategory} from "@/lib/api";

export default function CreateCategoryPopup() {

    async function handleCreateCategory() {
        const name = document.getElementById("name").value;
        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];
        await createCategory(name, tokenCookie);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-2 font-bold" type="submit" variant="outline">
                    <GoPlusCircle className="mr-1" /> Create new category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a category</DialogTitle>
                    <DialogDescription>
                        Create a new category for your notes
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input id="name" placeholder="Enter group name..." type="text"  />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="invite w-full" type="submit" onClick={() => handleCreateCategory()}>Create category</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}