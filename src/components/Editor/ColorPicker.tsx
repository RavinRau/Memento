import React, { useCallback, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Palette } from 'lucide-react'
import { Editor } from '@tiptap/react'

type ColorPickerProps = {
  editor: Editor
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ editor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState('#000000')

  const updateColor = useCallback(
    (newColor: string) => {
      setColor(newColor)
      editor.chain().focus().setColor(newColor).run()
    },
    [editor]
  )

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded hover:bg-neutral-40 hover:text-neutral-90 transition-colors duration-100`}
        title="Text color"
      >
        <Palette size={18} color={color} />
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 top-full mt-2">
            <HexColorPicker color={color} onChange={updateColor} />
          </div>
        </>
      )}
    </div>
  )
} 