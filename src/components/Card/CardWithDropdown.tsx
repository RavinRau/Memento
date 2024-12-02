import * as React from 'react'
import { CardUI, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { CardProps } from './CardTypes'
import { cn } from '@/lib/utils'
import Dropdown from '../Dropdown/Dropdown'
import { MoreVerticalIcon } from 'lucide-react'
import { DropdownItemProps } from '../Dropdown/DropdownTypes'
import HoverBorderGradient from '../ui/hover-border-gradient'
import { useTruncateText } from '@/hooks/useTruncateText'

interface CardWithDropdownProps extends CardProps {
  id?: string
  dropdownItems: DropdownItemProps[]
  children: string
}

export function CardWithDropdown({
  className,
  title,
  classNameChildren,
  children,
  dropdownItems,
  id,
  onClick,
  description,
  ...props
}: CardWithDropdownProps) {
  const truncatedContent = useTruncateText({
    text: children,
    limit: 300,
  })
  return (
    <div>
      <HoverBorderGradient containerClassName="w-full h-full" className={className}>
        <CardUI
          className={cn(
            'w-[25rem] bg-background border rounded-lg cursor-pointer overflow-hidden',
            className
          )}
          onClick={onClick}
          {...props}
        >
          {title && (
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <CardTitle className="truncate">{title}</CardTitle>
                <Dropdown
                  label={<MoreVerticalIcon className="h-5 w-5" />}
                  data={dropdownItems}
                  id={id}
                />
              </div>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent className={cn('text-label h-[10rem]', classNameChildren)}>
            {truncatedContent}
          </CardContent>
        </CardUI>
      </HoverBorderGradient>
    </div>
  )
}

export default CardWithDropdown
