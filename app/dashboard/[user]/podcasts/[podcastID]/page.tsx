import { Articles } from "@/types/general"
import PodcastEditor from '../../components/podcastEditor'


async function getRubrique() {
    const request = await fetch(`${process.env.SERVER_URL}/rubriques`, { cache: "no-store" })
    const rubrique = await request.json() as { ID: string, name: string, slug: string }[]
    return rubrique
}

async function getArticles(ID: string) {
    const request = await fetch(`${process.env.SERVER_URL}/articles/draft/${ID}`, { cache: "no-store" })
    const articles = await request.json() as { data: Articles }

    return articles.data
}

export default async function ArticlesPage({ params }: { params: { articleID: string } }) {
    const rubrique = await getRubrique()
    const articles = await getArticles(params.articleID)
    return (
        <div className="h-dvh overflow-hidden">
            <PodcastEditor data={{ rubrique }} articles={articles} />
        </div>
    )
}