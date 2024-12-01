'use client'
import * as React from 'react'
import { CardUI, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CardProps } from './CardTypes'
import { cn } from '@/lib/utils'
import HoverBorderGradient from '../ui/hover-border-gradient'

export const Card = ({ className, title, classNameChildren, children, ...props }: CardProps) => {
  return (
    <HoverBorderGradient containerClassName="w-full h-full" className={className}>
      <CardUI className={cn('w-full h-full bg-background border rounded-lg', className)} {...props}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className={classNameChildren}>{children}</CardContent>
      </CardUI>
    </HoverBorderGradient>
  )
}

export default Card
