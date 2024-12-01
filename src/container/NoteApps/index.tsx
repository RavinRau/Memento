import { useEffect } from 'react'
import { Button } from '@/components/Button/Button'
import SidebarFileSystem from '@/components/Sidebar/SidebarFileSystem'
import { FileItem } from '@/components/Sidebar/SidebarTypes'
import { Notebook, Plus } from 'lucide-react'
import { useState } from 'react'
import { observer } from 'mobx-react'
import { CreateFolderModal } from './FoldersModal/FolderModal'
import { folderStore } from '@/stores/FolderStore'
import { noteStore } from '@/stores/NoteStore'
import { NotesList } from './NoteList'
import { WelcomeFolderScreen } from './WelcomeScreens/FolderScreen'

export const NotesApp = observer(() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    folderStore.initialize()
    noteStore.initialize()
  }, [])

  const handleFolderToggle = (folder: FileItem) => {
    folderStore.setActiveFolder(folder.id)
  }

  const renderHeader = () => {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Notebook className="h-6 w-6 text-neutral-60" />
            <span className="text-h3">Memento</span>
          </div>
          <Button
            className="rounded-full"
            variant="ghost"
            size="icon"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-description">Click on the plus icon to add folder</span>
      </div>
    )
  }

  return (
    <div className="pl-[280px]" style={{ height: '100vh' }}>
      <SidebarFileSystem
        header={renderHeader()}
        items={folderStore.getFolders}
        onFolderToggle={handleFolderToggle}
      />
      {folderStore.getFolders.length === 0 ? (
        <WelcomeFolderScreen onClick={() => setIsCreateModalOpen(true)} />
      ) : (
        <NotesList />
      )}
      <CreateFolderModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
})
