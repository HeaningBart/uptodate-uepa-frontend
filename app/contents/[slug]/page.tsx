import { UpToDateResponse } from '@/types/uptodate'
import type { Metadata } from 'next'
import './uptodate.css'
import Header from '@/components/header'

import ArticleContent from './components/article-content'
type RouteProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params: { slug },
}: RouteProps): Promise<Metadata> {
  const article: UpToDateResponse = await (
    await fetch(`${process.env.LOCAL_API_URL}/article/${slug}`, {
      next: {
        revalidate: 0,
      },
    })
  ).json()

  return {
    title: `${article.data.topicInfo.title} - UpToDate do Pará`,
    description: article.data.metaDescription,
  }
}

const ContentPage = async ({ params: { slug } }: RouteProps) => {
  const article: UpToDateResponse = await (
    await fetch(`${process.env.LOCAL_API_URL}/article/${slug}`, {
      next: {
        revalidate: 0,
      },
    })
  ).json()

  return (
    <div className="flex flex-col">
      <ArticleContent article={article} />
    </div>
  )
}
export default ContentPage
