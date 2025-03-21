import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToTop = () => {
  return window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
import { pbkdf2Sync, randomBytes } from 'crypto'

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return { salt, hash }
}

export const verifyPassword = (password: string, salt: string, hash: string) => {
  const hashVerify = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === hashVerify
}
