import Modal from "../components/common/Modal"
import Card from "../components/common/Card"
import InsertForm from "./form/InsertForm"
import ProjectInsertForm from "./form/projectInserForm"


interface InsertModalProps {
  isOpen: boolean
  closeModal: () => void
  children?: React.ReactNode
  mode: "Proyectos" | "Investigaciones";
}

const InsertModal: React.FC<InsertModalProps> = ({ isOpen, closeModal, mode }) => {
  console.log("Modal is open:", isOpen);  
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Card className="w-25/12 h-3/6 bg-white rounded-3xl overflow-auto">
        {mode === "Proyectos" ? (
          <ProjectInsertForm closeModal={closeModal} />
        ) : (
          <InsertForm closeModal={closeModal} />
        )}        
      </Card>
    </Modal>
  );
};

export default InsertModal
