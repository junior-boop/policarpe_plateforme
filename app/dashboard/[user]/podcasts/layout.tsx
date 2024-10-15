'use client'
import { ReactNode } from "react";
import ArticlesItemsSide from "../components/articlesItems";
import ArticlesContextProvider from "@/context/articlesContext";


export default function ArticlesLayout({ children }: { children: ReactNode }) {

    return (
        <ArticlesContextProvider>
            <div className="h-full flex">
                <div className="w-[500px] h-dvh border-r">
                    <ArticlesItemsSide />
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </ArticlesContextProvider>
    )
}