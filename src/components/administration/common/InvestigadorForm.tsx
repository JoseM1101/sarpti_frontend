import React from "react"
import { useForm } from "react-hook-form"
import { User, UserRole } from "../../../types/User"
import { Switch } from "../../common/Switch"

interface UsuarioFormProps {
  onSubmit: (data: Partial<User>) => void
  onCancel: () => void
  defaultValues?: Partial<User>
  isEditing?: boolean
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues,
  isEditing = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Partial<User>>({
    defaultValues: defaultValues || {
      usuario: "",
      nivel: UserRole.INVESTIGADOR,
      estatus: 0,
    },
  })

  const estatusValue = watch("estatus")

  const handleFormSubmit = (data: Partial<User>) => {
    if (typeof data.estatus === "boolean") {
      data.estatus = data.estatus ? 1 : 0
    }
    onSubmit(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="p-8 bg-white rounded-xl max-w-xl w-full space-y-6"
    >
      <div>
        <label className="block text-gray-700 text-base mb-2">Usuario</label>
        <input
          type="text"
          {...register("usuario", { required: "El usuario es requerido" })}
          className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre de usuario..."
        />
        {errors.usuario && (
          <span className="text-red-500 text-xs">{errors.usuario.message}</span>
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-base mb-2">Nivel</label>
        <select
          {...register("nivel", { required: true })}
          className="w-full px-4 py-3 rounded-lg border border-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={UserRole.INVESTIGADOR}>Investigador</option>
          <option value={UserRole.DIRECTOR}>Director</option>
          <option value={UserRole.DECANO}>Decano</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-gray-700 text-base">Estatus</label>
        <Switch
          checked={estatusValue === 1}
          onCheckedChange={(checked: boolean) => {
            setValue("estatus", checked ? 1 : 0)
          }}
        />
      </div>

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
          {isEditing ? "Guardar Cambios" : "Crear Usuario"}
        </button>
      </div>
    </form>
  )
}

export default UsuarioForm
