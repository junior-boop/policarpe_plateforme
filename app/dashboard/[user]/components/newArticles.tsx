'use client'
import { SvgSpinners3DotsFade } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useArticlesContext } from "@/context/articlesContext";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewArticles() {
    const [isLoading, setIsLoading] = useState(false)
    const param = usePathname().split('/')[2]
    const auteurID = param.split('_')[1]
    const { save } = useArticlesContext()
    const { reload, setReload } = save
    const url = usePathname()

    const router = useRouter()

    return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <div className="space-y-4">
                <div className="w-[450px]  p-6 border-2 rounded-2xl text-base font-semibold text-slate-500 bg-white">
                    Pour modifier un article existant, cliquez simplement sur celui que vous souhaitez mettre à jour
                </div>
                <Button onClick={async () => {
                    setReload(false)
                    setIsLoading(true)
                    const bodyContent = new FormData()
                    bodyContent.append('auteurID', auteurID)
                    const request = await fetch('/api/articles/new', {
                        method: "POST",
                        body: bodyContent
                    })

                    if (request.ok) {
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 1000)
                        const articles = await request.json()
                        setReload(true)
                        router.push(`${url}/${articles.data.ID}`)
                    } else {
                        alert('Une erreur Serveur')
                    }


                }} className=" gap-4 rounded-full text-lg h-[52px] px-6 font-semibold w-[450px] justify-center">
                    {
                        isLoading
                            ? <SvgSpinners3DotsFade className="h-5 w-5" />
                            : <Plus />
                    }
                    Créer un article
                </Button>
            </div>
        </div>
    )
}