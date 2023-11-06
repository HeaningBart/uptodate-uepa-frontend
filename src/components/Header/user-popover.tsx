'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faGear, faStore, faUser, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Drawer from '@mui/material/Drawer';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { UserDataResponse } from "@/services/server/auth";
import { parseCookies } from "nookies";
import { useState } from "react";
import useSWR from 'swr'
import { Website_API } from "../../../consts";
import Link from "next/link";

const MenuItems = [
    {
        title: 'Configurações',
        icon: faGear,
        href: '/profile',
        allowed: ['User', 'Admin'],
    },
    {
        title: 'Log out',
        icon: faDoorOpen,
        href: '/logout',
        allowed: ['User', 'Admin'],
    },
    {
        title: 'Administração',
        icon: faGear,
        href: '/admin',
        allowed: ['Admin'],
    },
    {
        title: 'Iniciar sessão',
        icon: faUser,
        href: '/login',
        allowed: ['Guest'],
    },
    {
        title: 'Registrar-se',
        icon: faUserEdit,
        href: '/register',
        allowed: ['Guest'],
    }

]


const UserPopover = () => {


    const { '_r': auth_cookie } = parseCookies()
    const [cookie] = useState<string>(auth_cookie)
    const [drawerOpen, setDrawer] = useState<boolean>(false)


    async function fetcher() {
        const response = await fetch(`${Website_API}/auth/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        })
        return (await response.json())
    }
    const { data, error, isLoading } = useSWR<UserDataResponse>(`${Website_API}/auth/user`, fetcher)

    if (data) {

        const current_role = data.isLoggedIn ? data.user?.role! : 'Guest';
        const current_user = data.isLoggedIn ? data.user?.email! : 'Visitante'


        return (
            <>

                <div className="hidden lg:flex">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center flex-row gap-6 hover:text-blue-500 cursor-pointer">
                                <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                                <span>{current_user}</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 font-roboto rounded-none">
                            <ul className="flex flex-col">
                                {MenuItems.filter(item => item.allowed.includes(current_role)).map((item, index) => {
                                    return (
                                        <Link href={item.href} prefetch={false} className=" hover:bg-blue-200 transition-all">
                                            <li className="px-4 py-2 flex flex-row gap-2 items-center"><FontAwesomeIcon icon={item.icon} /> {item.title}</li>
                                        </Link>
                                    )
                                })
                                }
                            </ul>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex lg:hidden">
                    <button onClick={() => setDrawer(true)}>
                        <div className="flex items-center flex-row gap-6 hover:text-blue-500 cursor-pointer p-3 rounded-full bg-blue-600">
                            <FontAwesomeIcon icon={faUser} color="white" />
                        </div>
                    </button>
                </div>
                <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawer(false)}
                    anchor="right"
                >
                    <div className="h-full w-[300px] bg-blue-600 flex flex-col gap-3 text-gray-50 items-center">
                        <Link href="/" className="flex items-center mt-5">
                            <img src="/icon.png" className="h-24" />
                        </Link>
                        <ul className="flex flex-col">
                            {MenuItems.filter(item => item.allowed.includes(current_role)).map((item, index) => {
                                return (
                                    <Link href={item.href} prefetch={false} className=" hover:bg-blue-200 transition-all">
                                        <li className="px-4 py-2 flex flex-row gap-2 items-center"><FontAwesomeIcon icon={item.icon} /> {item.title}</li>
                                    </Link>
                                )
                            })
                            }
                        </ul>
                    </div>
                </Drawer>
            </>
        )
    }


}
export default UserPopover;