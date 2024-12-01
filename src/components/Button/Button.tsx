import { ButtonUI } from '../ui/button'
import { ButtonProps } from './ButtonTypes'

export const Button = ({
  children,
  size = 'sm',
  variant = 'default',
  ...otherProps
}: ButtonProps) => {
  return (
    <ButtonUI size={size} variant={variant} {...otherProps}>
      {children}
    </ButtonUI>
  )
}

export default Button
