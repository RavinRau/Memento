import * as React from 'react'
import { CardUI, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { CardWithDropdownProps } from './CardTypes'
import { cn } from '@/utils/utils'
import Dropdown from '../Dropdown/Dropdown'
import { MoreVerticalIcon } from 'lucide-react'
import HoverBorderGradient from '../ui/hover-border-gradient'
import { useTruncateText } from '@/hooks/useTruncateText'


export const CardWithDropdown = ({
  className,
  title,
  classNameChildren,
  children,
  dropdownItems,
  id,
  description,
  onClick,
  ...props
}: CardWithDropdownProps) => {
  const truncatedContent = useTruncateText({
    text: children,
    limit: 300,
  })

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="w-full">
      <HoverBorderGradient containerClassName="w-full h-full" className={className}>
        <CardUI
          className={cn(
            'h-full bg-background border rounded-lg cursor-pointer overflow-hidden',
            className
          )}
          onClick={onClick}
          {...props}
        >
          {title && (
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <CardTitle className="truncate">{title}</CardTitle>
                <div onClick={handleDropdownClick}>
                  <Dropdown
                    label={<MoreVerticalIcon className="h-5 w-5" />}
                    data={dropdownItems}
                    id={id}
                  />
                </div>
              </div>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
          )}
          <CardContent
            className={cn('text-label h-[10rem]', classNameChildren)}
            style={{ overflowWrap: 'anywhere' }}
          >
            {truncatedContent}
          </CardContent>
        </CardUI>
      </HoverBorderGradient>
    </div>
  )
}

export default CardWithDropdown
