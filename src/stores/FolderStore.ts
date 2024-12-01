import { makeAutoObservable } from 'mobx'
import { FileItem } from '@/components/Sidebar/SidebarTypes'

class FolderStore {
  folders: FileItem[] = []
  initialized = false

  constructor() {
    makeAutoObservable(this)
  }

  initialize = () => {
    if (this.initialized) return

    const savedFolders = localStorage.getItem('folders')
    if (savedFolders) {
      this.folders = JSON.parse(savedFolders)
    }
    this.initialized = true
  }

  saveFolders = () => {
    localStorage.setItem('folders', JSON.stringify(this.folders))
  }

  addFolder = (name: string) => {
    const newFolder: FileItem = {
      id: crypto.randomUUID(),
      name,
      isOpen: false,
      isActive: false,
    }
    this.folders.push(newFolder)
    this.saveFolders()
  }

  get getFolders() {
    return this.folders
  }
}

export const folderStore = new FolderStore()
