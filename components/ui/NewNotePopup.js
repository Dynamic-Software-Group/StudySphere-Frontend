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
import { Label } from "@/components/ui/label"
import CategoriesComboBox from "@/components/ui/CategoriesComboBox";
import {GoPlusCircle} from "react-icons/go";
import CreateCategoryInNewNotePopup from "@/components/ui/CreateCategoryInNewNotePopup";

export default function NewNotePopup() {
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
                        <CreateCategoryInNewNotePopup />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="invite w-full" type="submit">Create note</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
