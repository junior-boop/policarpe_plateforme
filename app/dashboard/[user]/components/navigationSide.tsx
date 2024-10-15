import { getUserData } from "@/app/actions/getUserData"
import Navigation from "./navigation"

export default async function NavigationSide({ params }: { params: { user: string } }) {
    const { user } = await getUserData(params)

    return (
        <>
            <div>
                <Navigation user={user} />
            </div>
        </>
    )
}