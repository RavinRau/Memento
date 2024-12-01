import Button from '@/components/Button/Button'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import CardWithDropdown from '@/components/Card/CardWithDropdown'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { CreateNoteModal } from './CreateNotes/CreateNotes'
import { noteStore } from '@/stores/NoteStore'

export const NotesList = observer(() => {
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false)

  const cardDropdownItems: DropdownItemProps[] = [
    {
      type: 'item',
      text: 'Edit',
      onClick: (noteId: string) => console.log(noteId),
    },
    {
      type: 'item',
      text: 'Delete',
      onClick: (noteId: string) => noteStore.deleteNote(noteId),
    },
  ]

  return (
    <div className="py-8 px-4">
      <div className="flex justify-end items-center">
        <Button onClick={() => setIsCreateNoteModalOpen(true)} disabled={!noteStore.activeFolder}>
          Add Note
        </Button>
      </div>
      <div className="flex flex-wrap py-4 justify-center">
        {noteStore.activeNotes.map((note) => (
          <div key={note.id} className="w-[32%] m-2">
            <CardWithDropdown title={note.title} dropdownItems={cardDropdownItems} noteId={note.id}>
              {note.content}
            </CardWithDropdown>
          </div>
        ))}
      </div>
      <CreateNoteModal
        open={isCreateNoteModalOpen}
        onClose={() => setIsCreateNoteModalOpen(false)}
      />
    </div>
  )
})
