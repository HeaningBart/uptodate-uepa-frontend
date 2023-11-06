import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkStatus, onlyLoggedIn } from "@/services/server/auth";
import { Metadata } from "next";
import SearchInput from "./search/components/search-input";


export const metadata: Metadata = {
  title: 'Início - UpToDate UEPA'
}



export default async function Home() {


  return (
    <>
      <Header />
      <div className="container my-5 min-h-[80vh] flex flex-row justify-center">
        <div className="flex flex-col gap-3 flex-[1_0_50%]">
          <h1>UpToDate para todos</h1>
        </div>
        <div className="relative hidden flex-[1_0_50%]" >
          <img className="absolute" src="https://assets.contenthub.wolterskluwer.com/api/public/content/4fed5f50164e42f294b316a8fa3d39b3?t=w854l" />
        </div>
      </div>
      <Footer />
    </>
  )
}