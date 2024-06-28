import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full h-screen">
      <div className="flex flex-col items-center w-1/5 mr-auto border-r-2 border-[#999999] h-full">
          <div className="flex flex-row items-center justify-center w-full mt-8">
              <Image src={'/logo-small.svg'} alt={"logo"} width={35} height={35} />
              <h1 className="text-xl ml-3 font-semibold">StudySphere</h1>
          </div>

          <Button className="new-note-button mt-10 bg-[#5500FF] text-white hover:drop-shadow-xl transition-all w-[80%]">+ New Note</Button>

          <Button className="w-full mt-12 rounded-none bg-white">All Notes</Button>
      </div>
    </main>
  );
}
