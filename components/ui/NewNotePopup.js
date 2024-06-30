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
import { Label } from "@/components/ui/label"
import CategoriesComboBox from "@/components/ui/CategoriesComboBox";
import {GoPlusCircle} from "react-icons/go";
import CreateCategoryPopup from "@/components/ui/CreateCategoryPopup";
import {createNotecard} from "@/lib/api";

export default function NewNotePopup() {
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
                <Button className="new-note-button mt-10 bg-[#5500FF] text-md text-white hover:drop-shadow-xl transition-all w-[80%]">+ New Note</Button>
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
