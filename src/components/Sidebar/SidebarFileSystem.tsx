'use client'

import { cn } from '@/lib/utils'
import { FileItem, SidebarFileSystemProps } from './SidebarTypes'
import Sidebar from './Sidebar'
import { Folder, FolderOpen } from 'lucide-react'
import { useState, useEffect } from 'react'

const SidebarFileSystem = ({
  items: initialItems,
  onFolderToggle,
  activeItemId,
  header,
  ...props
}: SidebarFileSystemProps) => {
  const [items, setItems] = useState<FileItem[]>(initialItems)

  // Update items when activeItemId changes
  useEffect(() => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        isActive: item.id === activeItemId,
      }))
    )
  }, [activeItemId])

  const handleItemClick = (clickedItem: FileItem) => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        // Close all other folders when opening a new one
        isOpen: item.id === clickedItem.id ? !item.isOpen : false,
      }))
    )
    onFolderToggle?.(clickedItem)
  }

  return (
    <Sidebar header={header} {...props}>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-80 transition-colors w-full text-left',
              'hover:bg-primary-10 hover:text-neutral-100',
              { 'bg-primary-80 text-neutral-0': item.isActive }
            )}
          >
            {item.isOpen ? (
              <FolderOpen className="h-4 w-4 shrink-0" />
            ) : (
              <Folder className="h-4 w-4 shrink-0" />
            )}
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </Sidebar>
  )
}

export default SidebarFileSystem
