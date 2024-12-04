import { FolderStore } from '@/stores/FolderStore'
import { toast } from 'sonner'

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  noteStore: {
    moveNote: jest.fn(),
  },
}))

const initializeFolderStore = () => {
  localStorage.clear()
  jest.clearAllMocks()
  return new FolderStore()
}

describe('FolderStore - initial state', () => {
  let folderStore: FolderStore

  beforeEach(() => {
    folderStore = initializeFolderStore()
  })

  it('should initialize with empty folders', () => {
    expect(folderStore.folders).toEqual([])
  })
})

describe('FolderStore - CRUD Operations', () => {
  let folderStore: FolderStore
  beforeEach(() => {
    folderStore = initializeFolderStore()
  })
  describe('FolderStore - Adding a new folder', () => {
    it('should add a new folder and save to localStorage', () => {
      const folderName = 'Test Folder'

      folderStore.addFolder(folderName)

      expect(folderStore.folders).toHaveLength(1)
      expect(folderStore.folders[0].name).toBe(folderName)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'folders',
        JSON.stringify(folderStore.folders)
      )
      expect(localStorage.setItem).toHaveBeenCalledWith('activeFolder', folderStore.folders[0].id)
      expect(toast.success).toHaveBeenCalledWith('Folder has been created', {
        description: `You can now add notes to ${folderName}`,
      })
    })

    it('should not add a folder with an empty name', () => {
      const folderName = ''

      folderStore.addFolder(folderName)

      expect(folderStore.folders).toHaveLength(0) // No folder should be added
      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(toast.error).toHaveBeenCalledWith('Folder name cannot be empty')
    })

    it('should not add a folder with a duplicate name', () => {
      const folderName = 'Duplicate Folder'
      folderStore.addFolder(folderName)

      folderStore.addFolder(folderName) // Try to add a folder with the same name

      expect(folderStore.folders).toHaveLength(1) // Only one folder should exist
      expect(toast.error).toHaveBeenCalledWith('Folder name must be unique', {
        description: 'There is already a folder with this name, please type another name',
      })
    })
  })

  describe('FolderStore - Setting an active folder', () => {
    it('should set the active folder correctly', () => {
      const folder1 = { id: '1', name: 'Folder 1', isActive: false }
      const folder2 = { id: '2', name: 'Folder 2', isActive: false }

      folderStore.folders = [folder1, folder2]
      folderStore.setActiveFolder('1')

      expect(folderStore.activeFolder).toBe('1')
      expect(folderStore.folders[0].isActive).toBe(true)
      expect(folderStore.folders[1].isActive).toBe(false)
    })

    it('should not set an active folder if the folder does not exist', () => {
      folderStore.setActiveFolder('non-existent-id')

      expect(folderStore.activeFolder).toBeNull() // No active folder should be set
      expect(toast.error).toHaveBeenCalledWith('Folder not found')
    })

    it('should not set an active folder with invalid input', () => {
      // @ts-expect-error Testing invalid input
      folderStore.setActiveFolder(undefined)

      expect(folderStore.activeFolder).toBeNull()
      expect(toast.error).toHaveBeenCalledWith('Invalid folder ID')
    })
  })

  describe('FolderStore - Editing a folder', () => {
    const oldFolderName = 'Old Name'
    const newFolderName = 'New Name'

    it('should update the folder name if the folder exists', () => {
      const folder = { id: '1', name: oldFolderName, isActive: false }
      folderStore.folders = [folder]

      folderStore.editFolder('1', newFolderName)

      expect(folderStore.folders[0].name).toBe(newFolderName)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'folders',
        JSON.stringify(folderStore.folders)
      )
      expect(toast.success).toHaveBeenCalledWith('Folder has been updated', {
        description: `You can now add notes to ${newFolderName}`,
      })
    })

    it('should do nothing if the folder does not exist', () => {
      folderStore.folders = [{ id: '1', name: oldFolderName, isActive: false }]

      folderStore.editFolder('2', newFolderName) // Folder ID '2' does not exist

      expect(folderStore.folders[0].name).toBe(oldFolderName) // No change
      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(toast.success).not.toHaveBeenCalled()
    })

    it('should not edit a folder if the folder does not exist', () => {
      folderStore.editFolder('non-existent-id', 'New Name')

      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(toast.error).toHaveBeenCalledWith('Folder not found')
    })

    it('should not edit a folder with an empty new name', () => {
      const folder = { id: '1', name: 'Existing Folder', isActive: false }
      folderStore.folders = [folder]

      folderStore.editFolder('1', '')

      expect(folderStore.folders[0].name).toBe('Existing Folder') // Name should remain unchanged
      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(toast.error).toHaveBeenCalledWith('Folder name cannot be empty')
    })
  })

  describe('FolderStore - Deleting a folder', () => {
    it('should delete a folder correctly', () => {
      const folder1 = { id: '1', name: 'Folder 1', isActive: false }
      const folder2 = { id: '2', name: 'Folder 2', isActive: false }

      folderStore.folders = [folder1, folder2]
      folderStore.deleteFolder('1')

      expect(folderStore.folders).toHaveLength(1)
      expect(folderStore.folders[0].id).toBe('2')
      expect(folderStore.activeFolder).toBe('2')
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'folders',
        JSON.stringify(folderStore.folders)
      )
    })

    it('should not delete a folder if the folder does not exist', () => {
      folderStore.deleteFolder('non-existent-id')

      expect(folderStore.folders).toHaveLength(0) // No folder should be deleted
      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(toast.error).toHaveBeenCalledWith('Folder not found')
    })
    it('should not delete a folder with invalid input', () => {
      // @ts-expect-error Testing invalid input
      folderStore.deleteFolder(undefined)

      expect(folderStore.folders).toHaveLength(0) // No folder should be deleted
      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(toast.error).toHaveBeenCalledWith('Invalid folder ID')
    })
  })

  describe('FolderStore - getFolders', () => {
    it('should return the folders', () => {
      const folders = folderStore.getFolders
      expect(folders).toEqual(folderStore.folders)
    })
  })
})

