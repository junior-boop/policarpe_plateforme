"use client";

import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavButton({ icon, name, lien, nombre, basePath, route }: { icon: React.ReactNode, name: string, lien?: string, nombre?: number, basePath: string, route?: string }) {
    const path = usePathname()
    const bp = basePath

    const [active, setActive] = useState(false)

    const newRoute = basePath + route
    useEffect(() => {
        if (newRoute === path) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [path])

    return (
        <Link href={newRoute} className={cn("navButton flex items-center justify-between py-2 px-3 rounded-md hover:bg-slate-100 text-slate-700", active && " bg-slate-900 text-white hover:bg-slate-900")}>
            <div className="flex items-center gap-4">
                {icon}
                <span className="font-bold">{name}</span>
            </div>
            <div className="font-bold">
                {nombre}
            </div>
        </Link>
    )
}