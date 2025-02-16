import { createContext, useContext } from "react"
import { twMerge } from "tailwind-merge"
import Badge from "./Badge"
import fecha_de_inicio from "../../assets/icons/fecha_de_inicio.png"
import fecha_de_culminacion from "../../assets/icons/fecha_de_culminacion.png"
import { Person } from "../../types/Person"
import { Entity, EntityProduct } from "../../types/Entity"
import { StartDate, EndDate, Keywords } from "../../types/Investigation"
import Card from "../common/Card"
import { formatItems } from "../../utils"

type EntityCardContext = {
  entity: Entity
}

const EntityCardContext = createContext<EntityCardContext | undefined>(
  undefined
)

function useEntityCardContext() {
  const context = useContext(EntityCardContext)

  if (!context) {
    throw new Error(
      "useEntityCardContext must be used within an EntityCardProvider"
    )
  }

  return context
}

interface EntityCardProps<T extends Entity> {
  entity: T
  className?: string
  children: React.ReactNode
}
function EntityCard<T extends Entity>({
  entity,
  className,
  children,
}: EntityCardProps<T>) {
  return (
    <EntityCardContext.Provider value={{ entity }}>
      <Card className={twMerge("bg-gray", className)}>
        <Badge state={entity.estatus} />
        {children}
      </Card>
    </EntityCardContext.Provider>
  )
}

EntityCard.Title = function EntityCardTitle({
  className,
}: {
  className?: string
}) {
  const { entity } = useEntityCardContext()

  return (
    <h3 className={twMerge("text-lg font-semibold text-gray-3", className)}>
      {entity.titulo}
    </h3>
  )
}

EntityCard.Description = function EntityCardDescription({
  className,
}: {
  className?: string
}) {
  const { entity } = useEntityCardContext()

  return (
    <h3 className={twMerge("text-sm font-semibold text-gray-3", className)}>
      {entity.descripcion}
    </h3>
  )
}

EntityCard.Keywords = function EntityCardKeywords({
  keywords,
  className,
}: {
  keywords: Keywords
  className?: string
}) {
  return (
    <div className="flex gap-2">
      {keywords.map((keyword, index) => (
        <div
          key={index}
          className={twMerge(
            "text-xs border border-lightblue p-1 rounded-md",
            className
          )}
        >
          <p>{keyword}</p>
        </div>
      ))}
    </div>
  )
}

EntityCard.RelatedPeople = function EntityCardRelatedPeople({
  namespace,
  people,
  className,
}: {
  namespace?: string
  people: Person[]
  className?: string
}) {
  return (
    <p className={twMerge("text-sm font-semibold text-gray-3", className)}>
      <span className="text-gray-2">{namespace}: </span>
      {formatItems(people, (person) => `${person.nombre} ${person.apellido}`)}
    </p>
  )
}

EntityCard.Products = function EntityCardRelatedProducts({
  products,
  className,
}: {
  products: EntityProduct[]
  className?: string
}) {
  return (
    <p className={twMerge("text-sm font-semibold text-gray-3", className)}>
      <span className="text-gray-2">Productos: </span>
      {formatItems(products, (product) => product.titulo)}
    </p>
  )
}

EntityCard.Investment = function EntityCardInvestment({
  investment,
  className,
}: {
  investment: number
  className?: string
}) {
  return (
    <p className={twMerge("text-sm font-semibold text-gray-3", className)}>
      <span className="text-gray-2">Inversión: </span>${investment}
    </p>
  )
}

EntityCard.StartDate = function EntityCardStartDate({
  startDate,
  className,
  icon = false,
}: {
  startDate: StartDate
  className?: string
  icon?: boolean
}) {
  return (
    <div
      className={twMerge(
        "text-sm flex gap-2 items-center font-semibold",
        className
      )}
    >
      {icon && (
        <img
          className="object-contain"
          src={fecha_de_inicio}
          alt="Fecha de inicio"
        />
      )}
      <p>
        <span className="text-gray-2">Fecha inicio:</span>&nbsp;
        <span className="text-gray-3">{startDate}</span>
      </p>
    </div>
  )
}

EntityCard.EndDate = function EntityCardEndDate({
  endDate,
  className,
  icon = false,
}: {
  endDate?: EndDate
  className?: string
  icon?: boolean
}) {
  return (
    <div
      className={twMerge(
        "text-sm flex gap-2 items-center font-semibold",
        className
      )}
    >
      {icon && (
        <img
          className="object-contain"
          src={fecha_de_culminacion}
          alt="Fecha de culminación"
        />
      )}
      <p>
        <span className="text-gray-2">Fecha final:</span>&nbsp;
        <span className="text-gray-3">{endDate || "--"}</span>
      </p>
    </div>
  )
}

export default EntityCard
