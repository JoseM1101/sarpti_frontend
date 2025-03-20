import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import axios from "axios"
import { createProject } from "../../api/projects"
import { ProjectPostData } from "../../types/Project"
import Button from "../common/Button"
import FormSix from "./multiform/formSix"
import FormSeven from "./multiform/formSeven"
import FormEight from "./multiform/formeight"
import SummaryStep from "./multiform/summaryStep"
import ProgressIndicator from "./multiform/progressIndicator"
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message"

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

// Nota: Los títulos de paso se definen en StepTitles; en este ejemplo se usan tres (más el resumen).
const StepTitles = [
  "Identifica el proyecto",
  "Ingresa la cédula del responsable",
  "Inversión",
  "Resumen",
]

const ProjectInsertForm: React.FC<ProjectInsertFormProps> = ({ closeModal }) => {
  const methods = useForm<FormData>()
  const { handleSubmit, watch } = methods
  const [currentStep, setCurrentStep] = useState(0)
  const { showMessage } = useMessage()
  const formData = watch()

  const steps = [
    FormSix,    // Paso 1: Título y Descripción
    FormSeven,  // Paso 2: Responsable y Área Temática
    FormEight,  // Paso 3: Inversión
    () => <SummaryStep data={formData} mode="Proyectos" />, // Paso 4: Resumen
  ]
  const CurrentStepComponent = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const onSubmit = async (data: FormData) => {
    // Validaciones para cada paso:
    if (currentStep === 0) {
      // Validar que el título no esté vacío
      if (!data.titulo || data.titulo.trim() === "") {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 1",
          content: "El título es obligatorio.",
        })
        return
      }
      // Validar que la descripción no esté vacía
      if (!data.descripcion || data.descripcion.trim() === "") {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 1",
          content: "La descripción es obligatoria.",
        })
        return
      }
      // Validar que el título no exista (consulta al endpoint)
      try {
        const res = await axios.get<{ data: { list: any[] } }>(
          `/proyectos?titulo=${encodeURIComponent(data.titulo)}`
        )
        if (res.data.data.list && res.data.data.list.length > 0) {
          showMessage({
            type: MessageType.ERROR,
            title: "Error en el Paso 1",
            content: "El título ya existe.",
          })
          return
        }
      } catch (error: any) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 1",
          content:
            error?.response?.data?.message ||
            "Error al validar el título.",
        })
        return
      }
    }

    if (currentStep === 1) {
      // Validar que se haya elegido un responsable
      if (!data.responsable || data.responsable.trim() === "") {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 2",
          content: "Debe elegirse un responsable.",
        })
        return
      }
      // Validar que se haya seleccionado un área temática
      if (!data.areas_tematicas_id || data.areas_tematicas_id.trim() === "") {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 2",
          content: "Debe seleccionarse un área temática.",
        })
        return
      }
    }

    if (currentStep === 2) {
      // Validar que se ingrese una inversión
      if (data.inversion === undefined || data.inversion === null) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 3",
          content: "Debe ingresarse la inversión.",
        })
        return
      }
      // Validar que la inversión sea numérica
      if (isNaN(Number(data.inversion))) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 3",
          content: "La inversión debe ser un valor numérico.",
        })
        return
      }
      // Validar que la inversión sea positiva
      if (Number(data.inversion) <= 0) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 3",
          content: "La inversión debe ser un número positivo.",
        })
        return
      }
    }

    // Si no es el último paso, avanzar al siguiente
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1)
      return
    }

    // Último paso: enviar los datos
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
    } catch (error: any) {
      console.error("Error al crear el proyecto", error)
      showMessage({
        type: MessageType.ERROR,
        title: "Error al crear el proyecto",
        content:
          error?.response?.data?.message ||
          error.message ||
          "Error al crear el proyecto.",
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-4">
        <h1 className="font-semibold text-lg text-lightblue">
          Paso {currentStep + 1} de {steps.length}: {StepTitles[currentStep]}
        </h1>
        <ProgressIndicator totalSteps={steps.length} currentStep={currentStep + 1} />
        <CurrentStepComponent />
        <div className="flex justify-between gap-4 mt-5">
          {currentStep > 0 && (
            <Button type="button" className="w-1/3" onClick={() => setCurrentStep((prev) => prev - 1)}>
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
