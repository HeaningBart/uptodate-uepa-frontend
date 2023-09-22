
import { ScrollArea } from "@/components/ui/scroll-area"

const Local_API = process.env.NEXT_PUBLIC_LOCAL_API

import './styles/article.css'
import './styles/styling.css'
import './styles/outline.css'
import Header from "@/components/Header"


export default async function ArticlePage({ params }: { params: { article: string } }) {




    const article = await (await fetch(`${Local_API}/articles/${params.article}`, {
        next: {
            revalidate: 30 * 86400,
        },
        method: 'GET'
    })).json()
    const article_html = { __html: article.data.bodyHtml }

    return (<>
        <Header />
        <div className="grid grid-cols-12 gap-3 isDesktop" >
            <div className="col-span-0 lg:col-span-2 hidden lg:block relative">
                <div className="topicOutline w-full" id="topicOutline">
                    <div className="fixed w-[16.6%]">
                        <ScrollArea className="h-screen w-full">
                            <div dangerouslySetInnerHTML={{ __html: article.data.outlineHtml }} />
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-10">
                <div id="topicContainer">
                    <div className="article" dangerouslySetInnerHTML={article_html} />
                </div>
            </div>
        </div>

    </>)

}