import { makeAutoObservable } from 'mobx'
import { FileItem } from '@/components/Sidebar/SidebarTypes'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import { noteStore } from './NoteStore'
import { toast } from 'sonner'

class FolderStore {
  folders: FileItem[] = []
  initialized = false
  activeFolder: string | null = null

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

    // Update isActive state for all folders
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
    }
  }

  deleteFolder = (folderId: string) => {
    this.folders = this.folders.filter((folder) => folder.id !== folderId)
    console.log(this.folders)
    this.saveFolders()
  }

  get getFolders() {
    return this.folders
  }

  getFolderSubmenuItems = (noteId: string): DropdownItemProps[] => {
    return folderStore.folders
      .filter((folder) => folder.id !== folderStore.activeFolder)
      .map((folder) => ({
        type: 'item' as const,
        text: folder.name,
        onClick: () => noteStore.moveNote(noteId, folder.id),
      }))
  }
}

export const folderStore = new FolderStore()
