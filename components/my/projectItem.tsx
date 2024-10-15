'use client';
import Link from "next/link";
import { Trash2 } from 'lucide-react'
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { RiStarLine } from "../icons";
import { Projects } from "@/types/general";

import { useDashboardContext } from "@/context/dashboardcontext";

export default function ProjectItems({ data }: { data: Projects }) {
    const titre = data.name
    const description = data.description.length > 80 ? `${data.description.substring(0, 80)}...` : data.description

    const { user, project } = useDashboardContext()
    const { setUserId } = user
    const { setProjectId } = project

    const style = {
        buttonStyle: "w-10 h-10 rounded-full p-0 inline-flex items-center justify-center hover:bg-slate-200"
    }


    const handleDeleteProject = async ({ id }: { id: string }) => {
        const bodyContent = new FormData()
        bodyContent.append('id', id)

        const req = await fetch('/api/projets', {
            method: "DELETE",
            body: bodyContent
        })

        if (!req.ok) {

        }
    }

    const handleClickProjet = () => {
        setUserId(data.createdBy.userId)
        setProjectId(data.projectId)
    }

    return (
        <div className="projectItems">
            <Link href={`/user_${data.createdBy.userId}/projects/project_${data.projectId}`} onClick={handleClickProjet}>
                <div className="w-full aspect-square bg-slate-200 rounded-xl flex items-center justify-center">
                    <div className="text-9xl font-bold text-slate-400 uppercase">
                        {titre[0]}
                    </div>
                </div>

                <div>
                    <div className="text-xl font-semibold pt-2 px-1">{titre}</div>
                    <div className="text-[0.95em] h-[72px] px-1">{description}</div>
                </div>
            </Link>
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-[-5px]">
                    <div className="w-9 h-9 bg-slate-600 rounded-full inline-flex items-center justify-center text-white text-lg font-bold">
                        {data.createdBy.userName[0].toUpperCase()}
                    </div>
                    {
                        data.membres.length > 1 ? (<div className="bg-slate-200 h-9 px-3 flex items-center justify-center font-semibold rounded-full text-sm">
                            +{data.membres.length - 1} Users
                        </div>)
                            : null
                    }
                </div>
                <div className="flex items-center flex-row-reverse">
                    <Button onClick={() => handleDeleteProject({ id: data.Id })} variant={'ghost'} className={cn(style.buttonStyle)}>
                        <Trash2 className="" />
                    </Button>
                    <Button variant={'ghost'} className={cn(style.buttonStyle)}>
                        <RiStarLine className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}