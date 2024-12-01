import { useState } from 'react'
import { observer } from 'mobx-react'
import Modal from '@/components/Modal/Model'
import Input from '@/components/Input/Input'
import { folderStore } from '@/stores/FolderStore'

type CreateFolderModalProps = {
  open: boolean
  onClose: () => void
}

export const CreateFolderModal = observer(({ open, onClose }: CreateFolderModalProps) => {
  const [folderName, setFolderName] = useState('')

  const handleSave = () => {
    if (folderName.trim()) {
      folderStore.addFolder(folderName.trim())
      setFolderName('')
      onClose()
    }
  }

  const handleClose = () => {
    setFolderName('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onOpen={onClose}
      title="Create A New Folder"
      description="A cozy new home for your brilliant ideas and scattered thoughts"
      primaryButton={{
        label: 'Save',
        onClick: handleSave,
        disabled: !folderName.trim(),
      }}
      secondaryButton={{
        label: 'Cancel',
        onClick: handleClose,
      }}
      className="max-w-[30vw]"
    >
      <Input
        label="Name"
        placeholder="Give some interesting name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        autoFocus
      />
    </Modal>
  )
})
