import { cn } from '@/utils/utils'
import { SidebarProps } from './SidebarTypes'

const Sidebar = ({ header, children, className, width = '280px' }: SidebarProps) => {
  return (
    <aside
      className={cn('fixed left-0 top-0 h-screen border-r border-border bg-background', className)}
      style={{ width }}
    >
      {header && <div className="flex h-[6rem] border-b border-border p-4">{header}</div>}

      <div className="flex h-[calc(100vh-6rem)] flex-col gap-2 overflow-y-auto p-4">{children}</div>
    </aside>
  )
}

export default Sidebar
