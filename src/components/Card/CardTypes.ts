import { ReactNode } from 'react'
import { CardUI } from '../ui/card'

type BaseCardProps = React.ComponentProps<typeof CardUI>

export type CardProps = BaseCardProps & {
  title?: string
  description?: string
  footer?: ReactNode
  classNameChildren?: string
}
