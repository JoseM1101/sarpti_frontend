import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, className, children, closeModal }) => {
  return isOpen
    ? createPortal(
        <div
          className={twMerge(
            "w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex items-center justify-center z-10",
            className
          )}
        >
          <div className="relative bg-white rounded-lg p-8 w-11/12 max-w-2xl mx-auto">
             <button
               onClick={closeModal}
               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
               aria-label="Cerrar modal"
             >
               <FaTimes className="w-5 h-5" />
             </button>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;

