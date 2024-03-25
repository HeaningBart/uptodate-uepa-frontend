'use client'
import { useState, useRef, useEffect } from 'react'
import { UpToDateResponse } from '@/types/uptodate'
import { Transition } from '@headlessui/react'
import parse, { DOMNode, Element, Text } from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { ImageModal } from '@/components/modal'

const ArticleContent = ({ article }: { article: UpToDateResponse }) => {
  const [open, setOpen] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (window && window.innerWidth < 1024) {
      setIsMobile(true)
    }
  }, [window])

  return (
    <div data-open={open} data-is-mobile={isMobile} className="group">
      <button
        className="bg-popover text-primary p-2 rounded fixed z-[100] top-[75px] group-data-[open='true']:md:left-[285px] group-data-[open='true']:lg:left-[365px] group-data-[open='false']:left-[5px] shadow-md transition-all duration-300"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={open ? faChevronLeft : faChevronRight} />
      </button>
      <div className="flex">
        <div id="utd-main" className="utd-content-main">
          <div id="topicContainer" className="topicContainer">
            <div
              id="topicOutline"
              className="topicOutline bg-[white] dark:bg-[#101010] transition-all duration-300 group-data-[open='true']:translate-x-0 group-data-[open='false']:-translate-x-full fixed top-[70px]"
            >
              <div id="outlineContent">
                {parse(article.data.outlineHtml, {
                  replace: (domNode) => {
                    if (
                      domNode instanceof Element &&
                      domNode.tagName === 'a' &&
                      domNode.attribs['href'] &&
                      domNode.attribs['href'].includes('contents/image')
                    ) {
                      return (
                        <ImageModal href={domNode.attribs['href']}>
                          <Link href={'#'} data-fetch={domNode.attribs['href']}>
                            {(domNode.children[1] as Text).data}
                          </Link>
                        </ImageModal>
                      )
                    }
                  },
                })}
              </div>
            </div>

            <div className="group-data-[open='true']:lg:pl-[360px] group-data-[open='false']:lg:pl-[0px] overflow-auto transition-all durantion-300 lg:pt-[70px] flex flex-col gap-2">
              <div className="p-4 font-bold text-2xl text-primary text-center">
                <h1>{article.data.topicInfo.title}</h1>
              </div>
              <article className="topicArticle text-primary">
                {parse(article.data.bodyHtml, {
                  replace: (domNode) => {
                    if (
                      domNode instanceof Element &&
                      domNode.tagName === 'a' &&
                      domNode.attribs['href'] &&
                      domNode.attribs['href'].includes('contents/image')
                    ) {
                      return (
                        <ImageModal href={domNode.attribs['href']}>
                          <Link href={'#'} data-fetch={domNode.attribs['href']}>
                            {(domNode.children[0] as Text).data}
                          </Link>
                        </ImageModal>
                      )
                    }
                  },
                })}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArticleContent
