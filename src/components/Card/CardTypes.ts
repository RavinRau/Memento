import { ReactNode } from 'react'
import { CardUI } from '../ui/card'
import { DropdownItemProps } from '../Dropdown/DropdownTypes'

type BaseCardProps = React.ComponentProps<typeof CardUI>

export type CardProps = BaseCardProps & {
  title?: string
  description?: string
  footer?: ReactNode
  classNameChildren?: string
}

export type CardContent = {
  title: string
  contentText: string
}

export type CardWithDropdownProps = CardProps & {
  id?: string
  dropdownItems: DropdownItemProps[]
  children: string
}