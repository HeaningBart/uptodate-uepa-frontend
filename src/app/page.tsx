import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { onlyGuest } from "@/services/server/auth";
import { Metadata } from "next";
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Início - UpToDate UEPA'
}



export default async function Home() {

  onlyGuest()


  return (
    <>
      <Header />
      <div className="container flex flex-col lg:flex-row gap-3">
        <div className="flex font-roboto flex-col gap-3 mt-5">
          <h1 className="lg:text-2xl font-semibold tracking-wide">Tenha acesso à todas as funcionalidades do UpToDate</h1>
          <p>Acesse artigos, gráficos, tabelas, faça download, imprima. UpToDate é a plataforma mais usada por médicos e estudantes ao redor do mundo.</p>
          <Link href="/login">
            <button className="w-full py-2 px-4 text-gray-50 bg-blue-500">Iniciar sessão</button>
          </Link>
          <Link href="/register">
            <button className="w-full py-2 px-4 text-gray-50 bg-green-600">Registrar-se</button>
          </Link>
        </div>
        <div className="basis-1/2 shrink-0">
          <img src="https://assets.contenthub.wolterskluwer.com/api/public/content/4fed5f50164e42f294b316a8fa3d39b3?t=w854l" />
        </div>
      </div>
      <div className="bg-blue-500 w-full h-16" />
      <div className="container flex flex-col lg:flex-row gap-3 mt-5">
        <div className="flex flex-col gap-3 justify-center items-center">
          <span className="font-roboto bg-green-600 px-4 py-2 w-fit text-gray-50 lg:text-2xl text-center font-semibold uppercase tracking-wider">Nossa interface</span>
          <img src="/article_screen.png" />
        </div>



      </div>


      <Footer />
    </>
  )
}