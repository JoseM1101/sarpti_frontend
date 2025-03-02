import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import Input from "./Input"
import { fields } from "../../data/insertFields"
import Button from "../common/Button"
import { createInvestigation } from "../../api/investigations"
import { InvestigationPostData } from "../../types/Investigation"

interface FormData {
  titulo: string
  descripcion: string
  "palabra-1": string
  "palabra-2": string
  "cedula-1": string
  "cedula-2": string
  "cedula-3": string
  "cedula-4": string
  "cedula-5": string
  inversion: number
  inversionista: string
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
      // Avanzar al siguiente paso
      setCurrentStep((prev) => prev + 1)
      reset(updatedStepData[currentStep + 1] || {})
      return
    }
    setShowSummaryModal(true)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      // Guardar los datos del paso actual
      const updatedStepData = [...stepData]
      updatedStepData[currentStep] = getValues()
      setStepData(updatedStepData)

      setCurrentStep((prev) => prev - 1)

      // Restaurar los valores del formulario para el paso anterior
      reset(updatedStepData[currentStep - 1] || {})
    }
  }

  const handleFinalSubmit = async () => {
    const finalData = stepData.reduce<FormData>(
      (acc, step) => ({ ...acc, ...step }),
      {} as FormData
    )

    const formattedData: InvestigationPostData = {
      titulo: finalData.titulo,
      descripcion: finalData.descripcion,
      keywords: [finalData["palabra-1"], finalData["palabra-2"]],
      nivel: 2,
      proyecto_id: "pro-bdOVBNaY",
      inversion: Number(finalData.inversion),
      autores: [finalData["cedula-1"], finalData["cedula-2"]],
      tutores: [finalData["cedula-4"], finalData["cedula-5"]],
      productos: [],
    }

    try {
      console.log("Datos a enviar:", formattedData)
      await createInvestigation(formattedData)
      console.log("Formulario enviado, cerrando modal")
      closeModal()
    } catch (error) {
      console.error("Error al crear la investigación", error)
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-4"
        >
          <h1 className="font-semibold text-lg text-lightblue">
            Paso {currentStep + 1} de {steps.length}: {stepTitles[currentStep]}
          </h1>
          <div>
            <div className="flex gap-2 mt-2">
              {steps[currentStep].map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex flex-col gap-1">
                  <Input
                    {...register(field.name as keyof FormData)}
                    {...field}
                  />
                  {errors[field.name as keyof FormData] && (
                    <span className="text-red text-sm">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-5">
            {currentStep > 0 && (
              <Button type="button" className="w-1/3" onClick={handlePrevious}>
                Anterior
              </Button>
            )}
            <Button type="submit" className="w-1/3">
              {isLastStep ? "Revisar" : "Siguiente"}
            </Button>
          </div>
        </form>
      </FormProvider>

      {showSummaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Resumen de Datos</h2>
            <pre className="bg-gray-100 p-4 rounded-lg">
              {JSON.stringify(
                stepData.reduce((acc, step) => ({ ...acc, ...step }), {}),
                null,
                2
              )}
            </pre>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                type="button"
                className="bg-gray-500 text-white"
                onClick={() => setShowSummaryModal(false)}
              >
                Volver
              </Button>
              <Button
                type="button"
                className="bg-blue-500 text-white"
                onClick={handleFinalSubmit}
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InsertForm
