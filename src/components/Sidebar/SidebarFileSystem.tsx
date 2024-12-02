import { cn } from '@/lib/utils'
import { SidebarFileSystemProps } from './SidebarTypes'
import Sidebar from './Sidebar'
import { Folder, FolderOpen, MoreVerticalIcon } from 'lucide-react'
import Dropdown from '../Dropdown/Dropdown'

const SidebarFileSystem = ({
  items,
  onFolderToggle,
  dropdownItems,
  header,
  ...props
}: SidebarFileSystemProps) => {
  return (
    <Sidebar header={header} {...props}>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex justify-between rounded-lg items-center cursor-pointer text-neutral-80 transition-colors',
              'hover:bg-primary-10 hover:text-neutral-100',
              {
                'bg-primary-100 text-neutral-0 hover:bg-primary-80 hover:text-neutral-0':
                  item.isActive,
              }
            )}
          >
            <div
              onClick={() => onFolderToggle?.(item)}
              className={cn('flex items-center gap-2  p-2 text-sm w-full text-left truncate')}
            >
              {item.isActive ? (
                <FolderOpen className="h-4 w-4 shrink-0" />
              ) : (
                <Folder className="h-4 w-4 shrink-0" />
              )}
              <span className="truncate">{item.name}</span>
            </div>
            {dropdownItems && <Dropdown
              label={<MoreVerticalIcon className="h-5 w-5" />}
              data={dropdownItems}
              id={item.id}
            />}
          </div>
        ))}
      </div>
    </Sidebar>
  )
}

export default SidebarFileSystem
