import { Button } from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import Dropdown from '@/components/Dropdown/Dropdown'
import { DropdownItemProps } from '@/components/Dropdown/DropdownTypes'
import {
  CreditCard,
  Keyboard,
  Mail,
  MessageSquare,
  MoreHorizontalIcon,
  Settings,
  User,
  UserPlus,
  FileText,
} from 'lucide-react'
import { toast } from 'sonner'
import CardWithDropdown from '@/components/Card/CardWithDropdown'
import TiptapEditor from '@/components/Editor/TiptapEditor'
import { useState } from 'react'
import Modal from '@/components/Modal/Model'
import SidebarFileSystem from '@/components/Sidebar/SidebarFileSystem'
import { FileItem } from '@/components/Sidebar/SidebarTypes'

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'link' | 'ghost'

type ButtonContent = {
  variant: ButtonVariant
  title: string
  onClick: () => void
}

type CardContent = {
  title: string
  contentText: string
}

const ComponentDisplay = () => {
  const [content, setContent] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const handleChange = (newContent: string) => {
    setContent(newContent)
  }

  const handleSave = () => {
    console.log('Saving content:', content)
    setModalOpen(false)
  }

  const buttonContent: ButtonContent[] = [
    {
      variant: 'default',
      title: 'Default Button',
      onClick: () =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        }),
    },
    {
      variant: 'destructive',
      title: 'Destructive Button',
      onClick: () =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        }),
    },
    {
      variant: 'outline',
      title: 'Outline Button',
      onClick: () =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        }),
    },
    {
      variant: 'secondary',
      title: 'Secondary Button',
      onClick: () =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        }),
    },
  ]

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
  ]

  const dropdownContent: DropdownItemProps[] = [
    { type: 'label', text: 'My Account' },
    {
      type: 'group',
      items: [
        {
          type: 'item',
          icon: <User />,
          text: 'Profile',
          onClick: () => {
            console.log('Do something!')
          },
        },
        {
          type: 'item',
          icon: <CreditCard />,
          text: 'Billing',
          description: 'Manage your billing information',
        },
        {
          type: 'item',
          icon: <Settings />,
          text: 'Settings',
          description: 'Adjust your account settings',
        },
        {
          type: 'item',
          icon: <Keyboard />,
          text: 'Keyboard',
          description: 'Customize keyboard shortcuts',
        },
        {
          type: 'submenu',
          icon: <UserPlus />,
          text: 'Invite Users',
          items: [
            {
              type: 'item',
              icon: <Mail />,
              text: 'Email',
              description: 'Send invitation via email',
            },
            {
              type: 'submenu',
              icon: <MessageSquare />,
              text: 'Message',
              items: [
                {
                  type: 'item',
                  icon: <Mail />,
                  text: 'Email',
                  description: 'Send invitation via message',
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  const cardDropdownItems: DropdownItemProps[] = [
    { type: 'item', text: 'Edit', onClick: () => console.log('Edit clicked') },
    { type: 'item', text: 'Delete', onClick: () => console.log('Delete clicked') },
    { type: 'item', text: 'Share', onClick: () => console.log('Share clicked') },
  ]

  const fileSystemItems = [
    { id: '1', name: 'Documents' },
    { id: '2', name: 'Images' },
    { id: '3', name: 'Projects' },
    { id: '4', name: 'Notes' },
  ]

  const handleFolderToggle = (folder: FileItem) => {
    console.log('Folder toggled:', folder.name)
  }

  return (
    <div className="pl-[280px]">
      <SidebarFileSystem
        header={
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">Files</h1>
          </div>
        }
        items={fileSystemItems}
        onFolderToggle={handleFolderToggle}
      />
      {/* Main Content */}
      <div className="p-8 space-y-12">
        {/* Typography Section */}
        <section className="space-y-2">
          <h1 className="text-h2">Typography</h1>
          <div className="space-y-4">
            <h1 className="text-h1">Heading 1</h1>
            <h2 className="text-h2">Heading 2</h2>
            <h3 className="text-h3">Heading 3</h3>
            <p className="text-body">Regular body text</p>
            <p className="text-label">Label text</p>
            <p className="text-description">Description text</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-h2">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            {buttonContent.map((button, index) => (
              <Button key={`button-${index}`} variant={button.variant} onClick={button.onClick}>
                {button.title}
              </Button>
            ))}
          </div>
        </section>

        {/* Card Section */}
        <section className="space-y-2">
          <h2 className="text-h2">Cards</h2>
          <div className="flex items-stretch">
            {cardContent.map((card, index) => (
              <Card key={`card-${index}`} title={card.title}>
                {card.contentText}
              </Card>
            ))}
          </div>
        </section>

        {/* Card With Dropdown Section */}
        <section className="space-y-2">
          <h2 className="text-h2">Cards with Dropdown</h2>
          <div className="flex items-stretch">
            {cardContent.map((card, index) => (
              <CardWithDropdown
                key={`card-dropdown-${index}`}
                title={card.title}
                dropdownItems={cardDropdownItems}
              >
                {card.contentText}
              </CardWithDropdown>
            ))}
          </div>
        </section>

        {/* Dropdown Section */}
        <section className="space-y-2">
          <h2 className="text-h2">Dropdown</h2>
          <div>
            <Dropdown label={<MoreHorizontalIcon />} data={dropdownContent} />
          </div>
        </section>

        <section>
          <h2 className="text-h2">Editor</h2>
          <TiptapEditor
            content={content}
            onChange={handleChange}
            placeholder="Write your note here..."
          />
        </section>

        <section>
          <h2 className="text-h2">Modal</h2>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            open={modalOpen}
            onOpen={(open) => setModalOpen(open)}
            title="Add Notes"
            description="Use the editor below to write your notes"
            primaryButton={{
              label: 'Save',
              onClick: handleSave,
            }}
            secondaryButton={{
              label: 'Cancel',
              onClick: () => setModalOpen(false),
            }}
          >
            <TiptapEditor
              content={content}
              onChange={handleChange}
              placeholder="Write your note here..."
            />
          </Modal>
        </section>
      </div>
    </div>
  )
}

export default ComponentDisplay
