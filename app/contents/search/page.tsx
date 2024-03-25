import Header from '@/components/header'
import SearchList from '@/components/search-list'
import { Metadata } from 'next'

type SearchPageParams = {
  params: {}
  searchParams: {
    search: string
  }
}
export async function generateMetadata({
  searchParams: { search },
}: SearchPageParams): Promise<Metadata> {
  return {
    title: 'Resultados para "' + search + '" - UpToDate do Pará',
  }
}
const SearchPage = async ({ searchParams: { search } }: SearchPageParams) => {
  const response = await (
    await fetch(
      `https://www.uptodate.com/services/app/contents/search/2/json?search=${search}&sp=0&searchType=PLAIN_TEXT&source=USER_PREF&searchControl=TOP_PULLDOWN&searchOffset=1&autoComplete=false&language=pt&max=10&index=&autoCompleteTerm=`
    )
  ).json()
  return (
    <>
      <Header />
      <div className="min-h-[80vh] container flex flex-col items-center justify-center pt-4">
        <SearchList data={response.data.searchResults} />
      </div>
    </>
  )
}
export default SearchPage
