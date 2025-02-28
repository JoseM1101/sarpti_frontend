import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../common/Button";
import { createInvestigation } from "../../api/investigations";
import { InvestigationPostData } from "../../types/Investigation";
import FormOne from "./multiform/formOne";
import FormTwo from "./multiform/formTwo";
import FormFour from "./multiform/FormFour";
import FormFive from "./multiform/FormFive";
import SummaryStep from "./multiform/summaryStep";
import FormThree from './multiform/formThree';

interface FormData {
  titulo: string;
  descripcion: string;
  "palabra-1": string;
  "palabra-2": string;
  "palabra-3": string;
  "cedula-1": string;
  "cedula-2": string;
  "cedula-3": string;
  "cedula-4": string;
  inversion: number;
  inversionista: string;
  proyecto_id: string;
}

interface InsertFormProps {
  closeModal: () => void;
}

const stepTitles = [
  "Información General",
  "Cedula de Tutores y Autores",
  "Selecciona un Proyecto",
  "Palabras Clave",
  "Inversión",
  "Resumen",
];

const InsertForm: React.FC<InsertFormProps> = ({ closeModal }) => {
  const methods = useForm<FormData>();
  const { handleSubmit, watch } = methods;

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [FormOne,FormTwo,FormThree,FormFour,FormFive, () => <SummaryStep data={formData} mode="Investigaciones" />]; 
  const CurrentStepComponent = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const formData = watch();

  const onSubmit = async (data: FormData) => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const formattedData: InvestigationPostData = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      keywords: [data["palabra-1"], data["palabra-2"], data["palabra-3"]],
      nivel: 2,
      proyecto_id: data.proyecto_id,
      inversion: Number(data.inversion),
      autores: [data["cedula-1"], data["cedula-2"]],
      tutores: [data["cedula-3"], data["cedula-4"]],
      productos: [],
    };

    try {
      console.log("Datos a enviar:", formattedData);
      await createInvestigation(formattedData);
      console.log("Formulario enviado, cerrando modal");
      closeModal();
    } catch (error) {
      console.error("Error al crear la investigación", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-4"
      >
        <h1 className="font-semibold text-lg text-lightblue">
          Paso {currentStep + 1} de {steps.length}: {stepTitles[currentStep]}
        </h1>
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
          <Button type="submit" className="w-1/3">
            {isLastStep ? "Enviar" : "Siguiente"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default InsertForm;