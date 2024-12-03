import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import Modal from '@/components/Modal/Model'
import Input from '@/components/Input/Input'
import { folderStore } from '@/stores/FolderStore'
import { FolderModalProps } from './FolderModalTypes'

export const FolderModal = observer(({ open, onClose, editFolderId }: FolderModalProps) => {
  const [folderName, setFolderName] = useState('')

  const handleClose = () => {
    setFolderName('')
    onClose()
  }

  const handleSave = () => {
    if (folderName.trim()) {
      if (editFolderId) {
        folderStore.editFolder(editFolderId, folderName.trim())
      } else {
        folderStore.addFolder(folderName.trim())
      }
      handleClose()
    }
  }

  useEffect(() => {
    setFolderName('')
    if (editFolderId) {
      const folder = folderStore.folders.find((f) => f.id === editFolderId)
      if (folder) {
        setFolderName(folder.name)
      }
    }
  }, [editFolderId])

  return (
    <Modal
      open={open}
      onOpen={onClose}
      title={editFolderId ? 'Edit Folder' : 'Create A New Folder'}
      description={
        editFolderId
          ? 'Refine your folder name that suits your thoughts'
          : 'Capture your thoughts, ideas, and inspirations'
      }
      primaryButton={{
        label: editFolderId ? 'Save Changes' : 'Save',
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSave()
          }
        }}
        autoFocus
      />
    </Modal>
  )
})
