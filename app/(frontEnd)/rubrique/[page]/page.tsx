import Container from "@/components/my/container";
import { ActusItem, Lien_rapide, Model_Ecrit_1, Opinions } from "../../components/articles";
import LaUne from "../../components/laUne";

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

export default function Rubrique() {
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
                <Container>
                    <div className="font-bold pt-6 pb-3 text-4xl">
                        Polique
                    </div>
                </Container>
                <LaUne />
                <Container className="mt-10">
                    <div className="flex gap-16">
                        <div className="flex-1">
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                            <ActusItem />
                        </div>
                        <div className="w-[380px] min-h-dvh relative">
                            <div className="sticky top-[62px]">
                                <div className="italic font-thin text-4xl mb-4">
                                    Les Opinions
                                </div>
                                <div className="space-y-6">
                                    <Opinions />
                                    <Opinions />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}