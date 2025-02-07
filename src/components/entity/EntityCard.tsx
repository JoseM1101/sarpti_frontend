import { twMerge } from "tailwind-merge"
import { Entity, Person } from "../../types/Entity"
import fecha_de_inicio from "../../assets/icons/fecha_de_inicio.png"
import fecha_de_culminacion from "../../assets/icons/fecha_de_culminacion.png"

const formatNames = (persons: Person[], separator = "; ") => {
  return persons.map((person, index) =>
    index !== persons.length - 1
      ? `${person.nombre} ${person.apellido}${separator}`
      : `${person.nombre} ${person.apellido}`
  )
}

const formatLinks = (items: Entity["productos"], separator = "; ") => {
  return items.map(
    (item, index) =>
      `${item.titulo}${index !== items.length - 1 ? separator : ""}`
  )
}

const EntityCard = () => {
  return null
}

EntityCard.Title = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <h3 className={twMerge("font-semibold text-gray-3", className)}>
    {children}
  </h3>
)

EntityCard.Description = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <h3 className={twMerge("font-semibold text-gray-3", className)}>
    {children}
  </h3>
)

EntityCard.Authors = ({
  authors,
  className,
}: {
  authors: Entity["autores"]
  className?: string
}) => (
  <p className={twMerge("font-semibold text-gray-3", className)}>
    {formatNames(authors)}
  </p>
)

EntityCard.Tutors = ({
  tutors,
  className,
}: {
  tutors: Entity["tutores"]
  className?: string
}) => (
  <p className={twMerge("font-semibold text-gray-3", className)}>
    {formatNames(tutors)}
  </p>
)

EntityCard.RelatedProducts = ({
  products,
  className,
}: {
  products: Entity["productos"]
  className?: string
}) => (
  <p className={twMerge("font-semibold text-gray-3", className)}>
    {formatLinks(products)}
  </p>
)

EntityCard.Investment = ({
  investment,
  className,
}: {
  investment: Entity["inversion"]
  className?: string
}) => (
  <p className={twMerge("font-semibold text-gray-3", className)}>
    ${investment}
  </p>
)

EntityCard.Dates = ({
  startDate,
  endDate,
  className,
  icons = false,
}: {
  startDate: Entity["fecha_inicio"]
  endDate?: Entity["fecha_culminacion"]
  className?: string
  icons?: boolean
}) => (
  <div className={twMerge("flex flex-col font-semibold", className)}>
    <div className="flex gap-2 items-center">
      {icons && (
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
    <div className="flex gap-2 items-center">
      {icons && (
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
  </div>
)

EntityCard.Keywords = ({
  keywords,
  className,
}: {
  keywords: Entity["keywords"]
  className?: string
}) => (
  <>
    {keywords.map((keyword, index) => (
      <div
        key={index}
        className={twMerge("border border-lightblue p-1 rounded-md", className)}
      >
        <p>{keyword}</p>
      </div>
    ))}
  </>
)

export default EntityCard
