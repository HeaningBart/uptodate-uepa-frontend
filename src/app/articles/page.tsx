import Header from '@/components/Header'
import SearchList from '@/components/Search/List'
import { Metadata } from 'next'


export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {

    return {
        title: 'Resultados para "' + query + '" - UTD'
    }

}

export default async function ArticlesPage({ searchParams: { query } }: { searchParams: { query: string } }) {

    const response = await (await fetch(`https://www.uptodate.com/services/app/contents/search/2/json?search=${query}&searchType=PLAIN_TEXT&language=en&max=100`)).json()

    return (<>
        <Header />
        <div className="container font-sans">
            <SearchList data={response.data.searchResults} />
        </div>
    </>)
}