import { useState } from "react"

interface ModalConfig {
  title: string
  message: string
  type: 'error' | 'success' | 'warning' | 'info'
}

interface ModalHookReturnType {
  isOpen: boolean
  modalConfig: ModalConfig | null
  openModal: (config: ModalConfig) => void
  closeModal: () => void
}

function useModal(): ModalHookReturnType {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null)

  const openModal = (config: ModalConfig) => {
    setModalConfig(config)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalConfig(null)
  }

  return { isOpen, modalConfig, openModal, closeModal }
}

export default useModal
