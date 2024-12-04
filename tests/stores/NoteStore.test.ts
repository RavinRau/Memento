import { NoteStore } from '@/stores/NoteStore'

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

const initializeNoteStore = () => {
  localStorage.clear()
  jest.clearAllMocks()
  return new NoteStore()
}

describe('NoteStore - initial state', () => {
  let noteStore: NoteStore

  beforeEach(() => {
    // Initialize a fresh store before each test
    noteStore = initializeNoteStore()
  })

  it('should initialize with empty notes', () => {
    expect(noteStore.notes).toEqual([])
  })
})

describe('NoteStore - CRUD Operations', () => {
  let noteStore: NoteStore

  beforeEach(() => {
    // Initialize a fresh store before each test
    noteStore = initializeNoteStore()
  })

  describe('Adding a new note', () => {
    it('should add a new note with the correct properties', () => {
      const title = 'Test Note'
      const content = 'Test Content'
      const folderId = 'folder-1'

      noteStore.addNote(title, content, folderId)

      expect(noteStore.notes).toHaveLength(1)
      const addedNote = noteStore.notes[0]
      expect(addedNote.title).toBe(title)
      expect(addedNote.content).toBe(content)
      expect(addedNote.folderId).toBe(folderId)
      expect(addedNote.id).toBeDefined()
      expect(addedNote.createdAt).toBeDefined()
      expect(addedNote.updatedAt).toBeDefined()
    })

    it('should persist notes in localStorage after adding a new note', () => {
      const title = 'Test Note'
      const content = 'Test Content'
      const folderId = 'folder-1'

      noteStore.addNote(title, content, folderId)

      const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
      expect(savedNotes).toHaveLength(1)
      expect(savedNotes[0].title).toBe(title)
      expect(savedNotes[0].content).toBe(content)
      expect(savedNotes[0].folderId).toBe(folderId)
    })

    it('should not add a note with an empty title', () => {
      const content = 'Test Content'
      const folderId = 'folder-1'

      noteStore.addNote('', content, folderId)

      expect(noteStore.notes).toHaveLength(0)
    })

    it('should not add a note with empty content', () => {
      const title = 'Test Note'
      const folderId = 'folder-1'

      noteStore.addNote(title, '', folderId)

      expect(noteStore.notes).toHaveLength(0)
    })

    it('should not add a note with an invalid folder ID', () => {
      const title = 'Test Note'
      const content = 'Test Content'

      noteStore.addNote(title, content, '')

      expect(noteStore.notes).toHaveLength(0)
    })

    it('should not add a note with null or undefined values', () => {
      // @ts-expect-error Testing invalid input
      noteStore.addNote(null, 'Test Content', 'folder-1')
      expect(noteStore.notes).toHaveLength(0)

      // @ts-expect-error Testing invalid input
      noteStore.addNote('Test Note', null, 'folder-1')
      expect(noteStore.notes).toHaveLength(0)

      // @ts-expect-error Testing invalid input
      noteStore.addNote('Test Note', 'Test Content', null)
      expect(noteStore.notes).toHaveLength(0)
    })
  })

  describe('NoteStore - editNote', () => {
    let noteStore: NoteStore

    beforeEach(() => {
      noteStore = new NoteStore()
      noteStore.notes = [
        {
          id: '1',
          title: 'Old Title',
          content: 'Old Content',
          folderId: 'folder-1',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      ]
    })

    it('should edit an existing note with new title and content', () => {
      const newTitle = 'New Title'
      const newContent = 'New Content'

      noteStore.editNote('1', newTitle, newContent)

      const editedNote = noteStore.notes[0]
      expect(editedNote.title).toBe(newTitle)
      expect(editedNote.content).toBe(newContent)
      expect(editedNote.updatedAt).not.toBe('2023-01-01T00:00:00Z')
    })

    it('should persist changes to localStorage after editing a note', () => {
      noteStore.editNote('1', 'New Title', 'New Content')

      const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
      expect(savedNotes[0].title).toBe('New Title')
      expect(savedNotes[0].content).toBe('New Content')
    })

    it('should not edit a non-existent note', () => {
      const initialNotes = [...noteStore.notes]
      noteStore.editNote('non-existent-id', 'New Title', 'New Content')

      expect(noteStore.notes).toEqual(initialNotes)
    })

    it('should not edit a note with an empty title', () => {
      const initialNote = { ...noteStore.notes[0] }
      noteStore.editNote('1', '', 'New Content')

      expect(noteStore.notes[0]).toEqual(initialNote)
    })

    it('should not edit a note with empty content', () => {
      const initialNote = { ...noteStore.notes[0] }
      noteStore.editNote('1', 'New Title', '')

      expect(noteStore.notes[0]).toEqual(initialNote)
    })

    it('should not edit a note with an invalid note ID', () => {
      const initialNotes = [...noteStore.notes]
      noteStore.editNote('invalid-id', 'New Title', 'New Content')

      expect(noteStore.notes).toEqual(initialNotes)
    })
  })

  describe('NoteStore - deleteNote', () => {
    beforeEach(() => {
      noteStore.notes = [
        {
          id: '1',
          title: 'Note 1',
          content: 'Content 1',
          folderId: 'folder-1',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
        {
          id: '2',
          title: 'Note 2',
          content: 'Content 2',
          folderId: 'folder-1',
          createdAt: '2023-01-02T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
      ]
    })

    it('should delete an existing note', () => {
      noteStore.deleteNote('1')

      expect(noteStore.notes).toHaveLength(1)
      expect(noteStore.notes[0].id).toBe('2')
    })

    it('should persist changes to localStorage after deleting a note', () => {
      noteStore.deleteNote('1')

      const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
      expect(savedNotes).toHaveLength(1)
      expect(savedNotes[0].id).toBe('2')
    })

    it('should not change notes if the note does not exist', () => {
      const initialNotes = [...noteStore.notes]
      noteStore.deleteNote('non-existent-id')

      expect(noteStore.notes).toEqual(initialNotes)
    })

    it('should not change notes with an invalid note ID', () => {
      const initialNotes = [...noteStore.notes]

      // Test with null
      // @ts-expect-error Testing invalid input
      noteStore.deleteNote(null)
      expect(noteStore.notes).toEqual(initialNotes)

      // Test with undefined
      // @ts-expect-error Testing invalid input
      noteStore.deleteNote(undefined)
      expect(noteStore.notes).toEqual(initialNotes)

      // Test with empty string
      noteStore.deleteNote('')
      expect(noteStore.notes).toEqual(initialNotes)
    })
  })
})