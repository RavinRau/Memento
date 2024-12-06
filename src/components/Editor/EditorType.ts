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

export type TiptapEditorProps = {
  content: string
  onChange?: (content: string) => void
  placeholder?: string
}

export type ColorPickerProps = {
  editor: Editor
}