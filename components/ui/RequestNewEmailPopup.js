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
import {sendVerificationEmail} from "@/lib/api";

export default function RequestNewEmailPopup() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-5 w-[75%] rounded-full h-10">Request New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send email</DialogTitle>
                    <DialogDescription>
                        Request a new email verification link.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Email
                        </Label>
                        <Input id="email" placeholder="you@yourname.com" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={async () => {
                            await sendVerificationEmail(document.getElementById('email').value)
                        }}>Send email</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
