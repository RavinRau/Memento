import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { cn, isNil, isString } from '@/lib/utils'
import { DropdownItemProps, DropdownProps } from './DropdownTypes'

export const Dropdown = ({
  label,
  data,
  className,
  classNameTrigger,
  showDescription = false,
  disabled,
  align,
  noteId,
}: DropdownProps) => {
  const renderMenuItems = (data?: DropdownItemProps[], parentKey = '') => {
    return data?.map((i, index) => {
      const itemKey = isString(i.text) ? i.text : (i.key ?? index)
      const key = `${parentKey}${itemKey}-${index}`

      const renderDropdownItem = () => (
        <div
          className={cn('flex items-center w-full', {
            'cursor-not-allowed': i.disabled,
          })}
        >
          <span className="pr-2">{i.icon}</span>
          <span>{i.text}</span>
          <DropdownMenuShortcut>{i.shortcut}</DropdownMenuShortcut>
        </div>
      )

      switch (i.type) {
        case 'label':
          return <DropdownMenuLabel key={key}>{i.text}</DropdownMenuLabel>
        case 'separator':
          return <DropdownMenuSeparator key={`separator-${key}`} />
        case 'item':
          const itemContent = renderDropdownItem()
          return (
            <DropdownMenuItem
              key={key}
              onClick={() => i.onClick?.(noteId || '')}
              className={cn({ block: showDescription }, i.className)}
              disabled={i.disabled}
            >
              {itemContent}
            </DropdownMenuItem>
          )
        case 'group':
          return (
            <DropdownMenuGroup key={`group-${key}`}>
              {renderMenuItems(isNil(i.items) ? [] : i.items, `group-${key}-`)}
            </DropdownMenuGroup>
          )
        case 'submenu':
          return (
            <DropdownMenuSub key={`submenu-${key}`}>
              <DropdownMenuSubTrigger disabled={i.disabled}>
                {renderDropdownItem()}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className={i.className}>
                  {renderMenuItems(isNil(i.items) ? [] : i.items, `submenu-${key}-`)}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={classNameTrigger} disabled={disabled}>
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(className)} align={align}>
        {renderMenuItems(data)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
