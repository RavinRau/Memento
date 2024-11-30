'use client'
import * as React from 'react'
import { CardUI, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CardProps } from './CardTypes'
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '../ui/hover-border-gradient'
import { useTruncateText } from '@/hooks/useTruncateText'
import Dropdown from '../Dropdown/Dropdown'
import { MoreHorizontalIcon } from 'lucide-react'
import { DropdownItemProps } from '../Dropdown/DropdownTypes'

interface CardWithDropdownProps extends CardProps {
  dropdownItems: DropdownItemProps[]
}

export function CardWithDropdown({
  className,
  title,
  description,
  classNameChildren,
  children,
  dropdownItems,
  ...props
}: CardWithDropdownProps) {
  const truncatedContent = useTruncateText({
    text: children as string,
    limit: 300,
  })

  return (
    <HoverBorderGradient containerClassName="w-full" className={className}>
      <CardUI className={cn('w-full h-full bg-background border rounded-lg', className)} {...props}>
        {(title || description) && (
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Dropdown
              label={<MoreHorizontalIcon className="h-5 w-5" />}
              data={dropdownItems}
              classNameTrigger="focus:outline-none focus:ring-0"
            />
          </CardHeader>
        )}
        <CardContent className={classNameChildren}>{truncatedContent}</CardContent>
      </CardUI>
    </HoverBorderGradient>
  )
}

export default CardWithDropdown
