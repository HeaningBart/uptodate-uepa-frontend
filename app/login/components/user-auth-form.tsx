'use client'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
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
import { authenticate } from '@/lib/actions'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().min(2, {
    message:
      'Seu nome de usuário tem que ter pelo menos 2 caracteres e não pode ter espaços.',
  }),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    toast.promise(authenticate({ ...values }), {
      success: () => {
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
        return 'Logged in successfully! Redirecting...'
      },
      loading: `We're checking your credentials...`,
      error:
        'An error occurred while trying to log in. Please, check your credentials and try again.',
    })
    setIsLoading(false)
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
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo@exemplo.com" {...field} />
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
              Entrar na sua conta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
