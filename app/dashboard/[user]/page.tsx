'use client'

import { FileAudio, Image, Newspaper, Video } from "lucide-react"
import { useEffect, useState } from "react"

export default function Apercu() {
    const [count, setCount] = useState<{ message: string, data: { articles: number, videos: number, podcast: number, images: number } }>({
        message: 'number',
        data: {
            articles: 0,
            videos: 0,
            podcast: 0,
            images: 0
        }
    })

    const [lock, setLock] = useState<any[]>([])
    async function getData() {
        const request = await fetch('/api/projets', { cache: 'no-store' })
        const results = await request.json()

        setCount(results.data)

        const liste = []
        for (let i = 0; i < 10; i++) {
            liste.push(results.lock.data[i])
        }
        setLock(liste)

    }


    useEffect(() => {
        getData()

    }, [])
    return (
        <div className="py-5">
            <div className="w-[972px] mx-auto">
                <div className="py-3 text-3xl font-bold mb-10">
                    Accueil
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="border rounded-lg p-3">
                        <div className="flex gap-3 items-center">
                            <div><Newspaper className="w-6 h-6" /></div>
                            <div className="text-xl font-semibold">Articles</div>
                        </div>
                        <div className="w-full aspect-square flex items-end">
                            <div className="text-8xl font-bold text-slate-800">{count.data.articles < 10 ? `0${count.data.articles}` : count.data.articles}</div>
                        </div>
                    </div>
                    <div className="border rounded-lg p-3">
                        <div className="flex gap-3 items-center">
                            <div><FileAudio className="w-6 h-6" /></div>
                            <div className="text-xl font-semibold">Podcasts</div>
                        </div>
                        <div className="w-full aspect-square flex items-end">
                            <div className="text-8xl font-bold text-slate-800">{count.data.podcast < 10 ? `0${count.data.podcast}` : count.data.podcast}</div>
                        </div>
                    </div>
                    <div className="border rounded-lg p-3">
                        <div className="flex gap-3 items-center">
                            <div><Video className="w-6 h-6" /></div>
                            <div className="text-xl font-semibold">Vidéos</div>
                        </div>
                        <div className="w-full aspect-square flex items-end">
                            <div className="text-8xl font-bold text-slate-800">{count.data.videos < 10 ? `0${count.data.videos}` : count.data.videos}</div>
                        </div>
                    </div>
                    <div className="border rounded-lg p-3">
                        <div className="flex gap-3 items-center">
                            <div><Image className="w-6 h-6" /></div>
                            <div className="text-xl font-semibold">Images</div>
                        </div>
                        <div className="w-full aspect-square flex items-end">
                            <div className="text-8xl font-bold text-slate-800">{count.data.images < 10 ? `0${count.data.images}` : count.data.images}</div>
                        </div>
                    </div>
                </div>
                <div className="mt-9 font-semibold text-xl border-b pb-3">
                    Activités récentes
                </div>
                <div>
                    {
                        lock.map((el, key) => <LockItem lock={el} key={key} />)
                    }
                </div>
            </div>
        </div>
    )
}


function LockItem({ lock }: { lock: { method: string, action: string, time: string } }) {
    return (
        <div className="grid py-3 border-b" style={{ gridTemplateColumns: '150px 1fr 250px' }}>
            <div className="flex">
                {
                    lock.method === "POST"
                        ? <div className="rounded-full px-6 py-1 font-bold border text-green-900 bg-green-100 border-green-600">{lock.method}</div>
                        : lock.method === "PUT"
                            ? <div className="rounded-full px-6 py-1 font-bold border text-orange-900 bg-orange-100 border-orange-600">{lock.method}</div>
                            : lock.method === "DELETE"
                                ? <div className="rounded-full px-6 py-1 font-bold border text-red-900 bg-red-100 border-red-600">{lock.method}</div>
                                : <div className="rounded-full px-6 py-1 font-bold border text-blue-900 bg-blue-100 border-blue-600">{lock.method}</div>
                }
            </div>
            <div className="flex h-full items-center">{lock.action.length > 30 ? `${lock.action.substring(0, 60)}...` : lock.action}</div>
            <div className="flex h-full items-center">{lock.time}</div>
        </div>
    )
}