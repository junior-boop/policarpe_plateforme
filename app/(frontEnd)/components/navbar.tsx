import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <div className="h-16 ~/lg:h-[72px] px-4 lg:px-6 flex items-center w-full border-b border-slate-300">
            <div className="flex items-center justify-between w-full">
                <div className="font-serif font-bold text-xl uppercase">
                    Poles
                </div>
                <div>
                    <Button variant={'outline'} className="rounded-full"> Se connecter</Button>
                </div>
            </div>
        </div>
    )
}