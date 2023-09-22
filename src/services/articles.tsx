
const Local_API = process.env.NEXT_PUBLIC_LOCAL_API

export async function get_article(article: string) {
    const response = await fetch(`${Local_API}/articles/${article}`, {
        next: {
            revalidate: 86400
        }
    })
    return (await response.json())
}