'use client'
import '../styles/article.css'
import '../styles/styling.css'
import '../styles/outline.css'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Drawer } from '@mui/material'
import { useState, createRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPrint } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';
import parse, { Element, Text } from 'html-react-parser';
import ImageModal from './image-modal'


const ArticleContainer = ({ title, articleHtml, outlineHtml }: { title: string, articleHtml: string, outlineHtml: string }) => {

    const [open, setOpen] = useState<boolean>(true)
    const componentRef = createRef<HTMLDivElement>()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
        documentTitle: title
    });

    return (<>
        <nav className="block lg:hidden bg-blue-600 p-2 sticky top-[72px] z-[999] text-gray-50">
            <button className="px-2" onClick={() => setOpen(!open)}><FontAwesomeIcon data-outline-open={open} icon={faChevronLeft} className="data-[outline-open=false]:rotate-180" /></button>
            <button className="px-2" onClick={handlePrint}>Imprimir</button>

        </nav>
        <div className="isDesktop">
            <button onClick={() => setOpen(!open)} data-outline-open={open} className="hidden lg:block fixed p-2 bg-gray-400 text-black z-[999] left-[300px] transition-all ease-in data-[outline-open=false]:left-0 top-[200px]"><FontAwesomeIcon data-outline-open={open} icon={faChevronLeft} className="data-[outline-open=false]:rotate-180" /></button>
            <button className="hidden lg:block fixed p-2 bg-gray-400 text-black z-[999] left-[300px] transition-all ease-in data-[outline-open=false]:left-0 top-[300px]" onClick={handlePrint} data-outline-open={open}><FontAwesomeIcon icon={faPrint} /></button>

            <Drawer
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        top: 120
                    },
                    '@media(max-width: 1024px)': {
                        '& .MuiDrawer-paper': {
                            width: '100%',
                            boxSizing: 'border-box',
                            top: 112
                        }
                    },
                    top: 120
                }}
                data-outline-open={open}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className="topicOutline w-full" id="topicOutline">
                    <div className="lg:fixed w-full lg:w-[300px]">
                        <ScrollArea className="h-screen w-full">
                            <div onClick={() => setOpen(false)} className="scroll-smooth snap-center scroll-mt-[112px]" >
                                {parse(outlineHtml, {
                                    replace(domNode) {
                                        if ((domNode as Element).attribs && (domNode as Element).attribs.class && (domNode as Element).attribs.class.includes('graphic')) {
                                            return <ImageModal url={(domNode as Element).attribs.href} text={`${(domNode as Element).children.length > 0 && ((domNode as Element).children[1] as Text).data}`} />
                                        }
                                    },
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </Drawer>
            <div>
                <div id="topicContainer" data-outline-open={open} className="lg:data-[outline-open=true]:ml-[300px] transition-all ease-in">
                    <div className="article scroll-smooth snap-center scroll-mt-[112px]" ref={componentRef}>
                        {parse(articleHtml, {
                            replace(domNode) {
                                if ((domNode as Element).attribs && (domNode as Element).attribs.class && (domNode as Element).attribs.class.includes('graphic')) {
                                    return <ImageModal url={(domNode as Element).attribs.href} text={`${(domNode as Element).children.length > 0 && ((domNode as Element).children[0] as Text).data}`} />
                                }
                            },
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default ArticleContainer;