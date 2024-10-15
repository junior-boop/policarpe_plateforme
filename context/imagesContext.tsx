'use client'
import { createContext, useContext, useEffect, useState } from "react";

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

const ImagesContext = createContext({
    images: {
        imageId: null,
        setImageId: (value: imageItems | null) => { }
    },
    save: {
        reload: false,
        setReload: (value: boolean) => { }
    }
})


export default function ImagesContextProvider({ children }: { children: React.ReactNode }) {
    const [imageId, setImageId] = useState<imageItems | null>(null),
        images = { imageId, setImageId }

    const [reload, setReload] = useState<boolean>(false),
        save = { reload, setReload }
    return (
        //@ts-ignore
        <ImagesContext.Provider value={{ images, save }}>
            {children}
        </ImagesContext.Provider>
    )
}

export const useImagesContext = () => useContext(ImagesContext)