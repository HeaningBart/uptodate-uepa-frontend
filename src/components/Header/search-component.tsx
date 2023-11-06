import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const SearchComponent = () => {
    return (
        <form className="flex flex-row items-center" action="/articles">
            <input className="h-8 w-full lg:min-w-[600px]" placeholder="Procurar no UpToDate..." type="text" name="query" id="query" />
            <button type="submit" className="bg-blue-700 p-2 text-gray-50 h-8 flex items-center"><FontAwesomeIcon icon={faSearch} /></button>
        </form>
    )
}
export default SearchComponent;