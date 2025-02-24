import React from "react"
import { User, UserRole } from "../../../types/User"
import EntityCard from "../../entity/EntityCard"
import { EntityStatus } from "@/types/Entity"

interface InvestigadorCardProps {
  user: User
  onClick?: () => void
}

const getRolText = (rol: UserRole): string => {
  switch (rol) {
    case UserRole.INVESTIGADOR:
      return "Investigador"
    case UserRole.DIRECTOR:
      return "Director"
    case UserRole.DECANO:
      return "Decano"
    default:
      return "Desconocido"
  }
}

const InvestigadorCard: React.FC<InvestigadorCardProps> = ({ user, onClick }) => {
  const formatDate = (date: Date | null): string => {
    if (!date) return "No registrada"
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Map user to entity-like object for the card
  const entity = {
    id: user.id,
    titulo: user.usuario || "Sin usuario",
    descripcion: `Rol: ${getRolText(user.nivel)}`,
    estatus: user.estatus as unknown as EntityStatus,
  }

  return (
    <div className="relative" onClick={onClick}>
      <EntityCard entity={entity} className="bg-gray shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="flex items-center space-x-4">
          {/* Avatar placed at left inside EntityCard */}
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {user.usuario ? user.usuario.charAt(0).toUpperCase() : "?"}
            </span>
          </div>
          <div className="flex-grow">
            <EntityCard.Badge />
            <EntityCard.Title className="mt-2" />
            <EntityCard.Description className="mt-1" />
            <p className="text-sm text-gray-500 mt-2">
              Última conexión: {formatDate(user.ultima_conexion)}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            user.conectado ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}>
            {user.conectado ? "En línea" : "Desconectado"}
          </span>
        </div>
      </EntityCard>
    </div>
  )
}

export default InvestigadorCard
