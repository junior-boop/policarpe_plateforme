'use client'
import { createContext, useContext, useEffect, useState } from "react";
import AllProjectsFromJson from '../projects.json'

const DashboardContext = createContext({
    user: {
        userId: '',
        setUserId: (value: string) => { }
    },
    project: {
        projectId: '',
        setProjectId: (value: string) => { }
    },

})


export default function DashboardContextProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string>(''),
        user = { userId, setUserId }
    const [projectId, setProjectId] = useState<string>(''),
        project = { projectId, setProjectId }


    useEffect(() => {
        if (projectId.length > 1) {
            const projetSelectionner = AllProjectsFromJson.filter(el => el.projectId === projectId)
            console.log(projectId, projetSelectionner)
        }
    }, [projectId])
    return (
        <DashboardContext.Provider value={{ user, project }}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext)