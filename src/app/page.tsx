import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkStatus, onlyLoggedIn } from "@/services/server/auth";
import { Metadata } from "next";
import SearchInput from "./search/components/search-input";


export const metadata: Metadata = {
  title: 'Início - UpToDate UEPA'
}



export default async function Home() {

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