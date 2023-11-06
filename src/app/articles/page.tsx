import Header from '@/components/Header'
import SearchList from '@/components/Search/List'
import { checkStatus } from '@/services/server/auth'
import { Metadata } from 'next'


export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {

    return {
        title: 'Resultados para "' + query + '" - UTD'
    }

}

export default async function ArticlesPage({ searchParams: { query } }: { searchParams: { query: string } }) {
    await checkStatus()

    const response = await (await fetch(`https://www.uptodate.com/services/app/contents/search/2/json?search=${query}&sp=0&searchType=PLAIN_TEXT&language=pt&max=100&searchControl=TOP_PULLDOWN&searchOffset=1`)).json()

    return (<>
        <Header />
        <main className="bg-[#f6f6f6]">
            <div className="container font-sans">
                <SearchList data={response.data.searchResults} />
            </div>
        </main>
    </>)
}