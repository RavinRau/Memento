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
import { cn } from '@/utils/utils'

const Modal = ({
  title,
  description,
  open,
  onOpen,
  children,
  footer,
  primaryButton,
  secondaryButton,
  className,
}: ModalTypes) => {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className={cn('max-w-[70vw]', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4 border-t-1">{children}</div>

        <DialogFooter>
          {footer ? (
            footer
          ) : (
            <div className="flex justify-center gap-3">
              {secondaryButton && (
                <Button
                  variant="outline"
                  className="min-w-[6.25rem]"
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                >
                  {secondaryButton.label}
                </Button>
              )}
              {primaryButton && (
                <Button
                  onClick={primaryButton.onClick}
                  className="min-w-[6.25rem]"
                  disabled={primaryButton.disabled}
                >
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
