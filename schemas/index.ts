import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên của bạn'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Minimum 6 character required'
  }),
  name: z.string().min(1, {
    message: 'Name is required'
  })
})
