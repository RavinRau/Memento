import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import Modal from '@/components/Modal/Model'
import Input from '@/components/Input/Input'
import TiptapEditor from '@/components/Editor/TiptapEditor'
import { noteStore } from '@/stores/NoteStore'
import { NoteModalProps } from './NotesModalTypes'
import { folderStore } from '@/stores/FolderStore'

export const NotesModal = observer(({ open, onClose, editNoteId }: NoteModalProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const clearNote = () => {
    setTitle('')
    setContent('')
  }

  const initializeFields = () => {
    const note = noteStore.notes.find(n => n.id === editNoteId)
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }

  const handleSave = () => {
    if (title.trim() && folderStore.activeFolder) {
      if (editNoteId) {
        noteStore.editNote(editNoteId, title.trim(), content)
      } else {
        noteStore.addNote(title.trim(), content, folderStore.activeFolder)
      }
      handleClose()
    }
  }

  const handleClose = () => {
    clearNote()
    onClose()
  }

  useEffect(() => {
    clearNote()
    if (editNoteId) {
      initializeFields()
    }
  }, [editNoteId])

  return (
    <Modal
      open={open}
      onOpen={onClose}
      title={editNoteId ? "Edit Note" : "Create A New Note"}
      description={editNoteId ? "Revise and refine your captured thoughts" : "Capture your thoughts, ideas, and inspirations"}
      primaryButton={{
        label: editNoteId ? 'Save Changes' : 'Save',
        onClick: handleSave,
        disabled: !title.trim() || (!editNoteId && !folderStore.activeFolder),
      }}
      secondaryButton={{
        label: 'Cancel',
        onClick: handleClose,
      }}
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="Give your note a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div>
          <label className="text-label">Content</label>
          <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your note..."
            />
        </div>
      </div>
    </Modal>
  )
})
