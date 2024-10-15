'use client'


import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { logout } from "@/app/actions/auth"
import Link from "next/link"
import { useGlobalContext } from "@/context/globalcontext"
import { Auteur } from "@/types/general"


interface TypeUser extends Auteur {
    ID: string,
    createdAt: string,
    updatedAt: string
}

export function LoginBtn({ data }: { data: TypeUser }) {

    const router = useRouter()
    const { addUserPanel } = useGlobalContext()

    const name = data.name.split(' ')[0]

    const username = `${data.surname}`

    const id = data.ID.length > 25 ? `${data.ID.substring(0, 25)}...` : data.ID

    const handleLogout = async () => {

        await logout()
    }
    return (
        <DropdownMenu>
            <div style={{ left: -12 }}>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-4 outline-none w-full">
                        <div className="flex items-center justify-center w-[42px] rounded-full aspect-square bg-slate-200">
                            <User className="w-6 h-6" />
                        </div>
                        <span className="font-bold">{username}</span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        <div>
                            <div className="text-xs font-bold text-gray-400">Compte</div>
                            <div className="text-base">
                                {data.name} {data.surname}
                            </div>
                            <div className="text-gray-900 text-sm">
                                {data.email}
                            </div>

                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profils</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => addUserPanel.setVisibility(true)}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Ajouter un utilisateur</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <Link href="https://github.com/">
                        <DropdownMenuItem onClick={() => router.replace('https://github.com/')}>
                            <Github className="mr-2 h-4 w-4" />
                            <span>GitHub</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href={'/'}>
                        <DropdownMenuItem>
                            <LifeBuoy className="mr-2 h-4 w-4" />
                            <span>Support</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Déconnexion</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    )
}
