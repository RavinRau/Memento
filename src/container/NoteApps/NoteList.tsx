import Button from '@/components/Button/Button'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import CardWithDropdown from '@/components/Card/CardWithDropdown'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { CreateNoteModal } from './CreateNotes/CreateNotes'
import { CardContent } from '@/components/Card/CardTypes'

export const NotesList = observer(() => {
    const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false)

  const cardContent: CardContent[] = [
    {
      title: 'Getting Started',
      contentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    },
    {
      title: 'Features Overview',
      contentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    },
    {
      title: 'Best Practices',
      contentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ',
    },
    {
      title: 'Best Practices',
      contentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ',
    },
    {
      title: 'Best Practices',
      contentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ',
    },
    {
      title: 'Best Practices',
      contentText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ',
    },
  ]

  const cardDropdownItems: DropdownItemProps[] = [
    { type: 'item', text: 'Edit', onClick: () => console.log('Edit clicked') },
    { type: 'item', text: 'Delete', onClick: () => console.log('Delete clicked') }
  ]

  return (
    <div className="py-8 px-4">
      <div className="flex justify-end items-center">
        <Button onClick={() => setIsCreateNoteModalOpen(true)}>Add Note</Button>
      </div>
      <div className="flex flex-wrap py-4 justify-center">
        {cardContent.map((card, index) => (
          <div key={`card-${index}`} className="w-[32%] m-2">
            <CardWithDropdown
              key={`card-dropdown-${index}`}
              title={card.title}
              dropdownItems={cardDropdownItems}
            >
              {card.contentText}
            </CardWithDropdown>
          </div>
        ))}
      </div>
      <CreateNoteModal open={isCreateNoteModalOpen} onClose={() => setIsCreateNoteModalOpen(false)} />
    </div>
  )
})
