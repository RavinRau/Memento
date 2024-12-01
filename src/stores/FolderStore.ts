import { makeAutoObservable } from 'mobx'
import { FileItem } from '@/components/Sidebar/SidebarTypes'

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
    const newFolder: FileItem = {
      id: crypto.randomUUID(),
      name,
      isActive: false,
    }
    this.folders.push(newFolder)
    this.saveFolders()
  }

  setActiveFolder = (folderId: string | null) => {
    this.activeFolder = folderId
    
    // Update isActive state for all folders
    this.folders = this.folders.map(folder => ({
      ...folder,
      isActive: folder.id === folderId
    }))
    
    this.saveFolders()
  }

  get getFolders() {
    return this.folders
  }
}

export const folderStore = new FolderStore()
