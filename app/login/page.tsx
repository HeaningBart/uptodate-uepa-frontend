import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from './components/user-auth-form'

export const metadata: Metadata = {
  title: 'Iniciar sessão - UpToDate do Pará',
  description: 'Entre no UpToDate do Pará.',
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container flex relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 text-primary">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Registrar-se
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium gap-2">
            <img src={'/icon.png'} className="h-8" />
            UpToDate do Pará
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">Criado de um aluno para alunos.</p>
              <footer className="text-sm">Mirion</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Entre na sua conta
              </h1>
              <p className="text-sm text-muted-foreground"></p>
              Insira seu endereço de e-mail e senha para acessar sua conta.
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
