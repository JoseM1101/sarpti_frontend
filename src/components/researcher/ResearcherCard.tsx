import React from "react"
import { twMerge } from "tailwind-merge"
import { EntityStatus } from "../../types/Entity"
import { Person } from "../../types/Person"

interface ResearcherCardProps {
  person: Person
  expanded: boolean
  onToggle: () => void
  className?: string
  status?: EntityStatus
}

const ResearcherCard: React.FC<ResearcherCardProps> = ({
  person,
  expanded,
  onToggle,
  className,
}) => {
  const formattedIdentification = `${person.tipo_identificacion}-${String(
    person.identificacion
  ).replace(/^0+/, "")}`
  const initials = `${person.nombre.charAt(0)}${
    person.apellido ? person.apellido.charAt(0) : ""
  }`.toUpperCase()

  return (
    <div
      onClick={onToggle}
      className={twMerge(
        "relative border border-gray bg-gray rounded-md p-4 cursor-pointer transition-all duration-200",
        expanded ? "row-span-2" : "",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex-shrink-0 rounded-full border border-gray-2 overflow-hidden flex items-center justify-center text-lg font-bold">
            {initials}
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-sm">
              {person.nombre} {person.apellido}
            </h3>
            <p className="text-xs text-gray-500">
              {person.grado_academico || ""}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-gray-500">Edad:</span>
              <span className="text-xs">{person.edad}</span>
              {person.sexo && (
                <>
                  <span className="text-xs text-gray-500">|</span>
                  <span className="text-xs">{person.sexo}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {expanded && (
          <div className="grid gap-2">
            <div className="text-sm">
              <span className="text-gray-500">Correo:</span>
              <span className="ml-2 text-sm">{person.correo}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Cédula:</span>
              <span className="ml-2 text-sm">{formattedIdentification}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Estado Civil:</span>
              <span className="ml-2 text-sm">{person.estado_civil}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResearcherCard
