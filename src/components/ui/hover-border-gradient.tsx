import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/utils'

type HoverBorderGradientProps = {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  duration?: number
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = 'div',
  duration = 3,
  ...props
}: HoverBorderGradientProps) => {
  const [hovered, setHovered] = useState<boolean>(false)

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn('relative p-[2px] rounded-lg overflow-hidden', containerClassName)}
      {...props}
    >
      <motion.div
        className="absolute inset-0 z-0 rounded-lg"
        style={{
          filter: 'blur(2px)',
          background: `
            linear-gradient(0deg, transparent, #38D200 25%, transparent 50%),
            linear-gradient(180deg, transparent, #38D200 25%, #3275F8 30%, transparent 50%),
            linear-gradient(240deg, transparent, #3275F8 25%, transparent 50%),
            linear-gradient(300deg, transparent, #38D200 25%, transparent 50%)
          `,
          backgroundBlendMode: 'soft-light',
          transformOrigin: 'center center',
          mixBlendMode: 'screen',
          backgroundSize: '200% 200%',
        }}
        initial={{
          opacity: 0,
          rotate: 0,
          scale: 1.5,
        }}
        animate={{
          opacity: hovered ? 1 : 0,
          rotate: hovered ? 360 : 0,
          scale: hovered ? 1.5 : 1.5,
        }}
        transition={{
          opacity: {
            duration: 0.3,
            ease: 'easeInOut',
          },
          rotate: {
            duration: duration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            from: 0,
            to: 360,
          },
          scale: {
            duration: 0,
          },
        }}
      />
      <div className={cn('relative', className)}>{children}</div>
    </Tag>
  )
}

export default HoverBorderGradient
