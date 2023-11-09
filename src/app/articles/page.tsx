import Header from '@/components/Header'
import SearchList from '@/components/Search/List'
import { checkStatus } from '@/services/server/auth'
import axios from 'axios'
import { Metadata } from 'next'


export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {

    return {
        title: 'Resultados para "' + query + '" - UTD'
    }

}

export default async function ArticlesPage({ searchParams: { query } }: { searchParams: { query: string } }) {
    await checkStatus()

    const response = await axios.get(`https://www.uptodate.com/services/app/contents/search/2/json?search=${query}&sp=0&searchType=PLAIN_TEXT&source=USER_PREF&searchControl=TOP_PULLDOWN&searchOffset=1&autoComplete=false&language=pt&max=10&index=&autoCompleteTerm=`)



    return (<>
        <Header />
        <main className="bg-[#f6f6f6]">
            <div className="container font-sans">
                <SearchList data={response.data.data.searchResults} />
            </div>
        </main>
    </>)
}