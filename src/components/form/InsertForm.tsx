import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import Button from "../common/Button"
import { createInvestigation } from "../../api/investigations"
import { InvestigationPostData } from "../../types/Investigation"
import FormOne from "./multiform/formOne"
import FormTwo from "./multiform/formTwo"
import FormFour from "./multiform/FormFour"
import FormFive from "./multiform/FormFive"
import SummaryStep from "./multiform/summaryStep"
import FormThree from "./multiform/formThree"
import ProgressIndicator from "./multiform/progressIndicator"

interface FormData {
  titulo: string
  descripcion: string
  "palabra-1": string
  "palabra-2": string
  "palabra-3": string
  "cedula-1": string
  "cedula-2": string
  "cedula-3": string
  "cedula-4": string
  "cedula-5": string
  "cedula-6": string
  "cedula-7": string
  "cedula-8": string
  inversion: number
  inversionista: string
  proyecto_id: string
}

interface InsertFormProps {
  closeModal: () => void
}

const stepTitles = [
  "Información General",
  "Autores",
  "Tutores",
  "Palabras Clave",
  "Inversión",
]

const InsertForm: React.FC<InsertFormProps> = ({ closeModal }) => {
  const methods = useForm<FormData>()
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = methods

  const [currentStep, setCurrentStep] = useState(0)
  const steps = Object.values(fields)
  const isLastStep = currentStep === steps.length - 1

  const [stepData, setStepData] = useState<FormData[]>([])
  const [showSummaryModal, setShowSummaryModal] = useState(false)

  const onSubmit = async (data: FormData) => {
    const updatedStepData = [...stepData]
    updatedStepData[currentStep] = data
    setStepData(updatedStepData)

    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1)
      return
    }

    const autores = [
      data["cedula-1"],
      data["cedula-2"],
      data["cedula-3"],
      data["cedula-4"],
    ].filter((cedula) => cedula.trim() !== "")
    const tutores = [
      data["cedula-5"],
      data["cedula-6"],
      data["cedula-7"],
      data["cedula-8"],
    ].filter((cedula) => cedula.trim() !== "")

    const formattedData: InvestigationPostData = {
      titulo: finalData.titulo,
      descripcion: finalData.descripcion,
      keywords: [finalData["palabra-1"], finalData["palabra-2"]],
      nivel: 2,
      proyecto_id: data.proyecto_id,
      inversion: Number(data.inversion),
      autores: autores,
      tutores: tutores,
      productos: [],
    }

    try {
      console.log("Datos a enviar:", formattedData)
      await createInvestigation(formattedData)
      console.log("Formulario enviado, cerrando modal")
      closeModal()
      console.log("Datos a enviar:", formattedData)
      await createInvestigation(formattedData)
      console.log("Formulario enviado, cerrando modal")
      closeModal()
      window.location.reload()
      alert("Investigación creada exitosamente")
    } catch (error) {
      console.error("Error al crear la investigación", error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-4"
      >
        <h1 className="font-semibold text-lg text-lightblue">
          Paso {currentStep + 1} de {steps.length}: {stepTitles[currentStep]}
        </h1>
        <ProgressIndicator
          totalSteps={steps.length}
          currentStep={currentStep + 1}
        />
        <CurrentStepComponent />
        <div className="flex justify-between gap-4 mt-5">
          {currentStep > 0 && (
            <Button
              type="button"
              className="w-1/3"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Anterior
            </Button>
          )}
          <Button
            type="submit"
            className={`w-1/3 ${
              isLastStep ? "bg-green" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLastStep ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default InsertForm
