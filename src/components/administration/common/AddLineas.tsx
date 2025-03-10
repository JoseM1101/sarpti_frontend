import React from "react"
import { useForm } from "react-hook-form"
import { Switch } from "../../common/Switch"
import { Entity } from "../../../types/Entity"

interface FormData {
  titulo: string
  descripcion: string
  estatus: boolean
  linea_matricial_id?: string
  linea_potencial_id?: string
}

interface Linea extends Entity {
  id: string
  titulo: string
}

export interface AddLineaProps {
  onSave: (data: FormData) => void
  onCancel: () => void
  entityType?: "linea matricial" | "linea potencial" | "area tematica"
  defaultValues?: {
    titulo: string
    descripcion: string
    estatus: boolean
    linea_matricial_id?: string
    linea_potencial_id?: string
  }
  isEditing?: boolean
  lineasMatricialesOptions?: Linea[];
  lineasPotencialesOptions?: Linea[];
}

const AddLinea: React.FC<AddLineaProps> = ({
  onSave,
  onCancel,
  entityType = "linea matricial",
  defaultValues,
  isEditing = false,
  lineasMatricialesOptions = [], // Add default empty array
  lineasPotencialesOptions = [], // Add default empty array
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: defaultValues || {
      estatus: true,
    },
  })

  const estatusValue = watch("estatus")

  const onSubmit = (data: FormData) => {
    onSave(data)
  }

  let titlePlaceholder = ""
  let descriptionLabel = ""
  let descriptionPlaceholder = ""
  let submitButtonText = ""

  switch (entityType) {
    case "linea matricial":
      titlePlaceholder = "Sustentabilidad..."
      descriptionLabel = "Descripción"
      descriptionPlaceholder = "Descripción de la línea matricial..."
      submitButtonText = isEditing ? "Editar Línea Matricial" : "Agregar Línea Matricial"
      break
    case "linea potencial":
      titlePlaceholder = "Oportunidad de crecimiento..."
      descriptionLabel = "Descripción"
      descriptionPlaceholder = "Descripción de la línea potencial..."
      submitButtonText = isEditing ? "Editar Línea Potencial" : "Agregar Línea Potencial"
      break
    case "area tematica":
      titlePlaceholder = "Nombre del área temática..."
      descriptionLabel = "Descripción"
      descriptionPlaceholder = "Descripción del área temática..."
      submitButtonText = isEditing ? "Editar Área Temática" : "Agregar Área Temática"
      break
    default:
      titlePlaceholder = "Sustentabilidad..."
      descriptionLabel = "Descripción"
      descriptionPlaceholder = "Descripción de la línea matricial..."
      submitButtonText = isEditing ? "Editar Línea Matricial" : "Agregar Línea Matricial"
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded-xl max-w-xl w-full space-y-6">
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1">
          <label className="block text-gray-700 text-base mb-2">Titulo</label>
          <input
            type="text"
            {...register("titulo", { required: true })}
            className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={titlePlaceholder}
          />
          {errors.titulo && (
            <span className="text-red-500 text-xs">El título es obligatorio</span>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 pt-1">
          <label className="text-gray-700 text-base">Estatus</label>
          <Switch
            checked={estatusValue}
            onCheckedChange={(checked) => {
              setValue("estatus", checked)
            }}
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-base mb-2">{descriptionLabel}</label>
        <textarea
          {...register("descripcion", { required: true })}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={descriptionPlaceholder}
        />
        {errors.descripcion && (
          <span className="text-red-500 text-xs">La descripción es obligatoria</span>
        )}
      </div>

      {entityType === "area tematica" && (
        <>
          <div>
            <label className="block text-gray-700 text-base mb-2">Línea Matricial</label>
            <select
              {...register("linea_matricial_id")}
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar línea matricial</option>
              {lineasMatricialesOptions.map((linea: Linea) => (
                <option key={linea.id} value={linea.id}>
                  {linea.titulo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-base mb-2">Línea Potencial</label>
            <select
              {...register("linea_potencial_id")}
              className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar línea potencial</option>
              {lineasPotencialesOptions.map((linea: Linea) => (
                <option key={linea.id} value={linea.id}>
                  {linea.titulo}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 text-gray-700 bg-gray rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 py-3 text-white text-base font-medium bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  )
}

export default AddLinea
