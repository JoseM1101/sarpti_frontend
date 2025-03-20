import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Edit from "../../assets/icons/edit.png";
import Scrollbar from "../common/Scrollbar";
import { User } from "../../types/User";
import { ApiResponse } from "../../types/ApiResponse";
import InvestigadorCard from "./common/InvestigadorCard";
import UsuarioForm from "./common/InvestigadorForm";
import { useMessage } from "../../hooks/useMessage";
import { MessageType } from "../../types/Message";
import { withLoader } from "../../utils/withLoader";

const Investigadores: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingUser, setAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Obtener el nivel del usuario actual desde localStorage
  const userRole = parseInt(localStorage.getItem("userRole") || "1", 10);
  console.log("Nivel del usuario actual:", userRole); // Depuración

  const { showMessage } = useMessage();

  // Fetch users only once on mount.
  useEffect(() => {
    axios
      .get<ApiResponse<User>>("/usuarios")
      .then((response) => {
        setUsers(response.data.data.list);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar usuarios");
        setLoading(false);
        showMessage({
          type: MessageType.ERROR,
          title: "Error",
          content:
            err?.response?.data?.message ||
            err.message ||
            "Error al cargar usuarios",
        });
      });
  }, [showMessage]);

  // Función para verificar si el usuario actual puede editar un usuario específico
  const canEditUser = useCallback(
    (targetUser: User) => {
      if (userRole === 3) return true; // Nivel 3 puede editar a todos
      if (userRole === 2 && targetUser.nivel === 1) return true; // Nivel 2 solo puede editar nivel 1
      return false; // Nivel 1 no puede editar a nadie
    },
    [userRole]
  );

  // Función para verificar si el usuario actual puede agregar un usuario
  const canAddUser = useCallback(() => {
    return userRole === 2 || userRole === 3; // Nivel 2 y 3 pueden agregar usuarios
  }, [userRole]);

  const handleCardClick = useCallback(
    (userId: string) => {
      if (isEditing) {
        axios
          .get<ApiResponse<User>>(`/usuarios/${userId}`)
          .then((response) => {
            const fullUser = response.data.data as unknown as User;
            setEditingUser(fullUser);
            setIsEditing(false);
          })
          .catch((err) => {
            showMessage({
              type: MessageType.ERROR,
              title: "Error",
              content:
                err?.response?.data?.message ||
                err.message ||
                "Error fetching user",
            });
          });
      }
    },
    [isEditing, showMessage]
  );

  const renderHeader = useMemo(() => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-3">Usuarios</h2>
        <div className="flex space-x-2">
          {!(editingUser || addingUser) && (
            <>
              {isEditing ? (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingUser(null);
                  }}
                  className="px-2 py-1 bg-red text-white rounded text-sm"
                >
                  Cancelar edición
                </button>
              ) : (
                (userRole === 2 || userRole === 3) && ( // Mostrar botón de edición para nivel 2 y 3
              <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-yellow rounded"
                      >
                    <img src={Edit} alt="Edit" className="w-4 h-4" />
                  </button>
                )
              )}
              {canAddUser() && ( // Mostrar botón de agregar si tiene permisos
                <button
                  onClick={() => setAddingUser(true)}
                  className="px-2 py-1 bg-green text-white rounded text-sm"
                >
                  Agregar Usuario
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }, [isEditing, userRole, canAddUser, editingUser, addingUser]);

  const handleCancelUser = useCallback(() => {
    setAddingUser(false);
    setEditingUser(null);
  }, []);

  const handleSaveUser = useCallback(
    (data: Partial<User>) => {
      if (editingUser) {
        if (!canEditUser(editingUser)) {
          showMessage({
            type: MessageType.ERROR,
            title: "Error",
            content: "No tienes permisos para editar este usuario.",
          });
          return;
        }

        const changedFields: Partial<{
          [K in keyof User]: NonNullable<User[K]>;
        }> = {};
        Object.keys(data).forEach((key) => {
          const dataKey = key as keyof User;
          if (data[dataKey] !== editingUser[dataKey] && data[dataKey] != null) {
            changedFields[dataKey] = data[dataKey]! as NonNullable<
              User[typeof dataKey]
            >;
          }
        });

        if (Object.keys(changedFields).length === 0) {
          setEditingUser(null);
          return;
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
              );
              const res = await axios.get<ApiResponse<User>>("/usuarios");
              setUsers(res.data.data.list);
              setEditingUser(null);
              showMessage({
                type: MessageType.SUCCESS,
                title: "Éxito",
                content: "Usuario actualizado exitosamente",
              });
            }).catch((err) => {
              showMessage({
                type: MessageType.ERROR,
                title: "Error",
                content:
                  err?.response?.data?.message ||
                  err.message ||
                  "Error updating user",
              });
            });
          },
        });
      } else {
        if (userRole === 2) {
          data.nivel = 1; // Forzar nivel 1 si el usuario actual es de nivel 2
        }

        showMessage({
          type: MessageType.INFO,
          title: "Confirmación",
          content: "¿Está seguro de crear este usuario?",
          onConfirm: () => {
            axios
              .post<ApiResponse<User>>("/usuarios", data)
              .then((response) => {
                const newUser = response.data.data as unknown as User;
                setUsers((prev) => [newUser, ...prev]);
                setAddingUser(false);
                showMessage({
                  type: MessageType.SUCCESS,
                  title: "Éxito",
                  content: "Usuario creado exitosamente",
                });
              })
              .catch((err) => {
                showMessage({
                  type: MessageType.ERROR,
                  title: "Error",
                  content:
                    err?.response?.data?.message ||
                    err.message ||
                    "Error creating user",
                });
              });
          },
        });
      }
    },
    [editingUser, showMessage, canEditUser, userRole]
  );

  if (loading) return <div className="p-4">Cargando usuarios...</div>;
  if (error) return <div className="p-4 text-red">{error}</div>;

  return (
    <div className="p-4">
      {renderHeader}
      {addingUser || editingUser ? (
        <UsuarioForm
          onCancel={handleCancelUser}
          onSubmit={handleSaveUser}
          defaultValues={editingUser || undefined}
          isEditing={!!editingUser}
          restrictLevel={userRole === 2} // Pasar esta prop para restringir el nivel
        />
      ) : (
        <Scrollbar maxHeight="calc(100vh - 200px)" className="pr-4 pb-4">
          <div className="grid grid-cols-1 gap-4">
            {users.map((user, index) => (
              <InvestigadorCard
                className={isEditing && canEditUser(user) ? "cursor-pointer" : ""}
                key={user.id || index}
                user={user}
                onClick={() => {
                  if (isEditing && canEditUser(user)) {
                    handleCardClick(user.id);
                  }
                }}
              />
            ))}
          </div>
        </Scrollbar>
      )}
    </div>
  );
};

export default React.memo(Investigadores);