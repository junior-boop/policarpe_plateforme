'use client'
import { useImagesContext } from "@/context/imagesContext"
import dayjs from "dayjs"
import { RefreshCw, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type imageItems = {
    ID: string,
    name: string,
    size: number,
    minetype: string,
    lastmodified: number,
    originalname: string,
    path: string,
    createdAt: string,
    _count: {
        ArticleDraft: number
    },
    ArticleDraft: [
        {
            articleID: null | string,
            ID: string,
            titre: string,
            createdAt: string,
            updatedAt: string,
            Auteur: {
                name: string,
                surname: string,
                email: string
            }
        }
    ]
}

export default function ImagesItemsSide() {
    const [rotate, setRotate] = useState(false)
    const [data, setData] = useState<imageItems[]>([])

    async function getData() {
        const request = await fetch('/api/images')
        const results = await request.json() as { data: imageItems[] }

        setData(results.data)
    }

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (rotate) {
            const t1 = setTimeout(() => {
                setRotate(false)
            }, 500)
        }
    }, [rotate])
    return (
        <div className="h-full flex flex-col">
            <div className="h-[67px] flex bg-white px-4 border-b items-center gap-4">
                <span className="font-inter font-bold text-2xl">Images</span>
                <button
                    onClick={async () => {
                        // await getData()
                        setRotate(true)
                    }}
                >
                    <RefreshCw className={`h-5 w-5 rotate-0 duration-300 ease-in-out  ${rotate ? "rotate-[360deg]" : ""}`} />
                </button>
            </div>
            <div className="flex-1 workspace overflow-x-hidden overflow-y-auto relative" style={{ height: 'calc(100dvh - 67px)' }}>
                <div className="px-9 sticky top-0 bg-white">
                    <div className="grid gap-2 py-4 font-semibold text-slate-500 border-b" style={{ gridTemplateColumns: '40px 2fr 1fr 1fr 1fr 90px' }}>
                        <div></div>
                        <div>Nom</div>
                        <div>Créé à</div>
                        <div>Taille (o)</div>
                        <div>Articles Id</div>
                        <div className="flex justify-end">Action</div>
                    </div>
                </div>
                <div className="flex flex-col px-9 py-5">

                    {
                        data.map(el => <ImagesItems item={el} key={el.ID} />)
                    }
                </div>
            </div>
        </div >
    )
}



function ImagesItems({ item }: { item: imageItems }) {
    const { images } = useImagesContext()
    const { setImageId } = images

    const date = dayjs(item.createdAt).format('DD/MM/YYYY THH:MM')
    const article = item._count.ArticleDraft === 1 ? item.ArticleDraft[0].ID : ''

    return (
        <button onClick={() => setImageId(item)} className="grid gap-2 py-4 font-semibold text-slate-500 text-left " style={{ gridTemplateColumns: '40px 2fr 1fr 1fr 1fr 90px' }}>
            <div className="w-[40px] aspect-square bg-center bg-no-repeat bg-contain border rounded-sm bg-slate-100" style={{ backgroundImage: `url(http://localhost:8787/image/preview/${item.name})` }}></div>
            <div className="flex items-center h-full">{item.name}</div>
            <div className="flex items-center h-full">{date}</div>
            <div className="flex items-center h-full">{item.size}</div>
            <div className="flex items-center h-full">
                {
                    item._count.ArticleDraft === 1 ? <div className=" px-3 py-1 border rounded-full border-red-300 bg-red-50">{article.substring(0, 10)}...</div> : ''
                }
            </div>
            <div className="flex items-center h-full justify-end">
                <button><Trash2 className={`h-5 w-5 rotate-0 duration-300 ease-in-out `} /></button>
            </div>
        </button>
    )
}

