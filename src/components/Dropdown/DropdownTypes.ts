import { ReactNode } from 'react'

export type DropdownItemType = 'label' | 'separator' | 'item' | 'group' | 'submenu'

export type DropdownItemProps = {
  type: DropdownItemType
  icon?: ReactNode
  text?: string | ReactNode
  description?: string | ReactNode
  key?: string
  shortcut?: ReactNode
  items?: DropdownItemProps[]
  disabled?: boolean
  className?: string
  onClick?: (id: string) => void
}

export type DropdownProps = {
  label?: ReactNode
  data?: DropdownItemProps[]
  showDescription?: boolean
  className?: string
  classNameTrigger?: string
  disabled?: boolean
  align?: 'center' | 'start' | 'end'
  noteId?: string
}
