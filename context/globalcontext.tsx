'use client'
import { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext({
    addUserPanel: {
        visibility: false,
        setVisibility: (value: boolean) => { }
    },
    addProjectPanel: {
        addProjectPanelOpen: false,
        setAddProjectPanelOpen: (value: boolean) => { }
    },
    navigation: {
        articles: 0,
        podcast: 0,
        videos: 0,
        images: 0
    }
})

export default function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const [visibility, setVisibility] = useState(false),
        addUserPanel = { visibility, setVisibility };

    const [addProjectPanelOpen, setAddProjectPanelOpen] = useState(false),
        addProjectPanel = { addProjectPanelOpen, setAddProjectPanelOpen };

    const [navigation, setNavigation] = useState({
        articles: 0,
        podcast: 0,
        videos: 0,
        images: 0
    })


    async function getDataNbrs() {
        const request = await fetch('/api/projets', { cache: 'no-store' })
        const value = await request.json()
        setNavigation(value.data.data)
    }

    useEffect(() => {
        getDataNbrs()

    }, [visibility])

    return (
        // @ts-ignore
        <GlobalContext.Provider value={{ addUserPanel, addProjectPanel, navigation }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => useContext(GlobalContext)