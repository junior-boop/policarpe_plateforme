import Container from "@/components/my/container";
import LaUne from "../components/laUne";
import Navbar from "../components/navbar";
import { Lien_rapide, Model_Audio, Model_Audio_Une, Model_Ecrit_1, Model_Ecrit_2, Model_video } from "../components/articles";

const rubrique = [
    {
        "ID": "98018a3e-3133-45da-954d-14a119b92d96",
        "name": "politique"
    },
    {
        "ID": "fcda3550-7be3-474a-bcb6-fb6400c851bf",
        "name": "sport"
    },
    {
        "ID": "3e59c67c-2b54-4b97-b189-dc6b9e45add0",
        "name": "société"
    },
    {
        "ID": "c216b7c5-8c83-4a08-9f13-4137136de4d0",
        "name": "cinéma"
    },
    {
        "ID": "e4f46aea-68c2-4443-950e-794239bb088e",
        "name": "international"
    },
]

export default function Accueil() {
    return (
        <>
            <main className="w-full relative">
                <section className="bg-white h-[62px] sticky top-0 z-[10]">
                    <Container className="h-full flex items-center gap-2">
                        {
                            rubrique.map(el => <Lien_rapide name={el.name} id={el.ID} key={el.ID} />)
                        }
                    </Container>
                </section>
                <LaUne />

                <section className="mb-24 mt-2">
                    <Container>
                        <div className="grid grid-cols-2 gap-7">
                            <Model_Audio_Une />
                            <div className="flex flex-col gap-6 p-8 bg-[#1E233F] rounded-xl">
                                <div className="font-bold text-base text-white uppercase">
                                    autres actu. en Sport
                                </div>
                                <div>
                                    <Model_Ecrit_2 />
                                    <Model_Ecrit_2 />
                                    <Model_Ecrit_2 />
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
                <section className="mb-24">
                    <Container>
                        <div className="py-6 w-full">
                            <div className="text-[#ff0000] font-bold text-xl uppercase">
                                Nos articles
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <Model_Ecrit_1 />
                            <Model_Ecrit_1 />
                            <Model_Ecrit_1 />
                            <Model_Ecrit_1 />
                            <Model_Ecrit_1 />
                        </div>
                    </Container>
                </section>
                <section className="mb-24 bg-[#1E233F] py-24">
                    <Container>
                        <div className="py-6 w-full">
                            <div className="text-white text-5xl font-anto">
                                Podcast
                            </div>
                        </div>
                        <div className="grid grid-cols-2 mt-6 gap-10">
                            <Model_Audio_Une />
                            <div className="flex flex-col gap-8">
                                <Model_Audio />
                                <Model_Audio />
                                <Model_Audio />
                            </div>
                        </div>
                    </Container>
                </section>
                <section className="mb-24">
                    <Container>
                        <div className="py-6 w-full">
                            <div className="text-[#ff0000] font-bold text-xl uppercase">
                                Nos Videos
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <Model_video />
                            <Model_video />
                            <Model_video />
                            <Model_video />
                            <Model_video />
                        </div>
                    </Container>
                </section>
            </main>
        </>
    )
}