import Button from '@/components/Button/Button'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import CardWithDropdown from '@/components/Card/CardWithDropdown'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { NotesModal } from './NotesModal/NotesModal'
import { noteStore } from '@/stores/NoteStore'
import { Pencil, Trash2 } from 'lucide-react'
import { WelcomeNoteScreen } from './WelcomeScreens/NoteScreen'

export const NotesList = observer(() => {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  const handleEdit = (noteId: string) => {
    setEditingNoteId(noteId)
    setIsCreateNoteModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCreateNoteModalOpen(false)
    setEditingNoteId(null)
  }

  const cardDropdownItems: DropdownItemProps[] = [
    {
      type: 'item',
      icon: <Pencil />,
      text: 'Edit',
      onClick: (noteId: string) => handleEdit(noteId),
    },
    {
      type: 'item',
      icon: <Trash2 />,
      text: 'Delete',
      onClick: (noteId: string) => noteStore.deleteNote(noteId),
    },
  ]

  const renderNotes = () => (
    <>
      <div className="flex justify-end items-center">
        <Button onClick={() => setIsCreateNoteModalOpen(true)} disabled={!noteStore.activeFolder}>
          Add Note
        </Button>
      </div>
      <div className="flex flex-wrap py-4 gap-4">
        {noteStore.activeNotes.map((note) => (
          <CardWithDropdown
            key={note.id}
            title={note.title}
            dropdownItems={cardDropdownItems}
            noteId={note.id}
          >
            {note.content}
          </CardWithDropdown>
        ))}
      </div>
    </>
  )

  return (
    <div className="py-8 px-4 h-full">
      {noteStore.activeNotes.length === 0 ? (
        <WelcomeNoteScreen onClick={() => setIsCreateNoteModalOpen(true)} />
      ) : (
        renderNotes()
      )}
      <NotesModal
        open={isCreateNoteModalOpen}
        onClose={handleCloseModal}
        editNoteId={editingNoteId}
      />
    </div>
  )
})
