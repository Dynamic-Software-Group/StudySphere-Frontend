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
import {IoShareSocial} from "react-icons/io5";

export default function ShareNotecard() {
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
                <div className="">
                    <div className="flex flex-row items-center space-x-5">
                        <Input id="username" placeholder="Enter email..." type="email" />
                        <Button className="invite" type="submit" variant="ghost">Invite</Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
