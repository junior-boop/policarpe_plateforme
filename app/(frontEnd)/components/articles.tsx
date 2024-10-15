'use client'
import { LucideFileAudio } from "@/components/icons"
import { LucideCirclePlay } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Model_Ecrit_1() {
    return (
        <div>
            <div className="w-full aspect-[3/2] object-cover overflow-hidden relative rounded-lg">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbB3stDOHE2a5BUDd5tkx28DJmTOsUr_c0Bg&s" alt="" className="w-full h-full object-cover" />
                <div className="absolute z-[1] bg-[#0003] w-full h-full top-0 left-0 flex items-end justify-start p-4">
                    <div className="font-anto  text-white text-2xl">
                        Sport
                    </div>
                </div>
            </div>
            <div className="py-3">
                <div className="font-bold text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor ligula...</div>
                <div className="pt-2">Par Polycarpe Essomba | 02 jours</div>
            </div>
        </div>
    )
}


export function Model_Audio_Une() {
    return (
        <div className="overflow-hidden w-full aspect-square rounded-xl bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(https://actucameroun.com/wp-content/uploads/2024/09/tournoi-uniffac-2024-1140x480.jpg.webp)' }}>
            <div className="w-full h-full bg-[#0003] flex items-end p-8">
                <div>
                    <div className="bg-[#ff0044] text-white font-bold text-base w-fit px-2 py-1 uppercase mb-2">Sport</div>
                    <div className=" flex text-white gap-4">
                        <div className="flex-1">
                            <div className="font-anto text-3xl">
                                Tournoi UNIFFAC 2024 : les Lions U20 sont à Brazzaville
                            </div>
                            <div>
                                12/09/2024
                            </div>
                        </div>
                        <div className="w-[20%] aspect-square flex justify-center items-center text-3xl">
                            <LucideFileAudio />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Model_Audio() {
    return (
        <div className="flex gap-7">
            <div className="w-[150px] aspect-square rounded-md bg-slate-200">

            </div>
            <div className=" flex-1">
                <div className="font-bold text-[#ff0044]">Politique</div>
                <div className="font-bold text-white text-xl">Fusce in dapibus diam. Nulla at massa eget nibh mattis porta. </div>
                <div>
                    <div className="py-2 flex gap-3 items-center">
                        <div className="text-xl text-white">
                            <LucideFileAudio />
                        </div>
                        <div className="text-white">3min 26s</div>
                    </div>
                    <div className="text-slate-300 text-sm font-bold">
                        12/09/2024
                    </div>
                </div>

            </div>
        </div>
    )
}



export function Model_Ecrit_2() {
    const titre = `Un podium 100 % camerounais au 30e Tour de Côte d’Ivoire`
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus est quam iste? Lorem ipsum dolor sit am...'
    return (
        <div className="model_ecrit_2">
            <div className="font-bold text-xl text-white">{titre.length > 65 ? `${titre.substring(0, 65)}...` : titre}</div>
            <div className="text-white mb-2 ">{text.length > 72 ? `${text.substring(0, 60)}...` : text}</div>
            <div className="text-slate-300 text-sm font-bold">
                12/09/2024
            </div>
        </div>
    )
}

export function Lien_rapide({ name, id }: { name: string, id: string }) {
    const [active, setActive] = useState(false)
    const router = usePathname()

    useEffect(() => {
        console.log(router)
        if (router === `/rubrique/${name}`) {
            setActive(true)
        }
    }, [router])
    return (
        <Link href={`/rubrique/${name}`} className="relative flex h-full items-center ">
            <div className="px-2 font-bold text-xl capitalize">{name}</div>
            {active && <div className="h-[3px] bg-red-500 absolute bottom-0 w-full"></div>}
        </Link>
    )
}

export function Model_video() {
    return (
        <div>
            <div className="w-full aspect-[3/2] object-cover overflow-hidden relative rounded-lg">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbB3stDOHE2a5BUDd5tkx28DJmTOsUr_c0Bg&s" alt="" className="w-full h-full object-cover" />
                <div className="absolute z-[1] bg-[#0003] w-full h-full top-0 left-0 flex items-end justify-start p-4">
                    <div className="flex gap-2 items-center">
                        <div className="font-anto  text-white text-4xl">
                            <LucideCirclePlay />
                        </div>
                        <div className="text-white font-bold">
                            12min 32s
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3">
                <div className="font-bold text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor ligula...</div>
            </div>
        </div>
    )
}


export function ActusItem() {
    return (
        <div className="actu-item flex gap-6">
            <div className="flex-1">
                <div className="font-bold text-red-500 uppercase">internationnal</div>
                <div className="font-anto text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facilis nemo architecto!</div>
                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facilis nemo architecto!</div>
            </div>
            <div className="w-[180px] aspect-square rounded-xl bg-black">

            </div>
        </div>
    )
}

export function Opinions() {
    return (
        <div className="flex gap-3 items-start">
            <div className="flex-1">
                <div className="font-bold text-xl ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed perferendis eligendi?</div>
                <div>par Daniel Seppo Eke</div>
            </div>
            <div className="w-[90px] rounded-full aspect-square bg-slate-300"></div>
        </div>
    )
}