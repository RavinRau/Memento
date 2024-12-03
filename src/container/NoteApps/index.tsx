import { useEffect } from 'react'
import { Button } from '@/components/Button/Button'
import SidebarFileSystem from '@/components/Sidebar/SidebarFileSystem'
import { FileItem } from '@/components/Sidebar/SidebarTypes'
import { Notebook, Pencil, Plus, Trash2 } from 'lucide-react'
import { observer } from 'mobx-react'
import { FolderModal } from './FoldersModal/FolderModal'
import { folderStore } from '@/stores/FolderStore'
import { noteStore } from '@/stores/NoteStore'
import { NotesList } from './NoteList'
import { WelcomeFolderScreen } from './WelcomeScreens/FolderScreen'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import Confirmation from '@/components/Confirmation/Confirmation'

export const NotesApp = observer(() => {
  useEffect(() => {
    folderStore.initialize()
    noteStore.initialize()
  }, [])

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
            onClick={() => folderStore.openFolderModal()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-description">Click on the plus icon to add folder</span>
      </div>
    )
  }

  const folderDropdownItems: DropdownItemProps[] = [
    {
      type: 'item',
      icon: <Pencil className="h-4 w-4" />,
      text: 'Edit',
      onClick: (folderId: string) => folderStore.openFolderModal(folderId),
    },
    {
      type: 'item',
      icon: <Trash2 className="h-4 w-4" />,
      text: 'Delete',
      className: 'text-destructive-60 focus:bg-destructive-10 focus:text-destructive-80',
      onClick: (folderId: string) => folderStore.showDeleteFolderConfirmation(folderId),
    },
  ]

  return (
    <div className="pl-[280px]" style={{ height: '100vh' }}>
      <SidebarFileSystem
        header={renderHeader()}
        dropdownItems={folderDropdownItems}
        items={folderStore.getFolders}
        onFolderToggle={(folder: FileItem) => folderStore.setActiveFolder(folder.id)}
      />
      {folderStore.getFolders.length === 0 ? (
        <WelcomeFolderScreen onClick={() => folderStore.openFolderModal()} />
      ) : (
        <NotesList />
      )}
      <FolderModal
        open={folderStore.getFolderModalStatus}
        onClose={folderStore.closeFolderModal}
        editFolderId={folderStore.getSelectedFolderId}
      />
      <Confirmation
        open={folderStore.getDeleteFolderConfirmationStatus}
        title="Delete folder"
        description="Are you sure you want to delete this folder? You will lose all notes in this folder."
        actionLabel="Delete Folder"
        actionClassName="bg-destructive-60 text-neutral-0 hover:bg-destructive-80"
        onConfirm={folderStore.onConfirmDeleteFolder}
        onCancel={folderStore.onCancelDeleteFolder}
      />
    </div>
  )
})
