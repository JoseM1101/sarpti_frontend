import { useState } from "react";

interface ModalHookReturnType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

function useModal(): ModalHookReturnType {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
}

export default useModal;
