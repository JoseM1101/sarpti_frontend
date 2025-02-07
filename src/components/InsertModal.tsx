import Modal from "../components/common/Modal"
import Card from "../components/common/Card"
// import CustomSlider from "../components/common/CustomSlider"
import InsertForm from "./form/InsertForm"

interface InsertModalProps {
  isOpen: boolean
}

const InsertModal: React.FC<InsertModalProps> = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen}>
      <Card className="w-9/12 h-3/6 bg-white rounded-3xl overflow-auto">
        <InsertForm />
        {/* <CustomSlider
          settings={{
            className: "h-full w-full",
            dotsClass: "left-1/2 -translate-x-1/2 absolute top-10 flex gap-8",
            appendDots: () => (
              <ul>
                <CustomSlider.Step>1</CustomSlider.Step>
                <CustomSlider.Step>2</CustomSlider.Step>
                <CustomSlider.Step>3</CustomSlider.Step>
                <CustomSlider.Step>4</CustomSlider.Step>
                <CustomSlider.Step>5</CustomSlider.Step>
              </ul>
            ),
          }}
        >
          <div className="w-full h-full flex items-center justify-center bg-red">
            1
          </div>
          <div className="w-full h-full flex items-center justify-center bg-green">
            1
          </div>
          <div className="w-full h-full flex items-center justify-center bg-lightblue">
            1
          </div>
        </CustomSlider> */}
      </Card>
    </Modal>
  )
}

export default InsertModal
