'use client';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInput = () => {
    return (
        <>
            <form className="flex flex-row items-center justify-center" action="/articles">
                <input className="h-16 w-fit lg:min-w-[700px]" placeholder="Procurar no UpToDate..." type="text" name="query" id="query" />
                <button type="submit" className="bg-blue-700 px-7 text-gray-50 h-16 flex items-center"><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </>
    )
}
export default SearchInput;