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
import CategoriesComboBox from "@/components/ui/CategoriesComboBox";
import {createNotecard} from "@/lib/api";
import Image from "next/image";

export default function InNoteNewNotePopup() {
    async function handleCreateNote() {
        const title = document.getElementById("username").value;
        const category = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("category"))
            .split("=")[1];

        const tokenCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.includes("token"))
            .split("=")[1];

        await createNotecard(title, category, tokenCookie);

        document.cookie = `category=none; path=/`;

        window.location.reload();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className="h-14 w-14 bg-[#333] rounded-full mt-36 flex items-center justify-center hover:cursor-pointer">
                    <Image src={'/plus.svg'} alt={"plus"} width={40} height={40}/>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a note</DialogTitle>
                    <DialogDescription>
                        This is the start of something great
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input id="username" placeholder="Enter title..." type="text"/>
                    <div className="flex flex-row w-full mt-2">
                        <CategoriesComboBox />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="invite w-full" type="submit" onClick={() => handleCreateNote()}>Create note</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
