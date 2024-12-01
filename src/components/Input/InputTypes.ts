import { ComponentProps } from 'react'
import { InputUI } from '@/components/ui/input'

export type InputProps = ComponentProps<typeof InputUI> & {
  label?: string
}
