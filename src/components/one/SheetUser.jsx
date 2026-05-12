import { useEffect, useState } from "react"
import { Sheet } from "react-modal-sheet"

export default function SheetUser({ isOpen, setOpen }) {
  useEffect(() => {}, [])

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} disableDrag={true} detent="content-height" avoidKeyboard={false}>
      <Sheet.Backdrop onTap={() => setOpen(false)} className="!bg-black/20 backdrop-blur-sm" />
      <Sheet.Container className="!bg-neutral-800 !text-white">
        <Sheet.Header className="flex flex-row rounded-t-lg py-2"></Sheet.Header>
        <Sheet.Content className="p-2 border-0"></Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}
