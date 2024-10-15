'use client'

import { useArticlesContext } from "@/context/articlesContext"
import { Articles } from "@/types/general"
import { ImageOff, RefreshCw, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import { useRouter, useParams } from "next/navigation"
import * as calendar from 'dayjs/plugin/calendar'
import { Button } from "@/components/ui/button"

export function ArticlesListe({ articles }: { articles: Articles[] }) {

    return (
        <div className="liste overflow-y-auto overflow-x-hidden px-2 pb-6">
            <div className="space-y-3">
                {
                    articles.map(el => <ArticlesItems data={el} key={el.ID} />)
                }
            </div>
        </div>
    )
}

export function ArticlesItems({ data }: { data: Articles }) {
    const image = data.image === 'null' ? 'null' : `http://localhost:8787/image/preview/${data.image}`
    const { save } = useArticlesContext()
    const { reload, setReload } = save
    //@ts-ignore
    dayjs.extend(calendar)
    //@ts-ignore
    const create = dayjs(data.createdAt).format('DD/MM/YYYY HH:mm:ss')
    const modifer = dayjs(data.updatedAt).format('DD/MM/YYYY HH:mm:ss')
    // const create = dayjs().calendar(dayjs(date))
    // /dashboard/user_2a09948e-7e19-48d4-89ea-9bc1584278dd/articles 
    const router = useRouter()
    const { user, articleID } = useParams()


    return (
        <button className="bg-white border border-slate-300 rounded-lg min-h-[150px] flex items-stretch p-3 gap-3 w-full text-left hover:bg-slate-50">
            <div onClick={() => router.replace(`/dashboard/${user}/articles/${data.ID}`)} className="flex-1">
                <div className="font-semibold text-slate-700 text-lg mb-3">
                    {data.titre}
                </div>
                <div className="text-sm font-bold text-slate-500">Créer le : {create}</div>
                <div className="text-sm font-bold text-slate-500">Modifer le : {modifer}</div>
                <div className="text-sm font-bold text-slate-500">Auteur : {data.Auteur?.surname} {data.Auteur?.name}</div>
                <div className="w-full font-semibold text-sm mt-3 flex gap-2">
                    <span className="px-2 py-1 border rounded-sm bg-white">#{data.rubrique?.slug}</span>
                    {
                        data.articleID !== null
                            ? <span className="inline-block px-2 py-1 bg-green-200 text-green-950 rounded-md">Publiée</span>
                            : <span className="inline-block px-2 py-1 bg-yellow-200 text-yellow-800 rounded-md">Brouillon</span>
                    }
                </div>
            </div>
            <div className="w-[100px] flex flex-col justify-between items-end">
                <div className="w-[100px] aspect-square rounded-sm overflow-hidden bg-slate-100 flex items-center justify-center mb-2">
                    {
                        image === 'null'
                            ? <ImageOff className="h-7 w-7" />
                            : <img src={image} alt="" />
                    }
                </div>
                <div>
                    <Button onClick={async () => {
                        setReload(false)
                        const bodyContent = new FormData()
                        //@ts-ignore
                        bodyContent.append('articleID', data.ID)

                        const request = await fetch('/api/articles/new', {
                            method: "DELETE",
                            body: bodyContent
                        })

                        if (request.ok) {
                            setReload(true)
                            if (articleID !== undefined && articleID === data.ID) {
                                console.log(true)
                                router.push(`/dashboard/${user}/articles`)
                            }
                        }
                    }} variant={'outline'} className="w-[40px] aspect-square p-0 flex items-center justify-center">
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </button>
    )
}

export default function ArticlesItemsSide() {
    const { save } = useArticlesContext()
    const [articles, setAtricles] = useState([])
    const [rotate, setRotate] = useState(false)
    const { reload } = save

    async function getData() {
        const request = await fetch('/api/articles')
        const response = await request.json()

        setAtricles(response.data.data)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (reload) getData()
    }, [reload])

    useEffect(() => {
        if (rotate) {
            const t1 = setTimeout(() => {
                setRotate(false)
            }, 500)
        }


    }, [rotate])
    return (
        //@ts-ignore
        <>
            <div className="h-[67px] border-b flex items-center px-4">
                <div className="flex gap-4 items-center">
                    <span className="font-inter font-bold text-2xl">Articles</span>
                    <button onClick={async () => {
                        await getData()
                        setRotate(true)
                    }}>
                        <RefreshCw className={`h-5 w-5 rotate-0 duration-300 ease-in-out  ${rotate ? "rotate-[360deg]" : ""}`} />
                    </button>
                </div>
            </div>
            <div className="pt-4">
                <div className="px-4 pb-4">
                    <div className="border rounded-md px-4 py-2 bg-white shadow-sm flex items-end gap-3 text-slate-600" >
                        <div className="pb-[2px]">
                            <Search className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">Recherche</span>
                    </div>
                </div>
                {
                    articles.length === 0
                        ? (<div className="liste overflow-y-auto overflow-x-hidden px-2 pb-6">
                            <div className="bg-slate-50 border rounded-lg h-[150px] flex items-center justify-center text-slate-600">
                                Aucun article pour le moment
                            </div></div>)
                        : <ArticlesListe articles={articles} />
                }

            </div>
        </>
    )
}