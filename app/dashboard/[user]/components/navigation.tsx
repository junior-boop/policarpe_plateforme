'use client'
import { LoginBtn } from "@/components/my/loginbtn";
import { ApiResponse, Auteur } from "@/types/general";
import NavButton from "./navbarButton";
import { FileAudio, Image, Newspaper, User, UserPlus, Video, View } from "lucide-react";
import { useGlobalContext } from "@/context/globalcontext";
import { useEffect, useState } from "react";

interface User extends Auteur {
    ID: string,
    createdAt: string,
    updatedAt: string
}

export default function Navigation({ user }: { user: User }) {
    const { navigation } = useGlobalContext()
    const [AllAuteur, setAllAuteur] = useState<User[]>([])

    const basePath = `/dashboard/user_${user.ID}`

    const navigationRoute: { name: string, nombre?: number, icon: React.ReactNode, lien?: string, basePath: string, route?: string }[] = [
        {
            name: "Aperçu",
            icon: <View className="w-5 h-5" />,
            basePath,
            route: ''
        },
        {
            name: "Articles",
            icon: <Newspaper className="w-5 h-5" />,
            nombre: navigation.articles,
            basePath,
            route: '/articles'
        },
        {
            name: "Podcasts",
            icon: <FileAudio className="w-5 h-5" />,
            nombre: navigation.podcast,
            basePath,
            route: '/podcasts'
        },
        {
            name: "Vidéos",
            icon: <Video className="w-5 h-5" />,
            nombre: navigation.videos,
            basePath,
            route: "/videos"
        },
        {
            name: "Images",
            icon: <Image className="w-5 h-5" />,
            nombre: navigation.images,
            basePath,
            route: '/images'
        },
    ]

    const userRoute: { name: string, nombre?: number, icon: React.ReactNode, lien?: string, basePath: string, route?: string }[] = [
        {
            name: "Profils",
            icon: <User className="w-5 h-5" />,
            basePath,
            route: '/profils'
        },
        {
            name: "Ajouter un Auteurs",
            icon: <UserPlus className="w-5 h-5" />,
            basePath,
            route: '/signup'
        },

    ]

    async function getData() {
        const request = await fetch('/api/auteur')
        const auteurs = await request.json() as ApiResponse
        setAllAuteur(auteurs.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-[325px] border-r h-dvh">
            <div className="px-6 py-3 border-b">
                <LoginBtn data={user} />
            </div>
            <div>
                <div className="pl-5 pr-4 py-5 border-b">
                    {
                        navigationRoute.map((el, key) => <NavButton {...el} key={key} />)
                    }
                </div>
                <div className="pl-5 pr-4 py-5 border-b">
                    {
                        userRoute.map((el, key) => <NavButton {...el} key={key} />)
                    }
                </div>
                <div className="pl-5 pr-4 py-5">
                    <div className="pb-3">Tous les Auteurs</div>
                    {
                        AllAuteur.map(el => <AuteursComponent data={el} key={el.ID} />)
                    }
                </div>
            </div>
        </div>
    )
}

function AuteursComponent({ data }: { data: User }) {
    return (
        <div className="flex gap-2">
            <div className="w-[43px] h-[43px] rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1">
                <div className="font-bold text-slate-700">{data.surname} {data.name}</div>
                <div>{data.email}</div>
            </div>
        </div>
    )
}