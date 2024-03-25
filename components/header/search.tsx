'use client'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDebounceCallback, useOnClickOutside } from 'usehooks-ts'
import CircularProgress from '@mui/material/CircularProgress'

export default function HeaderSearch() {
  const rootRef = useRef(null)
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const debounced = useDebounceCallback(setQuery, 1000)

  useOnClickOutside(rootRef, () => {
    setQuery('')
    setOpen(false)
  })

  return (
    <div
      ref={rootRef}
      className="flex flex-row gap-2 items-center justify-center relative z-[2] pl-4 pr-2 rounded bg-background "
    >
      <FontAwesomeIcon icon={faSearch} className="text-primary" />
      <form action="/contents/search">
        <input
          className="flex flex-row justify-center bg-background items-center text-primary placeholder:text-primary placeholder:text-xs h-[30px] py-[4px] px-[6px] min-w-[30px] flex-grow grow-1 border-0  focus:outline-none focus:ring-0"
          name="search"
          onChange={(e) => debounced(e.target.value)}
          placeholder={'Procure um artigo médico...'}
        />
      </form>
    </div>
  )
}
