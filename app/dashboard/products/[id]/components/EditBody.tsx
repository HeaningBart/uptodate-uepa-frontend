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

export const AnnouncementEditBody = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useSWR(`/products/${id}`, fetcher)
  const router = useRouter()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [unitPrice, setPrice] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setContent(data.description)
      setPrice(data.unitPrice)
      setDuration(data.duration)
    }
  }, [data])

  async function updateAnnouncement() {
    toast.promise(
      API.put(`/products/${id}`, {
        title,
        description: content,
        unitPrice,
        duration,
      }),
      {
        loading: 'Updating...',
        success: 'Product updated successfully!',
        error: 'Error updating product',
      }
    )
  }

  async function deleteAnnouncement() {
    toast.promise(API.delete(`/products/${id}`), {
      loading: 'Deleting...',
      success: 'Product deleted successfully!',
      error: 'Error deleting product!',
    })
    router.push('/dashboard/products')
  }

  if (!isLoading) {
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
            <Textarea
              className="bg-foreground"
              value={content}
              placeholder={'Product title'}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
            <Input
              className="bg-foreground"
              value={unitPrice.toString()}
              placeholder={'Product price'}
              onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            />
            <Input
              className="bg-foreground"
              value={duration.toString()}
              placeholder={'Product duration'}
              onChange={(e) => setDuration(parseInt(e.currentTarget.value))}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-2">
          <div className="flex flex-col gap-2 p-4 rounded bg-foreground">
            <div className="flex flex-col gap-2">
              <Button
                className="bg-blue-400 hover:bg-blue-700"
                onClick={() => updateAnnouncement()}
              >
                Save
              </Button>
              <Button
                className="bg-red-400 hover:bg-red-800"
                onClick={() => deleteAnnouncement()}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div className="container min-h-screen p-4 bg-foreground"></div>
}
