'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUTDResponse } from "@/types";
import { Website_API } from "@global";
import { parseCookies } from "nookies";
import useSWR from 'swr'
import '../styles/graphics.css'
import { ScrollArea } from "@/components/ui/scroll-area"
import { ReactNode, useEffect, useState } from "react";


type ImageModalProps = {
    text: string
    url: string
    children?: ReactNode
}


const ImageModal = ({ text, url }: ImageModalProps) => {

    const { '_r': cookie } = parseCookies()

    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>();


    useEffect(() => {
        if (open) {
            (async () => {
                const response = await fetcher()
                setData(response)
            })()
        }
    }, [open])


    async function fetcher() {
        const response = await fetch(`${Website_API}${url}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        })
        return (await response.json())
    }




    return (
        <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
            <DialogTrigger asChild>
                <a className="cursor-pointer">{text}</a>
            </DialogTrigger>
            <DialogContent className="overflow-hidden">
                {data &&
                    <>
                        <DialogTitle>{data.data.graphicInfo.title}</DialogTitle>
                        <ScrollArea className="max-h-[70vh] w-full">
                            <div dangerouslySetInnerHTML={{ __html: data.data.imageHtml }} />
                        </ScrollArea>
                    </>
                }
            </DialogContent>
        </Dialog>
    )


}
export default ImageModal;