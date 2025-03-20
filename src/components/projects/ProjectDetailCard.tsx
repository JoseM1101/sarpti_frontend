import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Project } from "../../types/Project"
import EntityCard from "../entity/EntityCard"
import Button from "../common/Button"
import descripcion from "../../assets/icons/descripcion.png"
import autores from "../../assets/icons/autores.png"
import { updateProjectState, updateProjectDetails } from "../../api/projects"
import { EntityStatus } from "../../types/Entity"
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa"
import { createPortal } from "react-dom"
import Legend from "../entity/Legend"
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message"

interface ProjectDetailCardProps {
  className?: string
  entity: Project
}

const itemHeader = (icon: string, text: string) => (
  <div className="flex gap-2 items-center">
    <img className="object-contain" src={icon} alt="" />
    <p className="font-semibold text-gray-2">{text}</p>
  </div>
)

const renderItem = (
  header: React.ReactElement,
  body: React.ReactElement,
  className?: string
) => (
  <div className={twMerge("flex flex-col gap-1", className)}>
    {header}
    {body}
  </div>
)

const ProjectDetailCard = ({ className, entity }: ProjectDetailCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(entity.titulo)
  const [editedDescription, setEditedDescription] = useState(entity.descripcion)
  const { showMessage } = useMessage();

  const baseClasses =
    "max-w-4xl w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6"
  const mergedClasses = twMerge(baseClasses, className)

  const handleSave = async () => {
    const updatedData = {
      titulo: editedTitle,
      descripcion: editedDescription,
    }

    try {
      await updateProjectDetails(entity.id, updatedData);
      setIsEditing(false);
      showMessage({
        type: MessageType.SUCCESS,
        title: "Cambios guardados",
        content: "Los cambios se han guardado exitosamente."
      });
    } catch (error: any) {
      console.error("Error al guardar los cambios:", error);
      showMessage({
        type: MessageType.ERROR,
        title: "Error al guardar",
        content: error?.response?.data?.message || "No se pudieron guardar los cambios."
      });
    }
  }

  const handleCancel = () => {
    setEditedTitle(entity.titulo)
    setEditedDescription(entity.descripcion)
    setIsEditing(false)
  }

  return (
    <EntityCard className={mergedClasses} entity={entity}>
      {createPortal(
        <Legend className="absolute top-8 left-1/2 -translate-x-1/2" />,
        document.querySelector("main") as HTMLElement
      )}
      <EntityCard.Badge className="w-7 h-7 rounded-br-3xl" />
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full text-gray-3 text-3xl border border-lightblue p-2 rounded"
        />
      ) : (
        <EntityCard.Title className="text-3xl" />
      )}

      <div className="flex justify-between mt-10 gap-2">
        <div className="flex flex-col gap-3 w-3/5">
          {renderItem(
            itemHeader(descripcion, "Descripción"),
            isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="text-gray-3 border border-lightblue p-2 rounded"
              />
            ) : (
              <EntityCard.Description />
            )
          )}
          {renderItem(
            itemHeader(descripcion, "Lineas de Investigacion"),
            <p className="text-gray-2 ml-5 font-semibold">
              <span className="text-gray-2">Area tematica: </span>
              {entity.areas_tematicas}
            </p>,
            "mt-4"
          )}
        </div>

        <div className="relative mx-3 h-auto bg-black w-px flex items-center justify-center">
          <button
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="absolute bg-white p-1 rounded-full"
          >
            {isEditing ? (
              <FaTimes className="w-6 h-6 p-0.5 text-red" />
            ) : (
              <FaEdit className="w-6 h-6 p-0.5 text-lightblue" />
            )}
          </button>
        </div>

        <div className="w-2/5 flex flex-col gap-3 justify-between">
          <EntityCard.StartDate
            className="text-base"
            startDate={entity.fecha_creacion}
            icon
          />
          <div className="flex gap-2">
            <img className="object-contain" src={autores} alt="" />
            <p className="text-gray-2 font-semibold">Responsable:</p>
            <p className="text-gray-3 font-semibold">{entity.responsable}</p>
          </div>
          <div className="flex gap-2">
            <img className="object-contain" src={autores} alt="" />
            <p className="text-gray-2 font-semibold">Creador:</p>
            <p className="text-gray-3 font-semibold">{entity.creador}</p>
          </div>
          <div className="flex gap-2 w-full">
            {isEditing ? (
              <Button
                onClick={handleSave}
                className="w-full flex gap-2 items-center justify-center"
              >
                <FaCheck className="text-green-500" />
                Guardar Cambios
              </Button>
            ) : (
              <Button
                onClick={() =>
                  updateProjectState(
                    entity.id,
                    entity.estatus === EntityStatus.ACTIVE
                      ? EntityStatus.INACTIVE
                      : EntityStatus.ACTIVE
                  )
                  .then(() => {
                    showMessage({
                      type: MessageType.SUCCESS,
                      title: "Estado actualizado",
                      content: "El estado del proyecto fue actualizado correctamente."
                    });
                  })
                  .catch((error) => {
                    showMessage({
                      type: MessageType.ERROR,
                      title: "Error al actualizar",
                      content: error?.response?.data?.message || "No se pudo actualizar el estado del proyecto."
                    });
                  })
                }
                className="w-full flex gap-2 items-center justify-center"
              >
                {entity.estatus === EntityStatus.ACTIVE
                  ? "Desactivar Proyecto"
                  : "Activar Proyecto"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </EntityCard>
  )
}

export default ProjectDetailCard
