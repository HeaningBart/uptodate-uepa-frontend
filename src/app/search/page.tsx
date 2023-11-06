import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import SearchInput from "./components/search-input";
import { onlyLoggedIn, checkStatus } from "@/services/server/auth";

export const metadata: Metadata = {
    title: 'Pesquisar artigo'
}

const SearchPage = async () => {

    onlyLoggedIn()
    await checkStatus()
    return (
        <>
            <Header />
            <div className="container my-5 min-h-[80vh] flex flex-col justify-center">
                <SearchInput />
            </div>
            <Footer />
        </>
    )
}
export default SearchPage;