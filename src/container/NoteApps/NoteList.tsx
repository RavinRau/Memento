import Button from '@/components/Button/Button'
import Confirmation from '@/components/Confirmation/Confirmation'
import CardWithDropdown from '@/components/Card/CardWithDropdown'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import { observer } from 'mobx-react'
import { NotesModal } from './NotesModal/NotesModal'
import { noteStore } from '@/stores/NoteStore'
import { folderStore } from '@/stores/FolderStore'
import { Trash2, FolderInput, Pencil } from 'lucide-react'
import { WelcomeNoteScreen } from './WelcomeScreens/NoteScreen'
import { stripHtmlTags } from '@/utils/formatContent'
import { format } from 'date-fns'

export const NotesList = observer(() => {
 
  const cardDropdownItems: DropdownItemProps[] = [
    {
      type: 'item',
      icon: <Pencil className="h-4 w-4" />,
      text: 'Edit',
      onClick: (noteId: string) => noteStore.openNoteModal(noteId),
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
        noteStore.showDeleteConfirmation(noteId)
      },
    },
  ]

  const renderNotes = () => (
    <>
      <div className="flex justify-end items-center">
        <Button onClick={() => noteStore.openNoteModal()}>Add Note</Button>
      </div>
      <div className="flex flex-wrap py-6 gap-4">
        {noteStore.activeNotes.map((note) => (
          <CardWithDropdown
            key={note.id}
            title={note.title}
            dropdownItems={cardDropdownItems}
            id={note.id}
            description={`updated at ${format(note.updatedAt, 'dd/MM/yyyy hh:mm aaa')}`}
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
        <WelcomeNoteScreen onClick={() => noteStore.openNoteModal()} />
      ) : (
        renderNotes()
      )}
      <NotesModal
        open={noteStore.getNoteModalStatus}
        onClose={noteStore.closeNoteModal}
        editNoteId={noteStore.getSelectedNoteId}
      />
      <Confirmation
        open={noteStore.getDeleteConfirmationStatus}
        title="Delete Notes"
        description="Are you sure you want to delete this note?"
        actionLabel="Delete Note"
        actionClassName="bg-destructive-60 text-neutral-0 hover:bg-destructive-80"
        onConfirm={noteStore.onConfirmDelete}
        onCancel={noteStore.onCancelDelete}
      />
    </div>
  )
})
