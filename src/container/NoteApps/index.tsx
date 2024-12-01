import { Button } from '@/components/Button/Button'
import SidebarFileSystem from '@/components/Sidebar/SidebarFileSystem'
import { FileItem } from '@/components/Sidebar/SidebarTypes'
import { Notebook, Plus } from 'lucide-react'

const NotesApp = () => {
  const fileSystemItems = [
    { id: '1', name: 'Documents' },
    { id: '2', name: 'Images' },
    { id: '3', name: 'Projects' },
    { id: '4', name: 'Notes' },
  ]

  const handleFolderToggle = (folder: FileItem) => {
    console.log('Folder toggled:', folder.name)
  }

  const renderHeader = () => {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Notebook className="h-6 w-6 text-neutral-60" />
            <span className="text-h3">Memento</span>
          </div>
          <Button className="rounded-full" variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-description">Click on the plus icon to add folder</span>
      </div>
    )
  }

  return (
    <div>
      <SidebarFileSystem
        header={renderHeader()}
        items={fileSystemItems}
        onFolderToggle={handleFolderToggle}
      />
    </div>
  )
}

export default NotesApp
