import { useForm } from "react-hook-form"
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
/*   "palabra-3": string */
  "cedula-1": string
  "cedula-2": string
  "cedula-3": string
  "cedula-4": string
  "cedula-5": string
 /*  "cedula-6": string */
  inversion: number
  inversionista: string
}

interface InsertFormProps {
  onClose: () => void
}

const InsertForm: React.FC<InsertFormProps> = ({onClose}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {

    console.log( "Primera data:",data)
    const formattedData: InvestigationPostData = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      keywords: [data["palabra-1"], data["palabra-2"]],
      nivel: 2,
      proyecto_id: "pro-bdOVBNaY",
      inversion: Number(data.inversion),
      autores: [data["cedula-1"], data["cedula-2"]],
      tutores: [data["cedula-4"], data["cedula-5"]],
      productos: [
      ],
    }

    try {
      await createInvestigation(formattedData)
      console.log("Prueba", data)
      onClose()
    } catch (error) {
      console.error(error)
      console.log("Error al crear la investigacion", data)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-4">
      {Object.values(fields).map((group, index) => (
        <div key={index}>
          <h1 className="font-semibold text-lg text-lightblue">
            Paso {index + 1}:
          </h1>
          <div className="flex gap-2 mt-2">
            {group.map((field, fieldIndex) => {
              return (
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
              )
            })}
          </div>
        </div>
      ))}
      <Button type="submit" className="w-1/3 self-center mt-5">
        Crear Investigacion
      </Button>
    </form>
  )
}

export default InsertForm
