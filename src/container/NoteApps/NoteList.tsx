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
      text: 'Delete',
      onClick: (noteId: string) => noteStore.deleteNote(noteId),
    },
  ]

  const renderNotes = () => (
    <>
      <div className="flex justify-end items-center">
        <Button onClick={() => setIsCreateNoteModalOpen(true)}>
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
    </div>
  )
})
