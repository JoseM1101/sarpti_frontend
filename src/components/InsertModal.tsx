import Modal from "../components/common/Modal"
import Card from "../components/common/Card"
import InsertForm from "./form/InsertForm"


interface InsertModalProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const InsertModal: React.FC<InsertModalProps> = ({ isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="w-9/12 h-3/6 bg-white rounded-3xl overflow-auto">
        <InsertForm  onClose={onClose}/>
        {}
      </Card>
    </Modal>
  )
}

export default InsertModal
