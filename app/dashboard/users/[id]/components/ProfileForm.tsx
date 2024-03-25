'use client'
import { useContext, useState } from 'react'
import { SingleUserContext as Context } from './Context'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import API from '@/services/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DatePicker } from './date-picker'

const editUserFormSchema = z.object({
  email: z.string().email(),
})

type EditUserFormValues = z.infer<typeof editUserFormSchema>

const UserProfileForm = () => {
  const { user } = useContext(Context)

  const [role, setRole] = useState<'User' | 'Admin'>(user.role)
  const [date, setDate] = useState<Date>(new Date(user.authorizedUntil))
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: user?.email || '',
    },
  })

  async function onSubmit(data: EditUserFormValues) {
    toast.promise(
      API.put(`/users/${user.id}`, { ...data, role, authorizedUntil: date }),
      {
        success: 'User successfully updated!',
      }
    )
  }

  return (
    <div className="bg-foreground p-4 rounded">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2 items-center">
            <span className="text-primary px-4">User role</span>
            <Select
              defaultValue={role}
              onValueChange={(e: 'User' | 'Admin') => setRole(e)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue className="bg-gray-400" placeholder="Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  )
}
export default UserProfileForm
