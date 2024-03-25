import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import parse from 'html-react-parser'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

export type SearchResult = {
  snippet: string
  id: string
  type: string
  subtype: string
  title: string
  url: string
  languageCode: string
}

type SearchListProps = {
  data: SearchResult[]
}

const SearchList = ({ data }: SearchListProps) => {
  return (
    <ul className="flex flex-col gap-3">
      {data.length > 0 &&
        data.map((item) => {
          return (
            <li className="bg-foreground border-border shadow-md rounded border-2 p-4">
              <Link
                key={item.id}
                href={item.url}
                className="flex flex-col gap-2"
              >
                <h5 className="font-bold text-lg text-primary">{item.title}</h5>
                <div className="flex flex-row gap-2 flex-wrap">
                  <span className="bg-[#E1F0DA] dark:bg-[#212d1c] text-[#99BC85] text-[10px] font-bold text-primary-100 px-2 py-1 rounded uppercase">
                    {item.type == 'medical' && 'Artigo Médico'}
                  </span>
                  <span className="bg-[#e2fff4] dark:bg-[#212d1c] text-[#55c798] text-[10px] font-bold text-primary-100 px-2 py-1 rounded uppercase">
                    {item.languageCode == 'en-US' && 'Disponível em Inglês'}
                  </span>
                </div>
                <div className="text-secondary">
                  {parse('<div>' + item.snippet + '</div>')}
                </div>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

export default SearchList
