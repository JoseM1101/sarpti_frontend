import React, { useEffect, useState, useCallback, useMemo } from "react"
import axios from "axios"
import Edit from "../../assets/icons/edit.png"
import Scrollbar from "../common/Scrollbar"
import { User } from "../../types/User"
import { ApiResponse } from "../../types/ApiResponse"
import InvestigadorCard from "./common/InvestigadorCard"
import UsuarioForm from "./common/InvestigadorForm"
import { useMessage } from "../../hooks/useMessage"
import { MessageType } from "../../types/Message"
import { withLoader } from "../../utils/withLoader"

const Investigadores: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addingUser, setAddingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Use global message system
  const { showMessage } = useMessage()

  // Fetch users only once on mount.
  useEffect(() => {
    axios
      .get<ApiResponse<User>>("/usuarios")
      .then((response) => {
        setUsers(response.data.data.list)
        setLoading(false)
      })
      .catch((err) => {
        setError("Error al cargar usuarios")
        setLoading(false)
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            err?.response?.data?.message ||
            err.message ||
            "Error al cargar usuarios",
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // removed showMessage from dependency

  const handleCardClick = useCallback(
    (userId: string) => {
      if (isEditing) {
        axios
          .get<ApiResponse<User>>(`/usuarios/${userId}`)
          .then((response) => {
            const fullUser = response.data.data as unknown as User
            setEditingUser(fullUser)
            setIsEditing(false)
          })
          .catch((err) => {
            showMessage({
              type: MessageType.ERROR,
              title: "Error",
              content:
                err?.response?.data?.message ||
                err.message ||
                "Error fetching user",
            })
          })
      }
    },
    [isEditing, showMessage]
  )

  const renderHeader = useMemo(() => {
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
  }, [isEditing])

  const handleCancelUser = useCallback(() => {
    setAddingUser(false)
    setEditingUser(null)
  }, [])

  const handleSaveUser = useCallback(
    (data: Partial<User>) => {
      if (editingUser) {
        const changedFields: Partial<{
          [K in keyof User]: NonNullable<User[K]>
        }> = {}
        Object.keys(data).forEach((key) => {
          const dataKey = key as keyof User
          if (data[dataKey] !== editingUser[dataKey] && data[dataKey] != null) {
            changedFields[dataKey] = data[dataKey]! as NonNullable<
              User[typeof dataKey]
            >
          }
        })
        if (changedFields.nivel && typeof changedFields.nivel === "string") {
          changedFields.nivel = parseInt(
            changedFields.nivel as string,
            10
          ) as any
        }

        if (Object.keys(changedFields).length === 0) {
          setEditingUser(null)
          return
        }

        showMessage({
          type: MessageType.INFO,
          title: "Confirmación",
          content: "¿Está seguro de que desea guardar los cambios?",
          onConfirm: () => {
            withLoader(async () => {
              await axios.patch<ApiResponse<User>>(
                `/usuarios/${editingUser.id}`,
                changedFields
              )
              const res = await axios.get<ApiResponse<User>>("/usuarios")
              setUsers(res.data.data.list)
              setEditingUser(null)
              showMessage({
                type: MessageType.SUCCESS,
                title: "Éxito",
                content: "Usuario actualizado exitosamente",
              })
            }).catch((err) => {
              showMessage({
                type: MessageType.ERROR,
                title: "Error",
                content:
                  err?.response?.data?.message ||
                  err.message ||
                  "Error updating user",
              })
            })
          },
          onCancel: () => {
            // Optionally handle cancel action.
          },
        })
      } else {
        if (data.nivel && typeof data.nivel === "string") {
          data.nivel = parseInt(data.nivel, 10)
        }

        showMessage({
          type: MessageType.INFO,
          title: "Confirmación",
          content: "¿Está seguro de crear este usuario?",
          onConfirm: () => {
            axios
              .post<ApiResponse<User>>("/usuarios", data)
              .then((response) => {
                const newUser = response.data.data as unknown as User
                setUsers((prev) => [newUser, ...prev])
                setAddingUser(false)
                showMessage({
                  type: MessageType.SUCCESS,
                  title: "Éxito",
                  content: "Usuario creado exitosamente",
                })
              })
              .catch((err) => {
                showMessage({
                  type: MessageType.ERROR,
                  title: "Error",
                  content:
                    err?.response?.data?.message ||
                    err.message ||
                    "Error creating user",
                })
              })
          },
          onCancel: () => {
            // Optionally handle cancel action.
          },
        })
      }
    },
    [editingUser, showMessage]
  )

  if (loading) return <div className="p-4">Cargando usuarios...</div>
  if (error) return <div className="p-4 text-red">{error}</div>

  return (
    <div className="p-4">
      {renderHeader}
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
                className={isEditing ? "cursor-pointer" : ""}
                key={user.id || index}
                user={user}
                onClick={() => handleCardClick(user.id)}
              />
            ))}
          </div>
        </Scrollbar>
      )}
    </div>
  )
}

export default React.memo(Investigadores)
