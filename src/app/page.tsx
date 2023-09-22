import Header from "@/components/Header";
import Search from "@/components/Search";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Início - UpToDate UEPA'
}



export default function Home() {

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex flex-col gap-3 min-h-[70vh] justify-center items-center">
          <Search />
        </div>
      </div>
    </>
  )
}