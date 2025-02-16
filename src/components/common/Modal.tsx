import { createPortal } from "react-dom"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type: 'error' | 'success' | 'warning' | 'info'  // Keep all types from useModal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 text-red-800'
      case 'success':
        return 'bg-green-50 text-green-800'
      default:
        return 'bg-red-50 text-red-800' // Default to error styling for other types
    }
  }

  return createPortal(
    <div 
      className="w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex items-center justify-center z-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full bg-white max-w-md p-6 rounded-lg shadow-xl ${getTypeStyles()}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            ×
          </button>
        </div>
        <p className="mt-4">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
