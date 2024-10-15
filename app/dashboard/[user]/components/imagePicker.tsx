'use client';
import { SvgSpinners3DotsFade } from "@/components/icons";
import { ImagePlus } from "lucide-react";
import { ChangeEventHandler, useEffect, useState } from "react";


export type imageData = {
    ID: string;
    name: string;
    size: number;
    minetype: string;
    lastmodified: number;
    originalname: string;
    path: string;
    createdAt: Date;
}

export default function ImagePicker({ value, onChange }: {
    onChange: (url: string) => void
    value?: imageData | null
}) {
    const [isPicking, setIsPicking] = useState(false)
    const [baseImage, setBaseImage] = useState<imageData | null | undefined>(value)
    const [imageName, setImageName] = useState<imageData>()

    const handleClick = async () => {

        if (baseImage !== null) {
            setBaseImage(null)
            setIsPicking(true)
            const deleteImage = await fetch(`http://localhost:8787/image/${baseImage?.name}?id=${baseImage?.ID}`, {
                method: "DELETE"
            });

            if (deleteImage.ok) await deleteImage.json();
        }

        setIsPicking(true)
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = async ({ target }) => {

        if (target.files !== null) {

            const bodyContent = new FormData()
            bodyContent.append('images', target?.files[0]);

            const request = await fetch('http://localhost:8787/image', {
                method: 'POST',
                body: bodyContent
            })

            if (request.ok) {
                const image = await request.json() as { data: imageData }
                setBaseImage(image.data)
                setImageName(image.data)
                onChange(image.data.name)
            } else {
                console.error('il ya une erreur')
            }
        }
    }


    return (
        <div className={`w-full ${baseImage !== null ? "h-[150px] bg-slate-50" : 'h-[62px] bg-white'} border rounded-md flex shadow-sm relative overflow-hidden duration-300 ease-in-out transition-all`}>
            {
                baseImage === null
                    //@ts-ignore
                    ? (<>
                        {
                            isPicking
                                ? (<div className=" flex items-center justify-center gap-3 w-full">
                                    <SvgSpinners3DotsFade className="w-5 h-5" />
                                    en attente...</div>)
                                : (<>
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="flex items-center justify-center w-fit gap-3">
                                            <ImagePlus className="w-5 h-5" />
                                            <span>Ajouter une image</span>
                                        </div>
                                    </div>
                                </>)
                        }
                    </>)
                    : (<div className="flex p-3 w-full">
                        <div className="flex-1 relative h-full">
                            <div className="text-sm font-bold text-slate-400">Nom de l{"'"}image</div>
                            <div className="font-semibold text-lg text-slate-700">{baseImage?.name}</div>
                            <div>Dernière modification : {baseImage?.lastmodified}</div>
                            <div>Taille : {baseImage?.size}</div>
                            <div className="font-bold text-sm absolute bottom-0 left-0 text-slate-700">Cliquez pour changer l{"'"}image</div>
                        </div>
                        <div className="aspect-square rounded-md bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(http://localhost:8787/image/preview/${baseImage?.name})` }}></div>
                    </div>)
            }
            <div className="absolute top-0 left-0 w-full h-full duration-500 ease-in-out">
                <input onClick={handleClick} onChange={handleChange} type="file" name="image" className="input-image" />
            </div>
        </div>
    )
}