
import { getUserData } from "@/app/actions/getUserData";
import DashboardContextProvider from "@/context/dashboardcontext";
import Navigation from "./components/navigation";

export default async function LayoutUserRoot({ params, children }: { children: React.ReactNode, params: { user: string } }) {
    const { user } = await getUserData(params)
    return (
        <DashboardContextProvider>
            <div className="flex h-dvh overflow-hidden w-full items-start">
                <Navigation user={user} />
                <div className="flex-1 h-full overflow-x-hidden overflow-y-auto workspace">
                    {children}
                </div>
            </div>
        </DashboardContextProvider>
    )
}