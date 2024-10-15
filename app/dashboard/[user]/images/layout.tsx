import { ReactNode } from "react";
import ImagesItemsSide from "./_components/imagesItemsSide";
import ImagesContextProvider from "@/context/imagesContext";


export default function ArticlesLayout({ children }: { children: ReactNode }) {

    return (
        <ImagesContextProvider>
            <div className="h-full flex">
                <div className="flex-1 h-dvh border-r">
                    <ImagesItemsSide />
                </div>
                <div className="w-[500px]">
                    {children}
                </div>
            </div>
        </ImagesContextProvider>
    )
}