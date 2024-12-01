import { cn } from '@/lib/utils'
import { SidebarFileSystemProps } from './SidebarTypes'
import Sidebar from './Sidebar'
import { Folder, FolderOpen } from 'lucide-react'

const SidebarFileSystem = ({ items, onFolderToggle, header, ...props }: SidebarFileSystemProps) => {
  return (
    <Sidebar header={header} {...props}>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onFolderToggle?.(item)}
            className={cn(
              'flex items-center gap-2 rounded-lg p-2 text-sm cursor-pointer text-neutral-80 transition-colors w-full text-left',
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
