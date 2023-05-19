import { ButtonHTMLAttributes } from 'react'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
   click?: () => void
   variant: 'filled' | 'outline'
   styles?: string
   size?: string
}