import { z } from 'zod'
import { toast } from 'sonner'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import { signInSchema } from '@/schemas/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

export const SignIn = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const { email, password } = data
    setIsLoading(true)
    signIn('credentials', { email, password, redirect: false })
      .then((res) => {
        if (res?.error) {
          throw new Error(res.error)
        }

        toast.success('Signed in successfully')
        onClose()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const signInGoogle = async () => {
    setIsLoading(true)
    signIn('google')
      .finally(() => setIsLoading(false))
  }

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="Email" disabled={isLoading} />
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
                  <Input {...field} type="password" placeholder="Password" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <p className="text-sm hover:underline cursor-pointer">
              Quên mật khẩu?
            </p>
          </div>
          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            Đăng nhập
          </Button>
        </form>
      </Form>
      <div className="my-4">
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <p className="text-sm text-gray-500">Or</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <button
          onClick={signInGoogle}
          className="inline-flex mt-2 w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm border border-gray-300 cursor-pointer hover:bg-gray-50"
          disabled={isLoading}
        >
          <Image src="/google.png" alt="google" width={18} height={18} />
        </button>
      </div>
    </div>
  )
}
