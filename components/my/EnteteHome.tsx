'use client'
import { Users } from "@/types/general";
import { User } from "lucide-react";

export default function EnteteHome({ data }: { data: Users }) {
    return (
        <div className=" pt-[100px] pb-10 border-b">
            <section className="container">
                <div className="flex gap-5 w-full items-start">
                    <div className="flex items-center justify-center w-[70px] rounded-full aspect-square bg-slate-200">
                        <User className="w-9 h-9" />
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="text-5xl font-thin">{data.name}</div>
                        <div>
                            <div className="text-xl font-bold text-slate-600"><span className="inline-block w-[100px]">E-mail :</span>{data.email}</div>
                            <div className="text-xl font-bold text-slate-600"><span className="inline-block w-[100px]">Role :</span>{data.role}</div>
                            <div className="text-xl font-bold text-slate-600"><span className="inline-block w-[100px]">Id :</span>{data.Id}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}