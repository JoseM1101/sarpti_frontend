import { useState, useEffect } from "react"
import axios from "axios"
import EntityCard from "../entity/EntityCard"
import Scrollbar from "../common/Scrollbar"
import Edit from "../../assets/icons/edit.png"
import { Entity, EntityStatus } from "../../types/Entity"
import { ApiResponse } from "../../types/ApiResponse"
import AddLinea from "./common/AddLineas"
import Modal from "../common/Modal"

interface Area extends Entity {
  id: string
  titulo: string
  descripcion: string
  estatus: EntityStatus
  linea_matricial_id?: string
  linea_potencial_id?: string
}
interface Linea extends Entity {} // assuming a similar structure

const AreasTematicas: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([])
  const [addingArea, setAddingArea] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<Area | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // New state for dropdown options for lineas
  const [lineasMatricialesOptions, setLineasMatricialesOptions] = useState<Linea[]>([])
  const [lineasPotencialesOptions, setLineasPotencialesOptions] = useState<Linea[]>([])

  // Add a reusable function to fetch areas
  const fetchAreas = () => {
    axios.get<ApiResponse<Area>>('/areas')
      .then((response) => {
        const list = response.data.data.list || []
        setAreas(list)
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.message || error.message || "Error al cargar áreas")
      })
  }

  useEffect(() => {
    fetchAreas()
  }, [])

  useEffect(() => {
    axios.get<ApiResponse<Linea>>('/lineas/matriciales')
      .then((response) => {
        const list = response.data.data.list || []
        setLineasMatricialesOptions(list)
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.message || error.message || "Error fetching lineas matriciales")
      })
  }, [])

  // Fetch options for lineas potenciales
  useEffect(() => {
    axios.get<ApiResponse<Linea>>('/lineas/potenciales')
      .then((response) => {
        const list = response.data.data.list || []
        setLineasPotencialesOptions(list)
      })
      .catch((error) => {
        setErrorMessage(error?.response?.data?.message || error.message || "Error fetching lineas potenciales")
      })
  }, [])

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
      linea_potencial_id: data.linea_potencial_id
    }
    console.log(newArea)
    axios.post<ApiResponse<Area>>('/areas', newArea)
      .then((response) => {
        const createdArea = response.data.data as unknown as Area
        setAreas(prev => [createdArea, ...prev])
        setAddingArea(false)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(error?.response?.data?.message || error.message || "Error creando área")
      })
  }

  // Handlers for editing an area
  const handleEditAreas = () => {
    setIsEditing(true)
  }
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingItem(null)
  }
  const handleSaveEdit = (data: { titulo: string; descripcion: string; estatus: boolean }) => {
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
    const newEstatus = data.estatus ? EntityStatus.ACTIVE : EntityStatus.INACTIVE
    if (newEstatus !== editingItem.estatus) {
      changedFields.estatus = newEstatus
    }
    if (Object.keys(changedFields).length === 0) {
      setEditingItem(null)
      return
    }

    axios.patch<ApiResponse<Area>>(`/areas/${editingItem.id}`, changedFields)
      .then(() => {
        // Refetch areas after edit to ensure data consistency
        fetchAreas()
        setEditingItem(null)
      })
      .catch(error => {
        setErrorMessage(error?.response?.data?.message || error.message || "Error actualizando área")
      })
  }

  const handleCardClick = (id: string) => {
    if (isEditing) {
      axios.get<ApiResponse<Area>>(`/areas/${id}`)
        .then((response) => {
          const item = response.data.data as unknown as Area
          setEditingItem(item)
          setIsEditing(false)
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data?.message || error.message || "Error fetching area")
        })
    } else {
      setExpandedCard(expandedCard === id ? null : id)
    }
  }

  const handleAddArea = () => {
    setAddingArea(true)
  }

  const renderCard = (item: Area) => (
    <div
      key={item.id}
      className="w-full pb-4 flex-shrink-0 cursor-pointer"
      onClick={() => handleCardClick(item.id)}
    >
      <div
        className={`
          rounded-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden
          ${expandedCard === item.id ? "max-h-[1920px]" : "max-h-20"}
        `}
      >
        <EntityCard entity={item} className="bg-gray shadow-sm hover:shadow-md transition-shadow">
          <EntityCard.Badge />
          <EntityCard.Title className={`mt-4 transition-all duration-300 ${expandedCard === item.id ? "" : "line-clamp-1"}`} />
          <EntityCard.Description className={`mt-2 pb-4 transition-all duration-300 ${expandedCard === item.id ? "" : "line-clamp-1"}`} />
        </EntityCard>
      </div>
    </div>
  )

  const midIndex = Math.floor(areas.length / 2)
  const leftColumn = areas.slice(0, midIndex)
  const rightColumn = areas.slice(midIndex)

  const renderHeader = () => {
    return (
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
                  onClick={handleAddArea}  // Changed from handleEditAreas to handleAddArea
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
  }

  return (
    <div className="p-4">
      {renderHeader()}
      {addingArea ? (
        <AddLinea
          entityType="area tematica"
          onCancel={handleCancelEdit}
          onSave={handleSaveArea}
          // Pass the dropdown options as props to the AddLinea form
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
            // You might also pass default selected ids if applicable:
            linea_matricial_id: (editingItem as any).linea_matricial_id,
            linea_potencial_id: (editingItem as any).linea_potencial_id,
          }}
          isEditing={true}
          lineasMatricialesOptions={lineasMatricialesOptions}
          lineasPotencialesOptions={lineasPotencialesOptions}
        />
      ) : (
        <Scrollbar maxHeight="calc(100vh - 200px)" className="pr-4 pb-4">
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col gap-4">
              {leftColumn.map(area => renderCard(area))}
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              {rightColumn.map(area => renderCard(area))}
            </div>
          </div>
        </Scrollbar>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <Modal isOpen={true}>
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
      )}
    </div>
  )
}

export default AreasTematicas
