import React from "react"
import EntityCard from "../entity/EntityCard"
import { EntityStatus } from "../../types/Entity"
import { Person } from "../../types/Person"
import { cn } from "../../utils"

interface ResearcherCardProps {
  person: Person
  expanded: boolean
  onClick?: () => void
  className?: string
  // Since Person doesn't have estatus, allow passing it separately
  status?: EntityStatus
}

/**
 * ResearcherCard component for displaying person information
 *
 * This component wraps EntityCard to display researchers with consistent styling
 * and supports expanding/collapsing for additional details.
 */
const ResearcherCard: React.FC<ResearcherCardProps> = ({
  person,
  expanded,
  onClick,
  className,
  status = EntityStatus.ACTIVE // Default status if not provided
}) => {
  // Convert Person to Entity for EntityCard compatibility
  const entityData = {
    id: person.id_persona,
    titulo: `${person.nombres} ${person.apellidos || ""}`,
    descripcion: person.grado_academicos || "",
    estatus: status
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-200",
        expanded ? "shadow-md" : "hover:shadow-sm",
        className
      )}
    >
      <EntityCard entity={entityData} className="bg-white rounded-md overflow-hidden">
        <EntityCard.Badge />

        <div className="p-4">
          <div className="flex flex-col">
            <EntityCard.Title className="font-semibold text-lg" />
            <EntityCard.Description className="text-sm text-gray-600 mt-1" />

            <div className="mt-3 grid gap-2">
              {person.edad && (
                <div className="text-sm">
                  <span className="text-gray-500">Edad:</span>
                  <span className="ml-2">{person.edad}</span>
                </div>
              )}

              {person.estado_civil && (
                <div className="text-sm">
                  <span className="text-gray-500">Estado Civil:</span>
                  <span className="ml-2">{person.estado_civil}</span>
                </div>
              )}

              {/* Display the complete identification (type + number) */}
              <div className="text-sm">
                <span className="text-gray-500">Identificación:</span>
                <span className="ml-2">
                  {person.id_tipo_identificacion} {person.identificacion}
                </span>
              </div>

              {person.correo && (
                <div className="text-sm">
                  <span className="text-gray-500">Correo:</span>
                  <span className="ml-2">{person.correo}</span>
                </div>
              )}

              {expanded && (
                <>
                  {/* Additional expanded content - any other fields you want to show when expanded */}
                </>
              )}
            </div>
          </div>
        </div>
      </EntityCard>
    </div>
  )
}

export default ResearcherCard
