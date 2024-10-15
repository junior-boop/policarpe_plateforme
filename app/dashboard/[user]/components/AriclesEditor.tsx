'use client'
import dynamic from "next/dynamic";
import ImagePicker, { imageData } from "./imagePicker";
import SelectComponent from "./selectComponent";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/utils";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useArticlesContext } from "@/context/articlesContext";
import { useParams, useRouter } from "next/navigation";
import { Articles } from "@/types/general";
import { SvgSpinners3DotsFade } from "@/components/icons";
const Editor = dynamic(() => import("@/app/dashboard/[user]/components/Editor"), { ssr: false })

export default function ArticlesEditor({ data, articles }: { data: { rubrique: { ID: string, name: string, slug: string }[] }, articles: Articles }) {
    const [isPublished, setIsPubished] = useState(false)

    const [editorValue, setEditorValue] = useState(JSON.parse(articles.contenu));
    const [titre, setTitre] = useState(articles.titre)
    //@ts-ignore
    const [image, setImage] = useState<string | null>(articles.images?.name)
    //@ts-ignore
    const [images, setImages] = useState<imageData | null>(articles.images)
    // @ts-ignore
    const [select, setSelect] = useState<{ ID: string, name: string, slug: string } | undefined>(articles.rubrique)
    const [statut, setStatut] = useState(false)
    const [saving, setSaving] = useState('Enregistrer')

    const router = useRouter()
    const { user, articleID } = useParams()

    const { save } = useArticlesContext()

    const { setReload } = save

    useEffect(() => {

        const auteurID: string = user as string

        const articlesData = {
            titre,
            slug: generateSlug(titre),
            image: image as string,
            rubriqueID: select?.ID as string,
            contenu: JSON.stringify(editorValue),
            auteurID: auteurID.split('_')[1]
        }
        setReload(true)

        const t1 = setTimeout(async () => {

            const bodyContent = new FormData()
            for (let value in articlesData) {
                //@ts-ignore
                bodyContent.append(value, articlesData[value])
            }

            const request = await fetch(`/api/articles/${articleID}`, {
                method: "PUT",
                body: bodyContent
            })
            setReload(true)
            setStatut(false)
        }, 3000)

        const t2 = setTimeout(() => {
            setStatut(true)
            setReload(false)
        }, 1000)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
        }
    }, [image, titre, select, editorValue])

    useEffect(() => {
        if (statut) setSaving('Enregistrement...');
        else setSaving('Enregistrer')
    }, [statut])




    return (
        //@ts-ignore
        <>
            <div className="h-[67px] border-b flex items-center justify-between px-4">
                <button onClick={async () => {
                    setReload(false)
                    if (titre.length === 0) {
                        const bodyContent = new FormData()
                        //@ts-ignore
                        bodyContent.append('articleID', articleID)

                        const request = await fetch('/api/articles/new', {
                            method: "DELETE",
                            body: bodyContent
                        })

                        if (request.ok) {
                            setReload(true)
                            router.push(`/dashboard/${user}/articles`)

                        }
                    } else {
                        setReload(true)
                        router.push(`/dashboard/${user}/articles`)

                    }
                }} className="flex items-center gap-4">
                    <ArrowLeft />
                    <span className="font-semibold">Revenir</span>
                </button>
                <div className="flex items-center gap-6">
                    <span className="text-sm font-semibold text-slate-400">{saving}</span>
                    <div className="flex gap-2">
                        <Button onClick={async () => {
                            setReload(false)
                            const bodyContent = new FormData()
                            //@ts-ignore
                            bodyContent.append('articleID', articleID)

                            const request = await fetch('/api/articles/new', {
                                method: "DELETE",
                                body: bodyContent
                            })

                            if (request.ok) {
                                setReload(true)
                                router.push(`/dashboard/${user}/articles`)
                            }
                        }} variant={'outline'} className="w-[40px] aspect-square p-0 flex items-center rounded-full justify-center">
                            <Trash2 className="h-5 w-5" />
                        </Button>
                        <Button onClick={async () => {
                            setIsPubished(true)
                            setReload(false)
                            const articleData: Articles = {
                                titre: articles.titre,
                                slug: articles.slug,
                                contenu: articles.contenu,
                                image: articles.image,
                                rubriqueID: articles.rubriqueID,
                                articleID: articles.articleID,
                                auteurID: articles.auteurID
                            }

                            const bodyContent = new FormData()

                            for (let value in articleData) {
                                //@ts-ignore
                                bodyContent.append(value, articleData[value])
                            }

                            const request = await fetch(`/api/articles/publication/${articleID}`, {
                                method: "PUT", body: bodyContent
                            })

                            if (request.ok) {
                                setReload(true)
                                setIsPubished(false)
                            }

                        }} className="rounded-full min-w-32 justify-center gap-3 px-6 duration-300 ease-in-out transition-all">{
                                isPublished
                                    ? <> <SvgSpinners3DotsFade className="h-5 w-5" /> Process en cours </>
                                    : "Publier"
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="workspace overflow-x-hidden overflow-y-auto py-6" style={{ height: 'calc(100dvh - 67px)' }}>
                <div className="">
                    <div className="space-y-4">
                        <div className="max-w-[600px] mx-auto">
                            <label htmlFor="titre" className="font-bold text-base mb-2 inline-block text-slate-700">Le Titre</label>
                            <textarea value={titre} onChange={({ target }) => setTitre(target.value)} name='titre' className="w-full font-semibold text-lg border h-19 resize-none px-3 py-2 rounded-md bg-white shadow-sm outline-1" placeholder="Entrer le titre de votre article"></textarea>
                        </div>
                        <div className="max-w-[600px] mx-auto">
                            <label htmlFor="titre" className="font-bold text-base  inline-block text-slate-700">Le slug</label>
                            <div className="text-sm text-slate-400 mb-2">Le slug est automatiquement générer en fonction du titre</div>
                            <div className="w-full min-h-[42px] items-center px-2 py-2 bg-slate-50 border rounded-md">{generateSlug(titre)}</div>
                        </div>
                        <div className="max-w-[600px] mx-auto">
                            <label htmlFor="image" className="font-bold text-base mb-2 inline-block text-slate-700">Image principale</label>
                            <ImagePicker value={images} onChange={(url) => {
                                setImage(url)
                            }} />
                        </div>
                        <div className="max-w-[600px] mx-auto">
                            <label htmlFor="" className="font-bold text-base mb-2 inline-block text-slate-700">Rubrique</label>
                            <SelectComponent value={select} onChange={(v) => {
                                setSelect(v)
                            }}
                                //@ts-ignore
                                data={data.rubrique} />
                        </div>
                        <div>
                            <div className="max-w-[600px] mx-auto">
                                <label htmlFor="" className="font-bold text-base mb-2 inline-block text-slate-700">Contenu</label>
                                <div className="text-sm text-slate-400 mb-2">Utiliser le plus ( + ) pour avoir acces a tous les éléments de configuration de texte</div>
                            </div>
                            <Editor value={editorValue} onChange={setEditorValue} holder="editorjs-container" />
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}