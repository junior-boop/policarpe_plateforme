'use client'
import { useImagesContext } from "@/context/imagesContext";
import { RefreshCw, Trash2, X } from "lucide-react";

export default function ImagePreview() {
    const { images, save } = useImagesContext()
    const { imageId, setImageId } = images
    const { reload, setReload } = save
    return (
        <div className="h-full flex flex-col">
            <div className="h-[67px] flex bg-white px-4 border-b items-center gap-4 justify-between">
                <button
                    onClick={async () => {
                        setImageId(null)
                        setReload(true)
                    }}
                >
                    <X className={`h-5 w-5 rotate-0 duration-300 ease-in-out `} />
                </button>
                <button
                    onClick={async () => {
                        setImageId(null)
                        setReload(true)
                    }}
                >
                    <Trash2 className={`h-5 w-5 rotate-0 duration-300 ease-in-out `} />
                </button>
            </div>
            <div className=" bg-slate-50" style={{ height: `calc(100dvh - 67px)` }}>
                {
                    imageId === null
                        ? (
                            <div className="h-full flex items-center justify-center">
                                <div>Aucune image n{"'"}est selectionné</div>
                            </div>
                        )
                        : (
                            <div className="h-full flex flex-col bg-white">
                                <div className="w-full aspect-square bg-slate-50 flex items-center">
                                    <img src={`http://localhost:8787/image/preview/${imageId?.name}`} alt={imageId?.name} />
                                </div>
                                <div className="p-4">
                                    <div className="font-bold">Détails</div>
                                    <div className="text-lg font-bold">{imageId?.name}</div>
                                    <div className="text-base font-semibold text-gray-700">Créer le: {imageId?.createdAt}</div>
                                    <div className="text-base font-semibold text-gray-700">Taille: {imageId?.size}</div>
                                    {
                                        imageId.ArticleDraft.length !== 0 ? (
                                            <div className="p-4 rounded-md bg-slate-100 mt-4">
                                                <div><span className="font-bold">Identifiant :</span> {imageId?.ArticleDraft[0].ID}</div>
                                                <div><span className="font-bold">Titre :</span> {imageId?.ArticleDraft[0].titre}</div>
                                                <div> <span className="font-bold">Auteur :</span> {imageId?.ArticleDraft[0].Auteur.name} {imageId?.ArticleDraft[0].Auteur.surname}</div>
                                            </div>
                                        )
                                            : null
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}