import { getUserData, isLoggedIn } from "@/services/server/auth";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SearchComponent from "./search-component";
import UserPopover from "./user-popover";

export default async function Header() {



    return (<div className="sticky top-0 z-50">
        <nav className="bg-white border-gray-200">
            <div className="flex flex-row gap-2 flex-wrap items-center justify-between mx-auto p-4 font-roboto">
                <div className="flex flex-row gap-4">
                    <Link href="/" className="flex flex-row items-center">
                        <img src="/icon.png" className="h-7 mr-3" alt={`Logo`} />
                        <img src="/logo.svg" className="h-7 hidden lg:block" />
                    </Link>
                    <SearchComponent />
                </div>
                <div className="flex flex-row">
                    <UserPopover />
                </div>
            </div>
        </nav>
        <nav className="hidden lg:block bg-blue-500 border-gray-200">
            <div className="flex flex-row gap-2 flex-wrap items-center justify-between mx-auto font-roboto">
                <div className="flex flex-row px-3 items-center">
                    <Link href="/search" className="text-gray-50 px-2 py-4 transition-all ease-in hover:bg-blue-800">
                        Página inicial
                    </Link>
                    <Link href="/store" className="text-gray-50 px-8 py-4 transition-all ease-in hover:bg-blue-800">
                        Loja
                    </Link>
                </div>
            </div>
        </nav>
    </div>)
}