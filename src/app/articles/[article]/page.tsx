
import { ScrollArea } from "@/components/ui/scroll-area"

const Local_API = process.env.NEXT_PUBLIC_LOCAL_API

import Header from "@/components/Header"
import { Metadata } from "next"
import { checkStatus } from "@/services/server/auth"
import { cookies } from "next/headers"
import ArticleContainer from "./components/article-container"

export async function generateMetadata({ params }: { params: { article: string } }): Promise<Metadata> {
    const cookieStore = cookies();
    const token = cookieStore.get("_r");
    const article = await (await fetch(`${Local_API}/articles/${params.article}`, {
        next: {
            revalidate: 0,
        },
        method: 'GET',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token.value}` })
        }
    })).json()


    return {
        title: article.data.topicInfo.title + ' - UTD',
        description: article.data.metaDescription
    }
}


export default async function ArticlePage({ params }: { params: { article: string } }) {


    await checkStatus()

    const cookieStore = cookies();
    const token = cookieStore.get("_r");

    const article = await (await fetch(`${Local_API}/articles/${params.article}`, {
        next: {
            revalidate: 0,
        },
        method: 'GET',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token.value}` })
        }
    })).json()


    const article_html = { __html: article.data.bodyHtml }

    return (<>
        <Header />
        <div>
            <ArticleContainer title={article.data.topicInfo.title + ' - UTD'} articleHtml={article.data.bodyHtml} outlineHtml={article.data.outlineHtml} />
        </div>

    </>)

}