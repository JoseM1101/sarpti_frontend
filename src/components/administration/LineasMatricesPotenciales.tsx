import { useState, useEffect } from "react"
import axios from "axios"
import EntityCard from "../entity/EntityCard"
import Scrollbar from "../common/Scrollbar"
import Edit from "../../assets/icons/edit.png"
import { ApiResponse } from "../../types/ApiResponse"
import { Entity, EntityStatus } from "../../types/Entity"
import AddLinea from "./common/AddLineas"
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message"

type Linea = Entity

const LineasMatricesPotenciales: React.FC = () => {
  const [lineasMatriciales, setLineasMatriciales] = useState<Linea[]>([])
  const [lineasPotenciales, setLineasPotenciales] = useState<Linea[]>([])
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [addingSection, setAddingSection] = useState<"matriciales" | "potenciales" | null>(null)
  const [editingItem, setEditingItem] = useState<{
    section: "matriciales" | "potenciales"
    item: Linea
  } | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState<"matriciales" | "potenciales" | null>(null)
  const { showMessage } = useMessage()

  // Remove local errorMessage state and use global messages.
  // Fetch matriciales data
  useEffect(() => {
    axios
      .get<ApiResponse<Linea>>("/lineas/matriciales")
      .then((response) => {
        const list = response.data.data.list || []
        setLineasMatriciales(list)
      })
      .catch((error) => {
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            error?.response?.data?.message ||
            error.message ||
            "Error fetching matriciales"
        })
      })
  }, [showMessage])

  // Fetch potenciales data
  useEffect(() => {
    axios
      .get<ApiResponse<Linea>>("/lineas/potenciales")
      .then((response) => {
        const list = response.data.data.list || []
        setLineasPotenciales(list)
      })
      .catch((error) => {
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            error?.response?.data?.message ||
            error.message ||
            "Error fetching potenciales"
        })
      })
  }, [showMessage])

  const handleEditClick = (section: "matriciales" | "potenciales") => {
    setIsEditing(true)
    setEditingSection(section)
  }

  const handleCardClick = (id: string, section: "matriciales" | "potenciales") => {
    if (isEditing && editingSection === section) {
      const list = section === "matriciales" ? lineasMatriciales : lineasPotenciales;
      const selectedItem = list.find((linea) => linea.id === id);
      if (selectedItem) {
        setEditingItem({ section, item: selectedItem });
        setIsEditing(false);
        setEditingSection(null);
      } else {
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content: "No se encontró la línea para editar"
        });
      }
    } else if (!isEditing) {
      setExpandedCard(expandedCard === id ? null : id);
    }
  }

  const handleAddSection = (section: "matriciales" | "potenciales") => {
    setAddingSection(section)
  }

  const handleCancelAdd = () => {
    setAddingSection(null)
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
  }

  // For addition mode, arg is the section name and maybeData holds the new data.
  // For edit mode, arg is the edited data.
  const handleSaveEdit = (
    arg: "matriciales" | "potenciales" | { titulo: string; descripcion: string; estatus: boolean },
    maybeData?: { titulo: string; descripcion: string; estatus: boolean }
  ) => {
    if (maybeData !== undefined) {
      // Addition mode:
      const section = arg as "matriciales" | "potenciales"
      const data = {
        titulo: maybeData.titulo,
        descripcion: maybeData.descripcion,
        estatus: maybeData.estatus
          ? EntityStatus.ACTIVE
          : EntityStatus.INACTIVE,
      }
      showMessage({
        type: MessageType.INFO,
        title: "Confirmación",
        content: "¿Está seguro de agregar esta línea?",
        onConfirm: () => {
          axios
            .post<ApiResponse<Linea>>(`/lineas/${section}`, data)
            .then((response) => {
              const newItem = response.data.data as unknown as Linea
              if (section === "matriciales") {
                setLineasMatriciales((prev) => [newItem, ...prev])
              } else {
                setLineasPotenciales((prev) => [newItem, ...prev])
              }
              setAddingSection(null)
              showMessage({
                type: MessageType.SUCCESS,
                title: "Éxito",
                content: "Línea agregada exitosamente"
              })
            })
            .catch((error) => {
              showMessage({
                type: MessageType.ERROR,
                title: "Error",
                content:
                  error?.response?.data?.message ||
                  error.message ||
                  "Error adding línea"
              })
            })
        },
        onCancel: () => {
          // Optionally handle cancel action.
        }
      })
    } else {
      // Editing mode:
      if (!editingItem) return

      type EditableFields = {
        titulo?: string
        descripcion?: string
        estatus?: number
      }
      const changedFields: EditableFields = {}
      const editedData = arg as { titulo: string; descripcion: string; estatus: boolean }

      if (editedData.titulo !== editingItem.item.titulo) {
        changedFields.titulo = editedData.titulo
      }
      if (editedData.descripcion !== editingItem.item.descripcion) {
        changedFields.descripcion = editedData.descripcion
      }
      const newEstatus = editedData.estatus
        ? EntityStatus.ACTIVE
        : EntityStatus.INACTIVE
      if (newEstatus !== editingItem.item.estatus) {
        changedFields.estatus = newEstatus
      }

      if (Object.keys(changedFields).length === 0) {
        setEditingItem(null)
        return
      }

      showMessage({
        type: MessageType.INFO,
        title: "Confirmación",
        content: "¿Está seguro de guardar los cambios?",
        onConfirm: () => {
          axios
            .patch<ApiResponse<Linea>>(
              `/lineas/${editingItem.section}/${editingItem.item.id}`,
              changedFields
            )
            .then(() => {
              if (editingItem.section === "matriciales") {
                setLineasMatriciales((prev) =>
                  prev.map((item) =>
                    item.id === editingItem.item.id ? { ...item, ...changedFields } : item
                  )
                )
              } else {
                setLineasPotenciales((prev) =>
                  prev.map((item) =>
                    item.id === editingItem.item.id ? { ...item, ...changedFields } : item
                  )
                )
              }
              setEditingItem(null)
              showMessage({
                type: MessageType.SUCCESS,
                title: "Éxito",
                content: "Línea actualizada exitosamente"
              })
            })
            .catch((error) => {
              showMessage({
                type: MessageType.ERROR,
                title: "Error",
                content:
                  error?.response?.data?.message ||
                  error.message ||
                  "Error editing línea"
              })
            })
        },
        onCancel: () => {
          // Optionally handle cancel action.
        }
      })
    }
  }

  const renderSectionHeader = (section: "matriciales" | "potenciales", title: string) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex space-x-2">
        {isEditing && editingSection === section ? (
          <button
            onClick={() => {
              setIsEditing(false)
              setEditingSection(null)
            }}
            className="px-2 py-1 bg-red text-white rounded text-sm"
          >
            Cancelar selección
          </button>
        ) : (
          <>
            <button
              onClick={() => handleEditClick(section)}
              className="p-2 bg-yellow hover:bg-yellow-800 rounded"
              disabled={addingSection !== null}
            >
              <img src={Edit} alt="Edit" className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAddSection(section)}
              className="px-2 py-1 bg-green text-white rounded text-sm"
            >
              Agregar
            </button>
          </>
        )}
      </div>
    </div>
  )

  const renderCard = (item: Linea, section: "matriciales" | "potenciales") => (
    <div
      key={item.id}
      className="w-full pb-4 flex-shrink-0 cursor-pointer"
      onClick={() => handleCardClick(item.id, section)}
    >
      <div
        className={`
          rounded-sm shadow-sm hover:shadow-md transition-all overflow-hidden
          ${expandedCard === item.id ? "max-h-[1920px]" : "max-h-20"}
        `}
      >
        <EntityCard
          entity={item}
          className="bg-gray shadow-sm hover:shadow-md transition-shadow"
        >
          <EntityCard.Badge />
          <EntityCard.Title className={`mt-4 transition-all ${expandedCard === item.id ? "" : "line-clamp-1"}`} />
          <EntityCard.Description className={`transition-all ${expandedCard === item.id ? "" : "line-clamp-1"}`} />
        </EntityCard>
      </div>
    </div>
  )

  return (
    <div className="flex justify-between">
      {/* Líneas Matriciales Section */}
      <section className="space-y-4 w-1/2 p-4">
        {renderSectionHeader("matriciales", "Líneas Matriciales")}
        {editingItem?.section === "matriciales" ? (
          <AddLinea
            entityType="linea matricial"
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
            defaultValues={{
              titulo: editingItem.item.titulo,
              descripcion: editingItem.item.descripcion,
              estatus: editingItem.item.estatus === EntityStatus.ACTIVE,
            }}
            isEditing={true}
            lineasMatricialesOptions={[]}
            lineasPotencialesOptions={[]}
          />
        ) : addingSection === "matriciales" ? (
          <AddLinea
            entityType="linea matricial"
            onCancel={handleCancelAdd}
            onSave={(data) => handleSaveEdit("matriciales", data)}
            lineasMatricialesOptions={[]}
            lineasPotencialesOptions={[]}
          />
        ) : (
          <Scrollbar maxHeight="calc(100vh - 200px)" className="pr-4 pb-4">
            <div className="flex flex-col min-w-min">
              {lineasMatriciales.map((item) => renderCard(item, "matriciales"))}
            </div>
          </Scrollbar>
        )}
      </section>

      {/* Líneas Potenciales Section */}
      <section className="space-y-4 w-1/2 p-4">
        {renderSectionHeader("potenciales", "Líneas Potenciales")}
        {editingItem?.section === "potenciales" ? (
          <AddLinea
            entityType="linea potencial"
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
            defaultValues={{
              titulo: editingItem.item.titulo,
              descripcion: editingItem.item.descripcion,
              estatus: editingItem.item.estatus === EntityStatus.ACTIVE,
            }}
            isEditing={true}
            lineasMatricialesOptions={[]}
            lineasPotencialesOptions={[]}
          />
        ) : addingSection === "potenciales" ? (
          <AddLinea
            entityType="linea potencial"
            onCancel={handleCancelAdd}
            onSave={(data) => handleSaveEdit("potenciales", data)}
            lineasMatricialesOptions={[]}
            lineasPotencialesOptions={[]}
          />
        ) : (
          <Scrollbar maxHeight="calc(100vh - 200px)" className="pr-4 pb-4">
            <div className="flex flex-col min-w-min">
              {lineasPotenciales.map((item) => renderCard(item, "potenciales"))}
            </div>
          </Scrollbar>
        )}
      </section>

      {/* Local error modal is replaced by global messages;
          if you still need a fallback error modal, include the required closeModal prop */}
      {/* Example:
      {errorMessage && (
        <Modal isOpen={true} closeModal={() => setErrorMessage(null)}>
          <div className="relative bg-white p-6 rounded-lg shadow-xl">
            <button
              onClick={() => setErrorMessage(null)}
              className="absolute top-2 right-2 bg-red text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Error</h3>
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )} */}
    </div>
  )
}

export default LineasMatricesPotenciales
