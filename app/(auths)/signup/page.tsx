import SignUpComponent from "@/components/my/signupComponent";
import { redirect } from "next/navigation";

const getData = async () => {
    const req = await fetch(`${process.env.SERVER_URL}/auteurs`, { cache: 'no-cache' })
    const auteurs = await req.json()

    return auteurs.data
}

export default async function SignUpPage() {

    const users = await getData()

    if (users.length !== 0) {
        redirect('/signin')
    }

    return (
        <section className="px-6 md:px-0 w-full h-[100vh] flex items-center justify-center">
            <div className="w-full md:w-[400px] p-6 border rounded-xl space-y-8">
                <div className="font-bold text-3xl text-slate-700 ">
                    Créez un compte<br /> Proprietaire
                </div>
                <SignUpComponent />
            </div>
        </section>
    )
}