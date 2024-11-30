import { Editor } from '@tiptap/react'
import { ReactNode } from 'react'

export type ToolbarButtonProps = {
  onClick: () => boolean
  active?: boolean
  disabled?: boolean
  tooltip: string
  children: ReactNode
}

export type EditorToolbarProps = {
  editor: Editor | null
  className?: string
}
