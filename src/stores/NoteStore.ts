import { makeAutoObservable } from 'mobx'
import { Note } from '@/types/NoteTypes'
import { folderStore } from './FolderStore'
import { toast } from 'sonner'

class NoteStore {
  notes: Note[] = []
  initialized = false

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


  addNote = (title: string, content: string, folderId: string) => {
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
  }

  editNote = (noteId: string, title: string, content: string) => {
    const noteIndex = this.notes.findIndex((note) => note.id === noteId)
    if (noteIndex !== -1) {
      this.notes[noteIndex] = {
        ...this.notes[noteIndex],
        title,
        content,
        updatedAt: new Date().toISOString(),
      }
      this.saveNotes()
    }
  }

  deleteNote = (noteId: string) => {
    this.notes = this.notes.filter((note) => note.id !== noteId)
    this.saveNotes()
  }

  get activeNotes() {
    if (!folderStore.activeFolder) return []
    return this.notes
      .filter((note) => note.folderId === folderStore.activeFolder)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }

  moveNote = (noteId: string, targetFolderId: string) => {
    const noteIndex = this.notes.findIndex(note => note.id === noteId)
    const targetFolder = folderStore.folders.find(folder => folder.id === targetFolderId)
    const selectedNote = this.notes.find(note => note.id === noteId)

    if (noteIndex !== -1) {
      this.notes[noteIndex] = {
        ...this.notes[noteIndex],
        folderId: targetFolderId,
        updatedAt: new Date().toISOString(),
      }
      this.saveNotes()
      toast.success(`${selectedNote?.title} has been moved to ${targetFolder?.name}`)
    }
  }
}

export const noteStore = new NoteStore() 