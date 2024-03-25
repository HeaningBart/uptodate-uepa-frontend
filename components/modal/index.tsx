'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetcher } from '@/services/api'
import { UpToDateImageResponse } from '@/types/uptodate'
import { CircularProgress } from '@mui/material'
import useSWR from 'swr'
import './styles.css'

export function ImageModal({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  const { data, isLoading, error } = useSWR<UpToDateImageResponse>(
    `${new URL(href, process.env.NEXT_PUBLIC_API_URL).toString()}`,
    fetcher
  )

  return (
    <Dialog>
      <DialogTrigger className="font-bold text-blue-600" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[80vw]">
        {isLoading && <CircularProgress />}
        {data && (
          <div
            className="overflow-y-auto max-h-[80vh]"
            dangerouslySetInnerHTML={{ __html: data.data.imageHtml }}
          ></div>
        )}
      </DialogContent>
    </Dialog>
  )
}
