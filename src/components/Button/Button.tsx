import { ButtonUI } from '../ui/button'
import { ButtonProps } from './ButtonTypes'

export function Button({
  children,
  size = 'sm',
  variant = 'secondary',
  ...otherProps
}: ButtonProps) {
  return (
    <ButtonUI size={size} variant={variant} {...otherProps}>
      {children}
    </ButtonUI>
  )
}
