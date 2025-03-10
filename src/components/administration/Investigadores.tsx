import React, { useEffect, useState } from "react"
import axios from "axios"
import Edit from "../../assets/icons/edit.png"
import Scrollbar from "../common/Scrollbar"
import Modal from "../common/Modal"
import { User } from "../../types/User"
import { ApiResponse } from "../../types/ApiResponse"
import InvestigadorCard from "./common/InvestigadorCard"
import UsuarioForm from "./common/InvestigadorForm"

const Investigadores: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingUser, setAddingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    axios.get<ApiResponse<User>>("/usuarios")
      .then((response) => {
        setUsers(response.data.data.list)
        setLoading(false)
      })
      .catch(() => {
        setError("Error al cargar usuarios")
        setLoading(false)
      })
  }, [])

  const handleCardClick = (userId: string) => {
    if (isEditing) {
      axios.get<ApiResponse<User>>(`/usuarios/${userId}`)
        .then((response) => {
          const fullUser = response.data.data as unknown as User
          setEditingUser(fullUser)
          setIsEditing(false)
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data?.message || error.message || "Error fetching user")
        })
    }
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Investigadores</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={() => {
                setIsEditing(false)
                setEditingUser(null)
              }}
              className="px-2 py-1 bg-red text-white rounded text-sm"
            >
              Cancelar edición
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-yellow rounded"
              disabled={addingUser}
            >
              <img src={Edit} alt="Edit" className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setAddingUser(true)}
            className="px-2 py-1 bg-green text-white rounded text-sm"
          >
            Agregar Usuario
          </button>
        </div>
      </div>
    )
  }

  const handleCancelUser = () => {
    setAddingUser(false)
    setEditingUser(null)
  }

  const handleSaveUser = (data: Partial<User>) => {
    if (editingUser) {
      const changedFields: Partial<User> = {}

      Object.keys(data).forEach((key) => {
        const dataKey = key as keyof User
        if (data[dataKey] !== editingUser[dataKey]) {
          changedFields[dataKey] = data[dataKey] as any
        }
      })

      if (changedFields.nivel && typeof changedFields.nivel === "string") {
        changedFields.nivel = parseInt(changedFields.nivel, 10)
      }

      if (Object.keys(changedFields).length === 0) {
        setEditingUser(null)
        return
      }

      axios.patch<ApiResponse<User>>(`/usuarios/${editingUser.id}`, changedFields)
        .then(() => {
          axios.get<ApiResponse<User>>("/usuarios")
            .then((res) => {
              setUsers(res.data.data.list)
              setEditingUser(null)
            })
            .catch(() => {
              setEditingUser(null)
            })
        })
        .catch(error => {
          setErrorMessage(error?.response?.data?.message || error.message || "Error updating user")
        })
    } else {
      if (data.nivel && typeof data.nivel === "string") {
        data.nivel = parseInt(data.nivel, 10)
      }

      axios.post<ApiResponse<User>>("/usuarios", data)
        .then((response) => {
          const newUser = response.data.data as unknown as User
          setUsers(prev => [newUser, ...prev])
          setAddingUser(false)
        })
        .catch(error => {
          setErrorMessage(error?.response?.data?.message || error.message || "Error creating user")
        })
    }
  }

  if (loading) return <div className="p-4">Cargando usuarios...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="p-4">
      {renderHeader()}
      {addingUser || editingUser ? (
        <UsuarioForm
          onCancel={handleCancelUser}
          onSubmit={handleSaveUser}
          defaultValues={editingUser || undefined}
          isEditing={!!editingUser}
        />
      ) : (
        <Scrollbar maxHeight="calc(100vh - 200px)" className="pr-4 pb-4">
          <div className="grid grid-cols-1 gap-4">
            {users.map((user, index) => (
              <InvestigadorCard
                key={user.id || index}
                user={user}
                onClick={() => handleCardClick(user.id)}
              />
            ))}
          </div>
        </Scrollbar>
      )}

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

export default Investigadores
