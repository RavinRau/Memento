import * as React from 'react'
import { CardUI, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CardProps } from './CardTypes'
import { cn } from '@/lib/utils'
import { useTruncateText } from '@/hooks/useTruncateText'
import Dropdown from '../Dropdown/Dropdown'
import { MoreHorizontalIcon } from 'lucide-react'
import { DropdownItemProps } from '../Dropdown/DropdownTypes'
import HoverBorderGradient from '../ui/hover-border-gradient'

interface CardWithDropdownProps extends CardProps {
  noteId?: string
  dropdownItems: DropdownItemProps[]
}

export function CardWithDropdown({
  className,
  title,
  classNameChildren,
  children,
  dropdownItems,
  noteId,
  ...props
}: CardWithDropdownProps) {

  return (
    <HoverBorderGradient containerClassName="w-full h-full" className={className}>
      <CardUI className={cn('w-full h-full bg-background border rounded-lg', className)} {...props}>
        {title && (
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Dropdown
              label={<MoreHorizontalIcon className="h-5 w-5" />}
              data={dropdownItems}
              noteId={noteId}
            />
          </CardHeader>
        )}
        <CardContent className={classNameChildren}>{children}</CardContent>
      </CardUI>
    </HoverBorderGradient>
  )
}

export default CardWithDropdown
