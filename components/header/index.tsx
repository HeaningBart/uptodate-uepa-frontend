'use client'
import HeaderSearch from './search'
import Link from 'next/link'
import UserMenu from './user-menu'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <nav className="bg-[white] dark:bg-[#101010] border-gray-200 shadow sticky z-[49] top-0 transition-all duration-300 ease-in">
        <div className="flex flex-row gap-2 items-center justify-between p-4">
          <div className="flex flex-row justify-between-gap-3">
            <Link
              href={'/'}
              className="flex flex-row gap-2 items-center justify-center group-data-[open=false]:absolute group-data-[open=false]:right-16"
            >
              <div className="flex flex-row gap-2 items-center">
                <img src="/icon.png" className="h-8 w-auto mr-3" alt={`Logo`} />
              </div>
            </Link>
            <HeaderSearch />
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() =>
                theme === 'dark' ? setTheme('light') : setTheme('dark')
              }
              className="text-primary text-xs bg-foreground fixed bottom-[30px] lg:static flex flex-row gap-2 items-center p-2 transition-all ease-in rounded group-data-[open=false]:hidden"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <UserMenu />
          </div>
        </div>
      </nav>
    </>
  )
}
