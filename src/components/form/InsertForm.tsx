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
    formState: { errors },
  } = methods

  const [currentStep, setCurrentStep] = useState(0)
  const steps = Object.values(fields)
  const isLastStep = currentStep === steps.length - 1

  const onSubmit = async (data: FormData) => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1)
      return
    }

    const formattedData: InvestigationPostData = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      keywords: [data["palabra-1"], data["palabra-2"]],
      nivel: 2,
      proyecto_id: "pro-bdOVBNaY",
      inversion: Number(data.inversion),
      autores: [data["cedula-1"], data["cedula-2"]],
      tutores: [data["cedula-4"], data["cedula-5"]],
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
                <Input {...register(field.name as keyof FormData)} {...field} />
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
            <Button
              type="button"
              className="w-1/3"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Anterior
            </Button>
          )}
          <Button type="submit" className="w-1/3">
            {isLastStep ? "Enviar" : "Siguiente"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default InsertForm