describe('FolderStore - getFolderSubmenuItems', () => {
  let folderStore: FolderStore

  beforeEach(() => {
    folderStore = initializeFolderStore()
  })

  it('should return a disabled item when there are no folders', () => {
    const noteId = 'note-1'
    const items = folderStore.getFolderSubmenuItems(noteId)

    expect(items).toEqual([
      {
        type: 'item',
        text: 'No folders found',
        disabled: true,
      },
    ])
  })

  it('should return a list of folders excluding the active folder', () => {
    const noteId = 'note-1'
    const folder1 = { id: '1', name: 'Folder 1', isActive: false }
    const folder2 = { id: '2', name: 'Folder 2', isActive: false }
    folderStore.folders = [folder1, folder2]
    folderStore.activeFolder = '1'

    const items = folderStore.getFolderSubmenuItems(noteId)

    expect(items).toHaveLength(1)
    expect(items[0].text).toBe('Folder 2')
    expect(items[0].type).toBe('item')
    expect(items[0].disabled).toBeUndefined()
  })
})

describe('FolderStore - Modal and Confirmation Logic', () => {
  let folderStore: FolderStore

  beforeEach(() => {
    folderStore = initializeFolderStore()
  })

  describe('openFolderModal', () => {
    it('should open the folder modal and set the selected folder ID', () => {
      folderStore.openFolderModal('folder-1')

      expect(folderStore.isFolderModalOpen).toBe(true)
      expect(folderStore.selectedFolderId).toBe('folder-1')
    })

    it('should open the folder modal with no selected folder ID if none is provided', () => {
      folderStore.openFolderModal()

      expect(folderStore.isFolderModalOpen).toBe(true)
      expect(folderStore.selectedFolderId).toBeNull()
    })
  })

  describe('closeFolderModal', () => {
    it('should close the folder modal and clear the selected folder ID', () => {
      folderStore.openFolderModal('folder-1')
      folderStore.closeFolderModal()

      expect(folderStore.isFolderModalOpen).toBe(false)
      expect(folderStore.selectedFolderId).toBeNull()
    })
  })

  describe('showDeleteFolderConfirmation', () => {
    it('should open the delete folder confirmation and set the selected folder ID', () => {
      folderStore.showDeleteFolderConfirmation('folder-1')

      expect(folderStore.isDeleteFolderConfirmationOpen).toBe(true)
      expect(folderStore.selectedFolderId).toBe('folder-1')
    })
  })

  describe('onConfirmDeleteFolder', () => {
    let folderStore: FolderStore

    beforeEach(() => {
      folderStore = initializeFolderStore()
      folderStore.folders = [
        { id: 'folder-1', name: 'Folder 1', isActive: false },
        { id: 'folder-2', name: 'Folder 2', isActive: false },
      ]
    })

    it('should delete the selected folder and close the confirmation', () => {
      folderStore.selectedFolderId = 'folder-1'
      folderStore.isDeleteFolderConfirmationOpen = true

      folderStore.onConfirmDeleteFolder()

      expect(folderStore.folders).toHaveLength(1)
      expect(folderStore.folders[0].id).toBe('folder-2')
      expect(folderStore.isDeleteFolderConfirmationOpen).toBe(false)
      expect(folderStore.selectedFolderId).toBeNull()
    })

    it('should not attempt to delete if no folder is selected', () => {
      folderStore.selectedFolderId = null
      folderStore.isDeleteFolderConfirmationOpen = true

      const initialFolders = [...folderStore.folders]
      folderStore.onConfirmDeleteFolder()

      expect(folderStore.folders).toEqual(initialFolders) // No change in folders
      expect(folderStore.isDeleteFolderConfirmationOpen).toBe(false)
      expect(folderStore.selectedFolderId).toBeNull()
    })
  })

  describe('onCancelDeleteFolder', () => {
    it('should close the delete folder confirmation and clear the selected folder ID', () => {
      folderStore.showDeleteFolderConfirmation('folder-1')
      folderStore.onCancelDeleteFolder()

      expect(folderStore.isDeleteFolderConfirmationOpen).toBe(false)
      expect(folderStore.selectedFolderId).toBeNull()
    })
  })

  describe('Getters', () => {
    it('should return the correct folder modal status', () => {
      folderStore.openFolderModal()
      expect(folderStore.getFolderModalStatus).toBe(true)

      folderStore.closeFolderModal()
      expect(folderStore.getFolderModalStatus).toBe(false)
    })

    it('should return the correct selected folder ID', () => {
      folderStore.openFolderModal('folder-1')
      expect(folderStore.getSelectedFolderId).toBe('folder-1')

      folderStore.closeFolderModal()
      expect(folderStore.getSelectedFolderId).toBeNull()
    })

    it('should return the correct delete folder confirmation status', () => {
      folderStore.showDeleteFolderConfirmation('folder-1')
      expect(folderStore.getDeleteFolderConfirmationStatus).toBe(true)

      folderStore.onCancelDeleteFolder()
      expect(folderStore.getDeleteFolderConfirmationStatus).toBe(false)
    })
  })
})
