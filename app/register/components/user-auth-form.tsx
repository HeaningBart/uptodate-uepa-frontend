'use client'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import API from '@/services/api'
import { Token } from '@/lib/actions'
import { useRouter } from 'next/navigation'

const signUpRequest = async (data: { email: string; password: string }) => {
  await API.post('/register', data)
  const token = await logInRequest(data.email, data.password)
  return token
}

const logInRequest = async (email: string, password: string) => {
  const { token } = (
    await API.post<{ token: Token }>('/login', {
      email,
      password,
    })
  ).data
  return token
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido.' }),
  password: z.string().min(6, {
    message:
      'Sua senha tem que ter no mínimo 6 caracteres e não pode ter espaços.',
  }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const token = await signUpRequest(values)
    toast.success(
      `Você foi cadastrado com sucesso! Agora você pode fazer login.`
    )
    setIsLoading(false)
    router.push('/api/login?token=' + token)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço de e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="nome@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha de utilização</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***************"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cadastrar-se com um e-mail
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
