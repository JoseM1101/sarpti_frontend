import { useState, useEffect, useCallback, memo, useRef } from "react"
import axios from "axios"
import EntityCard from "../entity/EntityCard"
import Scrollbar from "../common/Scrollbar"
import Edit from "../../assets/icons/edit.png"
import { Entity, EntityStatus } from "../../types/Entity"
import { ApiResponse } from "../../types/ApiResponse"
import AddLinea from "./common/AddLineas"
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message" // Import MessageType enum

interface Area extends Entity {
  id: string
  titulo: string
  descripcion: string
  estatus: EntityStatus
  linea_matricial_id?: string
  linea_potencial_id?: string
}
interface Linea extends Entity {
  id: string
  titulo: string
  estatus: EntityStatus
}

const AreasTematicas: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([])
  const [addingArea, setAddingArea] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<Area | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Get showMessage from useMessage.
  // (Message now supports optional onConfirm and onCancel callbacks.)
  const { showMessage } = useMessage()

  // State for dropdown options for lineas.
  const [lineasMatricialesOptions, setLineasMatricialesOptions] = useState<
    Linea[]
  >([])
  const [lineasPotencialesOptions, setLineasPotencialesOptions] = useState<
    Linea[]
  >([])

  // Add refs to track initial loads
  const initialAreasLoadRef = useRef(false)
  const initialMatricialesLoadRef = useRef(false)
  const initialPotencialesLoadRef = useRef(false)

  const fetchAreas = useCallback(() => {
    // Skip if already loaded once
    if (initialAreasLoadRef.current) return

    axios
      .get<ApiResponse<Area>>("/areas")
      .then((response) => {
        const list = response.data.data.list || []
        setAreas(list)
        initialAreasLoadRef.current = true

        // Show information message if no areas are found.
        if (list.length === 0) {
          showMessage({
            type: MessageType.INFO,
            title: "Información",
            content: "No hay áreas temáticas registradas",
          })
        }
      })
      .catch((error) => {
        initialAreasLoadRef.current = true
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            error?.response?.data?.message ||
            error.message ||
            "Error al cargar áreas",
        })
      })
  }, [showMessage])

  useEffect(() => {
    fetchAreas()
  }, [fetchAreas])

  const fetchLineasMatriciales = useCallback(() => {
    // Skip if already loaded once
    if (initialMatricialesLoadRef.current) return

    axios
      .get<ApiResponse<Linea>>("/lineas/matriciales")
      .then((response) => {
        const list = response.data.data.list || []
        setLineasMatricialesOptions(list)
        initialMatricialesLoadRef.current = true
      })
      .catch((error) => {
        initialMatricialesLoadRef.current = true
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            error?.response?.data?.message ||
            error.message ||
            "Error al cargar líneas matriciales",
        })
      })
  }, [showMessage])

  // Memoize the function to fetch líneas potenciales
  const fetchLineasPotenciales = useCallback(() => {
    // Skip if already loaded once
    if (initialPotencialesLoadRef.current) return

    axios
      .get<ApiResponse<Linea>>("/lineas/potenciales")
      .then((response) => {
        const list = response.data.data.list || []
        setLineasPotencialesOptions(list)
        initialPotencialesLoadRef.current = true
      })
      .catch((error) => {
        initialPotencialesLoadRef.current = true
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            error?.response?.data?.message ||
            error.message ||
            "Error al cargar líneas potenciales",
        })
      })
  }, [showMessage])

  useEffect(() => {
    fetchLineasMatriciales()
  }, [fetchLineasMatriciales])

  useEffect(() => {
    fetchLineasPotenciales()
  }, [fetchLineasPotenciales])

  // CONFIRMATION for adding an area.
  const handleAddArea = () => {
    showMessage({
      type: MessageType.INFO,
      title: "Confirmación",
      content: "¿Está seguro que desea agregar un área temática?",
      onConfirm: () => setAddingArea(true),
      onCancel: () => {},
    })
  }

  const handleSaveArea = (data: {
    titulo: string
    descripcion: string
    estatus: boolean
    linea_matricial_id?: string
    linea_potencial_id?: string
  }) => {
    const newArea = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      estatus: data.estatus ? EntityStatus.ACTIVE : EntityStatus.INACTIVE,
      linea_matricial_id: data.linea_matricial_id,
      linea_potencial_id: data.linea_potencial_id,
    }
    axios
      .post<ApiResponse<Area>>("/areas", newArea)
      .then((response) => {
        const createdArea = response.data.data as unknown as Area
        setAreas((prev) => [createdArea, ...prev])
        setAddingArea(false)
        showMessage({
          type: MessageType.SUCCESS,
          title: "Éxito",
          content: "Área temática creada exitosamente",
        })
      })
      .catch((error) => {
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            error?.response?.data?.message ||
            error.message ||
            "Error al crear área",
        })
      })
  }

  // Instead of using a confirmation modal on edit button click, directly enable edit mode.
  const handleEditAreas = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingItem(null)
  }

  // When trying to save changes in the edit form, show a confirmation modal before sending the update.
  const handleSaveEdit = (data: {
    titulo: string
    descripcion: string
    estatus: boolean
  }) => {
    if (!editingItem) return

    interface EditableFields {
      titulo?: string
      descripcion?: string
      estatus?: number
    }
    const changedFields: EditableFields = {}

    if (data.titulo !== editingItem.titulo) {
      changedFields.titulo = data.titulo
    }
    if (data.descripcion !== editingItem.descripcion) {
      changedFields.descripcion = data.descripcion
    }
    const newEstatus = data.estatus
      ? EntityStatus.ACTIVE
      : EntityStatus.INACTIVE
    if (newEstatus !== editingItem.estatus) {
      changedFields.estatus = newEstatus
    }
    if (Object.keys(changedFields).length === 0) {
      setEditingItem(null)
      showMessage({
        type: MessageType.WARNING,
        title: "Aviso",
        content: "No se detectaron cambios",
      })
      return
    }

    // Show confirmation modal before saving changes.
    showMessage({
      type: MessageType.INFO,
      title: "Confirmación",
      content: "¿Está seguro de que desea guardar los cambios?",
      onConfirm: () => {
        axios
          .patch<ApiResponse<Area>>(`/areas/${editingItem.id}`, changedFields)
          .then(() => {
            fetchAreas()
            setEditingItem(null)
            showMessage({
              type: MessageType.SUCCESS,
              title: "Éxito",
              content: "Área temática actualizada exitosamente",
            })
          })
          .catch((error) => {
            showMessage({
              type: MessageType.ERROR,
              title: "Error",
              content:
                error?.response?.data?.message ||
                error.message ||
                "Error al actualizar área",
            })
          })
      },
      onCancel: () => {
        // Optionally, handle cancel action—for example, show a cancellation message.
      },
    })
  }

  // When a card is clicked in edit mode, load the area’s data and exit the "selecting edit" mode.
  const handleCardClick = (id: string) => {
    if (isEditing) {
      axios
        .get<ApiResponse<Area>>(`/areas/${id}`)
        .then((response) => {
          const item = response.data.data as unknown as Area
          setEditingItem(item)
          setIsEditing(false)
        })
        .catch((error) => {
          showMessage({
            type: MessageType.ERROR,
            title: "Error",
            content:
              error?.response?.data?.message ||
              error.message ||
              "Error al obtener área",
          })
        })
    } else {
      setExpandedCard(expandedCard === id ? null : id)
    }
  }

  const renderCard = (item: Area) => (
    <div
      key={item.id}
      className="w-full pb-4 flex-shrink-0 cursor-pointer"
      onClick={() => handleCardClick(item.id)}
    >
      <EntityCard
        entity={item}
        className={`bg-gray overflow-hidden ${
          expandedCard === item.id ? "max-h-[1920px]" : "max-h-20"
        }`}
      >
        <EntityCard.Badge />
        <EntityCard.Title
          className={`mt-4 transition-all ${
            expandedCard === item.id ? "" : "line-clamp-1"
          }`}
        />
        <EntityCard.Description
          className={`transition-all ${
            expandedCard === item.id ? "" : "line-clamp-1"
          }`}
        />
      </EntityCard>
    </div>
  )

  const midIndex = Math.floor(areas.length / 2)
  const leftColumn = areas.slice(0, midIndex)
  const rightColumn = areas.slice(midIndex)

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Áreas Temáticas</h2>
      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleCancelEdit}
            className="px-2 py-1 bg-red text-white rounded text-sm"
          >
            Cancelar edición
          </button>
        ) : (
          <>
            <button
              onClick={handleEditAreas}
              className="p-2 bg-yellow rounded"
              disabled={addingArea}
            >
              <img src={Edit} alt="Edit" className="w-4 h-4" />
            </button>
            {!addingArea && (
              <button
                onClick={handleAddArea}
                className="px-2 py-1 bg-green text-white rounded text-sm"
              >
                Agregar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-4">
      {renderHeader()}
      {addingArea ? (
        <AddLinea
          entityType="area tematica"
          onCancel={handleCancelEdit}
          onSave={handleSaveArea}
          lineasMatricialesOptions={lineasMatricialesOptions}
          lineasPotencialesOptions={lineasPotencialesOptions}
        />
      ) : editingItem ? (
        <AddLinea
          entityType="area tematica"
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
          defaultValues={{
            titulo: editingItem.titulo,
            descripcion: editingItem.descripcion,
            estatus: editingItem.estatus === EntityStatus.ACTIVE,
            linea_matricial_id: editingItem.linea_matricial_id,
            linea_potencial_id: editingItem.linea_potencial_id,
          }}
          isEditing={true}
          lineasMatricialesOptions={lineasMatricialesOptions}
          lineasPotencialesOptions={lineasPotencialesOptions}
        />
      ) : (
        <Scrollbar maxHeight="calc(100vh - 200px)" className="pr-4 pb-4">
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col gap-4">
              {leftColumn.map((area) => renderCard(area))}
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              {rightColumn.map((area) => renderCard(area))}
            </div>
          </div>
        </Scrollbar>
      )}
    </div>
  )
}

export default memo(AreasTematicas)
