'use client'

import {
  faUser,
  faGear,
  faBookmark,
  faCoins,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import useAuthentication from '@/hooks/useAuth'
import { Skeleton } from '../ui/skeleton'

const MenuItems = [
  {
    title: 'Favoritos',
    icon: faBookmark,
    href: '/profile/bookmarks',
    allowed: ['Reader', 'Admin'],
  },
  {
    icon: faGear,
    title: 'Configurações',
    href: '/profile/me',
    allowed: ['Reader', 'Admin'],
  },
  {
    title: 'Admin',
    icon: faGear,
    href: '/dashboard',
    allowed: ['Admin'],
  },
]

const UserMenu = () => {
  const { data, error, isLoading, mutate } = useAuthentication()

  if (isLoading) {
    return (
      <>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-[150px] hidden lg:block" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </>
    )
  }

  return (
    <>
      {data && data.isLoggedIn && (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <button className="lg:px-4 gap-2 flex flex-row items-center text-primary justify-center transition-all ease-in rounded">
                <span className="hidden lg:inline-flex text-xs text-primary">{`Olá, `}</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={'https://github.com/shadcn.png'} />
                  <AvatarFallback>{data.user.username}</AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] border-gray-800 shadow-lg mt-5">
              <div className="flex flex-col gap-3 justify-center items-center">
                <Link href={'/profile/me'}>
                  <button className="rounded-xl bg-foreground w-fit py-2 px-6">
                    Meu perfil
                  </button>
                </Link>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {MenuItems.filter((item) =>
                    item.allowed.includes(data.user.role)
                  ).map((item, index) => {
                    return (
                      <Link key={index} href={item.href} prefetch={false}>
                        <div className="px-4 py-4 bg-background text-primary transition-colors rounded flex flex-col items-center justify-center gap-3">
                          <FontAwesomeIcon icon={item.icon as IconProp} />
                          <span className="text-xs">{item.title}</span>
                        </div>
                      </Link>
                    )
                  })}
                  <Link href={'/api/logout'} prefetch={false}>
                    <div className="px-4 py-4 bg-foreground text-primary transition-colors rounded flex flex-col items-center justify-center gap-3">
                      <FontAwesomeIcon icon={faDoorOpen} />
                      <span className="text-xs">Log out</span>
                    </div>
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
      {!data?.isLoggedIn && (
        <>
          <div className="flex flex-row gap-x-4 items-center">
            <Link href={'/login'}>
              <button className="inline-flex tracking-wide gap-2 items-center h-fit py-2 ease-in transition-all text-white text-[16px] font-medium rounded-lg">
                <FontAwesomeIcon color={'#979797'} icon={faUser} />
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  )
}
export default UserMenu
