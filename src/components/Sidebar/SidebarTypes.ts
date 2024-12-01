import { ReactNode } from 'react'

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
  activeItemId?: string
  onFolderToggle?: (folder: FileItem) => void
}
