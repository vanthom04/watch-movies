'use client'

import * as z from 'zod'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useCallback, useTransition } from 'react'

import { cn } from '@/lib/utils'
import { login } from '@/actions/login'
import { register } from '@/actions/register'
import useAuthModal from '@/hooks/use-auth-modal'
import { LoginSchema, RegisterSchema, UserSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

type Variant = 'LOGIN' | 'REGISTER'

const LoginForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isPending, startTransition] = useTransition()

  const { isOpen, onClose } = useAuthModal()

  const toggleVariant = useCallback(() => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')
  }, [variant])

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(variant === 'LOGIN' ? LoginSchema : RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    if (variant === 'LOGIN') {
      const { email, password } = values
      startTransition(() => {
        login({ email, password }).then((data) => {
          if (data.error) {
            return toast.error(data.error)
          }

          onClose()
          toast.success('Đăng nhập thành công!')
        })
      })
    }

    if (variant === 'REGISTER') {
      startTransition(() => {
        register(values).then((data) => {
          if (data.error) {
            return toast.error(data.error)
          }

          onClose()
          toast.success('Đăng ký thành công!')
        })
      })
    }
  }

  const loginWithGoogle = async () => {
    signIn('google').then((callback) => {
      if (callback?.error) {
        return toast.error(callback.error)
      }
      
      if (callback?.ok && !callback?.error) {
        toast.success('Đăng nhập thành công')
      }
    })
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
      form.reset()
      setVariant('LOGIN')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent aria-describedby={undefined} className="w-[450px] shadow-md bg-white">
        <DialogTitle>{variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký'}</DialogTitle>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {variant === 'REGISTER' && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          autoComplete="off"
                          spellCheck="false"
                          placeholder="Your name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="Your email address"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="Your password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký'}
            </Button>
          </form>
        </Form>

        <div className="mt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={loginWithGoogle}
            className="inline-flex mt-2 w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FcGoogle size={20} />
          </button>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-2 px-2 tex-gray-500">
          <p>{variant === 'LOGIN' ? 'Don\'t have an account?' : 'Already have an account?'}</p>
          <span
            className={cn('underline cursor-pointer', { 'pointer-events-none': isPending })}
            onClick={toggleVariant}
          >
            {variant === 'LOGIN' ? 'Sign up' : 'Sign in'}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginForm
