'use client'
import { createContext, useContext, useEffect, useState } from "react";

const ArticlesContext = createContext({
    articles: {
        articleId: null,
        setArticleId: (value: string | null) => { }
    },
    save: {
        reload: false,
        setReload: (value: boolean) => { }
    }
})


export default function ArticlesContextProvider({ children }: { children: React.ReactNode }) {
    const [articleId, setArticleId] = useState<string | null>(null),
        articles = { articleId, setArticleId }

    const [reload, setReload] = useState<boolean>(false),
        save = { reload, setReload }
    return (
        //@ts-ignore
        <ArticlesContext.Provider value={{ articles, save }}>
            {children}
        </ArticlesContext.Provider>
    )
}

export const useArticlesContext = () => useContext(ArticlesContext)