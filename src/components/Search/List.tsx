import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import parse from 'html-react-parser'
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

export type SearchResult = {
    snippet: string;
    id: string;
    type: string;
    subtype: string;
    title: string;
    url: string;
}

type SearchListProps = {
    data: SearchResult[]
}

const SearchList = ({ data }: SearchListProps) => {

    return (
        <List className="flex flex-col gap-3">
            {data.length > 0 && data.map((item) => {
                return (
                    <Link key={item.id} href={item.url.replace('contents', 'articles')}>
                        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', fontFamily: 'Roboto' }} className="bg-white border-gray-200 border-2">
                            <ListItemText primary={item.title} className="text-[#005b92]" primaryTypographyProps={{ style: { fontSize: 20, fontWeight: 'bold' } }} />
                            <div>
                                {parse('<div>' + item.snippet + '</div>')}
                            </div>
                        </ListItem>
                    </Link>
                )
            })}
        </List>
    )
}

export default SearchList;