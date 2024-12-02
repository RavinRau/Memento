export type ConfirmationProps = {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  open: boolean
  actionLabel?: string
  cancelLabel?: string
}
