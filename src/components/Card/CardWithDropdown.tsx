import * as React from 'react'
import { CardUI, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CardProps } from './CardTypes'
import { cn } from '@/lib/utils'
import Dropdown from '../Dropdown/Dropdown'
import { MoreHorizontalIcon } from 'lucide-react'
import { DropdownItemProps } from '../Dropdown/DropdownTypes'
import HoverBorderGradient from '../ui/hover-border-gradient'
import { useTruncateText } from '@/hooks/useTruncateText'

interface CardWithDropdownProps extends CardProps {
  noteId?: string
  dropdownItems: DropdownItemProps[]
  children: string
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
  const truncatedContent = useTruncateText({
    text: children,
    limit: 350,
  })
  return (
    <div>
      <HoverBorderGradient containerClassName="w-full h-full" className={className}>
        <CardUI
          className={cn('w-[25rem] h-[15.625rem] bg-background border rounded-lg', className)}
          {...props}
        >
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
          <CardContent className={cn('text-label', classNameChildren)}>
            {truncatedContent}
          </CardContent>
        </CardUI>
      </HoverBorderGradient>
    </div>
  )
}

export default CardWithDropdown
