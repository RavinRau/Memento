import { ReactNode } from 'react'

export type ModalTypes = {
  title: string
  description?: string
  open: boolean
  onOpen: (open: boolean) => void
  children: ReactNode
  footer?: ReactNode
  primaryButton?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  secondaryButton?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
}
