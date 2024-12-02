export type ConfirmationProps = {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  open: boolean
  actionLabel?: string
  actionClassName?: string
  cancelLabel?: string
}
