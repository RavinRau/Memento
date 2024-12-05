import { InputUI } from '@/components/ui/input'
import { cn } from '@/utils/utils'
import { InputProps } from './InputTypes'

const Input = ({ label, placeholder, value, onChange, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-label">{label}</label>}
      <InputUI
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn('text-neutral-100 placeholder:text-neutral-60', className)}
        {...props}
      />
    </div>
  )
}

export default Input
