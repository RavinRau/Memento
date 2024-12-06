import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Code,
  Undo,
  Redo,
} from 'lucide-react'
import React from 'react'
import { EditorToolbarProps, ToolbarButtonProps } from './EditorType'
import { ColorPicker } from './ColorPicker'

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  active = false,
  disabled = false,
  tooltip,
  children,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={tooltip}
    className={`p-2 rounded hover:bg-neutral-40 hover:text-neutral-90 transition-colors duration-100 ${
      active ? 'bg-primary-60 text-neutral-0' : 'text-neutral-90'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </button>
)

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor, className = '' }) => {
  if (!editor) return null

  const tools = [
    {
      icon: <Bold size={18} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
      tooltip: 'Bold',
      group: 'format',
    },
    {
      icon: <Italic size={18} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
      tooltip: 'Italic',
      group: 'format',
    },
    {
      icon: <Heading1 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive('heading', { level: 1 }),
      tooltip: 'Heading 1',
      group: 'heading',
    },
    {
      icon: <Heading2 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2',
      group: 'heading',
    },
    {
      icon: <List size={18} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList'),
      tooltip: 'Bullet List',
      group: 'list',
    },
    {
      icon: <ListOrdered size={18} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList'),
      tooltip: 'Numbered List',
      group: 'list',
    },
    {
      icon: <Quote size={18} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive('blockquote'),
      tooltip: 'Quote',
      group: 'block',
    },
    {
      icon: <Code size={18} />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive('code'),
      tooltip: 'Code',
      group: 'block',
    },
  ]

  const historyTools = [
    {
      icon: <Undo size={18} />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
      tooltip: 'Undo',
    },
    {
      icon: <Redo size={18} />,
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
      tooltip: 'Redo',
    },
  ]

  return (
    <div className={`border-b p-2 flex flex-wrap gap-1 bg-gray-50 ${className}`}>
      {Object.entries(
        tools.reduce(
          (acc, tool) => {
            const group = tool.group
            if (!acc[group]) acc[group] = []
            acc[group].push(tool)
            return acc
          },
          {} as Record<string, typeof tools>
        )
      ).map(([group, groupTools], groupIndex) => (
        <React.Fragment key={group}>
          {groupIndex > 0 && <div className="w-px h-6 bg-neutral-30 mx-1 self-center" />}
          <div className="flex gap-1">
            {groupTools.map((tool, index) => (
              <ToolbarButton
                key={`${group}-${index}`}
                onClick={tool.onClick}
                active={tool.active}
                tooltip={tool.tooltip}
              >
                {tool.icon}
              </ToolbarButton>
            ))}
          </div>
        </React.Fragment>
      ))}
      <div className="w-px h-6 bg-neutral-30 mx-1 self-center" />
      <div className="flex gap-1">
        <ColorPicker editor={editor} />
      </div>
      <div className="w-px h-6 bg-neutral-30 mx-1 self-center" />
      <div className="flex gap-1">
        {historyTools.map((tool, index) => (
          <ToolbarButton
            key={`history-${index}`}
            onClick={tool.onClick}
            disabled={tool.disabled}
            tooltip={tool.tooltip}
          >
            {tool.icon}
          </ToolbarButton>
        ))}
      </div>
    </div>
  )
}
