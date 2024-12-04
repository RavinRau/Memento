import { makeAutoObservable } from 'mobx'
import { FileItem } from '@/components/Sidebar/SidebarTypes'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import { noteStore } from './NoteStore'
import { toast } from 'sonner'
import { isNil } from '@/lib/utils'

export class FolderStore {
  folders: FileItem[] = []
  initialized = false
  activeFolder: string | null = null
  isFolderModalOpen = false
  selectedFolderId: string | null = null
  isDeleteFolderConfirmationOpen = false

  constructor() {
    makeAutoObservable(this)
  }

  initialize = () => {
    if (this.initialized) return

    const savedFolders = localStorage.getItem('folders')
    const savedActiveFolder = localStorage.getItem('activeFolder')

    if (savedFolders) {
      this.folders = JSON.parse(savedFolders)
    }
    if (savedActiveFolder) {
      this.setActiveFolder(savedActiveFolder)
    }

    this.initialized = true
  }

  private saveFolders = () => {
    localStorage.setItem('folders', JSON.stringify(this.folders))
    localStorage.setItem('activeFolder', this.activeFolder || '')
  }

  // Folder CRUD Logics
  addFolder = (name: string) => {
    try {
      if (!name.trim()) {
        toast.error('Folder name cannot be empty')
        return
      }

      if (this.folders.some((folder) => folder.name.toLowerCase() === name.toLowerCase())) {
        toast.error('Folder name must be unique', {
          description: 'There is already a folder with this name, please type another name',
        })
        return
      }

      const id = crypto.randomUUID()
      const newFolder: FileItem = {
        id: id,
        name,
        isActive: false,
      }
      this.folders.push(newFolder)
      this.setActiveFolder(id)
      this.saveFolders()
      toast.success('Folder has been created', {
        description: `You can now add notes to ${name}`,
      })
    } catch (error) {
      console.error('Error adding folder:', error)
    }
  }

  setActiveFolder = (folderId: string | null) => {
    try {
      if (isNil(folderId)) {
        this.activeFolder = null
        this.folders = this.folders.map((folder) => ({
          ...folder,
          isActive: false,
        }))
        toast.error('Invalid folder ID')
        return
      }

      const folderExists = this.folders.some((folder) => folder.id === folderId)

      if (!folderExists) {
        this.activeFolder = null
        this.folders = this.folders.map((folder) => ({
          ...folder,
          isActive: false,
        }))
        toast.error('Folder not found')
        return
      }

      this.activeFolder = folderId
      this.folders = this.folders.map((folder) => ({
        ...folder,
        isActive: folder.id === folderId,
      }))

      this.saveFolders()
    } catch (error) {
      console.error('Error setting active folder:', error)
    }
  }

  editFolder = (folderId: string, name: string) => {
    try {
      if (!name.trim()) {
        toast.error('Folder name cannot be empty')
        return
      }

      const folderIndex = this.folders.findIndex((folder) => folder.id === folderId)
      if (folderIndex === -1) {
        toast.error('Folder not found')
        return
      }

      this.folders[folderIndex].name = name
      this.saveFolders()
      toast.success('Folder has been updated', {
        description: `You can now add notes to ${name}`,
      })
    } catch (error) {
      console.error('Error editing folder:', error)
    }
  }

  deleteFolder = (folderId: string) => {
    try {
      if (isNil(folderId)) {
        toast.error('Invalid folder ID')
        return
      }

      const folderExists = this.folders.some((folder) => folder.id === folderId)
      if (!folderExists) {
        toast.error('Folder not found')
        return
      }

      this.folders = this.folders.filter((folder) => folder.id !== folderId)

      // Check if the active folder was deleted or if there is no active folder
      if (this.activeFolder === folderId || this.activeFolder === null) {
        // Set the first folder as active if it exists
        if (this.folders.length > 0) {
          this.setActiveFolder(this.folders[0].id)
        } else {
          this.activeFolder = null // No folders left
        }
      }

      this.saveFolders()
      toast.success('Folder has been deleted')
    } catch (error) {
      console.error('Error deleting folder:', error)
    }
  }

  get getFolders() {
    return this.folders
  }

  // Folder Options for Card Dropdown
  getFolderSubmenuItems = (noteId: string): DropdownItemProps[] => {
    if (this.folders.length <= 1) {
      return [
        {
          type: 'item',
          text: 'No folders found',
          disabled: true,
        },
      ]
    }
    return this.folders
      .filter((folder) => folder.id !== this.activeFolder)
      .map((folder) => ({
        type: 'item' as const,
        text: folder.name,
        onClick: () => noteStore.moveNote(noteId, folder.id),
      }))
  }

  // Folder Modal and Confirmation Logics
  openFolderModal = (folderId?: string) => {
    try {
      this.isFolderModalOpen = true
      this.selectedFolderId = folderId || null
    } catch (error) {
      console.error('Error opening folder modal:', error)
    }
  }

  closeFolderModal = () => {
    try {
      this.isFolderModalOpen = false
      this.selectedFolderId = null
    } catch (error) {
      console.error('Error closing folder modal:', error)
    }
  }

  showDeleteFolderConfirmation = (folderId: string) => {
    try {
      this.isDeleteFolderConfirmationOpen = true
      this.selectedFolderId = folderId
    } catch (error) {
      console.error('Error showing delete folder confirmation:', error)
    }
  }

  onConfirmDeleteFolder = () => {
    try {
      if (this.selectedFolderId) {
        this.deleteFolder(this.selectedFolderId)
      }
      this.isDeleteFolderConfirmationOpen = false
      this.selectedFolderId = null
    } catch (error) {
      console.error('Error confirming delete folder:', error)
    }
  }

  onCancelDeleteFolder = () => {
    try {
      this.isDeleteFolderConfirmationOpen = false
      this.selectedFolderId = null
    } catch (error) {
      console.error('Error canceling delete folder:', error)
    }
  }

  get getFolderModalStatus() {
    return this.isFolderModalOpen
  }

  get getSelectedFolderId() {
    return this.selectedFolderId
  }
  get getDeleteFolderConfirmationStatus() {
    return this.isDeleteFolderConfirmationOpen
  }
}

export const folderStore = new FolderStore()
