import { useState } from 'react'
import { observer } from 'mobx-react'
import Modal from '@/components/Modal/Model'
import Input from '@/components/Input/Input'
import TiptapEditor from '@/components/Editor/TiptapEditor'

type CreateNoteModalProps = {
  open: boolean
  onClose: () => void
}

export const CreateNoteModal = observer(({ open, onClose }: CreateNoteModalProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSave = () => {
    if (title.trim()) {
      handleClose()
    }
  }

  const handleClose = () => {
    setTitle('')
    setContent('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onOpen={onClose}
      title="Create A New Note"
      description="Capture your thoughts, ideas, and inspirations"
      primaryButton={{
        label: 'Save',
        onClick: handleSave,
        disabled: !title.trim(),
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
          <label className="text-sm font-medium mb-2 block">Content</label>
          <div className="min-h-[200px] border rounded-lg">
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your note..."
            />
          </div>
        </div>
      </div>
    </Modal>
  )
})
