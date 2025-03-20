import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"
import { Investigation } from "../../types/Investigation"
import EntityCard from "../entity/EntityCard"
import Button from "../common/Button"
import descripcion from "../../assets/icons/descripcion.png"
import autores from "../../assets/icons/autores.png"
import tutores from "../../assets/icons/tutores.png"
import productos from "../../assets/icons/productos.png"
import inversion from "../../assets/icons/inversion.png"
import {
  updateInvestigationState,
  updateInvestigationDetails,
} from "../../api/investigations"
import { EntityStatus } from "../../types/Entity"
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message"

import { FaCheck, FaEdit, FaTimes, FaPlus, FaTrash } from "react-icons/fa"
import pause from "../../assets/images/pause.png"
import stop from "../../assets/images/stop.png"
import Legend from "../entity/Legend"

interface InvestigationDetailCardProps {
  className?: string
  entity: Investigation
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

const InvestigationDetailCard = ({
  className,
  entity,
}: InvestigationDetailCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(entity.titulo)
  const [editedDescription, setEditedDescription] = useState(entity.descripcion)
  const [editedInvestment, setEditedInvestment] = useState<number>(
    entity.inversion
  )
  const [editedKeywords, setEditedKeywords] = useState(
    entity.keywords.length > 0 ? entity.keywords : [""]
  )
  const baseClasses =
    "max-w-4xl w-11/12 bg-white border border-lightblue rounded-xl overflow-hidden p-6"
  const mergedClasses = twMerge(baseClasses, className)
  const { showMessage } = useMessage()

  useEffect(() => {
    if (isNaN(editedInvestment)) {
      setEditedInvestment(0)
    }
  }, [editedInvestment])

  const handleAddKeyword = () => {
    setEditedKeywords([...editedKeywords, ""])
  }

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = [...editedKeywords]
    newKeywords.splice(index, 1)
    setEditedKeywords(newKeywords.length > 0 ? newKeywords : [""]) // Asegurar que al menos haya 1 input
  }

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...editedKeywords]
    newKeywords[index] = value
    setEditedKeywords(newKeywords)
  }

  const handleSave = async () => {
    const updatedData = {
      titulo: editedTitle,
      descripcion: editedDescription,
      inversion: editedInvestment,
      keywords: editedKeywords.filter((word) => word.trim() !== "") || [],
    }

    console.log("Datos enviados al backend:", updatedData)

    try {
      await updateInvestigationDetails(entity.id, updatedData)
      setIsEditing(false)
      showMessage({
        type: MessageType.SUCCESS,
        title: "Cambios guardados",
        content: "Los cambios se han guardado exitosamente.",
      })
    } catch (error) {
      console.error("Error al guardar los cambios:", error)
      showMessage({
        type: MessageType.ERROR,
        title: "Error al guardar",
        content:
          error?.response?.data?.message ||
          "No se pudieron guardar los cambios.",
      })
    }
  }

  const handleCancel = () => {
    setEditedTitle(entity.titulo)
    setEditedDescription(entity.descripcion)
    setEditedInvestment(entity.inversion)
    setEditedKeywords(entity.keywords.length > 0 ? entity.keywords : [""])
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
          className="w-full text-3xl border border-lightblue text-gray-3 p-2 rounded"
        />
      ) : (
        <EntityCard.Title className="text-3xl" />
      )}

      <div className="flex gap-2 flex-wrap mt-3">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            {editedKeywords.map((keyword, index) => (
              <div
                key={index}
                className="flex items-center border border-lightblue text-gray-3 p-2 rounded"
              >
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  className="outline-none border-none bg-transparent"
                />
                <FaTrash
                  className="ml-2 cursor-pointer text-red-500"
                  onClick={() => handleRemoveKeyword(index)}
                />
              </div>
            ))}
            <Button
              bgColor="green"
              onClick={handleAddKeyword}
              className="p-2 text-white flex justify-center items-center gap-2"
            >
              <FaPlus />
              Agregar palabra
            </Button>
          </div>
        ) : (
          <EntityCard.Keywords
            keywords={entity.keywords}
            className="rounded-sm text-lightblue font-medium text-sm p-2"
          />
        )}
      </div>

      <div className="flex justify-between mt-10 gap-2">
        <div className="flex flex-col gap-3 w-3/5">
          {renderItem(
            itemHeader(descripcion, "Descripción"),
            isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border border-lightblue text-gray-3 p-2 rounded"
              />
            ) : (
              <EntityCard.Description />
            )
          )}
          {renderItem(
            itemHeader(autores, "Autores"),
            <EntityCard.RelatedPeople
              people={entity.autores}
              showText={false}
            />
          )}
          {renderItem(
            itemHeader(tutores, "Tutores"),
            <EntityCard.RelatedPeople
              people={entity.tutores}
              showText={false}
            />
          )}
        </div>

        <div className="relative mx-3 h-auto bg-black w-px flex items-center justify-center">
          <Button
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="absolute bg-white p-1 rounded-full shadow-none"
          >
            {isEditing ? (
              <FaTimes className="w-6 h-6 p-0.5 text-red" />
            ) : (
              <FaEdit className="w-6 h-6 p-0.5 text-lightblue" />
            )}
          </Button>
        </div>

        <div className="w-2/5 flex flex-col gap-3 justify-between">
          <EntityCard.StartDate
            className="text-base"
            startDate={entity.fecha_inicio}
            icon
          />
          <EntityCard.EndDate
            className="text-base"
            endDate={entity.fecha_culminacion}
            icon
          />
          {entity.productos &&
            renderItem(
              itemHeader(productos, "Productos"),
              <EntityCard.Products
                showText={false}
                className="text-base text-lightblue"
                products={entity.productos}
              />
            )}
          {renderItem(
            itemHeader(inversion, "Inversión"),
            isEditing ? (
              <input
                type="text"
                value={editedInvestment}
                onChange={(e) =>
                  setEditedInvestment(parseFloat(e.target.value))
                }
                className="border border-lightblue text-gray-3 p-2 rounded"
              />
            ) : (
              <EntityCard.Investment
                className="text-base"
                investment={entity.inversion}
                showText={false}
              />
            ),
            "flex-row"
          )}
          <div className="flex gap-2 w-full">
            {isEditing ? (
              <Button
                onClick={handleSave}
                className="w-full flex gap-2 items-center justify-center"
              >
                <FaCheck className="text-green-500" />
                Guardar Cambios
              </Button>
            ) : entity.estatus === EntityStatus.ACTIVE ? (
              <>
                <img
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.CANCELLED)
                      .then(() => {
                        showMessage({
                          type: MessageType.SUCCESS,
                          title: "Investigación Cancelada",
                          content:
                            "La investigación ha sido cancelada correctamente.",
                        })
                      })
                      .catch((error) => {
                        showMessage({
                          type: MessageType.ERROR,
                          title: "Error al cancelar",
                          content:
                            error?.response?.data?.message ||
                            "No se pudo cancelar la investigación.",
                        })
                      })
                  }
                  className="cursor-pointer"
                  src={stop}
                  alt=""
                />
                <img
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.INACTIVE)
                      .then(() => {
                        showMessage({
                          type: MessageType.SUCCESS,
                          title: "Investigación Pausada",
                          content:
                            "La investigación ha sido pausada correctamente.",
                        })
                      })
                      .catch((error) => {
                        showMessage({
                          type: MessageType.ERROR,
                          title: "Error al pausar",
                          content:
                            error?.response?.data?.message ||
                            "No se pudo pausar la investigación.",
                        })
                      })
                  }
                  className="cursor-pointer"
                  src={pause}
                  alt=""
                />
                <Button
                  onClick={() =>
                    updateInvestigationState(entity.id, EntityStatus.FINISHED)
                      .then(() => {
                        showMessage({
                          type: MessageType.SUCCESS,
                          title: "Investigación Finalizada",
                          content:
                            "La investigación ha finalizado correctamente.",
                        })
                      })
                      .catch((error) => {
                        showMessage({
                          type: MessageType.ERROR,
                          title: "Error al finalizar",
                          content:
                            error?.response?.data?.message ||
                            "No se pudo finalizar la investigación.",
                        })
                      })
                  }
                  className="w-full flex gap-2 items-center justify-center"
                >
                  <FaCheck className="text-green-500" />
                  Finalizar Investigacion
                </Button>
              </>
            ) : (
              <Button
                bgColor="green"
                onClick={() =>
                  updateInvestigationState(entity.id, EntityStatus.ACTIVE)
                    .then(() => {
                      showMessage({
                        type: MessageType.SUCCESS,
                        title: "Investigación Reactivada",
                        content:
                          "La investigación ha sido reactivada correctamente.",
                      })
                    })
                    .catch((error) => {
                      showMessage({
                        type: MessageType.ERROR,
                        title: "Error al reactivar",
                        content:
                          error?.response?.data?.message ||
                          "No se pudo reactivar la investigación.",
                      })
                    })
                }
                className="w-full flex gap-2 items-center justify-center"
              >
                Reactivar Investigacion
              </Button>
            )}
          </div>
        </div>
      </div>
    </EntityCard>
  )
}

export default InvestigationDetailCard
