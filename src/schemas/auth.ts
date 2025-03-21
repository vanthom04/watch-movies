import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ message: 'Vui lòng nhập email.' })
    .email({ message: 'Email không hợp lệ.' })
    .max(30, { message: 'Email không được vượt quá 30 ký tự.' }),
  password: z
    .string({ message: 'Vui lòng nhập mật khẩu.' })
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
    .max(30, { message: 'Mật khẩu không được vượt quá 30 ký tự.' })
})

export const signUpSchema = z.object({
  name: z
    .string({ message: 'Vui lòng nhập tên.' })
    .min(1, { message: 'Tên không được để trống.' })
    .max(30, { message: 'Tên không được vượt quá 30 ký tự.' }),
  email: z
    .string({ message: 'Vui lòng nhập email.' })
    .email({ message: 'Email không hợp lệ.' })
    .max(30, { message: 'Email không được vượt quá 30 ký tự.' }),
  password: z
    .string({ message: 'Vui lòng nhập mật khẩu.' })
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
    .max(30, { message: 'Mật khẩu không được vượt quá 30 ký tự.' })
})
