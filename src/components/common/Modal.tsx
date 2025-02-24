import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"

interface ModalProps {
  className?: string
  isOpen: boolean
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, className, children }) => {
  return isOpen
    ? createPortal(
        <div
          className={twMerge(
            "w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex items-center justify-center z-10",
            className
          )}
        >
          {children}
        </div>,
        document.body
      )
    : null
}

export default Modal
