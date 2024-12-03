import { makeAutoObservable } from 'mobx'
import { FileItem } from '@/components/Sidebar/SidebarTypes'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import { noteStore } from './NoteStore'
import { toast } from 'sonner'

class FolderStore {
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
  }

  setActiveFolder = (folderId: string | null) => {
    this.activeFolder = folderId
    this.folders = this.folders.map((folder) => ({
      ...folder,
      isActive: folder.id === folderId,
    }))

    this.saveFolders()
  }

  editFolder = (folderId: string, name: string) => {
    const folderIndex = this.folders.findIndex((folder) => folder.id === folderId)
    if (folderIndex !== -1) {
      this.folders[folderIndex].name = name
      this.saveFolders()
      toast.success('Folder has been updated', {
        description: `You can now add notes to ${name}`,
      })
    }
  }

  deleteFolder = (folderId: string) => {
    this.folders = this.folders.filter((folder) => folder.id !== folderId)
    this.saveFolders()
  }

  get getFolders() {
    return this.folders
  }

  // Folder Options for Card Dropdown
  getFolderSubmenuItems = (noteId: string): DropdownItemProps[] => {
    if (this.folders.length === 0) {
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
    this.isFolderModalOpen = true
    this.selectedFolderId = folderId || null
  }

  closeFolderModal = () => {
    this.isFolderModalOpen = false
    this.selectedFolderId = null
  }

  showDeleteFolderConfirmation = (folderId: string) => {
    this.isDeleteFolderConfirmationOpen = true
    this.selectedFolderId = folderId
  }

  onConfirmDeleteFolder = () => {
    if (this.selectedFolderId) {
      this.deleteFolder(this.selectedFolderId)
    }
    this.isDeleteFolderConfirmationOpen = false
    this.selectedFolderId = null
  }

  onCancelDeleteFolder = () => {
    this.isDeleteFolderConfirmationOpen = false
    this.selectedFolderId = null
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
