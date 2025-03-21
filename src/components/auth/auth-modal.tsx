'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription
} from '@/components/ui/dialog'

import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

type Variant = 'sign-in' | 'sign-up'

interface AuthModalProps {
  isOpen: boolean
  onClose: (open: boolean) => void
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [variant, setVariant] = useState<Variant>('sign-in')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>
            {variant === 'sign-in' ? 'Đăng nhập': 'Đăng ký'}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {variant === 'sign-in'
              ? 'Vui lòng nhập thông tin tài khoản của bạn để đăng nhập.'
              : 'Vui lòng điền thông tin để tạo tài khoản mới.'}
          </DialogDescription>
        </DialogHeader>
        {variant === 'sign-in'
          ? <SignIn onClose={() => onClose(false)} />
          : <SignUp onClose={() => onClose(false)} />}
        <div className="flex items-center justify-center gap-x-2">
          <p className="text-sm text-gray-500">
            {variant === 'sign-in' ? 'Bạn chưa có tài khoản?' : 'Đã có tài khoản?'}
          </p>
          <span
            className="cursor-pointer text-sm text-blue-500"
            onClick={() => setVariant(variant === 'sign-in' ? 'sign-up' : 'sign-in')}
          >
            {variant === 'sign-in' ? 'Đăng ký' : 'Đăng nhập'}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
