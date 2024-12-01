import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/Button/Button'
import { ModalTypes } from './ModelTypes'

const Modal = ({
  title,
  description,
  open,
  onOpen,
  children,
  footer,
  primaryButton,
  secondaryButton,
}: ModalTypes) => {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        <DialogFooter>
          {footer ? (
            footer
          ) : (
            <div className="flex justify-end gap-3">
              {secondaryButton && (
                <Button
                  variant="outline"
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </Button>
              )}
              {primaryButton && (
                <Button onClick={primaryButton.onClick} disabled={primaryButton.disabled}>
                  {primaryButton.label}
                </Button>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
