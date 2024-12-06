import { makeAutoObservable } from 'mobx'
import { Note } from '@/types/NoteTypes'
import { folderStore } from './FolderStore'
import { toast } from 'sonner'

export class NoteStore {
  notes: Note[] = []
  initialized = false
  isNoteModalOpen = false
  isDeleteConfirmationOpen = false
  selectedNoteId: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initialize = () => {
    if (this.initialized) return

    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes)
    }
    this.initialized = true
  }

  private saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  // Notes CRUD Logics
  addNote = (title: string, content: string, folderId: string) => {
    try {
      if (!title || !content || !folderId) {
        toast.error('Invalid input: Title, content, and folder ID must be provided')
        return
      }
      const newNote: Note = {
        id: crypto.randomUUID(),
        folderId,
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.notes.push(newNote)
      this.saveNotes()
      toast.success('Note has been created')
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  editNote = (noteId: string, title: string, content: string) => {
    try {
      if (!title || !content) {
        toast.error('Invalid input: Title and content must be provided')
        return
      }
      const noteIndex = this.notes.findIndex((note) => note.id === noteId)
      if (noteIndex !== -1) {
        this.notes[noteIndex] = {
          ...this.notes[noteIndex],
          title,
          content,
          updatedAt: new Date().toISOString(),
        }
        this.saveNotes()
        toast.success('Note has been updated')
      }
    } catch (error) {
      console.error('Error editing note:', error)
    }
  }

  deleteNote = (noteId: string) => {
    try {
      if (!noteId) {
        toast.error('Invalid note ID')
        return
      }

      const noteExists = this.notes.some((note) => note.id === noteId)
      if (!noteExists) {
        toast.error('Note not found')
        return
      }

      this.notes = this.notes.filter((note) => note.id !== noteId)
      this.saveNotes()
      toast.success('Note has been deleted')
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  get activeNotes() {
    if (!folderStore.activeFolder) return []
    return this.notes
      .filter((note) => note.folderId === folderStore.activeFolder)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }

  moveNote = (noteId: string, targetFolderId: string) => {
    try {
      if (!noteId || !targetFolderId) {
        toast.error('Invalid note ID')
        return
      }

      const folderExists = folderStore.folders.some((folder) => folder.id === targetFolderId)
      if (!folderExists) {
        toast.error('Folder not found', {
          description: 'Maybe the folder has been deleted? Please select another folder',
        })
        return
      }

      const noteIndex = this.notes.findIndex((note) => note.id === noteId)
      const targetFolder = folderStore.folders.find((folder) => folder.id === targetFolderId)
      const selectedNote = this.notes.find((note) => note.id === noteId)

      if (noteIndex !== -1) {
        this.notes[noteIndex] = {
          ...this.notes[noteIndex],
          folderId: targetFolderId,
          updatedAt: new Date().toISOString(),
        }
        this.saveNotes()
        toast.success(`${selectedNote?.title} has been moved to ${targetFolder?.name}`)
      }
    } catch (error) {
      console.error('Error moving note:', error)
    }
  }

  // Notes Modal and Confirmation Logics
  openNoteModal = (noteId?: string) => {
    try {
      this.isNoteModalOpen = true
      this.selectedNoteId = noteId || null
    } catch (error) {
      console.error('Error opening note modal:', error)
    }
  }

  closeNoteModal = () => {
    try {
      this.isNoteModalOpen = false
      this.selectedNoteId = null
    } catch (error) {
      console.error('Error closing note modal:', error)
    }
  }

  showDeleteConfirmation = (noteId: string) => {
    try {
      this.isDeleteConfirmationOpen = true
      this.selectedNoteId = noteId
    } catch (error) {
      console.error('Error showing delete confirmation:', error)
    }
  }

  onConfirmDelete = () => {
    try {
      if (this.selectedNoteId) {
        this.deleteNote(this.selectedNoteId)
      }
      this.isDeleteConfirmationOpen = false
      this.selectedNoteId = null
    } catch (error) {
      console.error('Error confirming delete:', error)
    }
  }

  onCancelDelete = () => {
    try {
      this.isDeleteConfirmationOpen = false
      this.selectedNoteId = null
    } catch (error) {
      console.error('Error canceling delete:', error)
    }
  }

  get getNoteModalStatus() {
    return this.isNoteModalOpen
  }

  get getSelectedNoteId() {
    return this.selectedNoteId
  }

  get getDeleteConfirmationStatus() {
    return this.isDeleteConfirmationOpen
  }
}

export const noteStore = new NoteStore()
