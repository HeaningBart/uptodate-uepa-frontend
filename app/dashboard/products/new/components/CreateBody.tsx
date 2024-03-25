'use client'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { fetcher } from '@/services/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import API from '@/services/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

export const AnnouncementCreateBody = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [duration, setDuration] = useState<number>(30)

  const router = useRouter()

  const createAnnouncement = async () => {
    try {
      await API.post('/products', {
        title,
        description: content,
        unitPrice: price,
      })
      toast.success('Product created successfully!')
      router.push('/dashboard/products')
    } catch (error) {
      toast.error('Failed to create product')
    }
  }

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-10">
        <div className="flex flex-col gap-2">
          <Input
            className="bg-foreground"
            value={title}
            placeholder={'Product title'}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <div className="flex flex-row gap-2">
            <Input
              className="bg-foreground"
              placeholder={'Product price'}
              onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            />
            <Input
              className="bg-foreground"
              placeholder={'Product duration'}
              onChange={(e) => setDuration(parseInt(e.currentTarget.value))}
            />
          </div>
          <Textarea onChange={(e) => setContent(e.currentTarget.value)} />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-2">
        <div className="flex flex-col gap-2 p-4 rounded bg-foreground">
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => createAnnouncement()}
              className="bg-blue-400 hover:bg-blue-700"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
