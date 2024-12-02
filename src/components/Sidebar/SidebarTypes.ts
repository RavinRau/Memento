import { ReactNode } from 'react'
import { DropdownItemProps } from '../Dropdown/DropdownTypes'

export type SidebarProps = {
  header?: ReactNode
  children?: ReactNode
  className?: string
  width?: string
}

export type FileItem = {
  id: string
  name: string
  isOpen?: boolean
  isActive?: boolean
}

export type SidebarFileSystemProps = SidebarProps & {
  items: FileItem[]
  onFolderToggle?: (folder: FileItem) => void
  dropdownItems?: DropdownItemProps[]
}
