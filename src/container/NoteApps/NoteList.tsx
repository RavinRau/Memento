import Button from '@/components/Button/Button'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import CardWithDropdown from '@/components/Card/CardWithDropdown'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { NotesModal } from './NotesModal/NotesModal'
import { noteStore } from '@/stores/NoteStore'
import { folderStore } from '@/stores/FolderStore'
import { Pencil, Trash2, FolderInput } from 'lucide-react'
import { WelcomeNoteScreen } from './WelcomeScreens/NoteScreen'
import { stripHtmlTags } from '@/utils/formatContent'
import Confirmation from '@/components/Confirmation/Confirmation'

export const NotesList = observer(() => {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)

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
      icon: <Pencil className="h-4 w-4" />,
      text: 'Edit',
      onClick: (noteId: string) => handleEdit(noteId),
    },
    {
      type: 'submenu',
      icon: <FolderInput className="h-4 w-4" />,
      text: 'Move to folder',
      items: (noteId: string) => folderStore.getFolderSubmenuItems(noteId),
    },
    {
      type: 'item',
      icon: <Trash2 className="h-4 w-4" />,
      className: 'text-destructive-60 focus:bg-destructive-10 focus:text-destructive-80',
      text: 'Delete',
      onClick: (noteId: string) => {
        setNoteToDelete(noteId)
        setShowConfirmation(true)
      },
    },
  ]

  const renderNotes = () => (
    <>
      <div className="flex justify-end items-center">
        <Button onClick={() => setIsCreateNoteModalOpen(true)}>Add Note</Button>
      </div>
      <div className="flex flex-wrap py-6 gap-4">
        {noteStore.activeNotes.map((note) => (
          <CardWithDropdown
            key={note.id}
            title={note.title}
            dropdownItems={cardDropdownItems}
            id={note.id}
          >
            {stripHtmlTags(note.content)}
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
      <Confirmation
        open={showConfirmation}
        title="Delete Notes"
        description="Are you sure you want to delete this note?"
        actionLabel="Delete Note"
        actionClassName="bg-destructive-60 text-neutral-0 hover:bg-destructive-80"
        onConfirm={() => {
          if (noteToDelete) {
            noteStore.deleteNote(noteToDelete)
          }
          setShowConfirmation(false)
          setNoteToDelete(null)
        }}
        onCancel={() => {
          setShowConfirmation(false)
          setNoteToDelete(null)
        }}
      />
    </div>
  )
})
