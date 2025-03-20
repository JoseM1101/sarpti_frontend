import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { createProject } from "../../api/projects"
import { ProjectPostData } from "../../types/Project"
import Button from "../common/Button"
import FormSix from "./multiform/formSix"
import FormSeven from "./multiform/formSeven"
import SummaryStep from "./multiform/summaryStep"
import ProgressIndicator from "./multiform/progressIndicator"
import FormEight from "./multiform/formeight"

interface FormData {
  titulo: string
  descripcion: string
  responsable: string
  areas_tematicas_id: string
  inversion: number
  productos: ProductFormData[]
}

interface ProductFormData {
  titulo: string
  descripcion: string
  url: URL
}

interface ProjectInsertFormProps {
  closeModal: () => void
}

const StepTitles = [
  "Identifica el proyecto",
  "Ingresa la cedula del responsable",
  "Resumen",
]

const ProjectInsertForm: React.FC<ProjectInsertFormProps> = ({
  closeModal,
}) => {
  const methods = useForm<FormData>()
  const { handleSubmit, watch } = methods
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    FormSix,
    FormSeven,
    FormEight,
    () => <SummaryStep data={formData} mode="Proyectos" />,
  ]
  const CurrentStepComponent = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const formData = watch()
  console.log("Datos del formulario:", formData)
  const onSubmit = async (data: FormData) => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1)
      return
    }

    const formattedData: ProjectPostData = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      responsable: data.responsable,
      areas_tematicas_id: data.areas_tematicas_id,
      inversion: data.inversion,
      productos: data.productos,
    }

    try {
      console.log("Datos de Proyecto enviado:", formattedData)
      await createProject(formattedData)
      closeModal()
      /*     window.location.reload()
    alert("Proyecto creado exitosamente") */
    } catch (error) {
      console.error("Error al crear el proyecto", error)
      alert("Error al crear el proyecto")
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-4"
      >
        <h1 className="font-semibold text-lg text-lightblue">
          Paso {currentStep + 1} de {steps.length}: {StepTitles[currentStep]}
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

export default ProjectInsertForm
