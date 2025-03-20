import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import axios from "axios" // <- Asegurarse de tener importado axios
import Button from "../common/Button"
import { createInvestigation } from "../../api/investigations"
import { InvestigationPostData } from "../../types/Investigation"
import FormOne from "./multiform/formOne"
import FormTwo from "./multiform/formTwo"
import FormThree from "./multiform/formThree"
import FormFour from "./multiform/FormFour"
import FormFive from "./multiform/FormFive"
import SummaryStep from "./multiform/summaryStep"
import ProgressIndicator from "./multiform/progressIndicator"
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message"

interface FormData {
  titulo: string
  descripcion: string
  palabras: string[]
  "cedula-1": string
  "cedula-2": string
  "cedula-3": string
  "cedula-4": string
  "cedula-5": string
  "cedula-6": string
  "cedula-7": string
  "cedula-8": string
  nivel: number
  inversion: number
  inversionista: string
  proyecto_id: string
  productos: ProductFormData[]
}

interface ProductFormData {
  titulo: string
  descripcion: string
  url: URL
}

interface InsertFormProps {
  closeModal: () => void
}

const stepTitles = [
  "Información General",
  "Cedula de Tutores y Autores",
  "Selecciona un Proyecto",
  "Palabras Clave",
  "Inversión",
  "Resumen",
]

const InsertForm: React.FC<InsertFormProps> = ({ closeModal }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      palabras: [],
    },
  })
  const { handleSubmit, watch } = methods
  const [currentStep, setCurrentStep] = useState(0)
  const { showMessage } = useMessage()

  const steps = [
    FormOne,
    FormTwo,
    FormThree,
    FormFour,
    FormFive,
    () => <SummaryStep data={formData} mode="Investigaciones" />,
  ]
  const CurrentStepComponent = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const formData = watch()

  const onSubmit = async (data: FormData) => {
    // Validaciones por paso:
    if (currentStep === 0) {
      // Paso 1: Información General (Título y Descripción)
      if (!data.titulo || data.titulo.trim() === "") {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 1",
          content: "El título es obligatorio.",
        });
        return;
      }
      if (!data.descripcion || data.descripcion.trim() === "") {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 1",
          content: "La descripción es obligatoria.",
        });
        return;
      }
      // Validar que el título no exista
      try {
        const response = await axios.get<{ data: { list: any[] } }>(
          `/investigaciones?titulo=${encodeURIComponent(data.titulo)}`
        );
        if (response.data.data.list && response.data.data.list.length > 0) {
          showMessage({
            type: MessageType.ERROR,
            title: "Error en el Paso 1",
            content: "El título ya existe.",
          });
          return;
        }
      } catch (error: any) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 1",
          content:
            error?.response?.data?.message ||
            error.message ||
            "Error al validar el título.",
        });
        return;
      }
    } else if (currentStep === 1) {
      // Paso 2: Cédula de Tutores y Autores
      const autores = [
        data["cedula-1"],
        data["cedula-2"],
        data["cedula-3"],
        data["cedula-4"],
      ].filter((cedula) => cedula && cedula.trim() !== "");
      const tutores = [
        data["cedula-5"],
        data["cedula-6"],
        data["cedula-7"],
        data["cedula-8"],
      ].filter((cedula) => cedula && cedula.trim() !== "");
      if (autores.length === 0) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 2",
          content: "Debe haber por lo menos un autor para crear la investigación.",
        });
        return;
      }
      if (tutores.length === 0) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 2",
          content: "Debe haber por lo menos un tutor para crear la investigación.",
        });
        return;
      }
    } else if (currentStep === 4) {
      // Paso 5: Inversión
      if (data.inversion === undefined || data.inversion === null) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 5",
          content: "Debe ingresarse la inversión.",
        });
        return;
      }
      if (isNaN(Number(data.inversion))) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 5",
          content: "La inversión debe ser un valor numérico.",
        });
        return;
      }
      if (Number(data.inversion) < 0) {
        showMessage({
          type: MessageType.ERROR,
          title: "Error en el Paso 5",
          content: "La inversión no debe ser un número negativo.",
        });
        return;
      }
    }
    
    // Si no es el último paso, se avanza al siguiente
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    
    // Último paso: preparar y enviar los datos
    const palabras = data.palabras || [];
    const Keywords = palabras.filter(
      (keyword) => keyword && keyword.trim() !== ""
    );
    const formattedData: InvestigationPostData = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      keywords: Keywords,
      nivel: Number(data.nivel),
      proyecto_id: data.proyecto_id,
      inversion: Number(data.inversion),
      autores: [
        data["cedula-1"],
        data["cedula-2"],
        data["cedula-3"],
        data["cedula-4"],
      ].filter((cedula) => cedula && cedula.trim() !== ""),
      tutores: [
        data["cedula-5"],
        data["cedula-6"],
        data["cedula-7"],
        data["cedula-8"],
      ].filter((cedula) => cedula && cedula.trim() !== ""),
      productos: data.productos,
    };
    
    try {
      console.log("Datos a enviar:", formattedData);
      await createInvestigation(formattedData);
      console.log("Formulario enviado, cerrando modal");
      closeModal();
    } catch (error: any) {
      console.error("Error al crear la investigación", error);
      showMessage({
        type: MessageType.ERROR,
        title: "Error al crear",
        content:
          error?.response?.data?.message ||
          error.message ||
          "Error al crear la investigación.",
      });
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-4">
        <h1 className="font-semibold text-lg text-lightblue">
          Paso {currentStep + 1} de {steps.length}: {stepTitles[currentStep]}
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
            className={`w-1/3 ${isLastStep ? "bg-green" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {isLastStep ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default InsertForm
